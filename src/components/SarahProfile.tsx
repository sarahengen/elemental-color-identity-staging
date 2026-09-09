import React from 'react';
import { Sparkles, ArrowRight, Award, ExternalLink } from 'lucide-react';
const SARAH_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781813929564_ee1d3304.jpeg';
const FEATURED_IN: { name: string; href?: string }[] = [
  { name: 'Sunday Times Style Magazine' },
  { name: 'Psychology Today', href: 'https://www.psychologytoday.com/us/articles/200611/the-wardrobe-shrink' },
  { name: 'Psychologies' },
  { name: 'The Times' },
  { name: 'AJC' },
  { name: 'Elle' },
  { name: 'WSJ' },
  { name: 'Life & Style' },
];

const COLLABORATED_WITH: { name: string; detail?: string }[] = [
  { name: 'Selfridges & Co' },
  { name: "L'Oreal Paris" },
  { name: 'Marks & Spencers' },
  { name: 'Charles Worthington' },
  { name: 'Timotei' },
  { name: 'Pearl Drops' },
  { name: 'Anne French' },
];


const pillClassName =
  'inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-sm font-medium text-gray-700 shadow-sm';
const linkPillClassName =
  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-sm font-medium text-violet-700 underline underline-offset-2 decoration-violet-400 shadow-sm hover:bg-violet-100 hover:text-violet-900 hover:border-violet-300 transition-colors';
interface SarahProfileProps {
  onStartQuiz?: () => void;
}
const SarahProfile: React.FC<SarahProfileProps> = ({
  onStartQuiz
}) => {
  return <section id="about-sarah" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-amber-100/80 bg-gradient-to-br from-amber-50 via-rose-50/50 to-violet-50 shadow-sm">
          {/* Decorative accent orbs */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-violet-200/30 blur-3xl" aria-hidden="true" />

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0 items-center">
            {/* Portrait */}
            <div className="md:col-span-2 flex justify-center p-8 md:p-10">
              <img src={SARAH_IMAGE} alt="Sarah J Engen, Image &amp; Color consultant" className="w-52 md:w-60 aspect-[2/3] object-cover object-center rounded-2xl border-4 border-white shadow-xl" />


            </div>

            {/* Bio */}
            <div className="md:col-span-3 p-8 md:p-12 md:pl-0">

              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.2em]">
                  Meet the founder
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-1">
                Sarah J Engen
              </h2>
              <p className="text-gray-500 italic font-serif mb-1">
                The &ldquo;Wardrobe Shrink&rdquo;
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-[0.15em] mb-6">
                25 years in color &amp; image consulting
              </p>


              <p className="text-gray-700 text-lg leading-relaxed mb-6">Sarah is the creator of the <span className="font-semibold text-amber-700">36 Image Types</span> — a typology of the feminine psyche used by hundreds of women across Europe and the U.S. to deepen their understanding of Self.</p>



              {/* Featured in */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-violet-500" />
                  <span className="text-xs font-semibold text-violet-700 uppercase tracking-[0.18em]">
                    Featured in
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_IN.map(({ name, href }) =>
                    href ? (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkPillClassName}
                      >
                        {name}
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    ) : (
                      <span key={name} className={pillClassName}>
                        {name}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Collaborated with */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-semibold text-rose-700 uppercase tracking-[0.18em]">
                    Collaborated with
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {COLLABORATED_WITH.map(({ name, detail }) => <span key={name} className={pillClassName}>
                      {name}{detail ? <span className="ml-1.5 font-normal text-gray-500">— {detail}</span> : null}
                    </span>)}
                </div>

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  Commissioned by L&rsquo;Or&eacute;al Paris to create a complete in-store color experience for the Couleur Experte launch &mdash; a customer questionnaire to identify undertone and guide product selection, in-store color typing displays, and a staff training program in color analysis for product launch across the U.K. The brief: help every customer find their correct color match with confidence.
                </p>


              </div>


              {onStartQuiz && <button onClick={onStartQuiz} className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg">
                  Discover Your Colors
                  <ArrowRight className="w-4 h-4" />
                </button>}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default SarahProfile;