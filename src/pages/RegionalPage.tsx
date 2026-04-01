import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Search, ChevronRight, Users, Bell } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

const REGIONS = [
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", active: 1240, auditions: 450, trending: true },
  { id: "delhi", name: "Delhi / NCR", state: "Delhi", active: 870, auditions: 310, trending: true },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", active: 620, auditions: 220, trending: false },
  { id: "bangalore", name: "Bangalore", state: "Karnataka", active: 540, auditions: 190, trending: false },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", active: 480, auditions: 175, trending: true },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", active: 390, auditions: 130, trending: false },
  { id: "pune", name: "Pune", state: "Maharashtra", active: 310, auditions: 105, trending: false },
  { id: "remote", name: "Remote / Online", state: "Anywhere", active: 2100, auditions: 680, trending: true },
];

const INDUSTRIES: Record<string, string[]> = {
  mumbai: ["Bollywood", "OTT", "Commercial", "Theatre"],
  delhi: ["OTT", "Theatre", "Commercial", "TV"],
  hyderabad: ["Tollywood", "OTT", "Telugu Film", "TV"],
  bangalore: ["OTT", "Commercial", "Kannada Film"],
  chennai: ["Kollywood", "Tamil OTT", "Commercial"],
  kolkata: ["Bengali Film", "Theatre", "TV"],
  pune: ["Marathi Film", "Theatre", "OTT"],
  remote: ["Voice Over", "Audio Drama", "Animation", "Digital"],
};

const RECENT_AUDITIONS: Record<string, { title: string; company: string; pay: string }[]> = {
  mumbai: [
    { title: "Lead Role - Hindi Film", company: "Excel Entertainment", pay: "₹50K-80K/day" },
    { title: "TV Commercial", company: "Ogilvy India", pay: "₹20K-40K" },
    { title: "Web Series", company: "Amazon Prime", pay: "₹1L/episode" },
  ],
  delhi: [
    { title: "Theatre Production", company: "National School of Drama", pay: "₹15K/show" },
    { title: "Political Drama Series", company: "Netflix India", pay: "₹75K/episode" },
  ],
  hyderabad: [
    { title: "Lead Actor - Telugu Film", company: "Geetha Arts", pay: "₹40K-60K/day" },
    { title: "OTT Web Series", company: "Aha Video", pay: "₹80K/episode" },
  ],
  remote: [
    { title: "Voice Over - Animation", company: "Disney India", pay: "₹10K/day" },
    { title: "Audio Drama Narrator", company: "Audible India", pay: "₹15K/project" },
    { title: "Online Commercial", company: "Swiggy", pay: "₹25K" },
  ],
};

export function RegionalPage() {
  const [selectedRegion, setSelectedRegion] = React.useState("mumbai");
  const [search, setSearch] = React.useState("");
  const [following, setFollowing] = React.useState<Set<string>>(new Set(["mumbai"]));

  const region = REGIONS.find(r => r.id === selectedRegion)!;
  const industries = INDUSTRIES[selectedRegion] || [];
  const auditions = RECENT_AUDITIONS[selectedRegion] || RECENT_AUDITIONS["mumbai"];

  const toggleFollow = (id: string) => {
    setFollowing(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = REGIONS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-neutral-950 overflow-x-hidden">
      <Sidebar role="actor" />
      <main className="flex-1 min-w-0 w-full md:ml-64 pt-16 pb-10 px-4 sm:px-6 md:pt-8 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <BackButton />
        <div className="mb-8 min-w-0">
          <h1 className="text-3xl font-bold font-display mb-1">Regional Auditions</h1>
          <p className="text-white/50 text-sm">Browse and filter auditions by your region and industry</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-w-0">
          {/* Region List */}
          <div className="space-y-3 min-w-0">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                placeholder="Search regions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {filtered.map((r, i) => (
              <motion.button
                type="button"
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedRegion(r.id)}
                className={cn(
                  "w-full min-w-0 text-left p-4 rounded-xl border transition-all",
                  selectedRegion === r.id
                    ? "bg-primary/10 border-primary/40"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm break-words">{r.name}</p>
                      {r.trending && <Badge className="bg-primary/20 text-primary border-primary/20 text-[10px]">🔥 Hot</Badge>}
                    </div>
                    <p className="text-white/40 text-xs">{r.state}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-primary font-bold text-sm">{r.auditions}</p>
                    <p className="text-white/30 text-xs">auditions</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-white/30 text-xs">
                  <Users className="h-3 w-3" />
                  <span>{r.active.toLocaleString()} active</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Region Detail */}
          <div className="xl:col-span-2 space-y-4 min-w-0">
            <Card className="p-4 sm:p-6 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{region.name}</h2>
                    <p className="text-white/50 text-sm">{region.state}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={following.has(selectedRegion) ? "ghost" : "primary"}
                  onClick={() => toggleFollow(selectedRegion)}
                  className="gap-1 shrink-0"
                >
                  <Bell className="h-4 w-4" />
                  {following.has(selectedRegion) ? "Following" : "Follow Region"}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 min-w-0">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{region.auditions}</p>
                  <p className="text-xs text-white/40">Open Auditions</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-white">{region.active.toLocaleString()}</p>
                  <p className="text-xs text-white/40">Active Artists</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-accent">{industries.length}</p>
                  <p className="text-xs text-white/40">Industries</p>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Active Industries</p>
                <div className="flex flex-wrap gap-2">
                  {industries.map(ind => (
                    <Badge key={ind} className="bg-white/5 text-white/70 border-white/10">{ind}</Badge>
                  ))}
                </div>
              </div>

              <Link to="/auditions">
                <Button variant="primary" className="w-full gap-2">
                  Browse {region.name} Auditions
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>

            <div>
              <p className="text-sm font-semibold text-white/60 mb-3">Recent Auditions in {region.name}</p>
              <div className="space-y-3">
                {auditions.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 hover:border-white/20 transition-all">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm">{a.title}</p>
                        <p className="text-white/40 text-xs">{a.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/10 text-xs">{a.pay}</Badge>
                        <Link to="/auditions">
                          <Button size="sm" variant="ghost" className="text-xs gap-1">
                            Apply <ChevronRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
