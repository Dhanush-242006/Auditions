import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Clock,
  MapPin,
  Briefcase,
  Trash2,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { BackButton } from "@/src/components/ui/BackButton";
import { Badge } from "@/src/components/ui/Badge";
import { getPostedAuditions, subscribePostedAuditions } from "@/src/lib/postedAuditions";
import {
  isDeadlineWithinUpcomingHours,
  formatTimeUntilDeadline,
} from "@/src/lib/auditionDeadline";
import type { Audition } from "@/src/types";

/** Show casting-posted auditions on Saved Alerts when deadline is within this many hours (2 days). */
const UPCOMING_DEADLINE_MAX_HOURS = 48;

type AlertItem = {
  id: string;
  title: string;
  criteria: string;
  frequency: string;
  lastMatch?: string;
  active: boolean;
};

export function AlertsPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = React.useState<AlertItem[]>([]);
  const [postedAuditions, setPostedAuditions] = React.useState<Audition[]>(() =>
    getPostedAuditions()
  );
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newCriteria, setNewCriteria] = React.useState("");
  const [newFrequency, setNewFrequency] = React.useState<"instant" | "daily" | "weekly">("daily");

  React.useEffect(() => {
    return subscribePostedAuditions(() => setPostedAuditions(getPostedAuditions()));
  }, []);

  const urgentCastingPosts = React.useMemo(
    () =>
      postedAuditions.filter((a) =>
        isDeadlineWithinUpcomingHours(a, UPCOMING_DEADLINE_MAX_HOURS)
      ),
    [postedAuditions]
  );

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setAlerts((prev) => [
      ...prev,
      { id: String(Date.now()), title: newTitle.trim(), criteria: newCriteria.trim() || "—", frequency: newFrequency, active: true },
    ]);
    setNewTitle("");
    setNewCriteria("");
    setNewFrequency("daily");
    setShowCreateForm(false);
  };

  const isEmpty = alerts.length === 0 && urgentCastingPosts.length === 0;

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar />
      
      <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display">Saved <span className="text-primary">Alerts</span></h1>
            <p className="text-white/50 text-sm">
              See urgent new casting calls (deadline within 2 days) and your own saved search alerts.
            </p>
          </div>
          <Button variant="primary" className="rounded-xl" onClick={() => setShowCreateForm(true)}>
            Create New Alert
          </Button>
        </header>

        {urgentCastingPosts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                New casting posts — deadline within 2 days
              </h2>
              <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30">
                {urgentCastingPosts.length} active
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {urgentCastingPosts.map((a) => (
                <Card
                  key={a.id}
                  variant="outline"
                  className="p-5 border-primary/25 bg-primary/5 hover:border-primary/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-lg text-white">{a.title}</h3>
                        <Badge variant="glass" className="bg-rose-500/15 text-rose-300 border-rose-500/30 text-[10px]">
                          {formatTimeUntilDeadline(a)}
                        </Badge>
                      </div>
                      <p className="text-sm text-primary font-medium">{a.company}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-white/45">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          {a.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          Deadline: {a.deadline}
                        </span>
                        <Badge variant="secondary" className="text-[10px] bg-white/10 border-none">
                          {a.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      className="rounded-xl shrink-0"
                      onClick={() => navigate("/auditions")}
                    >
                      View on Talent
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {showCreateForm && (
          <Card variant="outline" className="p-6 border-primary/20">
            <h3 className="text-lg font-bold mb-4">Add your alert</h3>
            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Alert title</label>
                <Input placeholder="e.g. Lead Actor Roles in Mumbai" className="bg-white/5 border-white/10" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Criteria (optional)</label>
                <Input placeholder="e.g. Male, 20-30, Feature Film" className="bg-white/5 border-white/10" value={newCriteria} onChange={(e) => setNewCriteria(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Notify me</label>
                <select className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white" value={newFrequency} onChange={(e) => setNewFrequency(e.target.value as any)}>
                  <option value="instant">Instant</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="rounded-xl">Save Alert</Button>
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {isEmpty && !showCreateForm ? (
          <Card variant="outline" className="p-12 md:p-16 text-center border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Bell className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">No alerts yet</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
              When a casting agent posts an audition with a deadline in the next 2 days, it will show here automatically.
              You can also create your own alerts for matching roles.
            </p>
            <Button className="rounded-xl" onClick={() => setShowCreateForm(true)}>
              Create your first alert
            </Button>
          </Card>
        ) : null}

        {alerts.length > 0 && (
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Your saved alerts
            </h2>
        <div className="grid grid-cols-1 gap-4">
          {alerts.map((alert) => (
            <Card key={alert.id} variant="outline" className="p-6 border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{alert.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="glass" className="bg-white/5 text-white/60 border-none text-[10px]">{alert.criteria}</Badge>
                      <Badge variant="glass" className="bg-white/5 text-white/60 border-none text-[10px]">{alert.frequency}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {alert.lastMatch && (
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Last Match</p>
                    <p className="text-sm font-medium">{alert.lastMatch}</p>
                  </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/5">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-red-500/10 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        </div>
        )}
      </main>
    </div>
  );
}
