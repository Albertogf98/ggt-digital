// src/pages/Portfolio.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Project = {
  title: string;
  image: string;
  description: string;
};

export default function Portfolio() {
  const { t } = useTranslation();

  const ctaImages = ['/images/portfolio/mac.jpg', '/images/portfolio/google.jpg', '/images/portfolio/usa.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ctaImages.length);
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Hero con video */}
      <section className="relative h-screen md:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/portfolio-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 fade-in">{t('portfolio.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 slide-up">{t('portfolio.subtitle')}</p>
        </div>
      </section>

      {/* Sección de proyectos */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {(t('portfolio.demos', { returnObjects: true }) as Project[]).map(project => (
            <div key={project.title} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105">
              <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final - slider de imágenes a ancho completo */}
      <section className="h-[50vh] relative flex items-center justify-center overflow-hidden">
        {ctaImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Portfolio slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </section>
    </main>
  );
}
