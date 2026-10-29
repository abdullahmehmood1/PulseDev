import { Link } from "react-router-dom";
import {
  TbBrandGithub, TbBrandTwitter, TbBrandLinkedin,
  TbMapPin, TbMail, TbPhone
} from "react-icons/tb";
import { CONTACT } from "../config/contactInfo";

const SOCIALS_ENABLED = { github: false, twitter: false, linkedin: false };

const navCols = [
  {
    title: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "Product", to: "/product" },
      { label: "Case Studies", to: "/work" },
      { label: "Process", to: "/process" },
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", to: "/product?tab=web#services" },
      { label: "Mobile Apps", to: "/product?tab=mobile#services" },
      { label: "Backend & APIs", to: "/product?tab=backend#services" },
      { label: "Cloud & DevOps", to: "/product?tab=cloud#services" },
      { label: "Security Audits", to: "/product?tab=security#services" },
      { label: "Retainers", to: "/product?tab=retainer#services" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__brand-logo">
            <div className="footer__brand-icon">PD</div>
            <div>
              <div className="footer__brand-name">PulseDev</div>
            </div>
          </Link>
          <p className="footer__brand-desc">
            Full-service software engineering company delivering web apps, mobile
            platforms, cloud infrastructure, and ongoing engineering support.
          </p>
          <div className="footer__socials">
            {SOCIALS_ENABLED.github && (
              <a href="REPLACE_WITH_REAL_GITHUB_URL" target="_blank" rel="noreferrer" className="footer__social">
                <TbBrandGithub size={16} />
              </a>
            )}
            {SOCIALS_ENABLED.twitter && (
              <a href="REPLACE_WITH_REAL_TWITTER_URL" target="_blank" rel="noreferrer" className="footer__social">
                <TbBrandTwitter size={16} />
              </a>
            )}
            {SOCIALS_ENABLED.linkedin && (
              <a href="REPLACE_WITH_REAL_LINKEDIN_URL" target="_blank" rel="noreferrer" className="footer__social">
                <TbBrandLinkedin size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Nav cols */}
        {navCols.map((col) => (
          <div key={col.title}>
            <div className="footer__col-title">{col.title}</div>
            <ul className="footer__col-links">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact col */}
        <div>
          <div className="footer__col-title">Contact</div>
          <div className="footer__contact-item">
            <TbMail size={14} className="footer__contact-icon" />
            <span>{CONTACT.email}</span>
          </div>
          <div className="footer__contact-item">
            <TbPhone size={14} className="footer__contact-icon" />
            {CONTACT.phone ? (
              <a href={`tel:${CONTACT.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                <span>{CONTACT.phone}</span>
              </a>
            ) : (
              <span>{CONTACT.phoneDisplay}</span>
            )}
          </div>
          <div className="footer__contact-item">
            <TbMapPin size={14} className="footer__contact-icon" />
            <span>{CONTACT.location}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bar">
        <span className="footer__bar-copy">
          &copy; {new Date().getFullYear()} PulseDev. All rights reserved.
        </span>
        <div className="footer__bar-links">
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/work">Case Studies</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
