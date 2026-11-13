import { PageShell } from "../components/layout/PageShell";
import { brandHeader, contactHeader, notFoundHeader, teamHeader } from "../components/layout/Header";
import { SiteFooter, TeamFooter } from "../components/layout/Footers";
import { SiteInfo } from "../components/layout/SiteInfo";
import * as Home from "./Home.sections";
import * as Service from "./Service.sections";
import * as About from "./About.sections";
import * as Team from "./Team.sections";
import * as Contact from "./Contact.sections";
import * as NotFound from "./NotFound.sections";

export function HomePage() {
  return (
    <PageShell header={brandHeader} backToTopColor="#264437">
      <Home.Slider01 />
      <Home.ServiceSection />
      <Home.ProjectSection />
      <Home.ProjectSectionSlider />
      <Home.TeamSection />
      <Home.Testimonial01Section />
      <SiteFooter />
      <SiteInfo leadingSpace />
    </PageShell>
  );
}

export function ServicePage() {
  return (
    <PageShell header={brandHeader} backToTopColor="#518249">
      <Service.AboutBanner />
      <Service.ServiceDetailsAB />
      <Service.ServiceDetailsABItemSec />
      <Service.SrvAboutProggressBar />
      <Service.SrvProjectSection />
      <SiteFooter />
      <SiteInfo leadingSpace />
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell header={{ ...brandHeader, cartWidget: true }} backToTopColor="#ff5100">
      <About.AboutBanner />
      <About.AboutSection02 />
      <About.TeamSection />
      <SiteFooter />
      <SiteInfo />
    </PageShell>
  );
}

export function TeamPage() {
  return (
    <PageShell header={teamHeader} backToTopColor="#518249">
      <Team.AboutBanner />
      <Team.TeamSection02 />
      <Team.ClientTestimonilaSec02 />
      <TeamFooter />
      <SiteInfo />
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell header={contactHeader} backToTopColor="#ff5100">
      <Contact.AboutBanner />
      <Contact.ContactInfoSec />
      <Contact.ContactGoogleMap />
      <SiteInfo />
    </PageShell>
  );
}

export function NotFoundPage() {
  return (
    <PageShell header={notFoundHeader} backToTopColor="#518249" bodyClass="page-404">
      <NotFound.FoferrorSec />
    </PageShell>
  );
}
