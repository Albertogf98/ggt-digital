import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTheme } from '../../themes/ThemeProvider';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export default function LanguageMenu({ mobile = false }: { mobile?: boolean }) {
  const { i18n } = useTranslation();
  const { builder } = useTheme();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setLangMenuOpen(false));

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('appLanguage', code);
    setLangMenuOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <div ref={menuRef} className={mobile ? 'w-full' : 'relative'}>
      <button
        onClick={() => setLangMenuOpen(!langMenuOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-transform transform hover:scale-105 ${builder.button} ${mobile ? 'w-full justify-center' : ''}`}
      >
        <Globe className={`w-5 h-5 ${builder.icon}`} />
        <span>{currentLang.flag}</span>
      </button>

      {langMenuOpen && (
        <div
          style={{ backgroundColor: builder.cardBg, color: builder.textColor }}
          className={
            mobile
              ? 'flex flex-col w-full mt-2 rounded-lg shadow-lg p-2 gap-2'
              : `absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg overflow-hidden transition-all duration-300 transform scale-100 opacity-100`
          }
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors hover:brightness-110 rounded-md ${
                lang.code === currentLang.code ? 'font-semibold bg-blue-500 text-white' : ''
              }`}
            >
              <span>{lang.flag}</span> {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
