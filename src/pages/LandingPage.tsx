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
  Search, Shield, Zap, Bell, Users, Star,
  ArrowRight, CheckCircle2, MapPin, Film,
  Award, Camera, Mic, Clapperboard,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Link } from "react-router-dom";
import { useLang } from "@/src/lib/i18n";

/* ══════════════════════════════════════════════════
   SVG SILHOUETTE CHARACTERS
══════════════════════════════════════════════════ */
function SilhouetteActor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 160" className={className} fill="currentColor">
      <ellipse cx="35" cy="17" rx="13" ry="15" />
      <path d="M22 32 C18 36 16 50 15 68 C14 78 16 94 15 108 L55 108 C54 94 56 78 55 68 C54 50 52 36 48 32 Z" />
      <path d="M22 36 C14 44 6 58 2 76 C6 79 12 78 14 76 C18 61 22 50 26 44 Z" />
      <path d="M48 36 C56 44 64 58 68 76 C64 79 58 78 56 76 C52 61 48 50 44 44 Z" />
      <path d="M15 108 L9 155 L26 155 L32 118 Z" />
      <path d="M55 108 L61 155 L44 155 L38 118 Z" />
    </svg>
  );
}

function SilhouetteRaisedArm({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 160" className={className} fill="currentColor">
      <ellipse cx="35" cy="17" rx="13" ry="15" />
      <path d="M22 32 C18 36 16 50 15 68 C14 78 16 94 15 108 L55 108 C54 94 56 78 55 68 C54 50 52 36 48 32 Z" />
      {/* left arm raised triumphantly */}
      <path d="M22 36 C16 24 8 10 2 2 C6 -1 12 0 14 3 C20 11 24 25 28 38 Z" />
      {/* right arm at side */}
      <path d="M48 36 C56 44 64 58 68 76 C64 79 58 78 56 76 C52 61 48 50 44 44 Z" />
      <path d="M15 108 L9 155 L26 155 L32 118 Z" />
      <path d="M55 108 L61 155 L44 155 L38 118 Z" />
    </svg>
  );
}

function SilhouetteDirector({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 160" className={className} fill="currentColor">
      <ellipse cx="45" cy="17" rx="13" ry="15" />
      <path d="M32 32 C28 36 26 50 25 68 C24 78 26 94 25 108 L65 108 C64 94 66 78 65 68 C64 50 62 36 58 32 Z" />
      {/* both arms forward - director pose */}
      <path d="M32 36 C22 40 10 44 2 48 C1 53 6 56 9 54 C18 50 28 46 34 42 Z" />
      <path d="M58 36 C68 40 78 44 86 50 C87 55 82 57 79 55 C70 50 60 46 56 42 Z" />
      {/* megaphone */}
      <path d="M79 44 L90 38 L90 62 L79 56 Z" opacity="0.8" />
      <path d="M15 108 L9 155 L26 155 L32 118 Z" />
      <path d="M65 108 L71 155 L54 155 L48 118 Z" />
    </svg>
  );
}

function SilhouetteCameraman({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 160" className={className} fill="currentColor">
      <ellipse cx="42" cy="17" rx="13" ry="15" />
      <path d="M29 32 C25 36 23 50 22 68 C21 78 23 94 22 108 L62 108 C61 94 63 78 62 68 C61 50 59 36 55 32 Z" />
      {/* arms holding camera */}
      <path d="M29 38 C20 42 12 48 6 55 L6 70 L22 70 Z" />
      <path d="M55 38 C64 42 72 48 78 55 L78 70 L62 70 Z" />
      {/* camera body */}
      <rect x="4" y="52" width="36" height="21" rx="4" />
      <circle cx="22" cy="62" r="8" />
      <circle cx="22" cy="62" r="4" opacity="0.4" />
      <rect x="35" y="55" width="10" height="8" rx="2" />
      <path d="M22 108 L16 155 L32 155 L36 118 Z" />
      <path d="M62 108 L68 155 L52 155 L48 118 Z" />
    </svg>
  );
}

function SilhouetteDancer({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 160" className={className} fill="currentColor">
      <ellipse cx="38" cy="17" rx="13" ry="15" />
      <path d="M25 32 C21 36 19 50 18 68 C17 78 19 94 18 108 L58 108 C57 94 59 78 58 68 C57 50 55 36 51 32 Z" />
      {/* both arms raised out - dancer */}
      <path d="M25 36 C14 28 4 18 -2 8 C2 4 8 5 10 8 C17 18 22 28 28 38 Z" />
      <path d="M51 36 C62 28 72 18 78 8 C74 4 68 5 66 8 C59 18 54 28 48 38 Z" />
      {/* dynamic legs - mid step */}
      <path d="M18 108 L10 155 L26 155 L30 118 Z" />
      <path d="M58 108 L70 148 L55 153 L50 118 Z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   FILM STRIP COMPONENT
══════════════════════════════════════════════════ */
const FILM_SEEDS = ["film1","film2","film3","film4","film5","film6","film7","film8","film9","film10"];

function FilmStrip({ reverse = false }: { reverse?: boolean }) {
  const items = [...FILM_SEEDS, ...FILM_SEEDS]; // doubled for seamless loop
  return (
    <div className="overflow-hidden w-full py-2 relative">
      <motion.div
        className="flex gap-0 w-max"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {items.map((seed, i) => (
          <div key={i} className="relative flex-shrink-0 w-28 h-20 mx-0.5">
            {/* Perforations top */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-neutral-900 flex items-center justify-around px-1">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="w-2 h-1.5 rounded-sm bg-neutral-700" />
              ))}
            </div>
            {/* Perforations bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-neutral-900 flex items-center justify-around px-1">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="w-2 h-1.5 rounded-sm bg-neutral-700" />
              ))}
            </div>
            {/* Frame image */}
            <img
              src={`https://picsum.photos/seed/${seed}/240/160`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
              style={{ paddingTop: 12, paddingBottom: 12 }}
            />
            {/* Frame number */}
            <span className="absolute bottom-3.5 right-1 text-[8px] font-mono text-white/30">
              {(i % 10 + 1).toString().padStart(2,"0")}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SPOTLIGHT BEAM
══════════════════════════════════════════════════ */
function SpotlightBeam({ x, delay = 0, color = "rgba(255,255,255,0.06)" }: {
  x: string; delay?: number; color?: string;
}) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left: x, width: 280, height: "130%", transformOrigin: "top center" }}
      animate={{ rotateZ: [-8, 8, -8] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `conic-gradient(from -8deg at 50% 0%, transparent 0%, ${color} 8%, transparent 16%)`,
          filter: "blur(6px)",
        }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   3D TILT CARD
══════════════════════════════════════════════════ */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════ */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ══════════════════════════════════════════════════
   FILM GRAIN OVERLAY
══════════════════════════════════════════════════ */
function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* ══════════════════════════════════════════════════
   CINEMATIC OPENING BARS
══════════════════════════════════════════════════ */
function CinematicOpening() {
  const [done, setDone] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setDone(true), 1800); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!done && (
        <>
          <motion.div
            key="top"
            className="fixed top-0 left-0 right-0 z-[1000] bg-black"
            initial={{ height: "15vh" }} animate={{ height: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          />
          <motion.div
            key="bot"
            className="fixed bottom-0 left-0 right-0 z-[1000] bg-black"
            initial={{ height: "15vh" }} animate={{ height: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export function LandingPage() {
  const { t } = useLang();

  const features = [
    { icon: <Zap className="h-6 w-6" />,     title: t("lp_feat1_title"), description: t("lp_feat1_desc"), color: "#0D9488" },
    { icon: <Shield className="h-6 w-6" />,  title: t("lp_feat2_title"), description: t("lp_feat2_desc"), color: "#10b981" },
    { icon: <Camera className="h-6 w-6" />,  title: t("lp_feat3_title"), description: t("lp_feat3_desc"), color: "#8b5cf6" },
    { icon: <Users className="h-6 w-6" />,   title: t("lp_feat4_title"), description: t("lp_feat4_desc"), color: "#3b82f6" },
    { icon: <Bell className="h-6 w-6" />,    title: t("lp_feat5_title"), description: t("lp_feat5_desc"), color: "#f59e0b" },
    { icon: <Award className="h-6 w-6" />,   title: t("lp_feat6_title"), description: t("lp_feat6_desc"), color: "#e11d48" },
  ];

  const stats = [
    { label: t("lp_stat_actors"),    value: 50000,  suffix: "+" },
    { label: t("lp_stat_directors"), value: 2000,   suffix: "+" },
    { label: t("lp_stat_auditions"), value: 10000,  suffix: "+" },
    { label: t("lp_stat_stories"),   value: 5000,   suffix: "+" },
  ];

  const stepsRef = React.useRef(null);
  const statsRef = React.useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const heroRotX = useSpring(useTransform(heroMouseY, [-0.5, 0.5], [4, -4]), { stiffness: 100, damping: 30 });
  const heroRotY = useSpring(useTransform(heroMouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 100, damping: 30 });

  const handleHeroMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    heroMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    heroMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const ACTORS = [
    { Comp: SilhouetteRaisedArm, x: "12%",  delay: 0,   h: 200, glow: "#0D9488" },
    { Comp: SilhouetteActor,     x: "30%",  delay: 0.15, h: 240, glow: "#8b5cf6" },
    { Comp: SilhouetteDancer,    x: "50%",  delay: 0.3,  h: 260, glow: "#0D9488" },
    { Comp: SilhouetteDirector,  x: "68%",  delay: 0.45, h: 220, glow: "#f59e0b" },
    { Comp: SilhouetteCameraman, x: "84%",  delay: 0.6,  h: 210, glow: "#3b82f6" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 overflow-x-hidden">
      <FilmGrain />
      <CinematicOpening />
      <Navbar />

      {/* ════════════════════════════════════════
          HERO — THE STAGE
      ════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        onMouseMove={handleHeroMouse}
      >
        {/* Deep background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-black" />

        {/* Spotlight beams */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <SpotlightBeam x="10%"  delay={0}   color="rgba(13,148,136,0.12)" />
          <SpotlightBeam x="32%"  delay={2}   color="rgba(255,255,255,0.07)" />
          <SpotlightBeam x="55%"  delay={0.8} color="rgba(139,92,246,0.10)" />
          <SpotlightBeam x="75%"  delay={3}   color="rgba(255,255,255,0.07)" />
          <SpotlightBeam x="90%"  delay={1.5} color="rgba(13,148,136,0.10)" />
        </div>

        {/* Star particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
            />
          ))}
        </div>

        {/* Film strip top */}
        <div className="relative z-10 mt-20 border-y border-white/5">
          <FilmStrip />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto w-full px-6 py-12 gap-12">

          {/* ── Left: Title */}
          <motion.div
            className="flex-1 space-y-8 lg:pr-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Badge variant="glass" className="px-4 py-1.5 text-sm gap-2">
                <Film className="h-3.5 w-3.5" />
                ✨ {t("lp_hero_badge")}
              </Badge>
            </motion.div>

            <div className="space-y-2">
              {[t("lp_hero_title1"), t("lp_hero_title2")].map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className={`text-5xl md:text-7xl font-bold font-display leading-[1.05] tracking-tight ${i === 1 ? "text-gradient" : ""}`}>
                    {word}
                  </h1>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-lg text-white/55 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {t("lp_hero_desc")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35 }}
            >
              <Link to="/login" state={{ from: "/auditions" }}>
                <Button size="lg" className="rounded-full gap-2 px-8 shadow-lg shadow-primary/30">
                  {t("lp_hero_btn_find")} <Search className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login" state={{ from: "/director-dashboard" }}>
                <Button variant="outline" size="lg" className="rounded-full gap-2 px-8">
                  {t("lp_hero_btn_cast")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 pt-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-neutral-950 overflow-hidden ring-1 ring-primary/30">
                    <img src={`https://picsum.photos/seed/act${i}/80/80`} alt="" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40">
                {t("lp_hero_joined")} <span className="text-white font-bold">2,000+</span> {t("lp_hero_social")}
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: 3D Stage Scene */}
          <motion.div
            className="flex-1 relative"
            style={{ rotateX: heroRotX, rotateY: heroRotY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
          >
            {/* Stage container */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)" }}>

              {/* Stage backdrop */}
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black" />

              {/* Stage curtain sides */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-red-950/60 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-red-950/60 to-transparent" />

              {/* Red carpet / stage floor (3D perspective) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(80,0,0,0.4), rgba(40,0,0,0.8))",
                  transform: "perspective(400px) rotateX(25deg)",
                  transformOrigin: "bottom center",
                }}
              >
                {/* Floor lines for depth */}
                {[20, 40, 60, 80].map(p => (
                  <div key={p} className="absolute left-0 right-0 border-t border-white/5" style={{ top: `${p}%` }} />
                ))}
              </div>

              {/* Per-actor spotlights + silhouettes */}
              {ACTORS.map(({ Comp, x, delay, h, glow }, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 flex flex-col items-center"
                  style={{ left: x, transform: "translateX(-50%)" }}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.0 + delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Spotlight on floor */}
                  <div
                    className="absolute bottom-0 rounded-full"
                    style={{
                      width: h * 0.7,
                      height: 24,
                      background: `radial-gradient(ellipse, ${glow}55 0%, transparent 70%)`,
                      transform: "translateX(-50%)",
                      left: "50%",
                    }}
                  />
                  {/* Spotlight cone from top */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: -120,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 80,
                      height: h + 140,
                      background: `linear-gradient(to bottom, ${glow}30, ${glow}08, transparent)`,
                      clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
                    }}
                  />
                  {/* Silhouette */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    style={{ height: h, color: glow + "cc" }}
                    className="relative z-10 drop-shadow-2xl"
                  >
                    <Comp className="h-full w-auto" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Stage arch top */}
              <div
                className="absolute top-0 left-0 right-0 h-16"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)" }}
              />

              {/* Clapperboard badge */}
              <motion.div
                className="absolute top-4 left-4 glass px-3 py-1.5 rounded-xl flex items-center gap-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Clapperboard className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">LIVE AUDITION</span>
              </motion.div>

              {/* Match score card */}
              <motion.div
                className="absolute top-4 right-4 glass px-3 py-2 rounded-xl min-w-[130px]"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-white/70">AI Match</span>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0.5">98%</Badge>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full">
                  <div className="h-full w-[98%] rounded-full bg-primary" />
                </div>
                <p className="text-[9px] text-white/40 mt-1">Netflix Lead Actor</p>
              </motion.div>

              {/* Verified card */}
              <motion.div
                className="absolute bottom-8 -left-6 glass px-3 py-2 rounded-xl max-w-[160px]"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold">Profile Verified</span>
                </div>
                <p className="text-[9px] text-white/50">Visible to top directors</p>
              </motion.div>
            </div>

            {/* Glow under stage */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-primary/20 blur-2xl rounded-full" />
          </motion.div>
        </div>

        {/* Film strip bottom */}
        <div className="relative z-10 border-y border-white/5">
          <FilmStrip reverse />
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS — MARQUEE COUNTERS
      ════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-black to-neutral-950"
      >
        {/* Background film frame */}
        <div className="absolute inset-4 border border-white/[0.04] rounded-3xl pointer-events-none" />
        <div className="absolute inset-8 border border-white/[0.025] rounded-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            >
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 m-auto w-24 h-24 rounded-full border border-primary/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
              />
              <h3 className="text-4xl md:text-5xl font-bold font-display text-primary tabular-nums">
                {statsInView && <Counter target={stat.value} suffix={stat.suffix} />}
              </h3>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          PEOPLE SPOTLIGHT — ACTOR PROFILES
      ════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <Badge variant="outline" className="px-4 py-1 gap-2">
              <Star className="h-3 w-3" /> Spotlight
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              India's <span className="text-gradient">Finest Talent</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">Discover award-winning actors, directors, and crew ready to bring your vision to life.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Priya Sharma",  role: "Lead Actress",  city: "Mumbai",    award: "Filmfare 2024", seed: "person10", Sil: SilhouetteRaisedArm },
              { name: "Arjun Mehta",   role: "Character Actor",city: "Delhi",    award: "National Award",seed: "person11", Sil: SilhouetteActor     },
              { name: "Ananya Rao",    role: "Dancer · Actor", city: "Chennai",  award: "IIFA 2024",    seed: "person12", Sil: SilhouetteDancer    },
              { name: "Vikram Singh",  role: "Director",       city: "Hyderabad",award: "BAFTA Nom.",   seed: "person13", Sil: SilhouetteDirector  },
              { name: "Kavya Nair",    role: "Cinematographer",city: "Kochi",    award: "Cannes '24",   seed: "person14", Sil: SilhouetteCameraman },
            ].map(({ name, role, city, award, seed, Sil }, i) => (
              <motion.div
                key={i}
                className="group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Image */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${seed}/400/530`}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Silhouette overlay on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-end justify-center pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: "rgba(13,148,136,0.4)" }}
                  >
                    <Sil className="h-24 w-auto drop-shadow-2xl" />
                  </motion.div>

                  {/* Award badge */}
                  <div className="absolute top-3 left-3">
                    <div className="glass px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="h-2.5 w-2.5 text-amber-400" />
                      <span className="text-[8px] font-bold text-amber-400">{award}</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-bold text-white truncate">{name}</p>
                  <p className="text-[10px] text-primary mt-0.5">{role}</p>
                  <p className="text-[9px] text-white/40 flex items-center gap-1 mt-1">
                    <MapPin className="h-2 w-2" />{city}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURES — 3D TILT CARDS
      ════════════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-neutral-950 to-black">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-20"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <Badge variant="outline" className="px-4 py-1">{t("lp_feat_badge")}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              {t("lp_feat_heading1")} <span className="text-primary">{t("lp_feat_heading2")}</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">{t("lp_feat_desc")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <TiltCard className="h-full">
                  <div
                    className="h-full rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm p-6 space-y-4 relative overflow-hidden group"
                    style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)` }}
                  >
                    {/* Glow corner */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                      style={{ background: feat.color + "40", transform: "translate(40%, -40%)" }}
                    />
                    {/* Film frame corners */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/10 rounded-tl" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/10 rounded-tr" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/10 rounded-bl" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/10 rounded-br" />

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: feat.color + "22", color: feat.color }}
                    >
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold">{feat.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          AUDITIONS — FILM POSTER STYLE
      ════════════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-1 gap-2">
                <Film className="h-3 w-3" /> {t("lp_cast_badge")}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-display">{t("lp_cast_title")}</h2>
            </div>
            <Link to="/auditions">
              <Button variant="outline" className="rounded-full gap-2">View All <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: t("lp_cast_type1"), title: t("lp_cast_title1"), loc: "Mumbai",    seed: "movie10" },
              { type: t("lp_cast_type2"), title: t("lp_cast_title2"), loc: "Hyderabad", seed: "movie11" },
              { type: t("lp_cast_type3"), title: t("lp_cast_title3"), loc: "Chennai",   seed: "movie12" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
              >
                {/* Poster image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${item.seed}/600/480`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <Badge variant="glass" className="text-[10px]">✔ {t("lp_cast_verified")}</Badge>
                    <Badge className="text-[10px] bg-primary border-none">95% {t("lp_cast_match")}</Badge>
                  </div>

                  {/* Silhouette decoration */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ color: "var(--color-primary)", height: 80 }}
                  >
                    {i === 0 ? <SilhouetteRaisedArm className="h-full w-auto" /> :
                     i === 1 ? <SilhouetteDirector className="h-full w-auto" /> :
                               <SilhouetteDancer className="h-full w-auto" />}
                  </motion.div>
                </div>

                {/* Info panel */}
                <div className="p-6 space-y-3 bg-neutral-900/80 backdrop-blur-sm">
                  <span className="text-xs text-primary font-bold uppercase tracking-widest">{item.type}</span>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-white/50">{t("lp_cast_desc")}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <MapPin className="h-3 w-3" />
                      <span>{item.loc}, India</span>
                    </div>
                    <Link to="/login">
                      <Button variant="primary" size="sm" className="rounded-full text-[11px] h-7 px-3">Apply Now</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS — CLAPPERBOARD TIMELINE
      ════════════════════════════════════════ */}
      <section
        ref={stepsRef}
        className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-black to-neutral-950"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-20"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="px-4 py-1 gap-2">
              <Clapperboard className="h-3 w-3" /> {t("lp_how_badge")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              {t("lp_how_title1")} <span className="text-primary">{t("lp_how_title2")}</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-0.5" />

            {[
              { step: "01", title: t("lp_how_s1_title"), desc: t("lp_how_s1_desc"), icon: <Users className="h-5 w-5" />, side: "right" },
              { step: "02", title: t("lp_how_s2_title"), desc: t("lp_how_s2_desc"), icon: <Search className="h-5 w-5" />, side: "left"  },
              { step: "03", title: t("lp_how_s3_title"), desc: t("lp_how_s3_desc"), icon: <Mic className="h-5 w-5" />,   side: "right" },
              { step: "04", title: t("lp_how_s4_title"), desc: t("lp_how_s4_desc"), icon: <Award className="h-5 w-5" />, side: "left"  },
            ].map(({ step, title, desc, icon, side }, i) => (
              <motion.div
                key={i}
                className={`relative flex items-center gap-8 mb-16 ${side === "left" ? "md:flex-row-reverse" : "md:flex-row"} flex-row pl-20 md:pl-0`}
                initial={{ opacity: 0, x: side === "left" ? 40 : -40 }}
                animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              >
                {/* Dot on spine */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-2 border-black -translate-x-1.5 md:-translate-x-2 shadow-lg shadow-primary/40" />

                {/* Card */}
                <div className={`md:w-[45%] ${side === "left" ? "md:text-right" : ""}`}>
                  <div className="glass-dark rounded-2xl p-6 space-y-3 border border-white/10 relative overflow-hidden">
                    {/* Film frame corner decorations */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-primary/30" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-primary/30" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-primary/30" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-primary/30" />

                    <div className={`flex items-center gap-3 ${side === "left" ? "md:flex-row-reverse" : ""}`}>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {icon}
                      </div>
                      <div>
                        <span className="text-xs text-primary/70 font-mono font-bold">SCENE {step}</span>
                        <h3 className="text-lg font-bold">{title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA — THEATER CURTAIN
      ════════════════════════════════════════ */}
      <section className="py-40 px-6 relative overflow-hidden">
        {/* Curtain panels */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-[22%]"
          style={{
            background: "linear-gradient(to right, #4a0000 0%, #2d0000 60%, transparent 100%)",
            opacity: 0.6,
          }}
          initial={{ x: "-100%" }} whileInView={{ x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="absolute top-0 right-0 bottom-0 w-[22%]"
          style={{
            background: "linear-gradient(to left, #4a0000 0%, #2d0000 60%, transparent 100%)",
            opacity: 0.6,
          }}
          initial={{ x: "100%" }} whileInView={{ x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Curtain valance top */}
        <div className="absolute top-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to bottom, #3a0000aa, transparent)" }}
        />

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Badge variant="glass" className="mb-6 px-5 py-2 text-sm gap-2">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              Your Story Starts Here
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold font-display leading-[1.05]">
              {t("lp_cta_title1")}
              <br />
              <span className="text-gradient">{t("lp_cta_title2")}</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-xl text-white/60 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.6 }}
          >
            {t("lp_cta_desc")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.8 }}
          >
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-12 shadow-2xl shadow-primary/40 text-base">
                {t("lp_cta_btn1")}
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="rounded-full px-12 text-base">
                {t("lp_cta_btn2")}
              </Button>
            </Link>
          </motion.div>

          {/* Actor silhouettes for CTA */}
          <div className="flex items-end justify-center gap-4 opacity-20 pt-8 pointer-events-none">
            <SilhouetteActor className="h-24 text-primary" />
            <SilhouetteRaisedArm className="h-32 text-white" />
            <SilhouetteDancer className="h-36 text-primary" />
            <SilhouetteDirector className="h-28 text-white" />
            <SilhouetteCameraman className="h-20 text-primary" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 px-6 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-white/25 text-sm">
          {[t("lp_trust1"), t("lp_trust2"), t("lp_trust3"), t("lp_trust4")].map((item, i) => (
            <React.Fragment key={i}>
              <span className="font-medium">{item}</span>
              {i < 3 && <span>·</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
