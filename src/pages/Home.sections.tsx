// Sections of the Home page, ported 1:1 from index.html.
import { HeroSlider } from "../components/widgets/HeroSlider";
import { OwlCarousel } from "../components/widgets/OwlCarousel";
import { projectCarouselOptions, testimonialOptions } from "../components/widgets/carouselOptions";
import { Link } from "react-router-dom";
import { noop } from "../lib/device";

export function Slider01() {
  return <HeroSlider />;
}

export function ServiceSection() {
  return (
    <section className="serviceSection">
      <div className="container">
        <div className="row">
          <div className="cl-md-12">
            <div className="secHeading">
              <h3>Our Craft</h3>
              {" "}
              <div className="button-wrap right">
                <Link to="/service">
                  {" "}
                  <div className="button-text sticky right">
                    <span>More Craft</span>
                  </div>
                  {" "}
                  <div className="iconWrapper parallax-wrap">
                    <div className="button-icon parallax-element">
                      <i className="boozy-long-r-arrow" />
                    </div>
                  </div>
                  {" "}
                </Link>
              </div>
            </div>
            {" "}
            <div className="serviceBrand_area">
              <div className="serviceBrand_hading" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="350">
                <h2>
                  {"If the big idea is good, "}
                  <br />
                  {" "}
                  <span id="srvTextStrok">{"Execution is academic. "}</span>
                </h2>
              </div>
              {" "}
              <div className="serviceBrand_list">
                <ul className="openHoverCursor">
                  <li data-aos="fade-up" data-aos-duration="8800">
                    <Link className="no-cursor" to="/service#creative-direction">
                      {" "}
                      <img className="serviceList_lsIcon" src="/assets/images/icon/icon_creative.png" alt="pyramid" />
                      {" "}
                      <span>{"Creative direction and Art direction "}</span>
                      {" "}
                      <i className="boozy-down-arrow strokeText" />
                      {" "}
                    </Link>
                  </li>
                  {" "}
                  <li data-aos="fade-up" data-aos-duration="1800">
                    <Link className="no-cursor" to="/service#graphic-design">
                      {" "}
                      <img className="serviceList_lsIcon" src="/assets/images/icon/icon_graphic.png" alt="cube" />
                      {" "}
                      <span>{"Graphic Design and Branding "}</span>
                      {" "}
                      <i className="boozy-down-arrow strokeText" />
                      {" "}
                    </Link>
                  </li>
                  {" "}
                  <li data-aos="fade-up" data-aos-duration="2100">
                    <Link className="no-cursor" to="/service#films-docs">
                      {" "}
                      <img className="serviceList_lsIcon" src="/assets/images/icon/icon_film.png" alt="3dAnimation" />
                      {" "}
                      <span>{"Films and Documentaries "}</span>
                      {" "}
                      <i className="boozy-down-arrow strokeText" />
                      {" "}
                    </Link>
                  </li>
                  {" "}
                  <li data-aos="fade-up" data-aos-duration="2100">
                    <Link className="no-cursor" to="/service#photography">
                      {" "}
                      <img className="serviceList_lsIcon" src="/assets/images/icon/icon_photo.png" alt="3dAnimation" />
                      {" "}
                      <span>{"Photography and Illustration "}</span>
                      {" "}
                      <i className="boozy-down-arrow strokeText" />
                      {" "}
                    </Link>
                  </li>
                  {" "}
                  <li data-aos="fade-up" data-aos-duration="2100">
                    <Link className="no-cursor" to="/service#animation">
                      {" "}
                      <img className="serviceList_lsIcon" src="/assets/images/icon/icon_anim.png" alt="3dAnimation" />
                      {" "}
                      <span>{"Animation and AI-mation "}</span>
                      {" "}
                      <i className="boozy-down-arrow strokeText" />
                      {" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectSection() {
  return (
    <section className="projectSection">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="secHeading" id="projectHeading">
              <h3>Latest projects</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectSectionSlider() {
  return (
    <section className="projectSection_slider">
      <OwlCarousel className="projectCarousel owl-carousel owl-theme" options={projectCarouselOptions}>
        <div className="project_item webDesign brand development">
          <div className="project_item_thumb">
            <img src="/assets/images/projects/maizeflour.jpg" alt="project" />
          </div>
        </div>
        {" "}
        <div className="project_item webDesign brand photoGraphy development">
          <div className="project_item_thumb">
            <img src="/assets/images/projects/lt2.jpeg" alt="project" />
          </div>
        </div>
        {" "}
        <div className="project_item webDesign development photoGraphy">
          <div className="project_item_thumb">
            <img src="/assets/images/projects/branding.jpg" alt="project" />
          </div>
        </div>
        {" "}
        <div className="project_item_thumb">
          <img src="/assets/images/projects/morio4.jpg" alt="project" />
        </div>
      </OwlCarousel>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="teamSection">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="secHeading">
              <h3>Meet the Morios</h3>
              {" "}
              <div className="button-wrap right">
                <Link to="/about">
                  {" "}
                  <div className="button-text sticky right">
                    <span>{" Know the Morios"}</span>
                  </div>
                  {" "}
                  <div className="iconWrapper parallax-wrap">
                    <div className="button-icon parallax-element">
                      <i className="boozy-long-r-arrow" />
                    </div>
                  </div>
                  {" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {" "}
        <div className="row teamGridRow">
          <div className="col-md-6 col-lg-3">
            <div className="team_Item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="250">
              <div className="teamItemInner">
                <div className="team_thumbnail bg-[#4c4c4e] flex items-center justify-center">
                  <img src="/assets/images/team/Images-02.webp" alt="team" />
                  {" "}
                  <div className="tm01Social">
                    <a href="https://www.behance.net/videopicha" target="_blank">
                      {" "}
                      <i className="fab fa-behance" />
                      {" "}
                    </a>
                  </div>
                </div>
                {" "}
                <div className="team_desc">
                  <h2>Sydney Ang'ila</h2>
                  {" "}
                  <a href="#" onClick={noop}>{"Director of Film and Photography "}</a>
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-3">
            <div className="team_Item" data-aos="fade-up" data-aos-duration="1400" data-aos-delay="300">
              <div className="teamItemInner">
                <div className="team_thumbnail bg-[#4c4c4e]">
                  <img src="/assets/images/team/feysal3.jpeg" alt="team" />
                  {" "}
                  <div className="tm01Social">
                    <a href="https://www.behance.net/feysless" target="_blank">
                      {" "}
                      <i className="fab fa-behance" />
                      {" "}
                    </a>
                  </div>
                </div>
                {" "}
                <div className="team_desc">
                  <h2>Feysal Anthony</h2>
                  {" "}
                  <a href="#" onClick={noop}>{"Director Creative and Strategy "}</a>
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-duration="1600" data-aos-delay="350">
            <div className="team_Item">
              <div className="teamItemInner">
                <div className="team_thumbnail bg-[#4c4c4e]">
                  <img src="/assets/images/team/Images-01.webp" alt="team" />
                  {" "}
                  <div className="tm01Social">
                    <a href="https://www.behance.net/brayanmacharia" target="_blank">
                      {" "}
                      <i className="fab fa-behance" />
                      {" "}
                    </a>
                  </div>
                </div>
                {" "}
                <div className="team_desc">
                  <h2>Brian Macharia</h2>
                  {" "}
                  <a href="#" onClick={noop}>{"Director Art and UX "}</a>
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-3">
            <div className="team_Item" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="250">
              <div className="teamItemInner">
                <div className="team_thumbnail bg-[#4c4c4e] ">
                  <img src="/assets/images/team/Vincent.webp" alt="team" />
                  {" "}
                  <div className="tm01Social">
                    <a href="https://www.behance.net/vincentkarani1" target="_blank">
                      {" "}
                      <i className="fab fa-behance" />
                      {" "}
                    </a>
                  </div>
                </div>
                {" "}
                <div className="team_desc">
                  <h2>Vincent Karani</h2>
                  {" "}
                  <a href="#" onClick={noop}>Director of Content and Animation</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonial01Section() {
  return (
    <section className="testimonial01_section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-10 offset-lg-1">
            <div className="testimonial01Wrapper">
              <OwlCarousel className="testimonial01 owl-carousel" options={testimonialOptions}>
                <div className="testimonial_items">
                  <span className="testimonialQuoat1">
                    {" "}
                    <i className="boozy-quotes" />
                    {" "}
                  </span>
                  {" "}
                  <h2>Iz How?</h2>
                  {" "}
                  <div className="testimonialAuthor">
                    <h3>A standard morio greeting.</h3>
                  </div>
                </div>
                {" "}
                <div className="testimonial_items">
                  <span className="testimonialQuoat1">
                    {" "}
                    <i className="boozy-quotes" />
                    {" "}
                  </span>
                  {" "}
                  <h2>
                    Weh, Checki!
                    <br />
                  </h2>
                  {" "}
                  <div className="testimonialAuthor">
                    <h3>A morio making a point.</h3>
                  </div>
                </div>
                {" "}
                <div className="testimonial_items">
                  <span className="testimonialQuoat1">
                    {" "}
                    <i className="boozy-quotes" />
                    {" "}
                  </span>
                  {" "}
                  <h2>
                    Ume, Choma!
                    <br />
                  </h2>
                  {" "}
                  <div className="testimonialAuthor">
                    <h3>A morio telling you that you messed up.</h3>
                  </div>
                </div>
                {" "}
                <div className="testimonial_items">
                  <span className="testimonialQuoat1">
                    {" "}
                    <i className="boozy-quotes" />
                    {" "}
                  </span>
                  {" "}
                  <h2>
                    Noma, Sana!
                    <br />
                  </h2>
                  {" "}
                  <div className="testimonialAuthor">
                    <h3>A morio telling you something is good.</h3>
                  </div>
                </div>
                {" "}
                <div className="testimonial_items">
                  <span className="testimonialQuoat1">
                    {" "}
                    <i className="boozy-quotes" />
                    {" "}
                  </span>
                  {" "}
                  <h2>
                    Hiyo, Haiwez make!
                    <br />
                  </h2>
                  {" "}
                  <div className="testimonialAuthor">
                    <h3>A morio telling you something doesn’t work.</h3>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
