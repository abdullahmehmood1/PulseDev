import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbArrowLeft, TbSearch, TbRefresh, TbUser,
  TbMail, TbCalendar, TbLayoutDashboard, TbLogout, TbX, TbTrash, TbUpload
} from "react-icons/tb";
import { supabase } from "../lib/supabaseClient";
import { getProjects, addProject, deleteProject } from "../api/api";

const PIPELINE_COLS = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'proposal_sent', label: 'Proposal Sent' },
  { id: 'won', label: 'Won' },
  { id: 'lost', label: 'Lost' }
];

function LeadDetailPanel({ lead, onClose, onStatusChange, onLeadUpdate }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [updatingContacted, setUpdatingContacted] = useState(false);

  useEffect(() => {
    if (!lead) return;
    const fetchNotes = async () => {
      setLoadingNotes(true);
      const { data } = await supabase
        .from("submission_notes")
        .select("*")
        .eq("submission_id", lead.id)
        .order("created_at", { ascending: true });
      if (data) setNotes(data);
      setLoadingNotes(false);
    };
    fetchNotes();
  }, [lead]);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setSavingNote(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    
    const noteRow = {
      submission_id: lead.id,
      note: newNote,
      created_by: userId || null
    };
    const { data, error } = await supabase.from("submission_notes").insert([noteRow]).select().single();
    if (!error && data) {
      setNotes((prev) => [...prev, data]);
      setNewNote("");
    }
    setSavingNote(false);
  };

  const handleLastContacted = async () => {
    setUpdatingContacted(true);
    const now = new Date().toISOString();
    const { error } = await supabase.from("submissions").update({ last_contacted_at: now }).eq("id", lead.id);
    if (!error) {
      onLeadUpdate({ ...lead, last_contacted_at: now });
    }
    setUpdatingContacted(false);
  };

  return (
    <AnimatePresence>
      {lead && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", justifyContent: "flex-end" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 500, background: "var(--navy-deep)", borderLeft: "1px solid var(--steel-border)", height: "100vh", overflowY: "auto", padding: 32, display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, color: "var(--white)", textTransform: "uppercase", margin: 0 }}>Lead Details</h2>
              <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex" }}><TbX size={24} /></button>
            </div>

            <div style={{ background: "var(--navy-card)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-md)", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Name</div>
                <div style={{ color: "var(--white)", fontWeight: 600 }}>{lead.name}</div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Email</div>
                  <div style={{ color: "var(--text-body)" }}>{lead.email}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Phone</div>
                  <div style={{ color: "var(--text-body)" }}>{lead.phone || "N/A"}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Company</div>
                  <div style={{ color: "var(--text-body)" }}>{lead.company || "N/A"}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Source</div>
                  <div style={{ color: "var(--text-body)", textTransform: "capitalize" }}>{lead.source}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Service Needed</div>
                <div style={{ color: "var(--text-body)" }}>{lead.service || "N/A"}</div>
              </div>
              {lead.budget && (
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Budget</div>
                  <div style={{ color: "var(--text-body)" }}>{lead.budget}</div>
                </div>
              )}
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Message</div>
                <div style={{ color: "var(--text-body)", whiteSpace: "pre-wrap", background: "var(--steel)", padding: 12, borderRadius: "var(--radius-sm)", border: "1px solid var(--steel-border)" }}>{lead.message}</div>
              </div>
            </div>

            <div style={{ background: "var(--navy-card)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-md)", padding: 20 }}>
              <div style={{ fontSize: 13, color: "var(--white)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Pipeline Management</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <select 
                    value={lead.status || "new"} 
                    onChange={(e) => onStatusChange(lead.id, e.target.value)}
                    style={{ width: "100%", background: "var(--steel)", color: "var(--white)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-sm)", padding: "10px 14px", fontFamily: "Inter, sans-serif", fontSize: 14, outline: "none", cursor: "pointer" }}
                  >
                    {PIPELINE_COLS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--steel-border)", paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Last Contacted: {lead.last_contacted_at ? new Date(lead.last_contacted_at).toLocaleString() : "Never"}
                </div>
                <button 
                  onClick={handleLastContacted} 
                  disabled={updatingContacted}
                  style={{ background: "transparent", color: "var(--blue-accent)", border: "1px solid var(--blue-accent)", borderRadius: "var(--radius-sm)", padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Oswald, sans-serif", textTransform: "uppercase" }}
                >
                  {updatingContacted ? "..." : "Log Contact Now"}
                </button>
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--navy-card)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-md)", padding: 20 }}>
              <div style={{ fontSize: 13, color: "var(--white)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Internal Notes</div>
              
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                {loadingNotes ? (
                  <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Loading notes...</div>
                ) : notes.length === 0 ? (
                  <div style={{ color: "var(--text-muted)", fontSize: 13 }}>No notes yet.</div>
                ) : (
                  notes.map(n => (
                    <div key={n.id} style={{ background: "var(--steel)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-sm)", padding: 12 }}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{new Date(n.created_at).toLocaleString()}</div>
                      <div style={{ fontSize: 13, color: "var(--text-body)", whiteSpace: "pre-wrap" }}>{n.note}</div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
                <textarea 
                  value={newNote} 
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type a new note..."
                  style={{ background: "var(--steel)", color: "var(--white)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-sm)", padding: 12, minHeight: 80, fontFamily: "Inter, sans-serif", fontSize: 13, outline: "none", resize: "vertical" }}
                />
                <button 
                  onClick={handleAddNote}
                  disabled={savingNote || !newNote.trim()}
                  className="btn-primary"
                  style={{ padding: "8px 16px", fontSize: 12, justifyContent: "center" }}
                >
                  {savingNote ? "Saving..." : "Add Note"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("leads"); // "leads" | "projects"

  // Leads State
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [sortField, setSortField] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [viewMode, setViewMode] = useState("table");
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  // Projects State
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "", category: "", description: "", tech_stack: "", project_url: "", is_featured: false, sort_order: 0
  });
  const [projectImage, setProjectImage] = useState(null);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);

  const selectedLead = contacts.find(c => c.id === selectedLeadId) || null;

  const handleLeadUpdate = (updatedLead) => {
    setContacts(prev => prev.map(c => c.id === updatedLead.id ? updatedLead : c));
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setContacts(data);
    } catch (err) {
      console.error("Failed to fetch contact submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectData = async () => {
    setLoadingProjects(true);
    try {
      const res = await getProjects();
      if (res.data) setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => { 
    fetchContacts(); 
    fetchProjectData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase.from('submissions').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProject(true);
    try {
      let image_url = null;
      if (projectImage) {
        const fileName = `${Date.now()}_${projectImage.name.replace(/\s+/g, "_")}`;
        const { error: uploadError } = await supabase.storage.from('project-images').upload(`public/${fileName}`, projectImage);
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(`public/${fileName}`);
        image_url = publicUrlData.publicUrl;
      }

      const techArray = projectForm.tech_stack ? projectForm.tech_stack.split(",").map(t => t.trim()) : [];
      
      const payload = {
        title: projectForm.title,
        category: projectForm.category,
        description: projectForm.description,
        tech_stack: techArray,
        project_url: projectForm.project_url || null,
        image_url,
        is_featured: projectForm.is_featured,
        sort_order: parseInt(projectForm.sort_order, 10) || 0
      };

      await addProject(payload);
      
      // Reset form
      setProjectForm({ title: "", category: "", description: "", tech_stack: "", project_url: "", is_featured: false, sort_order: 0 });
      setProjectImage(null);
      document.getElementById("project-image-upload").value = "";
      
      fetchProjectData();
    } catch (err) {
      console.error("Failed to add project:", err);
      alert("Error adding project.");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch = c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.company?.toLowerCase().includes(q);
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesSource = filterSource === "all" || c.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const sortedFiltered = [...filtered].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (sortField === "name") {
      valA = valA?.toLowerCase() || "";
      valB = valB?.toLowerCase() || "";
    } else if (sortField === "created_at") {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }
    
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div style={{ minHeight: "85vh", background: "var(--navy-deep)", paddingBottom: 80 }}>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <LeadDetailPanel 
        lead={selectedLead} 
        onClose={() => setSelectedLeadId(null)} 
        onStatusChange={handleStatusChange} 
        onLeadUpdate={handleLeadUpdate} 
      />

      {/* Page header */}
      <div className="page-hero" style={{ paddingBottom: 40 }}>
        <div className="page-hero__inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
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
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => activeTab === "leads" ? fetchContacts() : fetchProjectData()}
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
              <button
                onClick={async () => await supabase.auth.signOut()}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "transparent", color: "var(--text-body)",
                  border: "1px solid var(--steel-border)", borderRadius: "var(--radius-sm)",
                  padding: "9px 16px", cursor: "pointer",
                  fontFamily: "Oswald, sans-serif", fontSize: 12,
                  fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                }}
              >
                <TbLogout size={14} /> Sign Out
              </button>
            </div>
          </div>

          <div className="page-hero__eyebrow">Admin Management</div>
          <h1 className="page-hero__title">Internal Dashboard</h1>
          
          <div className="pricing__toggle" style={{ justifyContent: "flex-start", marginTop: 32 }}>
            <button
              className={`pricing__toggle-btn${activeTab === "leads" ? " active" : ""}`}
              onClick={() => setActiveTab("leads")}
            >
              Leads & Inquiries
            </button>
            <button
              className={`pricing__toggle-btn${activeTab === "projects" ? " active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Portfolio Projects
            </button>
          </div>
        </div>
      </div>

      <div className="page-content__inner" style={{ marginTop: 40 }}>
        {activeTab === "leads" ? (
          <>
            {/* View Toggle */}
            <div className="pricing__toggle" style={{ justifyContent: "center", marginBottom: 32 }}>
              <button
                className={`pricing__toggle-btn${viewMode === "table" ? " active" : ""}`}
                onClick={() => setViewMode("table")}
              >
                Table View
              </button>
              <button
                className={`pricing__toggle-btn${viewMode === "pipeline" ? " active" : ""}`}
                onClick={() => setViewMode("pipeline")}
              >
                Pipeline View
              </button>
            </div>

            {/* Stats row */}
            <div className="admin-stats-grid">
              {[
                { title: "Total Submissions", val: contacts.length, desc: "All time inquiries" },
                { title: "Action Required", val: contacts.filter((c) => (c.status || "new") === "new").length, desc: "Unprocessed leads" },
                { title: "Last 7 Days", val: contacts.filter((c) => new Date(c.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length, desc: "Recent activity" },
                { title: "Contact vs Booking", val: `${contacts.filter((c) => c.source === "contact").length} / ${contacts.filter((c) => c.source === "booking").length}`, desc: "Lead breakdown" },
              ].map((s) => (
                <div key={s.title} style={{ background: "var(--navy-card)", borderRadius: 16, padding: "20px 16px", border: "1px solid var(--steel-border)", boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}>
                  <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--white)", lineHeight: 1.0, marginBottom: 4 }}>{s.val}</div>
                  <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--amber)", letterSpacing: "0.05em", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--text-body)", lineHeight: 1.35 }}>{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Search + Filters */}
            <div style={{
              background: "var(--navy-card)", border: "1px solid var(--steel-border)",
              borderRadius: "var(--radius-md)", padding: "20px 24px",
              display: "flex", flexWrap: "wrap", gap: 16,
              marginBottom: 24,
            }}>
              <div className="contact__field" style={{ flex: "1 1 240px", margin: 0 }}>
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="contact__field" style={{ flex: "0 0 160px", margin: 0 }}>
                <label>Status</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              <div className="contact__field" style={{ flex: "0 0 160px", margin: 0 }}>
                <label>Source</label>
                <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
                  <option value="all">All Sources</option>
                  <option value="contact">Contact</option>
                  <option value="booking">Booking</option>
                </select>
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
            ) : viewMode === "pipeline" ? (
              <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 24 }}>
                {PIPELINE_COLS.map(col => {
                  const colLeads = sortedFiltered.filter(c => (c.status || "new") === col.id);
                  return (
                    <div key={col.id} style={{ minWidth: 280, flex: "1 0 280px", background: "rgba(255,255,255,0.02)", border: "1px dashed var(--steel-border)", borderRadius: "var(--radius-md)", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid var(--steel-border)" }}>
                        <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 15, color: "var(--white)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{col.label}</h3>
                        <span style={{ background: "var(--navy-deep)", padding: "2px 8px", borderRadius: 12, fontSize: 11, color: "var(--text-muted)" }}>{colLeads.length}</span>
                      </div>
                      {colLeads.map(lead => (
                        <div 
                          key={lead.id} 
                          onClick={() => setSelectedLeadId(lead.id)}
                          style={{ background: "var(--navy-card)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-md)", padding: 16, cursor: "pointer", transition: "border-color 0.2s" }}
                          onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--blue-accent)"}
                          onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--steel-border)"}
                        >
                          <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 15, color: "var(--white)", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{lead.name}</div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>{lead.company || lead.email}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="tech-chip" style={{ fontSize: 10, padding: "2px 6px" }}>{lead.source}</span>
                            <select 
                              value={lead.status || "new"}
                              onChange={(e) => { e.stopPropagation(); handleStatusChange(lead.id, e.target.value); }}
                              onClick={(e) => e.stopPropagation()}
                              style={{ background: "var(--steel)", color: "var(--white)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-sm)", padding: "4px 8px", fontSize: 11, outline: "none", cursor: "pointer" }}
                            >
                              {PIPELINE_COLS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0 24px", color: "var(--text-muted)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <div style={{ cursor: "pointer", userSelect: "none" }} onClick={() => toggleSort("name")}>
                    Name {sortField === "name" && (sortDir === "asc" ? "↑" : "↓")}
                  </div>
                  <div style={{ cursor: "pointer", userSelect: "none" }} onClick={() => toggleSort("created_at")}>
                    Date {sortField === "created_at" && (sortDir === "asc" ? "↑" : "↓")}
                  </div>
                </div>
                {sortedFiltered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedLeadId(item.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      background: "var(--navy-card)", border: "1px solid var(--steel-border)",
                      borderRadius: "var(--radius-md)", padding: 24, cursor: "pointer"
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
                          <TbCalendar size={12} /> {new Date(item.created_at).toLocaleString()}
                        </span>

                        <select
                          value={item.status || "new"}
                          onChange={(e) => { e.stopPropagation(); handleStatusChange(item.id, e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
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
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="won">Won</option>
                          <option value="lost">Lost</option>
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
          </>
        ) : (
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* Add Project Form */}
            <div style={{ flex: "1 1 350px", background: "var(--navy-card)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-md)", padding: 32 }}>
              <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "var(--white)", textTransform: "uppercase", marginBottom: 24, borderBottom: "1px solid var(--steel-border)", paddingBottom: 16 }}>Add New Project</h2>
              <form onSubmit={handleProjectSubmit} className="contact__form">
                <div className="contact__field">
                  <label>Title *</label>
                  <input type="text" required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} placeholder="e.g. AI Engine" />
                </div>
                <div className="contact__field">
                  <label>Category *</label>
                  <input type="text" required value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} placeholder="e.g. SaaS / Web App" />
                </div>
                <div className="contact__field">
                  <label>Description</label>
                  <textarea rows="3" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} placeholder="Short summary..." />
                </div>
                <div className="contact__field">
                  <label>Tech Stack (comma separated)</label>
                  <input type="text" value={projectForm.tech_stack} onChange={e => setProjectForm({...projectForm, tech_stack: e.target.value})} placeholder="React, Node, PostgreSQL" />
                </div>
                <div className="contact__field">
                  <label>Live URL</label>
                  <input type="url" value={projectForm.project_url} onChange={e => setProjectForm({...projectForm, project_url: e.target.value})} placeholder="https://..." />
                </div>
                
                <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                  <div className="contact__field" style={{ flex: 1, margin: 0 }}>
                    <label>Sort Order</label>
                    <input type="number" value={projectForm.sort_order} onChange={e => setProjectForm({...projectForm, sort_order: e.target.value})} />
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, paddingTop: 30 }}>
                    <input type="checkbox" id="featured" checked={projectForm.is_featured} onChange={e => setProjectForm({...projectForm, is_featured: e.target.checked})} style={{ width: 16, height: 16 }} />
                    <label htmlFor="featured" style={{ color: "var(--white)", cursor: "pointer", fontSize: 13 }}>Featured (Homepage)</label>
                  </div>
                </div>

                <div className="contact__field">
                  <label>Project Image</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <input id="project-image-upload" type="file" accept="image/*" onChange={e => setProjectImage(e.target.files[0])} style={{ background: "var(--steel)", border: "1px solid var(--steel-border)", padding: "10px", borderRadius: "var(--radius-sm)", color: "var(--text-body)", width: "100%", fontSize: 13 }} />
                  </div>
                </div>
                
                <button type="submit" className="btn-primary" disabled={isSubmittingProject} style={{ width: "100%", marginTop: 12 }}>
                  {isSubmittingProject ? "Uploading..." : "Publish Project"}
                </button>
              </form>
            </div>

            {/* Project List */}
            <div style={{ flex: "2 1 500px", display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "var(--white)", textTransform: "uppercase", marginBottom: 8 }}>Published Projects</h2>
              
              {loadingProjects ? (
                <p style={{ color: "var(--text-muted)" }}>Loading projects...</p>
              ) : projects.length === 0 ? (
                <div style={{ background: "var(--navy-card)", border: "1px dashed var(--steel-border)", padding: 40, textAlign: "center", borderRadius: "var(--radius-md)", color: "var(--text-muted)" }}>
                  No projects added yet. Use the form to add your first project.
                </div>
              ) : (
                projects.map(p => (
                  <div key={p.id} style={{ background: "var(--navy-card)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-md)", padding: 20, display: "flex", gap: 20, alignItems: "center" }}>
                    <div style={{ width: 100, height: 70, borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--steel)", flexShrink: 0 }}>
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase" }}>No Image</div>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontFamily: "Oswald, sans-serif", fontSize: 16, color: "var(--white)", fontWeight: 600, textTransform: "uppercase" }}>{p.title}</span>
                        {p.is_featured && <span className="status-badge won" style={{ padding: "2px 6px", fontSize: 10 }}>Featured</span>}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{p.category} • Sort: {p.sort_order}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.tech_stack?.map((t, i) => (
                          <span key={i} className="tech-chip" style={{ fontSize: 10, padding: "2px 6px" }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDeleteProject(p.id)}
                      style={{ background: "transparent", color: "#f87171", border: "1px solid rgba(248, 113, 113, 0.3)", borderRadius: "var(--radius-sm)", padding: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                      onMouseOver={(e) => { e.currentTarget.style.background = "rgba(248, 113, 113, 0.1)"; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
                      title="Delete Project"
                    >
                      <TbTrash size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
