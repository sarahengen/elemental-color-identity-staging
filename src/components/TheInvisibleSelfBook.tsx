import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Eye,
  Heart,
  Star,
  CheckCircle,
  Mail,
  User,
  ChevronDown,
  ChevronUp,
  Quote,
  Feather,
  Layers,
  Compass,
  Sun,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface TheInvisibleSelfBookProps {
  onBack: () => void;
  onStartQuiz: () => void;
  onNavigate?: (section: string) => void;
}

const bookCoverUrl = 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770864759551_947ff20e.jpg';
const heroUrl = 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770864775098_7c28a0cc.jpg';

const fourElements = [
  {
    name: 'Fire',
    icon: Flame,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    gradient: 'from-red-500 to-amber-500',
    principle: 'The Principle of Transformation',
    description:
      'Fire is the element of will, radiance, and transformation. It represents the force that converts potential into expression—the spark of consciousness that ignites purpose and illuminates identity. In the psychospiritual framework, Fire types carry the energy of initiation and creative destruction.',
    keywords: ['Radiance', 'Will', 'Transformation', 'Initiation', 'Expression'],
  },
  {
    name: 'Water',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    gradient: 'from-blue-500 to-cyan-500',
    principle: 'The Principle of Depth',
    description:
      'Water is the element of depth, reflection, and emotional intelligence. It represents the capacity to absorb, mirror, and reveal hidden truths. Water types embody the psyche\'s ability to flow between states of consciousness, accessing intuition and the collective unconscious.',
    keywords: ['Depth', 'Reflection', 'Intuition', 'Emotion', 'Mystery'],
  },
  {
    name: 'Earth',
    icon: Mountain,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    gradient: 'from-amber-500 to-green-600',
    principle: 'The Principle of Embodiment',
    description:
      'Earth is the element of stability, nourishment, and material manifestation. It represents the grounding force that brings the invisible into visible form. Earth types carry the energy of stewardship—the ability to cultivate, sustain, and bring forth abundance from the ground of being.',
    keywords: ['Stability', 'Nourishment', 'Embodiment', 'Abundance', 'Grounding'],
  },
  {
    name: 'Air',
    icon: Wind,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    gradient: 'from-violet-500 to-indigo-500',
    principle: 'The Principle of Perception',
    description:
      'Air is the element of clarity, connection, and transcendent vision. It represents the mind\'s capacity to perceive patterns, communicate truth, and bridge the seen and unseen worlds. Air types carry the energy of the seer—the ability to rise above and see the whole.',
    keywords: ['Clarity', 'Perception', 'Connection', 'Vision', 'Communication'],
  },
];

const bookChapters = [
  {
    number: 'I',
    title: 'The Invisible Architecture',
    description: 'How our inner nature shapes our outer expression—the hidden blueprint that determines which colors, textures, and forms resonate with our deepest self.',
  },
  {
    number: 'II',
    title: 'The Four Roots',
    description: 'An introduction to the Four Elements as psychological and spiritual forces—Fire, Water, Earth, and Air as the fundamental energies that compose human consciousness.',
  },
  {
    number: 'III',
    title: 'Color as Consciousness',
    description: 'The revolutionary insight that color is not merely an aesthetic preference but a vibration of consciousness—how the colors we are drawn to reflect our inner state of being.',
  },
  {
    number: 'IV',
    title: 'The Psychospiritual Image',
    description: 'Moving beyond the psychological to the psychospiritual—how image becomes a sacred practice of self-realization rather than mere self-presentation.',
  },
  {
    number: 'V',
    title: 'The 36 Image Types',
    description: 'The complete typological system that maps the intersection of color, body architecture, and personality into 36 distinct image archetypes.',
  },
  {
    number: 'VI',
    title: 'Living in Your Element',
    description: 'Practical guidance for embodying your elemental nature in every dimension of life—wardrobe, environment, relationships, career, and spiritual practice.',
  },
];

const TheInvisibleSelfBook: React.FC<TheInvisibleSelfBookProps> = ({
  onBack,
  onStartQuiz,
  onNavigate,
}) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistElement, setWaitlistElement] = useState('');
  const [waitlistReason, setWaitlistReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [expandedElement, setExpandedElement] = useState<number | null>(null);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('book_waitlist').insert({
        email: waitlistEmail,
        full_name: waitlistName || null,
        elemental_type: waitlistElement || null,
        interest_reason: waitlistReason || null,
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already on the list!',
            description: 'This email is already registered for the waitlist.',
          });
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        toast({
          title: 'Welcome to the waitlist!',
          description: "You'll be among the first to know when The Invisible Self is available.",
        });
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroUrl}
            alt="The Invisible Self"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-28">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-300">Forthcoming Book</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 leading-tight">
                The Invisible
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
                  Self
                </span>
              </h1>

              <p className="text-lg text-gray-300 mb-2 font-medium">
                by Sarah J Engen
              </p>

              <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-8">
                A groundbreaking exploration of the psychospiritual nature of image—how color,
                consciousness, and the Four Elements reveal the invisible architecture of who
                we truly are.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Psychospiritual Image', 'Four Elements', 'Color & Consciousness', 'Elemental Typology'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('waitlist-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg text-lg"
              >
                <Mail className="w-5 h-5" />
                Join the Waitlist
              </button>
            </div>

            {/* Book Cover */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-teal-400/20 to-violet-400/20 rounded-2xl blur-2xl" />
                <img
                  src={bookCoverUrl}
                  alt="The Invisible Self book cover"
                  className="relative w-72 md:w-80 lg:w-96 rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-sm font-medium rounded-full shadow-lg">
                  Coming 2026
                </div>
              </div>
            </div>
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

      {/* About the Book */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full mb-6">
                <Eye className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">About the Book</span>
              </div>

              <h2 className="text-4xl font-serif text-gray-900 mb-6">
                The Book That Birthed
                <br />
                Elemental Color Identity
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  <em>The Invisible Self</em> is the culmination of over 28 years of work in color
                  analysis, archetypal psychology, and image profiling. It represents a radical
                  departure from conventional approaches to personal image—moving from the
                  purely aesthetic and psychological to the <strong>psychospiritual</strong>.
                </p>
                <p>
                  The book introduces a revolutionary framework: that our relationship with color
                  is not simply about what flatters our skin tone or matches our wardrobe. It is
                  about <strong>consciousness vibrating</strong>. The colors we are drawn to, the
                  hues that make us feel most alive—these are not random preferences. They are
                  expressions of our deepest nature, our elemental essence.
                </p>
                <p>
                  Through the lens of the Four Elements—or <em>Four Roots</em> as the ancient
                  philosopher Empedocles called them—Sarah J Engen maps the invisible architecture
                  of the self. Fire, Water, Earth, and Air are not mere metaphors. They are the
                  fundamental forces that shape our psychology, our spirituality, our aesthetic
                  sensibility, and ultimately, our image.
                </p>
                <p>
                  <em>The Invisible Self</em> is the book that led to the creation of the
                  Elemental Color Typology and the platform you see today. It is the philosophical
                  and spiritual foundation upon which everything is built.
                </p>
              </div>
            </div>

            {/* Key Themes */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-gray-900 mb-6">Key Themes</h3>

              {[
                {
                  icon: Layers,
                  title: 'The Psychospiritual Approach to Image',
                  description:
                    'Moving beyond surface-level aesthetics to understand image as a reflection of the soul. Your outer appearance is not separate from your inner life—it is its visible expression.',
                  color: 'text-amber-600',
                  bg: 'bg-amber-50',
                },
                {
                  icon: Sun,
                  title: 'Color as Consciousness',
                  description:
                    'The epiphany at the heart of the book: color is not an aesthetic system for prescribing what to wear. It is our consciousness vibrating—a direct expression of our inner frequency and elemental nature.',
                  color: 'text-teal-600',
                  bg: 'bg-teal-50',
                },
                {
                  icon: Compass,
                  title: 'The Four Elements Framework',
                  description:
                    'Drawing from Empedocles, Hippocrates, Jung, and Eastern spiritual traditions, the book introduces Fire, Water, Earth, and Air as the four fundamental forces that compose human identity.',
                  color: 'text-violet-600',
                  bg: 'bg-violet-50',
                },
                {
                  icon: Feather,
                  title: 'The 36 Image Types',
                  description:
                    'The complete typological system developed over decades of client work—mapping the intersection of color, body architecture, and personality into a comprehensive framework for self-understanding.',
                  color: 'text-rose-600',
                  bg: 'bg-rose-50',
                },
                {
                  icon: Heart,
                  title: 'Self-Realization Through Image',
                  description:
                    'Image is not vanity—it is a path to wholeness. When we dress in alignment with our elemental nature, we are not performing identity. We are embodying it.',
                  color: 'text-indigo-600',
                  bg: 'bg-indigo-50',
                },
              ].map((theme) => (
                <div
                  key={theme.title}
                  className={`${theme.bg} rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <theme.icon className={`w-5 h-5 ${theme.color}`} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-gray-900 mb-1">{theme.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{theme.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Four Elements Deep Dive */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">The Framework</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              The Four Elements: The Roots of Identity
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The ancient Greeks called them the <em>Four Roots</em>—the irreducible forces from
              which all of nature is composed. In <em>The Invisible Self</em>, Sarah J Engen
              reinterprets these timeless archetypes as the foundation of a new understanding of
              personal image, color, and consciousness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {fourElements.map((element, index) => (
              <div
                key={element.name}
                className={`${element.bgColor} rounded-2xl border ${element.borderColor} overflow-hidden transition-all hover:shadow-lg cursor-pointer`}
                onClick={() => setExpandedElement(expandedElement === index ? null : index)}
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${element.gradient} flex items-center justify-center shadow-md flex-shrink-0`}
                    >
                      <element.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-serif text-gray-900">{element.name}</h3>
                        {expandedElement === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <p className={`text-sm font-medium ${element.color} mt-1`}>
                        {element.principle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{element.description}</p>

                  <div
                    className={`transition-all overflow-hidden ${
                      expandedElement === index ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      {element.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${element.bgColor} border ${element.borderColor}`}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting text */}
          <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-14">
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="w-12 h-12 text-gray-600 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed mb-8">
                "Color is not what you see. It is who you are. It is your consciousness vibrating—
                your deepest nature made visible through the language of light."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-serif text-sm">
                  SE
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Sarah J Engen</p>
                  <p className="text-gray-400 text-sm">from <em>The Invisible Self</em></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Preview */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Inside the Book</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Chapter Overview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A journey from the visible to the invisible—from the colors we wear to the
              consciousness we embody.
            </p>
          </div>

          <div className="space-y-4">
            {bookChapters.map((chapter, index) => (
              <div
                key={chapter.number}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
              >
                <button
                  onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
                  className="w-full flex items-center gap-6 p-6 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-lg text-gray-700">{chapter.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif text-gray-900">{chapter.title}</h3>
                  </div>
                  {expandedChapter === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`transition-all overflow-hidden ${
                    expandedChapter === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pl-24">
                    <p className="text-gray-600 leading-relaxed">{chapter.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-gradient-to-br from-red-400 to-amber-500 flex items-center justify-center shadow-2xl">
                  <span className="text-7xl font-serif text-white/90">SE</span>
                </div>
                <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">Fire Type</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm mb-6">
                <Feather className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">The Author</span>
              </div>

              <h2 className="text-4xl font-serif text-gray-900 mb-2">Sarah J Engen</h2>
              <p className="text-lg text-gray-500 mb-6">
                Founder and Chief Elemental Colorist and Image Profiler
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sarah J Engen is the pioneer of Elemental Color Typology and the '36 Image Types'
                  system, with over 28 years of experience in color analysis and archetypal
                  psychology.
                </p>
                <p>
                  She developed the Elemental Color Identity framework after working with hundreds
                  of clients as a colorist and image adviser across Europe and the U.S. Her journey
                  began in 1998 with House of Color in London, and through decades of deep
                  exploration—spanning color theory, Jungian psychology, ancient philosophy, and
                  spiritual practice—she arrived at the insight that would change everything:
                </p>
                <p className="italic text-gray-800 font-medium">
                  Color is not an aesthetic system. It is consciousness vibrating.
                </p>
                <p>
                  <em>The Invisible Self</em> is the book that captures this journey—from
                  traditional color analysis through psychological profiling to the psychospiritual
                  framework that now underpins the Elemental Color Identity system.
                </p>
              </div>

              <button
                onClick={() => onNavigate?.('about')}
                className="mt-6 inline-flex items-center gap-2 text-amber-700 font-medium hover:text-amber-800 transition-colors"
              >
                Learn more about our team
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Psychospiritual Approach */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 rounded-full mb-6">
              <Sun className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">The Approach</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              The Psychospiritual Approach to Image
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Traditional image consulting asks: <em>"What colors flatter you?"</em> The
              psychospiritual approach asks a deeper question: <em>"What colors are you?"</em>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Traditional */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Traditional Approach</h3>
              <p className="text-sm text-gray-500 mb-4">The Outer Self</p>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  Focuses on physical attributes (skin, hair, eyes)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  Prescriptive color palettes based on undertone
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  Aesthetic improvement as the goal
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  Seasonal or tonal classification systems
                </li>
              </ul>
            </div>

            {/* Psychological */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Psychological Approach</h3>
              <p className="text-sm text-blue-600 mb-4">The Inner Self</p>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  Integrates personality and archetype
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  Color as expression of psychological type
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  Self-understanding as the goal
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  Image archetypes and body architecture
                </li>
              </ul>
            </div>

            {/* Psychospiritual */}
            <div className="bg-gradient-to-br from-amber-50 via-violet-50 to-teal-50 rounded-2xl p-8 border border-violet-200 ring-2 ring-violet-200 ring-offset-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-teal-400 to-violet-400 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Psychospiritual Approach</h3>
              <p className="text-sm text-violet-600 mb-4">The Invisible Self</p>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  Color as consciousness vibrating
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  Four Elements as forces of identity
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  Self-realization as the goal
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  Holistic integration of body, psyche, and spirit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup Form */}
      <section id="waitlist-form" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-teal-400 to-violet-400 flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-serif text-white mb-4">
              Join the Waitlist
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
              Be among the first to receive <em>The Invisible Self</em> when it's published.
              Waitlist members will receive exclusive early access, chapter previews, and special
              pricing.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/10">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-3">You're on the list!</h3>
              <p className="text-gray-300 mb-8">
                Thank you for your interest in <em>The Invisible Self</em>. We'll notify you as
                soon as the book is available, along with exclusive previews and early access
                opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onStartQuiz}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Discover Your Element
                </button>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Learn About Us
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleWaitlistSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10"
            >
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-gray-500">(optional)</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      placeholder="Your name"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Elemental Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Elemental Type <span className="text-gray-500">(if known)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'fire', label: 'Fire', icon: Flame, color: 'from-red-500 to-amber-500' },
                      { id: 'water', label: 'Water', icon: Droplets, color: 'from-blue-500 to-cyan-500' },
                      { id: 'earth', label: 'Earth', icon: Mountain, color: 'from-amber-500 to-green-600' },
                      { id: 'air', label: 'Air', icon: Wind, color: 'from-violet-500 to-indigo-500' },
                    ].map((el) => (
                      <button
                        key={el.id}
                        type="button"
                        onClick={() => setWaitlistElement(waitlistElement === el.id ? '' : el.id)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                          waitlistElement === el.id
                            ? `bg-gradient-to-br ${el.color} border-transparent text-white shadow-lg`
                            : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <el.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{el.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Don't know your type?{' '}
                    <button
                      type="button"
                      onClick={onStartQuiz}
                      className="text-amber-400 hover:text-amber-300 underline"
                    >
                      Take the quiz
                    </button>
                  </p>
                </div>

                {/* Interest Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What interests you most? <span className="text-gray-500">(optional)</span>
                  </label>
                  <textarea
                    value={waitlistReason}
                    onChange={(e) => setWaitlistReason(e.target.value)}
                    placeholder="Tell us what drew you to The Invisible Self..."
                    rows={3}
                    className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !waitlistEmail}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-teal-500 to-violet-500 text-white rounded-xl font-medium hover:from-amber-600 hover:via-teal-600 hover:to-violet-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Join the Waitlist
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </form>
          )}

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: Star,
                title: 'Early Access',
                description: 'Be the first to read chapters before publication',
              },
              {
                icon: BookOpen,
                title: 'Special Pricing',
                description: 'Exclusive pre-order pricing for waitlist members',
              },
              {
                icon: Sparkles,
                title: 'Bonus Content',
                description: 'Receive exclusive elemental exercises and guides',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-white font-medium mb-1">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-amber-50 via-white to-violet-50 rounded-3xl p-12 md:p-16 border border-gray-200">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
                Discover Your Element Now
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                While you wait for the book, explore the Elemental Color Identity system.
                Take the quiz to discover your element and begin your journey of self-realization
                through color.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onStartQuiz}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Take the Quiz
                </button>
                <button
                  onClick={() => onNavigate?.('types')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors text-lg"
                >
                  Explore the Elements
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheInvisibleSelfBook;
