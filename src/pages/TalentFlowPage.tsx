import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ShieldCheck,
  Search,
  Video,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Sparkles,
  Star,
  Play,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";

const STORAGE_KEY = "talent_flow_completed_steps";

function getCompletedSteps(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function markStepComplete(index: number) {
  const current = getCompletedSteps();
  if (!current.includes(index)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, index]));
  }
}

const STEPS = [
  {
    icon: <User className="h-7 w-7" />,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    gradient: "from-primary/20 via-primary/5 to-transparent",
    title: "Build Your Profile",
    subtitle: "Make a great first impression",
    description:
      "Your profile is your digital headshot. Add a professional photo, write a compelling bio, list your skills, training, and past work experience. A complete profile gets 3x more views from casting directors.",
    tips: [
      "Upload a high-quality headshot photo",
      "Write a bio that highlights your strengths",
      "List all relevant skills and languages",
      "Add your training and past credits",
    ],
    action: "Go to My Profile",
    href: "/profile",
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    title: "Get Verified",
    subtitle: "Build trust with casting directors",
    description:
      "A verified badge signals professionalism. Upload your government-issued ID and portfolio documents. Verified talent appears first in search results and receives priority casting invitations.",
    tips: [
      "Upload a valid government ID",
      "Submit professional portfolio samples",
      "Verification is reviewed within 48 hours",
      "Verified profiles get 5x more invitations",
    ],
    action: "Start Verification",
    href: "/verification",
  },
  {
    icon: <Search className="h-7 w-7" />,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    title: "Browse & Apply",
    subtitle: "Find your perfect role",
    description:
      "Explore hundreds of active casting calls filtered by your skills, location, and availability. Use AI-powered matching to find roles you're most likely to land. Apply in seconds with your saved profile.",
    tips: [
      "Use filters to narrow by role type and location",
      "AI match score shows your best opportunities",
      "Apply to roles with a single tap",
      "Set alerts so you never miss a new role",
    ],
    action: "Browse Auditions",
    href: "/auditions",
  },
  {
    icon: <Video className="h-7 w-7" />,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    title: "Record Your Self-Tape",
    subtitle: "Audition from anywhere",
    description:
      "Submit a polished self-tape directly in the app. Get AI-powered coaching on your performance, lighting tips, and script guidance. Stand out with a professional submission without needing a studio.",
    tips: [
      "Record in a well-lit, quiet environment",
      "Follow the provided script or sides exactly",
      "AI coach gives real-time feedback",
      "Submit multiple takes and choose your best",
    ],
    action: "Open Self-Tape Studio",
    href: "/self-tape",
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    title: "Track & Get Discovered",
    subtitle: "Monitor your progress",
    description:
      "Watch your submissions status in real time — from applied to shortlisted to booked. Check your profile views, match score ranking, and respond to casting invitations directly from your dashboard.",
    tips: [
      "Check submissions daily for status updates",
      "Reply promptly to casting invitations",
      "Use AI assistant to strengthen weak spots",
      "Set up alerts for shortlist notifications",
    ],
    action: "View Submissions",
    href: "/submissions",
  },
];

export function TalentFlowPage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>(getCompletedSteps);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const step = STEPS[activeStep];
  const isComplete = completedSteps.includes(activeStep);
  const allDone = completedSteps.length === STEPS.length;

  const goTo = (index: number) => {
    setDirection(index > activeStep ? 1 : -1);
    setActiveStep(index);
  };

  const handleNext = () => {
    if (activeStep < STEPS.length - 1) goTo(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) goTo(activeStep - 1);
  };

  const handleAction = () => {
    markStepComplete(activeStep);
    setCompletedSteps(getCompletedSteps());
    navigate(step.href);
  };

  const handleMarkDone = () => {
    markStepComplete(activeStep);
    setCompletedSteps(getCompletedSteps());
    if (activeStep < STEPS.length - 1) {
      setDirection(1);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>

        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">
                Talent Journey, <span className="text-primary">{user.firstName ?? "Star"}</span>
              </h1>
              <p className="text-white/50 text-sm">
                Follow these 5 steps to get discovered faster.
              </p>
            </div>
          </div>
        </header>

        {/* All-done banner */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/20 p-5 flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Star className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-emerald-400">You're all set!</p>
              <p className="text-sm text-white/50">
                All steps completed. Keep your profile fresh and apply regularly for best results.
              </p>
            </div>
            <Button size="sm" className="ml-auto rounded-full" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Step progress bar */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => {
            const done = completedSteps.includes(i);
            const active = i === activeStep;
            return (
              <React.Fragment key={i}>
                <button
                  onClick={() => goTo(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : done
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">{i + 1}. {s.title.split(" ")[0]}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px ${done ? "bg-emerald-500/30" : "bg-white/10"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Card
                  variant="glass"
                  className={`relative overflow-hidden border ${step.border} p-8 space-y-7`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} pointer-events-none`} />

                  <div className="relative z-10 space-y-5">
                    {/* Step header */}
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center flex-shrink-0 ${step.color}`}>
                        {step.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="glass" className={`${step.bg} ${step.color} border-none text-[10px] font-bold uppercase tracking-widest`}>
                            Step {activeStep + 1} of {STEPS.length}
                          </Badge>
                          {isComplete && (
                            <Badge variant="glass" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px]">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold">{step.title}</h2>
                        <p className={`text-sm font-medium ${step.color}`}>{step.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed">{step.description}</p>

                    {/* Tips */}
                    <div className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full ${step.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <CheckCircle2 className={`h-3 w-3 ${step.color}`} />
                          </div>
                          <p className="text-sm text-white/70">{tip}</p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button size="lg" className="rounded-xl flex-1 shadow-lg" onClick={handleAction}>
                        <Play className="h-4 w-4 mr-2" />
                        {step.action}
                      </Button>
                      {!isComplete && (
                        <Button variant="outline" size="lg" className="rounded-xl" onClick={handleMarkDone}>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark as Done
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-white/40"
                onClick={handlePrev}
                disabled={activeStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <span className="text-xs text-white/30">
                {activeStep + 1} / {STEPS.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-white/40"
                onClick={handleNext}
                disabled={activeStep === STEPS.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Step list sidebar */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest">All Steps</p>
            {STEPS.map((s, i) => {
              const done = completedSteps.includes(i);
              const active = i === activeStep;
              return (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    active
                      ? "border-primary/30 bg-primary/5"
                      : done
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-white/5 bg-white/2 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      done
                        ? "bg-emerald-500/15 text-emerald-400"
                        : active
                        ? "bg-primary/15 text-primary"
                        : "bg-white/5 text-white/30"
                    }`}>
                      {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className={`text-sm font-bold truncate ${active ? "text-white" : done ? "text-white/70" : "text-white/40"}`}>
                        {s.title}
                      </p>
                      <p className="text-[10px] text-white/30 truncate">{s.subtitle}</p>
                    </div>
                    {done && <Badge variant="glass" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px] flex-shrink-0">Done</Badge>}
                    {active && !done && <Badge variant="glass" className="bg-primary/20 text-primary border-none text-[10px] flex-shrink-0">Active</Badge>}
                  </div>
                </motion.button>
              );
            })}

            {/* Progress summary */}
            <Card variant="outline" className="p-4 space-y-3 mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50 font-medium">Overall Progress</span>
                <span className="font-bold text-primary">{Math.round((completedSteps.length / STEPS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(completedSteps.length / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                />
              </div>
              <p className="text-[10px] text-white/30">
                {completedSteps.length} of {STEPS.length} steps completed
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
