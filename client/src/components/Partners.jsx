import { motion } from "framer-motion";

// Tech stack / technology partners — like BP Marine's partner logos
const partners = [
  {
    name: "AWS",
    logo: (
      <svg viewBox="0 0 60 36" width="60" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontFamily="Oswald, sans-serif" fontSize="22" fontWeight="700" fill="#FF9900" letterSpacing="0">AWS</text>
      </svg>
    ),
    dark: false,
  },
  {
    name: "Google Cloud",
    logo: (
      <svg viewBox="0 0 110 36" width="110" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#4285F4">Google </text>
        <text x="62" y="26" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#34A853">Cloud</text>
      </svg>
    ),
    dark: false,
  },
  {
    name: "MongoDB",
    logo: (
      <svg viewBox="0 0 100 36" width="100" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#00ED64">MongoDB</text>
      </svg>
    ),
    dark: true,
  },
  {
    name: "Stripe",
    logo: (
      <svg viewBox="0 0 60 36" width="60" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700" fill="#635BFF">Stripe</text>
      </svg>
    ),
    dark: false,
  },
  {
    name: "GitHub",
    logo: (
      <svg viewBox="0 0 70 36" width="70" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#24292F">GitHub</text>
      </svg>
    ),
    dark: true,
  },
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 70 36" width="70" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="26" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#000000">Vercel</text>
      </svg>
    ),
    dark: true,
  },
];

export default function Partners() {
  return (
    <section style={{
      background: "#ffffff",
      padding: "40px 0",
      borderBottom: "1px solid #e8eef4",
    }}>
      <div className="page-content__inner">
        {/* Title — exactly like BP Marine */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 18,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#0d1526",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          PulseDev Proudly Works With
        </motion.h2>

        {/* Logo pills row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 28px",
                background: p.dark ? "#0d1526" : "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                minWidth: 140,
                height: 68,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.2s",
                cursor: "default",
              }}
              whileHover={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
            >
              {/* Text-based logo — clean, readable */}
              <span style={{
                fontFamily: p.name === "AWS" ? "Oswald, sans-serif" : "Inter, sans-serif",
                fontSize: p.name === "AWS" ? 24 : 17,
                fontWeight: 800,
                letterSpacing: p.name === "AWS" ? "0.02em" : "0.01em",
                color: p.name === "AWS"
                  ? "#FF9900"
                  : p.name === "Google Cloud"
                  ? "#4285F4"
                  : p.name === "MongoDB"
                  ? "#00ED64"
                  : p.name === "Stripe"
                  ? "#635BFF"
                  : p.dark
                  ? "#f0f4f8"
                  : "#0d1526",
                lineHeight: 1,
              }}>
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
