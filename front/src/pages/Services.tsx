import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaChartLine, FaPalette } from 'react-icons/fa';
import type { JSX } from 'react';

type OurService = {
  title: string;
  icon: JSX.Element;
  text: string;
};

export default function Services() {
  const { t } = useTranslation();

  // Objeto de referencia para los iconos
  const iconsMap: Record<string, JSX.Element> = {
    '💻': <FaLaptopCode />,
    '📈': <FaChartLine />,
    '🎨': <FaPalette />,
  };

  // Mapeamos los servicios usando t() y returnObjects: true
  const services: OurService[] = (t('services.ourServices', { returnObjects: true }) as any[]).map(service => ({
    ...service,
    icon: iconsMap[service.icon] || <FaLaptopCode />,
  }));

  return (
    <main className="overflow-x-hidden">
      {/* Hero con video */}
      <section className="relative h-screen md:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/service-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 fade-in">{t('services.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 slide-up">{t('services.subtitle')}</p>
          <Link
            to="/contact"
            style={{ textDecoration: 'none' }}
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-500 transition-all"
          >
            {t('services.section.button')}
          </Link>
        </div>
      </section>

      {/* Sección de servicios */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map(service => (
            <div
              key={service.title}
              className="relative rounded-2xl p-8 text-center shadow-lg overflow-hidden group cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20 group-hover:opacity-40 transition-opacity rounded-2xl" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="text-5xl mb-4 text-white transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-white/90">{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="h-[50vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-center gap-8">
          <div className="flex-1">
            <img src="/images/service-photo.jpg" alt="Business growth" className="w-full max-w-md rounded-xl shadow-lg" />
          </div>

          <div className="flex-1 text-center md:text-left text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t('services.section.title')}</h2>
            <p className="text-white/90 text-lg md:text-xl mb-6">{t('services.section.description')}</p>
            <Link
              to="/contact"
              style={{ textDecoration: 'none', color: '#646060ff' }}
              className="text-center inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition-all"
            >
              {t('services.section.button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
