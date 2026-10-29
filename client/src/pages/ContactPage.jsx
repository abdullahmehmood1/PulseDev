import { Helmet } from "react-helmet-async";
import Contact from "../components/Contact";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <Helmet>
        <title>Contact | PulseDev</title>
        <meta name="description" content="Get in touch with PulseDev. Start a conversation about your web, mobile, or cloud project today." />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__eyebrow">Get In Touch</div>
          <h1 className="page-hero__title">Contact &<br />Inquiries</h1>
          <p className="page-hero__desc">
            Whether you need a new web app, mobile product, cloud infrastructure,
            or ongoing engineering support — start a conversation today.
          </p>
        </div>
      </div>

      <Contact />
    </motion.div>
  );
}

