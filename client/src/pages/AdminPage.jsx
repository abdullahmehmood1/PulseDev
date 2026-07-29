import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TbArrowLeft, TbSearch, TbRefresh, TbUser,
  TbMail, TbCalendar, TbLayoutDashboard
} from "react-icons/tb";
import api from "../api/api";

const STATUS_OPTS = ["all", "new", "contacted", "closed"];

export default function AdminPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/contact");
      if (res.data?.data) setContacts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch contact submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/contact/${id}/status`, { status: newStatus });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.message?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ minHeight: "85vh", background: "var(--navy-deep)", paddingBottom: 80 }}>
      {/* Page header */}
      <div className="page-hero">
        <div className="page-hero__inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <Link
              to="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "var(--text-body)", fontSize: 13, fontFamily: "Oswald, sans-serif",
                fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <TbArrowLeft size={15} /> Back to Site
            </Link>
            <button
              onClick={fetchContacts}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "var(--blue-primary)", color: "white",
                border: "none", borderRadius: "var(--radius-sm)",
                padding: "9px 16px", cursor: "pointer",
                fontFamily: "Oswald, sans-serif", fontSize: 12,
                fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              }}
            >
              <TbRefresh size={14} /> Refresh
            </button>
          </div>

          <div className="page-hero__eyebrow">Admin Management</div>
          <h1 className="page-hero__title">Inquiry Dashboard</h1>
          <p className="page-hero__desc">
            Live entries from your website's contact form and consultation portal.
          </p>
        </div>
      </div>

      <div className="page-content__inner" style={{ marginTop: 40 }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Inquiries", val: contacts.length },
            { label: "New", val: contacts.filter((c) => (c.status || "new") === "new").length },
            { label: "Contacted", val: contacts.filter((c) => c.status === "contacted").length },
            { label: "Closed", val: contacts.filter((c) => c.status === "closed").length },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__val">{s.val}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div style={{
          background: "var(--navy-card)", border: "1px solid var(--steel-border)",
          borderRadius: "var(--radius-md)", padding: "20px 24px",
          display: "flex", flexWrap: "wrap", gap: 16,
          justifyContent: "space-between", alignItems: "center",
          marginBottom: 24,
        }}>
          <div style={{ position: "relative", minWidth: 280, flex: 1 }}>
            <TbSearch style={{
              position: "absolute", left: 14, top: "50%",
              transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: 16,
            }} />
            <input
              type="text"
              className="dark-form"
              style={{
                paddingLeft: 42, background: "var(--steel)", border: "1px solid var(--steel-border)",
                color: "var(--white)", borderRadius: "var(--radius-sm)", padding: "10px 14px 10px 42px",
                fontFamily: "Inter, sans-serif", fontSize: 14, width: "100%", outline: "none",
              }}
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {STATUS_OPTS.map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-sm)",
                  border: filterStatus === st ? "1px solid var(--blue-primary)" : "1px solid var(--steel-border)",
                  background: filterStatus === st ? "var(--blue-primary)" : "var(--steel)",
                  color: filterStatus === st ? "white" : "var(--text-body)",
                  fontFamily: "Oswald, sans-serif", fontSize: 11,
                  fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {st === "all" ? "All" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions */}
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 48 }}>
            Loading submissions...
          </p>
        ) : filtered.length === 0 ? (
          <div style={{
            background: "var(--navy-card)", border: "1px solid var(--steel-border)",
            borderRadius: "var(--radius-md)", padding: 56, textAlign: "center",
          }}>
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
              No submissions found matching your search.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  background: "var(--navy-card)", border: "1px solid var(--steel-border)",
                  borderRadius: "var(--radius-md)", padding: 24,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <TbUser size={16} style={{ color: "var(--blue-accent)" }} />
                      <span style={{ fontFamily: "Oswald, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--white)", textTransform: "uppercase" }}>
                        {item.name}
                      </span>
                      <span className={`status-badge ${item.status || "new"}`}>
                        {item.status || "new"}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-body)" }}>
                      <TbMail size={13} /> {item.email}
                      {item.phone && <span style={{ marginLeft: 12 }}>{item.phone}</span>}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
                      <TbCalendar size={12} /> {new Date(item.createdAt).toLocaleString()}
                    </span>

                    <select
                      value={item.status || "new"}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      style={{
                        background: "var(--steel)", color: "var(--white)",
                        border: "1px solid var(--steel-border)", borderRadius: "var(--radius-sm)",
                        padding: "7px 12px", fontSize: 12, fontWeight: 600,
                        fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em",
                        textTransform: "uppercase", outline: "none", cursor: "pointer",
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                {item.service && (
                  <div style={{ marginBottom: 12 }}>
                    <span className="tech-chip">{item.service}</span>
                  </div>
                )}

                <div style={{
                  background: "var(--steel)", border: "1px solid var(--steel-border)",
                  borderRadius: "var(--radius-sm)", padding: 16, fontSize: 14,
                  color: "rgba(255,255,255,0.8)", whiteSpace: "pre-wrap", lineHeight: 1.65,
                }}>
                  {item.message}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
