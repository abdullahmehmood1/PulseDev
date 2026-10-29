import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TbArrowRight, TbWorld, TbBriefcase, TbMail, TbCurrencyDollar } from "react-icons/tb";

const teaserCards = [
  {
    to: "/product",
    eyebrow: "What We Build",
    title: "Product & Services",
    desc: "Web apps, mobile products, cloud infrastructure, security audits, and automation — all under one roof.",
    icon: TbWorld,
    cta: "Explore Services",
  },
  {
    to: "/work",
    eyebrow: "Our Track Record",
    title: "Case Studies",
    desc: "Real projects shipped for founders, startups, and enterprises. See what we've built and how we did it.",
    icon: TbBriefcase,
    cta: "View Case Studies",
  },
  {
    to: "/pricing",
    eyebrow: "Transparent Investment",
    title: "Pricing Models",
    desc: "Fixed-scope project builds, monthly growth retainers, and enterprise arrangements — no hidden fees.",
    icon: TbCurrencyDollar,
    cta: "See Pricing",
  },
  {
    to: "/contact",
    eyebrow: "Start a Conversation",
    title: "Contact Us",
    desc: "Ready to launch? Tell us about your project and we'll get back within one business day.",
    icon: TbMail,
    cta: "Get In Touch",
  },
];

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Home | PulseDev</title>
        <meta name="description" content="PulseDev builds high-performance web applications, mobile apps, and cloud infrastructure for startups and enterprises — from architecture to production." />
      </Helmet>

      {/* 1. Hero — full-screen */}
      <Hero />

      {/* 2. Partners strip */}
      <Partners />

      {/* 3. Section Navigation Teasers */}
      <section style={{ background: "var(--navy-deep)", padding: "80px 0" }}>
        <div className="page-content__inner">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Explore PulseDev</div>
            <h2 style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--white)",
              marginTop: 12,
            }}>
              Everything You Need,<br />All In One Place
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}>
            {teaserCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.to}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "var(--navy-card)",
                    border: "1px solid var(--steel-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "rgba(59,158,232,0.1)",
                    border: "1px solid rgba(59,158,232,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 4,
                  }}>
                    <Icon size={22} style={{ color: "var(--blue-accent)" }} />
                  </div>
                  <div style={{ fontSize: 11, fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue-accent)", fontWeight: 600 }}>
                    {card.eyebrow}
                  </div>
                  <h3 style={{
                    fontFamily: "Oswald, sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--white)",
                    margin: 0,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "var(--text-body)", fontSize: 14, lineHeight: 1.65, margin: 0, flex: 1 }}>
                    {card.desc}
                  </p>
                  <Link
                    to={card.to}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--blue-accent)",
                      fontSize: 13,
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      marginTop: 8,
                    }}
                  >
                    {card.cta} <TbArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
