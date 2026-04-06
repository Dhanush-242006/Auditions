import * as React from "react";
import { motion } from "motion/react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  ArrowLeft,
  Calendar,
  Download,
  Filter
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";

const VIEW_DATA = [
  { name: "Week 1", views: 4000, applications: 2400 },
  { name: "Week 2", views: 3000, applications: 1398 },
  { name: "Week 3", views: 2000, applications: 9800 },
  { name: "Week 4", views: 2780, applications: 3908 },
  { name: "Week 5", views: 1890, applications: 4800 },
  { name: "Week 6", views: 2390, applications: 3800 },
  { name: "Week 7", views: 3490, applications: 4300 },
];

const GENDER_DATA = [
  { name: "Male", value: 45 },
  { name: "Female", value: 52 },
  { name: "Other", value: 3 },
];

const COLORS = ["#0EA5E9", "#3b82f6", "#10b981"];

export function AnalyticsPage() {
  const [period, setPeriod] = React.useState("30");

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar role="director" />
      
      <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden p-6 md:p-10 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="text-3xl font-bold font-display">Advanced <span className="text-primary">Analytics</span></h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => setPeriod(period === "30" ? "7" : "30")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {period === "30" ? "Last 30 Days" : "Last 7 Days"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass" className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Total Reach</p>
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">124.5K</h3>
            <p className="text-emerald-500 text-xs font-medium">+14.2% from last month</p>
          </Card>
          <Card variant="glass" className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Conversion Rate</p>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="text-3xl font-bold">8.4%</h3>
            <p className="text-emerald-500 text-xs font-medium">+2.1% from last month</p>
          </Card>
          <Card variant="glass" className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Avg. Match Score</p>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold">76%</h3>
            <p className="text-white/30 text-xs font-medium">Based on AI screening</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Growth Chart */}
          <Card variant="outline" className="p-6 space-y-6">
            <h3 className="text-lg font-bold">Growth Performance</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VIEW_DATA}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: "12px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Demographics Chart */}
          <Card variant="outline" className="p-6 space-y-6">
            <h3 className="text-lg font-bold">Applicant Demographics</h3>
            <div className="h-[350px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={GENDER_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {GENDER_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#171717", border: "1px solid #ffffff10", borderRadius: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">Gender</p>
                <p className="text-white/40 text-xs">Distribution</p>
              </div>
            </div>
            <div className="flex justify-center space-x-6">
              {GENDER_DATA.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-xs text-white/60">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
