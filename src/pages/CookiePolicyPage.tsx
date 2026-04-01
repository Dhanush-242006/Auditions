import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Cookie, Calendar, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { BackButton } from "@/src/components/ui/BackButton";

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    description: "These cookies are necessary for the Platform to function properly. They enable core functionality such as security, account access, and remembering your preferences.",
    examples: ["Session management", "Authentication", "Security tokens", "Load balancing"],
  },
  {
    name: "Analytics Cookies",
    required: false,
    description: "These cookies help us understand how visitors interact with our Platform by collecting and reporting information anonymously.",
    examples: ["Page views", "User journey tracking", "Feature usage", "Error reporting"],
  },
  {
    name: "Functional Cookies",
    required: false,
    description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
    examples: ["Language preferences", "Location settings", "UI customization", "Recently viewed auditions"],
  },
  {
    name: "Marketing Cookies",
    required: false,
    description: "These cookies are used to track visitors across websites to display relevant advertisements based on your interests.",
    examples: ["Ad targeting", "Campaign measurement", "Social media integration", "Retargeting"],
  },
];

const SECTIONS = [
  {
    title: "What Are Cookies?",
    content: `Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

Cookies can be "persistent" (remaining on your device for a set period) or "session" cookies (deleted when you close your browser).`,
  },
  {
    title: "How We Use Cookies",
    content: `We use cookies and similar technologies to:

• Keep you signed in to your account
• Remember your preferences and settings
• Understand how you use our Platform
• Improve our services based on usage patterns
• Deliver relevant content and advertisements
• Protect against fraud and abuse
• Analyze Platform performance`,
  },
  {
    title: "Third-Party Cookies",
    content: `We may allow third-party service providers to place cookies on your device for:

• **Analytics**: Google Analytics helps us understand Platform usage
• **Payment Processing**: Razorpay and other payment providers
• **Social Media**: Integration with social platforms
• **Advertising**: Ad networks for relevant advertisements

These third parties have their own privacy policies governing their use of cookies.`,
  },
  {
    title: "Managing Cookies",
    content: `You can control cookies through:

**Browser Settings**: Most browsers allow you to refuse or delete cookies. Check your browser's help section for instructions.

**Our Cookie Settings**: Use the cookie preferences panel below to manage non-essential cookies.

**Opt-Out Links**:
• Google Analytics: tools.google.com/dlpage/gaoptout
• Facebook: facebook.com/settings/?tab=ads

Note: Disabling certain cookies may affect Platform functionality.`,
  },
  {
    title: "Cookie Retention",
    content: `Different cookies have different retention periods:

• **Session Cookies**: Deleted when you close your browser
• **Persistent Cookies**: Remain for up to 2 years
• **Analytics Cookies**: Typically retained for 26 months
• **Marketing Cookies**: Vary by provider (typically 30-90 days)`,
  },
  {
    title: "Updates to This Policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by updating the "Last Updated" date.`,
  },
  {
    title: "Contact Us",
    content: `If you have questions about our use of cookies, please contact us:

**Email**: privacy@auditionsadda.com
**Address**: Auditions Adda Pvt. Ltd., WeWork Enam Sambhav, BKC, Mumbai 400051`,
  },
];

export function CookiePolicyPage() {
  const navigate = useNavigate();
  const [cookiePreferences, setCookiePreferences] = React.useState({
    analytics: true,
    functional: true,
    marketing: false,
  });

  const togglePreference = (key: keyof typeof cookiePreferences) => {
    setCookiePreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-6">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Cookie <span className="text-primary">Policy</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last Updated: March 1, 2026
            </span>
          </div>
        </motion.div>

        <Card variant="glass" className="p-6 mb-8 border-primary/20">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">About This Policy</h3>
              <p className="text-sm text-white/60">
                This Cookie Policy explains how Auditions Adda uses cookies and similar tracking technologies when you visit our Platform. It also explains your choices regarding these technologies.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-8 mb-12">
          {SECTIONS.slice(0, 2).map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-xl font-bold mb-4 text-primary">{section.title}</h2>
              <div className="text-white/70 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-primary">Types of Cookies We Use</h2>
          <div className="space-y-4">
            {COOKIE_TYPES.map((cookie, i) => (
              <motion.div
                key={cookie.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="outline" className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">{cookie.name}</h3>
                        {cookie.required && (
                          <Badge variant="secondary" className="text-xs">Required</Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/60 mb-3">{cookie.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example) => (
                          <span key={example} className="text-xs bg-white/5 px-2 py-1 rounded">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                    {!cookie.required && (
                      <button
                        onClick={() => {
                          const key = cookie.name.toLowerCase().split(' ')[0] as keyof typeof cookiePreferences;
                          if (key in cookiePreferences) togglePreference(key);
                        }}
                        className="shrink-0"
                      >
                        {cookiePreferences[cookie.name.toLowerCase().split(' ')[0] as keyof typeof cookiePreferences] ? (
                          <ToggleRight className="h-8 w-8 text-primary" />
                        ) : (
                          <ToggleLeft className="h-8 w-8 text-white/30" />
                        )}
                      </button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button className="rounded-xl">Save Preferences</Button>
          </div>
        </div>

        <div className="space-y-8">
          {SECTIONS.slice(2).map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-xl font-bold mb-4 text-primary">{section.title}</h2>
              <div className="text-white/70 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
