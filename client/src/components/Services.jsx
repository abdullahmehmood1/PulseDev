import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbWorld, TbDeviceMobile, TbServer2, TbShieldLock,
  TbCloud, TbRefresh, TbArrowRight, TbCheck
} from "react-icons/tb";

const services = [
  {
    id: "web",
    slug: "web",
    num: "SERVICE 01",
    icon: <TbWorld size={18} />,
    name: "Web Development",
    sub: "Full-stack web apps",
    caption: "React · Next.js · Node.js",
    desc: "We design and build high-performance web applications using modern frameworks like React, Next.js, and Node.js — optimised for speed, scale, and SEO.",
    checks: [
      "React / Next.js frontend architecture",
      "Node.js & Python backend APIs",
      "PostgreSQL, MongoDB, and Redis",
    ],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
  },
  {
    id: "mobile",
    slug: "mobile",
    num: "SERVICE 02",
    icon: <TbDeviceMobile size={18} />,
    name: "Mobile Apps",
    sub: "iOS & Android",
    caption: "React Native · Flutter",
    desc: "Native and cross-platform mobile applications built with React Native and Flutter, delivering seamless user experiences across all devices.",
    checks: [
      "React Native & Flutter development",
      "App Store & Google Play deployment",
      "Offline-first & push notifications",
    ],
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
  },
  {
    id: "backend",
    slug: "backend",
    num: "SERVICE 03",
    icon: <TbServer2 size={18} />,
    name: "Backend & APIs",
    sub: "Scalable infrastructure",
    caption: "REST · GraphQL · Microservices",
    desc: "Robust, scalable backend systems and RESTful or GraphQL APIs that power your product — built for reliability and performance at any scale.",
    checks: [
      "RESTful & GraphQL API design",
      "Microservices architecture",
      "Database optimisation & migrations",
    ],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  },
  {
    id: "security",
    slug: "security",
    num: "SERVICE 04",
    icon: <TbShieldLock size={18} />,
    name: "Security",
    sub: "Secure by design",
    caption: "OWASP · Penetration Testing",
    desc: "End-to-end security reviews, penetration testing, and implementation of enterprise-grade security measures to protect your users and data.",
    checks: [
      "Security audit & vulnerability assessment",
      "OWASP Top 10 remediation",
      "Compliance: GDPR, SOC 2, ISO 27001",
    ],
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80",
  },
  {
    id: "cloud",
    slug: "cloud",
    num: "SERVICE 05",
    icon: <TbCloud size={18} />,
    name: "Cloud & DevOps",
    sub: "AWS, GCP, Azure",
    caption: "Kubernetes · Docker · Terraform",
    desc: "Infrastructure as code, containerisation, and automated CI/CD pipelines — so your team ships faster and your systems stay reliable.",
    checks: [
      "AWS / GCP / Azure architecture",
      "Kubernetes & Docker orchestration",
      "Monitoring, alerting & SRE practices",
    ],
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80",
  },
  {
    id: "retainer",
    slug: "retainer",
    num: "SERVICE 06",
    icon: <TbRefresh size={18} />,
    name: "Retainer Support",
    sub: "Ongoing maintenance",
    caption: "Monthly Sprints · 24/7 Monitoring",
    desc: "Continuous improvement, bug fixing, monitoring, and feature development through flexible monthly retainers tailored to your team's velocity.",
    checks: [
      "Monthly feature development sprints",
      "Priority incident response",
      "Dedicated Slack channel support",
    ],
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      const idx = services.findIndex(s => s.slug === tabParam);
      if (idx !== -1) setActive(idx);
    }
  }, [location.search]);

  const svc = services[active];

  return (
    <section id="services" className="services-section">
      {/* ── Section Header ── */}
      <div className="services__header-grid page-content__inner">
        <div>
          <div className="services__header-eyebrow">
            <span className="services__eyebrow-line" />
            WHAT WE DO
          </div>

          <h2 className="services__header-title">
            COMPLETE SOFTWARE<br />SOLUTIONS
          </h2>
        </div>

        <p className="services__header-desc">
          From web applications to cloud infrastructure and ongoing support, PulseDev brings
          the equipment, experience, and crew to get it done right.
        </p>
      </div>

      {/* ── Outer Frame ── */}
      <div className="page-content__inner">
        <div className="services__frame">

          {/* ── COLUMN 1: Tabs ── */}
          <div className="services__tabs">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <div
                  key={s.name}
                  onClick={() => setActive(i)}
                  className={`services__tab ${isActive ? "active" : ""}`}
                >
                  <div className="services__tab-icon">
                    {s.icon}
                  </div>

                  <div className="services__tab-info">
                    <div className="services__tab-num">
                      {s.num}
                    </div>
                    <div className="services__tab-name">
                      {s.name}
                    </div>
                    <div className="services__tab-sub">
                      {s.sub}
                    </div>
                  </div>

                  <TbArrowRight
                    size={16}
                    className="services__tab-arrow"
                  />
                </div>
              );
            })}
          </div>

          {/* ── COLUMN 2: Image ── */}
          <div className="services__image-container">
            <AnimatePresence>
              <motion.img
                key={svc.img}
                src={svc.img}
                alt={svc.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </AnimatePresence>

            <div className="services__image-badge">
              <span className="services__badge-dot" />
              {svc.caption}
            </div>
          </div>

          {/* ── COLUMN 3: Right Detail Pane ── */}
          <div style={{ position: "relative" }}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={svc.name}
                className="services__detail-card"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
              >
              <div>
                <h3 className="services__detail-title">
                  {svc.name}
                </h3>

                <p className="services__detail-desc">
                  {svc.desc}
                </p>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                  {svc.checks.map((c) => (
                    <li
                      key={c}
                      className="services__check-item"
                    >
                      <TbCheck
                        size={18}
                        className="services__check-icon"
                      />
                      <span className="services__check-text">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Luminous Gradient Button */}
              <Link
                to={`/contact?service=${svc.id}`}
                className="btn-primary"
              >
                GET IN TOUCH <TbArrowRight size={14} />
              </Link>
            </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
