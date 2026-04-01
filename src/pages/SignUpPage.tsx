import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, UserPlus, User, Video } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Card } from "@/src/components/ui/Card";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { BackButton } from "@/src/components/ui/BackButton";
import { useAuth } from "@/src/hooks/useAuth";
import { cn } from "@/src/lib/utils";

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<"ACTOR" | "CASTING_DIRECTOR">("ACTOR");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const { data, error: signUpError } = await signUp(email.trim(), password, {
      name: name.trim() || undefined,
      role,
    });

    setIsLoading(false);

    if (signUpError) {
      const msg = signUpError.message || "Sign up failed. Try again.";
      setError(msg);
      return;
    }

    if (data?.user) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-950 pt-24 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-6 py-12">
          <Card variant="glass" className="p-8 max-w-md text-center space-y-4 border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto">
              <UserPlus className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold">Account created</h2>
            <p className="text-sm text-white/60">
              Check your email to confirm your account. Redirecting to sign in…
            </p>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

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
              <UserPlus className="h-8 w-8" />
            </motion.div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Create Account</h1>
            <p className="text-white/50 text-sm">Sign up to access auditions and manage your profile</p>
          </div>

          <Card variant="glass" className="p-8 space-y-6 border-white/5">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    type="text"
                    placeholder="Your name"
                    className="pl-10 bg-white/5 border-white/10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-white/5 border-white/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    type="password"
                    placeholder="At least 6 characters"
                    className="pl-10 bg-white/5 border-white/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("ACTOR")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all",
                      role === "ACTOR"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                    )}
                  >
                    <User className="h-4 w-4" />
                    Actor
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("CASTING_DIRECTOR")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all",
                      role === "CASTING_DIRECTOR"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                    )}
                  >
                    <Video className="h-4 w-4" />
                    Casting Director
                  </button>
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
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          <div className="text-center">
            <p className="text-sm text-white/40">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
