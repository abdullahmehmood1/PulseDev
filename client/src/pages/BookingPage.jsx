import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  TbWorld, TbDeviceMobile, TbServer2, TbShieldLock, TbCloud, TbRefresh,
  TbCheck, TbArrowLeft, TbSend
} from "react-icons/tb";
import { sendContactMessage } from "../api/api";

const servicesList = [
  { id: "web", title: "Web Development", icon: TbWorld, desc: "React, Next.js & full-stack web applications." },
  { id: "mobile", title: "Mobile Apps", icon: TbDeviceMobile, desc: "iOS, Android & React Native cross-platform apps." },
  { id: "saas", title: "SaaS Launch", icon: TbCloud, desc: "Multi-tenant architecture, billing & RBAC." },
  { id: "devops", title: "DevOps & Cloud", icon: TbServer2, desc: "AWS, Kubernetes, Docker & CI/CD pipelines." },
  { id: "security", title: "Security Audit", icon: TbShieldLock, desc: "Penetration testing & zero-trust code hardening." },
  { id: "automation", title: "Automation", icon: TbRefresh, desc: "API integrations, bots & ETL data pipelines." },
];

const budgetRanges = [
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000+",
];

const stepStyle = {
  width: 28, height: 28, borderRadius: "50%",
  background: "linear-gradient(180deg, #1f5882 0%, #133f61 100%)",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 13, color: "#fff", fontWeight: 700, fontFamily: "Oswald, sans-serif",
  flexShrink: 0,
};

const cardStyle = {
  background: "var(--navy-card)",
  border: "1px solid var(--steel-border)",
  borderRadius: "var(--radius-md)",
  padding: "32px 28px",
};

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("web");
  const [budget, setBudget] = useState("$10,000 – $25,000");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", preferredDate: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please complete all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const fullPayload = {
      name: form.name,
      email: form.email,
      message: `[BOOKING CONSULTATION]
Service: ${selectedService.toUpperCase()}
Budget: ${budget}
Phone: ${form.phone || "Not provided"}
Preferred Date: ${form.preferredDate || "ASAP"}

Project Details:
${form.message}`,
    };

    try {
      await sendContactMessage(fullPayload);
      setStatus("success");
      try {
        confetti({
          particleCount: 90, spread: 70, origin: { y: 0.6 },
          colors: ["#1f5882", "#3b9ee8", "#22c55e", "#60a5fa"],
        });
      } catch {}
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Could not submit. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div style={{ minHeight: "85vh", background: "var(--navy-deep)", paddingBottom: 80 }}>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__inner">
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "var(--text-body)", fontSize: 12, fontFamily: "Oswald, sans-serif",
              fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", marginBottom: 20,
            }}
          >
            <TbArrowLeft size={14} /> Back to Home
          </Link>
          <div className="page-hero__eyebrow">Direct Consultation Booking</div>
          <h1 className="page-hero__title">Schedule Your<br />Engineering Session</h1>
          <p className="page-hero__desc">
            Select your requirements, specify project goals, and reserve a 30-minute
            scoping call with a senior solutions architect.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 40px 0" }}>
        {status === "success" ? (
          /* Confirmation Screen with Dual Buttons */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              ...cardStyle,
              border: "1px solid rgba(34,197,94,0.3)",
              textAlign: "center",
              padding: 56,
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px",
            }}>
              <TbCheck style={{ color: "#22c55e", fontSize: 32 }} />
            </div>
            <h2 style={{
              fontFamily: "Oswald, sans-serif", fontSize: 28, fontWeight: 700,
              textTransform: "uppercase", color: "var(--white)", marginBottom: 14,
            }}>
              Consultation Confirmed!
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: 15, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.65 }}>
              Thank you <strong style={{ color: "var(--white)" }}>{form.name}</strong>. Your project outline has been registered.
              A technical lead will reach out to <strong style={{ color: "var(--white)" }}>{form.email}</strong> within 12 business hours.
            </p>
            {/* Dual Buttons: Steel Navy Gradient + Pure White */}
            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              <Link to="/" className="btn-primary">RETURN TO HOME</Link>
              <Link to="/work" className="btn-white">VIEW CASE STUDIES</Link>
            </div>
          </motion.div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Step 1 */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 17, fontWeight: 700, textTransform: "uppercase", color: "var(--white)", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, letterSpacing: "0.05em" }}>
                <div style={stepStyle}>1</div>
                Select Primary Capability
              </h3>
              <p style={{ color: "var(--text-body)", fontSize: 13, marginBottom: 20 }}>
                Choose the primary engineering focus for your product:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {servicesList.map((s) => {
                  const Icon = s.icon;
                  const active = selectedService === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      style={{
                        padding: "16px 18px",
                        borderRadius: "var(--radius-sm)",
                        border: active ? "2px solid #1f5882" : "1px solid var(--steel-border)",
                        background: active ? "rgba(31,88,130,0.2)" : "var(--steel)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <Icon style={{ fontSize: 22, color: active ? "var(--blue-accent)" : "var(--text-body)" }} />
                        {active && <TbCheck style={{ color: "var(--blue-accent)", fontSize: 18 }} />}
                      </div>
                      <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", color: "var(--white)", marginBottom: 5, letterSpacing: "0.04em" }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-body)", lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 17, fontWeight: 700, textTransform: "uppercase", color: "var(--white)", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, letterSpacing: "0.05em" }}>
                <div style={stepStyle}>2</div>
                Target Project Budget
              </h3>
              <p style={{ color: "var(--text-body)", fontSize: 13, marginBottom: 20 }}>
                Enables us to allocate the right team structure and timeline:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 }}>
                {budgetRanges.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    style={{
                      padding: "13px 16px",
                      borderRadius: "var(--radius-sm)",
                      border: budget === b ? "2px solid #1f5882" : "1px solid var(--steel-border)",
                      background: budget === b ? "rgba(31,88,130,0.2)" : "var(--steel)",
                      color: budget === b ? "var(--white)" : "var(--text-body)",
                      fontFamily: "Oswald, sans-serif", fontSize: 13, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.05em",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: 17, fontWeight: 700, textTransform: "uppercase", color: "var(--white)", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, letterSpacing: "0.05em" }}>
                <div style={stepStyle}>3</div>
                Contact &amp; Project Details
              </h3>
              <p style={{ color: "var(--text-body)", fontSize: 13, marginBottom: 24 }}>
                Provide your contact details so we can send calendar invites &amp; technical breakdown:
              </p>

              <div className="dark-form" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label>Full Name <span style={{ color: "var(--blue-accent)", fontSize: 9 }}>(Required)</span></label>
                    <input type="text" name="name" placeholder="John Smith" value={form.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label>Work Email <span style={{ color: "var(--blue-accent)", fontSize: 9 }}>(Required)</span></label>
                    <input type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label>Phone / WhatsApp (Optional)</label>
                    <input type="text" name="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <label>Preferred Timeframe</label>
                    <input type="text" name="preferredDate" placeholder="e.g. Next Tuesday 2PM EST" value={form.preferredDate} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <label>Project Scope &amp; Goals <span style={{ color: "var(--blue-accent)", fontSize: 9 }}>(Required)</span></label>
                  <textarea name="message" rows={4} placeholder="Describe your product idea, key features, tech preferences, deadline..." value={form.message} onChange={handleChange} required />
                </div>
              </div>

              {status === "error" && (
                <p style={{ color: "#f87171", fontSize: 13, marginTop: 12, fontWeight: 600 }}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={status === "submitting"}
                style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
              >
                {status === "submitting" ? "Submitting..." : <><TbSend size={14} /> CONFIRM CONSULTATION REQUEST</>}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          form div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
