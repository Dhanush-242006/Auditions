import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Clapperboard, Palette } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/src/lib/utils";
import { useTheme } from "@/src/lib/theme";
import { useLang, LANGUAGES } from "@/src/lib/i18n";
import { useColorTheme, COLOR_THEMES } from "@/src/lib/colorTheme";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isColorOpen, setIsColorOpen] = React.useState(false);
  const colorPanelRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const { colorTheme, setColorTheme, currentTheme } = useColorTheme();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close colour panel on outside click
  React.useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (colorPanelRef.current && !colorPanelRef.current.contains(e.target as Node)) {
        setIsColorOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const navLinks = [
    { name: t("nav_talent"), href: "/auditions" },
    { name: t("nav_actors"), href: "/actors" },
    { name: t("nav_blog"),   href: "/blog" },
    { name: t("nav_about"),  href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Clapperboard className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-bold font-display tracking-tight">
            Auditions <span className="text-primary">Adda</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.href ? "text-primary" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language switcher */}
          <select
            value={lang}
            onChange={e => setLang(e.target.value as any)}
            className="bg-transparent border border-white/20 rounded-full px-3 py-1.5 text-xs text-white/70 focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code} className="bg-neutral-900 text-white">{l.native}</option>
            ))}
          </select>

          {/* Colour theme picker */}
          <div className="relative" ref={colorPanelRef}>
            <button
              onClick={() => setIsColorOpen(v => !v)}
              title="Change accent colour"
              className="flex items-center gap-1.5 border border-white/20 rounded-full px-2.5 py-1.5 text-xs text-white/70 hover:border-primary/50 hover:text-white transition-colors focus:outline-none"
            >
              <span
                className="w-3 h-3 rounded-full ring-1 ring-white/30 flex-shrink-0"
                style={{ background: currentTheme.primary }}
              />
              <Palette className="h-3 w-3" />
            </button>

            <AnimatePresence>
              {isColorOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50"
                >
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2.5 px-1 font-semibold">Accent Colour</p>
                  <div className="grid grid-cols-4 gap-2">
                    {COLOR_THEMES.map(c => (
                      <button
                        key={c.key}
                        onClick={() => { setColorTheme(c.key); setIsColorOpen(false); }}
                        title={c.label}
                        className={cn(
                          "group flex flex-col items-center gap-1 rounded-xl p-1.5 transition-all",
                          colorTheme === c.key
                            ? "bg-white/10 ring-1 ring-white/30"
                            : "hover:bg-white/5"
                        )}
                      >
                        <span
                          className={cn(
                            "w-7 h-7 rounded-full ring-2 transition-transform group-hover:scale-110",
                            colorTheme === c.key ? "ring-white/60 scale-110" : "ring-transparent"
                          )}
                          style={{ background: c.primary }}
                        />
                        <span className="text-[9px] text-white/50 group-hover:text-white/80 transition-colors leading-none">
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark / Light toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Link to="/login">
            <Button variant="primary" size="sm" className="rounded-full">
              {t("nav_dashboard")}
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900 border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile: Language */}
              <select
                value={lang}
                onChange={e => setLang(e.target.value as any)}
                className="bg-neutral-800 border border-white/20 rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none cursor-pointer w-full"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code} className="bg-neutral-900 text-white">{l.native}</option>
                ))}
              </select>

              {/* Mobile: Colour swatches */}
              <div>
                <p className="text-xs text-white/40 mb-2 font-semibold uppercase tracking-widest">Accent Colour</p>
                <div className="flex flex-wrap gap-2">
                  {COLOR_THEMES.map(c => (
                    <button
                      key={c.key}
                      onClick={() => setColorTheme(c.key)}
                      title={c.label}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all",
                        colorTheme === c.key
                          ? "border-white/40 text-white bg-white/10"
                          : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                      )}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ background: c.primary }} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col space-y-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">
                    {t("nav_dashboard")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
