import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbCheck, TbArrowRight } from "react-icons/tb";

const plans = [
  {
    plan: "Starter",
    name: "Project Build",
    tagline: "For MVPs and early-stage startups",
    monthly: "$1,200",
    annual: "$1,200",
    period: "starting at",
    isOneTime: true,
    features: [
      "Direct access to both founding engineers",
      "1 product sprint per week",
      "Web or mobile application",
      "Basic CI/CD pipeline",
      "Email support",
      "2 weeks of post-launch bug-fix support",
    ],
  },
  {
    plan: "Growth",
    name: "Growth Retainer",
    tagline: "For teams ready for ongoing engineering support",
    monthly: "$1,000",
    annual: "$860",
    period: "/ month",
    featured: true,
    features: [
      "One consistent point of contact",
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
      "Dedicated senior engineer",
      "Multi-platform delivery",
      "Security-first development practices",
      "Priority incident response",
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

              {p.isOneTime && (
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "-0.5rem", marginBottom: "1rem" }}>
                  one-time project fee
                </div>
              )}

              <ul className="pricing__features" style={{ flex: 1 }}>
                {p.features.map((f) => (
                  <li key={f}>
                    <TbCheck className="pricing__check" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={p.plan.toLowerCase() === "enterprise" ? "/#contact" : `/?plan=${p.plan.toLowerCase()}#contact`}
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
