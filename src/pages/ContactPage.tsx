import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones, Building } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const CONTACT_OPTIONS = [
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Get help with your account or platform issues",
    contact: "support@auditionsadda.com",
    hours: "Mon-Sat, 9 AM - 8 PM IST",
  },
  {
    icon: Building,
    title: "Business Inquiries",
    description: "Partnership and enterprise solutions",
    contact: "business@auditionsadda.com",
    hours: "Mon-Fri, 10 AM - 6 PM IST",
  },
  {
    icon: MessageSquare,
    title: "Press & Media",
    description: "Media inquiries and interview requests",
    contact: "press@auditionsadda.com",
    hours: "Mon-Fri, 10 AM - 6 PM IST",
  },
];

const OFFICES = [
  {
    city: "Mumbai (HQ)",
    address: "WeWork Enam Sambhav, C-20, G Block, Bandra Kurla Complex",
    phone: "+91 22 4567 8900",
  },
  {
    city: "Delhi NCR",
    address: "91springboard, Sector 44, Gurugram, Haryana",
    phone: "+91 124 456 7890",
  },
  {
    city: "Bangalore",
    address: "Cowrks, RMZ Ecoworld, Outer Ring Road, Bellandur",
    phone: "+91 80 4567 8900",
  },
];

export function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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
          <Badge variant="secondary" className="mb-4">Get in Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-lg text-white/60">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CONTACT_OPTIONS.map((option, i) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{option.title}</h3>
                <p className="text-sm text-white/50 mb-4">{option.description}</p>
                <p className="text-sm text-primary font-medium">{option.contact}</p>
                <p className="text-xs text-white/40 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {option.hours}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Name</label>
                  <Input 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Subject</label>
                <Input 
                  placeholder="How can we help?" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Message</label>
                <textarea 
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-xl" disabled={isSubmitted}>
                {isSubmitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
            <div className="space-y-4">
              {OFFICES.map((office) => (
                <Card key={office.city} variant="outline" className="p-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {office.city}
                  </h3>
                  <p className="text-sm text-white/50 mb-2">{office.address}</p>
                  <p className="text-sm text-white/40 flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    {office.phone}
                  </p>
                </Card>
              ))}
            </div>

            <Card variant="glass" className="mt-6 p-6 border-primary/20 bg-primary/5">
              <h3 className="font-bold mb-2">Quick Response Guarantee</h3>
              <p className="text-sm text-white/60">
                We aim to respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call our support line.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
