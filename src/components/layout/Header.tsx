import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { noop } from "../../lib/device";
import { slideToggle } from "../../lib/motion";

export interface NavItem {
  title: string;
  to: string;
  label: string;
}

export interface HeaderConfig {
  logo: { src: string; className: string };
  nav: NavItem[];
  social: { href?: string; icon: string };
  /** The about page still carries the template's hidden cart widget. */
  cartWidget?: boolean;
}

const NAV_HOME: NavItem = { title: "Home", to: "/", label: "Home" };

/** Header used on home, services and about. */
export const brandHeader: HeaderConfig = {
  logo: { src: "/assets/images/mr-logo2.png", className: "rounded-full size-12 md:size-20" },
  nav: [
    NAV_HOME,
    { title: "Service", to: "/service", label: "Our Craft" },
    { title: "About Us", to: "/about", label: "The Morios" },
    { title: "Contact", to: "/contact", label: "Hola" },
  ],
  social: { href: "https://www.instagram.com/moriostudios/", icon: "fab fa-instagram" },
};

const legacyLogo = { src: "/assets/images/moriologo.jpeg", className: "rounded-full size-12 md:size-16" };

/** Older header variants still used by contact, team and 404. */
export const contactHeader: HeaderConfig = {
  logo: legacyLogo,
  nav: [
    NAV_HOME,
    { title: "Service", to: "/service", label: "Service" },
    { title: "About Us", to: "/about", label: "About Us" },
    { title: "Contact", to: "/contact", label: "Contact" },
  ],
  social: { href: "https://www.instagram.com/moriostudios/", icon: "fab fa-instagram" },
};

export const teamHeader: HeaderConfig = {
  logo: legacyLogo,
  nav: [
    NAV_HOME,
    { title: "Service", to: "/service", label: "Services" },
    { title: "About Us", to: "/about", label: "About Us" },
    { title: "Contact", to: "/contact", label: "Contact" },
    { title: "Team", to: "/team", label: "Team" },
  ],
  social: { icon: "fab fa-twitter" },
};

export const notFoundHeader: HeaderConfig = {
  ...teamHeader,
  nav: teamHeader.nav.map((n) => (n.to === "/service" ? { ...n, label: "Service" } : n)),
};

export function Header({ config }: { config: HeaderConfig }) {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Sticky header: once scrolled past one viewport height.
  useEffect(() => {
    const header = headerRef.current!;
    const onScroll = () => {
      const fixed = window.scrollY > document.documentElement.clientHeight;
      header.classList.toggle("fixedHeader", fixed);
      header.classList.toggle("animated", fixed);
      header.classList.toggle("slideInDown", fixed);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    slideToggle(menuRef.current!);
    btnRef.current!.classList.toggle("active");
  };

  const { logo, nav, social } = config;
  return (
    <header className="header01 isSticky" ref={headerRef}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="headerInner01">
              <div className="logo">
                <Link className="dfCursor" to="/">
                  {" "}
                  <img src={logo.src} className={logo.className} alt="Morio" />{" "}
                </Link>
              </div>{" "}
              <nav className="mainMenu" ref={menuRef}>
                <ul>
                  {nav.map((item, i) => (
                    <NavLi key={item.to} item={item} first={i === 0} />
                  ))}
                </ul>
              </nav>{" "}
              <div className="headerOniAccess">
                <a href="#" onClick={toggleMenu} className="menu_btn" ref={btnRef}>
                  <i className="fa-solid fa-bars" />
                </a>{" "}
                <div className="hdOniSocial">
                  <ul>
                    <li>
                      {social.href ? (
                        <a href={social.href} target="_blank">
                          <i className={social.icon} />
                        </a>
                      ) : (
                        <a href="#" onClick={noop}>
                          <i className={social.icon} />
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
                {config.cartWidget && (
                  <>
                    {" "}
                    <div className="oniCart">
                      <div className="cartWidgetArea">
                        <div className="cartWidgetProduct">
                          <a href="#" onClick={noop}>
                            Boozy Cancer for hardware
                          </a>
                        </div>{" "}
                        <div className="cartWidgetProduct">
                          <a href="#" onClick={noop}>
                            Pentax Jupiter Binoculars
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLi({ item, first }: { item: NavItem; first: boolean }) {
  return (
    <>
      {!first && " "}
      <li>
        <Link data-title={item.title} to={item.to}>
          <span>{item.label}</span>
        </Link>
      </li>
    </>
  );
}
