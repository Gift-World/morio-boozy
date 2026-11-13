import { useEffect, useRef } from "react";
import { fadeOut } from "../../lib/motion";

/**
 * Duration of the original preloader. The theme derived it from
 * `performance.timing` before the load event had fired, which works out to
 * "seconds-past-the-minute at navigation start × 100ms" (0–5.9s). Kept as-is
 * for parity; replace with a fixed value when revamping.
 */
function preloaderDuration(navigationStart: number) {
  return Math.floor((navigationStart / 1000) % 60) * 100;
}

let firstLoad = true;

export function Preloader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navStart = firstLoad ? performance.timeOrigin : Date.now();
    firstLoad = false;
    const time = preloaderDuration(navStart);
    const stepTime = Math.abs(Math.floor(time / 100));
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      if (textRef.current) textRef.current.textContent = `${current}%`;
      if (barRef.current) barRef.current.style.width = `${current}%`;
      if (current === 100) window.clearInterval(timer);
    }, stepTime);
    let cancelFade: (() => void) | undefined;
    const hide = window.setTimeout(() => {
      if (wrapRef.current) cancelFade = fadeOut(wrapRef.current, 400);
    }, time);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(hide);
      cancelFade?.();
    };
  }, []);

  return (
    <div className="preloader-wrap" ref={wrapRef}>
      <div className="loader_bar" ref={barRef} />{" "}
      <div id="precent" ref={textRef} />
    </div>
  );
}
