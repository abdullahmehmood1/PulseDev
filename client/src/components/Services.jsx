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
    <section id="services" style={{
      background: "linear-gradient(180deg, #0b1526 0%, #0b1526 65%, #e9eff6 65%, #e9eff6 100%)",
      padding: "90px 0 60px",
    }}>
      {/* ── Section Header ── */}
      <div className="services__header-grid page-content__inner">
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6b829e",
            marginBottom: 14,
          }}>
            <span style={{ display: "block", width: 36, height: 2, background: "#3b82f6", flexShrink: 0 }} />
            WHAT WE DO
          </div>

          <h2 style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(34px, 4.8vw, 62px)",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#ffffff",
            lineHeight: 0.98,
            letterSpacing: "0.01em",
          }}>
            COMPLETE SOFTWARE<br />SOLUTIONS
          </h2>
        </div>

        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          color: "#94a3b8",
          lineHeight: 1.7,
          maxWidth: 500,
        }}>
          From web applications to cloud infrastructure and ongoing support, PulseDev brings
          the equipment, experience, and crew to get it done right.
        </p>
      </div>

      {/* ── Outer Silver Frame ── */}
      <div className="page-content__inner">
        <div className="services__frame">

          {/* ── COLUMN 1: Tabs ── */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <div
                  key={s.name}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 18px",
                    borderRadius: 14,
                    cursor: "pointer",
                    background: isActive
                      ? "linear-gradient(180deg, #154169 0%, #0e3050 100%)"
                      : "#0d1827",
                    border: isActive
                      ? "2px solid #2d82c4"
                      : "1px solid #1a2a3f",
                    boxShadow: isActive
                      ? "0 4px 18px rgba(45, 130, 196, 0.35)"
                      : "none",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                >
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: isActive ? "1px solid rgba(255,255,255,0.4)" : "1px solid #20334d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isActive ? "#ffffff" : "#64748b",
                    background: isActive ? "rgba(255,255,255,0.12)" : "#132338",
                    flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: isActive ? "#90c3eb" : "#64748b",
                      marginBottom: 2,
                    }}>
                      {s.num}
                    </div>
                    <div style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#ffffff",
                      letterSpacing: "0.03em",
                      lineHeight: 1.1,
                      marginBottom: 3,
                    }}>
                      {s.name}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: isActive ? "#cbd5e1" : "#475569",
                      fontWeight: 500,
                    }}>
                      {s.sub}
                    </div>
                  </div>

                  <TbArrowRight
                    size={16}
                    style={{
                      color: isActive ? "#3b9ee8" : "#334155",
                      flexShrink: 0,
                      transform: isActive ? "translateX(3px)" : "none",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* ── COLUMN 2: Image ── */}
          <div style={{
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            minHeight: 460,
            background: "#0d1827",
          }}>
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

            <div style={{
              position: "absolute",
              bottom: 18,
              left: 18,
              background: "#0a1320",
              borderRadius: 999,
              padding: "8px 18px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ffffff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
              border: "1px solid #1a2a3f",
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#2563eb",
                boxShadow: "0 0 8px #2563eb",
                flexShrink: 0,
              }} />
              {svc.caption}
            </div>
          </div>

          {/* ── COLUMN 3: Right Detail Pane ── */}
          <div style={{ position: "relative" }}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "44px 38px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  height: "100%",
                }}
              >
              <div>
                <h3 style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#0b1728",
                  lineHeight: 1.0,
                  marginBottom: 20,
                  letterSpacing: "-0.01em",
                }}>
                  {svc.name}
                </h3>

                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14.5,
                  color: "#475569",
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}>
                  {svc.desc}
                </p>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                  {svc.checks.map((c) => (
                    <li
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: "#0f233a",
                        lineHeight: 1.4,
                      }}
                    >
                      <TbCheck
                        size={17}
                        style={{
                          color: "#1d4ed8",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steel Navy Gradient Button with hover animation */}
              <Link to={`/?service=${svc.id}#contact`} className="btn-primary" style={{ alignSelf: "flex-start" }}>
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
