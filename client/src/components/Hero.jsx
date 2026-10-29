import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMicrosoft, FaAmazon, FaGoogle } from "react-icons/fa";
import { TbArrowUpRight, TbLayoutGrid } from "react-icons/tb";
import Gyroscope3D from "./Gyroscope3D";

export default function Hero() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute("data-theme") || localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <TbArrowUpRight size={16} className="hero-stat-glyph-icon" />,
      value: "< 120ms",
      label: "Inference Time",
    },
    {
      prefix: "%",
      value: "99.99%",
      label: "Platform Uptime",
    },
    {
      prefix: "*",
      value: "24/7",
      label: "Autonomous Runtime",
    },
    {
      icon: <TbLayoutGrid size={16} className="hero-stat-glyph-icon" />,
      value: "2.4M",
      label: "Context Windows",
    },
  ];

  return (
    <section className="hero-3d-section" id="home">
      {/* ══ 1. ARCHITECTURAL CAD BLUEPRINT BACKGROUND ══ */}
      <div className="hero-3d-bg">
        <div className="hero-3d-grid-overlay" />
        <div className="hero-3d-radial-glow" />
      </div>

      {/* ══ 2. TWO-COLUMN SPLIT MAIN HERO CONTENT ══ */}
      <div className="hero-3d-container">
        <div className="hero-3d-split-grid">
          {/* ── LEFT COLUMN: Typography & CTAs ── */}
          <motion.div
            className="hero-3d-left-col"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Enterprise Trust Pill */}
            <motion.div
              className="hero-3d-trust-pill"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="hero-3d-trust-icons">
                <span className="hero-3d-trust-circle" title="Microsoft">
                  <FaMicrosoft size={11} />
                </span>
                <span className="hero-3d-trust-circle" title="Amazon AWS">
                  <FaAmazon size={11} />
                </span>
                <span className="hero-3d-trust-circle" title="Google Cloud">
                  <FaGoogle size={11} />
                </span>
              </div>
              <span className="hero-3d-trust-text">Trusted by 2000+ Enterprises</span>
            </motion.div>

            {/* Giant Editorial Headline: Sans + Serif Pairing */}
            <motion.h1
              className="hero-3d-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="hero-3d-headline-line1">Intelligence</span>
              <span className="hero-3d-headline-line2">Designed To Evolve</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero-3d-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              Build applications that reason, adapt and collaborate using a modular AI
              platform designed for production.
            </motion.p>

            {/* Signature Split CTA Pill */}
            <motion.div
              className="hero-3d-cta-wrap"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <a href="#contact" className="hero-3d-split-cta">
                <span className="hero-3d-split-label">Get Started</span>
                <span className="hero-3d-split-arrow">
                  <TbArrowUpRight size={18} />
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Interactive 3D Gyroscope Orb ── */}
          <motion.div
            className="hero-3d-right-col"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Gyroscope3D theme={theme} />
          </motion.div>
        </div>
      </div>

      {/* ══ 3. TECHNICAL BLUEPRINT METRICS BAR (4 Columns) ══ */}
      <div className="hero-3d-stats-wrapper">
        <div className="hero-3d-stats-container">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              className="hero-3d-stat-cell"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 + idx * 0.08 }}
            >
              <div className="hero-3d-stat-header">
                {item.icon && <span className="hero-3d-stat-icon">{item.icon}</span>}
                {item.prefix && <span className="hero-3d-stat-prefix">{item.prefix}</span>}
                <span className="hero-3d-stat-val">{item.value}</span>
              </div>
              <span className="hero-3d-stat-lbl">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
