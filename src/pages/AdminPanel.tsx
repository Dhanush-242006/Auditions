import * as React from "react";
import { motion } from "motion/react";
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Settings,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Flag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  FileCheck
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { Input } from "@/src/components/ui/Input";
import { cn } from "@/src/lib/utils";

const USER_DATA = [
  { name: "Actors", value: 45000 },
  { name: "Directors", value: 5000 },
  { name: "Admins", value: 120 },
];

const COLORS = ["#0EA5E9", "#8b5cf6", "#10b981"];

export function AdminPanel() {
  const stats = [
    { label: "Total Users", value: "50.1K", icon: <Users className="h-5 w-5 text-primary" />, trend: "+2.4%", up: true },
    { label: "Pending Verification", value: "842", icon: <ShieldCheck className="h-5 w-5 text-blue-500" />, trend: "+15 today", up: true },
    { label: "Reported Content", value: "12", icon: <AlertTriangle className="h-5 w-5 text-rose-500" />, trend: "-5% vs yesterday", up: false },
    { label: "Platform Revenue", value: "₹12.4M", icon: <BarChart3 className="h-5 w-5 text-emerald-500" />, trend: "+8.2%", up: true },
  ];

  const pendingVerifications = [
    { id: "1", name: "Ranbir Kapoor", type: "Actor", submitted: "2h ago", status: "Pending" },
    { id: "2", name: "Karan Johar", type: "Director", submitted: "5h ago", status: "Reviewing" },
    { id: "3", name: "Alia Bhatt", type: "Actor", submitted: "1d ago", status: "Pending" },
    { id: "4", name: "Zoya Akhtar", type: "Director", submitted: "2d ago", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display">Admin <span className="text-primary">Control Center</span></h1>
            <p className="text-white/50 text-sm">Monitor platform health, manage users, and handle verifications.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="rounded-xl">
              <Settings className="mr-2 h-4 w-4" />
              System Config
            </Button>
            <Button className="rounded-xl shadow-lg shadow-primary/20">
              <UserPlus className="mr-2 h-5 w-5" />
              Add Moderator
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} variant="outline" className="p-6 space-y-4 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {stat.icon}
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                  stat.up ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.trend}
                </div>
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
                <span>User Growth & Distribution</span>
              </h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-[10px]">Monthly</Badge>
                <Badge variant="glass" className="text-[10px] bg-primary text-white border-none">Weekly</Badge>
              </div>
            </div>
            <div className="h-[300px] w-full flex items-center">
              <div className="w-2/3 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={USER_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: "12px" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {USER_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/3 h-full flex flex-col justify-center space-y-6 pl-10">
                {USER_DATA.map((entry, index) => (
                  <div key={entry.name} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-sm font-bold">{entry.name}</span>
                    </div>
                    <p className="text-xs text-white/40">{((entry.value / 50120) * 100).toFixed(1)}% of total users</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card variant="outline" className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <FileCheck className="h-5 w-5 text-blue-500" />
                <span>Pending Verification</span>
              </h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {pendingVerifications.map((user) => (
                <div key={user.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/40">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{user.name}</p>
                      <p className="text-[10px] text-white/40">{user.type} • {user.submitted}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-emerald-500 hover:bg-emerald-500/10">
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-rose-500 hover:bg-rose-500/10">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-xl text-xs">View All Requests</Button>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Moderation Queue</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input placeholder="Search reports..." className="pl-10 h-9 text-xs w-64 rounded-full" />
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
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
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Reported Content</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Reported By</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Reason</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Severity</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">Casting Call: Lead Actor</p>
                        <p className="text-[10px] text-white/40">ID: #CC-8241</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">User #9241</td>
                      <td className="px-6 py-4 text-sm text-white/60">Suspicious Activity</td>
                      <td className="px-6 py-4">
                        <Badge variant="destructive" className="text-[10px] bg-rose-500/10 text-rose-500 border-none">High</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">2h ago</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white/40 hover:text-white">
                            <Flag className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white/40 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-white/[0.02] text-center">
              <Button variant="ghost" size="sm" className="text-xs text-white/40 hover:text-white">View All Reports</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
