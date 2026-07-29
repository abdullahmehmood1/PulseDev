import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactMessage } from "../api/api";
import { TbSend, TbCheck, TbPhone } from "react-icons/tb";

const miniCards = [
  { title: "Web & Mobile", sub: "Full-stack product teams" },
  { title: "Service Area", sub: "Global, remote-first" },
  { title: "Since 2020", sub: "5+ years of engineering" },
  { title: "Response Time", sub: "Within 24 business hours" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("success");
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
              <div className="contact__phone-label">Call PulseDev</div>
              <a href="mailto:hello@pulsedev.io" className="contact__phone-num">
                hello@pulsedev.io
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
        <div className="contact__form-wrap">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                className="contact__success"
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
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

                <div className="contact__field">
                  <label>Service Needed</label>
                  <select name="service" value={form.service} onChange={handle}>
                    <option value="">Select a service...</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="backend">Backend & APIs</option>
                    <option value="cloud">Cloud & DevOps</option>
                    <option value="security">Security Audit</option>
                    <option value="retainer">Ongoing Retainer</option>
                    <option value="other">Other</option>
                  </select>
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

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={status === "sending"}>
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
