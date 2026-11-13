import { heads } from "./heads";

export const routeHead = (pathname: string) => heads[pathname] ?? heads["/404"];

/**
 * Swap the managed <head> tags when navigating client-side so each route keeps
 * the title/meta it had as a static page. Tags carry `data-route-head`; the
 * prerendered HTML already contains them for the first load.
 */
export function applyHead(pathname: string) {
  const { title, head } = routeHead(pathname);
  document.title = title;
  const managed = document.head.querySelectorAll("[data-route-head]");
  const tpl = document.createElement("template");
  tpl.innerHTML = head;
  const incoming = Array.from(tpl.content.children);
  const same =
    managed.length === incoming.length &&
    incoming.every((el, i) => el.outerHTML.replace(/ data-route-head=""/, "") === managed[i].outerHTML.replace(/ data-route-head=""/, ""));
  if (same) return;
  managed.forEach((el) => {
    // never re-run or remove scripts that already executed (analytics)
    if (el.tagName !== "SCRIPT") el.remove();
  });
  for (const el of incoming) {
    if (el.tagName === "SCRIPT") {
      const key = el.getAttribute("src") ?? el.textContent;
      const exists = Array.from(document.head.querySelectorAll("script")).some((s) => (s.getAttribute("src") ?? s.textContent) === key);
      if (exists) continue;
      const s = document.createElement("script");
      for (const a of Array.from(el.attributes)) s.setAttribute(a.name, a.value);
      s.textContent = el.textContent;
      s.setAttribute("data-route-head", "");
      document.head.appendChild(s);
    } else {
      el.setAttribute("data-route-head", "");
      document.head.appendChild(el);
    }
  }
}
