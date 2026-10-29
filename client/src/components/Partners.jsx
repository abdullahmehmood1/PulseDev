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
    <section className="partners-section">
      <div className="page-content__inner">
        {/* Title */}
        <motion.h2
          className="partners-title"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
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
              className="partners-pill"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              {/* Text-based logo — clean, readable */}
              <span className={`partner-brand partner-brand--${p.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
