import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronRight, HelpCircle, Book, MessageCircle, Video, Shield, CreditCard, User, Settings } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const HELP_CATEGORIES = [
  {
    icon: User,
    title: "Account & Profile",
    articles: [
      { title: "How to create an account", views: 12500 },
      { title: "Completing your profile", views: 9800 },
      { title: "Uploading headshots and showreel", views: 8700 },
      { title: "Verifying your identity", views: 6500 },
    ],
  },
  {
    icon: Search,
    title: "Finding Auditions",
    articles: [
      { title: "How to search for auditions", views: 15000 },
      { title: "Understanding match scores", views: 11200 },
      { title: "Filtering by location and category", views: 8900 },
      { title: "Setting up audition alerts", views: 7600 },
    ],
  },
  {
    icon: Video,
    title: "Applying & Auditions",
    articles: [
      { title: "How to apply for an audition", views: 18000 },
      { title: "Recording self-tape auditions", views: 14500 },
      { title: "Virtual audition room guide", views: 12000 },
      { title: "Tracking your applications", views: 9500 },
    ],
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    articles: [
      { title: "Identifying legitimate casting calls", views: 20000 },
      { title: "Reporting suspicious activity", views: 8500 },
      { title: "Privacy settings explained", views: 7200 },
      { title: "Verified badge requirements", views: 6800 },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Subscriptions",
    articles: [
      { title: "Subscription plans explained", views: 11000 },
      { title: "Payment methods accepted", views: 8000 },
      { title: "Cancelling your subscription", views: 6500 },
      { title: "Refund policy", views: 5800 },
    ],
  },
  {
    icon: Settings,
    title: "Technical Support",
    articles: [
      { title: "App not loading properly", views: 9500 },
      { title: "Video upload issues", views: 8200 },
      { title: "Notification settings", views: 6000 },
      { title: "Browser compatibility", views: 4500 },
    ],
  },
];

const POPULAR_QUESTIONS = [
  {
    question: "How do I get verified on Auditions Adda?",
    answer: "To get verified, complete your profile 100%, upload a government ID, and submit a short video introduction. Our team reviews applications within 48-72 hours.",
  },
  {
    question: "Is Auditions Adda free to use?",
    answer: "Yes! Basic features are completely free. You can create a profile, browse auditions, and apply to opportunities. Premium features like priority applications and advanced analytics are available with paid plans.",
  },
  {
    question: "How does the AI matching work?",
    answer: "Our AI analyzes your profile (skills, experience, physical attributes, location) and matches you with auditions where you're most likely to succeed. Higher match scores indicate better fit.",
  },
  {
    question: "Can I apply from outside major cities?",
    answer: "Absolutely! Many auditions accept self-tape submissions, and our virtual audition feature allows you to audition from anywhere. Filter by 'Remote' to find these opportunities.",
  },
];

export function HelpCenterPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(0);

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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="secondary" className="mb-4">Help Center</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            How Can We <span className="text-primary">Help?</span>
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-12 h-14 text-lg rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {HELP_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="outline" className="p-6 h-full hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold group-hover:text-primary transition-colors">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li key={article.title} className="flex items-center justify-between text-sm">
                      <span className="text-white/60 hover:text-white transition-colors cursor-pointer">
                        {article.title}
                      </span>
                      <ChevronRight className="h-4 w-4 text-white/20" />
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {POPULAR_QUESTIONS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card 
                  variant="outline" 
                  className={`p-4 cursor-pointer transition-all ${expandedFaq === i ? 'border-primary/30' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{faq.question}</h3>
                    <ChevronDown className={`h-5 w-5 text-white/40 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                  {expandedFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-white/60 mt-4 pt-4 border-t border-white/10"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="glass" className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">Live Chat</h3>
            <p className="text-sm text-white/50 mb-4">Chat with our support team in real-time</p>
            <Button variant="outline" className="rounded-xl w-full" onClick={() => navigate("/contact")}>Start Chat</Button>
          </Card>
          
          <Card variant="glass" className="p-6 text-center">
            <Book className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">Documentation</h3>
            <p className="text-sm text-white/50 mb-4">Detailed guides and tutorials</p>
            <Button variant="outline" className="rounded-xl w-full" onClick={() => navigate("/blog")}>View Docs</Button>
          </Card>
          
          <Card variant="glass" className="p-6 text-center">
            <HelpCircle className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">Submit Ticket</h3>
            <p className="text-sm text-white/50 mb-4">Get help from our support team</p>
            <Button variant="outline" className="rounded-xl w-full" onClick={() => navigate("/contact")}>Create Ticket</Button>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
