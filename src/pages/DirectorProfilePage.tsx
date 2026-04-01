import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Globe, 
  ShieldCheck, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Plus, 
  Edit3, 
  Share2,
  CheckCircle2,
  Star,
  Users,
  Film,
  Award,
  Briefcase
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Tabs } from "@/src/components/ui/Tabs";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

export function DirectorProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("projects");

  const companyInfo = {
    name: "Excel Entertainment",
    type: "Production House",
    founded: "2002",
    location: "Mumbai, Maharashtra",
    employees: "50-100",
    website: "www.excelentertainment.com",
    description: "Excel Entertainment is one of India's leading production companies, known for producing critically acclaimed and commercially successful films. Founded by Ritesh Sidhwani and Farhan Akhtar, we are committed to creating compelling content across films, web series, and digital platforms.",
  };

  const stats = [
    { label: "Films Produced", value: "45+", icon: Film },
    { label: "Awards Won", value: "120+", icon: Award },
    { label: "Actors Discovered", value: "200+", icon: Users },
    { label: "Active Projects", value: "8", icon: Briefcase },
  ];

  const teamMembers = [
    { name: "Ritesh Sidhwani", role: "Co-Founder & Producer", image: "https://picsum.photos/seed/team1/200/200" },
    { name: "Farhan Akhtar", role: "Co-Founder & Director", image: "https://picsum.photos/seed/team2/200/200" },
    { name: "Priya Sharma", role: "Casting Director", image: "https://picsum.photos/seed/team3/200/200" },
    { name: "Amit Verma", role: "Head of Production", image: "https://picsum.photos/seed/team4/200/200" },
  ];

  const projects = [
    { id: "1", title: "Don 3", type: "Feature Film", status: "In Production", year: "2026", image: "https://picsum.photos/seed/proj1/600/400", castingStatus: "Casting for supporting roles" },
    { id: "2", title: "Inside Edge S4", type: "Web Series", status: "Pre-Production", year: "2026", image: "https://picsum.photos/seed/proj2/600/400", castingStatus: "Open casting calls" },
    { id: "3", title: "Mirzapur S4", type: "Web Series", status: "Completed", year: "2025", image: "https://picsum.photos/seed/proj3/600/400", castingStatus: "Casting closed" },
    { id: "4", title: "Gully Boy 2", type: "Feature Film", status: "Development", year: "2027", image: "https://picsum.photos/seed/proj4/600/400", castingStatus: "Coming soon" },
  ];

  const pastProductions = [
    { title: "Zindagi Na Milegi Dobara", year: "2011", awards: "7 Filmfare Awards" },
    { title: "Dil Dhadakne Do", year: "2015", awards: "3 Filmfare Awards" },
    { title: "Gully Boy", year: "2019", awards: "13 Filmfare Awards" },
    { title: "Toofaan", year: "2021", awards: "2 Filmfare Awards" },
    { title: "Jee Le Zaraa", year: "2024", awards: "5 Filmfare Awards" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex overflow-x-hidden">
      <Sidebar role="director" />
      
      <main className="flex-grow md:ml-64 min-w-0 overflow-x-hidden p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>

        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 md:h-72 rounded-3xl overflow-hidden border border-white/10 relative">
            <img 
              src="https://picsum.photos/seed/studiocover/1200/400" 
              alt="Cover" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
            <div className="absolute bottom-6 right-6 flex items-center space-x-3">
              <Button variant="glass" size="sm" className="rounded-full">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Cover
              </Button>
            </div>
          </div>

          {/* Company Info Card */}
          <div className="relative -mt-20 px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative">
                <div className="w-36 h-36 rounded-2xl border-4 border-neutral-950 overflow-hidden shadow-2xl bg-white flex items-center justify-center">
                  <div className="text-center p-4">
                    <Building2 className="h-12 w-12 text-primary mx-auto mb-2" />
                    <span className="text-xs font-bold text-neutral-800">EXCEL</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-neutral-950 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="space-y-2 pb-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold font-display">{companyInfo.name}</h1>
                  <Badge variant="glass" className="bg-primary/10 text-primary border-none">Verified Studio</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center"><Building2 className="h-4 w-4 mr-1" /> {companyInfo.type}</span>
                  <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {companyInfo.location}</span>
                  <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Est. {companyInfo.founded}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pb-2">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={() => navigator.share ? navigator.share({ title: "Excel Entertainment", url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="rounded-xl px-6 h-12" onClick={() => navigate("/settings")}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} variant="outline" className="p-5 text-center hover:border-primary/30 transition-all">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-white/50">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Info */}
          <div className="space-y-8">
            <Card variant="outline" className="space-y-6">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span>About Us</span>
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {companyInfo.description}
              </p>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Company Size</span>
                  <span className="font-medium">{companyInfo.employees} employees</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Website</span>
                  <a href="#" className="font-medium text-primary hover:underline">{companyInfo.website}</a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">Industry</span>
                  <span className="font-medium">Film & Entertainment</span>
                </div>
              </div>
            </Card>

            <Card variant="outline" className="space-y-6">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Contact Information</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-white/40" />
                  <span className="text-white/70">casting@excelentertainment.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-white/40" />
                  <span className="text-white/70">+91 22 4567 8900</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-white/40" />
                  <span className="text-white/70">Andheri West, Mumbai 400053</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card variant="outline" className="space-y-6">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Key Team Members</span>
              </h3>
              <div className="space-y-4">
                {teamMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-white/40">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full rounded-xl text-xs" onClick={() => navigate("/team-collab")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </Card>
          </div>

          {/* Right Column: Projects & Productions */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <Tabs 
                tabs={[
                  { id: "projects", label: "Current Projects", icon: <Film className="h-4 w-4" /> },
                  { id: "productions", label: "Past Productions", icon: <Award className="h-4 w-4" /> },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="pills"
              />
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold" onClick={() => navigate("/my-projects")}>
                <Plus className="h-4 w-4 mr-1" />
                Add Project
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {projects.map((project) => (
                    <Card 
                      key={project.id} 
                      variant="outline" 
                      className="overflow-hidden group hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="aspect-video overflow-hidden relative">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge 
                            variant={project.status === "Completed" ? "success" : project.status === "In Production" ? "warning" : "secondary"}
                            className="text-xs"
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <div>
                          <h4 className="font-bold group-hover:text-primary transition-colors">{project.title}</h4>
                          <p className="text-xs text-white/40">{project.type} • {project.year}</p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <span className="text-xs text-white/50">{project.castingStatus}</span>
                          <Button variant="ghost" size="sm" className="text-xs h-8 text-primary hover:text-primary" onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}`); }}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              )}

              {activeTab === "productions" && (
                <motion.div
                  key="productions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {pastProductions.map((prod, i) => (
                    <Card key={i} variant="outline" className="flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                          <Film className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold group-hover:text-primary transition-colors">{prod.title}</h4>
                          <p className="text-xs text-white/40">{prod.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="glass" className="bg-amber-500/10 text-amber-500 border-none text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {prod.awards}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
