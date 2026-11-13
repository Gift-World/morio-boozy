import { useEffect } from "react";
import { gsap } from "gsap";
import { isMobile } from "../../lib/device";

/*
 * The theme's custom cursor ("magic mouse"), ported from common.js `Core()`.
 * A ball follows the pointer with easing and morphs when hovering certain
 * elements. jQuery's per-element mouseenter/mouseleave bindings are replaced
 * by document-level delegation that fires in the same order (enter:
 * outermost → innermost, leave: innermost → outermost; registration order
 * within one element).
 */

type Handler = (el: HTMLElement, e: MouseEvent) => void;
interface Binding {
  type: "enter" | "leave" | "move";
  selector: string;
  fn: Handler;
}

const RESET = { borderWidth: "4px", scale: 0.5, opacity: 1, borderColor: "#999999", backgroundColor: "transparent", width: "80px", height: "80px" };
const OFFSET_X = 35;

export function MagicCursor() {
  useEffect(() => {
    const body = document.body;
    const mobile = isMobile();
    body.classList.toggle("disable-cursor", mobile);
    const onResize = () => body.classList.toggle("disable-cursor", document.documentElement.clientWidth <= 1024);
    // The original only attached the resize watcher on desktop-sized loads.
    if (!mobile) window.addEventListener("resize", onResize);
    if (mobile) return;

    const ball = document.getElementById("ball")!;
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const ratio = 0.65;
    let active = false;

    gsap.set(ball, { xPercent: -50, yPercent: -50, scale: 0.5, borderWidth: "4px", width: "80px", height: "80px" });

    const mouseMove = (e: MouseEvent) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY - (window.pageYOffset || document.documentElement.scrollTop);
    };
    document.addEventListener("mousemove", mouseMove);

    const updatePosition = () => {
      if (!active) {
        pos.x += (mouse.x - pos.x) * ratio;
        pos.y += (mouse.y - pos.y) * ratio;
        gsap.to(ball, { duration: 0.4, x: pos.x, y: pos.y });
      }
    };
    gsap.ticker.add(updatePosition);
    const follow = () => gsap.ticker.add(updatePosition);
    const reset = () => {
      gsap.to(ball, RESET);
      follow();
    };

    const bindings: Binding[] = [];
    const on = (type: Binding["type"], selector: string, fn: Handler) => bindings.push({ type, selector, fn });
    const hover = (selector: string, enter: gsap.TweenVars, leave: Handler = reset) => {
      on("enter", selector, () => void gsap.to(ball, enter));
      on("leave", selector, leave);
    };
    const light = (scale: number, opacity = 0.15) => ({ borderWidth: "0px", scale, opacity, borderColor: "rgba(253, 253, 253)", backgroundColor: "rgba(253, 253, 253)" });

    // theme.js: testimonial arrows (bound before Core runs).
    on("enter", ".testimonial01 .owl-nav button", () => void gsap.to(ball, light(1.2)));
    on("leave", ".testimonial01 .owl-nav button", () => void gsap.to("#ball", RESET));

    hover(".mainMenu li", light(1.2));
    hover(".hdOniSocial ul li a, .oniSearch a, .oniCart > a, .hdSupportBtn, .boozyGridMenu a, .pageBannerPath a", light(0.7));
    hover(".hdSupportBtn, .boozyGridMenu a", light(1.1));
    hover(".dfCursor", { borderWidth: "0px", scale: 0.5, opacity: 0, borderColor: "transparent", backgroundColor: "transparent" });
    hover(".footerInfoNav li a, .footerInfoSocial a", light(1));
    hover(".openHoverCursor li a", light(1.4));

    if (document.querySelector(".project_item.projectItemView")) {
      on("enter", ".projectItemView", (el) => {
        gsap.to("#ball", { borderWidth: "2px", scale: 1.1, borderColor: "rgba(0,0,0)", backgroundColor: "rgba(0,0,0)" });
        ball.insertAdjacentHTML("beforeend", `<p class="firstLine">${el.dataset.firstline ?? ""}</p><p class="secondLine">${el.dataset.secondline ?? ""}</p>`);
      });
      on("leave", ".projectItemView", () => {
        reset();
        ball.querySelectorAll("p").forEach((p) => p.remove());
      });
    }

    hover(".tm01Social a", light(0.58, 0.25));

    const stickTo = (el: HTMLElement, side: "left" | "right", scale: number, dx: number, dy = 0) => {
      const r = el.getBoundingClientRect();
      const x = side === "left" ? r.left - OFFSET_X + dx : r.right + OFFSET_X - dx;
      gsap.to(ball, { duration: 0.5, x, y: r.top + r.height / 2 + dy, scale, opacity: 1, borderWidth: "4px", borderColor: "#ff5100" });
      gsap.ticker.remove(updatePosition);
    };
    on("enter", ".sticky.left", (el) => stickTo(el, "left", 0.45, 14));
    on("enter", ".sticky.right", (el) => stickTo(el, "right", 0.45, 14));
    on("enter", ".btnWrapper_sm.sticky.right", (el) => stickTo(el, "right", 0.4, 16, 1));
    on("leave", ".sticky", () => {
      gsap.to(ball, { duration: 0.2, scale: 0.5, borderWidth: "4px", borderColor: "#999", opacity: 1, width: "80px", height: "80px" });
      follow();
    });

    on("enter", ".parallax-wrap.iconWrapper", (el) => {
      gsap.to(ball, { duration: 0.3, scale: 0.45, borderWidth: "4px", opacity: 1, borderColor: "#ff5100" });
      gsap.to(el.children, { duration: 0.3, scale: 1, color: "#ff5100" });
    });
    on("enter", ".iconWrapper_sm.parallax-wrap.iconWrapper", (el) => {
      gsap.to(ball, { duration: 0.3, scale: 0.4, borderWidth: "4px", opacity: 1, borderColor: "#ff5100" });
      gsap.to(el.children, { duration: 0.3, scale: 1, color: "#ff5100" });
    });
    on("leave", ".parallax-wrap", (el) => {
      gsap.to(el, { duration: 0.3, scale: 1, color: "#FFF" });
      gsap.to(ball, { duration: 0.3, scale: 0.5, borderWidth: "4px", opacity: 1, borderColor: "#999999" });
      gsap.to(el.children, { duration: 0.3, scale: 1, x: 0, y: 0, color: "#FFF" });
      active = false;
    });
    on("move", ".parallax-wrap", (el, e) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const rect = el.getBoundingClientRect();
      const relX = e.pageX - rect.left;
      const relY = e.pageY - rect.top;
      pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / 2;
      pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2 - scrollTop) / 2;
      gsap.to(ball, { duration: 0.3, x: pos.x, y: pos.y });
      const target = el.querySelector(".parallax-element");
      if (target) {
        gsap.to(target, {
          duration: 0.3,
          x: ((relX - rect.width / 2) / rect.width) * 20,
          y: ((relY - rect.height / 2 - scrollTop) / rect.height) * 20,
          ease: "power2.out",
        });
      }
    });

    hover(".bzCursroHv > a", light(0.8));

    on("enter", ".magic-hover", (el) => {
      const r = el.getBoundingClientRect();
      gsap.to(ball, {
        duration: 0.4,
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        scale: 1,
        borderWidth: "1px",
        borderColor: el.dataset.borderColor,
        width: r.width,
        height: r.height,
        borderRadius: el.dataset.radius,
      });
      gsap.ticker.remove(updatePosition);
    });
    on("leave", ".magic-hover", () => {
      gsap.to(ball, { duration: 0.2, scale: 0.5, borderWidth: "4px", borderColor: "#999999", opacity: 1, width: "80px", height: "80px", borderRadius: "50%" });
      follow();
    });

    // --- delegation: emulate mouseenter/mouseleave ordering -----------------
    const matches = (type: Binding["type"], from: EventTarget | null) => {
      const hits: { el: HTMLElement; b: Binding; depth: number; i: number }[] = [];
      if (!(from instanceof Element)) return hits;
      bindings.forEach((b, i) => {
        if (b.type !== type) return;
        let el = from.closest<HTMLElement>(b.selector);
        while (el) {
          let depth = 0;
          for (let n: Element | null = el; n; n = n.parentElement) depth++;
          hits.push({ el, b, depth, i });
          el = el.parentElement?.closest<HTMLElement>(b.selector) ?? null;
        }
      });
      return hits;
    };
    const onOver = (e: MouseEvent) => {
      const related = e.relatedTarget as Node | null;
      matches("enter", e.target)
        .filter((h) => !h.el.contains(related))
        .sort((a, b) => a.depth - b.depth || a.i - b.i)
        .forEach((h) => h.b.fn(h.el, e));
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Node | null;
      matches("leave", e.target)
        .filter((h) => !h.el.contains(related))
        .sort((a, b) => b.depth - a.depth || a.i - b.i)
        .forEach((h) => h.b.fn(h.el, e));
    };
    const onMove = (e: MouseEvent) => matches("move", e.target).forEach((h) => h.b.fn(h.el, e));
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(updatePosition);
    };
  }, []);

  return (
    <div id="magic-mouse">
      <div id="ball" />
    </div>
  );
}
