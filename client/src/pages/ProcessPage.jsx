import Process from "../components/Process";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";

export default function ProcessPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__eyebrow">Engineering Lifecycle</div>
          <h1 className="page-hero__title">Our Development<br />&amp; Delivery Process</h1>
          <p className="page-hero__desc">
            Learn how we plan, code, test, deploy, and maintain software with
            zero friction and complete visibility.
          </p>
        </div>
      </div>

      <Process />

      <section style={{ background: "var(--navy-deep)", padding: "60px 0" }}>
        <div className="page-content__inner" style={{ textAlign: "center" }}>
          <Link to="/#contact" className="btn-primary">
            Schedule a Process Kickoff <TbArrowRight size={14} />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
