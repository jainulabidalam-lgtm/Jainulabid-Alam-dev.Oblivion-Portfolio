import { PROJECTS } from "@/data/projects";
import { useRing } from "@/hooks/useRing";
import { MOCKUPS } from "@/components/mockups";

const COUNT = PROJECTS.length;
const STEP = 360 / COUNT;

export function ProjectRing() {
  const { stageProps, ringRef, cardRefs, active, goTo, next, prev, cardClick } = useRing(COUNT);
  const project = PROJECTS[active];

  return (
    <div className="ring">
      <div
        {...stageProps}
        className="ring__stage"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects. Use the left and right arrow keys, or drag, to rotate."
      >
        <div className="ring__floor" aria-hidden="true" />
        <div className="ring__ring" ref={ringRef}>
          {PROJECTS.map((p, i) => {
            const Mock = MOCKUPS[p.id];
            const isActive = i === active;
            return (
              <article
                key={p.id}
                ref={(el: HTMLElement | null) => {
                  cardRefs.current[i] = el;
                }}
                className={`card card--${p.id}${isActive ? " is-active" : ""}`}
                style={{ ["--i" as string]: i, ["--step" as string]: `${STEP}deg` }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${COUNT}: ${p.title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => cardClick(i)}
              >
                <div className="card__face">
                  <Mock />
                  <div className="card__shade" aria-hidden="true" />
                  <div className="card__cap">
                    <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="card__cap-text">
                      <h3 className="card__title">{p.title}</h3>
                      <p className="card__kicker">{p.kicker}</p>
                    </div>
                    {p.status === "In progress" && <span className="badge">In progress</span>}
                  </div>
                  <span className="card__edge" aria-hidden="true" />
                </div>
                <div className="card__back" aria-hidden="true">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="ring__bar" data-ring-ui>
        <div className="ring__detail" aria-live="polite" aria-atomic="true">
          <p className="eyebrow">
            {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")} · {project.kicker}
          </p>
          <h3 className="ring__title">{project.title}</h3>
          <p className="ring__summary">{project.summary}</p>
          <ul className="tags" aria-label="Topics">
            {project.tags.map((t) => (
              <li key={t} className={t === "In progress" ? "tag tag--warn" : "tag"}>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="ring__controls">
          <div className="dots" role="tablist" aria-label="Choose a project">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-label={`${p.title}`}
                className={i === active ? "dot is-on" : "dot"}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="arrows">
            <button type="button" className="icon-btn glass" onClick={prev} aria-label="Previous project">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" className="icon-btn glass" onClick={next} aria-label="Next project">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
