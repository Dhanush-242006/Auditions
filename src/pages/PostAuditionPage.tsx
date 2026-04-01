import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Upload, Calendar, MapPin, Users, FileText, CheckCircle2, ArrowRight, Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";
import { savePostedAudition } from "@/src/lib/postedAuditions";
import { saveSlots, type AuditionSlot } from "@/src/lib/scheduling";
import { saveUserProject } from "@/src/lib/userProjects";
import type { Audition } from "@/src/types";

function formatDeadlineDisplay(isoDate: string): string {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

function mapGenderToAudition(g: string): Audition["gender"] {
  if (g === "Male" || g === "Female" || g === "Any") return g;
  return "Any";
}

export function PostAuditionPage() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [slots, setSlots] = React.useState<{ date: string; time: string; duration: string; location: string }[]>([
    { date: "", time: "", duration: "60", location: "" },
  ]);
  const [form, setForm] = React.useState({
    title: "",
    category: "Feature Film",
    company: "",
    ageRange: "",
    gender: "Male",
    description: "",
    location: "",
    deadline: "",
  });

  const updateForm = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addSlot = () => setSlots(prev => [...prev, { date: "", time: "", duration: "60", location: "" }]);
  const removeSlot = (i: number) => setSlots(prev => prev.filter((_, idx) => idx !== i));
  const updateSlot = (i: number, key: string, value: string) =>
    setSlots(prev => prev.map((s, idx) => idx === i ? { ...s, [key]: value } : s));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? `posted-${crypto.randomUUID()}`
          : `posted-${Date.now()}`;
      const audition: Audition = {
        id,
        title: form.title.trim(),
        company: form.company.trim(),
        location: form.location.trim(),
        category: form.category,
        gender: mapGenderToAudition(form.gender),
        ageRange: form.ageRange.trim() || "Any",
        isPaid: true,
        isVerified: false,
        postedAt: "Just now",
        deadline: formatDeadlineDisplay(form.deadline),
        deadlineIso: form.deadline ? `${form.deadline}T23:59:59` : undefined,
        description: form.description.trim(),
        matchScore: 75,
        applicantsCount: 0,
        viewsCount: 0,
        script: undefined,
      };
      savePostedAudition(audition);

      // Save to My Projects
      saveUserProject({
        id,
        title: form.title.trim(),
        type: form.category,
        status: "Casting",
        statusColor: "primary",
        producer: form.company.trim(),
        director: "",
        location: form.location.trim(),
        description: form.description.trim(),
        deadline: formatDeadlineDisplay(form.deadline),
        ageRange: form.ageRange.trim() || "Any",
        gender: form.gender,
        image: `https://picsum.photos/seed/${id}/400/225`,
        castingProgress: 0,
        totalRoles: 0,
        filledRoles: 0,
        activeAuditions: 1,
        totalApplicants: 0,
        startDate: "Now",
        endDate: formatDeadlineDisplay(form.deadline) || "TBD",
        budget: "TBD",
        createdAt: new Date().toISOString(),
      });

      // Save scheduling slots
      const filledSlots: AuditionSlot[] = slots
        .filter(s => s.date && s.time)
        .map((s, i) => ({
          id: `${id}-slot-${i}`,
          auditionId: id,
          auditionTitle: audition.title,
          date: s.date,
          time: s.time,
          duration: parseInt(s.duration) || 60,
          location: s.location || audition.location,
          isBooked: false,
        }));
      if (filledSlots.length) saveSlots(filledSlots);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-950 flex">
        <Sidebar role="director" />
        <div className="flex-grow md:ml-64 min-w-0 overflow-x-hidden flex items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Audition Published!</h1>
            <p className="text-white/60">Your casting call is now live and being matched with top talent. You'll receive notifications as soon as actors start applying.</p>
            <div className="pt-6 space-y-3">
              <Button onClick={() => navigate("/my-projects")} className="w-full rounded-xl">
                View in My Projects
              </Button>
              <Button variant="outline" onClick={() => navigate("/director-dashboard")} className="w-full rounded-xl">
                Go to Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <Sidebar role="director" />

      <div className="flex-grow md:ml-64 min-w-0 overflow-x-hidden px-6 py-12 space-y-10">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
            <BackButton />
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-display tracking-tight">Post an <span className="text-primary">Audition</span></h1>
              <p className="text-white/50">Reach thousands of verified actors across India.</p>
            </div>

            <div className="flex gap-2 text-xs text-white/40 mb-1">
              {["Basic Info","Role","Logistics","Schedule"].map((label, i) => (
                <span key={label} className={cn("flex-1 text-center", step === i + 1 && "text-primary font-semibold")}>{label}</span>
              ))}
            </div>
            <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 4) * 100}%` }}
                className="absolute top-0 left-0 h-full bg-primary"
              />
            </div>
          </div>
        </div>

        <Card variant="glass" className="p-8 border-white/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Project Title</label>
                    <Input
                      placeholder="e.g. Lead Actor for Period Drama"
                      className="bg-white/5 border-white/10"
                      required
                      value={form.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Project Type</label>
                      <select
                        className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white outline-none focus:border-primary transition-colors"
                        value={form.category}
                        onChange={(e) => updateForm("category", e.target.value)}
                      >
                        <option>Feature Film</option>
                        <option>Web Series</option>
                        <option>Commercial</option>
                        <option>Short Film</option>
                        <option>Music Video</option>
                        <option>Voice Over</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Production House</label>
                      <Input
                        placeholder="e.g. Excel Entertainment"
                        className="bg-white/5 border-white/10"
                        required
                        value={form.company}
                        onChange={(e) => updateForm("company", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Role Details
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Age Range</label>
                      <Input
                        placeholder="e.g. 20-30"
                        className="bg-white/5 border-white/10"
                        required
                        value={form.ageRange}
                        onChange={(e) => updateForm("ageRange", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Gender</label>
                      <select
                        className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white outline-none focus:border-primary transition-colors"
                        value={form.gender}
                        onChange={(e) => updateForm("gender", e.target.value)}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Any</option>
                        <option>Non-binary</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Role Description</label>
                    <textarea
                      className="w-full min-h-[120px] rounded-lg bg-white/5 border border-white/10 p-3 text-sm text-white outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Describe the character and requirements..."
                      required
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Logistics & Deadline
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                        <Input
                          placeholder="Mumbai, Delhi, etc."
                          className="pl-10 bg-white/5 border-white/10"
                          required
                          value={form.location}
                          onChange={(e) => updateForm("location", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Application Deadline</label>
                      <Input
                        type="date"
                        className="bg-white/5 border-white/10"
                        required
                        value={form.deadline}
                        onChange={(e) => updateForm("deadline", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="p-6 border-2 border-dashed border-white/10 rounded-2xl text-center space-y-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                      <Upload className="h-6 w-6 text-white/40" />
                    </div>
                    <p className="text-sm font-medium">Upload Script or Reference Images</p>
                    <p className="text-xs text-white/30">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Audition Schedule
                  </h2>
                  <span className="text-xs text-white/40">Optional — skip if walk-in</span>
                </div>
                <div className="space-y-3">
                  {slots.map((slot, i) => (
                    <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40">Date</label>
                        <Input type="date" className="bg-white/5 border-white/10 text-xs" value={slot.date}
                          onChange={e => updateSlot(i, "date", e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40">Time</label>
                        <Input type="time" className="bg-white/5 border-white/10 text-xs" value={slot.time}
                          onChange={e => updateSlot(i, "time", e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40">Duration (min)</label>
                        <select className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-xs text-white outline-none"
                          value={slot.duration} onChange={e => updateSlot(i, "duration", e.target.value)}>
                          <option value="30">30 min</option>
                          <option value="45">45 min</option>
                          <option value="60">60 min</option>
                          <option value="90">90 min</option>
                        </select>
                      </div>
                      <div className="space-y-1 flex gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] uppercase tracking-widest text-white/40">Venue</label>
                          <Input placeholder="Studio / link" className="bg-white/5 border-white/10 text-xs" value={slot.location}
                            onChange={e => updateSlot(i, "location", e.target.value)} />
                        </div>
                        {slots.length > 1 && (
                          <button type="button" onClick={() => removeSlot(i)} className="mt-6 text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="ghost" className="w-full border-dashed border-white/20 border text-xs gap-1" onClick={addSlot}>
                    <Plus className="h-3.5 w-3.5" /> Add Another Slot
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <Button type="button" variant="ghost" onClick={() => step > 1 && setStep(step - 1)} className={cn(step === 1 && "invisible")}>
                Previous
              </Button>
              <Button type="submit" className="rounded-xl px-8">
                {step === 4 ? "Publish Audition" : "Next Step"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
