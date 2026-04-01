import * as React from "react";
import { motion } from "motion/react";
import { Shield, Zap, Target, Users, Globe, Award, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { BackButton } from "@/src/components/ui/BackButton";

export function AboutPage() {
  const stats = [
    { label: "Verified Actors", value: "50K+" },
    { label: "Casting Directors", value: "2K+" },
    { label: "Successful Castings", value: "15K+" },
    { label: "Cities Covered", value: "120+" },
  ];

  const values = [
    { 
      title: "Transparency", 
      desc: "We believe in a fair and open casting process where talent is the only currency that matters.",
      icon: <Shield className="h-6 w-6 text-primary" />
    },
    { 
      title: "Innovation", 
      desc: "Our AI-powered matching ensures the right face finds the right role, saving time for everyone.",
      icon: <Zap className="h-6 w-6 text-accent" />
    },
    { 
      title: "Empowerment", 
      desc: "We provide actors with the tools they need to showcase their craft and manage their careers.",
      icon: <Target className="h-6 w-6 text-emerald-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="px-6 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8 relative z-10">
            <BackButton />
            <div className="max-w-3xl space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.1]">
                Revolutionizing <br />
                <span className="text-gradient">Indian Casting</span>
              </h1>
              <p className="text-xl text-white/60 leading-relaxed">
                Auditions Adda is India's premier digital casting marketplace, built to bridge the gap between extraordinary talent and world-class storytellers.
              </p>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 blur-[120px] rounded-full" />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="px-6 py-12 border-y border-white/5 bg-white/2">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <p className="text-4xl font-bold font-display text-white">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="px-6 py-32 max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold font-display">Our Core Values</h2>
            <p className="text-white/50 max-w-xl mx-auto">The principles that drive every feature we build and every connection we facilitate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} variant="glass" className="p-8 space-y-6 border-white/5 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  {value.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{value.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-6 py-32 bg-white/2 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold font-display">Our Mission</h2>
              <div className="space-y-6 text-white/60 leading-relaxed">
                <p>
                  For decades, the Indian film and advertising industry has relied on fragmented networks and physical auditions. We're here to change that.
                </p>
                <p>
                  By leveraging technology, we're creating a centralized, verified, and efficient ecosystem where talent from the smallest towns in India can be discovered by the biggest production houses in Mumbai.
                </p>
              </div>
              <Button className="rounded-full px-8">
                Join the Revolution
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/mission/1200/800" 
                alt="Our Mission" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
