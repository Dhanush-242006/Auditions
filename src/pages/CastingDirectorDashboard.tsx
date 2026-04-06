import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Users,
  Eye,
  FileText,
  TrendingUp,
  Filter,
  MoreVertical,
  Star,
  Search,
  BarChart3,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { Input } from "@/src/components/ui/Input";
import { cn } from "@/src/lib/utils";
import { getInvitations, subscribeInvitations, type AuditionInvitation } from "@/src/lib/messaging";
import { NotificationCenter } from "@/src/components/ui/NotificationCenter";

const DATA = [
  { name: "Mon", views: 400, submissions: 240 },
  { name: "Tue", views: 300, submissions: 139 },
  { name: "Wed", views: 200, submissions: 980 },
  { name: "Thu", views: 278, submissions: 390 },
  { name: "Fri", views: 189, submissions: 480 },
  { name: "Sat", views: 239, submissions: 380 },
  { name: "Sun", views: 349, submissions: 430 },
];

export function CastingDirectorDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [chartPeriod, setChartPeriod] = React.useState("7");
  const [sentMessages, setSentMessages] = React.useState<AuditionInvitation[]>(() => getInvitations());
  const [openMsg, setOpenMsg] = React.useState<AuditionInvitation | null>(null);

  React.useEffect(() => {
    return subscribeInvitations(() => setSentMessages(getInvitations()));
  }, []);

  const stats = [
    { label: "Active Auditions", value: "12", icon: <FileText className="h-5 w-5 text-primary" />, trend: "+2 this month", href: "/auditions" },
    { label: "Total Applicants", value: "2.4K", icon: <Users className="h-5 w-5 text-blue-500" />, trend: "+12% vs last month", href: "/actors" },
    { label: "Total Views", value: "45K", icon: <Eye className="h-5 w-5 text-emerald-500" />, trend: "+5% vs last month", href: "/analytics" },
    { label: "Shortlisted", value: "156", icon: <Star className="h-5 w-5 text-amber-500" />, trend: "6.5% conversion", href: "/actors" },
  ];

  const activeAuditions = [
    { id: "1", title: "Lead Actor - Period Drama", applicants: 124, status: "Active", deadline: "15 Mar", views: 1200 },
    { id: "2", title: "Commercial - Skincare Brand", applicants: 450, status: "Active", deadline: "10 Mar", views: 3500 },
    { id: "3", title: "Voice Over - Animation", applicants: 89, status: "Reviewing", deadline: "20 Mar", views: 800 },
  ];

  const recentApplicants = [
    { id: "1", name: "Aryan Khan", role: "Lead Actor", match: 98, image: "https://picsum.photos/seed/app1/100/100" },
    { id: "2", name: "Sara Ali", role: "Lead Actor", match: 95, image: "https://picsum.photos/seed/app2/100/100" },
    { id: "3", name: "Ishaan Khatter", role: "Lead Actor", match: 92, image: "https://picsum.photos/seed/app3/100/100" },
    { id: "4", name: "Janhvi Kapoor", role: "Lead Actor", match: 88, image: "https://picsum.photos/seed/app4/100/100" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar role="director" />

      <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display">Director's <span className="text-primary">Console</span></h1>
            <p className="text-white/50 text-sm">Manage your casting calls and discover top talent with AI insights.</p>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <Button variant="outline" className="rounded-xl" onClick={() => navigate("/analytics")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Full Analytics
            </Button>
            <Button className="rounded-xl shadow-lg shadow-primary/20" onClick={() => navigate("/post-audition")}>
              <Plus className="mr-2 h-5 w-5" />
              Post New Audition
            </Button>
          </div>
        </header>

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
          <Card variant="glass" className="lg:col-span-2 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Submission Trends</span>
              </h3>
              <select className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-1 text-xs focus:outline-none text-white [&>option]:bg-neutral-900" value={chartPeriod} onChange={(e) => setChartPeriod(e.target.value)}>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: "12px" }} itemStyle={{ color: "#fff" }} />
                  <Area type="monotone" dataKey="views" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card variant="outline" className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span>AI Top Matches</span>
              </h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentApplicants.map((app) => (
                <div key={app.id} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                      <img src={app.image} alt={app.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{app.name}</p>
                      <p className="text-[10px] text-white/40">{app.role}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px]">{app.match}% Match</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-xl text-xs" onClick={() => navigate("/actors")}>View All Applicants</Button>
          </Card>
        </div>

        {/* Sent Messages / Replies */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Talent Messages
              {sentMessages.filter(m => m.reply).length > 0 && (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5 font-bold">
                  {sentMessages.filter(m => m.reply).length} repl{sentMessages.filter(m => m.reply).length === 1 ? "y" : "ies"}
                </span>
              )}
            </h2>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate("/actors")}>
              <Mail className="mr-2 h-4 w-4" />
              Send New Invitation
            </Button>
          </div>

          {sentMessages.length === 0 ? (
            <Card variant="outline" className="p-6 text-center text-white/30 text-sm">
              No messages sent yet. Go to <span className="text-primary cursor-pointer" onClick={() => navigate("/actors")}>Applicant DB</span> to invite talent.
            </Card>
          ) : (
            <Card variant="outline" className="p-0 overflow-hidden divide-y divide-white/5">
              {sentMessages.slice(0, 5).map(msg => (
                <div
                  key={msg.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] cursor-pointer transition-colors"
                  onClick={() => setOpenMsg(msg)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-white/40" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{msg.actorName}</p>
                      <p className="text-[10px] text-white/40 truncate">{msg.auditionTitle} · {new Date(msg.sentAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {msg.reply ? (
                    <Badge variant="glass" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px] flex-shrink-0">Replied</Badge>
                  ) : (
                    <Badge variant="glass" className="bg-white/5 text-white/30 border-none text-[10px] flex-shrink-0">Awaiting</Badge>
                  )}
                </div>
              ))}
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Active Casting Calls</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input placeholder="Search auditions..." className="pl-10 h-9 text-xs w-64 rounded-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => setSearchQuery("")}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Card variant="outline" className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Audition Title</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Applicants</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Views</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeAuditions.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map((audition) => (
                    <tr key={audition.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{audition.title}</p>
                        <p className="text-[10px] text-white/40">Feature Film</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{audition.applicants}</span>
                          <Badge variant="glass" className="bg-emerald-500/10 text-emerald-500 border-none text-[10px]">+12 new</Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">{audition.views}</td>
                      <td className="px-6 py-4">
                        <Badge variant={audition.status === "Active" ? "success" : "warning"} className="text-[10px]">{audition.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">{audition.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-white/[0.02] text-center">
              <Button variant="ghost" size="sm" className="text-xs text-white/40 hover:text-white" onClick={() => navigate("/auditions")}>View All Auditions</Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Message Detail Modal */}
      {openMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setOpenMsg(null)}>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h3 className="font-bold text-white">Message to {openMsg.actorName}</h3>
                <p className="text-xs text-white/40">{openMsg.actorEmail} · Sent {new Date(openMsg.sentAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setOpenMsg(null)} className="text-white/30 hover:text-white transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Audition</p>
                  <p className="text-sm font-bold text-white">{openMsg.auditionTitle}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-sm font-bold text-white">{openMsg.role || "—"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-bold text-white">{openMsg.auditionDate ? new Date(openMsg.auditionDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-bold text-white">{openMsg.location || "—"}</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Your Message</p>
                <p className="text-sm text-white/80 leading-relaxed">{openMsg.message}</p>
              </div>
              {openMsg.reply ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Send className="h-3 w-3" /> {openMsg.actorName}'s Reply · {new Date(openMsg.reply.sentAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">{openMsg.reply.message}</p>
                </div>
              ) : (
                <p className="text-sm text-white/30 text-center py-2">Waiting for {openMsg.actorName} to reply...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
