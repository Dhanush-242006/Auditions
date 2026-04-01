import * as React from "react";
import { motion } from "motion/react";
import {
  Users, Star, CheckCircle2, X, ChevronDown, Filter, Search,
  Mail, Phone, MapPin, Eye, EyeOff, Download, Send, Trash2,
  ArrowUpDown, SlidersHorizontal, UserCheck, Clock, FileText,
  ChevronRight, Award, Sparkles, Loader2, Zap
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

const APPLICANTS = [
  { id: "1", name: "Arjun Kapoor", age: 28, location: "Mumbai", gender: "Male", matchScore: 97, status: "shortlisted" as const, experience: "5 years", category: "Film, Theatre", avatar: "https://picsum.photos/seed/a1/60/60", blurred: false, reelUrl: "#", appliedAt: "2h ago" },
  { id: "2", name: "Priya Singh", age: 24, location: "Delhi", gender: "Female", matchScore: 91, status: "pending" as const, experience: "3 years", category: "Commercial, OTT", avatar: "https://picsum.photos/seed/a2/60/60", blurred: true, reelUrl: "#", appliedAt: "3h ago" },
  { id: "3", name: "Rahul Nair", age: 31, location: "Hyderabad", gender: "Male", matchScore: 88, status: "pending" as const, experience: "7 years", category: "Film, Web Series", avatar: "https://picsum.photos/seed/a3/60/60", blurred: false, reelUrl: "#", appliedAt: "5h ago" },
  { id: "4", name: "Ananya Sharma", age: 22, location: "Chennai", gender: "Female", matchScore: 84, status: "rejected" as const, experience: "1 year", category: "Theatre", avatar: "https://picsum.photos/seed/a4/60/60", blurred: true, reelUrl: "#", appliedAt: "6h ago" },
  { id: "5", name: "Vikram Reddy", age: 35, location: "Bangalore", gender: "Male", matchScore: 79, status: "shortlisted" as const, experience: "10 years", category: "Film, OTT", avatar: "https://picsum.photos/seed/a5/60/60", blurred: false, reelUrl: "#", appliedAt: "1d ago" },
  { id: "6", name: "Deepa Iyer", age: 27, location: "Pune", gender: "Female", matchScore: 76, status: "pending" as const, experience: "4 years", category: "Commercial", avatar: "https://picsum.photos/seed/a6/60/60", blurred: false, reelUrl: "#", appliedAt: "1d ago" },
];

const PROJECTS = [
  { id: "p1", title: "Lead Actor - Period Drama", applicants: 124, shortlisted: 8, deadline: "Mar 15, 2026" },
  { id: "p2", title: "TV Commercial - Skincare", applicants: 450, shortlisted: 15, deadline: "Mar 10, 2026" },
  { id: "p3", title: "Web Series - Supporting", applicants: 89, shortlisted: 5, deadline: "Mar 20, 2026" },
];

type Status = "pending" | "shortlisted" | "callback" | "offer" | "cast" | "rejected";

const STATUS_PIPELINE: { key: Status; label: string; color: string }[] = [
  { key: "pending",    label: "Applied",    color: "bg-amber-500/20 text-amber-400 border-amber-500/20" },
  { key: "shortlisted",label: "Shortlisted",color: "bg-blue-500/20 text-blue-400 border-blue-500/20" },
  { key: "callback",   label: "Callback",   color: "bg-violet-500/20 text-violet-400 border-violet-500/20" },
  { key: "offer",      label: "Offer Sent", color: "bg-primary/20 text-primary border-primary/20" },
  { key: "cast",       label: "Cast",       color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" },
  { key: "rejected",   label: "Rejected",   color: "bg-red-500/20 text-red-400 border-red-500/20" },
];

const statusColor = (s: Status) =>
  STATUS_PIPELINE.find(p => p.key === s)?.color ?? "bg-white/10 text-white/40";

export function ShortlistManagerPage() {
  const [selectedProject, setSelectedProject] = React.useState(PROJECTS[0]);
  const [statuses, setStatuses] = React.useState<Record<string, Status>>(
    Object.fromEntries(APPLICANTS.map(a => [a.id, a.status]))
  );
  const [blurred, setBlurred] = React.useState<Record<string, boolean>>(
    Object.fromEntries(APPLICANTS.map(a => [a.id, a.blurred]))
  );
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("matchScore");
  const [detailId, setDetailId] = React.useState<string | null>(null);

  const [aiScreening, setAiScreening] = React.useState(false);
  const [aiResults, setAiResults] = React.useState<{ id: string; aiScore: number; reason: string }[] | null>(null);

  const runAiScreening = () => {
    setAiScreening(true);
    setAiResults(null);
    setTimeout(() => {
      // Simulate AI scoring: weighted mix of matchScore + experience + location bonus
      const EXPERIENCE_WEIGHTS: Record<string, number> = {
        "10 years": 10, "7 years": 7, "5 years": 5, "4 years": 4, "3 years": 3, "1 year": 1,
      };
      const REASONS = [
        "Strong match on category, experience level, and location proximity.",
        "High experience score with good category alignment.",
        "Profile aligns well with role requirements and availability.",
        "Good potential — category fit is strong but experience is limited.",
        "Partial match; category overlap is moderate.",
        "Below threshold — experience and category gaps detected.",
      ];
      const scored = APPLICANTS.map((a, i) => {
        const expBonus = EXPERIENCE_WEIGHTS[a.experience] ?? 3;
        const locBonus = a.location === "Mumbai" ? 5 : a.location === "Delhi" ? 3 : 0;
        const aiScore = Math.min(100, Math.round(a.matchScore * 0.7 + expBonus * 2 + locBonus));
        return { id: a.id, aiScore, reason: REASONS[i % REASONS.length] };
      }).sort((a, b) => b.aiScore - a.aiScore);
      setAiResults(scored);
      setAiScreening(false);
    }, 2000);
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const bulkAction = (action: Status) => {
    const updates: Record<string, Status> = {};
    selected.forEach(id => { updates[id] = action; });
    setStatuses(prev => ({ ...prev, ...updates }));
    setSelected(new Set());
  };

  // Advance applicant to next pipeline stage (skip "rejected")
  const advanceStage = (id: string) => {
    const FORWARD = ["pending", "shortlisted", "callback", "offer", "cast"] as Status[];
    const cur = statuses[id];
    const idx = FORWARD.indexOf(cur);
    if (idx !== -1 && idx < FORWARD.length - 1) {
      setStatuses(prev => ({ ...prev, [id]: FORWARD[idx + 1] }));
    }
  };

  const pipelineCounts = STATUS_PIPELINE.map(stage => ({
    ...stage,
    count: Object.values(statuses).filter(s => s === stage.key).length,
  }));

  const filtered = APPLICANTS
    .filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.location.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || statuses[a.id] === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => sortBy === "matchScore" ? b.matchScore - a.matchScore : a.name.localeCompare(b.name));

  const detail = detailId ? APPLICANTS.find(a => a.id === detailId) : null;

  return (
    <div className="flex min-h-screen bg-neutral-950 overflow-x-hidden">
      <Sidebar role="director" />
      <main className="flex-1 min-w-0 overflow-x-hidden p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <BackButton />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display mb-1">Shortlist Manager</h1>
            <p className="text-white/50 text-sm">Review and manage applicants with bulk tools</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              className="gap-2"
              onClick={runAiScreening}
              disabled={aiScreening}
            >
              {aiScreening ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              {aiScreening ? "Screening..." : "AI Auto-Screen"}
            </Button>
          {selected.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/50">{selected.size} selected</span>
              <Button size="sm" variant="primary" onClick={() => bulkAction("shortlisted")} className="gap-1">
                <UserCheck className="h-3 w-3" /> Shortlist All
              </Button>
              <Button size="sm" variant="ghost" className="bg-red-500/10 text-red-400 gap-1" onClick={() => bulkAction("rejected")}>
                <X className="h-3 w-3" /> Reject All
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>Clear</Button>
            </div>
          )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Projects sidebar */}
          <div className="space-y-2">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Your Projects</p>
            {PROJECTS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all",
                  selectedProject.id === p.id ? "bg-primary/10 border-primary/40" : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <p className="text-sm font-medium truncate">{p.title}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                  <span>{p.applicants} applied</span>
                  <span className="text-emerald-400">{p.shortlisted} shortlisted</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-white/30" />
                  <span className="text-xs text-white/30">{p.deadline}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main applicant list */}
          <div className="xl:col-span-3 space-y-4">
            {/* Pipeline Stage Bar */}
            <Card className="p-4">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Casting Pipeline</p>
              <div className="flex items-center gap-1 flex-wrap">
                {pipelineCounts.map((stage, i) => (
                  <React.Fragment key={stage.key}>
                    <button
                      onClick={() => setFilterStatus(filterStatus === stage.key ? "all" : stage.key)}
                      className={cn(
                        "flex flex-col items-center px-3 py-2 rounded-xl border transition-all min-w-[70px]",
                        filterStatus === stage.key
                          ? stage.color + " border-current"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      )}
                    >
                      <span className="text-lg font-bold">{stage.count}</span>
                      <span className="text-[10px] text-white/50 leading-tight">{stage.label}</span>
                    </button>
                    {i < pipelineCounts.length - 1 && (
                      <ChevronRight className="h-3 w-3 text-white/20 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Card>

            {/* AI Screening Results */}
            {aiResults && (
              <Card className="p-4 border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Sparkles className="h-4 w-4" /> AI Screening Complete — Ranked by match
                  </div>
                  <button onClick={() => setAiResults(null)} className="text-white/30 hover:text-white/60">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {aiResults.map((r, i) => {
                    const applicant = APPLICANTS.find(a => a.id === r.id);
                    if (!applicant) return null;
                    return (
                      <div key={r.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                        <span className="text-xs text-white/30 w-5 text-center">#{i + 1}</span>
                        <img src={applicant.avatar} alt={applicant.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{applicant.name}</p>
                          <p className="text-[10px] text-white/40 truncate">{r.reason}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-primary font-bold text-sm">{r.aiScore}%</p>
                          <p className="text-[10px] text-white/30">AI Score</p>
                        </div>
                        {i < 3 && (
                          <Button size="sm" variant="primary" className="text-xs gap-1 shrink-0"
                            onClick={() => setStatuses(prev => ({ ...prev, [r.id]: "shortlisted" }))}>
                            <UserCheck className="h-3 w-3" /> Shortlist
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Controls */}
            <Card className="p-3 flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                  placeholder="Search applicants..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="all">All Stages</option>
                {STATUS_PIPELINE.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
              <select
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="matchScore">Sort: Match Score</option>
                <option value="name">Sort: Name</option>
              </select>
              <Button size="sm" variant="ghost" className="gap-1 text-xs" onClick={() => {
                const all = new Set(filtered.map(a => a.id));
                setSelected(all);
              }}>
                Select All
              </Button>
            </Card>

            {/* Applicant cards */}
            <div className="space-y-3">
              {filtered.map((applicant, i) => (
                <motion.div
                  key={applicant.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card className={cn(
                    "p-4 flex flex-wrap items-center gap-4 transition-all",
                    selected.has(applicant.id) && "border-primary/40 bg-primary/5"
                  )}>
                    <input
                      type="checkbox"
                      checked={selected.has(applicant.id)}
                      onChange={() => toggleSelect(applicant.id)}
                      className="w-4 h-4 accent-orange-500"
                    />

                    <div className="relative">
                      {blurred[applicant.id] ? (
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                          <EyeOff className="h-5 w-5 text-white/30" />
                        </div>
                      ) : (
                        <img src={applicant.avatar} alt={applicant.name} className="w-12 h-12 rounded-full object-cover" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">{blurred[applicant.id] ? "Anonymous" : applicant.name}</p>
                        <Badge className={statusColor(statuses[applicant.id])}>{statuses[applicant.id]}</Badge>
                      </div>
                      <p className="text-xs text-white/40 mt-0.5">
                        {applicant.age} yrs · {applicant.gender} · {applicant.location}
                      </p>
                      <p className="text-xs text-white/30">{applicant.experience} · {applicant.category}</p>
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold text-primary">{applicant.matchScore}%</div>
                      <div className="text-xs text-white/40">match</div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="ghost" className="text-xs gap-1"
                        onClick={() => setBlurred(prev => ({ ...prev, [applicant.id]: !prev[applicant.id] }))}>
                        {blurred[applicant.id] ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {blurred[applicant.id] ? "Reveal" : "Blur"}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs" onClick={() => setDetailId(applicant.id)}>
                        <FileText className="h-3 w-3 mr-1" /> View
                      </Button>
                      {/* Advance to next stage — hidden when cast or rejected */}
                      {statuses[applicant.id] !== "cast" && statuses[applicant.id] !== "rejected" && (() => {
                        const FORWARD = ["pending", "shortlisted", "callback", "offer", "cast"] as Status[];
                        const nextIdx = FORWARD.indexOf(statuses[applicant.id]) + 1;
                        const next = STATUS_PIPELINE.find(p => p.key === FORWARD[nextIdx]);
                        return next ? (
                          <Button
                            size="sm"
                            variant="primary"
                            className="text-xs gap-1"
                            onClick={() => advanceStage(applicant.id)}
                          >
                            <ChevronRight className="h-3 w-3" />
                            {next.label}
                          </Button>
                        ) : null;
                      })()}
                      {statuses[applicant.id] === "cast" && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold px-2">
                          <Award className="h-3 w-3" /> Cast
                        </span>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs bg-red-500/10 text-red-400"
                        disabled={statuses[applicant.id] === "rejected"}
                        onClick={() => setStatuses(prev => ({ ...prev, [applicant.id]: "rejected" }))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetailId(null)}>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Applicant Profile</h3>
              <button onClick={() => setDetailId(null)}><X className="h-4 w-4 text-white/40" /></button>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <img src={detail.avatar} alt={detail.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-bold">{detail.name}</p>
                <p className="text-white/50 text-sm">{detail.age} yrs · {detail.gender} · {detail.location}</p>
                <p className="text-white/40 text-xs">{detail.experience} experience</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs">Categories</p>
                <p className="font-medium">{detail.category}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs">Match Score</p>
                <p className="font-bold text-primary text-xl">{detail.matchScore}%</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs">Applied</p>
                <p className="font-medium">{detail.appliedAt}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs">Status</p>
                <Badge className={statusColor(statuses[detail.id])}>{statuses[detail.id]}</Badge>
              </div>
            </div>
            {/* Pipeline advance buttons */}
            <div className="mb-4">
              <p className="text-xs text-white/40 mb-2">Move to stage:</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_PIPELINE.filter(s => s.key !== "rejected").map(stage => (
                  <button
                    key={stage.key}
                    disabled={statuses[detail.id] === stage.key}
                    onClick={() => { setStatuses(prev => ({ ...prev, [detail.id]: stage.key })); }}
                    className={cn(
                      "px-3 py-1 rounded-lg border text-xs font-medium transition-all",
                      statuses[detail.id] === stage.key
                        ? stage.color + " border-current cursor-default"
                        : "bg-white/5 border-white/10 hover:border-white/30 text-white/60"
                    )}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 gap-1 bg-red-500/10 text-red-400" onClick={() => { setStatuses(prev => ({ ...prev, [detail.id]: "rejected" })); setDetailId(null); }}>
                <X className="h-4 w-4" /> Reject
              </Button>
              <Button variant="ghost" className="flex-1" onClick={() => setDetailId(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
