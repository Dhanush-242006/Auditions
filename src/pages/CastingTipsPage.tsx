import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Video, FileText, Mic, Camera, Users, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const TIP_CATEGORIES = [
  {
    icon: Video,
    title: "Self-Tape Mastery",
    description: "Perfect your self-tape auditions",
    tips: [
      "Use natural lighting - position yourself facing a window",
      "Keep the background simple and uncluttered",
      "Frame yourself from chest up for dialogue scenes",
      "Record in landscape mode, never portrait",
      "Do multiple takes and choose the best one",
      "Check audio levels before your final take",
    ],
  },
  {
    icon: FileText,
    title: "Script Preparation",
    description: "How to analyze and prepare scripts",
    tips: [
      "Read the entire script, not just your lines",
      "Understand your character's objectives in each scene",
      "Mark beats and emotional shifts in the dialogue",
      "Research the time period and setting if relevant",
      "Prepare at least 2 different interpretations",
      "Memorize lines but stay flexible for direction",
    ],
  },
  {
    icon: Camera,
    title: "On-Camera Presence",
    description: "Look natural and confident on screen",
    tips: [
      "Practice in front of a camera regularly",
      "Keep movements subtle - the camera magnifies everything",
      "Connect with your scene partner, not the lens",
      "Use your eyes to convey emotion",
      "Avoid touching your face or fidgeting",
      "Breathe naturally and stay relaxed",
    ],
  },
  {
    icon: Mic,
    title: "Voice & Diction",
    description: "Improve your vocal performance",
    tips: [
      "Warm up your voice before every audition",
      "Practice clear articulation without over-enunciating",
      "Vary your pace and tone to keep it interesting",
      "Project from your diaphragm, not your throat",
      "Record yourself and listen back critically",
      "Work on reducing filler words (um, uh, like)",
    ],
  },
];

const PRO_TIPS = [
  {
    title: "The 30-Second Rule",
    content: "Casting directors often decide within 30 seconds. Make your opening moments count - be fully in character from the first frame.",
    author: "Casting Director, YRF",
  },
  {
    title: "Research the Production",
    content: "Before any audition, research the production house, director's previous work, and the project's tone. This shows professionalism and helps you make informed choices.",
    author: "Talent Agent, KWAN",
  },
  {
    title: "Embrace Rejection",
    content: "You'll hear 'no' far more than 'yes'. Each rejection is practice, not failure. The role you didn't get wasn't meant for you - the right one is coming.",
    author: "Acting Coach, Mumbai",
  },
];

const CHECKLIST = [
  "Updated headshots (within last 6 months)",
  "Professional showreel (2-3 minutes max)",
  "Complete profile with all skills listed",
  "Verified contact information",
  "Portfolio with varied work samples",
  "Professional bio (150-200 words)",
];

export function CastingTipsPage() {
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
          <Badge variant="secondary" className="mb-4">Casting Tips</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Ace Your <span className="text-primary">Auditions</span>
          </h1>
          <p className="text-lg text-white/60">
            Expert advice from casting directors, agents, and successful actors to help you stand out and book more roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {TIP_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="outline" className="p-6 h-full hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{category.title}</h3>
                    <p className="text-sm text-white/50">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.tips.map((tip, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Pro Tips from Industry Experts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PRO_TIPS.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass" className="p-6 h-full border-primary/20">
                  <Star className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-bold mb-3">{tip.title}</h3>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{tip.content}</p>
                  <p className="text-xs text-primary">— {tip.author}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card variant="outline" className="p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Profile Checklist
            </h3>
            <p className="text-white/60 mb-6">
              Make sure your profile is complete before applying to auditions:
            </p>
            <ul className="space-y-3">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                  </div>
                  <span className="text-sm text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="glass" className="p-8 border-primary/20 bg-primary/5">
            <Lightbulb className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-4">Want Personalized Feedback?</h3>
            <p className="text-white/60 mb-6">
              Our AI-powered profile analyzer can review your headshots, showreel, and profile to give you specific improvement suggestions.
            </p>
            <Button className="rounded-xl" onClick={() => navigate("/profile")}>
              Analyze My Profile
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
