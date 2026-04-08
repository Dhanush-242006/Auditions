import * as React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck, Upload, CheckCircle2, FileText, Camera, Award, Loader2, Plus, X, Star,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

const SKILL_KEY = "auditions_skill_badges";

interface SkillBadge {
  id: string;
  skill: string;
  status: "pending" | "under_review" | "verified";
  uploadedAt: string;
  fileName?: string;
}

function getSkillBadges(): SkillBadge[] {
  try { return JSON.parse(localStorage.getItem(SKILL_KEY) || "[]"); } catch { return []; }
}
function saveSkillBadges(b: SkillBadge[]) {
  localStorage.setItem(SKILL_KEY, JSON.stringify(b));
}

const PRESET_SKILLS = [
  "Classical Dance", "Martial Arts", "Horse Riding", "Singing", "Guitar",
  "Swimming", "Yoga", "Mimicry", "Dialect Coach", "Stage Combat",
  "Method Acting", "Screen Acting", "Voice Acting", "Stunts", "Parkour",
];

const STEPS = [
  {
    id: "identity",
    icon: <Camera className="h-5 w-5" />,
    title: "Identity Verification",
    desc: "Upload a government-issued photo ID (Aadhaar, PAN, Passport)",
    status: "completed",
    uploadLabel: "Re-upload ID",
    accept: "image/*,.pdf",
    hint: "Aadhaar, PAN, Passport — JPG, PNG or PDF",
  },
  {
    id: "selfie",
    icon: <Camera className="h-5 w-5" />,
    title: "Selfie Check",
    desc: "Take a selfie to match with your ID document",
    status: "completed",
    uploadLabel: "Re-upload Selfie",
    accept: "image/*",
    hint: "Clear face photo — JPG or PNG",
  },
  {
    id: "portfolio",
    icon: <FileText className="h-5 w-5" />,
    title: "Portfolio Review",
    desc: "Our team reviews your profile, headshots, and reels",
    status: "in_progress",
    uploadLabel: "Upload Portfolio",
    accept: "image/*,.pdf,.mp4,.mov",
    hint: "Headshots, showreel or resume — JPG, PDF, MP4",
  },
  {
    id: "professional",
    icon: <Award className="h-5 w-5" />,
    title: "Professional Check",
    desc: "Verify your union membership or professional credits (optional)",
    status: "pending",
    uploadLabel: "Upload Documents",
    accept: "image/*,.pdf",
    hint: "Union card, guild membership or credits — JPG or PDF",
  },
];

const BADGES = [
  {
    id: "identity_verified",
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Identity Verified",
    desc: "Your ID has been confirmed",
    earned: true,
    color: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "portfolio_verified",
    icon: <Camera className="h-6 w-6 text-blue-400" />,
    title: "Portfolio Verified",
    desc: "Your media portfolio meets professional standards",
    earned: false,
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "union_member",
    icon: <Award className="h-6 w-6 text-amber-400" />,
    title: "Union Member",
    desc: "Verified union or guild membership",
    earned: false,
    color: "bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "top_talent",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Top Talent",
    desc: "Awarded to the top 5% of active artists",
    earned: false,
    color: "bg-primary/10 border-primary/20",
  },
];

const stepStatus = (s: string) => {
  if (s === "completed") return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 text-xs">Completed</Badge>;
  if (s === "in_progress") return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/20 text-xs">In Progress</Badge>;
  return <Badge className="bg-white/10 text-white/40 border-white/10 text-xs">Pending</Badge>;
};

// Per-step upload state
interface StepUpload {
  uploading: boolean;
  fileName: string | null;
}

export function VerificationBadgePage() {
  const [stepUploads, setStepUploads] = React.useState<Record<string, StepUpload>>(() =>
    Object.fromEntries(STEPS.map(s => [s.id, { uploading: false, fileName: null }]))
  );
  const [skillBadges, setSkillBadges] = React.useState<SkillBadge[]>(() => getSkillBadges());
  const [customSkill, setCustomSkill] = React.useState("");
  const [uploadingSkillId, setUploadingSkillId] = React.useState<string | null>(null);
  const stepFileInputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [pendingSkillId, setPendingSkillId] = React.useState<string | null>(null);
  const [pendingStepId, setPendingStepId] = React.useState<string | null>(null);
  const [pendingAccept, setPendingAccept] = React.useState<string>("*");

  const handleStepUpload = (stepId: string, file: File) => {
    setStepUploads(prev => ({ ...prev, [stepId]: { uploading: true, fileName: null } }));
    setTimeout(() => {
      setStepUploads(prev => ({ ...prev, [stepId]: { uploading: false, fileName: file.name } }));
    }, 1600);
  };

  const triggerStepUpload = (stepId: string, accept: string) => {
    setPendingStepId(stepId);
    setPendingAccept(accept);
    if (stepFileInputRef.current) {
      stepFileInputRef.current.accept = accept;
      stepFileInputRef.current.click();
    }
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || skillBadges.some(b => b.skill.toLowerCase() === trimmed.toLowerCase())) return;
    const badge: SkillBadge = {
      id: Date.now().toString(),
      skill: trimmed,
      status: "pending",
      uploadedAt: new Date().toISOString(),
    };
    const updated = [...skillBadges, badge];
    setSkillBadges(updated);
    saveSkillBadges(updated);
    setCustomSkill("");
  };

  const removeSkill = (id: string) => {
    const updated = skillBadges.filter(b => b.id !== id);
    setSkillBadges(updated);
    saveSkillBadges(updated);
  };

  const handleProofUpload = (id: string, file: File) => {
    setUploadingSkillId(id);
    setTimeout(() => {
      const updated = skillBadges.map(b =>
        b.id === id ? { ...b, status: "under_review" as const, fileName: file.name } : b
      );
      setSkillBadges(updated);
      saveSkillBadges(updated);
      setUploadingSkillId(null);
    }, 1500);
  };

  const skillStatusColor = (s: SkillBadge["status"]) => {
    if (s === "verified") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/20";
    if (s === "under_review") return "bg-amber-500/20 text-amber-400 border-amber-500/20";
    return "bg-white/10 text-white/40 border-white/10";
  };

  const skillStatusLabel = (s: SkillBadge["status"]) => {
    if (s === "verified") return "Verified";
    if (s === "under_review") return "Under Review";
    return "Upload Proof";
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 overflow-x-hidden">
      <Sidebar role="actor" />
      <main className="flex-1 min-w-0 w-full md:ml-64 pt-16 pb-10 px-4 sm:px-6 md:pt-8 md:px-6 lg:px-8 max-w-5xl mx-auto">
        <BackButton />
        <div className="mb-8 min-w-0">
          <h1 className="text-3xl font-bold font-display mb-1">Verification & Badges</h1>
          <p className="text-white/50 text-sm">Build trust and get more audition opportunities by verifying your profile</p>
        </div>

        {/* Current status banner */}
        <Card className="p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 bg-gradient-to-r from-primary/10 to-accent/5">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-lg">Verification in Progress</p>
            <p className="text-white/50 text-sm">Your portfolio review is being processed. Estimated 24–48 hours.</p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-2/3" />
            </div>
            <p className="text-xs text-white/30 mt-1">Step 3 of 4</p>
          </div>
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/20 shrink-0">In Review</Badge>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
          {/* Verification Steps */}
          <div className="min-w-0">
            <h2 className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-4">Verification Steps</h2>

            {/* Hidden shared file input for step uploads */}
            <input
              ref={stepFileInputRef}
              type="file"
              className="hidden"
              accept={pendingAccept}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file && pendingStepId) handleStepUpload(pendingStepId, file);
                e.target.value = "";
              }}
            />

            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const su = stepUploads[step.id];
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Card className={cn("p-4 min-w-0", step.status === "in_progress" && "border-primary/30 bg-primary/5")}>
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                          step.status === "completed" ? "bg-emerald-500/20 text-emerald-400"
                            : step.status === "in_progress" ? "bg-primary/20 text-primary"
                              : "bg-white/10 text-white/30"
                        )}>
                          {step.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : step.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className="font-semibold text-sm min-w-0">{step.title}</p>
                            {stepStatus(step.status)}
                          </div>
                          <p className="text-white/40 text-xs mt-0.5">{step.desc}</p>

                          {/* Upload area — shown for every step */}
                          <div className="mt-3 space-y-2">
                            {/* Uploaded file name */}
                            {su.fileName && (
                              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                                <CheckCircle2 className="h-3 w-3 shrink-0" />
                                <span className="truncate">{su.fileName}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 flex-wrap">
                              <Button
                                size="sm"
                                variant={step.status === "completed" ? "ghost" : "primary"}
                                disabled={su.uploading}
                                onClick={() => triggerStepUpload(step.id, step.accept)}
                                className="text-xs gap-1.5 h-7"
                              >
                                {su.uploading
                                  ? <><Loader2 className="h-3 w-3 animate-spin" /> Uploading…</>
                                  : <><Upload className="h-3 w-3" /> {su.fileName ? "Re-upload" : step.uploadLabel}</>
                                }
                              </Button>
                              <span className="text-[10px] text-white/25 hidden sm:inline">{step.hint}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Badges */}
          <div className="min-w-0">
            <h2 className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-4">Your Badges</h2>
            <div className="space-y-3">
              {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card className={cn("p-4 border min-w-0", badge.earned ? badge.color : "opacity-50")}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", badge.color)}>
                        {badge.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{badge.title}</p>
                        <p className="text-white/40 text-xs">{badge.desc}</p>
                      </div>
                      {badge.earned ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 text-xs shrink-0">Earned</Badge>
                      ) : (
                        <Badge className="bg-white/5 text-white/30 border-white/10 text-xs shrink-0">Locked</Badge>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-4 mt-4 min-w-0 bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="font-semibold text-sm mb-1">Why Get Verified?</h3>
              <ul className="text-xs text-white/60 space-y-1.5 mt-2">
                {[
                  "3x more profile views from casting directors",
                  "Priority placement in search results",
                  "Access to exclusive high-pay auditions",
                  "Build trust with producers and agents",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
        {/* Skill Verification Section */}
        <div className="mt-8">
          <h2 className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <Star className="h-3.5 w-3.5 text-primary" /> Skill Verification Badges
          </h2>
          <Card className="p-5 space-y-5">
            <p className="text-xs text-white/40">Upload a certificate, workshop proof, or video demo for each skill. Verified skills appear as badges on your profile.</p>

            {/* Preset skill chips */}
            <div>
              <p className="text-[10px] uppercase text-white/30 tracking-widest mb-2">Add from common skills</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_SKILLS.filter(s => !skillBadges.some(b => b.skill === s)).map(skill => (
                  <button key={skill} onClick={() => addSkill(skill)}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 hover:border-primary/50 hover:text-primary transition-all">
                    + {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom skill input */}
            <div className="flex gap-2">
              <input
                value={customSkill}
                onChange={e => setCustomSkill(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill(customSkill))}
                placeholder="Enter a custom skill..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
              />
              <Button size="sm" variant="primary" className="gap-1" onClick={() => addSkill(customSkill)}>
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>

            {/* Skill badge list */}
            {skillBadges.length > 0 && (
              <div className="space-y-2">
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*,.pdf,.mp4,.mov"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file && pendingSkillId) handleProofUpload(pendingSkillId, file);
                    e.target.value = "";
                  }}
                />
                {skillBadges.map((badge, i) => (
                  <motion.div key={badge.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <div className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border",
                      badge.status === "verified" ? "bg-emerald-500/5 border-emerald-500/20"
                        : badge.status === "under_review" ? "bg-amber-500/5 border-amber-500/20"
                        : "bg-white/5 border-white/10"
                    )}>
                      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                        badge.status === "verified" ? "bg-emerald-500/20 text-emerald-400"
                          : badge.status === "under_review" ? "bg-amber-500/20 text-amber-400"
                          : "bg-white/10 text-white/40")}>
                        {badge.status === "verified" ? <ShieldCheck className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{badge.skill}</p>
                        {badge.fileName && <p className="text-[10px] text-white/30 truncate">{badge.fileName}</p>}
                      </div>
                      <Badge className={cn("text-[10px] shrink-0", skillStatusColor(badge.status))}>
                        {skillStatusLabel(badge.status)}
                      </Badge>
                      {badge.status === "pending" && (
                        <Button size="sm" variant="ghost" className="text-xs gap-1 shrink-0"
                          disabled={uploadingSkillId === badge.id}
                          onClick={() => { setPendingSkillId(badge.id); fileInputRef.current?.click(); }}>
                          {uploadingSkillId === badge.id
                            ? <Loader2 className="h-3 w-3 animate-spin" />
                            : <Upload className="h-3 w-3" />}
                        </Button>
                      )}
                      <button onClick={() => removeSkill(badge.id)} className="text-white/20 hover:text-red-400 transition-colors shrink-0">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {skillBadges.length === 0 && (
              <p className="text-center text-white/20 text-xs py-4">No skills added yet. Add a skill above to get started.</p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
