import { Helmet } from "react-helmet-async";
import Pricing from "../components/Pricing";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";

export default function PricingPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>Pricing | PulseDev</title>
        <meta name="description" content="Transparent pricing tailored for startups and scale-ups. No hidden fees or lock-in contracts." />
      </Helmet>
      <div className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__eyebrow">Flexible Investment</div>
          <h1 className="page-hero__title">Pricing &amp;<br />Engagement Models</h1>
          <p className="page-hero__desc">
            Transparent pricing tailored for startups and scale-ups.
            No hidden fees or lock-in contracts.
          </p>
        </div>
      </div>

      <Pricing />

      <section style={{ background: "var(--navy-mid)", padding: "60px 0" }}>
        <div className="page-content__inner" style={{ textAlign: "center" }}>
          <Link to="/#contact" className="btn-primary">
            Request Custom Scope Estimate <TbArrowRight size={14} />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
