import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Film,
  Tv,
  Radio,
  Theater,
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Clock,
  CheckCircle2,
  Star,
  Share2,
  Bookmark,
  Play,
  ChevronRight,
  Clapperboard,
  Award,
  Mic,
  Camera,
  User,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";

// ─── Shared project data (matches DirectorProfilePage & MyProjectsPage) ───────
export const ALL_PROJECTS = [
  {
    id: "1",
    title: "Don 3",
    type: "Feature Film",
    status: "In Production",
    year: "2026",
    image: "https://picsum.photos/seed/proj1/1200/500",
    coverImage: "https://picsum.photos/seed/proj1cover/1400/500",
    castingStatus: "Casting for supporting roles",
    director: "Farhan Akhtar",
    producer: "Excel Entertainment",
    studio: "Excel Entertainment & Ritesh Sidhwani",
    language: "Hindi",
    location: "Mumbai, Dubai, Prague",
    budget: "₹150 Cr",
    startDate: "Jan 2026",
    endDate: "Sep 2026",
    releaseDate: "Diwali 2026",
    genre: ["Action", "Thriller", "Crime"],
    totalRoles: 28,
    filledRoles: 22,
    activeAuditions: 6,
    totalApplicants: 3200,
    castingProgress: 79,
    description:
      "Don 3 continues the explosive saga of Don, the most dreaded criminal mastermind the world has ever seen. Set across multiple continents — from the streets of Mumbai to the high-rises of Dubai and the alleys of Prague — this installment delves deeper into Don's origins while introducing a new generation of adversaries who dare to challenge his empire. With breathtaking action sequences, unexpected plot twists, and the signature stylish storytelling of the franchise, Don 3 promises to be the most ambitious entry yet.",
    synopsis:
      "When an international crime syndicate threatens Don's carefully constructed global empire, he must forge an unlikely alliance to survive — while simultaneously planning his most audacious heist ever.",
    openRoles: [
      { role: "Interpol Agent (Male)", age: "28–38", type: "Supporting", status: "Open", applicants: 420 },
      { role: "Crime Boss' Aide (Female)", age: "25–35", type: "Supporting", status: "Open", applicants: 380 },
      { role: "Street Contact — Prague", age: "Any", type: "Day Player", status: "Open", applicants: 210 },
      { role: "Bodyguard #1", age: "30–45", type: "Featured Extra", status: "Open", applicants: 150 },
      { role: "Dubai Socialite", age: "25–40", type: "Supporting", status: "Open", applicants: 290 },
      { role: "Arms Dealer's Assistant", age: "22–32", type: "Day Player", status: "Open", applicants: 98 },
    ],
    cast: [
      { name: "Shah Rukh Khan", role: "Don / Vijay", image: "https://picsum.photos/seed/cast1/200/200" },
      { name: "Priyanka Chopra", role: "Roma", image: "https://picsum.photos/seed/cast2/200/200" },
      { name: "Ranveer Singh", role: "TBA", image: "https://picsum.photos/seed/cast3/200/200" },
      { name: "Deepika Padukone", role: "TBA", image: "https://picsum.photos/seed/cast4/200/200" },
    ],
    crew: [
      { name: "Farhan Akhtar", role: "Director" },
      { name: "Ritesh Sidhwani", role: "Producer" },
      { name: "Shankar-Ehsaan-Loy", role: "Music" },
      { name: "Anil Mehta", role: "Cinematographer" },
      { name: "Priya Sharma", role: "Casting Director" },
    ],
    awards: [],
    timeline: [
      { phase: "Pre-Production", date: "Oct 2025 – Dec 2025", done: true },
      { phase: "Principal Photography", date: "Jan 2026 – Jun 2026", done: false, current: true },
      { phase: "Post-Production", date: "Jul 2026 – Sep 2026", done: false },
      { phase: "Release", date: "Diwali 2026", done: false },
    ],
  },
  {
    id: "2",
    title: "Inside Edge S4",
    type: "Web Series",
    status: "Pre-Production",
    year: "2026",
    image: "https://picsum.photos/seed/proj2/1200/500",
    coverImage: "https://picsum.photos/seed/proj2cover/1400/500",
    castingStatus: "Open casting calls",
    director: "Kanishk Varma",
    producer: "Excel Entertainment",
    studio: "Amazon Prime Video India",
    language: "Hindi",
    location: "Mumbai, Goa",
    budget: "₹80 Cr",
    startDate: "Mar 2026",
    endDate: "Oct 2026",
    releaseDate: "Q1 2027",
    genre: ["Sports", "Drama", "Thriller"],
    totalRoles: 18,
    filledRoles: 8,
    activeAuditions: 10,
    totalApplicants: 2400,
    castingProgress: 44,
    description:
      "Inside Edge returns for a gripping fourth season, pulling back the curtain on the shadowy world of cricket's power brokers. Season 4 introduces a new T20 franchise shaking up the league and explores the rising influence of sports betting syndicates in emerging markets across South Asia.",
    synopsis:
      "A new franchise owner with a mysterious past enters the Mumbai Mavericks league — threatening to expose secrets that powerful people have buried for years.",
    openRoles: [
      { role: "Lead Actress (Female)", age: "22–30", type: "Lead", status: "Open", applicants: 890 },
      { role: "Cricket Coach", age: "40–55", type: "Supporting", status: "Open", applicants: 310 },
      { role: "Sports Journalist", age: "25–35", type: "Recurring", status: "Open", applicants: 450 },
      { role: "Bookie's Runner", age: "20–30", type: "Supporting", status: "Open", applicants: 220 },
      { role: "Cricket Board Official", age: "50–65", type: "Guest", status: "Open", applicants: 130 },
    ],
    cast: [
      { name: "Vivek Oberoi", role: "Vikrant Dhawan", image: "https://picsum.photos/seed/cast5/200/200" },
      { name: "Richa Chadha", role: "Zarina Malik", image: "https://picsum.photos/seed/cast6/200/200" },
      { name: "Siddhant Chaturvedi", role: "TBA", image: "https://picsum.photos/seed/cast7/200/200" },
    ],
    crew: [
      { name: "Kanishk Varma", role: "Director" },
      { name: "Ritesh Sidhwani", role: "Executive Producer" },
      { name: "Tanuj Virwani", role: "Co-Producer" },
      { name: "Amit Roy", role: "Cinematographer" },
      { name: "Meera Kapoor", role: "Casting Director" },
    ],
    awards: [
      { title: "Filmfare OTT Award – Best Series", year: "2022" },
      { title: "Asian Academy Creative Award", year: "2021" },
    ],
    timeline: [
      { phase: "Script & Development", date: "Aug 2025 – Dec 2025", done: true },
      { phase: "Casting", date: "Jan 2026 – Feb 2026", done: false, current: true },
      { phase: "Principal Photography", date: "Mar 2026 – Aug 2026", done: false },
      { phase: "Post-Production & VFX", date: "Sep 2026 – Dec 2026", done: false },
    ],
  },
  {
    id: "3",
    title: "Mirzapur S4",
    type: "Web Series",
    status: "Completed",
    year: "2025",
    image: "https://picsum.photos/seed/proj3/1200/500",
    coverImage: "https://picsum.photos/seed/proj3cover/1400/500",
    castingStatus: "Casting closed",
    director: "Gurmmeet Singh",
    producer: "Excel Entertainment",
    studio: "Amazon Prime Video India",
    language: "Hindi (Bhojpuri dialect)",
    location: "Mirzapur, Varanasi, Lucknow",
    budget: "₹120 Cr",
    startDate: "Feb 2025",
    endDate: "Oct 2025",
    releaseDate: "Released – Nov 2025",
    genre: ["Crime", "Drama", "Action"],
    totalRoles: 22,
    filledRoles: 22,
    activeAuditions: 0,
    totalApplicants: 5100,
    castingProgress: 100,
    description:
      "The final chapter of the Mirzapur saga. Season 4 brings an explosive conclusion to the blood-soaked power struggle between Guddu Pandit and the remnants of Kaleen Bhaiya's empire. Old alliances crumble, new kingpins rise, and Purvanchal will never be the same again.",
    synopsis:
      "Guddu Pandit finally sits on the Mirzapur throne — but holding it may cost him everything he has left to lose.",
    openRoles: [],
    cast: [
      { name: "Ali Fazal", role: "Guddu Pandit", image: "https://picsum.photos/seed/cast8/200/200" },
      { name: "Shweta Tripathi", role: "Golu Gupta", image: "https://picsum.photos/seed/cast9/200/200" },
      { name: "Vijay Varma", role: "Shatrughan Tyagi", image: "https://picsum.photos/seed/cast10/200/200" },
      { name: "Isha Talwar", role: "Madhuri Yadav", image: "https://picsum.photos/seed/cast11/200/200" },
    ],
    crew: [
      { name: "Gurmmeet Singh", role: "Director" },
      { name: "Puneet Krishna", role: "Creator & Writer" },
      { name: "Ritesh Sidhwani", role: "Producer" },
      { name: "Ewan Mulligan", role: "Cinematographer" },
    ],
    awards: [
      { title: "Filmfare OTT Award – Best Drama", year: "2025" },
      { title: "IIFA Best Web Series", year: "2025" },
    ],
    timeline: [
      { phase: "Pre-Production", date: "Oct 2024 – Jan 2025", done: true },
      { phase: "Principal Photography", date: "Feb 2025 – Jun 2025", done: true },
      { phase: "Post-Production & VFX", date: "Jul 2025 – Sep 2025", done: true },
      { phase: "Released", date: "November 2025", done: true },
    ],
  },
  {
    id: "4",
    title: "Gully Boy 2",
    type: "Feature Film",
    status: "Development",
    year: "2027",
    image: "https://picsum.photos/seed/proj4/1200/500",
    coverImage: "https://picsum.photos/seed/proj4cover/1400/500",
    castingStatus: "Coming soon",
    director: "Zoya Akhtar",
    producer: "Tiger Baby Films",
    studio: "Excel Entertainment & Netflix",
    language: "Hindi (Mumbai street dialect)",
    location: "Mumbai (Dharavi, Kurla, Andheri)",
    budget: "₹90 Cr",
    startDate: "TBD 2026",
    endDate: "TBD 2027",
    releaseDate: "2027",
    genre: ["Musical", "Drama", "Coming-of-Age"],
    totalRoles: 20,
    filledRoles: 2,
    activeAuditions: 0,
    totalApplicants: 0,
    castingProgress: 10,
    description:
      "The spiritual sequel to the 2019 cult phenomenon. Gully Boy 2 follows a new generation of underground hip-hop artists from Mumbai's streets, navigating industry politics, identity, and the price of fame. Zoya Akhtar returns to direct, bringing an even rawer and more authentic lens to India's vibrant rap culture.",
    synopsis:
      "A teenage rapper from Kurla goes viral overnight — thrusting her into a world she dreamed of but never imagined could be this dangerous.",
    openRoles: [
      { role: "Lead Actress (18–24)", age: "18–24", type: "Lead", status: "Coming Soon", applicants: 0 },
      { role: "Male Lead — Rapper", age: "18–26", type: "Lead", status: "Coming Soon", applicants: 0 },
    ],
    cast: [
      { name: "Ranveer Singh", role: "Special Appearance", image: "https://picsum.photos/seed/cast12/200/200" },
    ],
    crew: [
      { name: "Zoya Akhtar", role: "Director" },
      { name: "Reema Kagti", role: "Producer" },
      { name: "Ritesh Sidhwani", role: "Executive Producer" },
    ],
    awards: [],
    timeline: [
      { phase: "Development & Scripting", date: "2025 – 2026", done: false, current: true },
      { phase: "Casting Open", date: "Mid 2026", done: false },
      { phase: "Principal Photography", date: "Late 2026", done: false },
      { phase: "Release", date: "2027", done: false },
    ],
  },
];

// ─── Status config ─────────────────────────────────────────────────────────────
const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  "In Production": { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", label: "In Production" },
  "Pre-Production": { color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", label: "Pre-Production" },
  "Completed": { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", label: "Completed" },
  "Development": { color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20", label: "In Development" },
  "Casting": { color: "text-primary", bg: "bg-primary/10 border-primary/20", label: "Casting Open" },
};

const typeIcon: Record<string, React.ReactNode> = {
  "Feature Film": <Film className="h-4 w-4" />,
  "Web Series": <Tv className="h-4 w-4" />,
  "Podcast Drama": <Radio className="h-4 w-4" />,
  "Theater": <Theater className="h-4 w-4" />,
};

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"overview" | "roles" | "cast" | "timeline">("overview");

  const project = ALL_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 flex">
        <Sidebar role="director" />
        <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-white/20 mx-auto" />
            <h2 className="text-2xl font-bold">Project Not Found</h2>
            <p className="text-white/50">This project doesn't exist or has been removed.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const sc = statusConfig[project.status] ?? statusConfig["Development"];
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "roles", label: `Open Roles (${project.openRoles.length})` },
    { id: "cast", label: "Cast & Crew" },
    { id: "timeline", label: "Timeline" },
  ] as const;

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <Sidebar role="director" />

      <main className="flex-grow md:ml-64">
        {/* ── Hero Banner ────────────────────────────────────────── */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center space-x-2 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Share + Bookmark */}
          <div className="absolute top-6 right-6 flex items-center space-x-2">
            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({ title: project.title, url: window.location.href })
                  : navigator.clipboard.writeText(window.location.href)
              }
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-colors ${bookmarked ? "text-primary" : "text-white/70 hover:text-white"}`}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-primary" : ""}`} />
            </button>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${sc.bg} ${sc.color}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {sc.label}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/60 bg-white/10 px-3 py-1.5 rounded-full">
                {typeIcon[project.type] ?? <Film className="h-4 w-4" />}
                {project.type}
              </span>
              {project.genre.map((g) => (
                <span key={g} className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">{g}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-1">{project.title}</h1>
            <p className="text-white/60 text-sm">
              Dir. {project.director} &nbsp;·&nbsp; {project.studio} &nbsp;·&nbsp; {project.year}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-8 max-w-6xl">
          {/* ── Quick Stats ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Users className="h-5 w-5 text-blue-400" />, label: "Total Roles", value: `${project.filledRoles}/${project.totalRoles}` },
              { icon: <Clapperboard className="h-5 w-5 text-primary" />, label: "Active Auditions", value: project.activeAuditions },
              { icon: <TrendingUp className="h-5 w-5 text-emerald-400" />, label: "Applicants", value: project.totalApplicants.toLocaleString() },
              { icon: <IndianRupee className="h-5 w-5 text-amber-400" />, label: "Budget", value: project.budget },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card variant="outline" className="p-4 flex items-center gap-3 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{s.label}</p>
                    <p className="text-lg font-bold">{s.value}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ── Casting Progress Bar ─────────────────────────────── */}
          <Card variant="outline" className="p-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Casting Progress</span>
              <span className="font-bold text-primary">{project.castingProgress}%</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${project.castingProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-white/40">{project.filledRoles} of {project.totalRoles} roles filled</p>
          </Card>

          {/* ── Tabs ─────────────────────────────────────────────── */}
          <div className="flex items-center space-x-1 border-b border-white/10 pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab Content ──────────────────────────────────────── */}

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Description */}
              <Card variant="outline" className="p-6 space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Film className="h-5 w-5 text-primary" /> About the Project
                </h2>
                <p className="text-white/70 leading-relaxed">{project.description}</p>
                <div className="border-t border-white/5 pt-4">
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Synopsis</h3>
                  <p className="text-white/60 italic">"{project.synopsis}"</p>
                </div>
              </Card>

              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="outline" className="p-5 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-white/40">Production Info</h3>
                  {[
                    { icon: <User className="h-4 w-4" />, label: "Director", value: project.director },
                    { icon: <Clapperboard className="h-4 w-4" />, label: "Producer", value: project.producer },
                    { icon: <Camera className="h-4 w-4" />, label: "Studio", value: project.studio },
                    { icon: <Mic className="h-4 w-4" />, label: "Language", value: project.language },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="text-white/30">{item.icon}</span>
                      <span className="text-white/50 w-20 flex-shrink-0">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </Card>

                <Card variant="outline" className="p-5 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-white/40">Schedule & Location</h3>
                  {[
                    { icon: <MapPin className="h-4 w-4" />, label: "Location", value: project.location },
                    { icon: <Calendar className="h-4 w-4" />, label: "Start Date", value: project.startDate },
                    { icon: <Calendar className="h-4 w-4" />, label: "End Date", value: project.endDate },
                    { icon: <Star className="h-4 w-4" />, label: "Release", value: project.releaseDate },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="text-white/30">{item.icon}</span>
                      <span className="text-white/50 w-20 flex-shrink-0">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </Card>
              </div>

              {/* Awards */}
              {project.awards.length > 0 && (
                <Card variant="outline" className="p-5 space-y-3">
                  <h3 className="font-bold flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-400" /> Awards & Recognition
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.awards.map((a, i) => (
                      <span key={i} className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1.5 rounded-full">
                        🏆 {a.title} ({a.year})
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          )}

          {/* OPEN ROLES */}
          {activeTab === "roles" && (
            <motion.div key="roles" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {project.openRoles.length === 0 ? (
                <Card variant="outline" className="p-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Casting Complete</h3>
                  <p className="text-white/50 text-sm">All roles for this project have been filled. Check back for future productions.</p>
                </Card>
              ) : (
                project.openRoles.map((role, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card variant="outline" className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-all group">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold group-hover:text-primary transition-colors">{role.role}</h3>
                          <Badge variant={role.status === "Open" ? "primary" : "secondary"} className="text-[10px]">
                            {role.status}
                          </Badge>
                          <Badge variant="glass" className="text-[10px] bg-white/5 border-none">{role.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/50">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> Age: {role.age}</span>
                          {role.applicants > 0 && (
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {role.applicants} applicants</span>
                          )}
                        </div>
                      </div>
                      {role.status === "Open" && (
                        <Button
                          size="sm"
                          className="rounded-xl flex-shrink-0"
                          onClick={() => navigate("/auditions")}
                        >
                          Apply Now
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      )}
                      {role.status === "Coming Soon" && (
                        <Button variant="outline" size="sm" className="rounded-xl flex-shrink-0 text-white/50" disabled>
                          <Clock className="mr-1 h-3 w-3" /> Coming Soon
                        </Button>
                      )}
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* CAST & CREW */}
          {activeTab === "cast" && (
            <motion.div key="cast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Cast */}
              <div className="space-y-3">
                <h2 className="font-bold text-lg">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.cast.map((member, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                      <Card variant="outline" className="p-4 text-center space-y-3 hover:border-primary/30 transition-all group cursor-pointer">
                        <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-bold text-sm group-hover:text-primary transition-colors">{member.name}</p>
                          <p className="text-xs text-white/50">{member.role}</p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Crew */}
              <div className="space-y-3">
                <h2 className="font-bold text-lg">Crew</h2>
                <Card variant="outline" className="divide-y divide-white/5">
                  {project.crew.map((member, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-white/40">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            </motion.div>
          )}

          {/* TIMELINE */}
          {activeTab === "timeline" && (
            <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-white/10" />

                {project.timeline.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative mb-6 last:mb-0"
                  >
                    {/* Dot */}
                    <div className={`absolute -left-8 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      phase.done
                        ? "bg-emerald-500 border-emerald-500"
                        : phase.current
                        ? "bg-primary border-primary"
                        : "bg-neutral-800 border-white/20"
                    }`}>
                      {phase.done ? (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      ) : phase.current ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      ) : (
                        <Clock className="h-3 w-3 text-white/30" />
                      )}
                    </div>

                    <Card
                      variant="outline"
                      className={`p-4 ${phase.current ? "border-primary/40 bg-primary/5" : phase.done ? "border-emerald-500/20 bg-emerald-500/5" : ""}`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h3 className={`font-bold ${phase.current ? "text-primary" : phase.done ? "text-emerald-400" : "text-white/60"}`}>
                            {phase.phase}
                          </h3>
                          <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {phase.date}
                          </p>
                        </div>
                        {phase.current && (
                          <Badge variant="primary" className="text-[10px] animate-pulse">● In Progress</Badge>
                        )}
                        {phase.done && (
                          <Badge variant="success" className="text-[10px]">✓ Completed</Badge>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── CTA Bar ──────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row items-center gap-3 pt-4 border-t border-white/5">
            {project.openRoles.length > 0 && (
              <Button
                className="w-full md:w-auto rounded-xl shadow-lg shadow-primary/20"
                onClick={() => { setActiveTab("roles"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <Play className="mr-2 h-4 w-4" />
                View Open Roles ({project.openRoles.length})
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full md:w-auto rounded-xl"
              onClick={() => navigate("/auditions")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Browse All Auditions
            </Button>
            <Button
              variant="ghost"
              className="w-full md:w-auto rounded-xl"
              onClick={() => navigate("/director-profile")}
            >
              <User className="mr-2 h-4 w-4" />
              View Director Profile
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
