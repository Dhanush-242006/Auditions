import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Filter, Grid, List, Bookmark, BookmarkCheck, CheckCircle2, Info, ArrowRight, X, Zap, Users, Star, FileText, Check, CalendarClock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Modal } from "@/src/components/ui/Modal";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { BackButton } from "@/src/components/ui/BackButton";
import { Audition } from "@/src/types";
import { cn } from "@/src/lib/utils";
import { getPostedAuditions, subscribePostedAuditions } from "@/src/lib/postedAuditions";
import {
  addTalentApplication,
  getAppliedAuditionIds,
  subscribeTalentApplications,
} from "@/src/lib/talentApplications";
import { getSlots, bookSlot, subscribeSlots, formatSlotTime, type AuditionSlot } from "@/src/lib/scheduling";

const MOCK_AUDITIONS: Audition[] = [
  { id: "1", title: "Lead Actor - Period Drama", company: "Excel Entertainment", location: "Mumbai, India", category: "Feature Film", gender: "Male", ageRange: "25-35", isPaid: true, isVerified: true, postedAt: "2h ago", deadline: "Mar 15, 2026", description: "Looking for a versatile actor for a lead role.", matchScore: 98, applicantsCount: 124, viewsCount: 1200, script: undefined },
  { id: "2", title: "Supporting Actress - TV Commercial", company: "Ogilvy & Mather", location: "Bangalore, India", category: "Commercial", gender: "Female", ageRange: "20-30", isPaid: true, isVerified: true, postedAt: "5h ago", deadline: "Mar 10, 2026", description: "Skincare brand looking for a fresh face.", matchScore: 85, applicantsCount: 450, viewsCount: 3500, script: undefined },
  { id: "3", title: "Voice Over Artist - Animation", company: "Disney India", location: "Remote", category: "Voice Over", gender: "Any", ageRange: "Any", isPaid: true, isVerified: true, postedAt: "1d ago", deadline: "Mar 20, 2026", description: "Talented voice artists for animated feature.", matchScore: 72, applicantsCount: 89, viewsCount: 800, script: undefined },
  { id: "4", title: "Child Actor - Short Film", company: "Independent Production", location: "Delhi, India", category: "Short Film", gender: "Any", ageRange: "8-12", isPaid: false, isVerified: false, postedAt: "2d ago", deadline: "Mar 12, 2026", description: "Child actor for poignant short film.", matchScore: 45, applicantsCount: 34, viewsCount: 450, script: undefined },
  { id: "5", title: "Dancer - Music Video", company: "T-Series", location: "Mumbai, India", category: "Music Video", gender: "Any", ageRange: "18-25", isPaid: true, isVerified: true, postedAt: "3d ago", deadline: "Mar 18, 2026", description: "Professional dancers for Bollywood music video.", matchScore: 92, applicantsCount: 230, viewsCount: 2100, script: undefined },
  { id: "6", title: "Lead Actress - Web Series", company: "Amazon Prime Video", location: "Hyderabad, India", category: "Web Series", gender: "Female", ageRange: "22-28", isPaid: true, isVerified: true, postedAt: "4d ago", deadline: "Mar 25, 2026", description: "Lead role in crime thriller web series.", matchScore: 88, applicantsCount: 156, viewsCount: 1800, script: undefined },
];

const CATEGORIES = ["Feature Film", "Web Series", "Commercial", "Short Film", "Music Video", "Voice Over"];
const LOCATIONS = ["All Locations", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Remote"];
const GENDERS = ["Male", "Female", "Any"] as const;

export function AuditionListingsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedAudition, setSelectedAudition] = React.useState<Audition | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Set<string>>(new Set());
  const [appliedIds, setAppliedIds] = React.useState<Set<string>>(() => getAppliedAuditionIds());
  const [notification, setNotification] = React.useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [auditionSlots, setAuditionSlots] = React.useState<AuditionSlot[]>([]);
  const [bookedSlotId, setBookedSlotId] = React.useState<string | null>(null);

  // Filter states
  const [selectedCategories, setSelectedCategories] = React.useState<Set<string>>(new Set());
  const [selectedLocation, setSelectedLocation] = React.useState("All Locations");
  const [selectedGender, setSelectedGender] = React.useState<string | null>(null);
  const [ageMin, setAgeMin] = React.useState("");
  const [ageMax, setAgeMax] = React.useState("");
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);
  const [postedAuditions, setPostedAuditions] = React.useState<Audition[]>(() => getPostedAuditions());

  React.useEffect(() => {
    return subscribePostedAuditions(() => setPostedAuditions(getPostedAuditions()));
  }, []);

  React.useEffect(() => {
    return subscribeTalentApplications(() => setAppliedIds(getAppliedAuditionIds()));
  }, []);

  // Load slots whenever the selected audition changes
  React.useEffect(() => {
    if (selectedAudition) {
      setAuditionSlots(getSlots(selectedAudition.id));
      setBookedSlotId(null);
    }
  }, [selectedAudition]);

  React.useEffect(() => {
    return subscribeSlots(() => {
      if (selectedAudition) setAuditionSlots(getSlots(selectedAudition.id));
    });
  }, [selectedAudition]);

  const allAuditions = React.useMemo(
    () => [...postedAuditions, ...MOCK_AUDITIONS],
    [postedAuditions]
  );

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBookmark = (auditionId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(auditionId)) {
        newSet.delete(auditionId);
        showNotification('Removed from bookmarks', 'info');
      } else {
        newSet.add(auditionId);
        showNotification('Saved to bookmarks!', 'success');
      }
      return newSet;
    });
  };

  const handleSaveForLater = () => {
    if (selectedAudition) {
      handleBookmark(selectedAudition.id);
      setIsApplyModalOpen(false);
    }
  };

  const handleConfirmApplication = () => {
    if (selectedAudition && !appliedIds.has(selectedAudition.id)) {
      addTalentApplication(selectedAudition);
      setAppliedIds((prev) => new Set(prev).add(selectedAudition.id));
      showNotification('Application submitted successfully!', 'success');
      setIsApplyModalOpen(false);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const resetFilters = () => {
    setSelectedCategories(new Set());
    setSelectedLocation("All Locations");
    setSelectedGender(null);
    setAgeMin("");
    setAgeMax("");
    setVerifiedOnly(false);
    setSearchQuery("");
    showNotification('Filters reset', 'info');
  };

  const parseAgeRange = (ageRange: string): { min: number; max: number } | null => {
    if (ageRange === "Any") return null;
    const match = ageRange.match(/(\d+)-(\d+)/);
    if (match) {
      return { min: parseInt(match[1]), max: parseInt(match[2]) };
    }
    return null;
  };

  const filteredAuditions = allAuditions.filter(a => {
    // Search filter
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.company.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Category filter
    if (selectedCategories.size > 0 && !selectedCategories.has(a.category)) {
      return false;
    }

    // Location filter
    if (selectedLocation !== "All Locations") {
      if (!a.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
    }

    // Gender filter
    if (selectedGender) {
      if (a.gender !== selectedGender && a.gender !== "Any" && selectedGender !== "Any") {
        return false;
      }
    }

    // Age range filter
    if (ageMin || ageMax) {
      const auditionAge = parseAgeRange(a.ageRange);
      if (auditionAge) {
        if (ageMin && auditionAge.max < parseInt(ageMin)) return false;
        if (ageMax && auditionAge.min > parseInt(ageMax)) return false;
      }
    }

    // Verified filter
    if (verifiedOnly && !a.isVerified) {
      return false;
    }

    return true;
  });

  const activeFiltersCount = [
    selectedCategories.size > 0,
    selectedLocation !== "All Locations",
    selectedGender !== null,
    ageMin !== "",
    ageMax !== "",
    verifiedOnly,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-neutral-950 pt-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold font-display">Find Your Next <span className="text-primary">Role</span></h1>
            <p className="text-white/50">Discover verified casting calls from top production houses.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input 
                placeholder="Search by title, company..." 
                className="pl-11 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full md:hidden relative"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-primary" />
                  <span>Filters</span>
                </h3>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                    {activeFiltersCount} active
                  </Badge>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Category</label>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <label 
                        key={cat} 
                        className="flex items-center space-x-3 cursor-pointer group"
                        onClick={() => toggleCategory(cat)}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                          selectedCategories.has(cat) 
                            ? "border-primary bg-primary" 
                            : "border-white/10 group-hover:border-primary"
                        )}>
                          {selectedCategories.has(cat) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className={cn(
                          "text-sm transition-colors",
                          selectedCategories.has(cat) ? "text-white" : "text-white/60 group-hover:text-white"
                        )}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Location</label>
                  <select 
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white [&>option]:bg-neutral-900 [&>option]:text-white"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-neutral-900 text-white">{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Gender</label>
                  <div className="flex flex-wrap gap-2">
                    {GENDERS.map((g) => (
                      <Badge 
                        key={g} 
                        variant={selectedGender === g ? "primary" : "outline"}
                        className={cn(
                          "cursor-pointer transition-all",
                          selectedGender === g 
                            ? "bg-primary text-white border-primary" 
                            : "hover:bg-primary/10 hover:border-primary/30"
                        )}
                        onClick={() => setSelectedGender(selectedGender === g ? null : g)}
                      >
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Age Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="Min" 
                      className="h-9 text-xs" 
                      type="number"
                      value={ageMin}
                      onChange={(e) => setAgeMin(e.target.value)}
                    />
                    <Input 
                      placeholder="Max" 
                      className="h-9 text-xs" 
                      type="number"
                      value={ageMax}
                      onChange={(e) => setAgeMax(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-sm text-white/60">Verified Only</span>
                  <button
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={cn(
                      "w-11 h-6 rounded-full relative transition-colors",
                      verifiedOnly ? "bg-primary" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      verifiedOnly ? "left-6" : "left-1"
                    )} />
                  </button>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full rounded-xl mt-4"
                  onClick={resetFilters}
                >
                  Reset All
                </Button>
              </div>
            </div>

            <Card variant="glass" className="p-4 space-y-4 border-primary/20 bg-primary/5">
              <div className="flex items-center space-x-2 text-primary">
                <Zap className="h-5 w-5" />
                <span className="font-bold">AI Match Score</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Complete your profile to see how well you match with these auditions using our smart AI analysis.
              </p>
              <Button size="sm" className="w-full rounded-lg" onClick={() => navigate("/profile")}>Complete Profile</Button>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/40">Showing <span className="text-white font-bold">{filteredAuditions.length}</span> auditions</p>
              <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
                <Button 
                  variant={viewMode === "grid" ? "glass" : "ghost"} 
                  size="icon" 
                  className="h-8 w-8 rounded-md"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "glass" : "ghost"} 
                  size="icon" 
                  className="h-8 w-8 rounded-md"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className={cn(
              "grid gap-6",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            )}>
              <AnimatePresence mode="popLayout">
                {filteredAuditions.map((audition) => (
                  <motion.div
                    key={audition.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card 
                      variant="outline" 
                      className={cn(
                        "group hover:border-white/20 transition-all cursor-pointer",
                        viewMode === "list" && "flex flex-col md:flex-row md:items-center gap-6"
                      )}
                      onClick={() => {
                        setSelectedAudition(audition);
                        setIsApplyModalOpen(true);
                      }}
                    >
                      {viewMode === "list" && (
                        <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={`https://picsum.photos/seed/audition${audition.id}/200/200`} 
                            alt="Audition" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      
                      <div className="flex-grow space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                              {audition.category}
                            </Badge>
                            {audition.isVerified && (
                              <Badge variant="glass" className="bg-emerald-500/10 text-emerald-500 border-none">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                              "h-8 w-8 rounded-full hover:bg-white/10",
                              bookmarkedIds.has(audition.id) && "text-primary"
                            )}
                            onClick={(e) => handleBookmark(audition.id, e)}
                          >
                            {bookmarkedIds.has(audition.id) ? (
                              <BookmarkCheck className="h-4 w-4" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{audition.title}</h3>
                          <p className="text-sm text-white/40">{audition.company}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-white/50">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{audition.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{audition.applicantsCount} applicants</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{audition.ageRange} yrs</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
                              {audition.matchScore}%
                            </div>
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Match Score</span>
                          </div>
                          {appliedIds.has(audition.id) ? (
                            <Button variant="glass" size="sm" className="rounded-full bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              <Check className="h-3 w-3 mr-1" />
                              Applied
                            </Button>
                          ) : (
                            <Button variant="primary" size="sm" className="rounded-full">Apply Now</Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)}
        title="Audition Details"
        className="max-w-2xl"
      >
        {selectedAudition && (
          <div className="space-y-6">
            {/* Header: role + match pill */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <h3 className="text-2xl font-bold text-white">{selectedAudition.title}</h3>
                <p className="text-primary font-medium text-sm">{selectedAudition.company}</p>
              </div>
              <span className="shrink-0 rounded-full bg-violet-500 px-4 py-1.5 text-sm font-semibold text-white">
                {selectedAudition.matchScore != null ? `${selectedAudition.matchScore}% Match` : "Match"}
              </span>
            </div>

            {/* Attribute cards - horizontal row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.08] border border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Location</p>
                <p className="text-sm font-bold text-white">{selectedAudition.location}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.08] border border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Gender</p>
                <p className="text-sm font-bold text-white">{selectedAudition.gender}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.08] border border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Age Range</p>
                <p className="text-sm font-bold text-white">{selectedAudition.ageRange}{/\d-\d/.test(selectedAudition.ageRange || "") ? " yrs" : ""}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.08] border border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Pay</p>
                <p className="text-sm font-bold text-emerald-400">{selectedAudition.isPaid ? "Paid Role" : "Unpaid"}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Description</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {selectedAudition.description}
              </p>
            </div>

            {/* Audition Slots */}
            {auditionSlots.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1">
                  <CalendarClock className="h-3.5 w-3.5" /> Available Slots — Pick a Time
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {auditionSlots.map(slot => (
                    <button
                      key={slot.id}
                      disabled={slot.isBooked}
                      onClick={() => {
                        if (bookSlot(slot.id, "My Actor Name")) {
                          setBookedSlotId(slot.id);
                          showNotification("Slot booked! Check your dashboard.", "success");
                        }
                      }}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all text-sm",
                        slot.id === bookedSlotId
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                          : slot.isBooked
                          ? "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
                          : "bg-white/5 border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white"
                      )}
                    >
                      <p className="font-semibold text-xs">{formatSlotTime(slot)}</p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        {slot.duration} min · {slot.location || "TBC"}
                        {slot.isBooked && " · Booked"}
                        {slot.id === bookedSlotId && " · Your slot!"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual Audition alert - soft orange tint, orange border */}
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Virtual Audition Required</p>
                  <p className="text-xs text-white/70 mt-0.5">You'll need to upload a 2-minute video reel.</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                className="shrink-0 border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
                onClick={() => setIsScriptModalOpen(true)}
                disabled={!selectedAudition?.script}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Script
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <Button 
                variant="outline" 
                className={cn(
                  "flex-1 rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10",
                  bookmarkedIds.has(selectedAudition.id) && "border-primary/50 text-primary"
                )}
                onClick={handleSaveForLater}
              >
                {bookmarkedIds.has(selectedAudition.id) ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </>
                )}
              </Button>
              <Button 
                className="flex-1 rounded-xl bg-primary text-white hover:bg-primary/90 border-0"
                onClick={handleConfirmApplication}
                disabled={appliedIds.has(selectedAudition.id)}
              >
                {appliedIds.has(selectedAudition.id) ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Application Sent
                  </>
                ) : (
                  'Confirm Application'
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Script Modal */}
      <Modal 
        isOpen={isScriptModalOpen} 
        onClose={() => setIsScriptModalOpen(false)}
        title="Audition Script"
        className="max-w-2xl"
      >
        {selectedAudition?.script && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">{selectedAudition.title}</h3>
                <p className="text-sm text-white/50">{selectedAudition.company}</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed">
                {selectedAudition.script}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-white/40">
                Deadline: {selectedAudition.deadline}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(selectedAudition.script || '');
                  showNotification('Script copied to clipboard!', 'success');
                }}
              >
                Copy Script
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50"
          >
            <div className={cn(
              "px-6 py-3 rounded-full shadow-lg flex items-center space-x-2",
              notification.type === 'success' 
                ? "bg-emerald-500 text-white" 
                : "bg-white/10 backdrop-blur-md text-white border border-white/20"
            )}>
              {notification.type === 'success' && <CheckCircle2 className="h-4 w-4" />}
              {notification.type === 'info' && <Info className="h-4 w-4" />}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
