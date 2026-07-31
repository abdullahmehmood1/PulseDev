import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { TbArrowLeft, TbExternalLink, TbBrandReact, TbCode, TbDatabase, TbArrowRight } from "react-icons/tb";
import { getProjectById } from "../api/api";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getProjectById(id)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--white)", padding: "0 20px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Oswald, sans-serif", fontSize: 48, marginBottom: 16 }}>Project Not Found</h1>
        <Link to="/work" className="btn-primary">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy-deep)", paddingBottom: 100 }}>
      <Helmet>
        <title>{project.title} | PulseDev</title>
        <meta name="description" content={project.description || `Read about the ${project.title} project by PulseDev.`} />
      </Helmet>

      {/* Hero Section */}
      <div className="page-hero" style={{ paddingBottom: "clamp(40px, 8vw, 80px)", borderBottom: "1px solid var(--steel-border)", paddingTop: "clamp(60px, 10vw, 100px)" }}>
        <div className="page-hero__inner" style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          <Link
            to="/work"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "var(--text-muted)", fontSize: 13, fontFamily: "Oswald, sans-serif",
              fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", marginBottom: "clamp(24px, 4vw, 40px)", transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"}
            onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <TbArrowLeft size={16} /> Back to Portfolio
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="page-hero__eyebrow">{project.category}</div>
            <h1 className="page-hero__title" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", marginBottom: 24, lineHeight: 1.1 }}>{project.title}</h1>
            <p className="page-hero__desc" style={{ maxWidth: 700, fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
              {project.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap", alignItems: "center" }}
          >
            {project.project_url && (
              <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "14px 32px" }}>
                View Live Project <TbExternalLink size={18} />
              </a>
            )}
            
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: 8, width: "100%", display: "block" }}>Tech Stack:</span>
              {project.tech_stack?.map((tech, i) => (
                <span key={i} className="tech-chip" style={{ fontSize: 12, padding: "6px 12px", background: "rgba(255,255,255,0.03)" }}>{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Image Showcase */}
      {project.image_url && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", marginTop: "clamp(-30px, -5vw, -60px)", position: "relative", zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ 
              borderRadius: "var(--radius-lg)", 
              overflow: "hidden", 
              boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              border: "1px solid var(--steel-border)",
              background: "var(--navy-card)"
            }}
          >
            <img src={project.image_url} alt={project.title} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
        </div>
      )}

      {/* Extra Images Gallery */}
      {project.extra_images && project.extra_images.length > 0 && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px, 8vw, 80px) 20px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ height: 1, flex: 1, background: "var(--steel-border)" }} />
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(18px, 4vw, 24px)", color: "var(--white)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, whiteSpace: "nowrap" }}>Application Gallery</h2>
            <div style={{ height: 1, flex: 1, background: "var(--steel-border)" }} />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(16px, 4vw, 32px)" }}>
            {project.extra_images.map((imgUrl, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--steel-border)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
                  background: "var(--navy-card)",
                  cursor: "zoom-in"
                }}
                onClick={() => window.open(imgUrl, "_blank")}
              >
                <img src={imgUrl} alt={`${project.title} Screenshot ${i + 1}`} style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.4s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Hire Us CTA */}
      <div style={{ maxWidth: 800, margin: "clamp(60px, 10vw, 100px) auto 0", padding: "0 20px" }}>
        <div style={{ background: "linear-gradient(145deg, var(--navy-card), var(--steel))", borderRadius: "var(--radius-lg)", border: "1px solid var(--steel-border)", padding: "clamp(32px, 6vw, 56px) clamp(20px, 4vw, 40px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, background: "var(--blue-primary)", opacity: 0.1, filter: "blur(100px)", borderRadius: "50%" }}></div>
          <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(24px, 5vw, 36px)", color: "var(--white)", textTransform: "uppercase", marginBottom: 16 }}>Need Something Similar?</h2>
          <p style={{ color: "var(--text-body)", fontSize: "clamp(14px, 2vw, 16px)", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>We build high-performance, aesthetic platforms tailored to your business needs.</p>
          <Link to="/booking" className="btn-primary" style={{ display: "inline-flex", padding: "16px 32px", fontSize: 14 }}>
            START YOUR PROJECT <TbArrowRight size={18} style={{ marginLeft: 8 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
