import { Link } from "react-router-dom";
import {
  TbBrandGithub, TbBrandTwitter, TbBrandLinkedin,
  TbMapPin, TbMail, TbPhone
} from "react-icons/tb";
import { CONTACT } from "../config/contactInfo";

const navCols = [
  {
    title: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/#about" },
      { label: "Services", to: "/#services" },
      { label: "Work", to: "/#work" },
      { label: "Process", to: "/#process" },
      { label: "Contact", to: "/#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", to: "/services" },
      { label: "Mobile Apps", to: "/services" },
      { label: "Backend & APIs", to: "/services" },
      { label: "Cloud & DevOps", to: "/services" },
      { label: "Security Audits", to: "/services" },
      { label: "Retainers", to: "/pricing" },
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
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__social">
              <TbBrandGithub size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer__social">
              <TbBrandTwitter size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__social">
              <TbBrandLinkedin size={16} />
            </a>
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

      {/* Bottom bar — BP Marine exact */}
      <div className="footer__bar">
        <span className="footer__bar-copy">
          © {new Date().getFullYear()} PulseDev. All rights reserved.
        </span>
        <div className="footer__bar-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/#about">About</Link>
          <Link to="/work">Work</Link>
          <Link to="/#contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
