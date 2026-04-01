import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  StopCircle,
  Play,
  RotateCcw,
  Upload,
  FileText,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Settings,
  Maximize2,
  CheckCircle2,
  Phone,
  PhoneOff,
  MessageSquare,
  Send,
  Users,
  Wifi,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

export function VirtualAuditionPage() {
  const [mode, setMode] = React.useState<"selftape" | "live">("selftape");
  const [isRecording, setIsRecording] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [recordedVideo, setRecordedVideo] = React.useState<string | null>(null);
  const [activeStep, setActiveStep] = React.useState(1);

  // Live room state
  const [liveConnected, setLiveConnected] = React.useState(false);
  const [liveTimer, setLiveTimer] = React.useState(0);
  const [micOn, setMicOn] = React.useState(true);
  const [camOn, setCamOn] = React.useState(true);
  const [chatMsg, setChatMsg] = React.useState("");
  const [chatLog, setChatLog] = React.useState<{ from: string; text: string }[]>([
    { from: "Director", text: "Hello! Can you hear me? Ready to begin?" },
  ]);
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const startLive = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
      }
    } catch {
      // camera not available — continue in demo mode
    }
    setLiveConnected(true);
    setLiveTimer(0);
  };

  const endLive = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setLiveConnected(false);
    setLiveTimer(0);
    setMicOn(true);
    setCamOn(true);
  };

  React.useEffect(() => {
    let id: any;
    if (liveConnected) id = setInterval(() => setLiveTimer(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [liveConnected]);

  React.useEffect(() => {
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const newLog = [...chatLog, { from: "You", text: chatMsg.trim() }];
    setChatLog(newLog);
    setChatMsg("");
    // Simulated director reply after 1s
    setTimeout(() => {
      const REPLIES = ["Great, please start when ready!", "Could you move slightly closer?", "Excellent expression. Let's try that again.", "Perfect. One more take please."];
      setChatLog(prev => [...prev, { from: "Director", text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }]);
    }, 1000);
  };

  React.useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimer(0);
    setRecordedVideo(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordedVideo("mock-video-url");
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold font-display">Virtual <span className="text-primary">Audition</span></h1>
            </div>
            <p className="text-white/50">Lead Actor - Period Drama | Excel Entertainment</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mode toggle */}
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
              <button onClick={() => setMode("selftape")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "selftape" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}>
                Self-Tape
              </button>
              <button onClick={() => setMode("live")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${mode === "live" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}>
                <Wifi className="h-3.5 w-3.5" /> Live Session
              </button>
            </div>
            {mode === "selftape" && (
              <>
                <Button variant="outline" className="rounded-xl">Save Draft</Button>
                <Button className="rounded-xl px-8" disabled={!recordedVideo}>Submit</Button>
              </>
            )}
          </div>
        </div>

        {/* Live Audition Room */}
        {mode === "live" && (
          <div className="space-y-4 mb-10">
            {!liveConnected ? (
              <Card className="p-10 text-center border-primary/20 bg-primary/5 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Join Live Audition Room</h2>
                <p className="text-white/50 text-sm max-w-sm mx-auto">The casting director is waiting. Your camera and microphone will be activated when you join.</p>
                <Button className="rounded-xl px-10 gap-2" onClick={startLive}>
                  <Phone className="h-4 w-4" /> Join Now
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Video grid */}
                <div className="lg:col-span-2 space-y-3">
                  {/* Director (simulated) */}
                  <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-white/10">
                    <img src="https://picsum.photos/seed/director-live/1200/675" alt="Director"
                      className="w-full h-full object-cover opacity-70" referrerPolicy="no-referrer" />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Casting Director
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-xs text-white font-mono">
                      {String(Math.floor(liveTimer / 60)).padStart(2, "0")}:{String(liveTimer % 60).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Local camera */}
                  <div className="relative h-32 md:h-40 bg-neutral-900 rounded-2xl overflow-hidden border border-white/10">
                    {camOn ? (
                      <video ref={localVideoRef} muted autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                        <VideoOff className="h-8 w-8 text-white/20" />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 text-[10px] text-white">You</div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 py-2">
                    <button onClick={() => setMicOn(m => !m)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 text-red-400"}`}>
                      {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </button>
                    <button onClick={() => setCamOn(c => !c)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${camOn ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 text-red-400"}`}>
                      {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </button>
                    <button onClick={endLive}
                      className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg shadow-red-500/20">
                      <PhoneOff className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Live chat */}
                <div className="flex flex-col bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="p-3 border-b border-white/10 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Live Chat</span>
                  </div>
                  <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-72">
                    {chatLog.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.from === "You" ? "items-end" : "items-start"}`}>
                        <span className="text-[10px] text-white/30 mb-0.5">{msg.from}</span>
                        <div className={`px-3 py-2 rounded-xl text-xs max-w-[85%] ${msg.from === "You" ? "bg-primary/20 text-white" : "bg-white/10 text-white/80"}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-white/10 flex gap-2">
                    <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendChat()}
                      placeholder="Type a message..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
                    <button onClick={sendChat} className="bg-primary rounded-lg px-3 py-2 text-xs text-white hover:bg-primary/80 transition-all">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Self-tape UI (hidden in live mode) */}
        {mode === "selftape" && (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recording Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="outline" className="p-0 overflow-hidden relative aspect-video bg-black border-white/10 shadow-2xl group">
              {/* Camera Mock */}
              {!recordedVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all">
                    <Video className="h-10 w-10 text-white/40" />
                  </div>
                  <p className="text-sm text-white/40">Camera is ready. Position yourself in the center.</p>
                </div>
              ) : (
                <div className="absolute inset-0">
                  <img 
                    src="https://picsum.photos/seed/audition-preview/1200/800" 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="glass" size="icon" className="h-16 w-16 rounded-full shadow-2xl">
                      <Play className="h-8 w-8 fill-white" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Recording Overlay */}
              <AnimatePresence>
                {isRecording && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute top-6 left-6 flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-rose-500 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Rec</span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-xs font-mono text-white">{formatTime(timer)}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-4 border-rose-500/30 rounded-lg animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-6 px-8 py-4 glass rounded-full shadow-2xl">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-white/70 hover:text-white">
                  <Settings className="h-5 w-5" />
                </Button>
                
                {!isRecording ? (
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="rounded-full h-14 w-14 p-0 bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-500/20"
                    onClick={startRecording}
                  >
                    <div className="w-6 h-6 bg-white rounded-full" />
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="rounded-full h-14 w-14 p-0 bg-white hover:bg-white/90 shadow-xl"
                    onClick={stopRecording}
                  >
                    <StopCircle className="h-8 w-8 text-rose-500 fill-rose-500" />
                  </Button>
                )}

                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-white/70 hover:text-white">
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card variant="outline" className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="glass" className="text-[10px]">Max 500MB</Badge>
                </div>
                <div>
                  <h3 className="font-bold">Upload Video</h3>
                  <p className="text-xs text-white/40">Already have a recorded reel? Upload it here.</p>
                </div>
              </Card>

              <Card variant="outline" className="p-6 space-y-4 hover:border-accent/30 transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <RotateCcw className="h-6 w-6 text-accent" />
                  </div>
                  <Badge variant="glass" className="text-[10px]">Unlimited</Badge>
                </div>
                <div>
                  <h3 className="font-bold">Retake Audition</h3>
                  <p className="text-xs text-white/40">Not happy with the result? Try again as many times as you want.</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar: Script & Instructions */}
          <div className="space-y-8">
            <Card variant="glass" className="p-6 space-y-6 max-h-[600px] flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Script Panel</span>
                </h3>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
                  <span className="text-xs font-bold">1 / 4</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                <div className="space-y-2">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Scene 1: The Confrontation</p>
                  <p className="text-sm font-bold text-white/90">Character: ARJUN (Lead)</p>
                </div>
                
                <div className="space-y-4 text-sm leading-relaxed">
                  <p className="italic text-white/40">(Arjun enters the room, breathless. He looks at the desk, then at the window.)</p>
                  
                  <div className="space-y-1">
                    <p className="font-bold text-primary">ARJUN</p>
                    <p className="text-white/80">"I thought I could leave it all behind. But the shadows... they follow you. Mumbai isn't just a city, it's a graveyard of dreams."</p>
                  </div>

                  <p className="italic text-white/40">(He pauses, clenching his fists.)</p>

                  <div className="space-y-1">
                    <p className="font-bold text-primary">ARJUN</p>
                    <p className="text-white/80">"Tell them I'm not coming back. Tell them the Arjun they knew died in that fire. This is someone else."</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> Est. Time: 2:30 mins</span>
                  <span className="flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> Emotional Intensity: High</span>
                </div>
              </div>
            </Card>

            <Card variant="outline" className="p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Instructions</h3>
              <ul className="space-y-3">
                {[
                  "Ensure good lighting on your face.",
                  "Use a neutral background if possible.",
                  "Keep the camera at eye level.",
                  "State your name and age before starting.",
                  "Record in landscape mode (16:9)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
