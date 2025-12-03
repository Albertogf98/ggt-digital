import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../themes/ThemeProvider';

export default function PrivacyBanner() {
  const { t } = useTranslation();
  const { builder } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('privacyAccepted');
    if (!accepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-0 inset-x-0 shadow-lg p-4 md:p-6 transition-transform transform translate-y-0 z-50"
          style={{ backgroundColor: builder.cardBg, color: builder.textColor }}
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm md:text-base" style={{ color: builder.textColor }}>
              {t('cookie.description')}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: builder.button,
                  color: builder.textColor,
                }}
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
