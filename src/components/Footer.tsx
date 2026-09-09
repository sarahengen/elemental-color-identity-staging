import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { isEntryLaunch, isFullLaunch } from '@/lib/launchConfig';

interface FooterProps {
  onSelectType?: (elementId: string) => void;
  onNavigate?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onSelectType, onNavigate }) => {
  const entryLaunch = isEntryLaunch();
  const fullLaunch = isFullLaunch();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          className={`grid gap-8 lg:gap-12 ${
            entryLaunch
              ? 'grid-cols-2 md:grid-cols-4'
              : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
          }`}
        >
          <div
            className={
              entryLaunch
                ? 'col-span-2 md:col-span-2'
                : 'col-span-2 md:col-span-4 lg:col-span-1'
            }
          >
            <div className="mb-4">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1773158222336_f5370039.png"
                alt="Elemental Color Identity"
                className="h-28 w-auto object-contain"
              />
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Discover your Elemental Color Identity and align with your true nature.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ElementalColorIdentity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/elementalcoloridentity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@elementalcoloridentity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
                </svg>
              </a>
            </div>
          </div>

          {entryLaunch ? (
            <>
              <div>
                <h4 className="font-semibold mb-4">Explore</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => onNavigate?.('home')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Free Quiz
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('gift-quiz')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Gift the Free Quiz
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('types')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Elemental Types
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('color-tools')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Color Tools
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('community')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Community
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => onNavigate?.('about')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('press')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Press
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('contact')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold mb-4">Discover</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => onNavigate?.('home')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Free Quiz
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('gift-quiz')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Gift the Free Quiz
                    </button>
                  </li>
                  {!entryLaunch && (
                    <>
                      <li>
                        <button
                          onClick={() => onSelectType?.('fire')}
                          className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                        >
                          Fire Type
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => onSelectType?.('water')}
                          className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                        >
                          Water Type
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => onSelectType?.('earth')}
                          className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                        >
                          Earth Type
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => onSelectType?.('air')}
                          className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                        >
                          Air Type
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {fullLaunch && (
                <div>
                  <h4 className="font-semibold mb-4">Shop</h4>
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={() => onNavigate?.('pro-guides')}
                        className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                      >
                        Make-up
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onNavigate?.('classes')}
                        className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                      >
                        Color Classes
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onNavigate?.('consultations')}
                        className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                      >
                        Consults
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onNavigate?.('book')}
                        className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                      >
                        The Invisible Self
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => onNavigate?.('color-tools')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Color Tools
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('community')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Community
                    </button>
                  </li>
                  {fullLaunch && (
                    <>
                      <li>
                        <button
                          onClick={() => onNavigate?.('blog')}
                          className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                        >
                          Blog
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => onNavigate?.('membership')}
                          className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                        >
                          FAQ
                        </button>
                      </li>
                    </>
                  )}
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => onNavigate?.('about')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      About Us
                    </button>
                  </li>
                  {fullLaunch && (
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Careers
                      </a>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => onNavigate?.('press')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Press
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate?.('contact')}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2026 Elemental Color Identity. All rights reserved.</p>
            <div className="flex gap-6">
              <button
                onClick={() => onNavigate?.('privacy')}
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate?.('terms')}
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
