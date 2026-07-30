import { Helmet } from "react-helmet-async";
import Work from "../components/Work";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";

export default function WorkPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>Work | PulseDev</title>
        <meta name="description" content="Explore how we help founders, startups, and enterprises design, build, and deploy software products." />
      </Helmet>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__eyebrow">Project Work</div>
          <h1 className="page-hero__title">
            Featured Projects<br />&amp; Case Studies
          </h1>
          <p className="page-hero__desc">
            Explore how we help founders, startups, and enterprises design,
            build, and deploy software products.
          </p>
        </div>
      </div>

      {/* Work grid — all projects */}
      <Work />

      {/* CTA panel */}
      <section style={{ background: "var(--navy-mid)", padding: "80px 0" }}>
        <div className="page-content__inner" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Start a Project</div>
          <h2 style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--white)",
            marginBottom: 16,
          }}>
            Have a New Project in Mind?
          </h2>
          <p style={{ color: "var(--text-body)", fontSize: 15, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            We build custom software tailored to your specs with a 100% guarantee
            on code quality and delivery timelines.
          </p>
          <Link to="/#contact" className="btn-primary">
            Start Your Project Consultation <TbArrowRight size={14} />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
