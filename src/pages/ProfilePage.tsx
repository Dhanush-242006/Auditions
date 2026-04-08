import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
  ShieldCheck,
  Video,
  Image as ImageIcon,
  FileText,
  Plus,
  Edit3,
  Share2,
  CheckCircle2,
  Star,
  Zap,
  Eye,
  EyeOff,
  Download,
  X as XIcon,
  Printer,
  Trophy,
  Quote,
  Medal,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Tabs } from "@/src/components/ui/Tabs";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import {
  getTalentProfileExtras,
  subscribeTalentProfileExtras,
  type TalentProfileExtras,
} from "@/src/lib/talentProfileExtras";

const DEFAULT_SKILLS = ["Method Acting", "Martial Arts", "Classical Dance", "Horse Riding", "Fluent in Hindi, English, Punjabi"];
const DEFAULT_BIO =
  "Versatile actor with a strong background in theatre and method acting. Passionate about character-driven storytelling and physically demanding roles. Looking for challenging opportunities in feature films and web series.";

const INITIAL_PORTFOLIO = [
  { id: "1", type: "image" as const, url: "https://picsum.photos/seed/port1/600/800" },
  { id: "2", type: "image" as const, url: "https://picsum.photos/seed/port2/600/800" },
  { id: "3", type: "video" as const, url: "https://picsum.photos/seed/port3/600/800", title: "Action Reel 2025" },
  { id: "4", type: "image" as const, url: "https://picsum.photos/seed/port4/600/800" },
  { id: "5", type: "image" as const, url: "https://picsum.photos/seed/port5/600/800" },
  { id: "6", type: "video" as const, url: "https://picsum.photos/seed/port6/600/800", title: "Emotional Monologue" },
];

export function ProfilePage() {
  const user = useCurrentUser();
  const [extras, setExtras] = React.useState<TalentProfileExtras>(() => getTalentProfileExtras());
  const [activeTab, setActiveTab] = React.useState("portfolio");
  const [isIdentityBlurred, setIsIdentityBlurred] = React.useState(false);
  const [portfolioItems, setPortfolioItems] = React.useState<{ id: string; type: "image" | "video"; url: string; title?: string }[]>(INITIAL_PORTFOLIO);
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [resumeUploadedAt, setResumeUploadedAt] = React.useState<Date | null>(null);
  const [showResumeBuilder, setShowResumeBuilder] = React.useState(false);
  const addMediaInputRef = React.useRef<HTMLInputElement>(null);
  const resumeInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    return subscribeTalentProfileExtras(() => setExtras(getTalentProfileExtras()));
  }, []);

  const skills = extras.skills?.length ? extras.skills : DEFAULT_SKILLS;
  const displayBio = extras.bio?.trim() ? extras.bio : DEFAULT_BIO;
  const displayLocation = extras.location?.trim() ?? "Mumbai, India";
  const displayExperience = extras.experienceYears?.trim() ?? "5+ Years Experience";

  const experience = [
    { title: "Lead Actor", project: "The Great Indian Mystery", year: "2025", company: "Netflix India" },
    { title: "Supporting Role", project: "Mumbai Diaries S2", year: "2024", company: "Amazon Prime Video" },
    { title: "Lead Actor", project: "Theatre Play: Hamlet", year: "2023", company: "Prithvi Theatre" },
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatResumeDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleAddResume = () => resumeInputRef.current?.click();

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    setResumeUploadedAt(new Date());
    e.target.value = "";
  };

  const handleDownloadResume = () => {
    if (!resumeFile) return;
    const url = URL.createObjectURL(resumeFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = resumeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenResume = () => {
    if (!resumeFile) return;
    const url = URL.createObjectURL(resumeFile);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const profileUrl = typeof window !== "undefined" ? `${window.location.origin}/profile` : "";
  const profileShareText = "Check out my actor profile on Auditions Adda";

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: "Actor Profile - Auditions Adda",
        text: profileShareText,
        url: profileUrl,
      }).catch(() => navigator.clipboard?.writeText(profileUrl));
    } else {
      navigator.clipboard?.writeText(profileUrl);
    }
  };

  const handleContactActor = () => {
    const contactEmail = "hello@auditionsadda.com";
    const subject = encodeURIComponent("Casting inquiry - Auditions Adda");
    const body = encodeURIComponent("Hi,\n\nI'm interested in connecting with this actor for a casting opportunity.\n\nBest regards");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };
  
  const handleAddMedia = () => {
    setActiveTab("portfolio");
    addMediaInputRef.current?.click();
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const type = isVideo ? "video" : "image";
    const url = URL.createObjectURL(file);
    const title = isVideo ? file.name.replace(/\.[^/.]+$/, "") : undefined;
    setPortfolioItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        type,
        url,
        ...(title && { title }),
      },
    ]);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        {/* Profile Header */}
        <div className="relative mb-12">
          {/* Cover Image */}
          <div className="h-64 md:h-80 rounded-3xl overflow-hidden border border-white/10 relative">
            <img 
              src="https://picsum.photos/seed/cover/1200/400" 
              alt="Cover" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 flex items-center space-x-3">
              <Button variant="glass" size="sm" className="rounded-full">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Cover
              </Button>
            </div>
          </div>

          {/* Profile Info Card */}
          <div className="relative -mt-20 px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative">
                <div className={cn(
                  "w-40 h-40 rounded-3xl border-4 border-neutral-950 overflow-hidden shadow-2xl transition-all duration-500",
                  isIdentityBlurred && "blur-xl scale-95"
                )}>
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <span className="text-5xl font-bold font-display text-primary">{(user.firstName ?? "U")[0]}</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-neutral-950 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="space-y-2 pb-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-4xl font-bold font-display">
                    {isIdentityBlurred ? "Actor #8241" : (user.name ?? "User")}
                  </h1>
                  <Badge variant="glass" className="bg-primary/10 text-primary border-none">Pro Actor</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center"><MapPin className="h-4 w-4 mr-1 shrink-0" /> {displayLocation}</span>
                  <span className="flex items-center"><Star className="h-4 w-4 mr-1 shrink-0" /> {displayExperience}</span>
                  <span className="flex items-center"><Zap className="h-4 w-4 mr-1 text-primary" /> 92% AI Match Score</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pb-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={() => setIsIdentityBlurred(!isIdentityBlurred)}
                title={isIdentityBlurred ? "Show Identity" : "Blur Identity"}
              >
                {isIdentityBlurred ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={handleShareProfile} title="Share profile">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button className="rounded-xl px-8 h-12 shadow-lg shadow-primary/20" onClick={handleContactActor}>
                Contact Actor
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Info & Skills */}
          <div className="space-y-8">
            <Card variant="outline" className="space-y-6">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>About Me</span>
              </h3>
              <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">
                {displayBio}
              </p>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Age Range</span>
                  <span className="font-medium">{extras.ageRange ?? "25 - 35 years"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Height</span>
                  <span className="font-medium">{extras.height ?? "6'0\" (183 cm)"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Weight</span>
                  <span className="font-medium">{extras.weight ?? "75 kg"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Eyes</span>
                  <span className="font-medium">{extras.eyes ?? "Dark Brown"}</span>
                </div>
              </div>
            </Card>

            <Card variant="outline" className="space-y-6">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Star className="h-5 w-5 text-amber-500" />
                <span>Skills & Talents</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="bg-white/5 border-white/10 text-white/70 px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card variant="glass" className="p-6 border-primary/20 bg-primary/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Resume</h3>
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleResumeFileChange}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleAddResume} title="Upload resume">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div
                onClick={resumeFile ? handleOpenResume : undefined}
                className={cn(
                  "flex items-center p-3 rounded-xl bg-white/5 border border-white/10 group transition-all",
                  resumeFile && "cursor-pointer hover:border-primary/30 hover:bg-white/[0.07]"
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-500 mr-3 flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-bold group-hover:text-primary transition-colors truncate">
                    {resumeFile ? resumeFile.name : "No resume uploaded"}
                  </p>
                  <p className="text-[10px] text-white/40">
                    {resumeFile && resumeUploadedAt
                      ? `${formatResumeDate(resumeUploadedAt)} • ${formatFileSize(resumeFile.size)}`
                      : "PDF or DOC • Click + to upload"}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl text-xs"
                onClick={handleDownloadResume}
                disabled={!resumeFile}
                title={!resumeFile ? "Upload a resume first" : "Download resume"}
              >
                Download Full Resume
              </Button>
              <Button
                variant="primary"
                className="w-full rounded-xl text-xs gap-1"
                onClick={() => setShowResumeBuilder(true)}
              >
                <Printer className="h-3.5 w-3.5" /> Generate Resume PDF
              </Button>
            </Card>
          </div>

          {/* Right Column: Portfolio & Experience */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <Tabs
                tabs={[
                  { id: "portfolio",       label: "Portfolio",       icon: <ImageIcon className="h-4 w-4" /> },
                  { id: "experience",      label: "Experience",      icon: <Calendar  className="h-4 w-4" /> },
                  { id: "recommendations", label: "Recommendations", icon: <Quote     className="h-4 w-4" /> },
                  { id: "achievements",    label: "Achievements",    icon: <Trophy    className="h-4 w-4" /> },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="pills"
              />
              <>
              <input
                ref={addMediaInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleMediaFileChange}
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary font-bold"
                onClick={handleAddMedia}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Media
              </Button>
            </>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "portfolio" && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {portfolioItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer border border-white/10"
                    >
                      <img 
                        src={item.url} 
                        alt="Portfolio" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Video className="h-6 w-6 text-white" />
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-xs font-bold text-white truncate">{item.title}</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {experience.map((exp, i) => (
                    <Card key={i} variant="outline" className="flex items-start gap-6 group hover:border-primary/30 transition-all">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex flex-col items-center justify-center text-white/40 flex-shrink-0">
                        <span className="text-xs font-bold">{exp.year}</span>
                      </div>
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.title}</h4>
                          <Badge variant="glass" className="text-[10px]">{exp.company}</Badge>
                        </div>
                        <p className="text-sm text-white/60">Project: <span className="text-white font-medium">{exp.project}</span></p>
                        <p className="text-xs text-white/40 leading-relaxed mt-2">
                          Played a pivotal role in this high-budget production, receiving critical acclaim for the emotional depth and physical transformation required for the character.
                        </p>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full rounded-xl py-6 border-dashed border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Experience
                  </Button>
                </motion.div>
              )}

              {/* ── RECOMMENDATIONS ── */}
              {activeTab === "recommendations" && (
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-5"
                >
                  {[
                    {
                      name: "Rajesh Khanna",
                      role: "Casting Director · Dharma Productions",
                      photo: "https://randomuser.me/api/portraits/men/52.jpg",
                      text: "An exceptionally dedicated performer who brings unmatched depth and authenticity to every character. His preparation and commitment on set truly sets him apart from the rest.",
                      date: "March 2025",
                      rating: 5,
                    },
                    {
                      name: "Priya Mehta",
                      role: "Director · Netflix India",
                      photo: "https://randomuser.me/api/portraits/women/44.jpg",
                      text: "Working with him was a pleasure. He consistently delivered take after take with fresh energy and emotion, adapting effortlessly to creative direction. A true professional.",
                      date: "January 2025",
                      rating: 5,
                    },
                    {
                      name: "Arjun Kapoor",
                      role: "Co-star · Mumbai Diaries S2",
                      photo: "https://randomuser.me/api/portraits/men/34.jpg",
                      text: "His screen presence is magnetic and he elevates everyone around him. One of the most generous actors I've had the chance to work with — always in character, always present.",
                      date: "November 2024",
                      rating: 4,
                    },
                  ].map((rec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Card variant="outline" className="p-5 space-y-4 hover:border-primary/30 transition-all group">
                        {/* Quote icon */}
                        <div className="flex items-start justify-between gap-3">
                          <Quote className="h-8 w-8 text-primary/30 shrink-0 mt-0.5" />
                          {/* Star rating */}
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star
                                key={j}
                                className={`h-3.5 w-3.5 ${j < rec.rating ? "text-amber-400 fill-amber-400" : "text-white/15"}`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-sm text-white/70 leading-relaxed italic">"{rec.text}"</p>

                        {/* Recommender info */}
                        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                          <img
                            src={rec.photo}
                            alt={rec.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{rec.name}</p>
                            <p className="text-xs text-white/40 truncate">{rec.role}</p>
                          </div>
                          <span className="text-[10px] text-white/25 shrink-0">{rec.date}</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-6 border-dashed border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Request a Recommendation
                  </Button>
                </motion.div>
              )}

              {/* ── ACHIEVEMENTS ── */}
              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-5"
                >
                  {[
                    {
                      icon: <Trophy className="h-6 w-6" />,
                      color: "#f59e0b",
                      title: "Best Actor — Filmfare Awards",
                      org: "Filmfare",
                      year: "2025",
                      desc: "Awarded for outstanding performance as the lead in 'The Great Indian Mystery' on Netflix India.",
                      type: "Award",
                    },
                    {
                      icon: <Medal className="h-6 w-6" />,
                      color: "#8b5cf6",
                      title: "Rising Star of the Year",
                      org: "IIFA Awards",
                      year: "2024",
                      desc: "Recognised among the top emerging talents in the Indian film industry at the IIFA ceremony.",
                      type: "Recognition",
                    },
                    {
                      icon: <Star className="h-6 w-6" />,
                      color: "#0D9488",
                      title: "Critics' Choice — Best Supporting",
                      org: "Screen Awards",
                      year: "2024",
                      desc: "Critical acclaim for the emotionally charged supporting role in 'Mumbai Diaries Season 2'.",
                      type: "Award",
                    },
                    {
                      icon: <CheckCircle2 className="h-6 w-6" />,
                      color: "#3b82f6",
                      title: "Completed Method Acting Masterclass",
                      org: "Lee Strasberg Institute",
                      year: "2023",
                      desc: "Completed an intensive 6-month method acting certification under internationally acclaimed faculty.",
                      type: "Certification",
                    },
                    {
                      icon: <Zap className="h-6 w-6" />,
                      color: "#e11d48",
                      title: "Pan-India Box Office — ₹200 Cr Film",
                      org: "Trade Analytics",
                      year: "2023",
                      desc: "Featured in a ₹200 Cr+ grossing film, marking a significant milestone in commercial cinema.",
                      type: "Milestone",
                    },
                  ].map((ach, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Card
                        variant="outline"
                        className="flex items-start gap-4 p-5 group hover:border-primary/30 transition-all"
                      >
                        {/* Icon badge */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                          style={{ background: ach.color + "22", color: ach.color }}
                        >
                          {ach.icon}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <h4 className="font-bold text-sm group-hover:text-primary transition-colors leading-snug">
                              {ach.title}
                            </h4>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Badge
                                className="text-[9px] px-2 py-0.5 border"
                                style={{ background: ach.color + "18", color: ach.color, borderColor: ach.color + "35" }}
                              >
                                {ach.type}
                              </Badge>
                              <span className="text-[10px] text-white/30">{ach.year}</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-primary/70 font-medium">{ach.org}</p>
                          <p className="text-xs text-white/45 leading-relaxed">{ach.desc}</p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-6 border-dashed border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Achievement
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />

      {/* Resume Builder Modal */}
      {showResumeBuilder && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto print:hidden-overlay">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-2xl my-8">
            {/* Modal header — hidden when printing */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 print:hidden">
              <h2 className="font-bold text-lg">Resume Preview</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="primary" className="gap-1" onClick={() => window.print()}>
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowResumeBuilder(false)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Resume content — this is what gets printed */}
            <div id="resume-print-area" className="p-8 text-neutral-950 bg-white rounded-b-2xl font-sans">
              {/* Header */}
              <div className="border-b-2 border-orange-500 pb-5 mb-5 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-950">{user.name ?? "Actor Name"}</h1>
                  <p className="text-orange-600 font-semibold text-sm mt-0.5">Professional Actor</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-600">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{displayLocation}</span>
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{user.email ?? "actor@email.com"}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" />{displayExperience}</span>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-orange-100 flex-shrink-0">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-orange-500">{(user.name ?? "A")[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-2">About</h2>
                <p className="text-sm text-neutral-700 leading-relaxed">{displayBio}</p>
              </div>

              {/* Physical Stats */}
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-2">Physical Profile</h2>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Age Range", value: extras.ageRange ?? "25–35 yrs" },
                    { label: "Height", value: extras.height ?? "6'0\" / 183cm" },
                    { label: "Weight", value: extras.weight ?? "75 kg" },
                    { label: "Eyes", value: extras.eyes ?? "Dark Brown" },
                  ].map(stat => (
                    <div key={stat.label} className="bg-neutral-100 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-neutral-500 uppercase">{stat.label}</p>
                      <p className="text-xs font-bold text-neutral-800">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-2">Skills & Talents</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-0.5 bg-orange-50 border border-orange-200 rounded-full text-xs text-orange-800">{s}</span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-3">Experience</h2>
                <div className="space-y-3">
                  {experience.map((exp, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-neutral-600">{exp.year}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-neutral-900">{exp.title}</p>
                        <p className="text-xs text-neutral-600">{exp.project} — <span className="font-medium">{exp.company}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-neutral-200 text-center">
                <p className="text-[10px] text-neutral-400">Generated via Auditions Adda · auditionsadda.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          body > *:not(#resume-print-area) { display: none !important; }
          body { background: white !important; }
          #resume-print-area {
            position: fixed !important;
            top: 0; left: 0; right: 0;
            width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 24px !important;
            color: #171717 !important;
            background: white !important;
          }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
