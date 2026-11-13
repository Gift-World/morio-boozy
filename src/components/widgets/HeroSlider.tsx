import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/*
 * Home hero, replacing Slider Revolution 5.4. It renders the DOM the plugin
 * generated (so settings.css / theme.css apply unchanged) and reproduces its
 * layout maths, measured against the live site at 25 viewport widths:
 *
 *  - responsive level by viewport: ≥1200 / ≥992 / ≥768 / below
 *  - grid width/height per level; below the grid width everything scales by
 *    `bw = viewport / gridWidth`, font sizes and widths rounded
 *  - layers centred on the grid; vertical offsets are NOT scaled
 *    (`data-responsive_offset="off"`)
 *  - intro: each layer rises from y:100% while fading in (power4.inOut)
 */

const LEVELS = [1200, 992, 768] as const;
const GRID_W = [1290, 920, 700, 380];
const GRID_H = [1120, 1015, 920, 800];
const MIN_HEIGHT = 650;
const LETTER_SPACING = [-2, -2, -2, -1];

interface Layer {
  className: string;
  voffset: [number, number, number, number];
  fontsize: [number, number, number, number];
  lineheight: [number, number, number, number];
  width: [number, number, number, number];
  heading?: boolean;
  delay: number;
  speed: number;
  content: ReactNode;
}

const LAYERS: Layer[] = [
  {
    className: "tp-caption boozyBH1 antonio textLayer",
    voffset: [-210, -190, -170, 0],
    fontsize: [120, 95, 70, 32],
    lineheight: [120, 95, 70, 44],
    width: [750, 620, 480, 320],
    heading: true,
    delay: 1200,
    speed: 500,
    content: (
      <>
        Small Agency, <br /> <span>Big Ideas.</span>
      </>
    ),
  },
  {
    className: "tp-caption textPLayer jost",
    voffset: [40, 35, 25, 140],
    fontsize: [18, 17, 16, 13],
    lineheight: [30, 28, 26, 20],
    width: [650, 560, 420, 300],
    delay: 1300,
    speed: 600,
    content: (
      <>
        {
          "Built on passion and love for creativity and storytelling. Morio Studio’s is the brain child of 4 Kenyan friends who had a common goal, to craft an agency that would be nimble, versatile and smart. "
        }
        <span className="d-none d-md-inline">
          With each morio possessing a unique skill set that complimented the whole. We believe in smart, innovative
          solutions to problem solving and meeting the clients goals. We put human thinking and technological efficiency
          together to create workflows that solve any brief from concept to execution.
        </span>
      </>
    ),
  },
];

const levelFor = (w: number) => {
  const i = LEVELS.findIndex((l) => w >= l);
  return i === -1 ? 3 : i;
};

export function HeroSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const forcerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const slider = sliderRef.current!;
    const forcer = forcerRef.current!;

    const layout = () => {
      const W = document.documentElement.clientWidth;
      const lvl = levelFor(W);
      const bw = Math.min(1, W / GRID_W[lvl]);
      const H = Math.max(MIN_HEIGHT, GRID_H[lvl] * bw);
      const h = `${Math.round(H)}px`;
      slider.style.display = "";
      Object.assign(wrapper.style, { height: h, width: `${W}px` });
      Object.assign(slider.style, { maxHeight: h, height: h });
      forcer.style.height = h;

      LAYERS.forEach((layer, i) => {
        const cap = capRefs.current[i]!;
        const pw = layerRefs.current[i]!;
        const w = layer.width[lvl] * bw;
        Object.assign(cap.style, {
          lineHeight: `${Math.round(layer.lineheight[lvl] * bw)}px`,
          letterSpacing: `${layer.heading ? LETTER_SPACING[lvl] : 0}px`,
          fontSize: `${Math.round(layer.fontsize[lvl] * bw)}px`,
          minWidth: `${Math.round(w)}px`,
          maxWidth: `${Math.round(w)}px`,
        });
        const ow = cap.offsetWidth;
        const effW = Math.abs(ow - w) < 1 ? w : ow;
        pw.style.left = `${Math.floor((W - effW) / 2)}px`;
        pw.style.top = `${Math.floor((H - cap.offsetHeight) / 2 + layer.voffset[lvl])}px`;
      });
    };

    layout();
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(layout, 50);
    };
    window.addEventListener("resize", onResize);
    // Layer heights depend on the web fonts; re-measure once they (and the
    // rest of the page) have loaded, like the plugin did.
    let alive = true;
    void document.fonts?.ready.then(() => alive && layout());
    document.fonts?.addEventListener("loadingdone", onResize);
    window.addEventListener("load", onResize);

    const ctx = gsap.context(() => {
      LAYERS.forEach((layer, i) => {
        const pw = layerRefs.current[i]!;
        const cap = capRefs.current[i]!;
        gsap.set(cap, { yPercent: 100, opacity: 0.0001 });
        gsap.set(pw, { visibility: "visible", delay: layer.delay / 1000 });
        gsap.to(cap, { yPercent: 0, opacity: 1, duration: layer.speed / 1000, delay: layer.delay / 1000, ease: "power4.inOut" });
      });
    });

    return () => {
      alive = false;
      document.fonts?.removeEventListener("loadingdone", onResize);
      window.removeEventListener("load", onResize);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section className="slider01">
      <div
        className="forcefullwidth_wrapper_tp_banner"
        id="rev_slider_1_forcefullwidth"
        style={{ position: "relative", width: "100%", height: "auto", marginTop: "0px", marginBottom: "0px" }}
      >
        <div
          className="rev_slider_wrapper"
          ref={wrapperRef}
          style={{ marginTop: "0px", marginBottom: "0px", position: "absolute", overflow: "visible", left: "0px" }}
        >
          <div
            id="rev_slider_1"
            className="rev_slider fullwidthabanner revslider-initialised tp-simpleresponsive"
            ref={sliderRef}
            style={{ marginTop: "0px", marginBottom: "0px" }}
            data-version="5.4.1"
            data-slideactive="rs-3048"
          >
            <ul
              className="tp-revslider-mainul"
              style={{ visibility: "visible", display: "block", overflow: "hidden", width: "100%", height: "100%", maxHeight: "none" }}
            >
              <li
                className="defaultBg_overlay tp-revslider-slidesli active-revslide"
                data-index="rs-3048"
                style={{ perspective: "6000px", width: "100%", height: "100%", overflow: "hidden", zIndex: 20, visibility: "inherit", opacity: 1 }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  preload="auto"
                  poster="/assets/images/slider/hero-poster.webp"
                  ref={(v) => {
                    // React doesn't serialise `muted` to HTML; make sure the
                    // autoplaying background video starts after hydration.
                    if (v && !v.muted) {
                      v.muted = true;
                      void v.play().catch(() => {});
                    }
                  }}
                >
                  <source src="/assets/images/slider/Black-And-White-Video.mp4" type="video/mp4" />
                </video>
                {LAYERS.map((layer, i) => {
                  // the headline is the home page's <h1>
                  const Caption = layer.heading ? "h1" : "div";
                  return (
                  <div
                    key={i}
                    className="tp-parallax-wrap"
                    ref={(el) => {
                      layerRefs.current[i] = el;
                    }}
                    style={{ position: "absolute", display: "block", visibility: "hidden", zIndex: 1 }}
                  >
                    <div className="tp-loop-wrap" style={{ position: "absolute", display: "block" }}>
                      <div className="tp-mask-wrap" style={{ position: "absolute", display: "block", overflow: "visible" }}>
                        <Caption
                          className={layer.className}
                          ref={(el) => {
                            capRefs.current[i] = el;
                          }}
                          style={{
                            visibility: "inherit",
                            transition: "none",
                            textAlign: "center",
                            borderWidth: "0px",
                            margin: "0px",
                            padding: "0px",
                            fontWeight: 400,
                            whiteSpace: "normal",
                            minHeight: "0px",
                            maxHeight: "none",
                            color: "rgb(255, 255, 255)",
                            transformOrigin: "50% 50% 0px",
                          }}
                        >
                          {layer.content}
                        </Caption>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </li>
            </ul>
            <div className="tp-loader " style={{ display: "none" }}>
              <div className="dot1" />
              <div className="dot2" />
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
            <div className="tp-bannertimer" style={{ visibility: "hidden", width: "0%" }} />
          </div>
        </div>
        <div className="tp-fullwidth-forcer" ref={forcerRef} style={{ width: "100%" }} />
      </div>
    </section>
  );
}
