import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function PrivacyBanner() {
  const { t } = useTranslation();

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
        <div className="fixed bottom-0 inset-x-0 bg-white shadow-lg p-4 md:p-6 transition-transform transform translate-y-0 z-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-700 text-sm md:text-base">{t('cookie.description')}</p>
            <div className="flex gap-2">
              <button onClick={handleAccept} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
