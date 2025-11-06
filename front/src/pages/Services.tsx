import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaChartLine, FaPalette, FaRocket, FaUsers, FaShieldAlt } from 'react-icons/fa';
import type { JSX } from 'react';

type OurService = {
  title: string;
  icon: JSX.Element;
  text: string;
};

export default function Services() {
  const { t } = useTranslation();

  const iconsMap: Record<string, JSX.Element> = {
    '💻': <FaLaptopCode />,
    '📈': <FaChartLine />,
    '🎨': <FaPalette />,
  };

  const services: OurService[] = (t('services.ourServices', { returnObjects: true }) as any[]).map(service => ({
    ...service,
    icon: iconsMap[service.icon] || <FaLaptopCode />,
  }));

  return (
    <main className="overflow-x-hidden bg-gray-900 text-white">
      {/* HERO */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/service-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">{t('services.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">{t('services.subtitle')}</p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {t('services.section.button')}
          </Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div
              key={service.title}
              className="relative rounded-2xl p-8 text-center bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg overflow-hidden group transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-600/40 opacity-20 group-hover:opacity-40 transition-opacity rounded-2xl" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="text-5xl mb-4 text-blue-400 transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-300 text-base">{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-gray-800 py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t('services.beneficts.title')}</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <FaRocket />, title: t('services.beneficts.sectionOne.title'), text: t('services.beneficts.sectionOne.text') },
            { icon: <FaUsers />, title: t('services.beneficts.sectionTwo.title'), text: t('services.beneficts.sectionTwo.text') },
            { icon: <FaShieldAlt />, title: t('services.beneficts.sectionThree.title'), text: t('services.beneficts.sectionThree.text') },
          ].map(item => (
            <div key={item.title} className="p-6 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4 text-blue-400 mx-auto">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden py-16 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
        <div className="flex-1 mb-8 md:mb-0 flex justify-center">
          <img src="/images/service-photo.jpg" alt="Business growth" className="w-full max-w-sm sm:max-w-md rounded-xl shadow-xl object-contain md:object-cover" />
        </div>

        <div className="flex-1 text-center md:text-left max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t('services.section.title')}</h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6">{t('services.section.description')}</p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('services.section.button')}
          </Link>
        </div>
      </section>
    </main>
  );
}
