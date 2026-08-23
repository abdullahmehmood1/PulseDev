import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { sendContactMessage } from "../api/api";
import { TbSend, TbCheck, TbPhone, TbChevronDown } from "react-icons/tb";
import { CONTACT } from "../config/contactInfo";

const serviceMessages = {
  web: "Hi PulseDev team, I am interested in your Web Development services.\n\nWe are looking to design and build a high-performance web application optimised for speed, scale, and SEO.\n\nHere is a brief overview of what we want to build: [Describe your web project requirements here]",
  mobile: "Hi PulseDev team, I am interested in your Mobile App development services.\n\nWe need a native or cross-platform mobile application that delivers a seamless user experience across devices.\n\nHere is a brief overview of what we want to build: [Describe your mobile app idea here]",
  backend: "Hi PulseDev team, I am interested in your Backend & APIs services.\n\nWe need a robust, scalable backend system and API built for reliability and performance at scale.\n\nHere is a brief overview of our infrastructure needs: [Describe your backend requirements here]",
  security: "Hi PulseDev team, I am interested in your Security services.\n\nWe are looking for an end-to-end security review, penetration testing, or implementation of enterprise-grade security measures to protect our users and data.\n\nHere is a brief overview of our current stack and concerns: [Describe your security requirements here]",
  cloud: "Hi PulseDev team, I am interested in your Cloud & DevOps services.\n\nWe need help with infrastructure as code, containerisation, and automated CI/CD pipelines so our team can ship faster and stay reliable.\n\nHere is a brief overview of our current infrastructure challenges: [Describe your DevOps needs here]",
  retainer: "Hi PulseDev team, I am interested in Retainer Support.\n\nWe are looking for continuous improvement, bug fixing, monitoring, and feature development through flexible monthly retainers tailored to our team's velocity.\n\nHere is a brief overview of our current product and what we need help with: [Describe your ongoing support needs here]"
};

const serviceOptions = [
  { value: "", label: "Select a service..." },
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App" },
  { value: "backend", label: "Backend & APIs" },
  { value: "cloud", label: "Cloud & DevOps" },
  { value: "security", label: "Security Audit" },
  { value: "retainer", label: "Ongoing Retainer" },
  { value: "other", label: "Other" }
];

const miniCards = [
  { title: "Web & Mobile", sub: "Full-stack product teams" },
  { title: "Service Area", sub: "Global, remote-first" },
  { title: "Since 2020", sub: "5+ years of engineering" },
  { title: "Response Time", sub: "Within 24 business hours" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    const service = params.get("service");

    if (plan === "starter") {
      setForm((prev) => ({
        ...prev,
        message: "Hi PulseDev team, I am interested in the Project Build plan to bring my MVP to life.\n\nHere is a brief overview of what I want to build: [Describe your app idea here]\n\nMy target launch timeline is around [Timeline]. Please let me know what additional details you need from me to finalize the scope and start development."
      }));
    } else if (plan === "growth") {
      setForm((prev) => ({
        ...prev,
        service: "retainer",
        message: "Hi PulseDev team, I am interested in the Growth Retainer for ongoing engineering support.\n\nMy current tech stack is [List your stack, e.g., React/Node/AWS], and our primary engineering bottleneck right now is [Describe your current challenge].\n\nPlease let me know how we can get started and integrate you into our workflow."
      }));
    } else if (service && serviceMessages[service]) {
      setForm((prev) => ({
        ...prev,
        service: service,
        message: serviceMessages[service]
      }));
    }
  }, [location.search]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setTimeout(() => {
        const formEl = document.getElementById("contact-form-wrap");
        if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">

        {/* LEFT — dark info panel */}
        <div className="contact__info">
          <div className="contact__info-eyebrow">Contact Us</div>
          <h2 className="contact__info-title">
            Ready for Better<br />Software?
          </h2>
          <p className="contact__info-desc">
            Whether you need a new web app, mobile product, cloud infrastructure,
            or ongoing engineering support — PulseDev can evaluate your project
            and recommend the right path forward.
          </p>

          <div className="contact__phone-box">
            <div className="contact__phone-icon">
              <TbPhone size={20} />
            </div>
            <div>
              <div className="contact__phone-label">Email PulseDev</div>
              <a href={`mailto:${CONTACT.email}`} className="contact__phone-num">
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="contact__mini-cards">
            {miniCards.map((c) => (
              <div key={c.title} className="contact__mini-card">
                <div className="contact__mini-title">{c.title}</div>
                <div className="contact__mini-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — light form */}
        <div className="contact__form-wrap" id="contact-form-wrap">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                className="contact__success"
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  height: "100%",
                  minHeight: 450,
                  textAlign: "center" 
                }}
              >
                <div className="contact__success-icon">
                  <TbCheck size={30} />
                </div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within one business day.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact__form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="contact__form-title">Get in Touch</h3>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label>Name <span>(Required)</span></label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handle} required placeholder="John Smith"
                    />
                  </div>
                  <div className="contact__field">
                    <label>Email <span>(Required)</span></label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handle} required placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label>Phone</label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handle} placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="contact__field">
                    <label>Company</label>
                    <input
                      type="text" name="company" value={form.company}
                      onChange={handle} placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="contact__field" style={{ position: "relative" }}>
                  <label>Service Needed</label>
                  
                  {/* Invisible overlay to catch outside clicks */}
                  {isDropdownOpen && (
                    <div 
                      style={{ position: "fixed", inset: 0, zIndex: 9 }} 
                      onClick={() => setIsDropdownOpen(false)} 
                    />
                  )}

                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      width: "100%", padding: "12px 14px", background: "var(--ice-white)",
                      border: isDropdownOpen ? "1px solid var(--blue-primary)" : "1px solid #cbd5e1",
                      borderRadius: "8px", fontFamily: "'Inter', sans-serif", fontSize: 14,
                      color: "var(--text-dark)", cursor: "pointer", position: "relative",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      boxShadow: isDropdownOpen ? "0 0 0 3px rgba(31, 88, 130, 0.15)" : "none",
                      transition: "all 0.2s", zIndex: 10
                    }}
                  >
                    {serviceOptions.find(o => o.value === form.service)?.label || "Select a service..."}
                    <TbChevronDown size={16} style={{ color: "#64748b", transform: isDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
                            background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 8,
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)", overflow: "hidden"
                          }}
                        >
                          {serviceOptions.map(opt => (
                            <div
                              key={opt.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsDropdownOpen(false);
                                
                                // Set the service, and also optionally pre-fill the message if they pick a valid service
                                if (opt.value && serviceMessages[opt.value]) {
                                  setForm(prev => ({ ...prev, service: opt.value, message: serviceMessages[opt.value] }));
                                } else {
                                  setForm(prev => ({ ...prev, service: opt.value }));
                                }
                              }}
                              style={{
                                padding: "12px 14px", cursor: "pointer", fontSize: 13.5,
                                color: form.service === opt.value ? "var(--blue-primary)" : "var(--text-dark)",
                                background: form.service === opt.value ? "rgba(31, 88, 130, 0.05)" : "transparent",
                                transition: "background 0.15s",
                                borderBottom: opt.value === "" ? "1px solid #e2e8f0" : "none"
                              }}
                              onMouseEnter={(e) => { if (form.service !== opt.value) e.currentTarget.style.background = "#f8fafc" }}
                              onMouseLeave={(e) => { if (form.service !== opt.value) e.currentTarget.style.background = "transparent" }}
                            >
                              {opt.label}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="contact__field">
                  <label>Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handle}
                    placeholder="Tell us about your project..."
                    style={{ minHeight: 110 }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#f87171", fontSize: 13 }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <p style={{ color: "var(--text-muted)", fontSize: 12, textAlign: "center", marginTop: 8 }}>
                  By submitting this form, you agree to our <Link to="/privacy-policy" style={{ color: "var(--blue-accent)", textDecoration: "none" }}>Privacy Policy</Link>.
                </p>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : <><TbSend size={15} /> SUBMIT</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
