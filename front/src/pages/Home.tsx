// src/pages/Home.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { useMemo } from 'react';

type Card = {
  title: string;
  text: string;
  icon?: string;
};

export default function Home() {
  const { t } = useTranslation();
  const { builder } = useTheme();

  // Memoriza traducciones para evitar recalcular cada render
  const services = useMemo(() => t('home.cards', { returnObjects: true }) as Card[], [t]);

  return (
    <main className="flex flex-col overflow-x-hidden" style={{ backgroundColor: builder.cardBg, color: builder.textColor }} id="home">
      {/* 🟦 HERO con video */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src="videos/corporate-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay con gradient simple */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.7), ${builder.cardBg}80, transparent)`,
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: builder.heading, willChange: 'transform, opacity' }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
          >
            {t('home.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ color: builder.textColor, willChange: 'transform, opacity' }}
            className="text-base sm:text-lg md:text-xl mb-8"
          >
            {t('home.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* 🧩 SERVICIOS */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map(service => (
            <motion.div
              key={service.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: builder.cardBg,
                color: builder.textColor,
                borderColor: builder.border,
                willChange: 'transform, opacity',
              }}
              className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 text-center sm:text-left border"
            >
              <i className={`fa-solid ${service.icon || 'fa-bolt'} text-3xl mb-4`} style={{ color: builder.button }} />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2" style={{ color: builder.heading }}>
                {service.title}
              </h3>
              <p className="text-sm sm:text-base" style={{ color: builder.textColor }}>
                {service.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA FINAL */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src="videos/cta-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay simple */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${builder.cardBg}cc, rgba(0,0,0,0.4), transparent)`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="uppercase tracking-widest text-sm sm:text-base mb-2" style={{ color: builder.button }}>
            {t('home.section.tagline')}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4" style={{ color: builder.heading }}>
            {t('home.section.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8" style={{ color: builder.textColor }}>
            {t('home.section.description')}
          </p>

          <Link
            to="/contact"
            style={{ backgroundColor: builder.button, color: builder.textColor }}
            className="inline-block w-full sm:w-auto font-semibold text-lg px-12 py-4 rounded-full shadow-lg hover:brightness-110 transition-all duration-300 no-underline"
          >
            {t('home.section.button')}
          </Link>
        </div>
      </section>
    </main>
  );
}
