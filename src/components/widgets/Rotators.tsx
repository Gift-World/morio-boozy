import { Fragment, useEffect, useState } from "react";

/** Cycles an index every `interval` ms (the pages' inline slideshow scripts). */
function useCycle(length: number, interval: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => window.clearInterval(t);
  }, [length, interval]);
  return index;
}

/** Cross-fading background images behind the inner-page banners (5s). */
export function BannerSlider({ images }: { images: string[] }) {
  const active = useCycle(images.length, 5000);
  return (
    <div className="banner-slider">
      {images.map((src, i) => (
        <Fragment key={src + i}>
          {i > 0 && " "}
          <div className={`slide${i === active ? " active" : ""}`} style={{ backgroundImage: `url('${src}')` }} />
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
          <img src={src} alt="service-image" className={`srv-slide${i === active ? " active" : ""}`} />
        </Fragment>
      ))}
    </div>
  );
}
