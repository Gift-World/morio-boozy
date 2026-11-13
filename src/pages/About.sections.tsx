// Sections of the About page, ported 1:1 from about.html.
import { BannerSlider } from "../components/widgets/Rotators";

export function AboutBanner() {
  return (
    <section className="aboutBanner">
      <BannerSlider images={["/assets/images/projects/ab1.jpeg","/assets/images/projects/ab2.jpeg","/assets/images/projects/ab3.jpeg"]} />
      {" "}
      <div className="container relative-content">
        <div className="row">
          <div className="col-lg-12 col-xl-8 offset-xl-2">
            <div className="pageBannerContent text-center">
              <h1>THE MORIOS</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection02() {
  return (
    <section className="aboutSection02">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="boozyabHd text-center" data-aos="fade-down" data-aos-duration="1800" data-aos-easing="linear">
              <div className="boozyabHd text-center" data-aos="fade-down" data-aos-duration="1800" data-aos-easing="linear">
                <p className="aboutLead">
                  <strong>Morio</strong>
                  {" is Kiswahili slang for a friend — someone you can count on."}
                </p>
                {" "}
                <p className="aboutLead">
                  <strong>Morio Studios</strong>
                  {" is a collective of four brilliant creative minds bringing unique flavour to the creative soup. Founded in 2024, a light-bulb moment sparked a studio blending talents across ideation, concept development, creative direction, graphic design, animation, photography, and film."}
                </p>
                {" "}
                <p className="aboutLead">We deliver end-to-end creative output, from concept to final production — bringing brand and human stories to life through a fusion of talent, skill, and experience. With new-age thinking, our workflows integrate AI creative tools to accelerate conceptualization and visualization, giving us the edge to deliver high-quality creativity in record time.</p>
                {" "}
                <p className="aboutLead aboutTagline">
                  <strong>Where vision meets innovation, Morio creates.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="teamSection teamShowcase">
      <div className="container">
        <div className="secHeading">
          <h3>Our Experienced Team</h3>
        </div>
        {" "}
        <div className="teamSplit">
          <div className="teamSplit_left">
            <h2 className="teamName">FEYSAL ANTHONY NAIR:</h2>
            {" "}
            <p className="teamRole">CREATIVE DIRECTOR</p>
            {" "}
            <div className="teamLine" />
            {" "}
            <p className="teamBio">This morio is a multi disciplinary creative with over 24 yrs of experience in Art Direction and Creative Direction. Having been mentored by some of the most creative minds in Africa Feysal has worked on award winning campaigns for brands like Safaricom, Diageo, ICEA Lion, Bidco, Grain Industries, Bayer, USAID, I&M bank, GOK, Toyota, Jetlak Foods, Seychelles Tourism Board, Magical Kenya, Air Kenya, SBM Bank, Cooperative Bank, Frytol Ghana, Wilderness Lodges and Pernod Ricard.</p>
            {" "}
            <a className="teamBtn" href="https://www.behance.net/feysless" target="_blank">{" Portfolio >> "}</a>
          </div>
          {" "}
          <div className="teamSplit_right">
            <div className="teamGlow" />
            {" "}
            <img className="teamPhoto" src="/assets/images/team/FEY2.jpeg" alt="Feysal" />
          </div>
        </div>
        {" "}
        <div className="teamSplit">
          <div className="teamSplit_left">
            <h2 className="teamName">SYDNEY ANG'ILA:</h2>
            {" "}
            <p className="teamRole">FILM AND PRODUCTION DIRECTOR</p>
            {" "}
            <div className="teamLine" />
            {" "}
            <p className="teamBio">A morio with a talent for film editing and a passion for weaving cap- tivating stories through the power of post-production. Posseses a keen eye for detail and a dedication to crafting visual narratives, transforming raw footage into polished works that inspire audiences. Having collaborated with notable organizations like Deutsche Ge- sellschaft für Internationale Zusammenarbeit (GIZ), the Centre for Agriculture and Biosciences International (CABI), OKHI Kenya, Ul- tra Events Uwezo Fund, Youth Fund, and Africa’s Campus Battle.</p>
            {" "}
            <a className="teamBtn" href="https://www.behance.net/videopicha" target="_blank">{" Portfolio >> "}</a>
          </div>
          {" "}
          <div className="teamSplit_right">
            <div className="teamGlow" />
            {" "}
            <img className="teamPhoto" src="/assets/images/team/SYD2.jpeg" alt="Sydney" />
          </div>
        </div>
        {" "}
        <div className="teamSplit">
          <div className="teamSplit_left">
            <h2 className="teamName">BRIAN MACHARIA:</h2>
            {" "}
            <p className="teamRole">ART DIRECTOR AND GRAPHIC DESIGNER</p>
            {" "}
            <div className="teamLine" />
            {" "}
            <p className="teamBio">The Dynamic and innovative morio is a graphic designer with 5+ years of ex- perience in webpage design and branding across a wide range of campaigns. Over the past 2 years, managed to produce various art direction for different campaigns. Experienced in both print and digital design. Skilled in Adobe Creative Suite.</p>
            {" "}
            <a className="teamBtn" href="https://www.behance.net/brayanmacharia" target="_blank">{" Portfolio >> "}</a>
          </div>
          {" "}
          <div className="teamSplit_right">
            <div className="teamGlow" />
            {" "}
            <img className="teamPhoto" src="/assets/images/team/BRI-2.jpeg" alt="Brian" />
          </div>
        </div>
        {" "}
        <div className="teamSplit">
          <div className="teamSplit_left">
            <h2 className="teamName">VINCENT KARANI:</h2>
            {" "}
            <p className="teamRole">ANIMATION AND POST PRODUCTION DIRECTOR</p>
            {" "}
            <div className="teamLine" />
            {" "}
            <p className="teamBio">This morio is an artist adept at a number of skills. including Design, Animation, Photography, Videography and Editing. He is currently in the third year of holding a tenure as an animator and editor. He is pas- sionate about filmmaking and film scripting.</p>
            {" "}
            <a className="teamBtn" href="https://www.behance.net/vincentkarani1" target="_blank">{" Portfolio >> "}</a>
          </div>
          {" "}
          <div className="teamSplit_right">
            <div className="teamGlow" />
            {" "}
            <img className="teamPhoto" src="/assets/images/team/VIN2.jpeg" alt="Team member" />
          </div>
        </div>
      </div>
    </section>
  );
}
