import { PROFILE, SKILL_GROUPS } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { ProjectRing } from "@/components/ProjectRing";

export function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="section__head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title" className="display h2">
              Six projects, <em>one ring.</em>
            </h2>
          </div>
          <p className="section__note">
            Drag, swipe, or use the arrow keys to turn the ring. These are interface illustrations of each project, not
            screenshots.
          </p>
        </header>
      </div>
      <div className="work__stage">
        <ProjectRing />
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="wrap skills__grid">
        <header className="skills__head">
          <p className="eyebrow">Technical skills</p>
          <h2 id="skills-title" className="display h2">
            What I build <em>with.</em>
          </h2>
          <p className="section__note">
            Grouped by what the projects above actually involve, not an exhaustive tool list.
          </p>
        </header>
        <div className="skills__list">
          {SKILL_GROUPS.map((g) => (
            <div className="skill-row" key={g.title}>
              <h3>{g.title}</h3>
              <ul className="chips">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__lead">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="display h2 about__quote">
            Honest work, <em>built end to end.</em>
          </h2>
        </div>
        <div className="about__body">
          {PROFILE.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ol className="about__index" aria-label="Projects">
            {PROJECTS.map((p, i) => (
              <li key={p.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b>{p.title}</b>
                <i>{p.kicker}</i>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact__panel glass glass--strong">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="display h2 contact__title">
            Let's build something <em>worth using.</em>
          </h2>
          <div className="contact__actions">
            <a className="btn btn--primary" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            {PROFILE.links.map((l) => (
              <a key={l.href} className="btn btn--ghost glass" href={l.href} rel="noreferrer noopener" target="_blank">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
