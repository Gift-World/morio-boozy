// Sections of the NotFound page, ported 1:1 from 404.html.
import { Link } from "react-router-dom";

export function FoferrorSec() {
  return (
    <section className="foferrorSec">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="foferrorContent text-center">
              <h2 data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="400">404</h2>
              {" "}
              <p data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="450">
                {"The page you are looking for doesn't exist. It may "}
                <br />
                have been moved or removed altogether
              </p>
              {" "}
              <Link className="solidBTn magic-hover" data-radius="0" data-border-color="#518249" data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500" to="/">
                <span>Back to home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
