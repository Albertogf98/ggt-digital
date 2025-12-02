import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { LINKS } from '../../constants/links';
import { MoonIcon, SunIcon, X } from 'lucide-react';
import { useTheme } from '../../themes/ThemeProvider';

// 🔹 Botón de idioma
function LanguageButton({ lang, currentLang, onClick, mobile = false }: { lang: string; currentLang: string; onClick: () => void; mobile?: boolean }) {
  const isActive = lang === currentLang;
  const baseClasses = mobile
    ? 'flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300'
    : 'px-2 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-blue-500';

  const activeClasses = mobile ? 'bg-blue-500 text-white shadow-lg' : '';
  const inactiveClasses = mobile ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-blue-500/70 hover:text-white' : '';

  return (
    <button onClick={onClick} className={clsx(baseClasses, isActive ? activeClasses : inactiveClasses)}>
      {lang === 'es' ? (mobile ? '🇪🇸 ES' : 'Español 🇪🇸') : mobile ? '🇬🇧 EN' : 'English 🇬🇧'}
    </button>
  );
}

// 🔹 Menú escritorio
function DesktopMenu({ links, t, i18n, changeLanguage }: any) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleLangChange = (lang: string) => {
    changeLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      {links.map((item: any) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={{ textDecoration: 'none' }}
          className={({ isActive }) => clsx('text-gray-800 dark:text-gray-100 font-medium hover:text-blue-500 transition-colors', isActive && 'text-blue-500 font-semibold')}
        >
          {t(item.key)}
        </NavLink>
      ))}

      {/* Selector idioma escritorio */}
      <div className="relative">
        <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="font-medium flex items-center gap-1 hover:text-blue-500 transition">
          🌐 {i18n.language.toUpperCase()}
        </button>

        {langMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-50 dark:bg-gray-900 rounded-md shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <LanguageButton lang="es" currentLang={i18n.language} onClick={() => handleLangChange('es')} />
            <LanguageButton lang="en" currentLang={i18n.language} onClick={() => handleLangChange('en')} />
          </div>
        )}
      </div>
    </div>
  );
}

// 🔹 Menú móvil
function MobileMenu({ links, t, i18n, changeLanguage, closeMenu }: any) {
  const [closing, setClosing] = useState(false);

  const handleLangChange = (lang: string) => {
    changeLanguage(lang);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setClosing(true);
    setTimeout(() => closeMenu(), 300);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className={clsx(
        'md:hidden fixed inset-0 flex flex-col items-center justify-start gap-6 py-10 transition-all duration-300 z-[60] bg-gray-50 dark:bg-gray-900 overflow-y-auto',
        closing ? 'animate-slideUp' : 'animate-slideDown'
      )}
    >
      <button onClick={handleCloseMenu} className="absolute top-5 right-6 text-gray-800 dark:text-gray-200 hover:text-blue-500 transition" aria-label="Cerrar menú">
        <X size={30} />
      </button>

      {links.map((item: any) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={handleCloseMenu}
          style={{ textDecoration: 'none' }}
          className={({ isActive }) =>
            clsx(
              'text-gray-800 dark:text-gray-100 hover:text-blue-500 text-lg font-medium transition-colors border-b border-gray-200 dark:border-gray-700 w-full text-center py-3',
              isActive && 'text-blue-500 font-semibold'
            )
          }
        >
          {t(item.key)}
        </NavLink>
      ))}

      {/* Selector idioma móvil */}
      <div className="flex gap-4 mt-8 p-3 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg">
        <LanguageButton lang="es" currentLang={i18n.language} onClick={() => handleLangChange('es')} mobile />
        <LanguageButton lang="en" currentLang={i18n.language} onClick={() => handleLangChange('en')} mobile />
      </div>
    </div>
  );
}

// 🔹 Navbar principal
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();

  const bars = [menuOpen ? 'rotate-45 translate-y-[6px]' : '', menuOpen ? 'opacity-0' : '', menuOpen ? '-rotate-45 -translate-y-[6px]' : ''];

  return (
    <header className="sticky top-0 z-50 bg-gray-50 dark:bg-gray-900 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-3 px-5 md:px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors no-underline">
          {t('brand')}
        </Link>

        <div className="flex items-center gap-4">
          {/* Menú escritorio */}
          <DesktopMenu links={LINKS} t={t} i18n={i18n} changeLanguage={(lng: string) => i18n.changeLanguage(lng)} />

          {/* Botón dark/light */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-900 dark:text-gray-100" />}
          </button>

          {/* Botón hamburguesa */}
          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md transition" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {bars.map((bar, i) => (
              <span key={i} className={clsx('block w-6 h-[2px] bg-gray-800 dark:bg-gray-100 my-[4px] transition-all duration-300', bar)} />
            ))}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuOpen && <MobileMenu links={LINKS} t={t} i18n={i18n} changeLanguage={(lng: string) => i18n.changeLanguage(lng)} closeMenu={() => setMenuOpen(false)} />}
    </header>
  );
}
