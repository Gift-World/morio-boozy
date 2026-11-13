import { Link } from "react-router-dom";
import { noop } from "../../lib/device";

/**
 * Copyright bar. The home page's markup had a leading space inside the link
 * (" Morio Studios"); `leadingSpace` keeps that exact text.
 */
export function SiteInfo({ leadingSpace = false }: { leadingSpace?: boolean }) {
  return (
    <section className="siteInfoSection">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-lg-6">
            <p className="siteInfo">
              {"© Copyrights 2026 "}
              <Link to="/">{leadingSpace ? " Morio Studios" : "Morio Studios"}</Link>
              {" All rights reserved."}
            </p>
          </div>{" "}
          <div className="col-md-7 col-lg-6">
            <div className="footerInfoNav">
              <ul>
                <li>
                  <a href="https://www.instagram.com/moriostudios/">Instagram</a>
                </li>{" "}
                <li>
                  <a href="#" onClick={noop}>
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
