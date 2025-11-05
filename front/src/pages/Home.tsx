import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Card = {
  title: string;
  text: string;
};
export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="overflow-x-hidden">
      {/* Hero con video */}
      <section className="relative h-screen md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* 🎬 Video de fondo */}
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/corporate-bg.mp4" type="video/mp4" />
          {/* fallback */}
          Tu navegador no soporta videos HTML5.
        </video>

        {/* 🖤 Capa oscura encima del video */}
        <div className="absolute inset-0 bg-black/50" />

        {/* ✨ Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 fade-in">{t('home.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 slide-up">{t('home.subtitle')}</p>
        </div>
      </section>
      {/* Servicios destacados */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {(t('home.cards', { returnObjects: true }) as Card[]).map(service => (
            <div key={service.title} className="card text-center">
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="h-screen md:h-[80vh] bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/path-to/your-hero.jpg')" }}>
        {' '}
        <div className="absolute inset-0 bg-black/20" />{' '}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {' '}
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 fade-in">{t('home.section.title')}</h1>{' '}
          <p className="text-white/90 text-lg md:text-xl mb-8 slide-up">{t('home.section.description')}</p>{' '}
          <Link style={{ textDecoration: 'none' }} to="/contact" className="btn-primary text-lg">
            {' '}
            {t('home.section.button')}{' '}
          </Link>{' '}
        </div>{' '}
      </section>
    </main>
  );
}
