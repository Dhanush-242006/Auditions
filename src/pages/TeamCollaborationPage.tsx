import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Users, Plus, MessageCircle, CheckCircle2, Clock, Star,
  X, Send, UserPlus, Settings, Trash2, ChevronRight, Bell
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

const TEAM_MEMBERS = [
  { id: "1", name: "Priya Sharma", role: "Lead Casting Director", avatar: "https://picsum.photos/seed/t1/40/40", status: "online", isOwner: true },
  { id: "2", name: "Rahul Gupta", role: "Casting Associate", avatar: "https://picsum.photos/seed/t2/40/40", status: "online", isOwner: false },
  { id: "3", name: "Meera Nair", role: "Production Coordinator", avatar: "https://picsum.photos/seed/t3/40/40", status: "away", isOwner: false },
  { id: "4", name: "Aryan Kapoor", role: "Director", avatar: "https://picsum.photos/seed/t4/40/40", status: "offline", isOwner: false },
];

const SHORTLISTS = [
  { id: "s1", name: "Period Drama - Final 10", candidates: ["Arjun K.", "Priya S.", "Rahul N.", "Deepa I."], updatedAt: "2h ago", comments: 12, approved: 4 },
  { id: "s2", name: "TV Commercial - Round 2", candidates: ["Meera V.", "Karan M.", "Anjali R."], updatedAt: "5h ago", comments: 7, approved: 2 },
];

const ACTIVITY = [
  { id: "1", user: "Rahul Gupta", action: "shortlisted Arjun Kapoor", project: "Period Drama", time: "10m ago", avatar: "https://picsum.photos/seed/t2/32/32" },
  { id: "2", user: "Meera Nair", action: "added comment on Priya Singh", project: "Commercial", time: "1h ago", avatar: "https://picsum.photos/seed/t3/32/32" },
  { id: "3", user: "Priya Sharma", action: "moved 3 candidates to final round", project: "Period Drama", time: "2h ago", avatar: "https://picsum.photos/seed/t1/32/32" },
  { id: "4", user: "Aryan Kapoor", action: "reviewed and approved 2 self-tapes", project: "Web Series", time: "4h ago", avatar: "https://picsum.photos/seed/t4/32/32" },
];

const MESSAGES = [
  { id: "1", from: "Rahul Gupta", text: "I've reviewed the Period Drama submissions. Arjun is top pick.", time: "10:32", avatar: "https://picsum.photos/seed/t2/32/32", own: false },
  { id: "2", from: "You", text: "Agreed! Let's schedule a callback for the top 3.", time: "10:35", avatar: "https://picsum.photos/seed/you/32/32", own: true },
  { id: "3", from: "Meera Nair", text: "I can arrange callbacks for Thursday - does that work?", time: "10:40", avatar: "https://picsum.photos/seed/t3/32/32", own: false },
];

export function TeamCollaborationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<"shortlists" | "messages" | "activity">("shortlists");
  const [msg, setMsg] = React.useState("");
  const [messages, setMessages] = React.useState(MESSAGES);
  const [inviteModal, setInviteModal] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, {
      id: String(Date.now()),
      from: "You",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "https://picsum.photos/seed/you/32/32",
      own: true,
    }]);
    setMsg("");
  };

  const statusColor = (s: string) => {
    if (s === "online") return "bg-emerald-400";
    if (s === "away") return "bg-amber-400";
    return "bg-white/20";
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 overflow-x-hidden">
      <Sidebar role="director" />
      <main className="flex-1 min-w-0 overflow-x-hidden p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <BackButton />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display mb-1">Team Collaboration</h1>
            <p className="text-white/50 text-sm">Work together on casting decisions with your team</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setInviteModal(true)} className="gap-1">
            <UserPlus className="h-4 w-4" /> Invite Member
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Team Members sidebar */}
          <div className="space-y-3">
            <p className="text-xs text-white/40 uppercase tracking-wider">Team Members ({TEAM_MEMBERS.length})</p>
            {TEAM_MEMBERS.map(m => (
              <Card key={m.id} className="p-3 flex items-center gap-3">
                <div className="relative">
                  <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                  <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-neutral-900", statusColor(m.status))} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    {m.isOwner && <Badge className="bg-primary/20 text-primary border-primary/20 text-[10px]">Owner</Badge>}
                  </div>
                  <p className="text-white/40 text-xs truncate">{m.role}</p>
                </div>
              </Card>
            ))}

            {/* Project Stats */}
            <Card className="p-4 mt-2">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">This Week</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Reviewed</span>
                  <span className="font-bold text-white">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shortlisted</span>
                  <span className="font-bold text-emerald-400">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Callbacks</span>
                  <span className="font-bold text-primary">8</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main area */}
          <div className="xl:col-span-3 space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit">
              {(["shortlists", "messages", "activity"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                    activeTab === tab ? "bg-primary text-white" : "text-white/50 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "shortlists" && (
              <div className="space-y-4">
                {SHORTLISTS.map((sl, i) => (
                  <motion.div key={sl.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Card className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-bold">{sl.name}</h3>
                          <p className="text-white/40 text-xs">Updated {sl.updatedAt}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-xs gap-1" onClick={() => navigate("/shortlist-manager")}>
                          <Settings className="h-3 w-3" /> Manage
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {sl.candidates.map(c => (
                          <span key={c} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70">{c}</span>
                        ))}
                        <button className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary border border-primary/20" onClick={() => navigate("/actors")}>+ Add</button>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{sl.comments} comments</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" />{sl.approved} approved</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
                <Button variant="ghost" className="w-full gap-2 border-dashed border-white/10" onClick={() => navigate("/shortlist-manager")}>
                  <Plus className="h-4 w-4" /> New Shortlist
                </Button>
              </div>
            )}

            {activeTab === "messages" && (
              <Card className="p-0 overflow-hidden flex flex-col" style={{ height: 420 }}>
                <div className="p-4 border-b border-white/10 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Team Chat</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-xs ml-1">2 online</Badge>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(m => (
                    <div key={m.id} className={cn("flex gap-3", m.own && "flex-row-reverse")}>
                      <img src={m.avatar} alt={m.from} className="w-8 h-8 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                      <div className={cn("max-w-[75%]", m.own && "items-end flex flex-col")}>
                        {!m.own && <p className="text-xs text-white/40 mb-1">{m.from}</p>}
                        <div className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm",
                          m.own ? "bg-primary text-white rounded-tr-sm" : "bg-white/10 text-white rounded-tl-sm"
                        )}>
                          {m.text}
                        </div>
                        <p className="text-[10px] text-white/30 mt-1">{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/10 flex gap-2">
                  <input
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                    placeholder="Type a message..."
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                  />
                  <Button variant="primary" size="sm" onClick={sendMessage} className="px-3">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === "activity" && (
              <Card className="p-5">
                <h3 className="font-semibold text-sm mb-4">Recent Team Activity</h3>
                <div className="space-y-4">
                  {ACTIVITY.map((a, i) => (
                    <motion.div key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3">
                      <img src={a.avatar} alt={a.user} className="w-8 h-8 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm text-white/80">
                          <span className="font-medium text-white">{a.user}</span> {a.action}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge className="bg-white/5 text-white/40 border-white/5 text-[10px]">{a.project}</Badge>
                          <span className="text-[10px] text-white/30">{a.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Invite Modal */}
      {inviteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setInviteModal(false)}>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Invite Team Member</h3>
              <button onClick={() => setInviteModal(false)}><X className="h-4 w-4 text-white/40" /></button>
            </div>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 mb-3"
              placeholder="Enter email address..."
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
            />
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none mb-4">
              <option>Casting Associate</option>
              <option>Casting Director</option>
              <option>Production Coordinator</option>
              <option>Director</option>
              <option>Viewer (Read Only)</option>
            </select>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1" onClick={() => setInviteModal(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={() => setInviteModal(false)}>
                <Send className="h-4 w-4 mr-1" /> Send Invite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
