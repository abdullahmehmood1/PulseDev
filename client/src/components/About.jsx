import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";

const statCards = [
  {
    val: "5+",
    title: "EXPERIENCE",
    desc: "Years of full-stack engineering experience",
  },
  {
    val: "50+",
    title: "SHIPPED",
    desc: "Products and cloud platforms delivered to production",
  },
  {
    val: "100%",
    title: "QUALITY",
    desc: "Client satisfaction across all software engagements",
  },
];

export default function About() {
  return (
    <section id="about" style={{
      background: "#eaf0f7",          /* Light ice background like BP Marine */
      padding: "90px 0",
    }}>
      <div className="about__grid page-content__inner">

        {/* ══ LEFT COLUMN: Image card + Dark SINCE 2020 badge + 3 Stat cards ══ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Top image card container */}
          <div style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
            marginBottom: 20,
            aspectRatio: "4/3",
            background: "#0c1728",
          }}>
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80"
              alt="PulseDev Engineering Team"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Overlaid Dark Navy Box at bottom */}
            <div style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              background: "rgba(10, 19, 34, 0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <div style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(26px, 2.5vw, 34px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}>
                SINCE 2020
              </div>

              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 16 }}>
                <div style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#3b9ee8",
                  marginBottom: 3,
                }}>
                  BUILT ON EXPERIENCE
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11.5,
                  color: "#94a3b8",
                  lineHeight: 1.4,
                }}>
                  Serving startups, scale-ups, and enterprises across global tech markets.
                </div>
              </div>
            </div>
          </div>

          {/* 3 Stat Cards Row below image */}
          <div className="about__stat-grid">
            {statCards.map((s) => (
              <div
                key={s.title}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "20px 16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#0c1728",
                  lineHeight: 1.0,
                  marginBottom: 4,
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#1e3a5f",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}>
                  {s.title}
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: "#64748b",
                  lineHeight: 1.35,
                }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>


        {/* ══ RIGHT COLUMN: White Card Container ══ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: "52px 48px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Eyebrow / Kicker */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "Oswald, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1d4ed8",
            marginBottom: 20,
          }}>
            <span style={{ display: "block", width: 32, height: 2, background: "#1d4ed8" }} />
            ABOUT PULSEDEV ENGINEERING
          </div>

          {/* Big Headline */}
          <h2 style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(34px, 4vw, 54px)",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#0c1728",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            marginBottom: 28,
          }}>
            BUILT ON<br />EXPERIENCE. LED BY<br />EXCELLENCE.
          </h2>

          {/* Lead paragraph */}
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#1e293b",
            lineHeight: 1.6,
            marginBottom: 20,
          }}>
            PulseDev is a full-service software engineering company led by senior architects
            and backed by 5+ years of hands-on production experience.
          </p>

          {/* Body paragraph */}
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14.5,
            color: "#475569",
            lineHeight: 1.75,
            marginBottom: 40,
          }}>
            From web applications and mobile apps to backend architecture, DevOps, and cloud security,
            PulseDev brings a practical, code-ready approach to every project. Our engineers understand
            performance, scale demands, and the importance of building solutions that hold up season after season.
          </p>

          {/* Dual CTAs at bottom: One Steel Navy Gradient + One Pure White */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {/* Primary Filled Steel Navy Button */}
            <Link to="/#contact" className="btn-primary">
              GET IN TOUCH <TbArrowRight size={14} />
            </Link>

            {/* Secondary Pure White Button */}
            <Link to="/#services" className="btn-white">
              VIEW SERVICES <TbArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
