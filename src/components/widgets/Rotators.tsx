import { Fragment, useEffect, useState, type CSSProperties } from "react";
import { Photo, bgVars } from "../Photo";

/** Cycles an index every `interval` ms (the pages' inline slideshow scripts). */
function useCycle(length: number, interval: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => window.clearInterval(t);
  }, [length, interval]);
  return index;
}

/**
 * Cross-fading background images behind the inner-page banners (5s).
 * Only the visible slide and the next one get their image, so the rest
 * download just before they're shown instead of all up front.
 */
export function BannerSlider({ images }: { images: string[] }) {
  const active = useCycle(images.length, 5000);
  const [loaded, setLoaded] = useState(2);
  useEffect(() => setLoaded((n) => Math.max(n, active + 2)), [active]);
  return (
    <div className="banner-slider">
      {images.map((src, i) => (
        <Fragment key={src + i}>
          {i > 0 && " "}
          <div className={`slide${i === active ? " active" : ""}`} style={i < loaded ? (bgVars(src) as CSSProperties) : undefined} />
        </Fragment>
      ))}
    </div>
  );
}

/** Image slideshow on the services intro (4s). */
export function SrvSlideshow({ images }: { images: string[] }) {
  const active = useCycle(images.length, 4000);
  return (
    <div className="srv-slideshow">
      {images.map((src, i) => (
        <Fragment key={src + i}>
          {i > 0 && " "}
          <Photo
            src={src}
            alt="Morio Studios at work"
            sizes="(min-width: 992px) 50vw, 100vw"
            className={`srv-slide${i === active ? " active" : ""}`}
          />
        </Fragment>
      ))}
    </div>
  );
}
