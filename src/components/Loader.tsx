import { useEffect, useState } from "react";
import { DotmSquare8 } from "@/components/ui/dotm-square-8";

/**
 * Loading screen. Never blocks input (pointer-events: none), has a minimum
 * display time so it doesn't flash, and a hard failsafe so it can't stick.
 */
export function Loader() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minShow = reduce ? 150 : 800;
    const started = performance.now();
    let hid = false;
    const timers: number[] = [];

    const hide = () => {
      if (hid) return;
      hid = true;
      setPhase("hide");
      timers.push(window.setTimeout(() => setPhase("gone"), reduce ? 50 : 520));
    };
    const ready = () => {
      const wait = Math.max(0, minShow - (performance.now() - started));
      timers.push(window.setTimeout(hide, wait));
    };

    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    timers.push(window.setTimeout(hide, 2200)); // failsafe

    return () => {
      window.removeEventListener("load", ready);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <div className={`loader${phase === "hide" ? " is-hiding" : ""}`} aria-hidden={phase === "hide"}>
      <DotmSquare8 size={32} dotSize={4} speed={1.2} bloom />
    </div>
  );
}
