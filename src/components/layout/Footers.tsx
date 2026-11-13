import { Link } from "react-router-dom";

/** Footer used on home, services and about. */
export function SiteFooter() {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <aside className="widget aboutBoozy">
              <div className="footer_logo">
                <Link className="dfCursor" to="/">
                  {" "}
                  <img src="/assets/images/moriologo.jpeg" className="rounded-full" alt="Morio Studios Logo" />
                  {" "}
                </Link>
              </div>
              {" "}
              <div className="mantra_text">{"\"small agency, big ideas\""}</div>
            </aside>
          </div>
          {" "}
          <div className="col-sm-6 col-md-6 col-lg-2 offset-lg-1">
            <aside className="widget aboutFooterNav">
              <h3 className="widgetTitle">The Morios</h3>
              {" "}
              <ul>
                <li>
                  <Link to="/service">Our Craft</Link>
                </li>
                {" "}
                <li>
                  <Link to="/about">About us</Link>
                </li>
                {" "}
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </aside>
          </div>
          {" "}
          <div className="col-sm-6 col-md-6 col-lg-2">
            <aside className="widget">
              <h3 className="widgetTitle">Talk to a Morio</h3>
              {" "}
              <div className="talkToMorio">
                <a className="dfCursor" href="mailto:feysal@moriostudios.africa">feysal@moriostudios.africa</a>
                {" "}
                <a className="dfCursor" href="mailto:sydney@moriostudios.africa">sydney@moriostudios.africa</a>
                {" "}
                <a className="dfCursor" href="mailto:brian@moriostudios.africa">brian@moriostudios.africa</a>
                {" "}
                <a className="dfCursor" href="mailto:vincent@moriostudios.africa">vincent@moriostudios.africa</a>
              </div>
            </aside>
          </div>
          {" "}
          <div className="col-sm-6 col-md-6 col-lg-2">
            <aside className="widget getInTouch">
              <h3 className="widgetTitle">Contact us</h3>
              {" "}
              <div className="fContact_info">
                <p>
                  Kenyatta Avenue
                  <br />
                  Nairobi, Kenya
                </p>
                {" "}
                <a href="mailto:moriostudios@gmail.com">moriostudios@gmail.com</a>
                {" "}
                <a href="tel:254718704926">+254 718 704 926</a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Older template footer still used on the team page. */
export function TeamFooter() {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <aside className="widget aboutBoozy">
              <div className="footer_logo">
                <Link className="dfCursor" to="/">
                  <img src="/assets/images/moriologo.jpeg" className="rounded-full" alt="Morio" />
                </Link>
              </div>
              {" "}
              <div className="about_widgetContent">
                <h4>Let's Talk with Us</h4>
                {" "}
                <a className="dfCursor" href="mailto:moriostudios@gmail.com">moriostudios@gmail.com</a>
              </div>
            </aside>
          </div>
          {" "}
          <div className="col-sm-6 col-md-6 col-lg-2 offset-lg-1">
            <aside className="widget aboutFooterNav">
              <h3 className="widgetTitle">About us</h3>
              {" "}
              <ul>
                <li>
                  <Link to="/about">Who we are</Link>
                </li>
                {" "}
                <li>
                  <Link to="/case-studies">Our History</Link>
                </li>
                {" "}
                <li>
                  <Link to="/team">Our Team</Link>
                </li>
              </ul>
            </aside>
          </div>
          {" "}
          <div className="col-sm-6 col-md-6 col-lg-2">
            <aside className="widget getInTouch">
              <h3 className="widgetTitle">Contact us</h3>
              {" "}
              <div className="fContact_info">
                <p>
                  Kenyatta Avenue
                  <br />
                  Nairobi, Kenya
                </p>
                {" "}
                <a href="mailto:moriostudios@gmail.com">moriostudios@gmail.com</a>
                {" "}
                <a href="tel:254718704926">+254 718 704 926</a>
              </div>
            </aside>
          </div>
          {" "}
          <div className="col-sm-6 col-md-6 col-lg-3 offset-lg-1">
            <aside className="widget newslatter">
              <h3 className="widgetTitle">NewsLetter</h3>
              {" "}
              <p>
                {"Subscribe for our upcoming latest articles "}
                <br />
                {" and resources"}
              </p>
              {" "}
              <form action="#" method="post" className="footer_newslatter">
                <i className="boozy-envelope" />
                {" "}
                <input type="email" name="y_email" id="y_email" placeholder="Your Email" />
                {" "}
                <button type="submit" className="magic-hover" data-radius="0" data-border-color="#ff5100">
                  <i className="boozy-paper-plane" />
                </button>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </footer>
  );
}
