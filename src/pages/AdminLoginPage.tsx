import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ShieldCheck, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

const ADMIN_EMAIL = "admin@auditionsadda.com";
const ADMIN_PASSWORD = "Admin@123";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /* Redirect if already logged in */
  React.useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin", { replace: true });
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/[0.05] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 shadow-2xl backdrop-blur-sm">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mb-4">
              <ShieldCheck className="h-7 w-7 text-teal-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-white/40 text-sm mt-1">Auditions Adda — Restricted Access</p>
          </div>

          {/* Hint box */}
          <div className="mb-6 p-3 rounded-xl bg-teal-500/[0.07] border border-teal-500/20 text-xs text-teal-300/80 space-y-0.5">
            <p><span className="opacity-60">Email:</span> {ADMIN_EMAIL}</p>
            <p><span className="opacity-60">Password:</span> Admin@123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="admin@auditionsadda.com"
                  required
                  className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-2.5 text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {loading ? "Authenticating…" : "Sign In to Admin Portal"}
            </button>
          </form>

          <p className="text-center text-white/20 text-xs mt-6">
            Unauthorised access is strictly prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
