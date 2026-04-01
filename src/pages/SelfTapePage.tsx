import * as React from "react";
import { motion } from "motion/react";
import {
  Video, Upload, Play, Pause, RotateCcw, CheckCircle2,
  Clock, AlertCircle, FileText, Mic, MicOff, Camera, CameraOff,
  X, ChevronRight, Send, Star, Info, Download
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

const AUDITION_REQUESTS = [
  {
    id: "1",
    title: "Lead Actor - Period Drama",
    company: "Excel Entertainment",
    deadline: "Mar 15, 2026",
    status: "pending",
    script: `SCENE 1 - INT. ROYAL PALACE - DAY\n\nRAJA VIKRAM stands at the window.\n\nRAJA VIKRAM: Tell me, Mantri... what does a king owe his people?\n\nMANTRI: Everything, my lord. And nothing.\n\nRAJA VIKRAM: Then let them know - I choose everything.`,
    instructions: "Record in good lighting. Wear neutral clothing. 2 minutes max.",
    category: "Feature Film",
  },
  {
    id: "2",
    title: "Voice Over - Animation",
    company: "Disney India",
    deadline: "Mar 20, 2026",
    status: "submitted",
    script: `CHARACTER: BHOOMI\n\nBHOOMI: (warmly) Little one, the forest has many secrets... but the greatest secret is believing in yourself.`,
    instructions: "Audio only. Clear microphone. Natural voice.",
    category: "Voice Over",
  },
  {
    id: "3",
    title: "TV Commercial",
    company: "Ogilvy & Mather",
    deadline: "Mar 10, 2026",
    status: "reviewed",
    script: `WOMAN: (to camera, warm smile)\nEvery morning, I choose to let my skin breathe.\n(final smile)\nGlow Naturally. Be You.`,
    instructions: "30 seconds. Natural look. No heavy makeup.",
    category: "Commercial",
  },
];

const TIPS = [
  { icon: <Camera className="h-4 w-4 text-primary" />, tip: "Frame yourself from mid-chest up, centered in frame" },
  { icon: <Mic className="h-4 w-4 text-accent" />, tip: "Record in a quiet space — audio quality matters as much as video" },
  { icon: <Star className="h-4 w-4 text-amber-400" />, tip: "Do a slate: say your name, age, and role you're auditioning for" },
  { icon: <FileText className="h-4 w-4 text-emerald-400" />, tip: "Read the script multiple times before recording" },
];

const statusBadge = (s: string) => {
  if (s === "submitted") return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20">Submitted</Badge>;
  if (s === "reviewed") return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">Under Review</Badge>;
  return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/20">Pending</Badge>;
};

export function SelfTapePage() {
  const [selected, setSelected] = React.useState(AUDITION_REQUESTS[0]);
  const [recording, setRecording] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [micOn, setMicOn] = React.useState(true);
  const [camOn, setCamOn] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = () => {
    setRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
  };

  const stopRecording = () => {
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSubmit = () => {
    setUploading(true);
    setTimeout(() => { setUploading(false); setSubmitted(true); }, 1800);
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex min-h-screen bg-neutral-950 overflow-x-hidden">
      <Sidebar role="actor" />
      {/* Sidebar is fixed: offset main so content is not hidden behind it */}
      <main className="flex-1 min-w-0 w-full md:ml-64 pt-16 pb-10 px-4 sm:px-6 md:pt-8 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <BackButton />
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-1">Self-Tape Studio</h1>
          <p className="text-white/50 text-sm">Record and submit your auditions directly from your browser</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-w-0">
          {/* Left: Audition Requests */}
          <div className="space-y-3 min-w-0">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Audition Requests</h2>
            {AUDITION_REQUESTS.map(a => (
              <button
                key={a.id}
                onClick={() => { setSelected(a); setSubmitted(false); setRecording(false); setTimer(0); }}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all",
                  selected.id === a.id
                    ? "bg-primary/10 border-primary/40"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-medium text-sm">{a.title}</p>
                  {statusBadge(a.status)}
                </div>
                <p className="text-white/50 text-xs">{a.company}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock className="h-3 w-3 text-white/30" />
                  <span className="text-xs text-white/30">Deadline: {a.deadline}</span>
                </div>
              </button>
            ))}

            {/* Tips */}
            <Card className="p-4 mt-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> Self-Tape Tips
              </h3>
              <div className="space-y-2.5">
                {TIPS.map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {t.icon}
                    <p className="text-xs text-white/60">{t.tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Recording Studio */}
          <div className="xl:col-span-2 space-y-4 min-w-0">
            <Card className="p-4 sm:p-5 overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-lg">{selected.title}</h2>
                  <p className="text-white/50 text-sm">{selected.company} · {selected.category}</p>
                </div>
                {statusBadge(selected.status)}
              </div>

              {/* Script */}
              <div className="bg-black/40 rounded-xl p-4 mb-4">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Audition Script
                </p>
                <pre className="text-sm text-white/80 whitespace-pre-wrap break-words font-sans leading-relaxed max-w-full overflow-x-auto">
                  {selected.script}
                </pre>
              </div>

              {/* Instructions */}
              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-5">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200">{selected.instructions}</p>
              </div>

              {/* Camera Preview */}
              <div className="relative bg-neutral-900 rounded-2xl overflow-hidden mb-4 aspect-video flex items-center justify-center">
                {camOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Camera className="h-12 w-12 text-white/20 mx-auto" />
                      <p className="text-white/30 text-sm">Camera preview will appear here</p>
                      <p className="text-white/20 text-xs">(Camera access required in browser)</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <CameraOff className="h-12 w-12 text-white/20" />
                    <p className="text-white/30 text-sm">Camera is off</p>
                  </div>
                )}

                {recording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-bold">REC {fmt(timer)}</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              {!submitted ? (
                <div className="flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMicOn(!micOn)}
                      className={cn("rounded-full", !micOn && "bg-red-500/20 text-red-400")}
                    >
                      {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCamOn(!camOn)}
                      className={cn("rounded-full", !camOn && "bg-red-500/20 text-red-400")}
                    >
                      {camOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                    </Button>
                    {recording && (
                      <Button variant="ghost" size="sm" onClick={() => { stopRecording(); setTimer(0); }} className="rounded-full">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!recording ? (
                      <Button variant="primary" onClick={startRecording} className="gap-2">
                        <Video className="h-4 w-4" /> Start Recording
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className="bg-red-500/20 text-red-400 border-red-500/20 gap-2"
                        onClick={stopRecording}
                      >
                        <Pause className="h-4 w-4" /> Stop Recording
                      </Button>
                    )}
                    {!recording && timer > 0 && (
                      <Button variant="primary" onClick={handleSubmit} disabled={uploading} className="gap-2">
                        {uploading ? (
                          <><Upload className="h-4 w-4 animate-bounce" /> Uploading...</>
                        ) : (
                          <><Send className="h-4 w-4" /> Submit Tape</>
                        )}
                      </Button>
                    )}
                    <div>
                      <label
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
                          "bg-transparent hover:bg-white/5 cursor-pointer transition-colors"
                        )}
                      >
                        <Upload className="h-4 w-4" /> Upload File
                        <input type="file" accept="video/*" className="sr-only" onChange={() => setTimer(30)} />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-6 gap-3"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-lg">Self-Tape Submitted!</h3>
                  <p className="text-white/50 text-sm text-center">Your audition has been submitted to {selected.company}. You'll be notified of the result.</p>
                  <Button variant="ghost" size="sm" onClick={() => setSubmitted(false)}>Record Again</Button>
                </motion.div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
