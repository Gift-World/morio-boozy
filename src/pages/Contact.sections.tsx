// Sections of the Contact page, ported 1:1 from contact.html.
import { BannerSlider } from "../components/widgets/Rotators";
import { Link } from "react-router-dom";

export function AboutBanner() {
  return (
    <section className="aboutBanner">
      <BannerSlider images={["/assets/images/projects/ab7.jpeg","/assets/images/projects/ab8.jpeg","/assets/images/projects/ab1.jpeg"]} />
      {" "}
      <div className="container relative-content">
        <div className="row">
          <div className="col-lg-12 col-xl-8 offset-xl-2">
            <div className="pageBannerContent text-center">
              <h1 className="pageTitle">Contact Us</h1>
              {" "}
              <div className="pageBannerPath">
                <Link to="/">Home</Link>
                {" "}
                <span className="brdSeparator">{"\u00a0/\u00a0"}</span>
                {" "}
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactInfoSec() {
  return (
    <section className="contactInfoSec">
      <div className="container">
        <div className="row contactInfoRow">
          <div className="col-md-4 col-sm-6">
            <div className="contactInfoItem" data-aos="fade-down" data-aos-easing="linear">
              <h4>For Inquiries</h4>
              {" "}
              <ul>
                <li>
                  <a href="tel:254718704926">+254 718 704 926</a>
                </li>
                {" "}
                <li>
                  <a href="mailto:feysal@moriostudios.africa">feysal@moriostudios.africa</a>
                </li>
                {" "}
                <li>
                  <a href="mailto:sydney@moriostudios.africa">sydney@moriostudios.africa</a>
                </li>
                {" "}
                <li>
                  <a href="mailto:brian@moriostudios.africa">brian@moriostudios.africa</a>
                </li>
                {" "}
                <li>
                  <a href="mailto:vincent@moriostudios.africa">vincent@moriostudios.africa</a>
                </li>
              </ul>
            </div>
          </div>
          {" "}
          <div className="col-md-4 col-sm-6">
            <div className="contactInfoItem" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500">
              <h4>Office Hours</h4>
              {" "}
              <ul>
                <li>Monday - Friday</li>
                {" "}
                <li>6 am to 8 pm EAT</li>
              </ul>
            </div>
          </div>
          {" "}
          <div className="col-md-4 col-sm-6">
            <div className="contactInfoItem" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="650">
              <h4>Post address</h4>
              {" "}
              <p>
                {"Morio Studios "}
                <br />
                {" 22707-00505 "}
                <br />
                Ngong Road
                <br />
                Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactGoogleMap() {
  return (
    <section className="contactGoogleMap">
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="contact-googleMap blackAndWhite" data-aos="zoom-in">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7908569907054!2d36.777850373500655!3d-1.3003299356385623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b264fa4327b%3A0x4a4fd87e6260dbe!2sAdams%20Arcade!5e0!3m2!1sen!2ske!4v1776766655424!5m2!1sen!2ske" allowFullScreen />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
