import { Navigate, Route, Routes } from "react-router-dom";
import { services } from "./content/services";
import { Layout } from "./site/Layout";
import { HomePage } from "./site/pages/Home";
import { ServiceDetailPage, ServicesPage } from "./site/pages/Services";
import { WorkPage } from "./site/pages/Work";
import { AboutPage } from "./site/pages/About";
import { ContactPage } from "./site/pages/Contact";
import { NotFoundPage } from "./site/pages/NotFound";

/** Every page that gets prerendered to static HTML. */
export const ROUTES = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/work",
  "/about",
  "/contact",
  "/404",
] as const;

/** Old URLs from the static site (also 301-redirected in netlify.toml). */
const LEGACY: Record<string, string> = {
  "/index.html": "/",
  "/service": "/services",
  "/service.html": "/services",
  "/about.html": "/about",
  "/team": "/about",
  "/team.html": "/about",
  "/contact.html": "/contact",
};

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="404" element={<NotFoundPage />} />
        {Object.entries(LEGACY).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
