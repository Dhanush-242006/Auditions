import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Search,
  User,
  Bell,
  Bookmark,
  Video,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Users,
  BarChart3,
  Briefcase,
  X,
  Sparkles,
  Menu,
  Sun,
  Moon,
  Footprints,
  Clapperboard,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { supabase } from "@/src/lib/supabase";
import { useTheme } from "@/src/lib/theme";
import { useLang } from "@/src/lib/i18n";

interface SidebarProps {
  className?: string;
  role?: "actor" | "director";
}

/** Shared nav row — w-full + min-w-0 prevents text from pushing beyond sidebar width. */
const navItemClass =
  "flex items-center gap-3 px-3 min-h-[2.75rem] py-2.5 rounded-xl transition-all leading-[1.4] w-full min-w-0";

export function Sidebar({ className, role: roleProp }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();

  const role = React.useMemo<"actor" | "director">(() => {
    if (roleProp) return roleProp;
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.role === "casting_director" || parsed.role === "admin") return "director";
        return "actor";
      }
    } catch {}
    return "actor";
  }, [roleProp]);

  const actorMenuItems = [
    { name: t("dashboard"),    icon: <LayoutDashboard className="h-5 w-5" />, href: "/dashboard" },
    { name: t("talent"),       icon: <Search className="h-5 w-5" />, href: "/auditions" },
    { name: t("myProfile"),    icon: <User className="h-5 w-5" />, href: "/profile" },
    { name: t("submissions"),  icon: <Video className="h-5 w-5" />, href: "/submissions" },
    { name: t("selfTape"),     icon: <Video className="h-5 w-5" />, href: "/self-tape" },
    { name: t("alerts"),       icon: <Bell className="h-5 w-5" />, href: "/alerts" },
    { name: t("bookmarks"),    icon: <Bookmark className="h-5 w-5" />, href: "/bookmarks" },
    { name: t("networking"),   icon: <Users className="h-5 w-5" />, href: "/networking" },
    { name: t("regional"),     icon: <ShieldCheck className="h-5 w-5" />, href: "/regional" },
    { name: t("verification"), icon: <ShieldCheck className="h-5 w-5" />, href: "/verification" },
    { name: t("aiAssistant"),  icon: <Sparkles className="h-5 w-5" />, href: "/ai-assistant", highlight: true },
    { name: "My Journey",      icon: <Footprints className="h-5 w-5" />, href: "/talent-flow" },
  ];

  const directorMenuItems = [
    { name: t("console"),          icon: <LayoutDashboard className="h-5 w-5" />, href: "/director-dashboard" },
    { name: t("castingAgent"),     icon: <PlusCircle className="h-5 w-5" />, href: "/post-audition" },
    { name: t("applicantDB"),      icon: <Users className="h-5 w-5" />, href: "/actors" },
    { name: t("shortlistManager"), icon: <Users className="h-5 w-5" />, href: "/shortlist-manager" },
    { name: t("teamCollab"),       icon: <Users className="h-5 w-5" />, href: "/team-collab" },
    { name: t("myProjects"),       icon: <Briefcase className="h-5 w-5" />, href: "/my-projects" },
    { name: t("analytics"),        icon: <BarChart3 className="h-5 w-5" />, href: "/analytics" },
    { name: t("profile"),          icon: <User className="h-5 w-5" />, href: "/director-profile" },
    { name: t("aiAssistant"),      icon: <Sparkles className="h-5 w-5" />, href: "/ai-assistant", highlight: true },
  ];

  const menuItems = role === "director" ? directorMenuItems : actorMenuItems;

  const bottomItems = [
    { name: t("settings"), icon: <Settings className="h-5 w-5" />, href: "/settings" },
  ];

  const handleLogout = async () => {
    localStorage.removeItem("user");
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-neutral-900 border border-white/10 rounded-xl p-2.5 shadow-lg"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-72 bg-neutral-900 border-r border-white/5 transition-all duration-300 z-50 flex flex-col md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-5 flex items-center justify-between border-b border-white/5">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Clapperboard className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg font-bold font-display tracking-tight">Auditions Adda</span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setIsMobileOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="sidebar-nav flex-grow min-h-0 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {(menuItems as any[]).map((item) => (
            <Link key={item.name} to={item.href} onClick={() => setIsMobileOpen(false)}
              className={cn(navItemClass, "group",
                location.pathname === item.href ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : item.highlight ? "text-white/70 hover:bg-primary/10 hover:text-primary border border-dashed border-primary/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}>
              <div className={cn("flex-shrink-0", location.pathname === item.href ? "text-white" : item.highlight ? "text-primary" : "")}>
                {item.icon}
              </div>
              <span className="text-sm font-medium truncate flex-1 min-w-0">{item.name}</span>
              {item.highlight && location.pathname !== item.href && (
                <span className="flex-shrink-0 text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">AI</span>
              )}
            </Link>
          ))}
        </div>
        <div className="flex-shrink-0 p-3 space-y-1 border-t border-white/5">
          {bottomItems.map((item) => (
            <Link key={item.name} to={item.href} onClick={() => setIsMobileOpen(false)}
              className={cn(navItemClass, "text-white/50 hover:bg-white/5 hover:text-white")}>
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="text-sm font-medium truncate flex-1 min-w-0">{item.name}</span>
            </Link>
          ))}
          <button type="button" onClick={handleLogout}
            className={cn(navItemClass, "text-white/50 hover:bg-rose-500/10 hover:text-rose-400")}>
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium truncate flex-1 min-w-0">Logout</span>
          </button>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-neutral-900 border-r border-white/5 transition-all duration-300 z-40 flex-col hidden md:flex overflow-hidden",
          isCollapsed ? "w-20" : "w-64",
          className
        )}
      >
      <div className="flex-shrink-0 p-5 flex items-center justify-between border-b border-white/5">
        {!isCollapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Clapperboard className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg font-bold font-display tracking-tight">Auditions Adda</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Clapperboard className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex rounded-full h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <div className="sidebar-nav flex-grow min-h-0 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {(menuItems as any[]).map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              navItemClass,
              "group",
              location.pathname === item.href
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : item.highlight
                ? "text-white/70 hover:bg-primary/10 hover:text-primary border border-dashed border-primary/20"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className={cn(
              "flex-shrink-0 transition-transform group-hover:scale-110",
              location.pathname === item.href ? "text-white" : item.highlight ? "text-primary" : "text-white/50 group-hover:text-primary"
            )}>
              {item.icon}
            </div>
            {!isCollapsed && <span className="text-sm font-medium truncate flex-1 min-w-0">{item.name}</span>}
            {!isCollapsed && item.highlight && location.pathname !== item.href && (
              <span className="flex-shrink-0 text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">AI</span>
            )}
          </Link>
        ))}

        {/* Verified badge card — inside scrollable area so it doesn't break fixed footer */}
        {!isCollapsed && (
          <div className="pt-2 pb-1">
            <Card variant="glass" className="p-4 bg-primary/5 border-primary/20 space-y-2">
              <div className="flex items-center space-x-2 text-primary">
                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest truncate">
                  {role === "director" ? t("verifiedStudio") : t("verifiedPro")}
                </span>
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed">
                {role === "director"
                  ? "Your studio profile is verified. You get priority in listing visibility."
                  : "Your profile is verified. You get priority in casting call results."}
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* ── FIXED FOOTER ── */}
      <div className="flex-shrink-0 p-3 space-y-1 border-t border-white/5">
        {bottomItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(navItemClass, "group text-white/50 hover:bg-white/5 hover:text-white")}
          >
            <div className="flex-shrink-0 transition-transform group-hover:scale-110 group-hover:text-primary">
              {item.icon}
            </div>
            {!isCollapsed && <span className="text-sm font-medium truncate flex-1 min-w-0">{item.name}</span>}
          </Link>
        ))}
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(navItemClass, "text-white/50 hover:bg-white/5 hover:text-white")}
        >
          <div className="flex-shrink-0">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </div>
          {!isCollapsed && <span className="text-sm font-medium truncate flex-1 min-w-0">{theme === "dark" ? t("lightMode") : t("darkMode")}</span>}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className={cn(navItemClass, "text-white/50 hover:bg-rose-500/10 hover:text-rose-400")}
        >
          <div className="flex-shrink-0">
            <LogOut className="h-5 w-5" />
          </div>
          {!isCollapsed && <span className="text-sm font-medium truncate flex-1 min-w-0">{t("logout")}</span>}
        </button>
      </div>
    </aside>
    </>
  );
}
