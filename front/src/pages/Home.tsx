import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Card = {
  title: string;
  text: string;
  icon?: string;
};

export default function Home() {
  const { t } = useTranslation();

  const services = t('home.cards', { returnObjects: true }) as Card[];

  return (
    <main className="flex flex-col overflow-x-hidden">
      {/* 🟦 HERO con video */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/corporate-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay animado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent animate-gradient" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
          >
            {t('home.title')}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-white/90 text-base sm:text-lg md:text-xl mb-8">
            {t('home.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* 🧩 SERVICIOS */}
      <section className="py-14 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map(service => (
            <motion.div
              key={service.title}
              whileHover={{ y: -6 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 text-center sm:text-left"
            >
              <i className={`fa-solid ${service.icon || 'fa-bolt'} text-blue-500 text-3xl mb-4`} />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA FINAL */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/cta-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-blue-400 uppercase tracking-widest text-sm sm:text-base mb-2">{t('home.section.tagline')}</p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4">{t('home.section.title')}</h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">{t('home.section.description')}</p>

          <Link
            to="/contact"
            className="inline-block w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 no-underline"
          >
            {t('home.section.button')}
          </Link>
        </div>
      </section>
    </main>
  );
}
