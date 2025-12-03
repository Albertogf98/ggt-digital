// src/pages/About.tsx
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../themes/ThemeProvider';

type Team = {
  photo: string;
  name: string;
  job: string;
  description: string;
};

export default function About() {
  const { t } = useTranslation();
  const { builder } = useTheme();

  // Memorizar traducciones
  const teamMembers = useMemo(() => t('about.team.members', { returnObjects: true }) as Team[], [t]);

  return (
    <main className="overflow-x-hidden" id="about" style={{ backgroundColor: builder.cardBg, color: builder.textColor }}>
      {/* Hero */}
      <section className="relative h-screen md:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src="videos/about-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold fade-in mb-4" style={{ color: builder.heading }}>
            {t('about.title')}
          </h1>
          <p className="text-lg md:text-xl slide-up" style={{ color: builder.textColor }}>
            {t('about.story.subtitle')}
          </p>
        </div>
      </section>

      {/* Historia / Misión */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: builder.heading }}>
              {t('about.story.title')}
            </h2>
            <p style={{ color: builder.textColor, marginBottom: '1rem' }}>{t('about.story.description')}</p>
            <p style={{ color: builder.textColor }}>{t('about.story.subtitle')}</p>
          </div>
          <div>
            <img src="/images/about/company.jpg" alt="Company Office" className="w-full rounded-xl shadow-lg" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10" style={{ color: builder.heading }}>
            {t('about.team.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((team, index) => (
              <FlipCard key={index} team={team} builder={builder} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Optimización de FlipCard
function FlipCard({ team, builder }: { team: Team; builder: any }) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full h-96 perspective cursor-pointer" onClick={() => setFlipped(prev => !prev)}>
      <div
        className={`relative w-full h-full transition-transform duration-500`}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          willChange: 'transform',
        }}
      >
        {/* Frente */}
        <div
          className="absolute w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center p-4"
          style={{
            backgroundColor: builder.cardBg,
            color: builder.textColor,
            border: `1px solid ${builder.border}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <img src={team.photo} alt={team.name} className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full mx-auto mb-4" loading="lazy" />
          <h6 className="text-xl md:text-2xl font-extrabold mb-6" style={{ color: builder.heading }}>
            {team.name}
          </h6>
          <p style={{ color: builder.textColor, marginBottom: '1rem' }}>{team.job}</p>
        </div>

        {/* Reverso */}
        <div
          className="absolute w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center p-4"
          style={{
            backgroundColor: builder.cardBg,
            color: builder.textColor,
            border: `1px solid ${builder.border}`,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <h6 className="text-xl md:text-2xl font-extrabold mb-6" style={{ color: builder.heading }}>
            {t('about.team.whoIs')} {team.name}?
          </h6>
          <p style={{ color: builder.textColor, textAlign: 'center' }}>{team.description}</p>
        </div>
      </div>
    </div>
  );
}
