import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../themes/ThemeProvider';

type Project = {
  title: string;
  image: string;
  description: string;
};

export default function Portfolio() {
  const { t } = useTranslation();
  const { builder } = useTheme();

  const labelSeeProject = t('portfolio.view_project');
  const ctaImages = ['/images/portfolio/mac.jpg', '/images/portfolio/google.jpg', '/images/portfolio/usa.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ctaImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="overflow-x-hidden" id="portfolio">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/portfolio-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ color: builder.heading }}>
            {t('portfolio.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6" style={{ color: builder.textColor }}>
            {t('portfolio.subtitle')}
          </p>
          <Link
            to="/projects"
            className="no-underline inline-block font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition"
            style={{
              backgroundColor: builder.button,
              color: builder.textColor,
            }}
          >
            {t('portfolio.cta_button')}
          </Link>
        </motion.div>
      </section>

      {/* SECCIÓN DE PROYECTOS */}
      <section id="projects" className="py-16 sm:py-20" style={{ backgroundColor: builder.cardBg }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {(t('portfolio.demos', { returnObjects: true }) as Project[]).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300"
                style={{ backgroundColor: builder.cardBg }}
              >
                <div className="relative group">
                  <img src={project.image} alt={project.title} className="w-full h-48 sm:h-56 object-cover" />

                  {/* Texto overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center items-center text-center px-3 sm:px-4 opacity-0 group-hover:opacity-100 transition"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: builder.textColor }}>
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm mb-4" style={{ color: builder.textColor }}>
                      {project.description}
                    </p>
                    <Link
                      to="/projects"
                      className="no-underline px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium transition"
                      style={{ backgroundColor: builder.button, color: builder.textColor }}
                    >
                      {labelSeeProject}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CONFIANZA */}
      <section className="relative py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: builder.cardBg }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12" style={{ color: builder.heading }}>
            {t('portfolio.trusted_by')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {['accenture.svg', 'knowmadmood.svg', 'sogeti.svg', 'globant.svg', 'mayoral.svg', 'iberia.svg', 'cupra.svg', 'roche.svg', 'leroy.svg'].map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: builder.inputBg }}
              >
                <img src={`/images/brands/${logo}`} alt={logo} className="object-contain w-4/5 h-4/5 opacity-90 hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        {ctaImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Portfolio slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={{ color: builder.heading }}>
            {t('portfolio.final_cta_title')}
          </h2>
          <Link
            to="/contact"
            className="no-underline font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg transition"
            style={{
              backgroundColor: builder.button,
              color: builder.textColor,
            }}
          >
            {t('portfolio.contact_cta')}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
