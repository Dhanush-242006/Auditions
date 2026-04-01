import * as React from "react";
import { motion } from "motion/react";
import {
  Users, Search, UserPlus, MessageCircle, Star, MapPin,
  Briefcase, CheckCircle2, Filter, X, Send, ChevronRight
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

const PROFESSIONALS = [
  { id: "1", name: "Priya Sharma", role: "Casting Director", company: "Excel Entertainment", location: "Mumbai", projects: 48, connections: 320, verified: true, connected: false, avatar: "https://picsum.photos/seed/p1/80/80", skills: ["Film", "OTT", "Commercial"] },
  { id: "2", name: "Rahul Mehta", role: "Lead Actor", company: "Independent", location: "Delhi", projects: 22, connections: 180, verified: true, connected: true, avatar: "https://picsum.photos/seed/p2/80/80", skills: ["Drama", "Action", "Theatre"] },
  { id: "3", name: "Ananya Kapoor", role: "Talent Agent", company: "CAA India", location: "Mumbai", projects: 67, connections: 510, verified: true, connected: false, avatar: "https://picsum.photos/seed/p3/80/80", skills: ["Bollywood", "OTT", "International"] },
  { id: "4", name: "Vikram Nair", role: "Director", company: "T-Series Films", location: "Hyderabad", projects: 15, connections: 290, verified: false, connected: false, avatar: "https://picsum.photos/seed/p4/80/80", skills: ["Feature Film", "Music Video"] },
  { id: "5", name: "Deepa Iyer", role: "Casting Associate", company: "Dharma Productions", location: "Pune", projects: 31, connections: 155, verified: true, connected: false, avatar: "https://picsum.photos/seed/p5/80/80", skills: ["Drama", "Comedy", "Regional"] },
  { id: "6", name: "Arjun Reddy", role: "Supporting Actor", company: "Independent", location: "Chennai", projects: 18, connections: 240, verified: false, connected: true, avatar: "https://picsum.photos/seed/p6/80/80", skills: ["Tamil Film", "Telugu Film", "Web Series"] },
];

const ACTIVITY = [
  { id: "1", user: "Priya Sharma", action: "posted a new audition for Lead Actor", time: "2h ago", avatar: "https://picsum.photos/seed/p1/40/40" },
  { id: "2", user: "Rahul Mehta", action: "added a new reel to their portfolio", time: "4h ago", avatar: "https://picsum.photos/seed/p2/40/40" },
  { id: "3", user: "Ananya Kapoor", action: "is looking for talent for a web series", time: "6h ago", avatar: "https://picsum.photos/seed/p3/40/40" },
  { id: "4", user: "Vikram Nair", action: "shortlisted 5 actors for their new film", time: "1d ago", avatar: "https://picsum.photos/seed/p4/40/40" },
];

export function NetworkingPage() {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [connections, setConnections] = React.useState<Record<string, boolean>>({
    "2": true, "6": true
  });
  const [msgModal, setMsgModal] = React.useState<string | null>(null);
  const [msgText, setMsgText] = React.useState("");

  const filters = ["all", "Casting Director", "Actor", "Talent Agent", "Director"];

  const filtered = PROFESSIONALS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.role === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex min-h-screen bg-neutral-950 overflow-x-hidden">
      <Sidebar role="actor" />
      {/* Sidebar is fixed — offset main so content is not clipped behind it */}
      <main className="flex-1 min-w-0 w-full md:ml-64 pt-16 pb-10 px-4 sm:px-6 md:pt-8 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <BackButton />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 min-w-0">
          <div>
            <h1 className="text-3xl font-bold font-display mb-1">Networking</h1>
            <p className="text-white/50 text-sm">Connect with industry professionals and grow your career</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Users className="h-4 w-4 text-primary" />
            <span>{Object.values(connections).filter(Boolean).length} connections</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-w-0">
          {/* Main content */}
          <div className="xl:col-span-2 space-y-6 min-w-0">
            {/* Search & Filter */}
            <Card className="p-4 flex flex-col sm:flex-row gap-3 min-w-0">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                  placeholder="Search professionals..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-medium transition-all",
                      filter === f ? "bg-primary text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                    )}
                  >
                    {f === "all" ? "All" : f}
                  </button>
                ))}
              </div>
            </Card>

            {/* Professionals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              {filtered.map((pro, i) => (
                <motion.div
                  key={pro.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="p-5 hover:border-white/20 transition-all min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img src={pro.avatar} alt={pro.name} className="w-14 h-14 rounded-full object-cover" />
                        {pro.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm truncate">{pro.name}</h3>
                        </div>
                        <p className="text-white/50 text-xs">{pro.role}</p>
                        <p className="text-white/40 text-xs">{pro.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-white/30" />
                          <span className="text-white/40 text-xs">{pro.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 my-3 text-xs text-white/40">
                      <span><span className="text-white font-medium">{pro.projects}</span> projects</span>
                      <span><span className="text-white font-medium">{pro.connections}</span> connections</span>
                    </div>

                    <div className="flex gap-1 flex-wrap mb-3">
                      {pro.skills.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/50">{s}</span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={connections[pro.id] ? "ghost" : "primary"}
                        className="flex-1 text-xs"
                        onClick={() => setConnections(prev => ({ ...prev, [pro.id]: !prev[pro.id] }))}
                      >
                        <UserPlus className="h-3 w-3 mr-1" />
                        {connections[pro.id] ? "Connected" : "Connect"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 text-xs"
                        onClick={() => setMsgModal(pro.id)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4 min-w-0">
            <Card className="p-4">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" /> Network Activity
              </h2>
              <div className="space-y-3">
                {ACTIVITY.map(a => (
                  <div key={a.id} className="flex items-start gap-3">
                    <img src={a.avatar} alt={a.user} className="w-8 h-8 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-xs text-white/70"><span className="text-white font-medium">{a.user}</span> {a.action}</p>
                      <p className="text-xs text-white/30 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10">
              <h2 className="font-semibold text-sm mb-2">Grow Your Network</h2>
              <p className="text-white/50 text-xs mb-3">Actors with 50+ connections get 3x more audition offers.</p>
              <Button size="sm" variant="primary" className="w-full text-xs">
                <Users className="h-3 w-3 mr-1" /> Find People You May Know
              </Button>
            </Card>
          </div>
        </div>
      </main>

      {/* Message Modal */}
      {msgModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setMsgModal(null)}>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Send Message</h3>
              <button onClick={() => setMsgModal(null)}><X className="h-4 w-4 text-white/40" /></button>
            </div>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 resize-none h-28"
              placeholder="Write your message..."
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
            />
            <div className="flex gap-2 mt-3">
              <Button variant="ghost" className="flex-1" onClick={() => setMsgModal(null)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={() => { setMsgModal(null); setMsgText(""); }}>
                <Send className="h-4 w-4 mr-1" /> Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
