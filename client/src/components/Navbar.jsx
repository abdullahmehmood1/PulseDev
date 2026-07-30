import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu2, TbX } from "react-icons/tb";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/#about", label: "ABOUT" },
  { to: "/#services", label: "SERVICES" },
  { to: "/#work", label: "GALLERY" },
  { to: "/#contact", label: "CONTACT" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashLink = (to) => {
    if (to.includes("#")) {
      const id = to.split("#")[1];
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setOpen(false);
  };

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar__inner">

        {/* ── Col 1: Logo (left) ── */}
        <Link to="/" className="navbar__logo" onClick={() => setOpen(false)}>
          <div className="navbar__logo-icon">
            <span className="navbar__logo-icon-letter">PD</span>
          </div>
          <div>
            <div className="navbar__logo-text">PulseDev</div>
            <div className="navbar__logo-sub">Software Engineering</div>
          </div>
        </Link>

        {/* ── Col 2: Nav links (centered) ── */}
        <nav className="navbar__nav-wrapper">
          <ul className="navbar__nav">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={() => handleHashLink(l.to)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Col 3: CALL NOW (right) + Hamburger ── */}
        <div className="navbar__right">
          <NavLink to="/booking" className="nav-call-now">
            <span>CALL NOW</span>
          </NavLink>
          <button
            className="navbar__hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <TbX size={26} /> : <TbMenu2 size={26} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="navbar__mobile-link"
                onClick={() => handleHashLink(l.to)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/booking"
              className="navbar__mobile-link navbar__mobile-callnow"
              onClick={() => setOpen(false)}
            >
              <span>CALL NOW</span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
