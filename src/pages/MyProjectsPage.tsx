import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Film,
  Calendar,
  Users,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  Clapperboard,
  Tv,
  Radio,
  Theater,
  IndianRupee,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { Input } from "@/src/components/ui/Input";

const PROJECTS = [
  {
    id: "1",
    title: "Dil Se Dil Tak",
    type: "Feature Film",
    typeIcon: <Film className="h-4 w-4" />,
    status: "In Production",
    statusColor: "success",
    director: "Zoya Akhtar",
    producer: "Excel Entertainment",
    startDate: "Jan 2026",
    endDate: "Aug 2026",
    budget: "₹45 Cr",
    castingProgress: 85,
    totalRoles: 24,
    filledRoles: 20,
    activeAuditions: 4,
    totalApplicants: 1250,
    image: "https://picsum.photos/seed/proj1/400/225",
    description: "A romantic drama set in the streets of Mumbai, exploring love across social boundaries.",
  },
  {
    id: "2",
    title: "The Last Kingdom",
    type: "Web Series",
    typeIcon: <Tv className="h-4 w-4" />,
    status: "Pre-Production",
    statusColor: "warning",
    director: "Anurag Kashyap",
    producer: "Netflix India",
    startDate: "Mar 2026",
    endDate: "Dec 2026",
    budget: "₹80 Cr",
    castingProgress: 45,
    totalRoles: 35,
    filledRoles: 16,
    activeAuditions: 8,
    totalApplicants: 2340,
    image: "https://picsum.photos/seed/proj2/400/225",
    description: "An epic historical drama spanning three generations of a royal dynasty.",
  },
  {
    id: "3",
    title: "Midnight Tales",
    type: "Podcast Drama",
    typeIcon: <Radio className="h-4 w-4" />,
    status: "Casting",
    statusColor: "primary",
    director: "Vikramaditya Motwane",
    producer: "Phantom Films",
    startDate: "Feb 2026",
    endDate: "Apr 2026",
    budget: "₹2 Cr",
    castingProgress: 30,
    totalRoles: 12,
    filledRoles: 4,
    activeAuditions: 6,
    totalApplicants: 580,
    image: "https://picsum.photos/seed/proj3/400/225",
    description: "An anthology of supernatural stories told through immersive audio drama.",
  },
  {
    id: "4",
    title: "Stage Whispers",
    type: "Theater",
    typeIcon: <Theater className="h-4 w-4" />,
    status: "Completed",
    statusColor: "secondary",
    director: "Naseeruddin Shah",
    producer: "Motley Productions",
    startDate: "Oct 2025",
    endDate: "Jan 2026",
    budget: "₹50 L",
    castingProgress: 100,
    totalRoles: 8,
    filledRoles: 8,
    activeAuditions: 0,
    totalApplicants: 320,
    image: "https://picsum.photos/seed/proj4/400/225",
    description: "A contemporary adaptation of a classic play exploring identity and belonging.",
  },
];

const PROJECT_TYPES = ["All Types", "Feature Film", "Web Series", "Podcast Drama", "Theater", "Commercial", "Short Film"];
const PROJECT_STATUS = ["All Status", "Casting", "Pre-Production", "In Production", "Post-Production", "Completed"];

const BUDGET_KEY = "auditions_project_budgets";

interface BudgetLine { id: string; category: string; allocated: number; spent: number; }
interface ProjectBudget { projectId: string; lines: BudgetLine[]; }

const DEFAULT_CATEGORIES = ["Casting Fees", "Rehearsal Space", "Costumes & Styling", "Travel & Accommodation", "Crew", "Miscellaneous"];

function loadBudgets(): Record<string, ProjectBudget> {
  try { return JSON.parse(localStorage.getItem(BUDGET_KEY) || "{}"); } catch { return {}; }
}
function saveBudgets(b: Record<string, ProjectBudget>) {
  localStorage.setItem(BUDGET_KEY, JSON.stringify(b));
}

export function MyProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("All Types");
  const [selectedStatus, setSelectedStatus] = React.useState("All Status");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [budgetProjectId, setBudgetProjectId] = React.useState<string | null>(null);
  const [budgets, setBudgets] = React.useState<Record<string, ProjectBudget>>(() => loadBudgets());

  const getBudgetForProject = (projectId: string): ProjectBudget => {
    if (budgets[projectId]) return budgets[projectId];
    return {
      projectId,
      lines: DEFAULT_CATEGORIES.map((cat, i) => ({
        id: `${projectId}-${i}`,
        category: cat,
        allocated: [500000, 200000, 300000, 150000, 800000, 100000][i] ?? 100000,
        spent: [320000, 180000, 150000, 90000, 600000, 40000][i] ?? 0,
      })),
    };
  };

  const updateLine = (projectId: string, lineId: string, field: "allocated" | "spent", value: number) => {
    const current = getBudgetForProject(projectId);
    const updated: ProjectBudget = {
      ...current,
      lines: current.lines.map(l => l.id === lineId ? { ...l, [field]: value } : l),
    };
    const newBudgets = { ...budgets, [projectId]: updated };
    setBudgets(newBudgets);
    saveBudgets(newBudgets);
  };

  const addBudgetLine = (projectId: string) => {
    const current = getBudgetForProject(projectId);
    const newLine: BudgetLine = { id: `${projectId}-${Date.now()}`, category: "New Item", allocated: 0, spent: 0 };
    const updated = { ...current, lines: [...current.lines, newLine] };
    const newBudgets = { ...budgets, [projectId]: updated };
    setBudgets(newBudgets);
    saveBudgets(newBudgets);
  };

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.director.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All Types" || project.type === selectedType;
    const matchesStatus = selectedStatus === "All Status" || project.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = [
    { label: "Total Projects", value: PROJECTS.length, icon: <Clapperboard className="h-5 w-5 text-primary" /> },
    { label: "Active Castings", value: PROJECTS.reduce((acc, p) => acc + p.activeAuditions, 0), icon: <Users className="h-5 w-5 text-blue-500" /> },
    { label: "Total Applicants", value: "4.5K", icon: <Eye className="h-5 w-5 text-emerald-500" /> },
    { label: "Roles Filled", value: `${PROJECTS.reduce((acc, p) => acc + p.filledRoles, 0)}/${PROJECTS.reduce((acc, p) => acc + p.totalRoles, 0)}`, icon: <CheckCircle2 className="h-5 w-5 text-amber-500" /> },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Casting":
        return <Users className="h-3 w-3" />;
      case "Pre-Production":
        return <Clock className="h-3 w-3" />;
      case "In Production":
        return <Film className="h-3 w-3" />;
      case "Post-Production":
        return <Edit className="h-3 w-3" />;
      case "Completed":
        return <CheckCircle2 className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <Sidebar role="director" />

      <main className="flex-grow md:ml-64 p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display">My <span className="text-primary">Projects</span></h1>
            <p className="text-white/50 text-sm">Manage all your film, series, and theater productions in one place.</p>
          </div>
          <Button
            className="rounded-xl shadow-lg shadow-primary/20"
            onClick={() => navigate("/post-audition")}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Project
          </Button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} variant="outline" className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                <h3 className="text-xl font-bold">{stat.value}</h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                placeholder="Search projects..."
                className="pl-10 h-10 text-sm w-64 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none text-white [&>option]:bg-neutral-900"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              className="bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none text-white [&>option]:bg-neutral-900"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {PROJECT_STATUS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-lg"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-lg"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="outline"
                  className="overflow-hidden hover:border-white/20 transition-all group cursor-pointer"
                  onClick={() => navigate("/post-audition")}
                >
                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <Badge variant="glass" className="bg-black/50 backdrop-blur-sm border-none">
                        {project.typeIcon}
                        <span className="ml-1">{project.type}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={project.statusColor as any}
                        className="text-[10px]"
                      >
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{project.status}</span>
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-xs text-white/60">Dir. {project.director}</p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-4 space-y-4">
                    <p className="text-xs text-white/50 line-clamp-2">{project.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/40">Casting Progress</span>
                        <span className="font-bold">{project.castingProgress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full transition-all duration-500"
                          style={{ width: `${project.castingProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-lg font-bold">{project.filledRoles}/{project.totalRoles}</p>
                        <p className="text-[10px] text-white/40">Roles Filled</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{project.activeAuditions}</p>
                        <p className="text-[10px] text-white/40">Active Auditions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{project.totalApplicants}</p>
                        <p className="text-[10px] text-white/40">Applicants</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-lg text-xs"
                        onClick={(e) => { e.stopPropagation(); navigate("/actors"); }}
                      >
                        <Users className="mr-1 h-3 w-3" />
                        View Applicants
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg text-xs gap-1 text-emerald-400"
                        onClick={(e) => { e.stopPropagation(); setBudgetProjectId(project.id); }}
                      >
                        <IndianRupee className="h-3 w-3" />
                        Budget
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <Card variant="outline" className="overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Project</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Type</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Progress</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Applicants</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => navigate("/post-audition")}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 rounded overflow-hidden">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-sm font-bold group-hover:text-primary transition-colors">{project.title}</p>
                          <p className="text-[10px] text-white/40">Dir. {project.director}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="glass" className="bg-white/5 border-none text-xs">
                        {project.typeIcon}
                        <span className="ml-1">{project.type}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={project.statusColor as any} className="text-[10px]">
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{project.status}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-white/40">{project.filledRoles}/{project.totalRoles}</span>
                          <span className="font-bold">{project.castingProgress}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${project.castingProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{project.totalApplicants}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={(e) => { e.stopPropagation(); navigate("/post-audition"); }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={(e) => { e.stopPropagation(); navigate("/post-audition"); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card variant="outline" className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Film className="h-8 w-8 text-white/20" />
            </div>
            <h3 className="text-lg font-bold mb-2">No Projects Found</h3>
            <p className="text-white/50 text-sm mb-6">Try adjusting your filters or create a new project.</p>
            <Button onClick={() => navigate("/post-audition")}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </Card>
        )}
      </main>

      {/* Budget Tracker Modal */}
      {budgetProjectId && (() => {
        const project = PROJECTS.find(p => p.id === budgetProjectId);
        const budget = getBudgetForProject(budgetProjectId);
        const totalAllocated = budget.lines.reduce((s, l) => s + l.allocated, 0);
        const totalSpent = budget.lines.reduce((s, l) => s + l.spent, 0);
        const pct = totalAllocated > 0 ? Math.min(100, Math.round((totalSpent / totalAllocated) * 100)) : 0;
        const fmt = (n: number) => `₹${(n / 100000).toFixed(1)}L`;
        return (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setBudgetProjectId(null)}>
            <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-2xl my-8" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div>
                  <h2 className="font-bold text-lg">{project?.title} — Budget</h2>
                  <p className="text-white/40 text-xs mt-0.5">Allocated: {fmt(totalAllocated)} · Spent: {fmt(totalSpent)}</p>
                </div>
                <button onClick={() => setBudgetProjectId(null)}><X className="h-4 w-4 text-white/40" /></button>
              </div>
              <div className="p-5 space-y-4">
                {/* Overall bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-white/40">
                    <span>Overall spend</span>
                    <span className={pct > 90 ? "text-red-400 font-bold" : ""}>{pct}% of budget used</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>

                {/* Line items */}
                <div className="space-y-2">
                  <div className="grid grid-cols-[1fr_100px_100px] gap-2 text-[10px] uppercase tracking-widest text-white/30 px-1">
                    <span>Category</span><span className="text-right">Allocated</span><span className="text-right">Spent</span>
                  </div>
                  {budget.lines.map(line => {
                    const linePct = line.allocated > 0 ? Math.min(100, Math.round((line.spent / line.allocated) * 100)) : 0;
                    return (
                      <div key={line.id} className="grid grid-cols-[1fr_100px_100px] gap-2 items-center bg-white/5 rounded-xl px-3 py-2">
                        <span className="text-sm font-medium truncate">{line.category}</span>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30 text-xs">₹</span>
                          <input
                            type="number"
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-5 pr-1 py-1 text-xs text-right focus:outline-none focus:border-primary/50"
                            value={line.allocated}
                            onChange={e => updateLine(budgetProjectId, line.id, "allocated", Number(e.target.value))}
                          />
                        </div>
                        <div className={`relative ${linePct > 90 ? "text-red-400" : linePct > 70 ? "text-amber-400" : "text-white"}`}>
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30 text-xs">₹</span>
                          <input
                            type="number"
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-5 pr-1 py-1 text-xs text-right focus:outline-none focus:border-primary/50"
                            value={line.spent}
                            onChange={e => updateLine(budgetProjectId, line.id, "spent", Number(e.target.value))}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button variant="ghost" size="sm" className="w-full border border-dashed border-white/20 text-xs gap-1"
                  onClick={() => addBudgetLine(budgetProjectId)}>
                  <Plus className="h-3 w-3" /> Add Line Item
                </Button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
