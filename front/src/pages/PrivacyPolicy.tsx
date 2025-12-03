import { useTranslation } from 'react-i18next';
import { useTheme } from '../themes/ThemeProvider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const { builder } = useTheme();

  return (
    <main id="privacy" className="overflow-x-hidden min-h-screen py-16 px-4 sm:px-6 md:px-12" style={{ backgroundColor: builder.cardBg, color: builder.textColor }}>
      {/* HERO */}
      <section className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
          style={{ color: builder.heading }}
        >
          {t('privacy.title')}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
          {t('privacy.subtitle')}
        </motion.p>
      </section>

      {/* CONTENIDO */}
      <section className="max-w-4xl mx-auto space-y-8">
        {/* Introducción */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: builder.heading }}>
            {t('privacy.intro.title')}
          </h2>
          <p>{t('privacy.intro.text')}</p>
        </div>

        {/* Qué datos recolectamos */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: builder.heading }}>
            {t('privacy.dataCollected.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {(t('privacy.dataCollected.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Uso de los datos */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: builder.heading }}>
            {t('privacy.dataUsage.title')}
          </h2>
          <p>{t('privacy.dataUsage.text')}</p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: builder.heading }}>
            {t('privacy.cookies.title')}
          </h2>
          <p>{t('privacy.cookies.text')}</p>
        </div>

        {/* Derechos del usuario */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: builder.heading }}>
            {t('privacy.userRights.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {(t('privacy.userRights.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: builder.heading }}>
            {t('privacy.contact.title')}
          </h2>
          <p>
            {t('privacy.contact.text')}{' '}
            <Link to="/contact" className="underline font-semibold hover:text-blue-500 transition-colors">
              {t('privacy.contact.linkText')}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
