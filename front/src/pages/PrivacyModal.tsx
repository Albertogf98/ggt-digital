import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../themes/ThemeProvider';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PrivacyBanner() {
  const { t } = useTranslation();
  const { builder } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const COOKIE_NAME = 'privacyAccepted';

  useEffect(() => {
    const accepted = Cookies.get(COOKIE_NAME);
    if (!accepted) setIsOpen(true);
  }, []);

  const handleAccept = () => {
    Cookies.set(COOKIE_NAME, 'true', { expires: 365 });
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 shadow-lg"
          style={{ backgroundColor: builder.cardBg, color: builder.textColor }}
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm md:text-base">
              {t('cookie.description')}{' '}
              <Link to="/privacy-policy" className="underline font-semibold hover:text-blue-500 transition-colors">
                {t('cookie.learn_more')}
              </Link>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="px-5 py-2 md:px-6 md:py-3 rounded-full font-semibold shadow-md hover:brightness-105 transition-all"
                style={{
                  backgroundColor: builder.button,
                  color: builder.textColor,
                }}
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
