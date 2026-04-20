import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users, ShieldCheck, AlertTriangle, BarChart3, Settings, Search,
  Filter, MoreVertical, CheckCircle2, XCircle, Flag, TrendingUp,
  ArrowUpRight, ArrowDownRight, UserPlus, FileCheck, Film, Eye,
  Briefcase, Bell, Star, Trash2, Ban, Edit3, Download, RefreshCw,
  ToggleLeft, ToggleRight, Mail, Globe, Lock, Zap, Award, Calendar,
  MessageSquare, Activity, DollarSign, Target, PieChart as PieChartIcon,
  ChevronDown, ChevronUp, X, Send, MapPin, Trophy, Link2, Megaphone,
  Crown, Layers, CheckCheck, Clock, ExternalLink,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend,
} from "recharts";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { cn } from "@/src/lib/utils";
import { useNavigate } from "react-router-dom";

/* ── Palette ── */
const C = { teal: "#0D9488", violet: "#8b5cf6", emerald: "#10b981", amber: "#f59e0b", rose: "#e11d48", blue: "#3b82f6" };

/* ── Mock data ── */
const GROWTH_DATA = [
  { month: "Oct", actors: 38000, directors: 3800, revenue: 8200000 },
  { month: "Nov", actors: 40500, directors: 4100, revenue: 9100000 },
  { month: "Dec", actors: 42000, directors: 4400, revenue: 9800000 },
  { month: "Jan", actors: 43500, directors: 4600, revenue: 10500000 },
  { month: "Feb", actors: 44800, directors: 4800, revenue: 11200000 },
  { month: "Mar", actors: 45000, directors: 5000, revenue: 12400000 },
];

const ACTIVITY_DATA = [
  { day: "Mon", auditions: 45, applications: 320, views: 1200 },
  { day: "Tue", auditions: 52, applications: 410, views: 1580 },
  { day: "Wed", auditions: 38, applications: 280, views: 980 },
  { day: "Thu", auditions: 61, applications: 490, views: 1820 },
  { day: "Fri", auditions: 74, applications: 620, views: 2340 },
  { day: "Sat", auditions: 55, applications: 440, views: 1650 },
  { day: "Sun", auditions: 32, applications: 210, views: 870 },
];

const USER_PIE = [
  { name: "Actors", value: 45000 },
  { name: "Directors", value: 5000 },
  { name: "Admins", value: 120 },
];
const PIE_COLORS = [C.teal, C.violet, C.emerald];

const USERS = [
  { id: "u1", name: "Priya Sharma",  email: "priya@email.com",  role: "Actor",    joined: "Jan 2025", status: "Active",   verified: true,  auditions: 12, rating: 4.8 },
  { id: "u2", name: "Arjun Mehta",   email: "arjun@email.com",  role: "Actor",    joined: "Feb 2025", status: "Active",   verified: true,  auditions: 8,  rating: 4.6 },
  { id: "u3", name: "Karan Johar",   email: "karan@email.com",  role: "Director", joined: "Nov 2024", status: "Active",   verified: true,  auditions: 34, rating: 4.9 },
  { id: "u4", name: "Ranbir Kapoor", email: "ranbir@email.com", role: "Actor",    joined: "Mar 2025", status: "Pending",  verified: false, auditions: 2,  rating: 0 },
  { id: "u5", name: "Alia Bhatt",    email: "alia@email.com",   role: "Actor",    joined: "Mar 2025", status: "Pending",  verified: false, auditions: 0,  rating: 0 },
  { id: "u6", name: "Zoya Akhtar",   email: "zoya@email.com",   role: "Director", joined: "Dec 2024", status: "Active",   verified: true,  auditions: 18, rating: 4.7 },
  { id: "u7", name: "Vikram Singh",  email: "vikram@email.com", role: "Actor",    joined: "Jan 2025", status: "Suspended",verified: false, auditions: 5,  rating: 3.2 },
  { id: "u8", name: "Kavya Nair",    email: "kavya@email.com",  role: "Actor",    joined: "Feb 2025", status: "Active",   verified: true,  auditions: 9,  rating: 4.5 },
];

const AUDITIONS_DATA = [
  { id: "a1", title: "Lead Actor - Period Drama",       company: "Excel Entertainment",    category: "Feature Film", location: "Mumbai",    applicants: 124, views: 1200, status: "Active",   posted: "2h ago",  deadline: "Mar 15" },
  { id: "a2", title: "Supporting Actress - TV Commercial", company: "Ogilvy & Mather",    category: "Commercial",   location: "Bangalore", applicants: 450, views: 3500, status: "Active",   posted: "5h ago",  deadline: "Mar 10" },
  { id: "a3", title: "Voice Over Artist - Animation",   company: "Disney India",           category: "Voice Over",   location: "Remote",    applicants: 89,  views: 800,  status: "Active",   posted: "1d ago",  deadline: "Mar 20" },
  { id: "a4", title: "Child Actor - Short Film",        company: "Independent Production", category: "Short Film",   location: "Delhi",     applicants: 34,  views: 450,  status: "Review",   posted: "2d ago",  deadline: "Mar 12" },
  { id: "a5", title: "Dancer - Music Video",            company: "T-Series",               category: "Music Video",  location: "Mumbai",    applicants: 230, views: 2100, status: "Active",   posted: "3d ago",  deadline: "Mar 18" },
  { id: "a6", title: "Lead Actress - Web Series",       company: "Amazon Prime Video",     category: "Web Series",   location: "Hyderabad", applicants: 156, views: 1800, status: "Closed",   posted: "4d ago",  deadline: "Mar 5"  },
];

const VERIFICATIONS = [
  { id: "v1", name: "Ranbir Kapoor", type: "Actor",    step: "Identity Verification", submitted: "2h ago",  docs: "Aadhaar Card",         status: "Pending"  },
  { id: "v2", name: "Karan Johar",   type: "Director", step: "Professional Check",   submitted: "5h ago",  docs: "IFTDA Membership",     status: "Reviewing"},
  { id: "v3", name: "Alia Bhatt",    type: "Actor",    step: "Selfie Check",          submitted: "1d ago",  docs: "Selfie Photo",         status: "Pending"  },
  { id: "v4", name: "Zoya Akhtar",   type: "Director", step: "Portfolio Review",      submitted: "2d ago",  docs: "Showreel + Portfolio", status: "Pending"  },
  { id: "v5", name: "Vikram Singh",  type: "Actor",    step: "Identity Verification", submitted: "3d ago",  docs: "PAN Card",             status: "Reviewing"},
  { id: "v6", name: "Kavya Nair",    type: "Actor",    step: "Professional Check",    submitted: "4d ago",  docs: "Union Certificate",    status: "Pending"  },
];

const REPORTS = [
  { id: "r1", content: "Fake Casting Call: Lead Role",      contentId: "#CC-8241", reportedBy: "User #9241", reason: "Fraudulent Listing",  severity: "High",   date: "2h ago",  type: "Audition" },
  { id: "r2", content: "Profile: Explicit Content",         contentId: "#PR-3312", reportedBy: "User #4892", reason: "Inappropriate Content",severity: "High",   date: "4h ago",  type: "Profile"  },
  { id: "r3", content: "Comment: Harassment",               contentId: "#CM-5521", reportedBy: "User #7731", reason: "Harassment/Abuse",    severity: "Medium", date: "6h ago",  type: "Comment"  },
  { id: "r4", content: "Audition: Misleading Pay Info",     contentId: "#CC-9102", reportedBy: "User #2214", reason: "Misleading Info",     severity: "Medium", date: "1d ago",  type: "Audition" },
  { id: "r5", content: "Portfolio: Copyright Violation",    contentId: "#PF-6612", reportedBy: "User #8843", reason: "Copyright Infringement",severity:"Low",    date: "2d ago",  type: "Portfolio"},
];

const ACTIVITY_LOG = [
  { action: "User Verified",       detail: "Priya Sharma — Identity confirmed",  time: "2m ago",  icon: <ShieldCheck className="h-3.5 w-3.5" />, color: C.emerald },
  { action: "Audition Posted",     detail: "Excel Ent. — Lead Actor Period Drama",time: "8m ago",  icon: <Film className="h-3.5 w-3.5" />,        color: C.teal    },
  { action: "Report Resolved",     detail: "#CC-8210 marked as safe",            time: "22m ago", icon: <CheckCircle2 className="h-3.5 w-3.5" />,  color: C.violet  },
  { action: "New Director",        detail: "Sanjay Gupta joined as Director",    time: "1h ago",  icon: <UserPlus className="h-3.5 w-3.5" />,      color: C.blue    },
  { action: "Audition Closed",     detail: "Lead Actress Web Series — expired",  time: "2h ago",  icon: <XCircle className="h-3.5 w-3.5" />,       color: C.amber   },
  { action: "Revenue Milestone",   detail: "₹12.4M MRR achieved",               time: "3h ago",  icon: <DollarSign className="h-3.5 w-3.5" />,    color: C.emerald },
];

const FEATURE_FLAGS = [
  { id: "ff1", name: "AI Casting Assistant",    desc: "GPT-powered casting recommendations",  enabled: true  },
  { id: "ff2", name: "Virtual Auditions",        desc: "Live video audition streaming",         enabled: true  },
  { id: "ff3", name: "Self-Tape Studio",         desc: "In-browser recording tool",             enabled: true  },
  { id: "ff4", name: "Regional Listings",        desc: "Language & region-specific auditions",  enabled: true  },
  { id: "ff5", name: "Talent Flow Analytics",    desc: "Actor journey visualisation",           enabled: false },
  { id: "ff6", name: "Email Digest",             desc: "Weekly email summaries to users",       enabled: true  },
  { id: "ff7", name: "Pay-per-Post for Directors","desc": "Charge directors per audition post", enabled: false },
  { id: "ff8", name: "Push Notifications",       desc: "Browser push notification support",     enabled: true  },
];

const APPLICATIONS_DATA = [
  { id: "ap1", actor: "Priya Sharma",  role: "Actor", audition: "Lead Actor — Period Drama",        company: "Excel Entertainment",    category: "Feature Film", appliedAt: "2h ago",  status: "Applied",  driveLink: "https://drive.google.com/xyz", matchScore: 92 },
  { id: "ap2", actor: "Arjun Mehta",   role: "Actor", audition: "Supporting Actor — TV Commercial", company: "Ogilvy & Mather",        category: "Commercial",   appliedAt: "4h ago",  status: "Callback", driveLink: "",                             matchScore: 78 },
  { id: "ap3", actor: "Kavya Nair",    role: "Actor", audition: "Voice Over Artist — Animation",    company: "Disney India",           category: "Voice Over",   appliedAt: "1d ago",  status: "Offer",    driveLink: "https://drive.google.com/abc", matchScore: 88 },
  { id: "ap4", actor: "Ranbir Kapoor", role: "Actor", audition: "Child Actor — Short Film",         company: "Independent Production", category: "Short Film",   appliedAt: "1d ago",  status: "Applied",  driveLink: "",                             matchScore: 65 },
  { id: "ap5", actor: "Alia Bhatt",    role: "Actor", audition: "Dancer — Music Video",             company: "T-Series",               category: "Music Video",  appliedAt: "2d ago",  status: "Rejected", driveLink: "https://drive.google.com/def", matchScore: 71 },
  { id: "ap6", actor: "Vikram Singh",  role: "Actor", audition: "Lead Role — Web Series",           company: "Amazon Prime Video",     category: "Web Series",   appliedAt: "3d ago",  status: "Cast",     driveLink: "https://drive.google.com/ghi", matchScore: 95 },
];

const INVITATIONS_DATA = [
  { id: "inv1", director: "Karan Johar",  directorCompany: "Dharma Productions",  actor: "Priya Sharma",  audition: "Lead Role — Bollywood Drama",    sentAt: "3h ago", status: "Accepted", auditionDate: "Mar 20", location: "Mumbai"    },
  { id: "inv2", director: "Zoya Akhtar",  directorCompany: "Excel Entertainment", actor: "Arjun Mehta",   audition: "Supporting Actor — Web Series",  sentAt: "6h ago", status: "Pending",  auditionDate: "Mar 22", location: "Mumbai"    },
  { id: "inv3", director: "Karan Johar",  directorCompany: "Dharma Productions",  actor: "Kavya Nair",    audition: "Female Lead — Romance Film",     sentAt: "1d ago", status: "Declined", auditionDate: "Mar 18", location: "Mumbai"    },
  { id: "inv4", director: "Zoya Akhtar",  directorCompany: "Excel Entertainment", actor: "Alia Bhatt",    audition: "Dancer Role — Music Video",      sentAt: "2d ago", status: "Accepted", auditionDate: "Mar 25", location: "Hyderabad" },
  { id: "inv5", director: "Raj Kumar",    directorCompany: "Balaji Telefilms",    actor: "Ranbir Kapoor", audition: "Comic Role — TV Series",         sentAt: "3d ago", status: "Pending",  auditionDate: "Mar 28", location: "Delhi"     },
];

const SKILL_BADGES_DATA = [
  { id: "sb1", actor: "Priya Sharma",  skill: "Classical Dance",          level: "Expert",       experience: "8 years",  submitted: "1d ago", docs: "Natyashastra Certificate.pdf", status: "Pending",   category: "Dance"   },
  { id: "sb2", actor: "Arjun Mehta",   skill: "Method Acting",            level: "Advanced",     experience: "5 years",  submitted: "2d ago", docs: "Lee Strasberg Diploma.pdf",   status: "Pending",   category: "Acting"  },
  { id: "sb3", actor: "Kavya Nair",    skill: "Voice Training",           level: "Intermediate", experience: "3 years",  submitted: "3d ago", docs: "ABRSM Grade 7 Certificate.pdf",status: "Reviewing", category: "Voice"   },
  { id: "sb4", actor: "Vikram Singh",  skill: "Action & Stunts",          level: "Expert",       experience: "10 years", submitted: "4d ago", docs: "ISA Stunt Certification.pdf",  status: "Approved",  category: "Action"  },
  { id: "sb5", actor: "Alia Bhatt",    skill: "Hindi Dialogue Delivery",  level: "Advanced",     experience: "4 years",  submitted: "5d ago", docs: "Workshop Completion.pdf",      status: "Pending",   category: "Acting"  },
  { id: "sb6", actor: "Kavya Nair",    skill: "Bharatanatyam",            level: "Expert",       experience: "12 years", submitted: "6d ago", docs: "Arangetram Certificate.pdf",   status: "Approved",  category: "Dance"   },
];

const CAMPAIGNS_HISTORY = [
  { id: "c1", title: "March Casting Drive",             message: "New wave of 50+ auditions across Feature Films and Web Series.",  audience: "Actors",    type: "Info",    sentAt: "Mar 10", openRate: "68%", sent: 45000 },
  { id: "c2", title: "Director Verification Reminder",  message: "Complete your verification to unlock premium casting features.",  audience: "Directors", type: "Warning", sentAt: "Mar 8",  openRate: "52%", sent: 5000  },
  { id: "c3", title: "Platform Maintenance Notice",     message: "Scheduled maintenance on Mar 15, 2–4 AM IST.",                   audience: "All",       type: "Warning", sentAt: "Mar 6",  openRate: "81%", sent: 50000 },
  { id: "c4", title: "New Feature: Self-Tape Studio",   message: "Record and submit self-tapes directly from your browser.",       audience: "Actors",    type: "Info",    sentAt: "Feb 28", openRate: "74%", sent: 45000 },
];

/* ── Helpers ── */
const severityBadge = (s: string) => {
  if (s === "High")   return <Badge className="text-[10px] bg-rose-500/10 text-rose-400 border-rose-500/20">High</Badge>;
  if (s === "Medium") return <Badge className="text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">Medium</Badge>;
  return <Badge className="text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/20">Low</Badge>;
};
const statusBadge = (s: string) => {
  if (s === "Active")    return <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge>;
  if (s === "Pending")   return <Badge className="text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">Pending</Badge>;
  if (s === "Reviewing") return <Badge className="text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/20">Reviewing</Badge>;
  if (s === "Suspended") return <Badge className="text-[10px] bg-rose-500/10 text-rose-400 border-rose-500/20">Suspended</Badge>;
  if (s === "Closed")    return <Badge className="text-[10px] bg-white/10 text-white/40 border-white/10">Closed</Badge>;
  if (s === "Review")    return <Badge className="text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">Under Review</Badge>;
  return <Badge className="text-[10px] bg-white/10 text-white/40 border-white/10">{s}</Badge>;
};

/* ── Stat Card ── */
function StatCard({ label, value, icon, trend, up, sub }: {
  label: string; value: string; icon: React.ReactNode;
  trend: string; up: boolean; sub?: string;
}) {
  return (
    <Card variant="outline" className="p-5 space-y-3 hover:border-white/20 transition-all group">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <div className={cn("flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
          up ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400")}>
          {up ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{label}</p>
        <h3 className="text-2xl font-bold mt-0.5">{value}</h3>
        {sub && <p className="text-[10px] text-white/30 mt-0.5">{sub}</p>}
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export function AdminPanel() {
  const navigate = useNavigate();

  /* ── Auth guard ── */
  React.useEffect(() => {
    if (localStorage.getItem("adminAuth") !== "true") {
      navigate("/admin-login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login", { replace: true });
  };

  const [activeTab, setActiveTab] = React.useState("overview");
  const [userSearch, setUserSearch] = React.useState("");
  const [userRoleFilter, setUserRoleFilter] = React.useState("All");
  const [auditionSearch, setAuditionSearch] = React.useState("");
  const [reportSearch, setReportSearch] = React.useState("");
  const [verificationSearch, setVerificationSearch] = React.useState("");
  const [featureFlags, setFeatureFlags] = React.useState(FEATURE_FLAGS);
  const [userStatuses, setUserStatuses] = React.useState<Record<string, string>>(
    () => Object.fromEntries(USERS.map(u => [u.id, u.status]))
  );
  const [verificationStatuses, setVerificationStatuses] = React.useState<Record<string, string>>(
    () => Object.fromEntries(VERIFICATIONS.map(v => [v.id, v.status]))
  );
  const [auditionStatuses, setAuditionStatuses] = React.useState<Record<string, string>>(
    () => Object.fromEntries(AUDITIONS_DATA.map(a => [a.id, a.status]))
  );
  const [reportStatuses, setReportStatuses] = React.useState<Record<string, string>>(
    () => Object.fromEntries(REPORTS.map(r => [r.id, "Open"]))
  );
  const [expandedUserId, setExpandedUserId] = React.useState<string | null>(null);

  /* ── Applications tab ── */
  const [appSearch, setAppSearch] = React.useState("");
  const [appStatusFilter, setAppStatusFilter] = React.useState("All");
  const [applicationStatuses, setApplicationStatuses] = React.useState<Record<string, string>>(
    () => Object.fromEntries(APPLICATIONS_DATA.map(a => [a.id, a.status]))
  );

  /* ── Invitations tab ── */
  const [invSearch, setInvSearch] = React.useState("");
  const [invitationStatuses, setInvitationStatuses] = React.useState<Record<string, string>>(
    () => Object.fromEntries(INVITATIONS_DATA.map(i => [i.id, i.status]))
  );

  /* ── Skill Badges tab ── */
  const [badgeSearch, setBadgeSearch] = React.useState("");
  const [badgeCategoryFilter, setBadgeCategoryFilter] = React.useState("All");
  const [badgeStatuses, setBadgeStatuses] = React.useState<Record<string, string>>(
    () => Object.fromEntries(SKILL_BADGES_DATA.map(b => [b.id, b.status]))
  );

  /* ── Campaigns tab ── */
  const [campaignForm, setCampaignForm] = React.useState({ title: "", message: "", audience: "All", type: "Info" });
  const [campaignSent, setCampaignSent] = React.useState(false);
  const [campaignSending, setCampaignSending] = React.useState(false);
  const [sentCampaigns, setSentCampaigns] = React.useState(CAMPAIGNS_HISTORY);
  const submitCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignSending(true);
    setTimeout(() => {
      const audienceCounts: Record<string, number> = { All: 50120, Actors: 45000, Directors: 5000 };
      setSentCampaigns(prev => [{
        id: `c${Date.now()}`, title: campaignForm.title, message: campaignForm.message,
        audience: campaignForm.audience, type: campaignForm.type,
        sentAt: "Just now", openRate: "—", sent: audienceCounts[campaignForm.audience] ?? 50120,
      }, ...prev]);
      setCampaignSent(true);
      setCampaignSending(false);
      setTimeout(() => { setCampaignSent(false); setCampaignForm({ title: "", message: "", audience: "All", type: "Info" }); }, 2000);
    }, 1200);
  };

  /* ── Add Moderator modal ── */
  const [showModModal, setShowModModal] = React.useState(false);
  const [modForm, setModForm] = React.useState({ name: "", email: "", role: "Moderator", permissions: ["users", "auditions"] });
  const [modSuccess, setModSuccess] = React.useState(false);
  const ALL_PERMS = [
    { id: "users",         label: "Manage Users" },
    { id: "auditions",     label: "Manage Auditions" },
    { id: "verifications", label: "Manage Verifications" },
    { id: "reports",       label: "Manage Reports" },
    { id: "analytics",     label: "View Analytics" },
    { id: "settings",      label: "Modify Settings" },
  ];
  const togglePerm = (id: string) =>
    setModForm(f => ({ ...f, permissions: f.permissions.includes(id) ? f.permissions.filter(p => p !== id) : [...f.permissions, id] }));
  const submitModerator = (e: React.FormEvent) => {
    e.preventDefault();
    setModSuccess(true);
    setTimeout(() => { setModSuccess(false); setShowModModal(false); setModForm({ name: "", email: "", role: "Moderator", permissions: ["users", "auditions"] }); }, 1800);
  };

  const TABS = [
    { id: "overview",      label: "Overview",      icon: <BarChart3 className="h-4 w-4" /> },
    { id: "users",         label: "Users",         icon: <Users className="h-4 w-4" /> },
    { id: "auditions",     label: "Auditions",     icon: <Film className="h-4 w-4" /> },
    { id: "verifications", label: "Verifications", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "reports",       label: "Reports",       icon: <Flag className="h-4 w-4" /> },
    { id: "applications",  label: "Applications",  icon: <Briefcase className="h-4 w-4" /> },
    { id: "invitations",   label: "Invitations",   icon: <MessageSquare className="h-4 w-4" /> },
    { id: "badges",        label: "Skill Badges",  icon: <Trophy className="h-4 w-4" /> },
    { id: "campaigns",     label: "Campaigns",     icon: <Megaphone className="h-4 w-4" /> },
    { id: "analytics",     label: "Analytics",     icon: <TrendingUp className="h-4 w-4" /> },
    { id: "settings",      label: "Settings",      icon: <Settings className="h-4 w-4" /> },
  ];

  const stats = [
    { label: "Total Users",          value: "50.1K",  icon: <Users className="h-5 w-5 text-primary" />,        trend: "+2.4%",        up: true,  sub: "45K actors · 5K directors" },
    { label: "Active Auditions",     value: "284",    icon: <Film className="h-5 w-5 text-violet-400" />,       trend: "+12 today",    up: true,  sub: "Across 18 categories" },
    { label: "Total Applications",   value: "18.6K",  icon: <Briefcase className="h-5 w-5 text-blue-400" />,   trend: "+340 today",   up: true,  sub: "From 45K+ talent pool" },
    { label: "Pending Verification", value: "842",    icon: <ShieldCheck className="h-5 w-5 text-amber-400" />, trend: "+15 today",    up: true,  sub: "Avg. review 24–48h" },
    { label: "Reported Content",     value: "12",     icon: <AlertTriangle className="h-5 w-5 text-rose-400" />,trend: "-5 resolved",  up: true,  sub: "5 High · 5 Medium · 2 Low" },
    { label: "Platform Revenue",     value: "₹12.4M", icon: <DollarSign className="h-5 w-5 text-emerald-400" />,trend: "+8.2% MoM",   up: true,  sub: "This month" },
  ];

  /* Filtered data */
  const filteredUsers = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = userRoleFilter === "All" || u.role === userRoleFilter;
    return matchSearch && matchRole;
  });

  const filteredAuditions = AUDITIONS_DATA.filter(a =>
    a.title.toLowerCase().includes(auditionSearch.toLowerCase()) ||
    a.company.toLowerCase().includes(auditionSearch.toLowerCase())
  );

  const filteredVerifications = VERIFICATIONS.filter(v =>
    v.name.toLowerCase().includes(verificationSearch.toLowerCase()) ||
    v.step.toLowerCase().includes(verificationSearch.toLowerCase())
  );

  const filteredReports = REPORTS.filter(r =>
    r.content.toLowerCase().includes(reportSearch.toLowerCase()) ||
    r.reason.toLowerCase().includes(reportSearch.toLowerCase())
  );

  const filteredApplications = APPLICATIONS_DATA.filter(a => {
    const matchSearch = a.actor.toLowerCase().includes(appSearch.toLowerCase()) ||
                        a.audition.toLowerCase().includes(appSearch.toLowerCase());
    const matchStatus = appStatusFilter === "All" || applicationStatuses[a.id] === appStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredInvitations = INVITATIONS_DATA.filter(i =>
    i.director.toLowerCase().includes(invSearch.toLowerCase()) ||
    i.actor.toLowerCase().includes(invSearch.toLowerCase()) ||
    i.audition.toLowerCase().includes(invSearch.toLowerCase())
  );

  const filteredBadges = SKILL_BADGES_DATA.filter(b => {
    const matchSearch = b.actor.toLowerCase().includes(badgeSearch.toLowerCase()) ||
                        b.skill.toLowerCase().includes(badgeSearch.toLowerCase());
    const matchCat = badgeCategoryFilter === "All" || b.category === badgeCategoryFilter;
    return matchSearch && matchCat;
  });

  const toggleFlag = (id: string) =>
    setFeatureFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">

      {/* Top navbar */}
      <nav className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-white/[0.06] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">A</div>
          <span className="font-bold text-sm tracking-wide">Auditions Adda</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-semibold uppercase tracking-wider">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all border border-white/10"
          >
            <X className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </nav>

      <main className="min-w-0 overflow-x-hidden p-4 md:p-8 space-y-6">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-3xl font-bold font-display">Admin <span className="text-primary">Control Center</span></h1>
            <p className="text-white/50 text-sm mt-1">Monitor platform health, manage users, auditions and verifications.</p>
          </div>
          <Button size="sm" onClick={() => setShowModModal(true)} className="rounded-xl gap-1.5 shadow-lg shadow-primary/20">
            <UserPlus className="h-4 w-4" /> Add Moderator
          </Button>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Tab nav */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.id === "reports" && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {Object.values(reportStatuses).filter(s => s === "Open").length}
                </span>
              )}
              {tab.id === "verifications" && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {Object.values(verificationStatuses).filter(s => s === "Pending").length}
                </span>
              )}
              {tab.id === "badges" && Object.values(badgeStatuses).filter(s => s === "Pending").length > 0 && (
                <span className="w-4 h-4 rounded-full bg-violet-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {Object.values(badgeStatuses).filter(s => s === "Pending").length}
                </span>
              )}
              {tab.id === "applications" && Object.values(applicationStatuses).filter(s => s === "Applied").length > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {Object.values(applicationStatuses).filter(s => s === "Applied").length}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ══════════ OVERVIEW ══════════ */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User growth chart */}
                <Card variant="glass" className="lg:col-span-2 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> User Growth (6 Months)</h3>
                    <Badge variant="glass" className="text-[10px]">Monthly</Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={GROWTH_DATA}>
                      <defs>
                        <linearGradient id="actorGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={C.teal}   stopOpacity={0.3} />
                          <stop offset="95%" stopColor={C.teal}   stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="directorGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={C.violet} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={C.violet} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="month" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: 12 }} itemStyle={{ color: "#fff" }} />
                      <Legend wrapperStyle={{ fontSize: 11, color: "#ffffff60" }} />
                      <Area type="monotone" dataKey="actors"    name="Actors"    stroke={C.teal}   fill="url(#actorGrad)"    strokeWidth={2} />
                      <Area type="monotone" dataKey="directors" name="Directors" stroke={C.violet} fill="url(#directorGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                {/* User distribution pie */}
                <Card variant="outline" className="p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> User Distribution</h3>
                  <div className="flex justify-center">
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie data={USER_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                          {USER_PIE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: 12 }} itemStyle={{ color: "#fff" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {USER_PIE.map((e, i) => (
                      <div key={e.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                          <span className="text-white/70">{e.name}</span>
                        </div>
                        <span className="font-bold">{e.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly activity */}
                <Card variant="glass" className="lg:col-span-2 p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Weekly Platform Activity</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={ACTIVITY_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: 12 }} itemStyle={{ color: "#fff" }} />
                      <Legend wrapperStyle={{ fontSize: 11, color: "#ffffff60" }} />
                      <Bar dataKey="auditions"    name="Auditions"    fill={C.teal}   radius={[4,4,0,0]} />
                      <Bar dataKey="applications" name="Applications" fill={C.violet} radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Activity log */}
                <Card variant="outline" className="p-5 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Recent Activity</h3>
                  <div className="space-y-3">
                    {ACTIVITY_LOG.map((log, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: log.color + "22", color: log.color }}>
                          {log.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold">{log.action}</p>
                          <p className="text-[10px] text-white/40 truncate">{log.detail}</p>
                        </div>
                        <span className="text-[10px] text-white/25 shrink-0">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick actions */}
              <Card variant="outline" className="p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
                  {[
                    { label: "Review Verifications", icon: <FileCheck className="h-4 w-4" />, color: C.teal,    tab: "verifications" },
                    { label: "Resolve Reports",       icon: <Flag className="h-4 w-4" />,      color: C.rose,    tab: "reports"       },
                    { label: "Manage Users",          icon: <Users className="h-4 w-4" />,     color: C.violet,  tab: "users"         },
                    { label: "Applications",          icon: <Briefcase className="h-4 w-4" />, color: C.blue,    tab: "applications"  },
                    { label: "Skill Badges",          icon: <Trophy className="h-4 w-4" />,    color: C.amber,   tab: "badges"        },
                    { label: "Send Campaign",         icon: <Megaphone className="h-4 w-4" />, color: C.emerald, tab: "campaigns"     },
                    { label: "Invitations",           icon: <Send className="h-4 w-4" />,      color: C.violet,  tab: "invitations"   },
                    { label: "View Analytics",        icon: <BarChart3 className="h-4 w-4" />, color: C.teal,    tab: "analytics"     },
                  ].map((a, i) => (
                    <button key={i} onClick={() => setActiveTab(a.tab)}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all text-left group">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: a.color + "22", color: a.color }}>
                        {a.icon}
                      </div>
                      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{a.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* ══════════ USERS ══════════ */}
          {activeTab === "users" && (
            <motion.div key="users" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search users by name or email..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
                </div>
                <div className="flex gap-2">
                  {["All", "Actor", "Director"].map(r => (
                    <button key={r} onClick={() => setUserRoleFilter(r)}
                      className={cn("px-4 py-2.5 rounded-xl text-sm font-medium transition-all border",
                        userRoleFilter === r ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-white/50 hover:text-white")}>
                      {r}
                    </button>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5 shrink-0">
                  <Download className="h-3.5 w-3.5" /> Export CSV
                </Button>
              </div>

              <Card variant="outline" className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        {["User", "Role", "Joined", "Auditions", "Rating", "Status", "Verified", "Actions"].map(h => (
                          <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white/40">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredUsers.map((u, i) => (
                        <React.Fragment key={u.id}>
                          <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                            className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                            onClick={() => setExpandedUserId(expandedUserId === u.id ? null : u.id)}>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                  {u.name[0]}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{u.name}</p>
                                  <p className="text-[10px] text-white/40">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5">
                              <Badge className={cn("text-[10px]", u.role === "Director"
                                ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                                : "bg-teal-500/10 text-teal-400 border-teal-500/20")}>
                                {u.role}
                              </Badge>
                            </td>
                            <td className="px-5 py-3.5 text-sm text-white/50">{u.joined}</td>
                            <td className="px-5 py-3.5 text-sm font-bold">{u.auditions}</td>
                            <td className="px-5 py-3.5 text-sm">
                              {u.rating > 0 ? (
                                <span className="flex items-center gap-1 text-amber-400">
                                  <Star className="h-3 w-3 fill-amber-400" />{u.rating}
                                </span>
                              ) : <span className="text-white/20">—</span>}
                            </td>
                            <td className="px-5 py-3.5">{statusBadge(userStatuses[u.id])}</td>
                            <td className="px-5 py-3.5">
                              {u.verified
                                ? <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                : <XCircle className="h-4 w-4 text-white/20" />}
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-white/40 hover:text-white" title="View Profile">
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>
                                {userStatuses[u.id] === "Suspended" ? (
                                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-emerald-400 hover:bg-emerald-500/10"
                                    title="Restore" onClick={e => { e.stopPropagation(); setUserStatuses(p => ({...p, [u.id]: "Active"})); }}>
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                  </Button>
                                ) : (
                                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-amber-400 hover:bg-amber-500/10"
                                    title="Suspend" onClick={e => { e.stopPropagation(); setUserStatuses(p => ({...p, [u.id]: "Suspended"})); }}>
                                    <Ban className="h-3.5 w-3.5" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-rose-400 hover:bg-rose-500/10" title="Remove">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                                {expandedUserId === u.id ? <ChevronUp className="h-3.5 w-3.5 text-white/30" /> : <ChevronDown className="h-3.5 w-3.5 text-white/30" />}
                              </div>
                            </td>
                          </motion.tr>
                          {/* Expanded row */}
                          {expandedUserId === u.id && (
                            <tr className="bg-white/[0.015]">
                              <td colSpan={8} className="px-5 py-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div><p className="text-white/40 text-[10px] uppercase tracking-wider">Email</p><p className="font-medium mt-0.5">{u.email}</p></div>
                                  <div><p className="text-white/40 text-[10px] uppercase tracking-wider">Role</p><p className="font-medium mt-0.5">{u.role}</p></div>
                                  <div><p className="text-white/40 text-[10px] uppercase tracking-wider">Member Since</p><p className="font-medium mt-0.5">{u.joined}</p></div>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="rounded-lg text-xs gap-1.5"><Mail className="h-3 w-3" /> Email User</Button>
                                    <Button size="sm" variant="outline" className="rounded-lg text-xs gap-1.5"><Edit3 className="h-3 w-3" /> Edit Role</Button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 bg-white/[0.02] flex items-center justify-between text-[11px] text-white/30 border-t border-white/5">
                  <span>Showing {filteredUsers.length} of {USERS.length} users</span>
                  <Button variant="ghost" size="sm" className="text-xs text-white/40">Load More</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ══════════ AUDITIONS ══════════ */}
          {activeTab === "auditions" && (
            <motion.div key="auditions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input value={auditionSearch} onChange={e => setAuditionSearch(e.target.value)} placeholder="Search auditions or production companies..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
                </div>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5 shrink-0"><Filter className="h-3.5 w-3.5" /> Filter</Button>
              </div>

              <Card variant="outline" className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        {["Title", "Company", "Category", "Location", "Applicants", "Views", "Status", "Deadline", "Actions"].map(h => (
                          <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white/40 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredAuditions.map((a, i) => (
                        <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                          className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-5 py-3.5">
                            <p className="text-sm font-semibold group-hover:text-primary transition-colors max-w-[200px] truncate">{a.title}</p>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-white/60 whitespace-nowrap">{a.company}</td>
                          <td className="px-5 py-3.5">
                            <Badge variant="glass" className="text-[10px] whitespace-nowrap">{a.category}</Badge>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-white/50 whitespace-nowrap">{a.location}</td>
                          <td className="px-5 py-3.5 text-sm font-bold text-primary">{a.applicants}</td>
                          <td className="px-5 py-3.5 text-sm text-white/50">{a.views.toLocaleString()}</td>
                          <td className="px-5 py-3.5">{statusBadge(auditionStatuses[a.id])}</td>
                          <td className="px-5 py-3.5 text-sm text-white/50 whitespace-nowrap">{a.deadline}</td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-emerald-400 hover:bg-emerald-500/10" title="Approve"
                                onClick={() => setAuditionStatuses(p => ({...p, [a.id]: "Active"}))}>
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-amber-400 hover:bg-amber-500/10" title="Flag for Review"
                                onClick={() => setAuditionStatuses(p => ({...p, [a.id]: "Review"}))}>
                                <Flag className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-rose-400 hover:bg-rose-500/10" title="Remove"
                                onClick={() => setAuditionStatuses(p => ({...p, [a.id]: "Closed"}))}>
                                <XCircle className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 bg-white/[0.02] flex items-center justify-between text-[11px] text-white/30 border-t border-white/5">
                  <span>Showing {filteredAuditions.length} of {AUDITIONS_DATA.length} auditions</span>
                  <Button variant="ghost" size="sm" className="text-xs text-white/40">Load More</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ══════════ VERIFICATIONS ══════════ */}
          {activeTab === "verifications" && (
            <motion.div key="verifications" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              {/* Summary row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Identity",    count: 2, color: C.teal   },
                  { label: "Selfie",      count: 1, color: C.blue   },
                  { label: "Portfolio",   count: 2, color: C.violet  },
                  { label: "Professional",count: 1, color: C.amber  },
                ].map(s => (
                  <Card key={s.label} variant="outline" className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: s.color + "22", color: s.color }}>
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                      <p className="text-xl font-bold">{s.count} <span className="text-xs text-white/30 font-normal">pending</span></p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input value={verificationSearch} onChange={e => setVerificationSearch(e.target.value)} placeholder="Search by name or verification type..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
                </div>
              </div>

              <div className="space-y-3">
                {filteredVerifications.map((v, i) => (
                  <motion.div key={v.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Card variant="outline" className="p-4 flex items-center gap-4 hover:border-white/20 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                        {v.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm">{v.name}</p>
                          <Badge className={cn("text-[10px]", v.type === "Director"
                            ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                            : "bg-teal-500/10 text-teal-400 border-teal-500/20")}>
                            {v.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-white/50 mt-0.5">{v.step} · <span className="text-primary/70">{v.docs}</span></p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-white/30">{v.submitted}</span>
                        {statusBadge(verificationStatuses[v.id])}
                        <Button size="sm" variant="ghost" className="h-8 w-8 rounded-lg text-emerald-400 hover:bg-emerald-500/10"
                          onClick={() => setVerificationStatuses(p => ({...p, [v.id]: "Approved"}))}>
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 rounded-lg text-rose-400 hover:bg-rose-500/10"
                          onClick={() => setVerificationStatuses(p => ({...p, [v.id]: "Rejected"}))}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════════ REPORTS ══════════ */}
          {activeTab === "reports" && (
            <motion.div key="reports" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input value={reportSearch} onChange={e => setReportSearch(e.target.value)} placeholder="Search reports by content or reason..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
                </div>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5 shrink-0"><Filter className="h-3.5 w-3.5" /> Filter by Severity</Button>
              </div>

              <Card variant="outline" className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        {["Reported Content", "Type", "Reported By", "Reason", "Severity", "Date", "Status", "Actions"].map(h => (
                          <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white/40 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredReports.map((r, i) => (
                        <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                          className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-5 py-3.5">
                            <p className="text-sm font-semibold group-hover:text-primary transition-colors max-w-[180px] truncate">{r.content}</p>
                            <p className="text-[10px] text-white/30">{r.contentId}</p>
                          </td>
                          <td className="px-5 py-3.5"><Badge variant="glass" className="text-[10px]">{r.type}</Badge></td>
                          <td className="px-5 py-3.5 text-sm text-white/50">{r.reportedBy}</td>
                          <td className="px-5 py-3.5 text-sm text-white/60 max-w-[140px] truncate">{r.reason}</td>
                          <td className="px-5 py-3.5">{severityBadge(r.severity)}</td>
                          <td className="px-5 py-3.5 text-sm text-white/50 whitespace-nowrap">{r.date}</td>
                          <td className="px-5 py-3.5">
                            {reportStatuses[r.id] === "Resolved"
                              ? <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Resolved</Badge>
                              : <Badge className="text-[10px] bg-rose-500/10 text-rose-400 border-rose-500/20">Open</Badge>}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-emerald-400 hover:bg-emerald-500/10" title="Resolve"
                                onClick={() => setReportStatuses(p => ({...p, [r.id]: "Resolved"}))}>
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-amber-400 hover:bg-amber-500/10" title="Flag">
                                <Flag className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-rose-400 hover:bg-rose-500/10" title="Remove Content">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 bg-white/[0.02] text-[11px] text-white/30 border-t border-white/5">
                  {Object.values(reportStatuses).filter(s => s === "Resolved").length} of {REPORTS.length} reports resolved
                </div>
              </Card>
            </motion.div>
          )}

          {/* ══════════ APPLICATIONS ══════════ */}
          {activeTab === "applications" && (
            <motion.div key="applications" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              {/* Summary chips */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {["All", "Applied", "Callback", "Offer", "Cast"].map(s => {
                  const cnt = s === "All" ? APPLICATIONS_DATA.length : APPLICATIONS_DATA.filter(a => a.status === s).length;
                  const colors: Record<string, string> = { All: C.teal, Applied: C.blue, Callback: C.amber, Offer: C.violet, Cast: C.emerald };
                  return (
                    <button key={s} onClick={() => setAppStatusFilter(s)}
                      className={cn("p-3 rounded-xl border text-left transition-all",
                        appStatusFilter === s ? "border-white/30 bg-white/10" : "border-white/8 bg-white/[0.03] hover:border-white/20")}>
                      <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: colors[s] }}>{s}</p>
                      <p className="text-xl font-bold mt-0.5">{cnt}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input value={appSearch} onChange={e => setAppSearch(e.target.value)} placeholder="Search by actor name or audition title..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
                </div>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5 shrink-0"><Download className="h-3.5 w-3.5" /> Export</Button>
              </div>

              <Card variant="outline" className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>{["Actor", "Audition", "Category", "Applied", "Match", "Drive Link", "Status", "Actions"].map(h => (
                        <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white/40 whitespace-nowrap">{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredApplications.map((a, i) => (
                        <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                          className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs shrink-0">{a.actor[0]}</div>
                              <p className="text-sm font-semibold group-hover:text-primary transition-colors">{a.actor}</p>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-sm font-medium max-w-[200px] truncate">{a.audition}</p>
                            <p className="text-[10px] text-white/40">{a.company}</p>
                          </td>
                          <td className="px-5 py-3.5"><Badge variant="glass" className="text-[10px] whitespace-nowrap">{a.category}</Badge></td>
                          <td className="px-5 py-3.5 text-sm text-white/50 whitespace-nowrap">{a.appliedAt}</td>
                          <td className="px-5 py-3.5">
                            <span className={cn("text-sm font-bold", a.matchScore >= 85 ? "text-emerald-400" : a.matchScore >= 70 ? "text-amber-400" : "text-white/50")}>
                              {a.matchScore}%
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            {a.driveLink
                              ? <a href={a.driveLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                                  className="flex items-center gap-1 text-primary text-xs hover:underline">
                                  <Link2 className="h-3 w-3" /> View
                                </a>
                              : <span className="text-white/20 text-xs">—</span>}
                          </td>
                          <td className="px-5 py-3.5">
                            <select value={applicationStatuses[a.id]}
                              onChange={e => setApplicationStatuses(p => ({...p, [a.id]: e.target.value}))}
                              className="bg-neutral-800 border border-white/10 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-primary/50">
                              {["Applied","Callback","Offer","Cast","Rejected"].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="px-5 py-3.5">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-white/40 hover:text-white" title="View Profile">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 bg-white/[0.02] flex items-center justify-between text-[11px] text-white/30 border-t border-white/5">
                  <span>Showing {filteredApplications.length} of {APPLICATIONS_DATA.length} applications</span>
                  <span className="text-primary/70">{APPLICATIONS_DATA.filter(a => a.driveLink).length} have Drive links attached</span>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ══════════ INVITATIONS ══════════ */}
          {activeTab === "invitations" && (
            <motion.div key="invitations" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Sent",  value: INVITATIONS_DATA.length, color: C.teal,    icon: <Send className="h-4 w-4" />        },
                  { label: "Accepted",    value: INVITATIONS_DATA.filter(i => i.status === "Accepted").length,  color: C.emerald, icon: <CheckCheck className="h-4 w-4" /> },
                  { label: "Pending",     value: INVITATIONS_DATA.filter(i => i.status === "Pending").length,   color: C.amber,   icon: <Clock className="h-4 w-4" />      },
                ].map(s => (
                  <Card key={s.label} variant="outline" className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.color + "22", color: s.color }}>{s.icon}</div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                      <p className="text-2xl font-bold">{s.value}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input value={invSearch} onChange={e => setInvSearch(e.target.value)} placeholder="Search by director, actor or audition..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
              </div>

              <div className="space-y-3">
                {filteredInvitations.map((inv, i) => (
                  <motion.div key={inv.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Card variant="outline" className="p-4 hover:border-white/20 transition-all">
                      <div className="flex items-start gap-4 flex-wrap">
                        {/* Director */}
                        <div className="flex items-center gap-2.5 min-w-[180px]">
                          <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 font-bold text-sm shrink-0">{inv.director[0]}</div>
                          <div>
                            <p className="text-sm font-semibold">{inv.director}</p>
                            <p className="text-[10px] text-white/40">{inv.directorCompany}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/30 shrink-0 mt-2"><Send className="h-3.5 w-3.5" /></div>
                        {/* Actor */}
                        <div className="flex items-center gap-2.5 min-w-[140px]">
                          <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-400 font-bold text-sm shrink-0">{inv.actor[0]}</div>
                          <div>
                            <p className="text-sm font-semibold">{inv.actor}</p>
                            <p className="text-[10px] text-white/40">Actor</p>
                          </div>
                        </div>
                        {/* Audition info */}
                        <div className="flex-1 min-w-[200px]">
                          <p className="text-sm font-medium text-white/80 truncate">{inv.audition}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-white/40 flex items-center gap-1"><Calendar className="h-3 w-3" />{inv.auditionDate}</span>
                            <span className="text-[10px] text-white/40 flex items-center gap-1"><MapPin className="h-3 w-3" />{inv.location}</span>
                            <span className="text-[10px] text-white/30">{inv.sentAt}</span>
                          </div>
                        </div>
                        {/* Status + actions */}
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge className={cn("text-[10px]",
                            invitationStatuses[inv.id] === "Accepted" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            invitationStatuses[inv.id] === "Declined" ? "bg-rose-500/10 text-rose-400 border-rose-500/20"    :
                                                                         "bg-amber-500/10 text-amber-400 border-amber-500/20")}>
                            {invitationStatuses[inv.id]}
                          </Badge>
                          <Button size="sm" variant="ghost" className="h-7 w-7 rounded-lg text-rose-400 hover:bg-rose-500/10" title="Withdraw"
                            onClick={() => setInvitationStatuses(p => ({...p, [inv.id]: "Withdrawn"}))}>
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════════ SKILL BADGES ══════════ */}
          {activeTab === "badges" && (
            <motion.div key="badges" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              {/* Category summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["All", "Acting", "Dance", "Voice", "Action"].map(cat => {
                  const cnt = cat === "All" ? SKILL_BADGES_DATA.length : SKILL_BADGES_DATA.filter(b => b.category === cat).length;
                  const pendingCnt = cat === "All"
                    ? SKILL_BADGES_DATA.filter(b => b.status === "Pending").length
                    : SKILL_BADGES_DATA.filter(b => b.category === cat && b.status === "Pending").length;
                  return (
                    <button key={cat} onClick={() => setBadgeCategoryFilter(cat)}
                      className={cn("p-3 rounded-xl border text-left transition-all",
                        badgeCategoryFilter === cat ? "border-violet-500/40 bg-violet-500/10" : "border-white/8 bg-white/[0.03] hover:border-white/20")}>
                      <p className="text-xs font-bold text-white/60">{cat}</p>
                      <p className="text-xl font-bold mt-0.5">{cnt} <span className="text-[11px] text-white/30 font-normal">total</span></p>
                      {pendingCnt > 0 && <p className="text-[10px] text-amber-400 mt-0.5">{pendingCnt} pending</p>}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input value={badgeSearch} onChange={e => setBadgeSearch(e.target.value)} placeholder="Search by actor name or skill..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50" />
                </div>
              </div>

              <div className="space-y-3">
                {filteredBadges.map((b, i) => (
                  <motion.div key={b.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Card variant="outline" className="p-4 flex items-center gap-4 hover:border-white/20 transition-all flex-wrap">
                      {/* Actor avatar */}
                      <div className="w-11 h-11 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 font-bold shrink-0">{b.actor[0]}</div>
                      {/* Info */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{b.actor}</p>
                          <Badge className="text-[10px] bg-violet-500/10 text-violet-400 border-violet-500/20">{b.category}</Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-white/70"><Trophy className="h-3 w-3 text-amber-400" />{b.skill}</span>
                          <span className="text-[10px] text-white/40">{b.level} · {b.experience}</span>
                        </div>
                      </div>
                      {/* Docs */}
                      <div className="flex items-center gap-1.5 text-xs text-primary/70 min-w-[160px]">
                        <ExternalLink className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-[140px]">{b.docs}</span>
                      </div>
                      {/* Time + status + actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-white/30">{b.submitted}</span>
                        {statusBadge(badgeStatuses[b.id])}
                        {badgeStatuses[b.id] !== "Approved" && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 rounded-lg text-emerald-400 hover:bg-emerald-500/10"
                            title="Approve" onClick={() => setBadgeStatuses(p => ({...p, [b.id]: "Approved"}))}>
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        {badgeStatuses[b.id] !== "Rejected" && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 rounded-lg text-rose-400 hover:bg-rose-500/10"
                            title="Reject" onClick={() => setBadgeStatuses(p => ({...p, [b.id]: "Rejected"}))}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════════ CAMPAIGNS ══════════ */}
          {activeTab === "campaigns" && (
            <motion.div key="campaigns" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Compose */}
                <Card variant="outline" className="lg:col-span-2 p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><Megaphone className="h-4 w-4 text-primary" /> New Campaign</h3>
                  {campaignSent ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 py-10 text-center">
                      <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                      <p className="font-semibold text-lg">Campaign Sent!</p>
                      <p className="text-white/40 text-sm">Delivered to {campaignForm.audience === "All" ? "50,120" : campaignForm.audience === "Actors" ? "45,000" : "5,000"} users</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={submitCampaign} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Title</label>
                        <input required value={campaignForm.title} onChange={e => setCampaignForm(f => ({...f, title: e.target.value}))}
                          placeholder="e.g. March Casting Drive"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/50" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Message</label>
                        <textarea required rows={4} value={campaignForm.message} onChange={e => setCampaignForm(f => ({...f, message: e.target.value}))}
                          placeholder="Write your announcement message..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/50 resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Audience</label>
                          <select value={campaignForm.audience} onChange={e => setCampaignForm(f => ({...f, audience: e.target.value}))}
                            className="w-full bg-neutral-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50">
                            <option>All</option>
                            <option>Actors</option>
                            <option>Directors</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Type</label>
                          <select value={campaignForm.type} onChange={e => setCampaignForm(f => ({...f, type: e.target.value}))}
                            className="w-full bg-neutral-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50">
                            <option>Info</option>
                            <option>Warning</option>
                            <option>Success</option>
                          </select>
                        </div>
                      </div>
                      <div className="pt-1 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/40">
                        <p>Reach: <span className="text-white font-semibold">
                          {campaignForm.audience === "All" ? "50,120" : campaignForm.audience === "Actors" ? "45,000" : "5,000"} users
                        </span></p>
                      </div>
                      <button type="submit" disabled={campaignSending}
                        className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                        {campaignSending
                          ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Sending…</>
                          : <><Send className="h-4 w-4" /> Send Campaign</>}
                      </button>
                    </form>
                  )}
                </Card>

                {/* History */}
                <Card variant="outline" className="lg:col-span-3 p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><Layers className="h-4 w-4 text-primary" /> Campaign History</h3>
                  <div className="space-y-3">
                    {sentCampaigns.map((c, i) => (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold">{c.title}</p>
                                <Badge className={cn("text-[10px]",
                                  c.type === "Warning" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                  c.type === "Success" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                         "bg-blue-500/10 text-blue-400 border-blue-500/20")}>{c.type}</Badge>
                                <Badge variant="glass" className="text-[10px]">{c.audience}</Badge>
                              </div>
                              <p className="text-xs text-white/40 mt-1 line-clamp-1">{c.message}</p>
                            </div>
                            <span className="text-[10px] text-white/25 shrink-0">{c.sentAt}</span>
                          </div>
                          <div className="flex items-center gap-4 text-[11px] text-white/40">
                            <span><span className="text-white font-medium">{c.sent.toLocaleString()}</span> sent</span>
                            <span>Open rate: <span className="text-primary font-medium">{c.openRate}</span></span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* ══════════ ANALYTICS ══════════ */}
          {activeTab === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue trend */}
                <Card variant="glass" className="p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><DollarSign className="h-4 w-4 text-emerald-400" /> Revenue Trend (₹)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={GROWTH_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="month" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v/1000000).toFixed(1)}M`} />
                      <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: 12 }} itemStyle={{ color: "#fff" }} formatter={(v: number) => [`₹${(v/1000000).toFixed(2)}M`, "Revenue"]} />
                      <Line type="monotone" dataKey="revenue" stroke={C.emerald} strokeWidth={2.5} dot={{ fill: C.emerald, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Applications per day */}
                <Card variant="glass" className="p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Daily Applications & Auditions</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={ACTIVITY_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: 12 }} itemStyle={{ color: "#fff" }} />
                      <Legend wrapperStyle={{ fontSize: 11, color: "#ffffff60" }} />
                      <Bar dataKey="applications" name="Applications" fill={C.teal}   radius={[4,4,0,0]} />
                      <Bar dataKey="auditions"    name="Auditions"    fill={C.violet} radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Page views */}
                <Card variant="glass" className="p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><Eye className="h-4 w-4 text-blue-400" /> Daily Page Views</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={ACTIVITY_DATA}>
                      <defs>
                        <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={C.blue} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: 12 }} itemStyle={{ color: "#fff" }} />
                      <Area type="monotone" dataKey="views" name="Views" stroke={C.blue} fill="url(#viewGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                {/* Key metrics */}
                <Card variant="outline" className="p-6 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><Award className="h-4 w-4 text-amber-400" /> Platform KPIs</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Avg. Applications per Audition", value: "65", bar: 65, color: C.teal    },
                      { label: "Profile Completion Rate",         value: "72%",bar: 72, color: C.violet  },
                      { label: "Verification Approval Rate",      value: "84%",bar: 84, color: C.emerald },
                      { label: "Director Retention (MoM)",        value: "91%",bar: 91, color: C.amber   },
                      { label: "AI Assistant Adoption",           value: "58%",bar: 58, color: C.blue    },
                    ].map(m => (
                      <div key={m.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">{m.label}</span>
                          <span className="font-bold">{m.value}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${m.bar}%`, background: m.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* ══════════ SETTINGS ══════════ */}
          {activeTab === "settings" && (
            <motion.div key="settings" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Feature flags */}
                <Card variant="outline" className="p-6 space-y-5">
                  <h3 className="font-bold flex items-center gap-2"><ToggleRight className="h-4 w-4 text-primary" /> Feature Flags</h3>
                  <div className="space-y-3">
                    {featureFlags.map(f => (
                      <div key={f.id} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{f.name}</p>
                          <p className="text-[10px] text-white/40 mt-0.5">{f.desc}</p>
                        </div>
                        <button onClick={() => toggleFlag(f.id)}
                          className={cn("shrink-0 w-11 h-6 rounded-full relative transition-colors duration-200",
                            f.enabled ? "bg-primary" : "bg-white/10")}>
                          <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200",
                            f.enabled ? "translate-x-5" : "translate-x-0.5")} />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* System config */}
                <div className="space-y-4">
                  <Card variant="outline" className="p-6 space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><Settings className="h-4 w-4 text-primary" /> System Configuration</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Platform Name",         value: "Auditions Adda", type: "text" },
                        { label: "Support Email",          value: "support@auditionsadda.com", type: "email" },
                        { label: "Max Upload Size (MB)",   value: "50", type: "number" },
                        { label: "Free Auditions / Month", value: "3", type: "number" },
                      ].map(cfg => (
                        <div key={cfg.label} className="space-y-1">
                          <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{cfg.label}</label>
                          <input type={cfg.type} defaultValue={cfg.value}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" />
                        </div>
                      ))}
                    </div>
                    <Button size="sm" className="rounded-xl gap-1.5 mt-2">Save Configuration</Button>
                  </Card>

                  <Card variant="outline" className="p-6 space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><Lock className="h-4 w-4 text-rose-400" /> Danger Zone</h3>
                    <p className="text-xs text-white/40">These actions are irreversible. Proceed with caution.</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full rounded-xl border-amber-500/30 text-amber-400 hover:bg-amber-500/10 gap-2">
                        <AlertTriangle className="h-3.5 w-3.5" /> Clear All Notifications
                      </Button>
                      <Button variant="outline" size="sm" className="w-full rounded-xl border-rose-500/30 text-rose-400 hover:bg-rose-500/10 gap-2">
                        <Trash2 className="h-3.5 w-3.5" /> Purge Expired Auditions
                      </Button>
                      <Button variant="outline" size="sm" className="w-full rounded-xl border-rose-500/30 text-rose-400 hover:bg-rose-500/10 gap-2">
                        <Ban className="h-3.5 w-3.5" /> Maintenance Mode
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── Add Moderator Modal ── */}
      <AnimatePresence>
        {showModModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) setShowModModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <h2 className="font-bold text-lg">Add Moderator</h2>
                </div>
                <button onClick={() => setShowModModal(false)} className="text-white/40 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {modSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                  <p className="font-semibold text-lg">Moderator Added!</p>
                  <p className="text-white/40 text-sm">An invite has been sent to <span className="text-white/70">{modForm.email}</span></p>
                </motion.div>
              ) : (
                <form onSubmit={submitModerator} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Full Name</label>
                    <input
                      required value={modForm.name} onChange={e => setModForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Email Address</label>
                    <input
                      required type="email" value={modForm.email} onChange={e => setModForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="moderator@auditionsadda.com"
                      className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  {/* Role */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Role</label>
                    <select
                      value={modForm.role} onChange={e => setModForm(f => ({ ...f, role: e.target.value }))}
                      className="w-full bg-neutral-800 border border-white/10 text-white rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    >
                      <option value="Moderator">Moderator</option>
                      <option value="Super Moderator">Super Moderator</option>
                      <option value="Content Reviewer">Content Reviewer</option>
                    </select>
                  </div>
                  {/* Permissions */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Permissions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {ALL_PERMS.map(p => (
                        <label key={p.id} className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all text-sm",
                          modForm.permissions.includes(p.id)
                            ? "bg-primary/10 border-primary/40 text-white"
                            : "bg-white/[0.03] border-white/8 text-white/50 hover:border-white/20"
                        )}>
                          <input type="checkbox" className="hidden" checked={modForm.permissions.includes(p.id)} onChange={() => togglePerm(p.id)} />
                          <div className={cn("w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0",
                            modForm.permissions.includes(p.id) ? "bg-primary border-primary" : "border-white/20"
                          )}>
                            {modForm.permissions.includes(p.id) && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </div>
                          {p.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowModModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition-all">
                      Cancel
                    </button>
                    <button type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      <UserPlus className="h-4 w-4" /> Send Invite
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
