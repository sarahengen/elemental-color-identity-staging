import React from 'react';

interface PressLogo {
  name: string;
  url: string;
  /** Optical tweak vs the shared strip height (1 = default). Keep small — strip is intentionally quiet. */
  heightScale?: number;
}

const PRESS_LOGOS: PressLogo[] = [
  { name: 'Life & Style Mag', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810078590_6b9feda2.png' },
  { name: 'The Wall Street Journal', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810079000_edce82ee.jpeg' },
  { name: 'Savannah Morning News', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810079218_699b46ce.png' },
  { name: 'The Atlanta Journal-Constitution', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810079460_f13c2b7a.png', heightScale: 1.15 },
  { name: 'Psychologies', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810079695_672ba355.png', heightScale: 1.1 },
  { name: 'Elle', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810079938_0ac2ab92.png', heightScale: 0.85 },
  { name: 'The Times', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781925125137_4ff85a49.png' },
  { name: 'Marie Claire', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810080377_d500a0c3.png' },
  { name: 'Time Out', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810080613_ec2e68cf.jpg', heightScale: 0.85 },
  { name: 'Psychology Today', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810080839_5698fb37.jpg' },
  { name: 'Heat', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810081079_e9f5f99a.png' },
  { name: 'The Sunday Times Style', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810589500_8f790b43.png' },
  { name: 'Quote', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810081286_cfc4670e.jpg' },
  { name: 'Financial Times', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810081526_06c96117.jpeg' },
  { name: 'NRC Handelsblad', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781810081736_877b589d.png' },
  { name: 'Selfridges & Co', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781847788394_10570485.jpg' },
  { name: 'Marks & Spencer', url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781925095968_07ac78e4.png' },
  { name: "Pond's", url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781847815246_7815fa7c.jpeg' },
  { name: "L'Oréal Paris", url: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1781923485272_e0ad1665.png' },
];

const LogoItem: React.FC<{ logo: PressLogo }> = ({ logo }) => {
  const scale = logo.heightScale ?? 1;

  return (
    <div className="flex items-center justify-center shrink-0 h-9 md:h-11">
      <img
        src={logo.url}
        alt={logo.name}
        title={logo.name}
        loading="lazy"
        className="press-logo-img w-auto object-contain opacity-55 hover:opacity-80 transition-opacity"
        style={{
          ['--logo-scale' as string]: scale,
          filter: 'grayscale(100%)',
          WebkitFilter: 'grayscale(100%)',
        }}
      />
    </div>
  );
};

const PressLogosStrip: React.FC = () => {
  return (
    <section className="py-2.5 px-6 bg-white border-b border-gray-100">
      <style>{`
        .press-logo-img {
          height: calc(28px * var(--logo-scale, 1));
        }
        @media (min-width: 768px) {
          .press-logo-img {
            height: calc(36px * var(--logo-scale, 1));
          }
        }
        @keyframes press-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .press-marquee-track {
          display: flex;
          align-items: center;
          gap: 2.75rem;
          width: max-content;
          animation: press-marquee 55s linear infinite;
        }
        .press-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (min-width: 768px) {
          .press-marquee-track { gap: 3.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .press-marquee-track { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <div className="press-marquee-track">
            {PRESS_LOGOS.map((logo) => (
              <LogoItem key={`a-${logo.name}`} logo={logo} />
            ))}
            {PRESS_LOGOS.map((logo) => (
              <LogoItem key={`b-${logo.name}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressLogosStrip;
