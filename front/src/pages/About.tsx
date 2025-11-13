// src/pages/About.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Team = {
  photo: any;
  name: string;
  job: string;
  description: string;
};

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="overflow-x-hidden" id="about">
      {/* Hero */}
      <section className="relative h-screen md:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/about-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 fade-in">{t('about.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl slide-up">{t('about.story.subtitle')}</p>
        </div>
      </section>

      {/* Sección de historia / misión */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t('about.story.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{t('about.story.description')}</p>
            <p className="text-gray-700 dark:text-gray-300">{t('about.story.subtitle')}</p>
          </div>
          <div>
            <img src="/images/about/company.jpg" alt="Company Office" className="w-full rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Sección de equipo */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">{t('about.team.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(t('about.team.members', { returnObjects: true }) as Team[]).map((team, index) => (
              <FlipCard key={index} team={team} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FlipCard({ team }: { team: Team }) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full h-96 perspective cursor-pointer" onClick={() => setFlipped(!flipped)}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${flipped ? 'rotate-y-180' : 'group-hover:rotate-y-180'}`}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
        }}
      >
        {/* Frente */}
        <div
          className="absolute w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <img src={team.photo} alt={team.name} className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full mx-auto mb-4" />
          <h6 className="text-xl md:text-2xl font-extrabold mb-6">{team.name}</h6>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{team.job}</p>
        </div>

        {/* Reverso */}
        <div
          className="absolute w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <h6 className="text-xl md:text-2xl font-extrabold mb-6">
            {t('about.team.whoIs')} {team.name}?
          </h6>
          <p className="text-gray-700 dark:text-gray-300 text-center">{team.description}</p>
        </div>
      </div>
    </div>
  );
}
