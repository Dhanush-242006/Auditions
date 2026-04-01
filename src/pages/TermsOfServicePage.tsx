import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FileText, Calendar, AlertTriangle } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Auditions Adda ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our services.

These Terms constitute a legally binding agreement between you and Auditions Adda Pvt. Ltd. ("Company", "we", "us", or "our").`,
  },
  {
    title: "2. Eligibility",
    content: `To use our Platform, you must:

• Be at least 13 years of age (users under 18 require parental consent)
• Have the legal capacity to enter into a binding agreement
• Not be prohibited from using our services under applicable laws
• Provide accurate and complete registration information

For casting directors and production houses, you must have the authority to post auditions on behalf of your organization.`,
  },
  {
    title: "3. Account Registration",
    content: `When creating an account, you agree to:

• Provide accurate, current, and complete information
• Maintain and update your information as needed
• Keep your password secure and confidential
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account

We reserve the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    title: "4. User Conduct",
    content: `You agree NOT to:

• Post false, misleading, or fraudulent content
• Impersonate any person or entity
• Harass, abuse, or harm other users
• Post inappropriate, offensive, or illegal content
• Spam or send unsolicited communications
• Attempt to gain unauthorized access to our systems
• Use automated tools to scrape or collect data
• Violate any applicable laws or regulations
• Interfere with the proper functioning of the Platform`,
  },
  {
    title: "5. Content Guidelines",
    content: `**For Artists:**
• Profile photos must be recent and professional
• Showreels must contain only your own work
• All information must be accurate and truthful
• You retain ownership of your content but grant us a license to display it

**For Casting Directors:**
• Audition postings must be for legitimate opportunities
• All required information must be accurate
• Compensation details must be clearly stated
• You may not charge artists for auditions`,
  },
  {
    title: "6. Intellectual Property",
    content: `**Our Content**: The Platform, including its design, features, and content, is owned by Auditions Adda and protected by intellectual property laws.

**Your Content**: You retain ownership of content you post but grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content on the Platform.

**Restrictions**: You may not copy, modify, distribute, or create derivative works from our Platform without permission.`,
  },
  {
    title: "7. Payments and Subscriptions",
    content: `• Premium features require a paid subscription
• Prices are displayed in Indian Rupees (INR)
• Subscriptions auto-renew unless cancelled
• Refunds are provided as per our Refund Policy
• We may change pricing with 30 days notice
• Failed payments may result in service suspension`,
  },
  {
    title: "8. Disclaimer of Warranties",
    content: `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE:

• Uninterrupted or error-free service
• That you will find or book auditions
• The accuracy of information posted by users
• The legitimacy of all casting opportunities
• Compatibility with all devices or browsers

We are a marketplace connecting artists with opportunities and are not responsible for the outcome of auditions or employment decisions.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

• We are not liable for indirect, incidental, or consequential damages
• Our total liability shall not exceed the amount you paid us in the past 12 months
• We are not responsible for actions of third parties, including casting directors or artists
• We are not liable for lost opportunities, income, or profits`,
  },
  {
    title: "10. Indemnification",
    content: `You agree to indemnify and hold harmless Auditions Adda, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:

• Your use of the Platform
• Your violation of these Terms
• Your violation of any third-party rights
• Content you post on the Platform`,
  },
  {
    title: "11. Termination",
    content: `**By You**: You may delete your account at any time through your account settings.

**By Us**: We may suspend or terminate your account for:
• Violation of these Terms
• Fraudulent or illegal activity
• Extended periods of inactivity
• At our sole discretion with reasonable notice

Upon termination, your right to use the Platform ceases immediately.`,
  },
  {
    title: "12. Dispute Resolution",
    content: `• These Terms are governed by the laws of India
• Disputes shall be resolved through arbitration in Mumbai
• You waive the right to participate in class actions
• Small claims may be brought in appropriate courts
• We encourage resolving disputes through our support team first`,
  },
  {
    title: "13. Changes to Terms",
    content: `We may modify these Terms at any time. We will notify you of material changes via email or Platform notification. Your continued use after changes constitutes acceptance of the new Terms.`,
  },
  {
    title: "14. Contact Information",
    content: `For questions about these Terms, contact us:

**Email**: legal@auditionsadda.com
**Address**: Auditions Adda Pvt. Ltd., WeWork Enam Sambhav, BKC, Mumbai 400051
**Phone**: +91 22 4567 8900`,
  },
];

export function TermsOfServicePage() {
  const navigate = useNavigate();

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
            Terms of <span className="text-primary">Service</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last Updated: March 1, 2026
            </span>
          </div>
        </motion.div>

        <Card variant="glass" className="p-6 mb-8 border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">Important Legal Agreement</h3>
              <p className="text-sm text-white/60">
                Please read these Terms carefully before using Auditions Adda. By using our Platform, you agree to be bound by these Terms. If you do not agree, please do not use our services.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-8">
          {SECTIONS.map((section, i) => (
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
