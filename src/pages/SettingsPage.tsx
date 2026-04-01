import * as React from "react";
import { motion } from "motion/react";
import { 
  User, 
  Bell, 
  Lock, 
  Eye, 
  CreditCard, 
  Globe, 
  Shield,
  Smartphone,
  ChevronRight,
  Mail,
  Check
} from "lucide-react";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile Settings", icon: <User className="h-4 w-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { id: "security", label: "Security & Privacy", icon: <Lock className="h-4 w-4" /> },
  { id: "billing", label: "Billing & Subscription", icon: <CreditCard className="h-4 w-4" /> },
  { id: "preferences", label: "App Preferences", icon: <Globe className="h-4 w-4" /> },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <Sidebar />
      
      <main className="flex-grow md:ml-64 p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>

        <header className="space-y-1">
          <h1 className="text-3xl font-bold font-display">Account <span className="text-primary">Settings</span></h1>
          <p className="text-white/50 text-sm">Manage your account preferences and security settings.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {SETTINGS_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all group",
                  activeTab === section.id 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activeTab === section.id ? "bg-primary text-white" : "bg-white/5 group-hover:bg-white/10"
                  )}>
                    {section.icon}
                  </div>
                  <span className="font-medium text-sm">{section.label}</span>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  activeTab === section.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                )} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <Card variant="outline" className="p-8 space-y-8 border-white/5">
              {activeTab === "profile" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Public Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                        <Input defaultValue="Dhanush Nagireddy" className="rounded-xl border-white/10 bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                        <Input defaultValue="dhanush.nagireddy@hrud.ai" className="rounded-xl border-white/10 bg-white/5" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Professional Bio</label>
                        <textarea 
                          className="w-full min-h-[120px] rounded-xl border border-white/10 bg-white/5 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          defaultValue="Method actor with 5+ years of experience in regional cinema and theater. Specialized in intense dramatic roles."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-white/30 italic">Last updated: March 4, 2026</p>
                    <Button 
                      onClick={handleSave}
                      className={cn(
                        "rounded-xl min-w-[120px] transition-all",
                        isSaved ? "bg-emerald-500 hover:bg-emerald-600" : ""
                      )}
                    >
                      {isSaved ? (
                        <span className="flex items-center"><Check className="mr-2 h-4 w-4" /> Saved</span>
                      ) : "Save Changes"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { label: "New Audition Matches", desc: "Get notified when a casting call matches your profile." },
                      { label: "Submission Updates", desc: "Receive alerts when a director reviews your self-tape." },
                      { label: "Direct Messages", desc: "Notifications for messages from casting directors." },
                      { label: "Marketing & Tips", desc: "Occasional emails about industry trends and tips." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs text-white/40">{item.desc}</p>
                        </div>
                        <div className="w-12 h-6 rounded-full bg-primary/20 border border-primary/30 relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary shadow-lg" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab !== "profile" && activeTab !== "notifications" && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-white/20" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">Coming Soon</h3>
                    <p className="text-sm text-white/40">We're working hard to bring you more control over your account.</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
