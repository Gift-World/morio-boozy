import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Fades and lifts its content in when it scrolls into view. Server-rendered
 * HTML is always visible; the effect is only armed after hydration and only
 * for elements that start below the fold, so it never delays first paint.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: "div" | "li" | "section" | "article";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={(el: HTMLElement | null) => void (ref.current = el)} className={className}>
      {children}
    </Tag>
  );
}
