import { Fragment, useEffect, useRef } from "react";
import { tween } from "../../lib/motion";

export interface Skill {
  title: string;
  value: number;
  aosDelay?: string;
}

/**
 * Progress bars that fill (2s, swing easing) and count up the first time any
 * of them scrolls into view — the theme's jquery.appear behaviour.
 */
export function SkillBars({ skills }: { skills: Skill[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = Array.from(root.current!.querySelectorAll<HTMLElement>(".singleSkill"));
    const cancels: (() => void)[] = [];
    const run = () => {
      bars.forEach((bar) => {
        const target = Number(bar.dataset.skill);
        const fill = bar.querySelector<HTMLElement>(".skill")!;
        const label = bar.querySelector<HTMLElement>("span")!;
        const parentW = fill.parentElement!.getBoundingClientRect().width;
        const from = parentW ? (fill.getBoundingClientRect().width / parentW) * 100 : 0;
        cancels.push(
          tween(2000, (e) => {
            fill.style.width = `${from + (target - from) * e}%`;
            label.textContent = `${Math.ceil(target * e)}%`;
          }),
        );
      });
    };
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        io.disconnect();
        run();
      }
    });
    bars.forEach((b) => io.observe(b));
    return () => {
      io.disconnect();
      cancels.forEach((c) => c());
    };
  }, []);

  return (
    <div className="col-lg-5" ref={root}>
      {skills.map((s, i) => (
        <Fragment key={s.title}>
          {i > 0 && " "}
          <div className="proggressBar" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={s.aosDelay}>
            <div className="singleSkill" data-skill={s.value}>
              <h3>{s.title}</h3>{" "}
              <div className="skillWrap">
                <div className="skill">
                  <span />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
