import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

const STEP = 360; // overwritten per call: 360 / count

/**
 * Drives a 3D ring. The angle lives outside React state and is written to a
 * CSS variable each frame, so rotating never re-renders the component tree.
 * Only the active index is React state, updated when it actually changes.
 */
export function useRing(count: number, autoplayMs = 5200) {
  const step = STEP / count;
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const angle = useRef(0); // current rendered angle (deg)
  const target = useRef(0); // where we're easing to
  const raf = useRef(0);
  const last = useRef(0);
  const lastInteract = useRef(0);
  const hovering = useRef(false);
  const focused = useRef(false);
  const dragging = useRef(false);
  const visible = useRef(true);
  const movedByDrag = useRef(false);
  const reduced = useRef(false);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const mod = useCallback((n: number) => ((n % count) + count) % count, [count]);

  const paint = useCallback(() => {
    const ring = ringRef.current;
    if (ring) ring.style.setProperty("--angle", `${angle.current}deg`);
    const pos = -angle.current / step; // fractional index at the front
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      let d = i - pos;
      d = ((((d + count / 2) % count) + count) % count) - count / 2; // [-count/2, count/2)
      el.style.setProperty("--k", String(Math.min(1, Math.abs(d))));
    });
    const idx = mod(Math.round(pos));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, [count, mod, step]);

  const tick = useCallback(
    (now: number) => {
      const dt = Math.min(0.05, (now - last.current) / 1000 || 0.016);
      last.current = now;
      const diff = target.current - angle.current;
      if (reduced.current || Math.abs(diff) < 0.02) {
        angle.current = target.current;
        paint();
        raf.current = 0;
        return;
      }
      angle.current += diff * (1 - Math.exp(-dt * 6.5));
      paint();
      raf.current = requestAnimationFrame(tick);
    },
    [paint],
  );

  const run = useCallback(() => {
    if (!raf.current) {
      last.current = performance.now();
      raf.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const touch = useCallback(() => {
    lastInteract.current = Date.now();
  }, []);

  const goTo = useCallback(
    (i: number, fromUser = true) => {
      if (fromUser) touch();
      const s = -target.current / step; // current (integer-ish) index
      const delta = ((((i - s + count / 2) % count) + count) % count) - count / 2;
      target.current = -(Math.round(s) + Math.round(delta)) * step;
      run();
    },
    [count, run, step, touch],
  );

  const next = useCallback((fromUser = true) => goTo(Math.round(-target.current / step) + 1, fromUser), [goTo, step]);
  const prev = useCallback(() => goTo(Math.round(-target.current / step) - 1), [goTo, step]);

  // Reduced motion + visibility + autoplay
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduced.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);

    const stage = stageRef.current;
    let io: IntersectionObserver | undefined;
    if (stage && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.35 });
      io.observe(stage);
    }

    lastInteract.current = Date.now();
    let elapsed = 0;
    const id = window.setInterval(() => {
      if (reduced.current || document.hidden || !visible.current) return;
      if (hovering.current || focused.current || dragging.current) {
        elapsed = 0;
        return;
      }
      if (Date.now() - lastInteract.current < 4000) {
        elapsed = 0;
        return;
      }
      elapsed += 500;
      if (elapsed >= autoplayMs) {
        elapsed = 0;
        next(false);
      }
    }, 500);

    paint();
    return () => {
      window.clearInterval(id);
      io?.disconnect();
      mq.removeEventListener("change", sync);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [autoplayMs, next, paint]);

  // Pointer drag / swipe. Vertical scrolling stays native (touch-action: pan-y).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let startX = 0;
    let startY = 0;
    let startAngle = 0;
    let down = false;
    let moved = false;
    let lastX = 0;
    let lastT = 0;
    let vel = 0; // deg per ms
    let pid = -1;

    const degPerPx = () => {
      const card = cardRefs.current[0];
      const w = card ? card.offsetWidth : 400;
      return step / (w * 0.95);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if ((e.target as HTMLElement).closest("[data-ring-ui]")) return;
      down = true;
      moved = false;
      pid = e.pointerId;
      startX = lastX = e.clientX;
      startY = e.clientY;
      startAngle = angle.current;
      lastT = performance.now();
      vel = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!down || e.pointerId !== pid) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!moved) {
        if (Math.abs(dx) < 7 || Math.abs(dx) < Math.abs(dy)) return;
        moved = true;
        dragging.current = true;
        movedByDrag.current = true;
        stage.setPointerCapture?.(pid);
        stage.classList.add("is-dragging");
        touch();
      }
      const now = performance.now();
      const inst = ((e.clientX - lastX) * degPerPx()) / Math.max(1, now - lastT);
      vel = vel * 0.7 + inst * 0.3;
      lastX = e.clientX;
      lastT = now;
      angle.current = target.current = startAngle + dx * degPerPx();
      paint();
    };
    const onUp = (e: PointerEvent) => {
      if (!down || e.pointerId !== pid) return;
      down = false;
      if (moved) {
        dragging.current = false;
        stage.classList.remove("is-dragging");
        stage.releasePointerCapture?.(pid);
        const projected = angle.current + vel * 220;
        target.current = Math.round(projected / step) * step;
        touch();
        run();
        window.setTimeout(() => (movedByDrag.current = false), 0);
      }
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    return () => {
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, [paint, run, step, touch]);

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(Math.round(-target.current / step) + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(count - 1);
    }
  };

  const stageProps = {
    ref: stageRef,
    onKeyDown,
    onMouseEnter: () => (hovering.current = true),
    onMouseLeave: () => (hovering.current = false),
    onFocus: () => (focused.current = true),
    onBlur: () => (focused.current = false),
  };

  const cardClick = (i: number) => {
    if (movedByDrag.current) return;
    goTo(i);
  };

  return { stageProps, ringRef, cardRefs, active, goTo, next: () => next(true), prev, cardClick };
}
