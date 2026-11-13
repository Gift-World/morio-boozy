import { useEffect, useRef } from "react";
import { animateScrollTop } from "../../lib/motion";

/** Back-to-top button: appears after one viewport of scrolling. */
export function BackToTop({ borderColor }: { borderColor: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const onScroll = () => {
      const show = window.scrollY > document.documentElement.clientHeight;
      el.style.bottom = show ? "30px" : "-30px";
      el.style.opacity = show ? "1" : "0";
      el.style.visibility = show ? "visible" : "hidden";
      el.classList.toggle("active", show);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className="magic-hover"
      data-radius="50%"
      data-border-color={borderColor}
      href="#"
      id="backtotop"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        animateScrollTop(0);
      }}
    >
      <i className="boozy-long-up-arrow" />
    </a>
  );
}
