import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Video,
  CheckCircle2,
  Clock,
  Star,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  Calendar,
  Mail,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { Sparkles } from "lucide-react";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import { getInvitations, replyToInvitation, markRead, subscribeInvitations, type AuditionInvitation } from "@/src/lib/messaging";
import { NotificationCenter } from "@/src/components/ui/NotificationCenter";

export function ActorDashboard() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [profileProgress, setProfileProgress] = React.useState(85);
  const [dismissedAIBanner, setDismissedAIBanner] = React.useState(() => {
    try { return localStorage.getItem("ai_banner_dismissed") === "1"; } catch { return false; }
  });
  const [invitations, setInvitations] = React.useState<AuditionInvitation[]>(() => getInvitations());
  const [openInvite, setOpenInvite] = React.useState<AuditionInvitation | null>(null);
  const [replyText, setReplyText] = React.useState("");
  const [replySent, setReplySent] = React.useState(false);

  React.useEffect(() => {
    return subscribeInvitations(() => setInvitations(getInvitations()));
  }, []);

  const handleOpenInvite = (inv: AuditionInvitation) => {
    markRead(inv.id);
    setInvitations(getInvitations());
    setOpenInvite(inv);
    setReplyText("");
    setReplySent(false);
  };

  const handleSendReply = () => {
    if (!openInvite || !replyText.trim()) return;
    replyToInvitation(openInvite.id, replyText.trim());
    setInvitations(getInvitations());
    setReplySent(true);
  };

  const unread = invitations.filter(i => !i.read).length;

  const stats = [
    { label: "Applications", value: "24", icon: <Video className="h-5 w-5 text-primary" />, trend: "+3 this week", href: "/submissions" },
    { label: "Shortlisted", value: "8", icon: <Star className="h-5 w-5 text-amber-500" />, trend: "+1 this week", href: "/submissions" },
    { label: "Profile Views", value: "1.2K", icon: <TrendingUp className="h-5 w-5 text-emerald-500" />, trend: "+15% vs last month", href: "/profile" },
    { label: "Match Score", value: "92%", icon: <Zap className="h-5 w-5 text-accent" />, trend: "Top 5% in Mumbai", href: "/auditions" },
  ];

  const recommendations = [
    { id: "1", title: "Lead Actor - Period Drama", company: "Excel Entertainment", location: "Mumbai", match: 98, type: "Feature Film", image: "https://picsum.photos/seed/rec1/200/200" },
    { id: "2", title: "Supporting Actress - Web Series", company: "Amazon Prime Video", location: "Hyderabad", match: 85, type: "Web Series", image: "https://picsum.photos/seed/rec2/200/200" },
    { id: "3", title: "Dancer - Music Video", company: "T-Series", location: "Mumbai", match: 92, type: "Music Video", image: "https://picsum.photos/seed/rec3/200/200" }
  ];

  const recentSubmissions = [
    { id: "1", title: "Lead Actor - Period Drama", status: "Shortlisted", date: "2 days ago" },
    { id: "2", title: "Commercial - Skincare Brand", status: "Applied", date: "5 days ago" },
    { id: "3", title: "Voice Over - Animation", status: "Rejected", date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <Sidebar />

      <main className="flex-grow md:ml-64 p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display">Welcome back, <span className="text-primary">{user.firstName ?? "User"}</span> 👋</h1>
            <p className="text-white/50 text-sm">You have 3 new notifications and 5 recommended auditions.</p>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <div className="flex items-center space-x-3 pl-4 border-l border-white/10 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/profile")}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.name ?? "User"}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center justify-end">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Verified
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-white/10">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-lg font-bold text-primary">{(user.firstName ?? "U")[0]}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {!dismissedAIBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5 border border-primary/20 p-5 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Your AI Casting Assistant is ready!</p>
                <p className="text-xs text-white/50 mt-0.5">Get personalized profile tips, cover letters, and audition coaching powered by Gemini AI.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
              <Button size="sm" className="rounded-full shadow-lg shadow-primary/20 text-xs" onClick={() => navigate("/ai-assistant")}>
                Try it free
              </Button>
              <button onClick={() => { setDismissedAIBanner(true); localStorage.setItem("ai_banner_dismissed", "1"); }} className="text-white/30 hover:text-white/60 transition-colors text-xs">✕</button>
            </div>
          </motion.div>
        )}

        <Card variant="glass" className="relative overflow-hidden border-primary/20 bg-primary/5">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">Complete your profile</h3>
                <span className="text-primary font-bold">{profileProgress}%</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${profileProgress}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-gradient-to-r from-primary to-accent h-full rounded-full" />
              </div>
              <p className="text-sm text-white/50">
                Add your latest video reel to reach <span className="text-white font-bold">100%</span> and get <span className="text-emerald-500 font-bold">3x more visibility</span>.
              </p>
            </div>
            <Button size="lg" className="rounded-xl shadow-2xl shadow-primary/40" onClick={() => navigate("/profile")}>
              Update Profile
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32" />
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} variant="outline" className="p-6 space-y-4 hover:border-white/20 transition-all group cursor-pointer" onClick={() => navigate(stat.href)}>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {stat.icon}
                </div>
                <Badge variant="glass" className="bg-white/5 border-none text-[10px]">{stat.trend}</Badge>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Smart AI Recommendations</span>
              </h2>
              <Link to="/auditions" className="text-xs text-primary font-bold hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <Card key={rec.id} variant="outline" className="p-4 flex items-center gap-6 group hover:border-primary/30 transition-all cursor-pointer" onClick={() => navigate("/auditions")}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={rec.image} alt={rec.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px] px-2 py-0">{rec.type}</Badge>
                      <Badge variant="glass" className="bg-primary text-white border-none text-[10px]">{rec.match}% Match</Badge>
                    </div>
                    <h4 className="font-bold group-hover:text-primary transition-colors">{rec.title}</h4>
                    <div className="flex items-center space-x-4 text-[10px] text-white/40">
                      <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {rec.location}</span>
                      <span className="flex items-center font-bold text-white/60">{rec.company}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Clock className="h-5 w-5 text-white/40" />
                <span>Recent Submissions</span>
              </h2>
              <Card variant="outline" className="p-0 overflow-hidden divide-y divide-white/5">
                {recentSubmissions.map((sub) => (
                      <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => navigate("/submissions")}>
                        <div className="space-y-1">
                          <p className="text-sm font-bold group-hover:text-primary transition-colors">{sub.title}</p>
                          <p className="text-[10px] text-white/40">{sub.date}</p>
                        </div>
                        <Badge variant={sub.status === "Shortlisted" ? "success" : sub.status === "Applied" ? "secondary" : "destructive"} className="text-[10px]">{sub.status}</Badge>
                      </div>
                ))}
                <div className="p-4 text-center">
                  <Button variant="ghost" size="sm" className="text-xs text-white/40 hover:text-white" onClick={() => navigate("/submissions")}>View All Submissions</Button>
                </div>
              </Card>
            </div>

            {/* Casting Invitations Inbox */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Casting Invitations</span>
                {unread > 0 && (
                  <span className="ml-1 text-xs bg-primary text-white rounded-full px-2 py-0.5 font-bold">{unread} new</span>
                )}
              </h2>
              {invitations.length === 0 ? (
                <Card variant="outline" className="p-6 text-center text-white/30 text-sm">
                  No invitations yet. Casting directors can message you from the Actors Directory.
                </Card>
              ) : (
                <Card variant="outline" className="p-0 overflow-hidden divide-y divide-white/5">
                  {invitations.slice(0, 4).map(inv => (
                    <div
                      key={inv.id}
                      className={`p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-white/5 transition-colors ${!inv.read ? "bg-primary/5" : ""}`}
                      onClick={() => handleOpenInvite(inv)}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-bold truncate ${!inv.read ? "text-white" : "text-white/70"}`}>{inv.auditionTitle}</p>
                          <p className="text-[10px] text-white/40">{inv.directorCompany} · {new Date(inv.sentAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {inv.reply ? (
                          <Badge variant="glass" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px]">Replied</Badge>
                        ) : !inv.read ? (
                          <Badge variant="glass" className="bg-primary/20 text-primary border-none text-[10px]">New</Badge>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-white/40" />
                <span>Upcoming Auditions</span>
              </h2>
              <Card variant="glass" className="p-4 space-y-4 border-accent/20 bg-accent/5">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/auditions")}>
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex flex-col items-center justify-center text-accent">
                    <span className="text-[10px] font-bold uppercase">Mar</span>
                    <span className="text-lg font-bold leading-none">15</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Virtual Audition Deadline</p>
                    <p className="text-xs text-white/50">Lead Actor - Period Drama</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full rounded-lg" onClick={() => navigate("/virtual-audition")}>Prepare Submission</Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Invitation Detail Modal */}
      {openInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setOpenInvite(null)}>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Audition Invitation</h3>
                  <p className="text-xs text-white/40">From {openInvite.directorCompany}</p>
                </div>
              </div>
              <button onClick={() => setOpenInvite(null)} className="text-white/30 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Audition</p>
                  <p className="text-sm font-bold text-white">{openInvite.auditionTitle}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-sm font-bold text-white">{openInvite.role || "—"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-bold text-white">{openInvite.auditionDate ? new Date(openInvite.auditionDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-bold text-white">{openInvite.location || "—"}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Message from {openInvite.directorName}</p>
                <p className="text-sm text-white/80 leading-relaxed">{openInvite.message}</p>
              </div>

              <div className="text-[10px] text-white/30 flex items-center gap-1">
                <Mail className="h-3 w-3" />
                Reply will be sent to {openInvite.directorEmail}
              </div>

              {openInvite.reply ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">Your Reply · {new Date(openInvite.reply.sentAt).toLocaleDateString()}</p>
                  <p className="text-sm text-white/80">{openInvite.reply.message}</p>
                </div>
              ) : replySent ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <p className="text-sm text-emerald-400 font-bold">Reply sent successfully!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Type your reply to the casting director..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 resize-none"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpenInvite(null)}
                      className="flex-1 py-2 rounded-xl border border-white/10 text-white/50 text-sm hover:bg-white/5 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      disabled={!replyText.trim()}
                      onClick={handleSendReply}
                      className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-primary/90 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      Send Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
