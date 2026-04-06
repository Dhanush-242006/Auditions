import * as React from "react";
import { motion } from "motion/react";
import { Play, Search, Shield, Zap, Bell, Users, Star, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Link } from "react-router-dom";

export function LandingPage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "AI Smart Matching",
      description: "Our proprietary AI analyzes your profile and matches you with auditions that fit your skills perfectly.",
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-500" />,
      title: "Verified Listings",
      description: "Every casting call is manually verified by our team to ensure safety and authenticity for all actors.",
    },
    {
      icon: <Play className="h-6 w-6 text-accent" />,
      title: "Virtual Auditions",
      description: "Record and submit your auditions directly through our platform with professional-grade tools.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Blurred Identity",
      description: "Protect your privacy with our unique blurred identity mode until you're ready to reveal your profile.",
    },
    {
      icon: <Bell className="h-6 w-6 text-amber-500" />,
      title: "Saved Alerts",
      description: "Never miss an opportunity. Get instant notifications for auditions that match your specific criteria.",
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Premium Portfolio",
      description: "Showcase your talent with a cinematic digital portfolio that stands out to casting directors.",
    },
  ];

  const stats = [
    { label: "Active Actors", value: "50K+" },
    { label: "Casting Directors", value: "2K+" },
    { label: "Auditions Posted", value: "10K+" },
    { label: "Success Stories", value: "5K+" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <Badge variant="glass" className="px-4 py-1.5 text-sm">
              ✨ India's #1 Casting Platform
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold font-display leading-[1.1] tracking-tight">
              India's Smart <br />
              <span className="text-gradient">Casting Marketplace</span>
            </h1>
            <p className="text-xl text-white/60 max-w-lg leading-relaxed">
              Connect with top casting directors, discover verified opportunities, and launch your career with AI-powered talent matching.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/login" state={{ from: "/auditions" }}>
                <Button size="lg" className="rounded-full w-full sm:w-auto">
                  Talent
                  <Search className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login" state={{ from: "/director-dashboard" }}>
                <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
                  Casting Agent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-950 overflow-hidden">
                    <img src={`https://picsum.photos/seed/actor${i}/100/100`} alt="Actor" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40">
                Joined by <span className="text-white font-bold">2,000+</span> new actors this week
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://picsum.photos/seed/cinema/1200/800"
                alt="Cinematic Background"
                className="w-full h-full object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              
              {/* Floating UI Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-10 glass p-4 rounded-2xl shadow-2xl max-w-[200px]"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-bold">Profile Verified</span>
                </div>
                <p className="text-[10px] text-white/60">Your profile is now visible to top casting directors.</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -right-10 glass p-4 rounded-2xl shadow-2xl max-w-[220px]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold">AI Match Score</span>
                  <Badge variant="secondary" className="text-[10px]">98%</Badge>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[98%]" />
                </div>
                <p className="text-[10px] text-white/60 mt-2">Perfect match for "Lead Actor - Netflix Original"</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold font-display text-primary">{stat.value}</h3>
              <p className="text-white/40 text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <Badge variant="outline" className="px-4 py-1">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">Everything you need to <span className="text-primary">succeed</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Our platform is built with the latest technology to help you navigate the complex world of casting with ease and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card
                key={i}
                variant="glass"
                whileHover={{ y: -10 }}
                className="group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auditions Carousel (Static for now) */}
      <section className="py-32 px-6 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-1">Opportunities</Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-display">Featured Casting Calls</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="outline" className="p-0 overflow-hidden group hover:border-white/20 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/casting${i}/600/400`}
                    alt="Casting"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="glass">Verified</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-white border-none">95% Match</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-bold uppercase tracking-widest">Feature Film</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Lead Actor - Period Drama</h3>
                  <p className="text-sm text-white/50 line-clamp-2">
                    Looking for a versatile actor for a lead role in an upcoming historical drama series for a major streaming platform.
                  </p>
                  <div className="flex items-center pt-4 border-t border-white/5">
                    <div className="flex items-center space-x-2 text-xs text-white/40">
                      <MapPin className="h-3 w-3" />
                      <span>Mumbai, India</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 -z-10" />
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold font-display">Ready to start your <br /><span className="text-primary">journey?</span></h2>
          <p className="text-xl text-white/60">
            Join thousands of actors and casting directors who are already using Auditions Adda to build the future of Indian cinema.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup"><Button size="lg" className="rounded-full px-12">Create Actor Profile</Button></Link>
            <Link to="/signup"><Button variant="outline" size="lg" className="rounded-full px-12">I'm a Casting Director</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
