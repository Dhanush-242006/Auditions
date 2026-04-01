import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Star, Quote, Play, Award, TrendingUp, Users } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const SUCCESS_STORIES = [
  {
    id: "1",
    name: "Aisha Sharma",
    role: "Lead Actress",
    project: "Netflix Original Series",
    image: "https://picsum.photos/seed/success1/400/400",
    quote: "I was struggling to get noticed for years. Within 3 months of joining Auditions Adda, I landed my dream role in a Netflix series. The AI matching connected me with the perfect opportunity.",
    beforeRole: "Theatre Artist",
    achievement: "Lead role in 'Mumbai Diaries S3'",
    stats: { auditions: 12, callbacks: 8, booked: 3 },
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "Character Actor",
    project: "Amazon Prime Film",
    image: "https://picsum.photos/seed/success2/400/400",
    quote: "At 45, I thought my chances were slim. Auditions Adda proved me wrong. The platform doesn't discriminate by age - it matches talent with opportunity.",
    beforeRole: "IT Professional",
    achievement: "Supporting role in 'The Family Man S3'",
    stats: { auditions: 8, callbacks: 5, booked: 2 },
  },
  {
    id: "3",
    name: "Priya Menon",
    role: "Voice Artist",
    project: "Disney Animation",
    image: "https://picsum.photos/seed/success3/400/400",
    quote: "The virtual audition feature was a game-changer. I recorded my audition from Kerala and got selected for a Disney India project. Distance is no longer a barrier.",
    beforeRole: "Radio Jockey",
    achievement: "Voice lead in animated feature",
    stats: { auditions: 15, callbacks: 10, booked: 4 },
  },
  {
    id: "4",
    name: "Arjun Reddy",
    role: "Lead Actor",
    project: "Telugu Feature Film",
    image: "https://picsum.photos/seed/success4/400/400",
    quote: "Coming from a non-film background, I had no connections. Auditions Adda was my gateway to the industry. Now I've done 3 feature films in 2 years.",
    beforeRole: "Software Engineer",
    achievement: "Lead in 'Hyderabad Blues'",
    stats: { auditions: 20, callbacks: 12, booked: 5 },
  },
];

const STATS = [
  { icon: Users, value: "50,000+", label: "Artists Placed" },
  { icon: Award, value: "1,200+", label: "Productions Served" },
  { icon: TrendingUp, value: "85%", label: "Callback Rate" },
  { icon: Star, value: "4.9/5", label: "Artist Satisfaction" },
];

export function SuccessStoriesPage() {
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
          <Badge variant="secondary" className="mb-4">Success Stories</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Dreams <span className="text-primary">Realized</span>
          </h1>
          <p className="text-lg text-white/60">
            Real stories from artists who found their breakthrough on Auditions Adda. 
            Your success story could be next.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          {SUCCESS_STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card variant="outline" className="overflow-hidden hover:border-primary/30 transition-all">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative aspect-square md:aspect-auto">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold">{story.name}</h3>
                      <p className="text-sm text-primary">{story.role}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <Quote className="h-8 w-8 text-primary/30 shrink-0" />
                      <p className="text-lg text-white/80 italic leading-relaxed">
                        "{story.quote}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-xs text-white/40 uppercase mb-1">Before</p>
                        <p className="text-sm font-medium">{story.beforeRole}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase mb-1">Achievement</p>
                        <p className="text-sm font-medium text-primary">{story.achievement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase mb-1">Auditions</p>
                        <p className="text-sm font-medium">{story.stats.auditions} applied</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase mb-1">Success Rate</p>
                        <p className="text-sm font-medium text-emerald-400">
                          {Math.round((story.stats.booked / story.stats.auditions) * 100)}% booked
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card variant="glass" className="mt-16 p-8 text-center border-primary/20 bg-primary/5">
          <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Join thousands of artists who have found their breakthrough on Auditions Adda. 
            Your talent deserves to be discovered.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="rounded-xl" onClick={() => navigate("/login")}>Create Free Profile</Button>
            <Button variant="outline" className="rounded-xl" onClick={() => navigate("/auditions")}>Browse Auditions</Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
