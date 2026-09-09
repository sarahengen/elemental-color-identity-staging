import React from 'react';
import { ArrowLeft, Shield, Eye, Cookie, Server, Users, Clock, Globe, Lock, FileText, Mail, Database, Fingerprint, Bell } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
  onNavigate?: (section: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, onNavigate }) => {
  const lastUpdated = 'February 18, 2026';

  const sections = [
    {
      id: 'introduction',
      icon: <Shield className="w-5 h-5" />,
      title: '1. Introduction',
      content: [
        'Elemental Color Identity ("Company," "we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the "Service").',
        'By accessing or using the Service, you consent to the practices described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.',
        'This Privacy Policy applies to all users of the Service, including visitors, registered users, and premium members. We encourage you to read this Privacy Policy carefully and contact us if you have any questions.',
      ],
    },
    {
      id: 'data-collection',
      icon: <Database className="w-5 h-5" />,
      title: '2. Information We Collect',
      content: [
        'We collect information in several ways when you interact with our Service:',
        'Information You Provide Directly:\n• Account registration data (name, email address, password)\n• Profile information (display name, avatar, elemental type preferences)\n• Quiz responses and elemental type assessment results\n• Forum posts, comments, and community interactions\n• Consultation booking details and preferences\n• Payment and billing information (processed securely through third-party payment processors)\n• Customer support inquiries and correspondence\n• Newsletter subscription preferences\n• Feedback, surveys, and testimonials',
        'Information Collected Automatically:\n• Device information (browser type, operating system, device model)\n• IP address and approximate geographic location\n• Pages visited, time spent on pages, and navigation patterns\n• Referring URLs and search terms that led you to our Service\n• Interaction data (clicks, scrolls, feature usage patterns)\n• Session duration and frequency of visits\n• Error logs and performance data',
        'Information from Camera Features:\n• When you use our Camera Color Analyzer or Wardrobe Analyzer, images are processed in real-time to provide color analysis. Images captured through these features are processed locally on your device and are NOT transmitted to or stored on our servers unless you explicitly choose to save results to your profile. Saved analysis results contain color data and compatibility scores, not the original images.',
      ],
    },
    {
      id: 'data-use',
      icon: <Eye className="w-5 h-5" />,
      title: '3. How We Use Your Information',
      content: [
        'We use the information we collect for the following purposes:',
        'Service Delivery & Personalization:\n• To create and manage your account\n• To determine and display your elemental type and subtype\n• To provide personalized color palette recommendations\n• To deliver premium features and content based on your subscription\n• To process consultation bookings and class enrollments\n• To maintain your quiz history and saved preferences\n• To enable community forum participation',
        'Communication:\n• To send transactional emails (account verification, password resets, booking confirmations)\n• To deliver newsletter content and elemental type insights (with your consent)\n• To respond to customer support inquiries\n• To notify you of changes to our Service or policies\n• To send promotional offers and updates (with your consent, and with easy opt-out)',
        'Analytics & Improvement:\n• To understand how users interact with our Service\n• To identify and fix technical issues\n• To improve our quiz algorithms and type assessments\n• To develop new features and content\n• To measure the effectiveness of our marketing efforts\n• To conduct research and analysis on elemental type trends',
        'Legal & Security:\n• To comply with applicable laws and regulations\n• To enforce our Terms of Service\n• To protect against fraud, abuse, and unauthorized access\n• To respond to legal requests and prevent harm',
      ],
    },
    {
      id: 'cookies',
      icon: <Cookie className="w-5 h-5" />,
      title: '4. Cookies & Tracking Technologies',
      content: [
        'We use cookies and similar tracking technologies to enhance your experience on our Service. Cookies are small text files stored on your device that help us recognize you and remember your preferences.',
        'Essential Cookies: These cookies are necessary for the Service to function properly. They enable core features such as authentication, session management, and security. You cannot opt out of essential cookies as they are required for the Service to operate.',
        'Functional Cookies: These cookies remember your preferences and settings, such as your language preference, elemental type display settings, and quiz progress. They enhance your experience but are not strictly necessary.',
        'Analytics Cookies: We use analytics cookies (including Google Analytics) to understand how visitors interact with our Service. These cookies collect information about page views, session duration, and navigation patterns. This data is aggregated and anonymized. You can opt out of analytics cookies through your browser settings or by using the Google Analytics opt-out browser add-on.',
        'Marketing Cookies: With your consent, we may use marketing cookies to deliver relevant advertisements and measure their effectiveness. These cookies track your browsing activity across websites. You can manage your marketing cookie preferences through our cookie consent banner or your browser settings.',
        'Managing Cookies: Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, accept only certain cookies, or notify you when a cookie is set. Please note that disabling certain cookies may affect the functionality of the Service.',
      ],
    },
    {
      id: 'third-party',
      icon: <Server className="w-5 h-5" />,
      title: '5. Third-Party Services & Data Sharing',
      content: [
        'We work with trusted third-party service providers to operate and improve our Service. We share your information with third parties only in the following circumstances:',
        'Service Providers:\n• Supabase — Database hosting, authentication, and backend services\n• Stripe — Payment processing for premium memberships and consultations\n• Google Analytics — Website analytics and usage tracking\n• Email service providers — Transactional and marketing email delivery\n• Cloud hosting providers — Website and application hosting\n• Customer support tools — Help desk and support ticket management',
        'These service providers are contractually obligated to protect your information and may only use it to perform services on our behalf.',
        'Legal Requirements: We may disclose your information if required to do so by law, in response to a subpoena, court order, or other legal process, or if we believe in good faith that disclosure is necessary to: (a) comply with applicable law; (b) protect our rights or property; (c) prevent fraud or abuse; or (d) protect the safety of our users or the public.',
        'Business Transfers: In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change and any choices you may have regarding your information.',
        'With Your Consent: We may share your information with third parties when you have given us explicit consent to do so, such as when you choose to share your elemental type results on social media.',
        'We Do NOT Sell Your Personal Information: We do not sell, rent, or trade your personal information to third parties for their marketing purposes.',
      ],
    },
    {
      id: 'data-retention',
      icon: <Clock className="w-5 h-5" />,
      title: '6. Data Retention',
      content: [
        'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.',
        'Account Data: Your account information, profile data, and elemental type results are retained for as long as your account is active. If you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required for legal, accounting, or legitimate business purposes.',
        'Quiz History: Your quiz responses and results history are retained as part of your account data. You can request deletion of specific quiz entries or your entire quiz history through your account settings or by contacting us.',
        'Community Content: Forum posts, comments, and community interactions are retained as part of the community record. If you delete your account, your posts may be anonymized (attributed to "Deleted User") rather than fully removed, to preserve the integrity of community discussions.',
        'Payment Records: Transaction records and billing information are retained for a minimum of 7 years as required by tax and accounting regulations.',
        'Analytics Data: Aggregated and anonymized analytics data may be retained indefinitely as it cannot be used to identify individual users.',
        'Communication Records: Customer support correspondence is retained for up to 3 years after the last interaction to provide continuity of support.',
        'Camera & Image Data: Images processed through our Camera Color Analyzer and Wardrobe Analyzer features are NOT stored on our servers. Only the resulting color analysis data and compatibility scores are saved if you choose to save them.',
      ],
    },
    {
      id: 'user-rights',
      icon: <Users className="w-5 h-5" />,
      title: '7. Your Rights & Choices',
      content: [
        'You have several rights regarding your personal information, regardless of where you are located:',
        'Access: You have the right to request a copy of the personal information we hold about you. You can access most of your data directly through your account settings and profile page.',
        'Correction: You have the right to request correction of any inaccurate or incomplete personal information. You can update your profile information directly through your account settings.',
        'Deletion: You have the right to request deletion of your personal information. You can delete your account through your account settings or by contacting us. Please note that some information may be retained as described in our Data Retention section.',
        'Data Portability: You have the right to receive your personal information in a structured, commonly used, and machine-readable format. You can export your elemental type results, quiz history, and profile data through your account settings.',
        'Opt-Out of Marketing: You can opt out of marketing communications at any time by clicking the "unsubscribe" link in any marketing email, or by updating your communication preferences in your account settings.',
        'Cookie Preferences: You can manage your cookie preferences through our cookie consent banner, your browser settings, or the specific opt-out mechanisms described in Section 4.',
        'Withdraw Consent: Where we rely on your consent to process your information, you have the right to withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before the withdrawal.',
        'To exercise any of these rights, please contact us at privacy@elementalcoloridentity.com or through the Contact Us page on our website. We will respond to your request within 30 days.',
      ],
    },
    {
      id: 'data-security',
      icon: <Lock className="w-5 h-5" />,
      title: '8. Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        'Technical Measures:\n• Encryption of data in transit using TLS/SSL protocols\n• Encryption of sensitive data at rest\n• Secure authentication with bcrypt password hashing\n• Regular security audits and vulnerability assessments\n• Access controls and role-based permissions for our team\n• Automated monitoring for suspicious activity\n• Regular backups with encrypted storage',
        'Organizational Measures:\n• Employee training on data protection and privacy\n• Limited access to personal data on a need-to-know basis\n• Confidentiality agreements with all team members\n• Incident response procedures for data breaches\n• Regular review of security policies and practices',
        'While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to implementing and maintaining reasonable safeguards.',
        'In the event of a data breach that poses a risk to your rights and freedoms, we will notify affected users and relevant authorities as required by applicable law, typically within 72 hours of becoming aware of the breach.',
      ],
    },
    {
      id: 'gdpr',
      icon: <Globe className="w-5 h-5" />,
      title: '9. GDPR Compliance (European Users)',
      content: [
        'If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have additional rights under the General Data Protection Regulation (GDPR):',
        'Legal Basis for Processing: We process your personal data under the following legal bases:\n• Contract Performance — Processing necessary to provide the Service you requested (account management, quiz results, premium features)\n• Legitimate Interests — Processing necessary for our legitimate business interests (analytics, service improvement, fraud prevention), balanced against your rights\n• Consent — Processing based on your explicit consent (marketing communications, optional cookies, social sharing)\n• Legal Obligation — Processing necessary to comply with legal requirements',
        'Additional GDPR Rights:\n• Right to Restriction — You can request that we restrict the processing of your personal data in certain circumstances\n• Right to Object — You can object to processing based on legitimate interests, including profiling\n• Right to Lodge a Complaint — You have the right to lodge a complaint with your local data protection authority\n• Right Not to Be Subject to Automated Decision-Making — You have the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects',
        'International Data Transfers: Your data may be transferred to and processed in countries outside the EEA. When we transfer data internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission, or reliance on the recipient\'s participation in recognized data protection frameworks.',
        'Data Protection Officer: For GDPR-related inquiries, you may contact our Data Protection Officer at dpo@elementalcoloridentity.com.',
      ],
    },
    {
      id: 'ccpa',
      icon: <Fingerprint className="w-5 h-5" />,
      title: '10. CCPA Compliance (California Residents)',
      content: [
        'If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):',
        'Right to Know: You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources from which it was collected, the business purpose for collecting it, and the categories of third parties with whom we share it.',
        'Right to Delete: You have the right to request deletion of your personal information, subject to certain exceptions (such as legal obligations or completing a transaction you requested).',
        'Right to Opt-Out of Sale: We do NOT sell your personal information. However, if this practice changes in the future, we will provide a clear "Do Not Sell My Personal Information" link on our website.',
        'Right to Non-Discrimination: We will not discriminate against you for exercising your CCPA rights. You will not receive different pricing, quality of service, or access to features based on your privacy choices.',
        'Right to Correct: You have the right to request correction of inaccurate personal information we maintain about you.',
        'Right to Limit Use of Sensitive Personal Information: You have the right to limit our use of sensitive personal information to purposes necessary to provide the Service.',
        'Categories of Personal Information Collected (past 12 months):\n• Identifiers (name, email, IP address)\n• Commercial information (purchase history, subscription details)\n• Internet activity (browsing history, interaction data)\n• Inferences (elemental type, personality preferences)\n• Sensory data (images processed through camera features — not stored)',
        'To exercise your CCPA rights, please contact us at privacy@elementalcoloridentity.com or call us at 1-800-ELEMENT. We will verify your identity before processing your request. You may also designate an authorized agent to make requests on your behalf.',
      ],
    },
    {
      id: 'children',
      icon: <Shield className="w-5 h-5" />,
      title: '11. Children\'s Privacy',
      content: [
        'The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us immediately at privacy@elementalcoloridentity.com.',
        'If we become aware that we have collected personal information from a child under 13 without verification of parental consent, we will take steps to delete that information promptly.',
        'For users between the ages of 13 and 18, we recommend that a parent or guardian review this Privacy Policy and supervise the use of the Service. Users under 18 should not make purchases or enter into subscription agreements without parental consent.',
        'For users in the EEA, the minimum age for consent to data processing may vary by country (generally 16 years, but as low as 13 in some jurisdictions). We comply with the applicable age requirements in each jurisdiction.',
      ],
    },
    {
      id: 'notifications',
      icon: <Bell className="w-5 h-5" />,
      title: '12. Changes to This Privacy Policy',
      content: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:',
        '• Update the "Last Updated" date at the top of this Privacy Policy\n• Post a prominent notice on our website or within the Service\n• Send an email notification to registered users (for material changes)\n• Where required by law, obtain your consent before implementing changes',
        'We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of the Service after any changes to this Privacy Policy constitutes your acceptance of the updated policy.',
        'Previous versions of this Privacy Policy are available upon request by contacting us at privacy@elementalcoloridentity.com.',
      ],
    },
    {
      id: 'contact',
      icon: <Mail className="w-5 h-5" />,
      title: '13. Contact Information',
      content: [
        'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us through any of the following channels:',
        'General Privacy Inquiries:\nEmail: privacy@elementalcoloridentity.com\nWebsite: www.elementalcoloridentity.com/contact',
        'Data Protection Officer (GDPR):\nEmail: dpo@elementalcoloridentity.com',
        'CCPA Requests:\nEmail: privacy@elementalcoloridentity.com\nPhone: 1-800-ELEMENT',
        'Mailing Address:\nElemental Color Identity\nPrivacy Team\nAttn: Data Protection\n\nWe aim to respond to all privacy-related inquiries within 30 days. For GDPR requests, we will respond within the timeframes required by applicable law.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Your privacy matters to us. This policy explains how Elemental Color Identity collects, 
            uses, protects, and shares your personal information when you use our platform.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <span>Last Updated: {lastUpdated}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>Effective Immediately</span>
          </div>
        </div>
      </div>

      {/* Quick Summary Banner */}
      <div className="bg-purple-50 border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Privacy at a Glance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We collect only what's necessary to provide our Service. We never sell your data. 
                Camera images are processed locally and not stored on our servers. You can access, 
                correct, or delete your data at any time. We comply with GDPR and CCPA regulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#privacy-${section.id}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg px-3 py-2 transition-colors"
              >
                <span className="text-gray-400">{section.icon}</span>
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.id} id={`privacy-${section.id}`} className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-serif text-gray-900">{section.title}</h2>
              </div>
              <div className="space-y-4 pl-13">
                {section.content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-gray-600 leading-relaxed whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 border-t border-gray-200 pt-12">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-serif text-gray-900 mb-3">Your Privacy Matters</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              If you have any questions about this Privacy Policy or how we handle your data, 
              our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate?.('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-900 text-white rounded-full font-medium hover:bg-purple-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </button>
              <button
                onClick={() => onNavigate?.('terms')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-white transition-colors"
              >
                <FileText className="w-4 h-4" />
                Terms of Service
              </button>
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
