import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Quote,
  Star,
  Heart,
  Users,
  BookOpen,
  Lightbulb,
  Globe,
  ChevronLeft,
  ChevronRight,
  Eye,
  Zap,
  Leaf,
  Waves,
} from 'lucide-react';
import { ELEMENT_GRADIENT, type ElementId } from '@/lib/elementBrandColors';

interface AboutUsProps {
  onBack: () => void;
  onStartQuiz: () => void;
  onNavigate?: (section: string) => void;
}

// Team data
const teamMembers = [
  {
    name: 'Sarah J Engen',
    role: 'Founder and Chief Elemental Colorist and Image Profiler',
    element: 'fire',
    bio: 'The pioneer of Elemental Color Typology and the creator of the 36 Image Types — known to her clients as the Wardrobe Shrink. A colorist and image adviser with a practice spanning Europe and the United States, she built ECI following a lifetime passion for color and a deep fascination with the self beneath the surface.',

    gradient: 'from-red-500 to-amber-500',
    bgGradient: 'from-red-50 to-amber-50',
    initials: 'SE',
  },
  {
    name: 'Brendan C. Engen, PsyD',
    role: 'Clinical Psychologist and Philosopher',
    element: 'water',
    bio: 'Drawing from three years doctoral study in Philosophy, studying ancient and modern philosophy and Eastern and Western spiritual traditions. Clinical Psychologist Dr Engen\'s emphasis is the psyche as a dynamic system. Dr Engen provides an advisory role in guiding the deeper philosophical content that connects color to consciousness, purpose, and self-realization.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    initials: 'BE',
  },
];


// Testimonials data
const testimonials = [
  {
    name: 'Rebecca M.',
    element: 'Fire-Water',
    text: 'I always struggled with choosing colors that felt "right." After discovering I\'m a Fire-Water subtype, everything clicked. My wardrobe finally feels like ME. The camera analyzer is a game-changer for shopping.',
    rating: 5,
    gradient: 'from-red-400 to-blue-400',
  },
  {
    name: 'David K.',
    element: 'Earth-Air',
    text: 'The depth of the elemental philosophy section blew me away. This isn\'t just about clothes—it\'s about understanding your core nature. The biorhythms guide alone transformed my daily routine.',
    rating: 5,
    gradient: 'from-amber-500 to-violet-400',
  },
  {
    name: 'Priya S.',
    element: 'Air-Water',
    text: 'As a professional stylist, I\'ve used every color system out there. Elemental Color Identity is the most intuitive and comprehensive I\'ve found. I now recommend it to all my clients as a starting point.',
    rating: 5,
    gradient: 'from-violet-400 to-cyan-400',
  },

  {
    name: 'Aisha J.',
    element: 'Fire-Earth',
    text: 'I was skeptical at first, but the quiz results were eerily accurate. The spiritual essence guide resonated deeply with me. This platform understands that color is energy, not just aesthetics.',
    rating: 5,
    gradient: 'from-red-400 to-amber-500',
  },
  {
    name: 'Sophia W.',
    element: 'Pure Air',
    text: 'The hair color guide saved me from a disastrous salon visit! I showed my stylist my elemental palette and she was amazed at how well it matched my undertone. Best color resource online.',
    rating: 5,
    gradient: 'from-indigo-400 to-purple-400',
  },
];

const aboutElementTiles: {
  id: ElementId;
  Icon: typeof Flame;
  title: string;
  subtitle: string;
}[] = [
  { id: 'fire', Icon: Flame, title: 'Fire', subtitle: 'Transformation' },
  { id: 'water', Icon: Droplets, title: 'Water', subtitle: 'Reflection' },
  { id: 'earth', Icon: Mountain, title: 'Earth', subtitle: 'Nourishment' },
  { id: 'air', Icon: Wind, title: 'Air', subtitle: 'Clarity' },
];

const connectsDiagramElements: {
  id: ElementId;
  Icon: typeof Flame;
  positionClass: string;
}[] = [
  { id: 'fire', Icon: Flame, positionClass: 'absolute top-0 left-1/2 -translate-x-1/2' },
  { id: 'water', Icon: Droplets, positionClass: 'absolute bottom-0 left-1/2 -translate-x-1/2' },
  { id: 'earth', Icon: Mountain, positionClass: 'absolute left-0 top-1/2 -translate-y-1/2' },
  { id: 'air', Icon: Wind, positionClass: 'absolute right-0 top-1/2 -translate-y-1/2' },
];

// Philosophy pillars
const philosophyPillars = [
  {
    icon: Flame,
    element: 'Fire',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    principle: 'Transformation & Radiance',
    description:
      'Fire types embody the principle of transformation—the power to convert potential into expression. Their colors carry warmth, intensity, and the magnetic quality of light itself.',
  },
  {
    icon: Droplets,
    element: 'Water',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    principle: 'Depth & Reflection',
    description:
      'Water types embody the principle of depth—the capacity to absorb, reflect, and reveal hidden truths. Their colors carry coolness, mystery, and the luminous quality of still waters.',
  },
  {
    icon: Mountain,
    element: 'Earth',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    principle: 'Stability & Nourishment',
    description:
      'Earth types embody the principle of stability—the power to ground, sustain, and bring forth abundance. Their colors carry richness, warmth, and the enduring quality of the land.',
  },
  {
    icon: Wind,
    element: 'Air',
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    principle: 'Clarity & Connection',
    description:
      'Air types embody the principle of clarity—the gift of perception, communication, and bridging worlds. Their colors carry lightness, ethereality, and the expansive quality of the sky.',
  },
];

// Timeline milestones
const milestones = [
  {
    year: '1998',
    title: 'The Beginning',
    description:
      'Started with House of Color, London as Color Analyst.',
  },
  {
    year: '2001',
    title: 'The Breakthrough',
    description:
      'Established InsideOut Profiling. Developed a system of Image Archetypes through profiling color, body architecture and personality.',
  },
  {
    year: '2003',
    title: 'Recognition',
    description:
      'Featured in The Sunday Times Style Magazine and The Times, referred to as a "Wardrobe Shrink". Expanded offering across Europe.',
  },
  {
    year: '2004',
    title: 'Move',
    description:
      'Move to San Francisco, U.S.A. Established new virtual consult system and profiling approach.',
  },
  {
    year: '2007',
    title: 'Spiritual Connection',
    description:
      'Finalized system of "36 Image Types". Started work on Dressing Your Psychology book. Spiritual insight pushed me to pause the work, to explore deeper the metaphysical elements of our nature.',
  },
  {
    year: '2009',
    title: 'Color Theory',
    description:
      'Deep exploration of color theory and color psychology. Itten, Goethe, Schopenhauer.',
  },
  {
    year: '2009-2019',
    title: 'Inner Retreat',
    description:
      'Inner spiritual work and motherhood.',
  },
  {
    year: '2019',
    title: 'Image Eveolution',
    description:
      'Launch of Image Eveolution and Image Program - a total image and identity system.',
  },
  {
    year: '2025',
    title: 'Authorship',
    description:
      'Exploration of metaphysical side of image and identity. Writing book The Invisible Self which led to revamp of image process shifting from psychological focus to psychospiritual and introduced the Four Elements or Four Roots. Had the epiphany that color wasn\'t simply an aesthetic or prescriptive system for image, but our consciousness vibrating. The Elemental Color Typology was born.',
    hasBookLink: true,
  },

  {
    year: 'November 2025',
    title: 'AI Integration',
    description:
      'Website development and Introduction of AI-powered camera color matching and the wardrobe analyzer—bringing real-time color intelligence to the Elemental Color Identity System.',

  },
  {
    year: 'February 2026',
    title: 'Pre-Launch',
    description:
      'Elemental Color Identity launches as a web platform with the core quiz, type profiles, and personalized color palettes for all 16 subtypes.',
  },
];


const AboutUs: React.FC<AboutUsProps> = ({ onBack, onStartQuiz, onNavigate }) => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [expandedTeamMember, setExpandedTeamMember] = useState<number | null>(null);

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-amber-500 to-red-500 blur-3xl" />
          <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-24">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-gray-300">Our Story</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              Color Is Not Just
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
                What You See
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              It is who you are — your truest, most essential self. Every person carries an inner
              energy or essence, a unique expression of the four forces that move through all living
              things: Fire, Water, Earth, and Air. We call this your Elemental Color Identity. Our
              intention is to help you discover, understand, and embody yours, so you can live fully
              in your element.
            </p>

          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full mb-6">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Our Origin</span>
              </div>

              <h2 className="text-4xl font-serif text-gray-900 mb-6">
                Back to the Source
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Color analysis has always begun on the surface. Elemental Color Identity
                  begins at the source.
                </p>
                <p>
                  Leadbeater observed that the inner life radiates its own color signature.
                  Gurdjieff taught that beneath the learned personality lies a permanent
                  essence — the true core of a human being. Empedocles named the four
                  elemental roots. The Sufis talk about the hidden root self. Jung mapped the
                  roots to the four dimensions of the psyche. The same recognition surfaced:
                  that you have an elemental nature, and that nature has a color.
                </p>
                <p>
                  Elemental Color Identity was built on that recognition. The intersection of
                  color and archetypes — distilled into a single system. Connecting the ancient
                  four-element framework - Fire, Water, Earth, Air - with modern color
                  psychology and personality typology. One that doesn't match colors to your
                  complexion, but uses color to mirror the Self.
                </p>
              </div>



            </div>

            {/* Visual element - Elemental grid (smaller squares, matching the homepage four elements) */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
              {aboutElementTiles.map(({ id, Icon, title, subtitle }) => (
                <div
                  key={id}
                  className="aspect-square rounded-xl p-4 flex flex-col justify-end text-white relative overflow-hidden group"
                  style={{ background: ELEMENT_GRADIENT[id] }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <Icon className="w-6 h-6 mb-2 opacity-80 relative" />
                  <h3 className="font-serif text-base relative">{title}</h3>
                  <p className="text-xs text-white/80 relative">{subtitle}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm mb-6">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">What Drives Us</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Our Mission & Values</h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Our purpose is to help every person find the colors that are not just flattering,
              but true. The visible signature of who they actually are. To build a community
              where self-expression and the conscious self is understood and celebrated.
            </p>


          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-3">Authentic Self-Discovery</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe color is a mirror. Our tools don't tell you who to be—they help
                you see who you already are. Every palette, every guide, every insight is
                designed to deepen your self-understanding.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-3">Science Meets Soul</h3>

              <p className="text-gray-600 leading-relaxed">
                Our psycho-chromatic framework is built on nearly 30 years of color analysis
                and image and identity experience, and through working with hundreds of clients.
                We also honor the ancient wisdom traditions that first mapped human nature through
                the elements and the master colorists that understood the mystical power of color
                to guide us on this journey to where we are today.
              </p>


            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-3">Inclusive Expression</h3>
              <p className="text-gray-600 leading-relaxed">
                Color belongs to everyone. Our system works for all - across all skin tones, cultural
                backgrounds, and personal styles. We celebrate the infinite diversity of
                human expression through the universal language of color.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* The Science / Philosophy Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full mb-6">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">The Framework</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              The Science of Elemental Color
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our system synthesizes three disciplines: classical elemental philosophy, color
              psychology, and personality typology. The result is a framework that connects
              you to your inner nature and to become more conscious through color.
            </p>

          </div>

          {/* Four Elements Philosophy */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {philosophyPillars.map((pillar) => (
              <div
                key={pillar.element}
                className={`${pillar.bgColor} rounded-2xl p-8 border ${pillar.borderColor} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-1">
                      {pillar.element}
                    </h3>
                    <p className={`text-sm font-medium ${pillar.color} mb-3`}>
                      {pillar.principle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How It All Connects */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-14">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-serif text-white mb-6">
                  How It All Connects
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 font-serif font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Elemental Archetype</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Your core element (Fire, Water, Earth, Air) represents your fundamental
                        nature and energetic pattern and—who you were meant to be.
                      </p>

                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-400 font-serif font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Secondary Influence</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Your secondary element creates your subtype (e.g., Fire+Water), which
                        influences how you express your element in the world, adding also
                        specificity to your color palette and personality profile.
                      </p>

                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-400 font-serif font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Color Resonance</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Each subtype has a unique palette of 12+ colors that resonate with your
                        energetic signature—colors that deeply resonate, make you feel alive,
                        and authentically yourself.
                      </p>

                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 font-serif font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Holistic Expression</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Your elemental color identity extends beyond wardrobe into decor, career,
                        relationships, spiritual practice, and daily rhythms—a complete
                        framework for living in alignment.
                      </p>

                    </div>
                  </div>
                </div>
              </div>

              {/* Visual: Interconnected elements */}
              <div className="flex items-center justify-center">
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  {/* Center circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-teal-400 to-violet-400 flex items-center justify-center shadow-2xl">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  {connectsDiagramElements.map(({ id, Icon, positionClass }) => (
                    <div
                      key={id}
                      className={`${positionClass} w-16 h-16 rounded-full flex items-center justify-center shadow-lg`}
                      style={{ background: ELEMENT_GRADIENT[id] }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  ))}
                  {/* Connecting lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 320 320"
                    fill="none"
                  >
                    <line x1="160" y1="64" x2="160" y2="256" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="64" y1="160" x2="256" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="160" y1="64" x2="64" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="160" y1="64" x2="256" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="64" y1="160" x2="160" y2="256" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="256" y1="160" x2="160" y2="256" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Got Here Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm mb-6">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Our Journey</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">How We Got Here</h2>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <p className="text-gray-600 leading-relaxed text-lg">
              Elemental Color Identity was born from nearly three decades of work in color analysis, image profiling, and identity consulting. What began in 1998 as a career in professional color analysis - with House of Color - evolved over the years into something far deeper—a system that connects color not just to how we look, but to who we are. Through working with hundreds of clients across Europe and the U.S., developing the "36 Image Types" system and being referred to as the "Wardrobe Shrink", and years of interest in color theory, archetypal psychology, and ancient elemental philosophy, the framework gradually took shape. A pivotal period brought the final revelation: that color is not simply an aesthetic tool, but a reflection of our consciousness and who we are. They activate and not simply reveal. From that epiphany, the Elemental Color Typology was born—and in 2025, it became the platform you see today, helping people discover who they truly are through color and the elements.
            </p>

          </div>
        </div>

      </section>


      {/* Team Section */}

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-full mb-6">
              <Users className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-medium text-rose-700">The People</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The minds behind Elemental Color Identity—combining decades of color analysis,
              archetypal psychology, and philosophical inquiry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`bg-gradient-to-br ${member.bgGradient} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer`}
                onClick={() =>
                  setExpandedTeamMember(expandedTeamMember === index ? null : index)
                }
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-serif text-xl flex-shrink-0 shadow-md`}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${member.gradient} text-white`}
                    >
                      {member.element.charAt(0).toUpperCase() + member.element.slice(1)} Type
                    </span>
                  </div>
                </div>

                <p
                  className={`text-gray-600 text-sm leading-relaxed transition-all ${
                    expandedTeamMember === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-16 overflow-hidden opacity-70'
                  }`}
                >
                  {member.bio}
                </p>

                <button className="mt-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  {expandedTeamMember === index ? 'Show less' : 'Read more'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm mb-6">
              <Quote className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-gray-700">Testimonials</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who discovered their elemental color Identity and
              transformed how they express themselves.
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="relative bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-8">
            <Quote className="w-12 h-12 text-gray-200 absolute top-6 left-6" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(testimonials[activeTestimonialIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed mb-8">
                "{testimonials[activeTestimonialIndex].text}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[activeTestimonialIndex].gradient} flex items-center justify-center text-white font-medium`}
                  >
                    {testimonials[activeTestimonialIndex].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonials[activeTestimonialIndex].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[activeTestimonialIndex].element} Type
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonialIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeTestimonialIndex
                    ? 'bg-gray-900 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Mini testimonial cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {testimonials
              .filter((_, i) => i !== activeTestimonialIndex)
              .slice(0, 3)
              .map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const realIndex = testimonials.findIndex(
                      (t) => t.name === testimonial.name
                    );
                    setActiveTestimonialIndex(realIndex);
                  }}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-5 text-left hover:bg-white hover:shadow-md transition-all border border-white/80"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs`}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-500">{testimonial.name}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6">
            Ready to Discover
            <br />
            Your Elemental Color Identity?
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Take our quiz to uncover your elemental type and receive a personalized color
            palette that reflects your deepest nature. It only takes a few minutes.
          </p>
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg text-lg"
          >
            Take the Quiz
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
