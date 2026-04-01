import * as React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Facebook, Youtube, Mail, MapPin, Phone, Check, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/src/lib/supabase";

export function Footer() {
  const location = useLocation();
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [newsletterStatus, setNewsletterStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = React.useState("");

  const handleNewsletterJoin = async () => {
    const email = newsletterEmail.trim();
    if (!email) return;
    setNewsletterStatus("loading");
    setNewsletterMessage("");
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, source: "footer" });
    if (error) {
      setNewsletterStatus("error");
      setNewsletterMessage(error.code === "23505" ? "This email is already subscribed." : "Something went wrong. Try again.");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterMessage("Thanks! We'll send updates to this email.");
    setNewsletterEmail("");
  };

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Success Stories", href: "/success" },
        { name: "Casting Tips", href: "/tips" },
        { name: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Popular Cities",
      links: [
        { name: "Mumbai", href: "/auditions?city=mumbai" },
        { name: "Delhi NCR", href: "/auditions?city=delhi" },
        { name: "Hyderabad", href: "/auditions?city=hyderabad" },
        { name: "Bangalore", href: "/auditions?city=bangalore" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Youtube className="h-5 w-5" />, href: "#" },
  ];

  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 mb-20">
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold font-display tracking-tight">
              Auditions <span className="text-primary">Adda</span>
            </span>
          </Link>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed">
            India's premier smart casting marketplace connecting the finest talent with the biggest opportunities in the creative industry.
          </p>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Subscribe to our newsletter</h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterStatus("idle"); }}
                  onKeyDown={(e) => e.key === "Enter" && handleNewsletterJoin()}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary transition-colors flex-grow"
                />
                <button 
                  type="button"
                  onClick={handleNewsletterJoin}
                  disabled={!newsletterEmail.trim() || newsletterStatus === "loading"}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5 min-w-[72px] justify-center"
                >
                  {newsletterStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : newsletterStatus === "success" ? <Check className="h-4 w-4" /> : "Join"}
                </button>
              </div>
              {newsletterMessage && (
                <p className={newsletterStatus === "error" ? "text-rose-400 text-xs" : "text-emerald-400 text-xs"}>
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/90">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Auditions Adda. All rights reserved.
        </p>
        <div className="flex items-center space-x-6 text-xs text-white/30">
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3" />
            <span>Mumbai, Maharashtra</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-3 w-3" />
            <span>hello@auditionsadda.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-3 w-3" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
