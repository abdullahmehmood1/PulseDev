import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CONTACT } from "../config/contactInfo";

export default function PrivacyPolicyPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>Privacy Policy | PulseDev</title>
        <meta name="description" content="How we collect, use, and protect your information. Last updated: July 2026." />
      </Helmet>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__eyebrow">Legal</div>
          <h1 className="page-hero__title">Privacy<br />Policy</h1>
          <p className="page-hero__desc">
            How we collect, use, and protect your information. Last updated: July 2026.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--navy-deep)", padding: "80px 0" }}>
        <div className="page-content__inner" style={{ maxWidth: 860, margin: "0 auto" }}>
          
          <div style={{ background: "var(--navy-card)", border: "1px solid var(--steel-border)", borderRadius: "var(--radius-md)", padding: "40px", color: "var(--text-body)" }}>
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, color: "var(--white)", textTransform: "uppercase", marginBottom: 16 }}>
              What Data We Collect
            </h2>
            <p style={{ marginBottom: 32 }}>
              When you use our contact or booking forms, we collect the information you voluntarily provide: your name, email address, phone number, company name, and details about your project requirements.
            </p>

            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, color: "var(--white)", textTransform: "uppercase", marginBottom: 16 }}>
              Why We Collect It
            </h2>
            <p style={{ marginBottom: 32 }}>
              We are a small, two-person engineering team. We use this information solely to respond to your inquiries, understand your project goals, and accurately scope potential work. We do not use your information for automated marketing or newsletters without your explicit consent.
            </p>

            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, color: "var(--white)", textTransform: "uppercase", marginBottom: 16 }}>
              How It's Stored
            </h2>
            <p style={{ marginBottom: 32 }}>
              Your form submissions are securely transmitted to our backend and stored in our MongoDB database. 
              {/* TODO: Update this section if/when we migrate the database to Supabase */}
            </p>

            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, color: "var(--white)", textTransform: "uppercase", marginBottom: 16 }}>
              Data Sharing
            </h2>
            <p style={{ marginBottom: 32 }}>
              We respect your privacy. We do not sell, rent, or share your personal data with third parties. Your information is kept strictly confidential within our team and is only used to deliver our engineering services to you.
            </p>

            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: 24, color: "var(--white)", textTransform: "uppercase", marginBottom: 16 }}>
              Your Rights
            </h2>
            <p>
              If you would like to request a copy of your information or ask us to delete it from our database, simply email us at <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--blue-accent)", textDecoration: "none" }}>{CONTACT.email}</a> and we will process your request promptly.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
