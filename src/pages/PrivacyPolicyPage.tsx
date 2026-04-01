import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Shield, Calendar } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, including:

• **Personal Information**: Name, email address, phone number, date of birth, gender, and location when you create an account.

• **Profile Information**: Photos, videos, bio, skills, experience, physical attributes, and other details you add to your profile.

• **Payment Information**: When you subscribe to premium features, we collect payment details through our secure payment processors.

• **Communications**: Messages you send through our platform, support requests, and feedback.

• **Usage Data**: Information about how you use our platform, including auditions viewed, applications submitted, and features used.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Match you with relevant audition opportunities using our AI algorithms
• Process transactions and send related information
• Send you technical notices, updates, and support messages
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions and abuse
• Personalize and improve your experience`,
  },
  {
    title: "3. Information Sharing",
    content: `We may share your information in the following circumstances:

• **With Casting Directors**: When you apply to an audition, your profile information is shared with the casting team.

• **Service Providers**: We share data with third-party vendors who assist in providing our services (hosting, analytics, payment processing).

• **Legal Requirements**: We may disclose information if required by law or to protect our rights and safety.

• **Business Transfers**: In connection with any merger, acquisition, or sale of assets.

We never sell your personal information to third parties for marketing purposes.`,
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information, including:

• Encryption of data in transit and at rest
• Regular security assessments and audits
• Access controls and authentication measures
• Secure data centers with physical security
• Employee training on data protection

While we strive to protect your information, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: "5. Your Rights and Choices",
    content: `You have the following rights regarding your personal information:

• **Access**: Request a copy of your personal data
• **Correction**: Update or correct inaccurate information
• **Deletion**: Request deletion of your account and data
• **Portability**: Receive your data in a portable format
• **Opt-out**: Unsubscribe from marketing communications
• **Withdraw Consent**: Revoke consent for data processing

To exercise these rights, contact us at privacy@auditionsadda.com`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain information for legitimate business purposes or as required by law.

After account deletion:
• Profile data is deleted within 30 days
• Transaction records are retained for 7 years (legal requirement)
• Anonymized analytics data may be retained indefinitely`,
  },
  {
    title: "7. Children's Privacy",
    content: `Our services are not directed to children under 13. For users between 13-18, parental consent is required. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it promptly.`,
  },
  {
    title: "8. International Data Transfers",
    content: `Your information may be transferred to and processed in countries other than India. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses and adequacy decisions.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, please contact us:

**Email**: privacy@auditionsadda.com
**Address**: Auditions Adda Pvt. Ltd., WeWork Enam Sambhav, BKC, Mumbai 400051
**Phone**: +91 22 4567 8900

**Data Protection Officer**: dpo@auditionsadda.com`,
  },
];

export function PrivacyPolicyPage() {
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
            Privacy <span className="text-primary">Policy</span>
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
            <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">Your Privacy Matters</h3>
              <p className="text-sm text-white/60">
                At Auditions Adda, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
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
