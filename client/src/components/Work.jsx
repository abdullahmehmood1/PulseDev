import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight, TbDatabaseOff } from "react-icons/tb";
import { getProjects } from "../api/api";

export default function Work({ limit }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getProjects(limit)
      .then((res) => {
        setProjects(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setProjects([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [limit]);

  return (
    <section className="work" id="work">
      <div className="work__header">
        <div>
          <div className="eyebrow">Project Work</div>
          <h2 className="work__header-title">
            Built to Perform.<br />Proven in Production.
          </h2>
        </div>
        <p className="work__header-desc">
          A closer look at the software, platforms, and engineering environments
          PulseDev is built for.
        </p>
      </div>

      {!isLoading && projects.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px 20px", background: "var(--navy-card)", 
          borderRadius: "var(--radius-md)", border: "1px dashed var(--steel-border)", margin: "40px 0"
        }}>
          <div style={{ color: "var(--text-muted)", marginBottom: 16 }}>
            <TbDatabaseOff size={42} opacity={0.5} />
          </div>
          <h3 style={{ color: "var(--white)", fontSize: 17, marginBottom: 8, fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>No Projects Published</h3>
          <p style={{ color: "var(--text-body)", fontSize: 14, maxWidth: 300, margin: "0 auto" }}>
            The portfolio is currently being updated. Real projects will appear here shortly.
          </p>
        </div>
      ) : (
        <div className="work__grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="work__card"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => navigate(`/project/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--steel)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                  Image Pending
                </div>
              )}
              <div className="work__card-overlay">
                <div>
                  <div className="work__card-cat">{p.category}</div>
                  <div className="work__card-name">{p.title}</div>
                  {p.project_url && (
                    <a href={p.project_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--blue-accent)", textDecoration: "none", fontWeight: 600, marginTop: 8 }} onClick={(e) => e.stopPropagation()}>
                      View Live Link <TbArrowRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {limit && projects.length > 0 && (
        <div className="work__cta">
          <Link to="/work" className="btn-primary">
            VIEW ALL PROJECTS <TbArrowRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}
