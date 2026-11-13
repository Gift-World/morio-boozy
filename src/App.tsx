import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AboutPage, ContactPage, HomePage, NotFoundPage, ServicePage, TeamPage } from "./pages";

/** Same URLs as the live Netlify site (pretty URLs plus the old .html paths). */
export const ROUTES = ["/", "/service", "/about", "/team", "/contact", "/404"] as const;

export function App() {
  // Keying by pathname remounts the page shell on navigation, so per-page
  // effects (preloader, AOS, scroll triggers) behave like full page loads.
  const { pathname } = useLocation();
  return (
    <Routes key={pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      {["service", "about", "team", "contact", "404"].map((p) => (
        <Route key={p} path={`/${p}.html`} element={<Navigate to={`/${p}`} replace />} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
