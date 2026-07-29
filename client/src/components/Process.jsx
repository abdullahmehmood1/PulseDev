import { motion } from "framer-motion";
import { TbSearch, TbStack2, TbCode, TbShieldCheck, TbRocket } from "react-icons/tb";

const steps = [
  {
    num: "01",
    icon: <TbSearch size={22} />,
    title: "Discovery",
    desc: "We audit your specs, model system requirements, and define architecture blueprints.",
  },
  {
    num: "02",
    icon: <TbStack2 size={22} />,
    title: "Architecture",
    desc: "Tech stack selection, database schema design, and API contract definition.",
  },
  {
    num: "03",
    icon: <TbCode size={22} />,
    title: "Development",
    desc: "Iterative sprints with daily standups, PR reviews, and continuous integration.",
  },
  {
    num: "04",
    icon: <TbShieldCheck size={22} />,
    title: "QA & Security",
    desc: "Automated test suites, security audits, load testing, and performance tuning.",
  },
  {
    num: "05",
    icon: <TbRocket size={22} />,
    title: "Launch & Support",
    desc: "Zero-downtime deployments, monitoring setup, and ongoing retainer support.",
  },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process__inner">
        <div className="process__header">
          <div className="eyebrow" style={{ justifyContent: "center" }}>How We Work</div>
          <h2 className="process__title">
            Our Proven<br />Engineering Process
          </h2>
          <p className="process__desc">
            A structured, repeatable process that delivers on time, within budget,
            and built to last.
          </p>
        </div>

        <div className="process__grid">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="process__step"
              data-num={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="process__step-num">STEP {s.num}</div>
              <div className="process__step-icon">{s.icon}</div>
              <div className="process__step-title">{s.title}</div>
              <div className="process__step-desc">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
