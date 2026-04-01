import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Newspaper, Download, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const PRESS_RELEASES = [
  {
    id: "1",
    title: "Auditions Adda Raises ₹50 Crore in Series B Funding",
    date: "Feb 28, 2026",
    source: "Economic Times",
    excerpt: "The funding will be used to expand AI-powered matching capabilities and enter new markets across South Asia.",
    link: "#",
  },
  {
    id: "2",
    title: "Platform Crosses 1 Million Registered Artists",
    date: "Jan 15, 2026",
    source: "Variety India",
    excerpt: "Auditions Adda becomes India's largest casting platform with over 1 million verified artists.",
    link: "#",
  },
  {
    id: "3",
    title: "Partnership with Major OTT Platforms Announced",
    date: "Dec 10, 2025",
    source: "Film Companion",
    excerpt: "Exclusive casting partnerships with Netflix India, Amazon Prime Video, and Disney+ Hotstar.",
    link: "#",
  },
  {
    id: "4",
    title: "Launch of Virtual Audition Studio Feature",
    date: "Nov 5, 2025",
    source: "TechCrunch India",
    excerpt: "Revolutionary AI-powered virtual audition rooms allow remote casting for productions nationwide.",
    link: "#",
  },
];

const MEDIA_COVERAGE = [
  { outlet: "The Hindu", logo: "TH" },
  { outlet: "Times of India", logo: "TOI" },
  { outlet: "NDTV", logo: "NDTV" },
  { outlet: "Mint", logo: "M" },
  { outlet: "Forbes India", logo: "F" },
  { outlet: "YourStory", logo: "YS" },
];

export function PressPage() {
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
          <Badge variant="secondary" className="mb-4">Press Room</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            News & <span className="text-primary">Media</span>
          </h1>
          <p className="text-lg text-white/60">
            Stay updated with the latest news, announcements, and media coverage about Auditions Adda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card variant="glass" className="p-8">
            <h3 className="text-xl font-bold mb-4">Media Inquiries</h3>
            <p className="text-white/60 mb-6">
              For press inquiries, interviews, or media requests, please contact our communications team.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="text-white/40">Email:</span> press@auditionsadda.com</p>
              <p><span className="text-white/40">Phone:</span> +91 98765 43211</p>
            </div>
          </Card>
          
          <Card variant="glass" className="p-8">
            <h3 className="text-xl font-bold mb-4">Brand Assets</h3>
            <p className="text-white/60 mb-6">
              Download our official logos, brand guidelines, and media kit for your publications.
            </p>
            <Button variant="outline" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Download Media Kit
            </Button>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Featured In</h2>
          <p className="text-white/50">Trusted by leading media outlets</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-16">
          {MEDIA_COVERAGE.map((media) => (
            <Card key={media.outlet} variant="outline" className="p-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/30">{media.logo}</span>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Press Releases</h2>
          <p className="text-white/50">Latest announcements and news</p>
        </div>

        <div className="space-y-4">
          {PRESS_RELEASES.map((release, i) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="outline" className="p-6 hover:border-primary/30 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {release.date}
                      </span>
                      <Badge variant="outline" className="text-xs">{release.source}</Badge>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{release.title}</h3>
                    <p className="text-sm text-white/50">{release.excerpt}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    Read More
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
