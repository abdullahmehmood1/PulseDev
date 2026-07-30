import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowLeft, TbLock } from "react-icons/tb";
import { supabase } from "../lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div style={{ minHeight: "85vh", background: "var(--navy-deep)", paddingBottom: 80, display: "flex", flexDirection: "column" }}>
      <Helmet>
        <title>Admin Login | PulseDev</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="page-hero">
        <div className="page-hero__inner">
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "var(--text-body)", fontSize: 13, fontFamily: "Oswald, sans-serif",
              fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", marginBottom: 20
            }}
          >
            <TbArrowLeft size={15} /> Back to Site
          </Link>
          <div className="page-hero__eyebrow">Restricted Area</div>
          <h1 className="page-hero__title">Admin Login</h1>
        </div>
      </div>

      <div className="page-content__inner" style={{ flex: 1, display: "flex", justifyContent: "center", marginTop: 40 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "var(--navy-card)", border: "1px solid var(--steel-border)",
            borderRadius: "var(--radius-md)", padding: "40px 32px", width: "100%", maxWidth: 420,
            height: "fit-content"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(31,88,130,0.2)", border: "1px solid var(--blue-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TbLock size={24} style={{ color: "var(--blue-accent)" }} />
            </div>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", color: "var(--white)", fontSize: 13, fontWeight: 600, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: "var(--steel)", border: "1px solid var(--steel-border)",
                  color: "var(--white)", borderRadius: "var(--radius-sm)", padding: "12px 14px",
                  fontFamily: "Inter, sans-serif", fontSize: 14, width: "100%", outline: "none",
                }}
              />
            </div>
            
            <div>
              <label style={{ display: "block", color: "var(--white)", fontSize: 13, fontWeight: 600, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  background: "var(--steel)", border: "1px solid var(--steel-border)",
                  color: "var(--white)", borderRadius: "var(--radius-sm)", padding: "12px 14px",
                  fontFamily: "Inter, sans-serif", fontSize: 14, width: "100%", outline: "none",
                }}
              />
            </div>
            
            {errorMsg && (
              <div style={{ color: "#f87171", fontSize: 13, marginTop: 4, textAlign: "center" }}>
                {errorMsg}
              </div>
            )}
            
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
            >
              {loading ? "Authenticating..." : "SIGN IN"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
