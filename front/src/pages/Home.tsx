import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Card = {
  title: string;
  text: string;
};

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col overflow-x-hidden">
      {/* Hero con video */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/corporate-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4">{t('home.title')}</h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8">{t('home.subtitle')}</p>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {(t('home.cards', { returnObjects: true }) as Card[]).map(service => (
            <div key={service.title} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final con video o imagen */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/cta-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4">{t('home.section.title')}</h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">{t('home.section.description')}</p>
          <Link to="/contact" className="btn-primary text-base sm:text-lg px-12 py-3 rounded-md inline-block w-full sm:w-auto" style={{ textDecoration: 'none' }}>
            {t('home.section.button')}
          </Link>
        </div>
      </section>
    </main>
  );
}
