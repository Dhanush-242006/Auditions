import * as React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Card } from "@/src/components/ui/Card";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { BackButton } from "@/src/components/ui/BackButton";
import { supabase } from "@/src/lib/supabase";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const destination = (location.state as { from?: string })?.from || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // 1) Dummy credentials login
    if (
      (email === "actor@example.com" && password === "password") ||
      (email === "director@example.com" && password === "password")
    ) {
      const role = email === "actor@example.com" ? "actor" : "casting_director";
      const name = role === "actor" ? "Actor" : "Casting Director";
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role,
          demo: true,
          name,
        })
      );
      navigate(role === "actor" ? "/dashboard" : "/director-dashboard");
      setIsLoading(false);
      return;
    }

    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, role: "admin", demo: true, name: "Admin" })
      );
      navigate("/admin");
      setIsLoading(false);
      return;
    }

    // 2) Supabase login (real users)
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError("Invalid email or password");
      return;
    }

    if (data?.user) {
      const u = data.user;
      const name =
        (u.user_metadata?.full_name as string)?.trim() ||
        (u.user_metadata?.name as string)?.trim() ||
        u.email?.split("@")[0] ||
        "User";
      const role = (u.user_metadata?.role as string) || "actor";
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: u.email ?? "",
          role,
          name,
          avatarUrl: u.user_metadata?.avatar_url ?? undefined,
        })
      );
      navigate(destination);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <BackButton />
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4"
            >
              <ShieldCheck className="h-8 w-8" />
            </motion.div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Welcome Back</h1>
            <p className="text-white/50 text-sm">Enter your credentials to access your dashboard</p>
          </div>

          <Card variant="glass" className="p-8 space-y-6 border-white/5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    type="email"
                    placeholder="actor@example.com"
                    className="pl-10 bg-white/5 border-white/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Password</label>
                  <button type="button" className="text-[10px] text-primary hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-white/5 border-white/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500 font-medium"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl shadow-lg shadow-primary/20"
                isLoading={isLoading}
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-neutral-900 px-2 text-white/30">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="rounded-xl h-10 text-xs">Google</Button>
              <Button variant="outline" className="rounded-xl h-10 text-xs">Apple</Button>
            </div>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-sm text-white/40">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up for free</Link>
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Dummy Credentials</p>
              <div className="grid grid-cols-2 gap-4 text-[10px]">
                <div className="text-left">
                  <p className="text-white/60 font-bold">Actor:</p>
                  <p className="text-white/40">actor@example.com</p>
                  <p className="text-white/40">password</p>
                </div>
                <div className="text-left">
                  <p className="text-white/60 font-bold">Director:</p>
                  <p className="text-white/40">director@example.com</p>
                  <p className="text-white/40">password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
