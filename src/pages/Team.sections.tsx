// Sections of the Team page, ported 1:1 from team.html.
import { BannerSlider } from "../components/widgets/Rotators";
import { OwlCarousel } from "../components/widgets/OwlCarousel";
import { clientLogoOptions } from "../components/widgets/carouselOptions";
import { Link } from "react-router-dom";
import { noop } from "../lib/device";

export function AboutBanner() {
  return (
    <section className="aboutBanner">
      <BannerSlider images={["/assets/images/projects/morio4.jpg","/assets/images/projects/morio2.jpg","/assets/images/projects/morio3.jpg"]} />
      {" "}
      <div className="container relative-content">
        <div className="row">
          <div className="col-lg-12 col-xl-8 offset-xl-2">
            <div className="pageBannerContent text-center">
              <h2>Team</h2>
              {" "}
              <div className="pageBannerPath">
                <Link to="/">Home</Link>
                {" "}
                <span className="brdSeparator">{"\u00a0/\u00a0"}</span>
                {" "}
                <span>Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TeamSection02() {
  return (
    <section className="teamSection02">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="team_Item" data-aos="fade-up" data-aos-duration="1000" data-aos-dela="200">
              <div className="teamItemInner">
                <div className="team_thumbnail">
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
                  <a href="#" onClick={noop}>Product manager</a>
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4">
            <div className="team_Item" data-aos="fade-up" data-aos-duration="1300" data-aos-dela="250">
              <div className="teamItemInner">
                <div className="team_thumbnail">
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
                  <h2>Feysal Nair</h2>
                  {" "}
                  <a href="#" onClick={noop}>Sr. Developer</a>
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-duration="1600" data-aos-dela="300">
            <div className="team_Item">
              <div className="teamItemInner">
                <div className="team_thumbnail">
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
                  <a href="#" onClick={noop}>Founder & CEO</a>
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4">
            <div className="team_Item" data-aos="fade-up" data-aos-duration="1000" data-aos-dela="200">
              <div className="teamItemInner">
                <div className="team_thumbnail">
                  <img src="/assets/images/team/Vincent.webp" alt="team" />
                  {" "}
                  <div className="tm01Social">
                    <a href="#" onClick={noop}>
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
                  <a href="#" onClick={noop}>Graphic Designer</a>
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col-md-6 col-lg-4" />
        </div>
      </div>
    </section>
  );
}

export function ClientTestimonilaSec02() {
  return (
    <section className="clientTestimonila_sec02">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="client_content">
              <h3>We worked with global largest brands</h3>
              {" "}
              <OwlCarousel className="clientTestimonial02 owl-carousel" options={clientLogoOptions}>
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/7.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/1.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/2.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/3.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/4.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/5.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/6.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/8.png" alt="clogo" />
                  {" "}
                </a>
                {" "}
                <a className="cleintLogo">
                  {" "}
                  <img src="/assets/images/clientLogo/5.png" alt="clogo" />
                  {" "}
                </a>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
