import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App, ROUTES } from "./App";
import { routeHead } from "./seo/applyHead";

export { ROUTES };

/** Render a route to static HTML for the prerender step. */
export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </StaticRouter>,
  );
  const { title, head } = routeHead(url);
  return { html, title, head };
}
