import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Services from "../components/Services";
import About from "../components/About";
import Work from "../components/Work";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 1. Hero — full-screen video background */}
      <Hero />

      {/* 2. Partners strip — white bar (BP Marine style) */}
      <Partners />

      {/* 3. Services — 3-col selector */}
      <Services />

      {/* 4. About — split layout */}
      <About />

      {/* 5. Work / Gallery */}
      <Work limit={6} />

      {/* 6. Process */}
      <Process />

      {/* 7. Pricing */}
      <Pricing />

      {/* 8. Contact */}
      <Contact />
    </motion.div>
  );
}
