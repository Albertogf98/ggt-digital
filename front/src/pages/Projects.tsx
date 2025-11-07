// src/pages/Projects.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Project = {
  title: string;
  image: string;
  description: string;
  technologies: string[];
  link?: string;
};

export default function Projects() {
  const { t } = useTranslation();

  const projects: Project[] = t('projects.list', { returnObjects: true }) as Project[];

  return (
    <main className="overflow-x-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* HERO */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/portfolio-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
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
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              {/* Iframe responsive usando padding-bottom */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
                <iframe
                  src={project.link}
                  title={project.title}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>

              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full text-sm">
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
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full transition text-center"
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
      <section className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden py-16 px-6 lg:px-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Imagen */}
          <div className="flex-1 flex justify-center">
            <img src="/images/service-photo.jpg" alt="Business growth" className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl shadow-xl object-contain md:object-cover" />
          </div>

          {/* Texto */}
          <div className="flex-1 text-center md:text-left max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">{t('services.section.title')}</h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 leading-relaxed">{t('services.section.description')}</p>
            <Link
              to="/contact"
              className="no-underline inline-block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('services.section.button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
