// src/pages/Projects.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="/images/projects-bg.jpg" alt="Proyectos fondo" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">{t('projects.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl">{t('projects.subtitle')}</p>
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
              <div className="relative">
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
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
      <section className="relative py-20 bg-indigo-600 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('projects.cta_title', '¿Quieres que tu idea sea el próximo proyecto exitoso?')}</h2>
          <a href="/contact" className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition">
            {t('projects.cta_button', 'Hablemos')}
          </a>
        </motion.div>
      </section>
    </main>
  );
}
