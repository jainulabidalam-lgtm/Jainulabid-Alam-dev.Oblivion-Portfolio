import { useEffect, useState } from "react";
import { PROFILE } from "@/data/profile";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav-wrap">
      <nav className="nav glass glass--nav" aria-label="Primary">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true" />
          <span>{PROFILE.name}</span>
        </a>

        <ul className={`nav__links${open ? " is-open" : ""}`} id="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn--sm nav__cta">
          Get in touch
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
