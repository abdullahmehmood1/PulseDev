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
    <section id="about" className="about-section">
      <div className="about__grid page-content__inner">

        {/* ══ LEFT COLUMN: Image card + Dark SINCE 2020 badge + 3 Stat cards ══ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Top image card container */}
          <div className="about__image-container">
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

            {/* Overlaid Badge at bottom */}
            <div className="about__image-badge">
              <div className="about__image-badge-year">
                SINCE 2020
              </div>

              <div className="about__image-badge-content">
                <div className="about__image-badge-sub">
                  BUILT ON EXPERIENCE
                </div>
                <div className="about__image-badge-desc">
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
                className="about__stat-card"
              >
                <div className="about__stat-val">
                  {s.val}
                </div>
                <div className="about__stat-title">
                  {s.title}
                </div>
                <div className="about__stat-desc">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>


        {/* ══ RIGHT COLUMN: Glassmorphism Card Container ══ */}
        <motion.div
          className="about__right-card"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Eyebrow / Kicker */}
          <div className="about__eyebrow">
            <span className="about__eyebrow-line" />
            ABOUT PULSEDEV ENGINEERING
          </div>

          {/* Big Headline */}
          <h2 className="about__headline">
            BUILT ON<br />EXPERIENCE. LED BY<br />EXCELLENCE.
          </h2>

          {/* Lead paragraph */}
          <p className="about__lead">
            PulseDev is a full-service software engineering company led by senior architects
            and backed by 5+ years of hands-on production experience.
          </p>

          {/* Body paragraph */}
          <p className="about__body">
            From web applications and mobile apps to backend architecture, DevOps, and cloud security,
            PulseDev brings a practical, code-ready approach to every project. Our engineers understand
            performance, scale demands, and the importance of building solutions that hold up season after season.
          </p>

          {/* Dual CTAs at bottom */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/#contact" className="btn-primary">
              GET IN TOUCH <TbArrowRight size={14} />
            </Link>

            <Link to="/#services" className="btn-secondary-glass">
              VIEW SERVICES <TbArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
