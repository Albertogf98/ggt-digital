// src/pages/Portfolio.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Project = {
  title: string;
  image: string;
  description: string;
};

export default function Portfolio() {
  const { t } = useTranslation();
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
    <main className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/portfolio-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0 bg-black/60" />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">{t('portfolio.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl mb-6">{t('portfolio.subtitle')}</p>
          <Link to="/projects" className="no-underline inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 px-6 rounded-full transition">
            {t('portfolio.cta_button')}
          </Link>
        </motion.div>
      </section>

      {/* SECCIÓN DE PROYECTOS */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {(t('portfolio.demos', { returnObjects: true }) as Project[]).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] transition duration-300"
              >
                <div className="relative group">
                  <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center px-4">
                    <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                    <Link to="/projects" className="no-underline bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
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
      <section className="relative py-20 overflow-hidden">
        {/* Fondo degradado animado en tonos índigo */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 animate-gradient" />

        {/* Partículas de luz */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 bg-indigo-400/40 rounded-full blur-sm animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto text-center px-6"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-gray-900 dark:text-white drop-shadow-sm">{t('portfolio.trusted_by')}</h2>

          <div className="flex flex-wrap justify-center gap-10">
            {['accenture.svg', 'knowmadmood.svg', 'sogeti.svg', 'globant.svg', 'mayoral.svg', 'iberia.svg', 'cupra.svg', 'roche.svg', 'leroy.svg'].map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
              >
                <img src={`/images/brands/${logo}`} alt={logo} className="object-contain w-4/5 h-4/5 opacity-90 hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
        {ctaImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Portfolio slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">{t('portfolio.final_cta_title')}</h2>
          <Link to="/contact" className="no-underline bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full text-lg transition">
            {t('portfolio.contact_cta')}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
