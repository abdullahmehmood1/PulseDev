import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";
import { getProjects } from "../api/api";

const fallbackProjects = [
  {
    _id: "1",
    title: "Enterprise SaaS Platform",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    _id: "2",
    title: "E-commerce Marketplace",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    _id: "3",
    title: "FinTech Mobile App",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
  },
  {
    _id: "4",
    title: "Healthcare Dashboard",
    category: "Dashboard",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
  {
    _id: "5",
    title: "Real-Time Analytics Engine",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
  },
  {
    _id: "6",
    title: "DevOps Automation Suite",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80",
  },
];

export default function Work({ limit }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then((data) => {
        const all = data?.length ? data : fallbackProjects;
        setProjects(limit ? all.slice(0, limit) : all);
      })
      .catch(() => {
        setProjects(limit ? fallbackProjects.slice(0, limit) : fallbackProjects);
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

      <div className="work__grid">
        {projects.map((p, i) => (
          <motion.div
            key={p._id}
            className="work__card"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <img src={p.image || p.imageUrl || fallbackProjects[i % 6].image} alt={p.title} />
            <div className="work__card-overlay">
              <div>
                <div className="work__card-cat">{p.category || "Development"}</div>
                <div className="work__card-name">{p.title}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {limit && (
        <div className="work__cta">
          <Link to="/work" className="btn-primary">
            VIEW ALL PROJECTS <TbArrowRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}
