import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Building2, Users, Brain, Target, Sparkles,
  CheckCircle, AlertCircle, Send, ChevronDown, ChevronUp,
  Lightbulb, Shield, Heart, Zap, TrendingUp,

  BookOpen, MessageSquare, Calendar, Globe, Mail, Phone,
  Handshake, BarChart3, Layers, UserCheck, Compass, Star,
  Palette, Crown, User, Gem, Flame, Droplets, Mountain, Wind, Sun, Eye
} from 'lucide-react';



interface CorporatePartnershipsProps {
  onBack: () => void;
  onNavigate: (section: string) => void;
}

interface InquiryForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: string;
  interest: string;
  message: string;
}

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  interest?: string;
  message?: string;
}

const offerings = [
  {
    id: 'membership',
    icon: Crown,
    title: 'Corporate Membership Access',
    subtitle: 'Premium platform access for your entire workforce',
    description: 'Give every employee in your organization full membership access to the Elemental Color Identity website. Staff can explore their subtype in depth, access premium guides on communication, leadership, conflict styles, color palettes, wardrobe insights, and much more—on their own time, at their own pace.',
    features: [
      'Full premium membership for every employee in your organization',
      'Unlimited access to the Elemental Color Identity quiz and retakes',
      'Complete subtype profiles with personalized insights and growth paths',
      'Premium content library: leadership styles, communication guides, conflict resolution, and more',
      'Personal color palette and wardrobe guides for each employee\'s subtype',
      'Access to the community forum for peer-to-peer elemental discussions',
      'Team composition analyzer and compatibility tools',
      'Ongoing content updates and new features as the platform evolves',
      'Bulk onboarding support and admin reporting on participation',
    ],
    duration: 'Annual or multi-year license',
    idealFor: 'Organizations of any size',
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50',
    borderColor: 'border-yellow-200',
  },
  {
    id: 'team-transformation',
    icon: Palette,
    title: 'Team Transformation Day',
    subtitle: 'A full-day immersive experience for teams',
    description: 'A powerful, full-day transformation experience where your team members discover not just their primary element but their specific elemental subtype—and learn what that means for how they show up, communicate, and collaborate. Participants uncover their personal color palettes and explore how to authentically express their subtype in their appearance, environment, and interactions at work.',
    features: [
      'In-depth Elemental Color Identity quiz with full subtype reveal',
      'Personalized subtype deep-dive: understanding your unique elemental expression',
      'Personal color palette discovery—the colors that resonate with each subtype',
      'Guided session on expressing your subtype: wardrobe, workspace, and personal presence',
      'How your subtype shapes your natural work approach and communication style',
      'Understanding others\' subtypes: building empathy and reducing friction',
      'Interactive team mapping: seeing the full elemental landscape of your group',
      'Practical takeaways: subtype profile cards, color palette swatches, and a personal action plan',
      'Follow-up digital resources and optional 30-day check-in session',
    ],
    duration: 'Full day (7–8 hrs)',
    idealFor: 'Teams of 8–40 people',
    color: 'from-fuchsia-500 to-pink-500',
    bgColor: 'from-fuchsia-50 to-pink-50',
    borderColor: 'border-fuchsia-200',
  },
  {
    id: 'executive-transformation',
    icon: Gem,
    title: 'Senior Leadership One-to-One Transformation',
    subtitle: 'Bespoke one-to-one sessions for senior management',
    description: 'An exclusive, deeply personalized transformation experience designed for senior leaders and executives. In a private one-to-one setting, each leader discovers their elemental subtype, personal color palette, and how to express their authentic identity with confidence—both in how they present themselves and how they lead their teams.',
    features: [
      'Private one-to-one session with a certified Elemental Color Identity analyst',
      'Comprehensive subtype assessment with nuanced interpretation for leadership contexts',
      'Personal color palette consultation: the colors that amplify your executive presence',
      'Expressing your subtype as a leader: presence, wardrobe, and personal brand alignment',
      'Understanding your natural leadership approach through the elemental lens',
      'Strategies for leading across all elemental types with authenticity and impact',
      'Confidential leadership blind-spot analysis based on your subtype',
      'Bespoke action plan for integrating elemental awareness into your leadership style',
      'Optional follow-up coaching sessions (30-day and 90-day check-ins)',
      'Beautifully presented personal elemental profile portfolio to keep',
    ],
    duration: 'Half-day (3–4 hrs) per leader',
    idealFor: 'C-suite, VPs, and senior directors',
    color: 'from-slate-600 to-gray-800',
    bgColor: 'from-slate-50 to-gray-100',
    borderColor: 'border-slate-300',
  },
  {
    id: 'workshop',
    icon: Users,
    title: 'Team Discovery Workshops',
    subtitle: 'Half-day or full-day immersive sessions',
    description: 'Interactive workshops where employees discover their Elemental Color Identity and learn how their natural work approach complements others on their team. Includes the quiz, group debrief, and team mapping exercises.',
    features: [
      'Guided Elemental Color Identity quiz for all participants',
      'Individual results debrief with personalized insights',
      'Team elemental composition mapping and analysis',
      'Communication style awareness exercises',
      'Conflict resolution frameworks based on elemental pairings',
      'Printed take-home elemental profile cards',
    ],
    duration: 'Half-day (4 hrs) or Full-day (7 hrs)',
    idealFor: 'Teams of 10–50 people',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
  },
  {
    id: 'leadership',
    icon: Shield,
    title: 'Leadership Development Program',
    subtitle: 'Multi-session deep-dive for managers & leaders',
    description: 'A structured program helping leaders understand their natural leadership style through the elemental lens. Leaders learn to recognize and leverage the diverse elemental energies within their teams for optimal performance.',
    features: [
      'Elemental leadership style assessment and coaching',
      'Understanding how each element leads, motivates, and delegates',
      'Blind spot awareness and growth strategies per element',
      'Cross-elemental communication mastery',
      'Building psychologically safe teams using elemental awareness',
      'One-on-one coaching sessions with certified elemental analysts',
    ],
    duration: '4-week program (weekly 2-hr sessions)',
    idealFor: 'Managers, directors, and senior leaders',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'from-indigo-50 to-violet-50',
    borderColor: 'border-indigo-200',
  },
];





const benefits = [
  {
    icon: Brain,
    title: 'Deeper Self-Knowledge',
    description: 'Employees gain genuine insight into their natural tendencies, strengths, and blind spots—not through a generic personality label, but through a rich, nuanced elemental identity they can immediately relate to.',
    color: 'text-violet-500',
    bg: 'bg-violet-100',
  },
  {
    icon: Heart,
    title: 'Greater Confidence',
    description: 'When people understand that their way of working is not a flaw but a feature of their elemental nature, they show up with more confidence, authenticity, and willingness to contribute their unique gifts.',
    color: 'text-rose-500',
    bg: 'bg-rose-100',
  },
  {
    icon: Users,
    title: 'Improved Team Dynamics',
    description: 'Teams develop a shared language for discussing work styles without judgment. Fire types understand why Water types need reflection time. Earth types appreciate why Air types need freedom to ideate.',
    color: 'text-teal-500',
    bg: 'bg-teal-100',
  },
  {
    icon: MessageSquare,
    title: 'Better Communication',
    description: 'Our elemental communication styles framework gives teams practical tools for translating their message across elemental frequencies—reducing misunderstandings and increasing clarity.',
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    icon: Handshake,
    title: 'Reduced Conflict',
    description: 'Understanding elemental conflict styles helps teams anticipate friction points, de-escalate tensions, and resolve disagreements constructively by recognizing that different elements process conflict differently.',
    color: 'text-amber-500',
    bg: 'bg-amber-100',
  },
  {
    icon: TrendingUp,
    title: 'Higher Engagement & Retention',
    description: 'Employees who feel understood and valued for who they naturally are—not who they\'re told to be—are more engaged, more loyal, and more productive. Elemental awareness creates belonging.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Through Diversity',
    description: 'When teams understand that each element brings irreplaceable value—Fire\'s vision, Water\'s depth, Earth\'s stability, Air\'s perspective—they stop trying to homogenize and start leveraging true cognitive diversity.',
    color: 'text-orange-500',
    bg: 'bg-orange-100',
  },
  {
    icon: BarChart3,
    title: 'Measurable Outcomes',
    description: 'We provide pre- and post-program surveys, team composition analytics, and engagement metrics so you can demonstrate ROI to stakeholders and track the impact of elemental awareness over time.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
  },
];




const companySizes = [
  { value: '', label: 'Select company size...' },
  { value: '1-50', label: '1–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-500', label: '201–500 employees' },
  { value: '501-1000', label: '501–1,000 employees' },
  { value: '1001-5000', label: '1,001–5,000 employees' },
  { value: '5000+', label: '5,000+ employees' },
];

const interestOptions = [
  { value: '', label: 'Select your interest...' },
  { value: 'membership', label: 'Corporate Membership Access' },
  { value: 'team-transformation', label: 'Team Transformation Day' },
  { value: 'executive-transformation', label: 'Senior Leadership One-to-One Transformation' },
  { value: 'workshop', label: 'Team Discovery Workshop' },
  { value: 'leadership', label: 'Leadership Development Program' },
  { value: 'custom', label: 'Custom / Multiple Programs' },
];




const CorporatePartnerships: React.FC<CorporatePartnershipsProps> = ({ onBack, onNavigate }) => {
  const [expandedOffering, setExpandedOffering] = useState<string | null>(null);
  const [formData, setFormData] = useState<InquiryForm>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.interest) newErrors.interest = 'Please select your area of interest';
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your goals';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide at least 20 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof InquiryForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ companyName: '', contactName: '', email: '', phone: '', companySize: '', interest: '', message: '' });
    setTimeout(() => setSubmitStatus('idle'), 10000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-40 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Home</span>
          </button>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span className="text-sm text-amber-200">Corporate Partnerships</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
              Empower Your Teams with{' '}
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300 bg-clip-text text-transparent">
                Elemental Self-Knowledge
              </span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
              Help your employees gain deep self-knowledge, build confidence in their natural work approach, 
              and understand how others around them operate—through the powerful lens of Elemental Color Identity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => {
                  const el = document.getElementById('corporate-contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Send className="w-5 h-5" />
                Get in Touch
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('corporate-offerings');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                <Layers className="w-5 h-5" />
                Explore Our Offerings
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl">
            {[
              { label: 'Elemental Types', value: '16', sublabel: 'Unique profiles' },
              { label: 'Insight Areas', value: '25+', sublabel: 'Work & personal' },
              { label: 'Team Tools', value: '6', sublabel: 'Analyzers & guides' },
              { label: 'Satisfaction', value: '97%', sublabel: 'Participant rating' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 text-center">
                <p className="text-3xl font-serif text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/80 font-medium">{stat.label}</p>
                <p className="text-xs text-white/50">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Inner Self — A Deeper Foundation for Business */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/30 to-violet-50/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-200/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-50 to-violet-50 rounded-full mb-8 border border-amber-200/50 shadow-sm">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-amber-700 to-violet-700 bg-clip-text text-transparent">
                The Deeper Foundation
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
              Introducing the{' '}
              <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-violet-600 bg-clip-text text-transparent">
                Inner Self
              </span>
              {' '}to Your Organization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beneath every role, every title, and every professional persona lies something far more powerful—a person's{' '}
              <em className="text-gray-800 not-italic font-medium">elemental nature</em>. It is the deepest current of who they truly are.
            </p>
          </div>

          {/* Main philosophical content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Left — The Philosophy */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-amber-100/80 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-md">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900">Our Nature Runs Deep</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Every person carries within them a set of underlying energies—deep, elemental forces that shape how they think, 
                    feel, create, and connect. These aren't surface-level preferences or learned behaviours. They are the currents of 
                    the <em>inner self</em>: the part of us that existed before any job title, any corporate culture, any performance review.
                  </p>
                  <p>
                    When a person is aligned with these deepest energies—when they are living and working in harmony with their true 
                    elemental nature—something remarkable happens. They come alive. They feel a sense of rightness, of flow, of being 
                    exactly where they are meant to be. This is not motivation in the conventional sense. It is something far more 
                    profound: it is the experience of <em>being fully themselves</em>.
                  </p>
                  <p className="text-gray-800 font-medium">
                    And it is precisely in this state—this alignment with one's inner nature—that happiness, fulfilment, and genuine 
                    success naturally arise.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — The Business Connection */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-violet-100/80 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900">Your Greatest Business Resource</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Here is the truth that most organizations overlook: the qualities that make a person most effective at work are 
                    not the ones they learned in training. They are the ones they were <em>born with</em>. The Fire type's natural 
                    courage and decisiveness. The Water type's intuitive depth and emotional intelligence. The Earth type's unwavering 
                    reliability and care. The Air type's brilliant clarity and vision.
                  </p>
                  <p>
                    These are not skills to be developed—they are <em>gifts to be recognised</em>. When an organization helps its 
                    people discover and honour these innate qualities, it doesn't just improve engagement scores. It unlocks the most 
                    powerful resource any business can possess: <strong className="text-gray-900">people who are fully expressed, 
                    deeply happy, and operating from their authentic strengths</strong>.
                  </p>
                  <p>
                    A person working from their elemental centre doesn't burn out—they <em>light up</em>. They don't merely perform—they 
                    <em> contribute something irreplaceable</em>. And a team of people who each understand and express their inner nature 
                    becomes something extraordinary: not just productive, but truly alive.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The Flow: Inner Nature → Best Qualities → Business Success */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-serif text-gray-900 text-center mb-10">
              From Inner Nature to Organisational Excellence
            </h3>
            <div className="grid md:grid-cols-4 gap-4 md:gap-2">
              {[
                {
                  icon: Eye,
                  title: 'Discover the Inner Self',
                  description: 'Each person reconnects with their elemental nature—the deep, underlying energies that define who they truly are beneath the professional surface.',
                  color: 'from-amber-500 to-orange-500',
                  bg: 'bg-amber-50',
                  border: 'border-amber-200',
                  iconBg: 'bg-amber-100',
                  iconColor: 'text-amber-600',
                },
                {
                  icon: Heart,
                  title: 'Unlock Happiness & Flow',
                  description: 'When people align with their nature, they experience genuine happiness and fulfilment—the kind that sustains energy, creativity, and resilience over time.',
                  color: 'from-rose-500 to-pink-500',
                  bg: 'bg-rose-50',
                  border: 'border-rose-200',
                  iconBg: 'bg-rose-100',
                  iconColor: 'text-rose-600',
                },
                {
                  icon: Sun,
                  title: 'Express Best Qualities',
                  description: 'Their finest qualities—courage, empathy, steadfastness, insight—emerge naturally and powerfully, because they are no longer suppressed or misdirected.',
                  color: 'from-violet-500 to-purple-500',
                  bg: 'bg-violet-50',
                  border: 'border-violet-200',
                  iconBg: 'bg-violet-100',
                  iconColor: 'text-violet-600',
                },
                {
                  icon: TrendingUp,
                  title: 'Fuel Business Success',
                  description: 'These authentic qualities become the organisation\'s greatest resources—driving innovation, trust, collaboration, and the kind of success that is both meaningful and lasting.',
                  color: 'from-emerald-500 to-teal-500',
                  bg: 'bg-emerald-50',
                  border: 'border-emerald-200',
                  iconBg: 'bg-emerald-100',
                  iconColor: 'text-emerald-600',
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`${step.bg} rounded-2xl p-6 border ${step.border} h-full`}>
                    <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center mb-4`}>
                      <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                    </div>
                    <h4 className="font-serif text-lg text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {/* Arrow connector */}
                  {idx < 3 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2">
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Closing thought */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 via-indigo-950 to-violet-950 rounded-2xl p-10 md:p-12 text-center overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-5 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-5 right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl" />
              </div>
              <div className="relative">
                <svg className="w-10 h-10 text-amber-400/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl md:text-2xl font-serif text-white/90 leading-relaxed mb-6 italic">
                  "The most successful organisations of the future will not be those that extract the most from their people. 
                  They will be those that help their people discover and express the most <em className="not-italic font-medium text-amber-300">within</em> themselves."
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mb-4" />
                <p className="text-sm text-white/50">
                  The philosophy behind Elemental Color Identity
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to offerings */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
              Our corporate programs are designed to guide your people on this journey—from surface-level awareness to deep, 
              lasting connection with their elemental nature. The result is not just a better workplace, but a more 
              <em> human</em> one.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('corporate-offerings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-violet-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
            >
              <Sparkles className="w-5 h-5" />
              Explore Our Programs
            </button>
          </div>
        </div>
      </section>

      {/* Why Elemental Color Identity for L&D */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6 border border-amber-100">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">Why Elemental Color Identity?</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              A New Paradigm for Employee Development
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Traditional personality assessments put people in boxes. Elemental Color Identity reveals the 
              <em> natural energy</em> each person brings to their work—and teaches them to channel it 
              consciously, without apology. The result? Teams that don't just tolerate differences—they 
              leverage them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Problem */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-serif text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                The Challenge
              </h3>
              <ul className="space-y-3">
                {[
                  'Employees feel misunderstood or undervalued for their natural approach',
                  'Teams struggle with communication breakdowns and unresolved conflict',
                  'Leaders default to one-size-fits-all management styles',
                  'Onboarding lacks tools for understanding team dynamics',
                  'Engagement surveys reveal disconnection but not the root cause',
                  'Traditional personality tools feel clinical, reductive, or forgettable',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-gradient-to-br from-amber-50 to-violet-50 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-xl font-serif text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                The Elemental Solution
              </h3>
              <ul className="space-y-3">
                {[
                  'Each employee discovers their unique elemental identity and natural strengths',
                  'Teams develop a shared, non-judgmental language for work styles',
                  'Leaders learn to adapt their approach to each element\'s needs',
                  'New hires integrate faster with elemental team mapping',
                  'Root causes of disengagement become visible through elemental awareness',
                  'The system is rich, memorable, and immediately applicable to daily work',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Four Elements at Work */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h3 className="text-2xl font-serif text-gray-900 text-center mb-8">
              The Four Elements at Work
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  element: 'Fire',
                  color: 'from-amber-500 to-red-500',
                  bg: 'bg-amber-50',
                  border: 'border-amber-200',
                  traits: 'Visionary, decisive, action-oriented',
                  workStyle: 'Drives initiatives, sets pace, champions bold ideas',
                },
                {
                  element: 'Water',
                  color: 'from-blue-500 to-cyan-500',
                  bg: 'bg-blue-50',
                  border: 'border-blue-200',
                  traits: 'Intuitive, empathetic, reflective',
                  workStyle: 'Reads the room, builds trust, navigates complexity',
                },
                {
                  element: 'Earth',
                  color: 'from-emerald-500 to-green-500',
                  bg: 'bg-emerald-50',
                  border: 'border-emerald-200',
                  traits: 'Reliable, methodical, grounded',
                  workStyle: 'Builds systems, ensures quality, creates stability',
                },
                {
                  element: 'Air',
                  color: 'from-violet-500 to-indigo-500',
                  bg: 'bg-violet-50',
                  border: 'border-violet-200',
                  traits: 'Analytical, innovative, objective',
                  workStyle: 'Sees patterns, questions assumptions, designs solutions',
                },
              ].map((el, idx) => (
                <div key={idx} className={`${el.bg} rounded-xl p-6 border ${el.border}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${el.color} flex items-center justify-center mb-4`}>
                    <span className="text-white font-serif text-lg">{el.element[0]}</span>
                  </div>
                  <h4 className="font-serif text-lg text-gray-900 mb-1">{el.element}</h4>
                  <p className="text-sm text-gray-500 mb-3">{el.traits}</p>
                  <p className="text-sm text-gray-700">{el.workStyle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-gray-200 shadow-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Organizational Benefits</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              The Impact on Your Organization
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              When employees understand themselves and each other at an elemental level, 
              the ripple effects transform every aspect of your workplace culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center mb-4`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="corporate-offerings" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6 border border-indigo-100">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-700">Our Offerings</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Programs & Partnerships
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From single workshops to enterprise-wide licensing, we have a solution that fits 
              your organization's size, goals, and culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering) => {
              const isExpanded = expandedOffering === offering.id;
              return (
                <div
                  key={offering.id}
                  className={`bg-gradient-to-br ${offering.bgColor} rounded-2xl border ${offering.borderColor} overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offering.color} flex items-center justify-center mb-4`}>
                      <offering.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-serif text-xl text-gray-900 mb-1">{offering.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{offering.subtitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{offering.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-700">
                        <Calendar className="w-3 h-3" />
                        {offering.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-700">
                        <Users className="w-3 h-3" />
                        {offering.idealFor}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedOffering(isExpanded ? null : offering.id)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {isExpanded ? 'Show less' : 'View details'}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-white/50">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-3">What's Included</p>
                      <ul className="space-y-2">
                        {offering.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          setFormData(prev => ({ ...prev, interest: offering.id }));
                          const el = document.getElementById('corporate-contact');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${offering.color} text-white rounded-xl font-medium hover:opacity-90 transition-opacity`}
                      >
                        <Send className="w-4 h-4" />
                        Inquire About This Program
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>




      {/* How It Works for Corporations */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">How the Partnership Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From initial conversation to ongoing impact—here's what the journey looks like.
            </p>
          </div>

          <div className="space-y-0">
            {[
              {
                step: '01',
                title: 'Discovery Call',
                description: 'We learn about your organization, team dynamics, current challenges, and L&D goals. We recommend the right program or combination of offerings.',
                icon: Phone,
                color: 'from-amber-500 to-orange-500',
              },
              {
                step: '02',
                title: 'Custom Proposal',
                description: 'We design a tailored program with pricing, timeline, and deliverables specific to your needs. No cookie-cutter solutions—every engagement is bespoke.',
                icon: BookOpen,
                color: 'from-indigo-500 to-violet-500',
              },
              {
                step: '03',
                title: 'Program Delivery',
                description: 'Our certified facilitators deliver the program—whether it\'s a workshop, retreat, or enterprise rollout. Every session is engaging, insightful, and immediately actionable.',
                icon: Sparkles,
                color: 'from-emerald-500 to-teal-500',
              },
              {
                step: '04',
                title: 'Ongoing Support',
                description: 'We provide follow-up resources, team analytics, and optional ongoing coaching to ensure the elemental awareness becomes embedded in your culture—not just a one-time event.',
                icon: Globe,
                color: 'from-rose-500 to-pink-500',
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 md:gap-8">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  {idx < 3 && <div className="w-0.5 h-full bg-gray-200 my-2" />}
                </div>
                {/* Content */}
                <div className="pb-12">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Step {step.step}</p>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="corporate-contact" className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
                <h2 className="text-2xl font-serif text-gray-900 mb-2">Start the Conversation</h2>
                <p className="text-gray-500 mb-8">
                  Tell us about your organization and goals, and we'll get back to you within one business day 
                  with a tailored recommendation.
                </p>

                {submitStatus === 'success' && (
                  <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-800">Inquiry submitted successfully!</p>
                      <p className="text-sm text-emerald-600 mt-1">
                        Thank you for your interest. A member of our partnerships team will be in touch within one business day.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        placeholder="Your company"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.companyName ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400`}
                      />
                      {errors.companyName && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    {/* Contact Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleChange('contactName', e.target.value)}
                        placeholder="Full name"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.contactName ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400`}
                      />
                      {errors.contactName && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.contactName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="you@company.com"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-gray-400 text-xs">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Company Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Size
                      </label>
                      <select
                        value={formData.companySize}
                        onChange={(e) => handleChange('companySize', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 bg-white appearance-none cursor-pointer"
                      >
                        {companySizes.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Interest */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area of Interest <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => handleChange('interest', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.interest ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 bg-white appearance-none cursor-pointer`}
                      >
                        {interestOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      {errors.interest && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.interest}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell Us About Your Goals <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="What challenges are you looking to address? What does success look like for your team?"
                      rows={5}
                      maxLength={2000}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400 resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-white transition-all ${
                      isSubmitting
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Partnership Inquiry
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Direct Contact */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-serif text-gray-900 mb-6">Prefer to Reach Out Directly?</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Partnerships Email</p>
                      <p className="text-gray-900 font-medium text-sm">info@elementalcoloridentity.com</p>

                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium text-sm">912-816-0075</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <h3 className="text-lg font-serif mb-2">What to Expect</h3>
                <p className="text-gray-400 text-sm mb-6">
                  After submitting your inquiry, here's what happens next:
                </p>
                <div className="space-y-4">
                  {[
                    { step: '1', text: 'We review your inquiry within 1 business day' },
                    { step: '2', text: 'A partnerships specialist reaches out to schedule a call' },
                    { step: '3', text: 'We conduct a discovery call to understand your needs' },
                    { step: '4', text: 'You receive a custom proposal within 5 business days' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium">{item.step}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-serif text-gray-900 mb-4">Explore More</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('team-dynamics')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 font-medium">Team Dynamics</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </button>
                  <button
                    onClick={() => onNavigate('leadership-styles')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 font-medium">Leadership Styles</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </button>
                  <button
                    onClick={() => onNavigate('communication-styles')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 font-medium">Communication Styles</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </button>
                  <button
                    onClick={() => onNavigate('conflict-styles')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 font-medium">Conflict Styles</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </button>
                  <button
                    onClick={() => onNavigate('about')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 font-medium">About Us</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Building2 className="w-12 h-12 mx-auto text-amber-400 mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Ready to Transform Your Workplace Culture?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Join forward-thinking organizations that use Elemental Color Identity to build 
            self-aware, confident, and collaborative teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('corporate-contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Send className="w-5 h-5" />
              Get in Touch
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              General Contact
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporatePartnerships;
