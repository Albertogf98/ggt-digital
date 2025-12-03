import { useState, useEffect, useMemo } from 'react';
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

  const labelSeeProject = useMemo(() => t('portfolio.view_project'), [t]);
  const ctaImages = useMemo(() => ['/images/portfolio/mac.jpg', '/images/portfolio/google.jpg', '/images/portfolio/usa.jpg'], []);

  const logos = useMemo(() => ['accenture.svg', 'knowmadmood.svg', 'sogeti.svg', 'globant.svg', 'mayoral.svg', 'iberia.svg', 'cupra.svg', 'roche.svg', 'leroy.svg'], []);

  const projects = useMemo(() => t('portfolio.demos', { returnObjects: true }) as Project[], [t]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex(prev => (prev + 1) % ctaImages.length), 3000);
    return () => clearInterval(interval);
  }, [ctaImages.length]);

  const cardStyle = useMemo(() => ({ backgroundColor: builder.cardBg }), [builder.cardBg]);
  const overlayStyle = useMemo(() => ({ backgroundColor: 'rgba(0,0,0,0.6)' }), []);
  const logoStyle = useMemo(() => ({ backgroundColor: builder.inputBg }), [builder.inputBg]);
  const buttonStyle = useMemo(() => ({ backgroundColor: builder.button, color: builder.textColor }), [builder.button, builder.textColor]);
  const headingStyle = useMemo(() => ({ color: builder.heading }), [builder.heading]);
  const textStyle = useMemo(() => ({ color: builder.textColor }), [builder.textColor]);

  return (
    <main className="overflow-x-hidden" id="portfolio">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src="videos/portfolio-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0" style={overlayStyle} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight" style={headingStyle}>
            {t('portfolio.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6" style={textStyle}>
            {t('portfolio.subtitle')}
          </p>
          <Link to="/projects" className="no-underline inline-block font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition" style={buttonStyle}>
            {t('portfolio.cta_button')}
          </Link>
        </motion.div>
      </section>

      {/* SECCIÓN DE PROYECTOS */}
      <section id="projects" className="py-16 sm:py-20" style={{ backgroundColor: builder.cardBg }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300 relative group"
              >
                <img src={project.image} alt={project.title} className="w-full h-48 sm:h-56 object-cover" />

                {/* Overlay de texto */}
                <div
                  className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 transition-opacity duration-300
                       opacity-100 sm:opacity-0 group-hover:opacity-100"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: builder.textColor }}>
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm mb-4" style={{ color: builder.textColor }}>
                    {project.description}
                  </p>
                  <Link
                    to="/projects"
                    className={`no-underline px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium transition ${builder.textColor} ${builder.button}`}
                    style={{ backgroundColor: builder.button, color: builder.textColor }}
                  >
                    {labelSeeProject}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE LOGOS */}
      <section className="relative py-16 sm:py-20 overflow-hidden" style={cardStyle}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12" style={headingStyle}>
            {t('portfolio.trusted_by')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {logos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
                style={logoStyle}
              >
                <img src={`/images/brands/${logo}`} alt={logo} className="object-contain w-4/5 h-4/5 opacity-90 hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={ctaImages[currentIndex]}
          alt={`Portfolio slide ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0" style={overlayStyle} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={headingStyle}>
            {t('portfolio.final_cta_title')}
          </h2>
          <Link to="/contact" className="no-underline font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg transition" style={buttonStyle}>
            {t('portfolio.contact_cta')}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
