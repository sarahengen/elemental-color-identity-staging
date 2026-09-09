import React from 'react';
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import type { ElementalType } from '@/data/elementalTypes';

import StackedElementalCards from './StackedElementalCards';


// ColorClassBooking (Color Analysis Classes) hidden per client request — code preserved for later use.
// import ColorClassBooking from './ColorClassBooking';
// ConsultationBooking (legacy Stripe calendar flow) replaced by ConsultationOfferings — code preserved.
// import ConsultationBooking from './ConsultationBooking';
import ConsultationOfferings from './ConsultationOfferings';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export interface ElementalColorWorkshopPageContentProps {
  onSelectType: (type: ElementalType) => void;
  onStartQuiz: () => void;
  user: User | null;
  onAuthRequired: () => void;
  /** True when the viewer already has Workshop (or Expression) access. */
  hasWorkshopAccess?: boolean;
  /** Opens the in-app Stripe checkout (or routes through auth first). */
  onGetWorkshopAccess?: () => void;
  /** Sends a buyer into the unlocked experience. */
  onExploreWorkshop?: () => void;
}

const ElementalColorWorkshopPageContent: React.FC<ElementalColorWorkshopPageContentProps> = ({
  onSelectType,
  onStartQuiz,
  user,
  onAuthRequired,
  hasWorkshopAccess = false,
  onGetWorkshopAccess,
  onExploreWorkshop,
}) => {

  return (

    <main className="bg-white">
      {/* ── Workshop Intro ── */}

      <section className="pt-20 pb-6 px-6 bg-white text-gray-900">

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-sm font-medium text-violet-600 uppercase tracking-[0.2em] mb-4">
            Elemental Color Workshop
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center leading-tight">
            Learned your type?
            <br />
            Now see the whole picture.
          </h1>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700 font-light">
            <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-amber-50 via-rose-50/60 to-violet-50 border border-amber-100/80 shadow-sm">
              <p className="font-serif text-xl md:text-2xl text-gray-900 text-center">
                The Profile gives you your element. The workshop gives you the whole map.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── You, in context & Explore all 16 subtypes ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-lg leading-relaxed text-gray-700 font-light">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 bg-violet-50 rounded-full border border-violet-100 mb-5">
                <span className="text-sm font-semibold text-violet-700">You, in context</span>
              </div>
              <p className="text-xl leading-relaxed">
                See your place in the bigger picture. Understand why some leave you energized,
                others feel a challenge. Know your strengths, your role, your quirks. Go beyond
                the projections and expectations. Reach the part of you beneath the story.
              </p>
            </div>
            <div className="rounded-3xl p-8 md:p-10 bg-white border border-violet-100 shadow-sm text-center">
              <p className="font-serif text-xl md:text-2xl text-gray-900">
                Explore all 16 Elemental subtypes &mdash; the entire Elemental Color Identity system.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── Seeing yourself in your true light ── */}

      <section className="pt-2 pb-16 px-6">

        <div className="max-w-4xl mx-auto">
          <blockquote className="border-l-2 border-violet-300 pl-5 font-serif italic text-violet-700 text-xl leading-snug mb-10">
            &ldquo;Color is not a property of matter. It is a property of consciousness.&rdquo;
            <footer className="mt-2 text-sm not-italic font-medium text-gray-500">
              &mdash; P.D. Ouspensky, Philosopher
            </footer>
          </blockquote>
          <div className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-amber-50 via-rose-50/60 to-violet-50 border border-amber-100/80 shadow-sm overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-violet-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Beneath everything the world has reflected back at you, you sense a real self.
                Older than personality. More elemental. Connected to something deeper.
              </p>




              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-2">
                {[
                  { name: 'The Gnostics', label: 'THE SPARK' },
                  { name: 'Empedocles', label: 'THE ROOT' },
                  { name: 'Aristotle', label: 'THE ELEMENT' },
                  { name: 'Gurdjieff', label: 'ESSENCE' },
                  { name: 'Carl Jung', label: 'TRUE SELF' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl bg-white/70 border border-amber-100/80 p-4 text-center shadow-sm"
                  >
                    <p className="font-serif text-base text-gray-900">{item.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-600">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ── Animated subtype graphic (own section) ── */}
      <section className="pt-8 pb-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-violet-50 rounded-full border border-violet-100 mb-5">
            <span className="text-sm font-semibold text-violet-700">A Preview</span>
          </div>
          <StackedElementalCards />
        </div>
      </section>


      {/* ── What the Workshop Is ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-50/60 via-white to-amber-50/60 text-gray-900">
        <div className="max-w-4xl mx-auto">




          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 text-center">
            The Elemental Color Workshop
          </h2>
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-4 py-1.5 bg-violet-50 rounded-full border border-violet-100">
              <span className="text-sm font-semibold text-violet-700">A Guided Group Experience</span>
            </div>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700 font-light">
            <p>
              Discover more about your elemental type and how you naturally move through the world.
              Begin to make sense of the forces around you. Then go further with interactive tools
              that show how all 16 types relate, connect, and collide in relationships, teams, and
              everyday life.
            </p>
          </div>



          <div className="mt-14">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-10 text-center">
              Interactive tools and energy guides
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: '16 Elemental Types',
                  desc: 'Explore the four elements and their four subtypes per element. Recognize the people in your life and understand more about your nature.',
                },
                {
                  title: '35 Workshop Guides',
                  desc: 'Beyond color palettes, learn how the subtypes express themselves: Career, Philosophy, Growth, Living, Arts, Relationships.',
                },
                {
                  title: 'Interactive Tools',
                  desc: 'Play with the dominant type Quiz, Subtype Comparison tool, Relationship Compatibility, Celebrity Twin, Color Wheel, Color Compass, Team Compatibility, Team friction points, Conflict Style Quiz, Conflict Simulator, Biorhythm Tracker and more.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-100/70 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    <h3 className="text-lg font-serif font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tool example screenshots ── */}
          <div className="mt-14">
            <p className="text-center text-sm font-medium text-violet-600 uppercase tracking-[0.2em] mb-8">
              A glimpse of the interactive tools
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  src: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1782399371016_a8e78f1e.png',
                  alt: 'Conflict Simulator comparing two elemental subtypes',
                },
                {
                  src: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1782399380954_7e466370.png',
                  alt: 'Friendship Compatibility Calculator',
                },
                {
                  src: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1782399396973_027868b3.png',
                  alt: 'The Elemental Quadrants color compass',
                },
                {
                  src: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1782399440999_770b6e08.png',
                  alt: 'Elemental Color Wheel with customizable themes',
                },
                {
                  src: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1784817770304_557c9f29.webp',
                  alt: 'Cross-Element communication templates tool',
                },
                {
                  src: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1784817770342_068f092c.webp',
                  alt: 'Conflict Style Quiz with scenario-based questions',
                },
              ].map((img, idx) => (
                <figure
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-violet-100/70 bg-white shadow-sm"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>





      {/* ── Color Analysis Classes — hidden per client request. Code preserved for later use. ──
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ColorClassBooking user={user} onAuthRequired={onAuthRequired} />
        </div>
      </section>
      */}

      {/* ── The Experience ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8">
            The Experience
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700 font-light">
            <p>Small, intimate. Limited spaces.</p>
            <p>Work with the founder directly.</p>
            <p>Rooted in color and nature.</p>
            <p>A shared experience &mdash; attend with a friend.</p>
          </div>
        </div>
      </section>


      {/* ── Frequently Asked Questions ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-50 rounded-full border border-violet-100 mb-6">
              <HelpCircle className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-semibold text-violet-700">Good to know</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: 'What format is the workshop?',
                a: 'The Elemental Color Workshop is a live, guided group experience held over Zoom. Sarah leads each session in real time — exploring the four elements, your subtype, your color palette, and how the types relate in relationships, teams, and everyday life. You join from home; no travel required. After the session, you continue exploring on the platform at your own pace.',
              },
              {
                q: 'How long is a session?',
                a: 'Live sessions typically run at about two hours, depending on group size and how deep the conversation goes. You will leave with a clear read on your elemental type and practical language for what you have always sensed but could not quite name.',
              },
              {
                q: "What's included?",
                a: 'Your workshop registration includes the live Zoom session with Sarah, plus continued use of the Elemental Color Identity platform — all 16 subtype profiles, 35 expression guides, the full gallery, and interactive tools such as the Subtype Comparison, Relationship & Friendship Compatibility, Color Wheel, Conflict Style Quiz, and more.',
              },
              {
                q: 'How do I register?',
                a: 'Book the workshop. Choose a date from the schedule. You will receive a confirmation email with your Zoom link and everything you need before the session. Spaces are limited so each person receives individual attention.',
              },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left font-serif text-lg text-gray-900">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-gray-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Workshop Purchase CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-50 via-white to-violet-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-amber-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-700">The Workshop</span>
            </div>
          </div>

          {hasWorkshopAccess ? (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-full font-semibold tracking-wide hover:bg-gray-800 transition-colors shadow-lg"
                onClick={() => onExploreWorkshop?.()}
              >
                Explore the Workshop
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-emerald-600 mt-4">You&rsquo;re all set &middot; Enjoy the full Workshop!</p>
            </>
          ) : (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-full font-semibold tracking-wide hover:bg-gray-800 transition-colors shadow-lg"
                onClick={() => (onGetWorkshopAccess ? onGetWorkshopAccess() : onAuthRequired())}
              >
                Explore the Whole Map
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-amber-700 mt-4">
                2 upcoming workshops have availability
              </p>
              <p className="text-sm text-gray-400 mt-1">One-time payment &middot; Yours for life</p>
            </>
          )}
        </div>
      </section>

      {/* ── Color Consults (one-to-one upsell) ── */}
      <section id="color-consults" className="pt-20 pb-10 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-sm font-medium text-violet-600 uppercase tracking-[0.2em] mb-4">
            Private Consultations
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 text-center">
            Sometimes you need a personal guide, not just a map.
          </h2>
          <div className="text-gray-700 text-lg leading-relaxed">
            <p>
              A one-to-one consultation goes deeper than the quiz, guide, or group experience can
              reach. Not just your elemental type, but the particular expression of that type in
              your actual life — your relationships, your history, the dynamics that have always
              puzzled you, and the questions only you are carrying.
            </p>
          </div>
        </div>
      </section>

      {/* ── Leadbeater quote & the oldest language ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <blockquote className="border-l-2 border-violet-300 pl-5 font-serif italic text-violet-700 text-xl leading-snug">
              &ldquo;The colors are not decorative; they are the visible signature of the inner
              life.&rdquo;
              <footer className="mt-2 text-sm not-italic font-medium text-gray-500">
                &mdash; Charles W. Leadbeater, Theosophist
              </footer>
            </blockquote>

            <p className="font-serif text-2xl md:text-3xl text-gray-900">
              Color is the oldest language on earth.
            </p>
            <p>
              Before words. Before we invented names for what it felt to stand in firelight or
              beneath open sky &mdash; color spoke. You&rsquo;re looking for language that finally
              fits. To recognize yourself. To remember who you are.
            </p>
          </div>
        </div>
      </section>

      {/* ── What a consultation offers ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-6">
            A Deeper Experience
          </h3>
          <div className="text-gray-700 text-lg leading-relaxed">
            <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-amber-50 via-rose-50/60 to-violet-50 border border-amber-100/80 shadow-sm space-y-6">
              <p>
                <strong className="font-semibold text-gray-900">Depth over breadth</strong> The
                consultation spends more time on you specifically &mdash; the particular expression
                of your type in your life, your relationships, your history.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">
                  Your specific questions, given real time
                </strong>{' '}
                A consultation can stop wherever you need it to, for as long as you need it to
                &mdash; on the things that matter most to you personally.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">
                  Your history with color and image
                </strong>{' '}
                The stories you&rsquo;ve been told, the styles you&rsquo;ve tried, the versions of
                yourself you&rsquo;ve inhabited &mdash; explored in depth and in relation to who you
                are now.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">
                  Nuance and complexity navigated properly
                </strong>{' '}
                Some are clearly one element. Others sit between two, or express their type in ways
                that need careful, unhurried exploration. A consultation has the time and space for
                that.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">
                  Your wardrobe in the conversation
                </strong>{' '}
                Your actual clothing &mdash; a few key pieces &mdash; part of the conversation, seen
                through the lens of your elemental nature.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">Complete privacy</strong> Everything
                that surfaces stays entirely private &mdash; allowing a level of honesty and the
                freedom to see deeper into your reflection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Seed, not the Flower ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-6">
            The focus is the Seed, not the Flower.
          </h3>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              The Seed - your elemental nature.
              <br />
              The Flower - the persona, the presented/adapted Self.
            </p>
            <p>
              Most focus on the external - the flower, then feel a disparity between who they know
              themselves to be and how they appear or present themselves to the world.
            </p>
            <p>
              Color helps bridge the gap. As a living part of nature, you carry your own color
              signature &mdash; a specific energy and resonance. Not by choice. By nature. Not the
              color that flatters you. The color that is you.
            </p>
            <p className="font-serif text-2xl md:text-3xl text-gray-900">
              Discover yours &mdash; one to one.
            </p>
          </div>
        </div>
      </section>



      {/* ── Book a consultation ── */}
      <section className="pt-10 pb-20 px-6 bg-white">
        <div id="book-consultation" className="max-w-7xl mx-auto scroll-mt-24">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-1.5 bg-violet-50 rounded-full border border-violet-100">
              <span className="text-sm font-semibold text-violet-700">Elemental Color Consultations</span>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-gray-700 font-light mb-10 text-center max-w-3xl mx-auto">
            The workshop opens the whole map. A Consultation takes it one step further.
          </p>

          <ConsultationOfferings user={user} />
        </div>
      </section>


    </main>
  );
};

export default ElementalColorWorkshopPageContent;
