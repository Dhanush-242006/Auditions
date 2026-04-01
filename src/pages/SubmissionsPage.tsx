import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Video,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Filter,
  Search,
  MoreVertical,
  Play,
  FileText,
  X,
  TrendingUp,
  Award,
  ChevronDown,
} from "lucide-react";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { BackButton } from "@/src/components/ui/BackButton";
import { Modal } from "@/src/components/ui/Modal";
import {
  getTalentApplications,
  subscribeTalentApplications,
  formatSubmittedAt,
  type StoredTalentApplication,
} from "@/src/lib/talentApplications";

type OutcomeStatus = "Applied" | "Callback" | "Offer" | "Cast" | "Rejected";

const OUTCOME_OPTIONS: { value: OutcomeStatus; label: string; color: string }[] = [
  { value: "Applied",   label: "Applied",   color: "bg-amber-500/20 text-amber-400 border-amber-500/20" },
  { value: "Callback",  label: "Callback",  color: "bg-violet-500/20 text-violet-400 border-violet-500/20" },
  { value: "Offer",     label: "Offer",     color: "bg-blue-500/20 text-blue-400 border-blue-500/20" },
  { value: "Cast",      label: "Cast!",     color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" },
  { value: "Rejected",  label: "Rejected",  color: "bg-red-500/20 text-red-400 border-red-500/20" },
];

const OUTCOME_KEY = "auditions_submission_outcomes";
function loadOutcomes(): Record<string, OutcomeStatus> {
  try { return JSON.parse(localStorage.getItem(OUTCOME_KEY) || "{}"); } catch { return {}; }
}
function saveOutcomes(o: Record<string, OutcomeStatus>) {
  localStorage.setItem(OUTCOME_KEY, JSON.stringify(o));
}

type Submission = {
  id: string;
  project: string;
  role: string;
  submittedAt: string;
  status: string;
  type: string;
  thumbnail: string;
  description?: string;
  company?: string;
  deadline?: string;
};

function storedToSubmission(stored: StoredTalentApplication): Submission {
  return {
    id: stored.auditionId,
    project: stored.title,
    role: `${stored.category} • ${stored.gender}, ${stored.ageRange}`,
    submittedAt: formatSubmittedAt(stored.appliedAt),
    status: "Applied",
    type: stored.category,
    thumbnail: `https://picsum.photos/seed/sub-${encodeURIComponent(stored.auditionId)}/640/360`,
    description: stored.description,
    company: stored.company,
    deadline: stored.deadline,
  };
}

export function SubmissionsPage() {
  const navigate = useNavigate();
  const [storedApps, setStoredApps] = React.useState<StoredTalentApplication[]>(() =>
    getTalentApplications()
  );
  const [selectedSubmission, setSelectedSubmission] = React.useState<Submission | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [outcomes, setOutcomes] = React.useState<Record<string, OutcomeStatus>>(() => loadOutcomes());

  const setOutcome = (id: string, outcome: OutcomeStatus) => {
    const updated = { ...outcomes, [id]: outcome };
    setOutcomes(updated);
    saveOutcomes(updated);
  };

  React.useEffect(() => {
    return subscribeTalentApplications(() => setStoredApps(getTalentApplications()));
  }, []);

  const submissions = React.useMemo(
    () => storedApps.map(storedToSubmission),
    [storedApps]
  );

  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase();
    return (
      sub.project.toLowerCase().includes(q) ||
      sub.role.toLowerCase().includes(q) ||
      (sub.company?.toLowerCase().includes(q) ?? false)
    );
  });
  const isEmpty = submissions.length === 0;

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar />
      
      <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display">My <span className="text-primary">Submissions</span></h1>
            <p className="text-white/50 text-sm">Track your audition videos and application status.</p>
          </div>
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
            <Button variant="outline" className="rounded-xl" onClick={() => navigate("/auditions")}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </header>

        {/* Outcome tracker summary */}
        {!isEmpty && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {OUTCOME_OPTIONS.map(opt => {
              const count = submissions.filter(s => (outcomes[s.id] ?? "Applied") === opt.value).length;
              return (
                <div key={opt.value} className={`rounded-xl border p-3 text-center ${opt.color}`}>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">{opt.label}</p>
                </div>
              );
            })}
          </div>
        )}

        {isEmpty ? (
          <Card variant="outline" className="p-12 md:p-16 text-center border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Video className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">No submissions yet</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
              You haven't applied to any auditions yet. Browse Talent to find roles and submit your applications. Your submissions will appear here.
            </p>
            <Button className="rounded-xl" onClick={() => navigate("/auditions")}>
              Browse Talent
            </Button>
          </Card>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((sub) => (
            <Card 
              key={sub.id} 
              variant="outline" 
              className="overflow-hidden group border-white/5 hover:border-primary/30 transition-all cursor-pointer"
              onClick={() => setSelectedSubmission(sub)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={sub.thumbnail} 
                  alt={sub.project} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40">
                    <Play className="h-6 w-6 text-white fill-current" />
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={
                      sub.status === "Shortlisted" ? "success" : 
                      sub.status === "Rejected" ? "destructive" : "warning"
                    }
                    className="backdrop-blur-md border-none"
                  >
                    {sub.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{sub.project}</h3>
                  <p className="text-xs text-white/40">Role: {sub.role}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center space-x-2 text-[10px] text-white/30">
                    <Clock className="h-3 w-3" />
                    <span>Submitted {sub.submittedAt}</span>
                  </div>
                  {/* Outcome selector */}
                  <select
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                    value={outcomes[sub.id] ?? "Applied"}
                    onClick={e => e.stopPropagation()}
                    onChange={e => { e.stopPropagation(); setOutcome(sub.id, e.target.value as OutcomeStatus); }}
                  >
                    {OUTCOME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            </Card>
          ))}
        </div>
        )}

        {/* Submission detail modal */}
        <Modal
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          title="Submission Details"
          className="max-w-2xl"
        >
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
                <img 
                  src={selectedSubmission.thumbnail} 
                  alt={selectedSubmission.project}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={
                      selectedSubmission.status === "Shortlisted" ? "success" : 
                      selectedSubmission.status === "Rejected" ? "destructive" : "warning"
                    }
                    className="backdrop-blur-md border-none"
                  >
                    {selectedSubmission.status}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button 
                    size="icon" 
                    className="w-14 h-14 rounded-full bg-primary shadow-xl"
                    onClick={() => navigate("/virtual-audition")}
                  >
                    <Play className="h-7 w-7 text-white fill-current" />
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedSubmission.project}</h3>
                  {selectedSubmission.company && (
                    <p className="text-sm text-primary mt-0.5">{selectedSubmission.company}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/40 text-xs uppercase font-bold">Role</p>
                    <p className="font-medium">{selectedSubmission.role}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase font-bold">Type</p>
                    <p className="font-medium">{selectedSubmission.type}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase font-bold">Submitted</p>
                    <p className="font-medium">{selectedSubmission.submittedAt}</p>
                  </div>
                  {selectedSubmission.deadline && (
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold">Deadline</p>
                      <p className="font-medium">{selectedSubmission.deadline}</p>
                    </div>
                  )}
                </div>
                {selectedSubmission.description && (
                  <p className="text-sm text-white/70 leading-relaxed">{selectedSubmission.description}</p>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="rounded-xl flex-1" onClick={() => navigate("/auditions")}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Audition
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={() => setSelectedSubmission(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Search: no matches (but user has submissions) */}
        {!isEmpty && filteredSubmissions.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-white/20" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">No matching submissions</h3>
              <p className="text-sm text-white/40">Try a different search term or clear the search box.</p>
            </div>
            <Button variant="outline" className="rounded-xl" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
