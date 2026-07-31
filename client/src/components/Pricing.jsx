import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbCheck, TbArrowRight } from "react-icons/tb";

const plans = [
  {
    plan: "Starter",
    name: "Project Build",
    tagline: "For MVPs and early-stage startups",
    monthly: "$2,000",
    annual: "$2,000",
    period: "starting at",
    features: [
      "Direct access to both founding engineers",
      "1 product sprint per week",
      "Web or mobile application",
      "Basic CI/CD pipeline",
      "Email support",
      "Monthly review call",
    ],
  },
  {
    plan: "Growth",
    name: "Growth Retainer",
    tagline: "For teams ready for ongoing engineering support",
    monthly: "$1,500",
    annual: "$1,290",
    period: "/ month",
    featured: true,
    features: [
      "Direct access to both founding engineers",
      "Dedicated project manager",
      "Full-stack web + mobile",
      "CI/CD + cloud infrastructure",
      "Slack + priority support",
      "Weekly architecture reviews",
      "Security & performance audits",
    ],
  },
  {
    plan: "Enterprise",
    name: "Enterprise Suite",
    tagline: "For large-scale enterprise products",
    monthly: "Custom",
    annual: "Custom",
    period: "contact us",
    features: [
      "Direct access to both founding engineers",
      "Dedicated senior engineer",
      "Multi-platform delivery",
      "SOC 2 & compliance support",
      "24/7 SLA monitoring",
      "Custom SLA terms",
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="pricing" id="pricing">
      <div className="pricing__inner">
        <div className="pricing__header">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Pricing</div>
          <h2 className="pricing__title">Transparent, Flexible Plans</h2>
          <p className="pricing__sub">
            No hidden fees. Choose a plan that scales with your business.
          </p>
          <div className="pricing__toggle">
            <button
              className={`pricing__toggle-btn${!annual ? " active" : ""}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`pricing__toggle-btn${annual ? " active" : ""}`}
              onClick={() => setAnnual(true)}
            >
              Annual (Save 14%)
            </button>
          </div>
        </div>

        <div className="pricing__grid">
          {plans.map((p, i) => (
            <motion.div
              key={p.plan}
              className={`pricing__card${p.featured ? " featured" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {p.featured && <div className="pricing__card-badge">Most Popular</div>}
              <div className="pricing__plan">{p.plan}</div>
              <div className="pricing__plan-name">{p.name}</div>
              <p className="pricing__tagline">{p.tagline}</p>

              <div className="pricing__price">
                <div className="pricing__amount">
                  {annual ? p.annual : p.monthly}
                </div>
                <div className="pricing__period">{p.period}</div>
              </div>

              <ul className="pricing__features" style={{ flex: 1 }}>
                {p.features.map((f) => (
                  <li key={f}>
                    <TbCheck className="pricing__check" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/#contact"
                className="btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: "auto",
                  width: "100%",
                }}
              >
                {p.monthly === "Custom" ? "Contact Us" : "Get Started"} <TbArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
