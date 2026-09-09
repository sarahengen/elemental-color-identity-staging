import React, { useState } from 'react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
} from '@/lib/guideElementVisualTheme';
import { Film, Flame, Droplets, Wind, Mountain, ChevronDown, ChevronUp, Star, Play, Clock, Award, X, ExternalLink } from 'lucide-react';

interface FilmRecommendation {
  id: string;
  combination: string;
  name: string;
  filmTitle: string;
  year: string;
  director: string;
  whyItResonates: string;
  trailerUrl: string;
  youtubeId: string;
}

interface CinematicElement {
  id: string;
  name: string;
  theme: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  films: FilmRecommendation[];
}

export const cinematicData: CinematicElement[] = [
  {
    id: 'fire',
    name: 'Fire',
    theme: 'Films of Will, Mastery & Transformation',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    films: [
      {
        id: 'fire-fire',
        combination: 'Fire + Fire',
        name: 'The Electric Arc',
        filmTitle: 'Whiplash',
        year: '2014',
        director: 'Damien Chazelle',
        whyItResonates: 'The ultimate film about uncompromising pursuit of perfection. The brutal mentor-student dynamic, the razor-sharp focus on craft, and the climactic solo that is a pure, explosive act of will. It validates their belief that greatness demands ruthless clarity and personal sacrifice.',
        trailerUrl: 'https://www.youtube.com/watch?v=7d_jQycdQGo',
        youtubeId: '7d_jQycdQGo'
      },
      {
        id: 'fire-water',
        combination: 'Fire + Water',
        name: 'The Blue Flame',
        filmTitle: 'Arrival',
        year: '2016',
        director: 'Denis Villeneuve',
        whyItResonates: 'A film about cool intellect meeting profound emotional depth. A linguist uses logic and patience to solve an alien puzzle, which ultimately rewires her perception of time, love, and loss. It\'s a cerebral, deeply felt film about containment, choice, and the quiet transformation of the soul.',
        trailerUrl: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g',
        youtubeId: 'tFMo3UJ4B4g'
      },
      {
        id: 'fire-earth',
        combination: 'Fire + Earth',
        name: 'The Forged Iron',
        filmTitle: 'The Lord of the Rings: The Two Towers',
        year: '2002',
        director: 'Peter Jackson',
        whyItResonates: 'Specifically for the Siege of Helm\'s Deep. A film about endurance, protecting what you love, and finding strength in the darkest hour. Aragorn, Theoden, and the resilience of the fortress embody their spirit. It\'s about holding the line, with dirt and blood on your face.',
        trailerUrl: 'https://www.youtube.com/watch?v=LbfMDwc4azU',
        youtubeId: 'LbfMDwc4azU'
      },
      {
        id: 'fire-air',
        combination: 'Fire + Air',
        name: 'The Illuminating Spark',
        filmTitle: 'The Secret Life of Walter Mitty',
        year: '2013',
        director: 'Ben Stiller',
        whyItResonates: 'A film that is literally about a spark of courage igniting a life of adventure. It\'s visually stunning, optimistic, and celebrates leaping into the unknown to find joy, connection, and a more vibrant self. It\'s a love letter to the transformative power of "why not?"',
        trailerUrl: 'https://www.youtube.com/watch?v=QD6cy4PBQPI',
        youtubeId: 'QD6cy4PBQPI'
      }
    ]
  },
  {
    id: 'water',
    name: 'Water',
    theme: 'Films of Feeling, Memory & Connection',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    films: [
      {
        id: 'water-air',
        combination: 'Water + Air',
        name: 'The Misty Shore',
        filmTitle: 'Paterson',
        year: '2016',
        director: 'Jim Jarmusch',
        whyItResonates: 'A film that finds profound beauty in the gentle, quiet rhythms of everyday life. A bus driver writes poetry, noticing the soft, fleeting moments others miss. It\'s a masterclass in subtlety, empathy, and the sacredness of the ordinary—a perfectly soft-focused world.',
        trailerUrl: 'https://www.youtube.com/watch?v=m8pGJBgiiDU',
        youtubeId: 'm8pGJBgiiDU'
      },
      {
        id: 'water-water',
        combination: 'Water + Water',
        name: 'The Forest Lake',
        filmTitle: 'Eternal Sunshine of the Spotless Mind',
        year: '2004',
        director: 'Michel Gondry',
        whyItResonates: 'A film that dives headfirst into the deep, messy, painful, and beautiful depths of memory and love. It\'s a surreal, emotionally complex journey through the subconscious that argues for feeling everything, even the hurt, because it\'s what makes us real.',
        trailerUrl: 'https://www.youtube.com/watch?v=yE-f1alkq9I',
        youtubeId: 'yE-f1alkq9I'
      },
      {
        id: 'water-fire',
        combination: 'Water + Fire',
        name: 'The Sun-Dappled Pond',
        filmTitle: 'Coco',
        year: '2017',
        director: 'Pixar',
        whyItResonates: 'A film that is steeped in warm, golden nostalgia, family legacy, and the power of memory to bridge worlds. It\'s a vibrant, emotional celebration of ancestors, music, and the idea that we are truly gone only when forgotten. A feast for the sentimental heart.',
        trailerUrl: 'https://www.youtube.com/watch?v=xlnPHQ3TLX8',
        youtubeId: 'xlnPHQ3TLX8'
      },
      {
        id: 'water-earth',
        combination: 'Water + Earth',
        name: 'The Languid River',
        filmTitle: 'The Sound of Music',
        year: '1965',
        director: 'Robert Wise',
        whyItResonates: 'The quintessential film about nurturing through song, creating a loving home against a dark backdrop, and the gentle, steadfast power of care. Maria\'s journey is one of bringing life, music, and warmth to a rigid, cold household—a nurturing force that changes everything.',
        trailerUrl: 'https://www.youtube.com/watch?v=UY1eFCA8sQA',
        youtubeId: 'UY1eFCA8sQA'
      }
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    theme: 'Films of Substance, Craft & Legacy',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    films: [
      {
        id: 'earth-air',
        combination: 'Earth + Air',
        name: 'The Golden Harvest',
        filmTitle: 'Babette\'s Feast',
        year: '1987',
        director: 'Gabriel Axel',
        whyItResonates: 'A perfect film for Earth + Air. A French refugee (Babette) spends her entire fortune to prepare one transcendent, sensuous feast for an austere community. It\'s a supreme act of artistic and sensual generosity, where material ingredients are alchemized into spiritual communion. It celebrates taste, beauty, abundance, and the transformative power of shared pleasure.',
        trailerUrl: 'https://www.youtube.com/watch?v=A2JBvnLYqUk',
        youtubeId: 'A2JBvnLYqUk'
      },

      {
        id: 'earth-earth',
        combination: 'Earth + Earth',
        name: 'The Forest Floor',
        filmTitle: 'The Martian',
        year: '2015',
        director: 'Ridley Scott',
        whyItResonates: 'The ultimate "science the sh*t out of this" film. It\'s a triumphant ode to practical problem-solving, resilience, and working with what you have (in this case, potato fertilizer and duct tape). It celebrates dirt-under-the-fingernails ingenuity and the will to simply survive and grow.',
        trailerUrl: 'https://www.youtube.com/watch?v=ej3ioOneTy8',
        youtubeId: 'ej3ioOneTy8'
      },
      {
        id: 'earth-water',
        combination: 'Earth + Water',
        name: 'The Velvet Moss',
        filmTitle: 'Chocolat',
        year: '2000',
        director: 'Lasse Hallström',
        whyItResonates: 'A film about sensory comfort, gentle rebellion, and creating a haven of warmth and sweetness in a rigid, cold town. The protagonist uses chocolate (tactile, comforting, luxurious) to slowly thaw hearts and create community. It\'s a sensual, cozy fairy tale.',
        trailerUrl: 'https://www.youtube.com/watch?v=1MIAwq7Pj4E',
        youtubeId: '1MIAwq7Pj4E'
      },
      {
        id: 'earth-fire',
        combination: 'Earth + Fire',
        name: 'The Mountain Stone',
        filmTitle: '12 Angry Men',
        year: '1957',
        director: 'Sidney Lumet',
        whyItResonates: 'A film about one principled man standing against the tide. It\'s a masterclass in integrity, logic, and the moral courage to uphold justice in a pressurized room. It\'s all about the weight of a single "not guilty" vote and the unshakeable force of conviction.',
        trailerUrl: 'https://www.youtube.com/watch?v=TEN-2uTi2c0',
        youtubeId: 'TEN-2uTi2c0'
      }

    ]
  },
  {
    id: 'air',
    name: 'Air',
    theme: 'Films of Ideas, Freedom & Perspective',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    films: [
      {
        id: 'air-air',
        combination: 'Air + Air',
        name: 'The Clear Morning Sky',
        filmTitle: 'The Matrix',
        year: '1999',
        director: 'The Wachowskis',
        whyItResonates: 'A film about discovering the fundamental truth behind perceived reality. The central question—"red pill or blue pill?"—is the ultimate Air dilemma. It\'s a sleek, philosophical action film about awakening to objective truth and the freedom that comes from seeing clearly beyond illusion.',
        trailerUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
        youtubeId: 'vKQi3bBA1y8'
      },
      {
        id: 'air-fire',
        combination: 'Air + Fire',
        name: 'The Playful Breeze',
        filmTitle: 'Everything Everywhere All at Once',
        year: '2022',
        director: 'Daniels',
        whyItResonates: 'A film that is a chaotic, hilarious, and heartfelt explosion of connective ideas. Multiversal jumping, raccoon chefs, talking rocks—it\'s a maximalist collage that argues love and kindness are the only constants in infinite chaos. Pure synaptic fireworks.',
        trailerUrl: 'https://www.youtube.com/watch?v=wxN1T1qdQ0',
        youtubeId: 'wxN1T1qdQ0'
      },
      {
        id: 'air-earth',
        combination: 'Air + Earth',
        name: 'The Gilded Zephyr',
        filmTitle: 'The King\'s Speech',
        year: '2010',
        director: 'Tom Hooper',
        whyItResonates: 'A film about the power of articulate, persuasive speech to steady a nation. It\'s about overcoming a personal block to find one\'s authentic, commanding voice. It validates the idea that words, spoken with courage and warmth, are a form of leadership and healing.',
        trailerUrl: 'https://www.youtube.com/watch?v=pzI4D6dyp_o',
        youtubeId: 'pzI4D6dyp_o'
      },
      {
        id: 'air-water',
        combination: 'Air + Water',
        name: 'The First Whisper',
        filmTitle: 'Spirited Away',
        year: '2001',
        director: 'Hayao Miyazaki',
        whyItResonates: 'A film that is a dreamlike, intuitive journey into a hidden spirit world. It operates on feeling, myth, and subtle rules rather than hard logic. The protagonist, Chihiro, must navigate this delicate realm through quiet courage, empathy, and paying attention to whispers and hints.',
        trailerUrl: 'https://www.youtube.com/watch?v=ByXuk9QqQkk',
        youtubeId: 'ByXuk9QqQkk'
      }

    ]
  }
];

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  film: FilmRecommendation | null;
  gradientFrom: string;
  gradientTo: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, film, gradientFrom, gradientTo }) => {
  if (!isOpen || !film) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div 
          className="p-4 flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
          }}
        >
          <div className="flex items-center gap-3">
            <Play className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-xl font-bold text-white">{film.filmTitle}</h3>
              <p className="text-white/80 text-sm">{film.year} • Directed by {film.director}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0`}
            title={`${film.filmTitle} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Footer with film info */}
        <div className="p-4 bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span 
                className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${gradientFrom}30, ${gradientTo}30)`,
                  color: gradientTo
                }}
              >
                {film.combination}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300 text-sm">{film.name}</span>
            </div>
            <a
              href={film.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CinematicPreferencesProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const CinematicPreferences: React.FC<CinematicPreferencesProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [selectedFilm, setSelectedFilm] = useState<string | null>(userSubtype || null);
  const [trailerModal, setTrailerModal] = useState<{
    isOpen: boolean;
    film: FilmRecommendation | null;
    gradientFrom: string;
    gradientTo: string;
  }>({
    isOpen: false,
    film: null,
    gradientFrom: '',
    gradientTo: ''
  });

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const openTrailerModal = (film: FilmRecommendation, gradientFrom: string, gradientTo: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTrailerModal({
      isOpen: true,
      film,
      gradientFrom,
      gradientTo
    });
  };

  const closeTrailerModal = () => {
    setTrailerModal({
      isOpen: false,
      film: null,
      gradientFrom: '',
      gradientTo: ''
    });
  };

  const isUserElement = (elementId: string) => userElement === elementId;
  const isUserFilm = (filmId: string) => userSubtype === filmId;

  return (
    <div className="space-y-8">
      {/* Trailer Modal */}
      <TrailerModal
        isOpen={trailerModal.isOpen}
        onClose={closeTrailerModal}
        film={trailerModal.film}
        gradientFrom={trailerModal.gradientFrom}
        gradientTo={trailerModal.gradientTo}
      />

      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-amber-100 rounded-full mb-6">
            <Film className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">Workshop Feature</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Cinematic Preferences</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The ideal film for a subtype is one that resonates with their core energy, validates their worldview, 
            and provides the specific emotional or intellectual "nutrient" they crave.
          </p>
          <p className="text-gray-600 mt-4 italic">
            It's cinematic resonance therapy.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {cinematicData.map((element) => (
          <div
            key={element.id}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.id)
            )}`}
          >
            {/* Element Header */}
            <button
              onClick={() => toggleElement(element.id)}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                  }}
                >
                  {element.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-serif text-gray-900">{element.name}</h3>
                    {isUserElement(element.id) && (
                      <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                    {element.theme}
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.id) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Films Content */}
            {expandedElements.includes(element.id) && (
              <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.films.map((film) => (
                    <div
                      key={film.id}
                      className={`rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        isUserFilm(film.id)
                          ? 'ring-2 ring-amber-400 shadow-lg'
                          : selectedFilm === film.id
                          ? 'ring-2 ring-gray-300 shadow-md'
                          : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedFilm(selectedFilm === film.id ? null : film.id)}
                    >
                      {/* Film Poster Area */}
                      <div
                        className="h-32 relative group"
                        style={{
                          background: `linear-gradient(135deg, ${element.gradientFrom}90, ${element.gradientTo}90)`
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Play className="w-12 h-12 mx-auto mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="text-2xl font-bold tracking-wide">{film.filmTitle}</div>
                          </div>
                        </div>
                        {isUserFilm(film.id) && (
                          <div className="absolute top-3 right-3">
                            <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
                          </div>
                        )}
                        
                        {/* Watch Trailer Overlay Button */}
                        <button
                          onClick={(e) => openTrailerModal(film, element.gradientFrom, element.gradientTo, e)}
                          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 group/btn"
                        >
                          <div className="opacity-0 group-hover/btn:opacity-100 transform scale-90 group-hover/btn:scale-100 transition-all duration-300 flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                              <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                            </div>
                            <span className="text-white font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">
                              Watch Trailer
                            </span>
                          </div>
                        </button>
                      </div>

                      {/* Film Details */}
                      <div className="p-5 bg-white">
                        {/* Subtype Info */}
                        <div className="flex items-center gap-2 mb-3">
                          <span 
                            className="text-sm font-semibold px-2.5 py-1 rounded-md"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}15, ${element.gradientTo}15)`,
                              color: element.gradientFrom
                            }}
                          >
                            {film.combination}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600 font-medium">{film.name}</span>
                        </div>

                        {/* Film Meta */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{film.year}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            <span>{film.director}</span>
                          </div>
                        </div>

                        {/* Watch Trailer Button */}
                        <div className="flex gap-2 mb-4">
                          <button
                            onClick={(e) => openTrailerModal(film, element.gradientFrom, element.gradientTo, e)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                            }}
                          >
                            <Play className="w-4 h-4" fill="currentColor" />
                            <span>Watch Trailer</span>
                          </button>
                          <a
                            href={film.trailerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center px-3 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                            title="Open in YouTube"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        {/* Why It Resonates */}
                        <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100">
                          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Why It Resonates
                          </h5>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {film.whyItResonates}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 rounded-2xl border border-rose-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center flex-shrink-0">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Your Cinematic Soul Food</h4>
            <p className="text-gray-600 leading-relaxed">
              These film recommendations aren't just about entertainment—they're about finding stories that speak 
              directly to your elemental nature. When you watch a film that truly resonates, it validates your 
              worldview, nourishes your spirit, and reminds you that your way of seeing the world has been 
              captured beautifully on screen. Consider this your personalized prescription for cinematic therapy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicPreferences;
