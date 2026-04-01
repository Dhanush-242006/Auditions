import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  User, 
  Video, 
  ShieldCheck,
  X,
  Mail,
  Phone,
  Calendar,
  Ruler,
  Eye,
  Instagram,
  Youtube,
  Globe,
  Award,
  Film,
  Briefcase,
  Clock,
  Heart,
  MessageSquare,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { sendInvitation } from "@/src/lib/messaging";
import { addActorReview, getActorReviews, type ActorReview } from "@/src/lib/ratings";

interface Actor {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  image: string;
  verified: boolean;
  skills: string[];
  age: number;
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  languages: string[];
  experience: string;
  education: string;
  bio: string;
  email: string;
  phone: string;
  instagram: string;
  youtube: string;
  website: string;
  availability: string;
  expectedRate: string;
  recentWork: { title: string; role: string; year: string }[];
  awards: string[];
}

const ACTORS: Actor[] = [
  { 
    id: "1", 
    name: "Aryan Khan", 
    role: "Lead Actor", 
    location: "Mumbai", 
    rating: 4.9, 
    image: "https://picsum.photos/seed/actor1/400/500", 
    verified: true, 
    skills: ["Method Acting", "Action", "Horse Riding", "Martial Arts"],
    age: 26,
    height: "5'11\"",
    weight: "75 kg",
    eyeColor: "Brown",
    hairColor: "Black",
    languages: ["Hindi", "English", "Urdu"],
    experience: "5 years",
    education: "Film Studies - USC",
    bio: "Passionate actor with a focus on intense character-driven roles. Trained in method acting at Lee Strasberg Theatre Institute. Looking for challenging roles that push creative boundaries.",
    email: "aryan.k@email.com",
    phone: "+91 98765 43210",
    instagram: "@aryankhan",
    youtube: "AryanKhanOfficial",
    website: "aryankhan.com",
    availability: "Immediate",
    expectedRate: "₹15-25 Lakhs/project",
    recentWork: [
      { title: "The Inheritance", role: "Lead", year: "2025" },
      { title: "City of Dreams", role: "Supporting", year: "2024" },
      { title: "Midnight Sun", role: "Lead", year: "2024" }
    ],
    awards: ["Best Debut - Filmfare 2024", "Rising Star - IIFA 2024"]
  },
  { 
    id: "2", 
    name: "Sara Ali", 
    role: "Lead Actress", 
    location: "Delhi", 
    rating: 4.8, 
    image: "https://picsum.photos/seed/actor2/400/500", 
    verified: true, 
    skills: ["Classical Dance", "Drama", "Kathak", "Contemporary"],
    age: 28,
    height: "5'5\"",
    weight: "55 kg",
    eyeColor: "Hazel",
    hairColor: "Brown",
    languages: ["Hindi", "English", "Punjabi"],
    experience: "7 years",
    education: "History - Columbia University",
    bio: "Versatile actress with classical training in Kathak. Passionate about stories that celebrate Indian culture while pushing modern narratives. Known for emotional depth and dance sequences.",
    email: "sara.ali@email.com",
    phone: "+91 98765 43211",
    instagram: "@saraalikhan",
    youtube: "SaraAliOfficial",
    website: "saraali.in",
    availability: "From April 2026",
    expectedRate: "₹20-35 Lakhs/project",
    recentWork: [
      { title: "Love in Lucknow", role: "Lead", year: "2025" },
      { title: "The Royal Affair", role: "Lead", year: "2025" },
      { title: "Dancing Hearts", role: "Lead", year: "2024" }
    ],
    awards: ["Best Actress - Zee Cine 2025", "Critics Choice - TOIFA 2024"]
  },
  { 
    id: "3", 
    name: "Ishaan Khatter", 
    role: "Lead Actor", 
    location: "Mumbai", 
    rating: 4.7, 
    image: "https://picsum.photos/seed/actor3/400/500", 
    verified: false, 
    skills: ["Contemporary Dance", "Action", "Parkour", "Swimming"],
    age: 29,
    height: "5'10\"",
    weight: "70 kg",
    eyeColor: "Brown",
    hairColor: "Black",
    languages: ["Hindi", "English", "Bengali"],
    experience: "8 years",
    education: "Self-trained, Dance Academy Mumbai",
    bio: "Energetic performer known for physical roles and dance. Trained in various dance forms and action choreography. Brings raw energy and authenticity to every character.",
    email: "ishaan.k@email.com",
    phone: "+91 98765 43212",
    instagram: "@ishaankhatter",
    youtube: "IshaanKhatter",
    website: "ishaankhatter.com",
    availability: "Immediate",
    expectedRate: "₹10-20 Lakhs/project",
    recentWork: [
      { title: "Beyond the Horizon", role: "Lead", year: "2025" },
      { title: "Street Dancer 3", role: "Lead", year: "2024" },
      { title: "The Chase", role: "Supporting", year: "2024" }
    ],
    awards: ["Best Dance Performance - Screen 2024"]
  },
  { 
    id: "4", 
    name: "Janhvi Kapoor", 
    role: "Lead Actress", 
    location: "Mumbai", 
    rating: 4.6, 
    image: "https://picsum.photos/seed/actor4/400/500", 
    verified: true, 
    skills: ["Method Acting", "Drama", "Classical Dance", "Yoga"],
    age: 27,
    height: "5'6\"",
    weight: "52 kg",
    eyeColor: "Brown",
    hairColor: "Black",
    languages: ["Hindi", "English", "Tamil"],
    experience: "6 years",
    education: "Acting Workshop - FTII",
    bio: "Dedicated actress committed to transformative roles. Known for intense preparation and emotional authenticity. Interested in biopics and character-driven narratives.",
    email: "janhvi.k@email.com",
    phone: "+91 98765 43213",
    instagram: "@janhvikapoor",
    youtube: "JanhviKapoorOfficial",
    website: "janhvikapoor.in",
    availability: "From June 2026",
    expectedRate: "₹25-40 Lakhs/project",
    recentWork: [
      { title: "Gunjan Saxena 2", role: "Lead", year: "2025" },
      { title: "The Kargil Girl", role: "Lead", year: "2025" },
      { title: "Mili", role: "Lead", year: "2024" }
    ],
    awards: ["Best Actress - Filmfare 2025", "National Film Award Nomination 2025"]
  },
  { 
    id: "5", 
    name: "Vijay Varma", 
    role: "Character Actor", 
    location: "Hyderabad", 
    rating: 4.9, 
    image: "https://picsum.photos/seed/actor5/400/500", 
    verified: true, 
    skills: ["Method Acting", "Voice Over", "Mimicry", "Improv"],
    age: 38,
    height: "5'9\"",
    weight: "72 kg",
    eyeColor: "Brown",
    hairColor: "Black",
    languages: ["Hindi", "English", "Telugu", "Marathi"],
    experience: "15 years",
    education: "FTII Pune - Acting",
    bio: "Critically acclaimed character actor known for intense, layered performances. Specializes in grey characters and complex antagonists. Method actor with theater background.",
    email: "vijay.v@email.com",
    phone: "+91 98765 43214",
    instagram: "@itsvijayvarma",
    youtube: "VijayVarmaActing",
    website: "vijayvarma.in",
    availability: "Immediate",
    expectedRate: "₹30-50 Lakhs/project",
    recentWork: [
      { title: "Dahaad", role: "Lead", year: "2025" },
      { title: "Mirzapur 3", role: "Supporting", year: "2024" },
      { title: "Darlings", role: "Lead", year: "2024" }
    ],
    awards: ["Best Actor OTT - Filmfare 2025", "Critics Choice - IIFA 2024", "Best Villain - Screen 2024"]
  },
  { 
    id: "6", 
    name: "Radhika Madan", 
    role: "Lead Actress", 
    location: "Delhi", 
    rating: 4.8, 
    image: "https://picsum.photos/seed/actor6/400/500", 
    verified: true, 
    skills: ["Martial Arts", "Drama", "Contemporary Dance", "Stunts"],
    age: 29,
    height: "5'4\"",
    weight: "50 kg",
    eyeColor: "Brown",
    hairColor: "Black",
    languages: ["Hindi", "English", "Haryanvi"],
    experience: "9 years",
    education: "LSR Delhi, Acting Workshop",
    bio: "Dynamic actress known for action-oriented roles and emotional depth. Trained in martial arts and performs own stunts. Passionate about women-centric stories.",
    email: "radhika.m@email.com",
    phone: "+91 98765 43215",
    instagram: "@radhikamadan",
    youtube: "RadhikaMadanOfficial",
    website: "radhikamadan.com",
    availability: "From March 2026",
    expectedRate: "₹15-25 Lakhs/project",
    recentWork: [
      { title: "Kacchey Limbu", role: "Lead", year: "2025" },
      { title: "Sanaa", role: "Lead", year: "2024" },
      { title: "Shiddat", role: "Lead", year: "2024" }
    ],
    awards: ["Best Actress Critics - Filmfare 2025", "Breakthrough Performance - TOIFA 2024"]
  },
];

interface InviteForm {
  auditionTitle: string;
  role: string;
  auditionDate: string;
  location: string;
  message: string;
}

export function ActorsPage() {
  const [selectedActor, setSelectedActor] = React.useState<Actor | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [shortlisted, setShortlisted] = React.useState<string[]>([]);
  const [inviteTarget, setInviteTarget] = React.useState<Actor | null>(null);
  const [inviteSent, setInviteSent] = React.useState(false);
  const [rateTarget, setRateTarget] = React.useState<Actor | null>(null);
  const [ratingValue, setRatingValue] = React.useState(0);
  const [ratingHover, setRatingHover] = React.useState(0);
  const [ratingTags, setRatingTags] = React.useState<string[]>([]);
  const [ratingComment, setRatingComment] = React.useState("");
  const [ratingSent, setRatingSent] = React.useState(false);
  const RATING_TAGS = ["Professional", "Punctual", "Talented", "Prepared", "Collaborative", "Great Screen Presence"];

  const [inviteForm, setInviteForm] = React.useState<InviteForm>({
    auditionTitle: "",
    role: "",
    auditionDate: "",
    location: "",
    message: "",
  });

  const filteredActors = ACTORS.filter((actor) => {
    const matchesSearch =
      actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      actor.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleShortlist = (actorId: string) => {
    setShortlisted(prev =>
      prev.includes(actorId)
        ? prev.filter(id => id !== actorId)
        : [...prev, actorId]
    );
  };

  const handleShareActor = (actor: Actor) => {
    const url = `${window.location.origin}/actors?highlight=${actor.id}`;
    const text = `${actor.name} - ${actor.role} (${actor.location}) | Auditions Adda`;
    if (navigator.share) {
      navigator.share({ title: actor.name, text, url }).catch(() => {
        navigator.clipboard.writeText(url);
      });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const openInviteModal = (actor: Actor) => {
    setInviteTarget(actor);
    setInviteSent(false);
    setInviteForm({ auditionTitle: "", role: "", auditionDate: "", location: "", message: "" });
    setSelectedActor(null);
  };

  const handleSendRating = () => {
    if (!rateTarget || !ratingValue) return;
    addActorReview({
      actorId: rateTarget.id,
      actorName: rateTarget.name,
      directorName: "Excel Entertainment",
      directorCompany: "Excel Entertainment",
      auditionTitle: "General Audition",
      rating: ratingValue,
      tags: ratingTags,
      comment: ratingComment,
    });
    setRatingSent(true);
  };

  const handleSendInvite = () => {
    if (!inviteTarget) return;
    sendInvitation({
      directorName: "Excel Entertainment",
      directorCompany: "Excel Entertainment",
      directorEmail: "casting@excelentertainment.com",
      actorId: inviteTarget.id,
      actorName: inviteTarget.name,
      actorEmail: inviteTarget.email,
      ...inviteForm,
    });
    setInviteSent(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar role="director" />
      
      <main className="flex-grow md:ml-64 p-6 md:p-10 space-y-12">
        <div className="space-y-6">
          <BackButton />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold font-display tracking-tight">Applicant <span className="text-primary">Database</span></h1>
              <p className="text-white/50 max-w-lg">Browse through India's most talented and verified actors. Filter by skills, location, and experience.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input 
                  placeholder="Search actors, skills..." 
                  className="pl-10 bg-white/5 border-white/10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-full border-white/10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActors.map((actor, idx) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div onClick={() => setSelectedActor(actor)} className="cursor-pointer">
                <Card variant="glass" className="group overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={actor.image} 
                      alt={actor.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {actor.verified && (
                        <Badge variant="default" className="bg-primary/90 backdrop-blur-md border-none px-2 py-1">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{actor.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                          <Star className="h-3 w-3 fill-current" />
                          {actor.rating}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {actor.role}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {actor.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 flex flex-wrap gap-2">
                    {actor.skills.slice(0, 2).map(skill => (
                      <span key={skill} className="text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/5 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button variant="outline" className="rounded-full px-12 border-white/10">
            Load More Talent
          </Button>
        </div>
      </main>

      {/* Actor Detail Modal */}
      <AnimatePresence>
        {selectedActor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedActor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={selectedActor.image} 
                    alt={selectedActor.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={() => setSelectedActor(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
                
                {/* Profile Image & Basic Info */}
                <div className="absolute bottom-0 left-6 translate-y-1/2 flex items-end space-x-4">
                  <div className="w-28 h-28 rounded-2xl border-4 border-neutral-900 overflow-hidden">
                    <img 
                      src={selectedActor.image} 
                      alt={selectedActor.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold">{selectedActor.name}</h2>
                      {selectedActor.verified && (
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      )}
                      <div className="flex items-center space-x-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold">{selectedActor.rating}</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm">{selectedActor.role} • {selectedActor.location}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 pt-20 overflow-y-auto max-h-[calc(90vh-12rem)]">
                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mb-6">
                  <Button 
                    className="rounded-xl"
                    onClick={() => handleShortlist(selectedActor.id)}
                    variant={shortlisted.includes(selectedActor.id) ? "secondary" : "default"}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${shortlisted.includes(selectedActor.id) ? "fill-current" : ""}`} />
                    {shortlisted.includes(selectedActor.id) ? "Shortlisted" : "Shortlist"}
                  </Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => openInviteModal(selectedActor)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => openInviteModal(selectedActor)}>
                    <Video className="mr-2 h-4 w-4" />
                    Invite to Audition
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => handleShareActor(selectedActor)} title="Share profile">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="rounded-xl text-amber-400 hover:bg-amber-400/10" onClick={() => { setRateTarget(selectedActor); setRatingSent(false); setRatingValue(0); setRatingTags([]); setRatingComment(""); setSelectedActor(null); }}>
                    <Star className="h-4 w-4 mr-2" />
                    Rate
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - Bio & Details */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Bio */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">About</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{selectedActor.bio}</p>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedActor.skills.map(skill => (
                          <Badge key={skill} variant="glass" className="bg-white/5 border-white/10">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recent Work */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Recent Work</h3>
                      <div className="space-y-2">
                        {selectedActor.recentWork.map((work, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <Film className="h-4 w-4 text-primary" />
                              <div>
                                <p className="font-medium text-sm">{work.title}</p>
                                <p className="text-xs text-white/40">{work.role}</p>
                              </div>
                            </div>
                            <span className="text-xs text-white/40">{work.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Awards */}
                    {selectedActor.awards.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Awards & Recognition</h3>
                        <div className="space-y-2">
                          {selectedActor.awards.map((award, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-amber-500/10 rounded-xl">
                              <Award className="h-4 w-4 text-amber-500" />
                              <span className="text-sm">{award}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Stats & Contact */}
                  <div className="space-y-6">
                    {/* Physical Attributes */}
                    <Card variant="outline" className="p-4 space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Physical Attributes</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-white/40 text-xs">Age</p>
                          <p className="font-medium">{selectedActor.age} years</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Height</p>
                          <p className="font-medium">{selectedActor.height}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Weight</p>
                          <p className="font-medium">{selectedActor.weight}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Eye Color</p>
                          <p className="font-medium">{selectedActor.eyeColor}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Hair Color</p>
                          <p className="font-medium">{selectedActor.hairColor}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Experience</p>
                          <p className="font-medium">{selectedActor.experience}</p>
                        </div>
                      </div>
                    </Card>

                    {/* Languages */}
                    <Card variant="outline" className="p-4 space-y-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedActor.languages.map(lang => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </Card>

                    {/* Availability & Rate */}
                    <Card variant="outline" className="p-4 space-y-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Availability</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm">{selectedActor.availability}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span className="text-sm">{selectedActor.expectedRate}</span>
                        </div>
                      </div>
                    </Card>

                    {/* Contact & Social */}
                    <Card variant="outline" className="p-4 space-y-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Contact</h3>
                      <div className="space-y-2">
                        <a href={`mailto:${selectedActor.email}`} className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
                          <Mail className="h-4 w-4" />
                          <span>{selectedActor.email}</span>
                        </a>
                        <a href={`tel:${selectedActor.phone}`} className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
                          <Phone className="h-4 w-4" />
                          <span>{selectedActor.phone}</span>
                        </a>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex items-center space-x-3">
                        <a href={`https://instagram.com/${selectedActor.instagram}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <Instagram className="h-4 w-4" />
                        </a>
                        <a href={`https://youtube.com/${selectedActor.youtube}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <Youtube className="h-4 w-4" />
                        </a>
                        <a href={`https://${selectedActor.website}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <Globe className="h-4 w-4" />
                        </a>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite to Audition Modal */}
      <AnimatePresence>
        {inviteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setInviteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Invite to Audition</h3>
                    <p className="text-xs text-white/40">Sending to {inviteTarget.name} · {inviteTarget.email}</p>
                  </div>
                </div>
                <button onClick={() => setInviteTarget(null)} className="text-white/30 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {inviteSent ? (
                <div className="p-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Invitation Sent!</h4>
                  <p className="text-sm text-white/50">
                    Your audition invitation has been sent to <span className="text-white font-medium">{inviteTarget.name}</span> at <span className="text-primary">{inviteTarget.email}</span>. They can now reply from their dashboard.
                  </p>
                  <Button className="rounded-xl mt-2" onClick={() => setInviteTarget(null)}>Done</Button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Audition Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Lead Actor - Period Drama"
                        value={inviteForm.auditionTitle}
                        onChange={e => setInviteForm(f => ({ ...f, auditionTitle: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Raja Vikram"
                        value={inviteForm.role}
                        onChange={e => setInviteForm(f => ({ ...f, role: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Audition Date</label>
                      <input
                        type="date"
                        value={inviteForm.auditionDate}
                        onChange={e => setInviteForm(f => ({ ...f, auditionDate: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai Studio, Andheri"
                        value={inviteForm.location}
                        onChange={e => setInviteForm(f => ({ ...f, location: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Personal Message</label>
                    <textarea
                      rows={4}
                      placeholder={`Hi ${inviteTarget.name}, we'd love to invite you to audition for...`}
                      value={inviteForm.message}
                      onChange={e => setInviteForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>
                  <p className="text-[10px] text-white/30 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Invitation will be sent to {inviteTarget.email} and saved to their dashboard inbox.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setInviteTarget(null)}>Cancel</Button>
                    <Button
                      className="flex-1 rounded-xl"
                      disabled={!inviteForm.auditionTitle || !inviteForm.message}
                      onClick={handleSendInvite}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Invitation
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rate Actor Modal */}
      <AnimatePresence>
        {rateTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setRateTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div>
                  <h3 className="font-bold text-white">Rate {rateTarget.name}</h3>
                  <p className="text-xs text-white/40">Your review helps the community</p>
                </div>
                <button onClick={() => setRateTarget(null)} className="text-white/30 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              {ratingSent ? (
                <div className="p-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto">
                    <Star className="h-7 w-7 text-amber-400 fill-current" />
                  </div>
                  <p className="font-bold text-white">Review Submitted!</p>
                  <p className="text-sm text-white/40">Thank you for rating {rateTarget.name}.</p>
                  <Button className="rounded-xl mt-2" onClick={() => setRateTarget(null)}>Done</Button>
                </div>
              ) : (
                <div className="p-5 space-y-5">
                  {/* Stars */}
                  <div className="flex justify-center gap-2">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onMouseEnter={() => setRatingHover(s)} onMouseLeave={() => setRatingHover(0)} onClick={() => setRatingValue(s)}>
                        <Star className={`h-8 w-8 transition-colors ${s <= (ratingHover || ratingValue) ? "text-amber-400 fill-current" : "text-white/20"}`} />
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-xs text-white/40">{["","Poor","Fair","Good","Very Good","Excellent"][ratingHover || ratingValue] || "Tap to rate"}</p>
                  {/* Tags */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Quick Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {RATING_TAGS.map(t => (
                        <button key={t} onClick={() => setRatingTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                          className={`px-3 py-1 rounded-full text-xs border transition-all ${ratingTags.includes(t) ? "bg-primary/20 border-primary text-primary" : "border-white/10 text-white/50 hover:border-white/20"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Comment */}
                  <textarea rows={3} placeholder="Add a comment (optional)..." value={ratingComment} onChange={e => setRatingComment(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 resize-none" />
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setRateTarget(null)}>Cancel</Button>
                    <Button className="flex-1 rounded-xl" disabled={!ratingValue} onClick={handleSendRating}>Submit Review</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
