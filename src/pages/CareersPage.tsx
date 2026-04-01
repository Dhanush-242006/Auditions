import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Zap, Globe } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const JOBS = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Build and scale our platform to connect millions of artists with opportunities.",
  },
  {
    id: "2",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create beautiful, intuitive experiences for actors and casting directors.",
  },
  {
    id: "3",
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Tell compelling stories about the entertainment industry and our community.",
  },
  {
    id: "4",
    title: "Customer Success Lead",
    department: "Operations",
    location: "Delhi NCR",
    type: "Full-time",
    description: "Help casting directors and actors get the most out of our platform.",
  },
  {
    id: "5",
    title: "Data Analyst",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Analyze user behavior and industry trends to drive product decisions.",
  },
];

const PERKS = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance for you and your family" },
  { icon: Zap, title: "Learning Budget", description: "₹50,000 annual budget for courses and conferences" },
  { icon: Globe, title: "Remote Friendly", description: "Work from anywhere in India with flexible hours" },
  { icon: Users, title: "Team Events", description: "Quarterly offsites and movie premieres" },
];

export function CareersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">We're Hiring</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Join the Future of <span className="text-primary">Entertainment</span>
          </h1>
          <p className="text-lg text-white/60">
            Help us revolutionize how talent meets opportunity in India's entertainment industry. 
            We're building something special, and we want you to be part of it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {PERKS.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="p-6 text-center h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <perk.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{perk.title}</h3>
                <p className="text-sm text-white/50">{perk.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Open Positions</h2>
          <p className="text-white/50">Find your role in shaping the future of casting</p>
        </div>

        <div className="space-y-4">
          {JOBS.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="outline" className="p-6 hover:border-primary/30 transition-all group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                      <Badge variant="secondary">{job.department}</Badge>
                    </div>
                    <p className="text-sm text-white/50">{job.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl shrink-0">
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card variant="glass" className="mt-16 p-8 text-center border-primary/20 bg-primary/5">
          <h3 className="text-xl font-bold mb-2">Don't see the right role?</h3>
          <p className="text-white/60 mb-6">We're always looking for talented people. Send us your resume and we'll keep you in mind.</p>
          <Button className="rounded-xl" onClick={() => navigate("/contact")}>Send Open Application</Button>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
