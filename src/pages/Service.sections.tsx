// Sections of the Service page, ported 1:1 from service.html.
import { BannerSlider, SrvSlideshow } from "../components/widgets/Rotators";
import { SkillBars } from "../components/widgets/SkillBars";
import { OwlCarousel } from "../components/widgets/OwlCarousel";
import { projectCarouselOptions } from "../components/widgets/carouselOptions";
import { noop } from "../lib/device";

export function AboutBanner() {
  return (
    <section className="aboutBanner">
      <BannerSlider images={["/assets/images/projects/ab4.jpeg","/assets/images/projects/morio2.jpg","/assets/images/projects/ab5.jpeg","/assets/images/projects/morio3.jpg","/assets/images/projects/ab6.jpeg"]} />
      {" "}
      <div className="container relative-content">
        <div className="row">
          <div className="col-lg-12 col-xl-8 offset-xl-2">
            <div className="pageBannerContent text-center">
              <h2>services</h2>
              {" "}
              <div className="pageBannerPath" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailsAB() {
  return (
    <section className="serviceDetailsAB">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="srvDetailsAbContent" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">
              <div className="serviceCat">
                <a href="#" onClick={noop}>Our Craft</a>
              </div>
              {" "}
              <h2>
                {"Small Agency. "}
                <br />
                Big Ideas.
              </h2>
              {" "}
              <p>Great work rarely happens in isolation. Morio Studio exists at the intersection of strategy, creativity, and craft — embedding ourselves in your world as a thinking partner, a creative collaborator, and a full execution team. We work with agencies, brands, and independent clients to bring ideas from concept to completion, with precision, care, and no unnecessary complexity. We believe the best outcomes come from co-creation, and we bring the strategic rigour and creative agility to make it count. Because small doesn't mean limited. It means focused.</p>
              {" "}
              <p>
                <i>{" Five disciplines. One shared obsession — turning a brief into something that moves people, changes behaviour and shifts mind sets. "}</i>
              </p>
            </div>
          </div>
          {" "}
          <div className="col-lg-6">
            <div className="srvDetailsAbThumb bzImageFlash" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="5000" style={{ position: "relative", overflow: "hidden" }}>
              <SrvSlideshow images={["/assets/images/service/m1.jpeg","/assets/images/service/m2.jpeg","/assets/images/service/m3.jpeg"]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailsABItemSec() {
  return (
    <section className="serviceDetailsABItemSec">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div id="creative-direction" className="srvDetailsAbSingleItem" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
              <h3>
                <a href="#" onClick={noop}>1. Creative & art direction</a>
              </h3>
              {" "}
              <p>Every great project starts with a point of view. Our creative and art direction service is where strategy meets instinct — we shape the visual and conceptual language that holds a campaign, brand, or story together. From the first moodboard to the final frame, we make sure everything looks, feels, and speaks with intention. We don't just manage aesthetics; we protect the idea.</p>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4">
            <div id="graphic-design" className="srvDetailsAbSingleItem" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="900" data-aos-delay="150">
              <h3>
                <a href="#" onClick={noop}>2. Graphic design & branding</a>
              </h3>
              {" "}
              <p>A brand is more than a logo — it's the feeling someone gets before they read a single word. We build visual identities that are bold enough to stand out and coherent enough to last. From brand systems and typography to packaging and print, our design work is rooted in human behaviour and built for real-world application. We make sure your brand means something, wherever it shows up.</p>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4">
            <div id="films-docs" className="srvDetailsAbSingleItem" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000" data-aos-delay="200">
              <h3>
                <a href="#" onClick={noop}>3. Films & documentaries</a>
              </h3>
              {" "}
              <p>We believe the most powerful tool for change is a story told well. Whether it's a brand film, a short documentary, or a campaign video, we approach every production with the same rigour — research, craft, and a deep respect for the people on screen. Kenyan stories told authentically with a global eye. We handle everything from concept and scripting through to shoot and post, so the only thing you need to bring is the brief.</p>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4">
            <div id="photography" className="srvDetailsAbSingleItem" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1100" data-aos-delay="250">
              <h3>
                <a href="#" onClick={noop}>{"4. Photography & illustration "}</a>
              </h3>
              {" "}
              <p>Still images carry worlds. Our photography captures people, products, and places with honesty and intention — no over-styled artifice, just the real thing made beautiful. Paired with our illustration work, which ranges from editorial and character design to custom brand assets, we give clients a visual vocabulary that's entirely their own. Every image we make is designed to get the job done and leave a lasting impression.</p>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4">
            <div id="animation" className="srvDetailsAbSingleItem" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1200" data-aos-delay="300">
              <h3>
                <a href="#" onClick={noop}>{"5. Animation & AI-mation "}</a>
              </h3>
              {" "}
              <p>Motion is where ideas truly come alive. We craft animations that range from sleek motion graphics and 2D character work to cutting-edge AI-assisted visuals that push the boundaries of what's possible on any budget. This is where Morio's love for technology meets our love for storytelling — using every tool available, new and old, to create work that is Relevant, Original and Impactful. Fast, inventive, and built for the scroll-speed world we all live in.</p>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4">
            <div id="photography" className="srvDetailsAbSingleItem" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1100" data-aos-delay="250">
              <h3>
                <a href="#" onClick={noop}>{"6. Livestreaming & Broadcast "}</a>
              </h3>
              {" "}
              <p>We deliver seamless livestreaming experiences that bring events, launches, and stories to audiences in real time. From setup to direction, we handle everything needed to produce smooth, high-quality broadcasts that feel professional and engaging. This is where Morio’s technical precision meets our love for storytelling — using modern tools to make live content feel cinematic, reliable, and impactful for today’s fast-moving digital world</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SrvAboutProggressBar() {
  return (
    <section className="srv_AboutProggress_bar">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <h2 className="abProggressHeading" data-aos="fade-up" data-aos-duration="1100">Our team have 20+ years delivering projects on a global stage. Because of that experience, the world's most exciting and progressive.</h2>
          </div>
          {" "}
          <SkillBars skills={[{"title":"Idea","value":60},{"title":"Design","value":80,"aosDelay":"100"},{"title":"Development","value":60,"aosDelay":"150"}]} />
        </div>
      </div>
    </section>
  );
}

export function SrvProjectSection() {
  return (
    <section className="srvProjectSection">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="secHeading" id="projectHeading">
              <h3>Latest projects</h3>
            </div>
          </div>
        </div>
      </div>
      {" "}
      <div className="projectSection_sliderWrapper">
        <OwlCarousel className="projectCarousel owl-carousel" options={projectCarouselOptions}>
          <div className="project_item projectItemView webDesign brand development" data-firstline="" data-secondline="">
            <div className="project_item_thumb">
              <img src="/assets/images/projects/ps-1.jpg" alt="project" />
            </div>
            {" "}
            <a href="#" className="project_item_dtls">
              {" "}
              <div className="projectInfoContent">
                <h3 className="ps_item_name">cREATIVE bRCOHURE</h3>
                {" "}
                <br />
                {" "}
                <h4 className="ps_auth_name">Brochure Design</h4>
              </div>
              {" "}
            </a>
          </div>
          {" "}
          <div className="project_item projectItemView webDesign brand photoGraphy development" data-firstline="" data-secondline="">
            <div className="project_item_thumb">
              <img src="/assets/images/projects/ps-2.jpg" alt="project" />
            </div>
            {" "}
            <a href="#" className="project_item_dtls">
              {" "}
              <div className="projectInfoContent">
                <h3 className="ps_item_name">Photography Camera</h3>
                {" "}
                <br />
                {" "}
                <h4 className="ps_auth_name">Canon</h4>
              </div>
              {" "}
            </a>
          </div>
          {" "}
          <div className="project_item projectItemView webDesign development photoGraphy" data-firstline="" data-secondline="">
            <div className="project_item_thumb">
              <img src="/assets/images/projects/ps-3.jpg" alt="project" />
            </div>
            {" "}
            <a href="#" className="project_item_dtls">
              {" "}
              <div className="projectInfoContent">
                <h3 className="ps_item_name">Brand Identity</h3>
                {" "}
                <br />
                {" "}
                <h4 className="ps_auth_name">Chanel Perfumes</h4>
              </div>
              {" "}
            </a>
          </div>
          {" "}
          <div className="project_item projectItemView brand photoGraphy development" data-firstline="" data-secondline="">
            <div className="project_item_thumb">
              <img src="/assets/images/projects/ps-4.jpg" alt="project" />
            </div>
            {" "}
            <a href="#" className="project_item_dtls">
              {" "}
              <div className="projectInfoContent">
                <h3 className="ps_item_name">Aps Development</h3>
                {" "}
                <br />
                {" "}
                <h4 className="ps_auth_name">Development</h4>
              </div>
              {" "}
            </a>
          </div>
          {" "}
          <div className="project_item projectItemView brand photoGraphy development" data-firstline="" data-secondline="">
            <div className="project_item_thumb">
              <img src="/assets/images/projects/ps-5.jpg" alt="project" />
            </div>
            {" "}
            <a href="#" className="project_item_dtls">
              {" "}
              <div className="projectInfoContent">
                <h3 className="ps_item_name">cREATIVE bRCOHURE</h3>
                {" "}
                <br />
                {" "}
                <h4 className="ps_auth_name">Brochure Design</h4>
              </div>
              {" "}
            </a>
          </div>
          {" "}
          <div className="project_item projectItemView brand webDesign development" data-firstline="" data-secondline="">
            <div className="project_item_thumb">
              <img src="/assets/images/projects/ps-6.jpg" alt="project" />
            </div>
            {" "}
            <a href="#" className="project_item_dtls">
              {" "}
              <div className="projectInfoContent">
                <h3 className="ps_item_name">Brand Identity</h3>
                {" "}
                <br />
                {" "}
                <h4 className="ps_auth_name">Brochure Design</h4>
              </div>
              {" "}
            </a>
          </div>
          {" "}
          <div className="project_item projectItemView brand photoGraphy webDesign" data-firstline="" data-secondline="">
            <div className="project_item_thumb">
              <img src="/assets/images/projects/ps-7.jpg" alt="project" />
            </div>
            {" "}
            <a href="#" className="project_item_dtls">
              {" "}
              <div className="projectInfoContent">
                <h3 className="ps_item_name">cREATIVE bRCOHURE</h3>
                {" "}
                <br />
                {" "}
                <h4 className="ps_auth_name">Brochure Design</h4>
              </div>
              {" "}
            </a>
          </div>
        </OwlCarousel>
      </div>
    </section>
  );
}
