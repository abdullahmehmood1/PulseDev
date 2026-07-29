import Services from "../components/Services";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbCode, TbArrowRight } from "react-icons/tb";

const techStacks = [
  {
    category: "Frontend",
    items: ["React 18", "Next.js", "Vite", "TypeScript", "Framer Motion", "Tailwind CSS"],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Python / FastAPI", "WebSockets"],
  },
  {
    category: "Databases & Storage",
    items: ["MongoDB Atlas", "PostgreSQL", "Redis Cache", "Mongoose ORM", "AWS S3"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "AWS / GCP", "GitHub Actions CI/CD", "Nginx", "Datadog"],
  },
];

export default function ServicesPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__eyebrow">Full-Stack Capabilities</div>
          <h1 className="page-hero__title">Engineering<br />Services</h1>
          <p className="page-hero__desc">
            From single-page web applications to complex multi-tenant SaaS platforms
            and cloud security infrastructure — we deliver end to end.
          </p>
        </div>
      </div>

      {/* Services component (full, no limit) */}
      <Services />

      {/* Tech Stack section */}
      <section style={{ background: "var(--navy-deep)", padding: "80px 0" }}>
        <div className="page-content__inner">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Technology</div>
            <h2 style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--white)",
              marginBottom: 12,
            }}>
              Our Standard Technology Stack
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: 15, maxWidth: 520, margin: "0 auto" }}>
              Battle-tested modern frameworks we use to engineer high-scale products.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {techStacks.map((t) => (
              <div
                key={t.category}
                style={{
                  background: "var(--navy-card)",
                  border: "1px solid var(--steel-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "28px 24px",
                }}
              >
                <h3 style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--blue-accent)",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                  <TbCode size={16} /> {t.category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {t.items.map((item) => (
                    <span className="tech-chip" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, textAlign: "center" }}>
            <Link to="/#contact" className="btn-primary">
              Request Custom Proposal <TbArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
