import React from 'react';
import { ArrowLeft, FileText, Shield, CreditCard, Users, AlertTriangle, Scale, Globe, Mail } from 'lucide-react';
import { GIFT_VALIDITY_LABEL } from '@/lib/giftConfig';


interface TermsOfServiceProps {
  onBack: () => void;
  onNavigate?: (section: string) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack, onNavigate }) => {
  const lastUpdated = 'February 18, 2026';

  const sections = [
    {
      id: 'acceptance',
      icon: <FileText className="w-5 h-5" />,
      title: '1. Acceptance of Terms',
      content: [
        'By accessing or using the Elemental Color Identity website, mobile application, and related services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you may not access or use the Service.',
        'These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Elemental Color Identity ("Company," "we," "us," or "our"). We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Service after any changes constitutes your acceptance of the revised Terms.',
        'You must be at least 13 years of age to use the Service. If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.',
      ],
    },
    {
      id: 'services',
      icon: <Globe className="w-5 h-5" />,
      title: '2. Description of Services',
      content: [
        'Elemental Color Identity provides a personality-based color analysis system that categorizes users into elemental types (Fire, Water, Earth, Air) and subtypes through interactive quizzes and assessments. Our services include, but are not limited to:',
        '• Elemental type and subtype personality quizzes and assessments\n• Personalized color palette recommendations\n• Camera-based color analysis tools\n• Wardrobe analysis and recommendations\n• Hair color, jewelry, and accessory guidance\n• Community forums and discussion boards\n• One-on-one consultation booking\n• Color classes and educational content\n• Premium membership features and content\n• Blog articles and editorial content',
        'The Service is provided for informational and entertainment purposes. Our elemental type assessments are not scientifically validated psychological instruments and should not be used as a substitute for professional psychological, medical, or therapeutic advice.',
      ],
    },
    {
      id: 'accounts',
      icon: <Users className="w-5 h-5" />,
      title: '3. User Accounts & Registration',
      content: [
        'To access certain features of the Service, you may be required to create an account. When creating an account, you agree to provide accurate, current, and complete information and to update such information as necessary to maintain its accuracy.',
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.',
        'We reserve the right to suspend or terminate your account at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease, and we may delete your account data in accordance with our Privacy Policy.',
        'You may not create multiple accounts, share your account credentials with others, or transfer your account to another person without our prior written consent.',
      ],
    },
    {
      id: 'membership',
      icon: <CreditCard className="w-5 h-5" />,
      title: '4. Purchases & Payments',
      content: [
        'Elemental Color Identity offers a range of products and services including downloadable subtype profiles, workshop bookings, and personal consultations. By making a purchase, you agree to the following:',
        'Elemental Subtype Profiles Subtype profiles are one-time purchases delivered as downloadable PDF documents. Payment is taken at the point of purchase. Upon successful payment, your profile will be delivered instantly to your registered email address and saved permanently to your ECI account.',
        'Refunds — Digital Downloads Due to the instant delivery nature of downloadable products, subtype profile purchases are non-refundable once the download has been made available. If you experience a technical issue with your download, please contact our support team and we will resolve it promptly.',
        'Pricing All prices are displayed at the point of purchase and are subject to change. Price changes will not affect purchases already made or bookings already confirmed.',
        `Gift Purchases Gift profiles and gift experiences are non-refundable once delivered to the recipient. Gift quiz links and profile vouchers are valid for ${GIFT_VALIDITY_LABEL} from the date of purchase. If a recipient experiences difficulty redeeming a gift, please contact our support team.`,
        'Payment Processing All payments are processed securely through Stripe. Elemental Color Identity does not store your payment details. For queries relating to payment processing, please contact our support team at info@elementalcoloridentity.com.',
      ],
    },

    {
      id: 'conduct',
      icon: <Shield className="w-5 h-5" />,
      title: '5. User Conduct & Community Guidelines',
      content: [
        'When using the Service, including our community forums and any interactive features, you agree not to:',
        '• Post, upload, or share content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable\n• Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity\n• Engage in any form of spam, including unsolicited advertising or promotional materials\n• Upload or transmit viruses, malware, or any other harmful code\n• Attempt to gain unauthorized access to the Service, other user accounts, or any computer systems or networks\n• Use the Service for any illegal or unauthorized purpose\n• Interfere with or disrupt the Service or servers or networks connected to the Service\n• Collect or store personal data about other users without their consent\n• Bully, intimidate, or harass other users\n• Post content that infringes on the intellectual property rights of others',
        'We reserve the right to remove any content that violates these guidelines and to suspend or terminate accounts of users who repeatedly violate these Terms.',
      ],
    },
    {
      id: 'ip',
      icon: <Scale className="w-5 h-5" />,
      title: '6. Intellectual Property Rights',
      content: [
        'All content, features, and functionality of the Service—including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, software, the elemental type system, quiz content, color palettes, and the overall design and arrangement of the Service—are the exclusive property of Elemental Color Identity or its licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.',
        'The Elemental Color Identity name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Elemental Color Identity. You may not use such marks without our prior written permission.',
        'You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial use. This license does not include the right to: (a) modify or copy the Service or its content; (b) use the Service or its content for any commercial purpose; (c) reverse engineer any software contained in the Service; (d) remove any copyright or other proprietary notations; or (e) transfer the materials to another person or "mirror" the materials on any other server.',
        'User-Generated Content: By posting content on the Service (including forum posts, comments, and uploaded images), you grant us a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, adapt, publish, translate, and distribute such content in connection with the Service. You retain ownership of your content but acknowledge that it may be visible to other users.',
      ],
    },
    {
      id: 'consultations',
      icon: <Mail className="w-5 h-5" />,
      title: '7. Consultations & Workshops',
      content: [
        'Elemental Color Identity offers one-on-one consultations and workshops. By booking a consultation or class, you agree to the following:',
        'Scheduling: Consultations and classes are subject to availability. We will make reasonable efforts to accommodate your preferred schedule but cannot guarantee specific times.',
        'Workshop Bookings Workshop bookings require payment in full at the time of booking to secure your place. Places are limited and cannot be held without payment.',
        'Cancellation by you:\n• Cancellations made more than 48 hours before the workshop date will receive a full refund.\n• Cancellations made between less than 48 hours before the workshop date will receive a 50% refund or credit toward a future workshop.\n• No shows are non-refundable. You may transfer your place to another person by notifying us in advance.\n• Rescheduling: You may reschedule your workshop at least 24 hours in advance at no additional charge, subject to availability.',
        'Cancellation by ECI: In the unlikely event that we need to cancel or reschedule a workshop, all participants will be offered a full refund or the option to transfer to an alternative date.',
        'Personal Consultations & Private Day Consultation bookings require payment in full or a deposit at the time of booking, as agreed at the point of enquiry.',
        'Cancellation by you:\n• Cancellations made more than 48 hours before the scheduled consultation will receive a full refund.\n• Cancellations made in less than 48 hours of the scheduled consultation are non-refundable. Where possible, we will endeavor to reschedule at a mutually convenient time.',
        'Cancellation by ECI: In the event the consultant is unable to attend a scheduled consultation or Private Day, you will be offered a full refund or the option to reschedule at no additional cost.',
        'Rescheduling: You may reschedule your appointment at least 24 hours in advance at no additional charge, subject to availability. Should there be travel arrangements change charges, the client is responsible.',
        'Nature of Advice: Color consultations and workshops are for informational and entertainment purposes only. Our consultants are not licensed psychologists, therapists, or medical professionals. Any advice provided should not be considered a substitute for professional guidance.',
        'Recording: Sessions may not be recorded without the express consent of all parties involved.',
      ],
    },
    {
      id: 'disclaimers',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: '8. Disclaimers & Limitations of Liability',
      content: [
        'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
        'We do not warrant that: (a) the Service will be uninterrupted, timely, secure, or error-free; (b) the results obtained from the use of the Service will be accurate or reliable; (c) the quality of any products, services, information, or other material obtained through the Service will meet your expectations; or (d) any errors in the Service will be corrected.',
        'Elemental Type Assessments: Our elemental type system is a proprietary framework designed for self-exploration and personal expression. Results are not scientifically validated and should not be used for making important life decisions, including but not limited to medical, psychological, career, or relationship decisions.',
        'Color Recommendations: Color recommendations provided through the Service, including wardrobe analysis, hair color guidance, and camera-based analysis, are suggestions based on our proprietary system. Individual results may vary, and we are not responsible for any dissatisfaction with purchases or changes made based on our recommendations.',
        'IN NO EVENT SHALL ELEMENTAL COLOR IDENTITY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE.',
        'Our total liability to you for all claims arising from or relating to the Service shall not exceed the amount you have paid to us in the twelve (12) months preceding the claim.',
      ],
    },
    {
      id: 'privacy',
      icon: <Shield className="w-5 h-5" />,
      title: '9. Privacy & Data Protection',
      content: [
        'Your privacy is important to us. Our collection, use, and disclosure of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.',
        'By using the Service, you consent to the collection and use of your information as described in our Privacy Policy. This includes information collected through quizzes, account registration, camera analysis features, and community interactions.',
        'Camera & Photo Features: When you use our camera color analyzer or wardrobe analyzer features, images are processed to provide color analysis. We do not store or retain images captured through these features unless you explicitly choose to save them to your profile.',
        'Quiz Data: Your quiz responses and elemental type results are stored in association with your account to provide personalized recommendations and track your quiz history.',

      ],
    },
    {
      id: 'governing',
      icon: <Scale className="w-5 h-5" />,
      title: '10. Governing Law & Dispute Resolution',
      content: [
        'These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.',
        'Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If the dispute cannot be resolved through negotiation within 30 days, either party may submit the dispute to binding arbitration in accordance with the rules of the American Arbitration Association.',
        'You agree that any dispute resolution proceedings will be conducted on an individual basis and not in a class, consolidated, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration.',
        'Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of intellectual property rights.',
      ],
    },
    {
      id: 'termination',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: '11. Termination',
      content: [
        'We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.',
        'Upon termination: (a) your right to use the Service will immediately cease; (b) we may delete your account and all associated data; (c) any outstanding fees will become immediately due and payable; and (d) provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.',
        'You may terminate your account at any time by contacting us or through your account settings. If you have an active premium subscription, please review Section 4 regarding cancellation policies.',
      ],
    },
    {
      id: 'general',
      icon: <FileText className="w-5 h-5" />,
      title: '12. General Provisions',
      content: [
        'Entire Agreement: These Terms, together with our Privacy Policy and any other legal notices published on the Service, constitute the entire agreement between you and Elemental Color Identity regarding the Service.',
        'Severability: If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining provisions shall remain in full force and effect.',
        'Waiver: Our failure to enforce any right or provision of these Terms shall not be considered a waiver of those rights. Any waiver of any provision of these Terms will be effective only if in writing and signed by us.',
        'Assignment: You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction.',
        'Force Majeure: We shall not be liable for any failure or delay in performing our obligations under these Terms where such failure or delay results from circumstances beyond our reasonable control, including but not limited to natural disasters, acts of government, internet outages, or pandemics.',
        'Contact Information: If you have any questions about these Terms, please contact us at:\n\nElemental Color Identity\nEmail: info@elementalcoloridentity.com\nWebsite: www.elementalcoloridentity.com',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
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
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif">Terms of Service</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Please read these Terms of Service carefully before using the Elemental Color Identity platform. 
            By using our services, you agree to be bound by these terms.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <span>Last Updated: {lastUpdated}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>Effective Immediately</span>
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
                href={`#${section.id}`}
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
            <div key={section.id} id={section.id} className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
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
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-serif text-gray-900 mb-3">Have Questions?</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              If you have any questions about these Terms of Service, please don't hesitate to reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate?.('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Us
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

export default TermsOfService;
