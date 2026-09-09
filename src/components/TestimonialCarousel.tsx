import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Testimonial {
  id: string;
  quote: string;
  author: string | null;
  source: string | null;
  is_featured: boolean;
  sort_order: number;
}

// Fallback testimonials shown if the table is empty or unreachable
const FALLBACK: Testimonial[] = [
  { id: 'f1', quote: 'People now look her in the eye.', author: 'A client testimony', source: 'Psychology Today', is_featured: true, sort_order: 1 },
  { id: 'f2', quote: 'I finally understand why certain colors make me feel powerful and others make me disappear. It changed how I show up everywhere.', author: 'Maya R.', source: 'Verified Member', is_featured: false, sort_order: 2 },
  { id: 'f3', quote: 'My whole wardrobe used to feel like a costume. Now every outfit feels like the real me.', author: 'Daniela K.', source: 'Verified Member', is_featured: false, sort_order: 3 },
];

interface Props {
  onStartQuiz: () => void;
}

const TestimonialCarousel: React.FC<Props> = ({ onStartQuiz }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('sort_order', { ascending: true });
        if (error || !data || data.length === 0) {
          setTestimonials(FALLBACK);
        } else {
          setTestimonials(data as Testimonial[]);
        }
      } catch {
        setTestimonials(FALLBACK);
      }
    };
    fetchTestimonials();
  }, []);

  const count = testimonials.length;
  const next = useCallback(() => setIndex(i => (count ? (i + 1) % count : 0)), [count]);
  const prev = () => setIndex(i => (count ? (i - 1 + count) % count : 0));

  // Auto-rotate every 6s unless paused
  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, count, next]);

  if (count === 0) return null;

  const active = testimonials[Math.min(index, count - 1)];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-3xl mx-auto">
        <div
          className="relative rounded-3xl bg-white border border-rose-100/80 shadow-sm p-8 md:p-14 text-center overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-rose-200/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-[0.2em]">
                {active.source ? `As featured in ${active.source}` : 'Client stories'}
              </span>
            </div>

            <span className="block font-serif text-7xl md:text-8xl leading-none text-rose-200 select-none" aria-hidden="true">&ldquo;</span>

            <blockquote
              key={active.id}
              className="-mt-6 md:-mt-8 font-serif text-gray-900 text-2xl md:text-3xl lg:text-4xl leading-snug italic transition-opacity duration-500"
            >
              {active.quote}
            </blockquote>

            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="w-10 h-px bg-rose-200" />
              <p className="text-sm md:text-base font-medium text-gray-500 not-italic tracking-wide">
                {[active.author, active.source].filter(Boolean).join(' \u00b7 ') || 'Verified Member'}
              </p>
              <div className="w-10 h-px bg-rose-200" />
            </div>

            {/* Navigation controls */}
            {count > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-rose-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-rose-400' : 'w-2 bg-rose-200 hover:bg-rose-300'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full border border-rose-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
