import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbHome, TbWorld, TbBriefcase, TbTimeline, TbCurrencyDollar,
  TbMail, TbX, TbMenu2, TbArrowRight, TbShieldLock,
  TbBrandGithub, TbBrandTwitter, TbBrandLinkedin,
  TbSun, TbMoon
} from "react-icons/tb";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/work", label: "Case Studies" },
  { to: "/contact", label: "Contact" },
];

const sidebarItems = [
  {
    to: "/",
    label: "Home",
    sub: "Architecture & Overview",
    icon: <TbHome size={20} />,
  },
  {
    to: "/product",
    label: "Product & Services",
    sub: "Web, Mobile, Backend & Cloud",
    icon: <TbWorld size={20} />,
  },
  {
    to: "/work",
    label: "Case Studies",
    sub: "Production applications shipped",
    icon: <TbBriefcase size={20} />,
  },
  {
    to: "/process",
    label: "Engineering Process",
    sub: "Agile sprints to live deployment",
    icon: <TbTimeline size={20} />,
  },
  {
    to: "/pricing",
    label: "Pricing Models",
    sub: "Transparent retainers & scopes",
    icon: <TbCurrencyDollar size={20} />,
  },
  {
    to: "/contact",
    label: "Contact & Inquiries",
    sub: "Start a conversation today",
    icon: <TbMail size={20} />,
  },
];

export default function Navbar({ theme = "dark", toggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Prevent body scroll when sidebar is open
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleHashLink = (to) => {
    if (to.includes("#")) {
      const id = to.split("#")[1];
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setSidebarOpen(false);
  };

  const isLinkActive = (to) => {
    if (to === "/") {
      return location.pathname === "/" && (!location.hash || location.hash === "#home");
    }
    if (to.includes("#")) {
      return location.hash === `#${to.split("#")[1]}`;
    }
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
          1. FLOATING SEXY GLASSMORPHIC HEADER
         ══════════════════════════════════════════════════ */}
      <header className="navbar-glass-container">
        <div className="navbar-glass-inner">
          {/* ── Left: Frosted Glass Logo Badge ── */}
          <Link
            to="/"
            className="navbar-glass-logo"
            onClick={() => setSidebarOpen(false)}
            aria-label="PulseDev Home"
          >
            <div className="navbar-glass-logo-glow" />
            <img
              src="/assets/logo.webp"
              alt="PulseDev"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="navbar-glass-logo-fallback" style={{ display: "none" }}>
              PD
            </div>
          </Link>

          {/* ── Center: Sexy Frosted Glass Pill Menu ── */}
          <nav className="navbar-glass-pill-nav">
            <ul className="navbar-glass-pill-list">
              {navLinks.map((l) => {
                const active = isLinkActive(l.to);
                return (
                  <li key={l.to} className="navbar-glass-pill-item">
                    <Link
                      to={l.to}
                      className={`navbar-glass-pill-link ${active ? "active" : ""}`}
                      onClick={() => handleHashLink(l.to)}
                    >
                      <span>{l.label}</span>
                      <div className={`navbar-glass-pill-dots ${active ? "active" : ""}`}>
                        <span className="navbar-dot" />
                        <span className="navbar-dot" />
                        <span className="navbar-dot" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Right: Action Buttons & Sidebar Trigger ── */}
          <div className="navbar-glass-right-cluster">
            <Link to="/booking" className="navbar-glass-cta-btn desktop-only">
              <span>Book a Call</span>
            </Link>

            <Link to="/admin/login" className="navbar-glass-signin-btn desktop-only">
              Sign in
            </Link>

            {/* Sexy Theme Mode Switcher */}
            <button
              className="navbar-glass-theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <TbMoon size={18} className="theme-toggle-icon" />
              ) : (
                <TbSun size={18} className="theme-toggle-icon" />
              )}
            </button>

            {/* Sexy Sidebar Menu Toggle */}
            <button
              className="navbar-glass-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <TbMenu2 size={20} className="menu-icon" />
              <span className="menu-text desktop-only">Menu</span>
              <span className="menu-pulse-indicator" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          2. BEAUTIFUL GLASSMORPHIC SLIDE-OUT SIDEBAR
         ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="sidebar-portal">
            {/* Backdrop Blur Overlay */}
            <motion.div
              className="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Slide-out Glass Drawer */}
            <motion.aside
              className="sidebar-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
            >
              {/* Drawer Ambient Lighting Orbs */}
              <div className="sidebar-ambient-orb-1" />
              <div className="sidebar-ambient-orb-2" />

              {/* Drawer Header */}
              <div className="sidebar-header">
                <div className="sidebar-brand">
                  <div className="sidebar-brand-badge">
                    <img src="/assets/logo.webp" alt="PulseDev" />
                  </div>
                  <div>
                    <div className="sidebar-brand-title">PulseDev</div>
                    <div className="sidebar-brand-sub">Software Engineering</div>
                  </div>
                </div>

                <button
                  className="sidebar-close-btn"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <TbX size={20} />
                </button>
              </div>

              {/* Theme Segmented Switch in Sidebar */}
              <div className="sidebar-theme-strip">
                <span className="sidebar-theme-label">Appearance</span>
                <div className="sidebar-theme-controls">
                  <button
                    type="button"
                    className={`sidebar-theme-pill ${theme === "dark" ? "active" : ""}`}
                    onClick={() => theme !== "dark" && toggleTheme && toggleTheme()}
                  >
                    <TbMoon size={15} />
                    <span>Dark</span>
                  </button>
                  <button
                    type="button"
                    className={`sidebar-theme-pill ${theme === "light" ? "active" : ""}`}
                    onClick={() => theme !== "light" && toggleTheme && toggleTheme()}
                  >
                    <TbSun size={15} />
                    <span>Light</span>
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="sidebar-content">
                {/* Navigation Items */}
                <div className="sidebar-nav-section">
                  <div className="sidebar-section-title">Navigation</div>
                  <div className="sidebar-nav-list">
                    {sidebarItems.map((item) => {
                      const active = isLinkActive(item.to);
                      return (
                        <Link
                          key={item.label}
                          to={item.to}
                          className={`sidebar-nav-card ${active ? "active" : ""}`}
                          onClick={() => handleHashLink(item.to)}
                        >
                          <div className="sidebar-nav-icon">
                            {item.icon}
                          </div>
                          <div className="sidebar-nav-info">
                            <div className="sidebar-nav-label">{item.label}</div>
                            <div className="sidebar-nav-sub">{item.sub}</div>
                          </div>
                          <TbArrowRight size={16} className="sidebar-nav-arrow" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Consultation Feature Card */}
                <div className="sidebar-consult-card">
                  <div className="sidebar-consult-glow" />
                  <div className="sidebar-consult-tag">Direct Engineering Access</div>
                  <h4 className="sidebar-consult-title">Ready to launch your vision?</h4>
                  <p className="sidebar-consult-desc">
                    Book a direct 30-min scoping call with our senior solutions architect.
                  </p>
                  <Link
                    to="/booking"
                    className="sidebar-consult-btn"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span>Schedule Free Strategy Call</span>
                    <TbArrowRight size={16} />
                  </Link>
                </div>

                {/* Admin Portal Quick Link */}
                <Link
                  to="/admin/login"
                  className="sidebar-admin-link"
                  onClick={() => setSidebarOpen(false)}
                >
                  <TbShieldLock size={18} />
                  <span>Admin & Team Portal Sign In</span>
                </Link>

                {/* System Status & Socials */}
                <div className="sidebar-footer">
                  <div className="sidebar-status-pill">
                    <span className="sidebar-status-dot" />
                    <span>All Systems Operational (99.99%)</span>
                  </div>

                  <div className="sidebar-social-links">
                    <a
                      href="https://github.com/abdullahmehmood1/PulseDev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn"
                      aria-label="GitHub"
                    >
                      <TbBrandGithub size={18} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn"
                      aria-label="Twitter"
                    >
                      <TbBrandTwitter size={18} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-social-btn"
                      aria-label="LinkedIn"
                    >
                      <TbBrandLinkedin size={18} />
                    </a>
                    <a
                      href="mailto:contact@pulsedev.io"
                      className="sidebar-social-btn"
                      aria-label="Email"
                    >
                      <TbMail size={18} />
                    </a>
                  </div>

                  <div className="sidebar-copyright">
                    © 2026 PulseDev. All rights reserved.
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
