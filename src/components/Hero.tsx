import { useEffect, useRef } from "react";
import { PROFILE } from "@/data/profile";

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  // Gentle pointer parallax, written to CSS variables (no re-render).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hv" ref={ref} aria-hidden="true">
      <svg className="hv__orbit" viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient id="hv-o" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8f7cff" stopOpacity=".7" />
            <stop offset="1" stopColor="#5de1ff" stopOpacity=".7" />
          </linearGradient>
        </defs>
        <ellipse cx="300" cy="330" rx="272" ry="112" stroke="url(#hv-o)" strokeWidth="1.2" opacity=".55" />
        <ellipse cx="300" cy="330" rx="222" ry="90" stroke="url(#hv-o)" strokeWidth="1" opacity=".3" />
        <circle cx="64" cy="352" r="5" fill="#5de1ff" />
        <circle cx="528" cy="296" r="4" fill="#8f7cff" />
        <circle cx="300" cy="442" r="3.2" fill="#fff" opacity=".8" />
      </svg>
      <div className="hv__scene">
        <div className="plate plate--3" />
        <div className="plate plate--2" />
        <div className="plate plate--1">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="22" y="22" width="56" height="56" rx="16" />
            <rect x="34" y="34" width="32" height="32" rx="9" opacity=".7" />
            <rect x="44" y="44" width="12" height="12" rx="4" fill="currentColor" stroke="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            {PROFILE.role} · Portfolio
          </p>
          <h1 id="hero-title" className="display hero__title">
            I build software across the stack, from <em>real-time chat</em> to <em>local AI.</em>
          </h1>
          <p className="lede">{PROFILE.intro}</p>
          <div className="hero__cta">
            <a href="#work" className="btn btn--primary">
              View projects
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#contact" className="btn btn--ghost glass">
              Get in touch
            </a>
          </div>
        </div>
        <HeroVisual />
      </div>
      <a href="#work" className="scroll-cue" aria-label="Scroll to projects">
        <span>Projects</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
