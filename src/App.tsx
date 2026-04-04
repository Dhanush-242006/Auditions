import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import { LangProvider } from "./lib/i18n";
import { LandingPage } from "./pages/LandingPage";
import { AuditionListingsPage } from "./pages/AuditionListingsPage";
import { ActorDashboard } from "./pages/ActorDashboard";
import { CastingDirectorDashboard } from "./pages/CastingDirectorDashboard";
import { ProfilePage } from "./pages/ProfilePage";
import { VirtualAuditionPage } from "./pages/VirtualAuditionPage";
import { AdminPanel } from "./pages/AdminPanel";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PostAuditionPage } from "./pages/PostAuditionPage";
import { ActorsPage } from "./pages/ActorsPage";
import { AboutPage } from "./pages/AboutPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { AlertsPage } from "./pages/AlertsPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { SettingsPage } from "./pages/SettingsPage";
import { CareersPage } from "./pages/CareersPage";
import { PressPage } from "./pages/PressPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogPage } from "./pages/BlogPage";
import { SuccessStoriesPage } from "./pages/SuccessStoriesPage";
import { CastingTipsPage } from "./pages/CastingTipsPage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";
import { DirectorProfilePage } from "./pages/DirectorProfilePage";
import { MyProjectsPage } from "./pages/MyProjectsPage";
import { AICastingAssistantPage } from "./pages/AICastingAssistantPage";
import { NetworkingPage } from "./pages/NetworkingPage";
import { SelfTapePage } from "./pages/SelfTapePage";
import { ShortlistManagerPage } from "./pages/ShortlistManagerPage";
import { VerificationBadgePage } from "./pages/VerificationBadgePage";
import { RegionalPage } from "./pages/RegionalPage";
import { TeamCollaborationPage } from "./pages/TeamCollaborationPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { TalentFlowPage } from "./pages/TalentFlowPage";

/** Routes that share the app sidebar — switching between them should not jump scroll to top. */
const APP_SHELL_PATHS = new Set([
  "/dashboard",
  "/auditions",
  "/profile",
  "/submissions",
  "/self-tape",
  "/alerts",
  "/bookmarks",
  "/networking",
  "/regional",
  "/verification",
  "/ai-assistant",
  "/settings",
  "/director-dashboard",
  "/post-audition",
  "/actors",
  "/shortlist-manager",
  "/team-collab",
  "/my-projects",
  "/analytics",
  "/director-profile",
  "/admin",
  "/virtual-audition",
  "/talent-flow",
]);

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    if (prev !== null && APP_SHELL_PATHS.has(prev) && APP_SHELL_PATHS.has(pathname)) {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LangProvider>
    <ThemeProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/auditions" element={<AuditionListingsPage />} />
        <Route path="/post-audition" element={<PostAuditionPage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/success" element={<SuccessStoriesPage />} />
        <Route path="/tips" element={<CastingTipsPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/dashboard" element={<ActorDashboard />} />
        <Route path="/director-dashboard" element={<CastingDirectorDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/director-profile" element={<DirectorProfilePage />} />
        <Route path="/my-projects" element={<MyProjectsPage />} />
        <Route path="/ai-assistant" element={<AICastingAssistantPage />} />
        <Route path="/networking" element={<NetworkingPage />} />
        <Route path="/self-tape" element={<SelfTapePage />} />
        <Route path="/shortlist-manager" element={<ShortlistManagerPage />} />
        <Route path="/verification" element={<VerificationBadgePage />} />
        <Route path="/regional" element={<RegionalPage />} />
        <Route path="/team-collab" element={<TeamCollaborationPage />} />
        <Route path="/virtual-audition" element={<VirtualAuditionPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/talent-flow" element={<TalentFlowPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </LangProvider>
  );
}
