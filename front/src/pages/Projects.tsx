import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../themes/ThemeProvider';

type Project = {
  title: string;
  image: string;
  description: string;
  technologies: string[];
  link?: string;
};

export default function Projects() {
  const { t } = useTranslation();
  const { builder } = useTheme();

  const projects: Project[] = useMemo(() => t('projects.list', { returnObjects: true }) as Project[], [t]);

  const headingStyle = useMemo(() => ({ color: builder.heading }), [builder.heading]);
  const textStyle = useMemo(() => ({ color: builder.textColor }), [builder.textColor]);
  const cardStyle = useMemo(() => ({ backgroundColor: builder.cardBg, color: builder.textColor }), [builder.cardBg, builder.textColor]);
  const buttonStyle = useMemo(() => ({ backgroundColor: builder.button, color: builder.textColor }), [builder.button, builder.textColor]);
  const techStyle = useMemo(() => ({ backgroundColor: builder.inputBg, color: builder.textColor }), [builder.inputBg, builder.textColor]);

  return (
    <main className="overflow-x-hidden min-h-screen" style={cardStyle} id="projects">
      {/* HERO */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
          <source src="videos/portfolio-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto"
        >
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">{t('projects.title')}</h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6">{t('projects.subtitle')}</p>
        </motion.div>
      </section>

      {/* LISTA DE PROYECTOS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              style={cardStyle}
            >
              {/* Iframe solo si existe link */}
              {project.link && (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={project.link}
                    title={project.title}
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={headingStyle}>
                    {project.title}
                  </h3>
                  <p className="mb-4" style={textStyle}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-sm" style={techStyle}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-semibold px-6 py-2 rounded-full transition text-center"
                    style={buttonStyle}
                  >
                    {t('portfolio.view_project')}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden py-16 px-6 lg:px-20" style={cardStyle}>
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex justify-center">
            <img src="/images/service-photo.jpg" alt="Business growth" className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl shadow-xl object-contain md:object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={headingStyle}>
              {t('services.section.title')}
            </h2>
            <p className="mb-6 leading-relaxed" style={textStyle}>
              {t('services.section.description')}
            </p>
            <Link to="/contact" className="no-underline inline-block font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-center" style={buttonStyle}>
              {t('services.section.button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
