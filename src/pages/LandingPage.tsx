import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "motion/react";
import {
  Play,
  Search,
  Shield,
  Zap,
  Bell,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Film,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Link } from "react-router-dom";

/* ─── 3-D mouse-tilt card ───────────────────────────────────────── */
function TiltCard({
  children,
  className,
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 200,
    damping: 25,
  });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated count-up ─────────────────────────────────────────── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Floating 3-D orb ──────────────────────────────────────────── */
function Orb({
  size,
  color,
  style,
  delay = 0,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -24, 0], scale: [1, 1.06, 1], opacity: [0.18, 0.28, 0.18] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${size * 0.4}px)`,
        position: "absolute",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ─── Spinning film-reel ring decoration ────────────────────────── */
function FilmReel({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="w-full h-full rounded-full border-2 border-dashed border-primary/20 relative">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-3 h-3 rounded-full bg-primary/30"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateX(calc(50% + 4px)) translate(-50%, -50%)`,
            }}
          />
        ))}
        <div className="absolute inset-[30%] rounded-full bg-primary/5 border border-primary/20" />
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export function LandingPage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "AI Smart Matching",
      description:
        "Our proprietary AI analyzes your profile and matches you with auditions that fit your skills perfectly.",
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      title: "Verified Listings",
      description:
        "Every casting call is manually verified by our team to ensure safety and authenticity for all actors.",
    },
    {
      icon: <Film className="h-6 w-6 text-accent" />,
      title: "Virtual Auditions",
      description:
        "Record and submit your auditions directly through our platform with professional-grade tools.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-400" />,
      title: "Blurred Identity",
      description:
        "Protect your privacy with our unique blurred identity mode until you're ready to reveal yourself.",
    },
    {
      icon: <Bell className="h-6 w-6 text-amber-400" />,
      title: "Saved Alerts",
      description:
        "Never miss an opportunity. Get instant notifications for auditions that match your exact criteria.",
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Premium Portfolio",
      description:
        "Showcase your talent with a cinematic digital portfolio that stands out to every casting director.",
    },
  ];

  const stats = [
    { label: "Active Actors",      value: 50000, suffix: "+" },
    { label: "Casting Directors",  value: 2000,  suffix: "+" },
    { label: "Auditions Posted",   value: 10000, suffix: "+" },
    { label: "Success Stories",    value: 5000,  suffix: "+" },
  ];

  return (
    <div className="min-h-screen bg-[#080810] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-28 px-6 overflow-hidden">
        {/* Deep 3-D perspective scrolling grid */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] perspective-grid opacity-80 pointer-events-none" />

        {/* Ambient orbs */}
        <Orb size={520} color="radial-gradient(circle,#E11D48,transparent 70%)"
          style={{ top: "-8%", left: "-6%" }} delay={0} />
        <Orb size={420} color="radial-gradient(circle,#8B5CF6,transparent 70%)"
          style={{ top: "10%", right: "-8%" }} delay={2} />
        <Orb size={300} color="radial-gradient(circle,#E11D48,transparent 70%)"
          style={{ bottom: "5%", right: "20%" }} delay={1} />

        {/* Film reel accents */}
        <FilmReel className="absolute w-48 h-48 top-16 right-[5%] opacity-40 hidden lg:block" />
        <FilmReel className="absolute w-28 h-28 bottom-20 left-[3%] opacity-20 hidden md:block" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="glass" className="px-4 py-1.5 text-sm border-primary/30 bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                India's #1 Casting Platform
              </Badge>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold font-display leading-[1.08] tracking-tight">
              India's Smart <br />
              <span className="gold-shimmer">Casting Marketplace</span>
            </h1>

            <p className="text-xl text-white/55 max-w-lg leading-relaxed">
              Connect with top casting directors, discover verified opportunities,
              and launch your career with AI-powered talent matching.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/login" state={{ from: "/auditions" }}>
                <Button size="lg" className="rounded-full w-full sm:w-auto shadow-xl shadow-primary/25">
                  Find Auditions
                  <Search className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login" state={{ from: "/director-dashboard" }}>
                <Button variant="outline" size="lg"
                  className="rounded-full w-full sm:w-auto border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                  Casting Agent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center space-x-5 pt-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#080810] overflow-hidden ring-1 ring-primary/20">
                    <img src={`https://picsum.photos/seed/actor${i}/100/100`}
                      alt="Actor" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40">
                Joined by <span className="text-primary font-bold">2,000+</span> new actors this week
              </p>
            </div>
          </motion.div>

          {/* Right — 3-D tilt hero card */}
          <TiltCard intensity={10} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(225,29,72,0.18)] border border-primary/20"
            >
              <img
                src="https://picsum.photos/seed/cinema/1200/800"
                alt="Cinematic Background"
                className="w-full h-full object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              {/* Gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

              {/* Floating UI chip – top left */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 -left-8 glass p-4 rounded-2xl shadow-2xl max-w-[200px]
                           border border-primary/20 bg-black/60 backdrop-blur-xl"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold text-white">Profile Verified</span>
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed">
                  Visible to top casting directors.
                </p>
              </motion.div>

              {/* Floating UI chip – bottom right */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 -right-8 glass p-4 rounded-2xl shadow-2xl max-w-[220px]
                           border border-primary/20 bg-black/60 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white">AI Match Score</span>
                  <Badge variant="default" className="text-[10px] bg-primary/20 text-primary border-primary/30">98%</Badge>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                  />
                </div>
                <p className="text-[10px] text-white/50 mt-2">
                  Perfect match — Lead Actor, Netflix Original
                </p>
              </motion.div>

              {/* Corner badge */}
              <div className="absolute top-5 right-5">
                <Badge variant="glass" className="border-primary/30 bg-primary/15 text-primary text-[10px]">
                  <Star className="h-3 w-3 mr-1 fill-primary" /> Premium
                </Badge>
              </div>
            </motion.div>

            {/* Glow under the card */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20
                            bg-primary/25 blur-3xl rounded-full pointer-events-none" />
          </TiltCard>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Gold divider lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="text-center space-y-2"
            >
              <h3 className="text-4xl md:text-5xl font-bold font-display text-primary">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section className="py-32 px-6 relative">
        {/* Subtle radial bg */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-20"
          >
            <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              Everything you need to{" "}
              <span className="text-gradient">succeed</span>
            </h2>
            <p className="text-white/45 max-w-2xl mx-auto leading-relaxed">
              Built with the latest technology to help you navigate the complex world of
              casting with ease, confidence, and class.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard intensity={8}>
                  <Card
                    variant="glass"
                    className="group h-full cursor-default
                               border border-white/8 hover:border-primary/30
                               bg-white/[0.03] hover:bg-primary/5
                               transition-all duration-300
                               shadow-[0_4px_24px_rgba(0,0,0,0.4)]
                               hover:shadow-[0_8px_40px_rgba(225,29,72,0.14)]"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6
                                    group-hover:bg-primary/10 transition-colors
                                    shadow-inner border border-white/5 group-hover:border-primary/20">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">{feature.description}</p>

                    <div className="mt-6 flex items-center text-primary/0 group-hover:text-primary/70
                                    text-xs font-bold transition-all duration-300 gap-1">
                      <span>Learn more</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CASTING CALLS ─────────────────────────────────── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b18] to-[#080810] pointer-events-none" />
        <Orb size={400} color="radial-gradient(circle,#8B5CF6,transparent 70%)"
          style={{ top: "20%", left: "-10%" }} delay={3} />
        <Orb size={350} color="radial-gradient(circle,#E11D48,transparent 70%)"
          style={{ bottom: "10%", right: "-8%" }} delay={1} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary">
                Opportunities
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-display">
                Featured Casting Calls
              </h2>
            </div>
            <Link to="/login" state={{ from: "/auditions" }}>
              <Button variant="outline"
                className="border-primary/30 hover:border-primary text-primary rounded-full">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { seed: "casting1", type: "Feature Film",  title: "Lead Actor — Period Drama",     loc: "Mumbai" },
              { seed: "casting2", type: "Web Series",    title: "Supporting Role — Thriller",    loc: "Hyderabad" },
              { seed: "casting3", type: "Music Video",   title: "Lead Performer — Item Number",  loc: "Chennai" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <TiltCard intensity={6}>
                  <Card
                    variant="outline"
                    className="p-0 overflow-hidden group cursor-pointer
                               border border-white/8 hover:border-primary/30
                               transition-all duration-400
                               hover:shadow-[0_20px_60px_rgba(225,29,72,0.18)]"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={`https://picsum.photos/seed/${item.seed}/600/400`}
                        alt="Casting"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 group-hover:from-primary/10
                                      to-transparent transition-all duration-500" />

                      <div className="absolute top-4 right-4">
                        <Badge variant="glass" className="border-primary/30 bg-black/50 text-primary text-[10px]">
                          Verified
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-primary text-black border-none text-[10px] font-bold">
                          95% Match
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-3 bg-white/[0.02]">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-[0.18em]">
                        {item.type}
                      </span>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                        Looking for a versatile performer for a key role in an upcoming production
                        for a major Indian streaming platform.
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5 text-xs text-white/35">
                          <MapPin className="h-3.5 w-3.5" />
                          {item.loc}, India
                        </div>
                        <div className="flex items-center gap-1 text-primary/70 group-hover:text-primary
                                        text-xs font-bold transition-colors">
                          Apply <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-20"
          >
            <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary">
              Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              Three steps to your{" "}
              <span className="text-gradient">breakthrough</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px
                            bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40" />

            {[
              { num: "01", icon: <Users className="h-7 w-7 text-primary" />, title: "Create Profile",
                desc: "Build your verified talent profile with your reel, skills, and experience." },
              { num: "02", icon: <Search className="h-7 w-7 text-accent" />, title: "Discover & Apply",
                desc: "AI matches you with the best-fit roles. Apply in one tap." },
              { num: "03", icon: <Award className="h-7 w-7 text-primary" />, title: "Get Discovered",
                desc: "Casting directors shortlist you. Your career begins here." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 }}
                className="text-center space-y-5 relative z-10"
              >
                <TiltCard intensity={10}>
                  <div className="w-24 h-24 rounded-3xl mx-auto
                                  bg-gradient-to-br from-primary/15 via-primary/8 to-transparent
                                  border border-primary/20
                                  flex items-center justify-center
                                  shadow-[0_0_40px_rgba(225,29,72,0.10)]">
                    {step.icon}
                  </div>
                </TiltCard>
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-primary/50 tracking-[0.25em]">{step.num}</p>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Layered 3-D depth background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[#080810] to-accent/10" />
          <Orb size={600} color="radial-gradient(circle,#E11D48,transparent 65%)"
            style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} delay={0} />
          {/* Revolving ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]
                       rounded-full border border-dashed border-primary/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
                       rounded-full border border-dashed border-accent/10"
          />
        </div>

        {/* Gold top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge variant="glass" className="border-primary/30 bg-primary/10 text-primary px-5 py-2">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Start your journey today
            </Badge>

            <h2 className="text-5xl md:text-6xl font-bold font-display leading-[1.1]">
              Ready to claim your{" "}
              <br />
              <span className="gold-shimmer">spotlight?</span>
            </h2>

            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Join thousands of actors and casting directors already building
              the future of Indian cinema on Auditions Adda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-10 shadow-2xl shadow-primary/40
                                           bg-primary hover:bg-primary-dark text-white font-bold">
                Create Actor Profile
                <Play className="ml-2 h-5 w-5 fill-white" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg"
                className="rounded-full px-10 border-white/20 hover:border-primary/40 hover:bg-primary/5">
                I'm a Casting Director
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-6 pt-4 flex-wrap"
          >
            {["No credit card required", "Free to join", "Verified listings only"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-xs text-white/35">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary/60" />
                {t}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
