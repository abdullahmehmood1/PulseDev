import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";

const badges = [
  "Established 2020",
  "Full-Stack Engineering",
  "Product & Design",
  "Cloud & DevOps",
];

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* ══ VIDEO BACKGROUND ══ */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}>
        {/* Dark gradient overlay ON TOP of video */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(120deg, rgba(8,13,28,0.88) 0%, rgba(10,15,30,0.72) 50%, rgba(8,13,28,0.60) 100%)",
          zIndex: 1,
        }} />

        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="hero__inner" style={{ position: "relative", zIndex: 2 }}>

        {/* Eyebrow */}
        <motion.div
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          End-to-End Software Engineering
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Full-Service<br />
          <span>Software</span><br />
          Development
        </motion.h1>

        {/* Description */}
        <motion.p
          className="hero__desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          PulseDev builds high-performance web applications, mobile apps, and cloud
          infrastructure for startups and enterprises — from architecture to production.
        </motion.p>

        {/* Dual Buttons: One Steel Navy Gradient + One Pure White */}
        <motion.div
          className="hero__btns"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}
        >
          {/* Button 1: Primary Steel Navy Gradient */}
          <Link to="/#contact" className="btn-primary">
            GET IN TOUCH <TbArrowRight size={15} />
          </Link>

          {/* Button 2: Pure White Button */}
          <Link to="/booking" className="btn-white">
            BOOK A CALL <TbArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Badge strip */}
        <motion.div
          className="hero__badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {badges.map((b) => (
            <div key={b} className="hero__badge">
              <div className="hero__badge-dot" />
              {b}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 4,
        background: "linear-gradient(90deg, #1f5882, #3b9ee8, transparent)",
        zIndex: 2,
      }} />
    </section>
  );
}
