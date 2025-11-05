import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { LINKS } from '../../constants/links';

// Botón de selección de idioma reutilizable
function LanguageButton({ lang, currentLang, onClick, mobile = false }: { lang: string; currentLang: string; onClick: () => void; mobile?: boolean }) {
  const isActive = lang === currentLang;
  const baseClasses = mobile ? 'flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300' : 'px-2 py-2 hover:bg-white/10 hover:text-white';

  const activeClasses = mobile ? 'bg-blue-500 text-white shadow-lg' : '';
  const inactiveClasses = mobile ? 'bg-gray-800 text-white hover:bg-blue-500/70 hover:text-white' : '';

  return (
    <button onClick={onClick} className={clsx(baseClasses, isActive ? activeClasses : inactiveClasses)}>
      {lang === 'es' ? (mobile ? '🇪🇸 ES' : 'Español 🇪🇸') : mobile ? '🇬🇧 EN' : 'English 🇬🇧'}
    </button>
  );
}

// Menú de escritorio
function DesktopMenu({ links, t, i18n, changeLanguage }: any) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleLangChange = (lang: string) => {
    changeLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <div className="hidden md:flex items-center gap-8">
      {links.map((item: any) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={{ textDecoration: 'none' }}
          className={({ isActive }) => clsx('text-white font-medium hover:text-blue-400 transition-colors', isActive && 'text-blue-400 font-semibold')}
        >
          {t(item.key)}
        </NavLink>
      ))}

      {/* Selector de idioma */}
      <div className="relative">
        <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="font-medium flex items-center gap-1 hover:text-blue-400 transition">
          🌐 {i18n.language.toUpperCase()}
        </button>

        {langMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-900 rounded-md shadow-lg overflow-hidden border border-white/10">
            <LanguageButton lang="es" currentLang={i18n.language} onClick={() => handleLangChange('es')} />
            <LanguageButton lang="en" currentLang={i18n.language} onClick={() => handleLangChange('en')} />
          </div>
        )}
      </div>
    </div>
  );
}

// Menú móvil
function MobileMenu({ links, t, i18n, changeLanguage, closeMenu }: any) {
  const [closing, setClosing] = useState(false);

  const handleLangChange = (lang: string) => {
    changeLanguage(lang);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setClosing(true);
    setTimeout(() => closeMenu(), 300); // coincide con la duración de la animación
  };

  return (
    <div
      className={clsx(
        'md:hidden fixed  flex flex-col items-center gap-6 py-8 bg-black rounded-b-xl shadow-xl transition-transform duration-300',
        closing ? 'animate-slideUp' : 'animate-slideDown'
      )}
    >
      {links.map((item: any) => (
        <NavLink
          style={{ textDecoration: 'none' }}
          key={item.to}
          to={item.to}
          onClick={handleCloseMenu}
          className={({ isActive }) => clsx('text-white hover:text-blue-400 text-lg font-medium transition-colors', isActive && 'text-blue-400 font-semibold')}
        >
          {t(item.key)}
        </NavLink>
      ))}

      {/* Selector idioma móvil */}
      <div className="flex gap-4 mt-6 p-3 bg-gray-800 rounded-2xl shadow-lg">
        <LanguageButton lang="es" currentLang={i18n.language} onClick={() => handleLangChange('es')} mobile />
        <LanguageButton lang="en" currentLang={i18n.language} onClick={() => handleLangChange('en')} mobile />
      </div>
    </div>
  );
}

// Navbar principal
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMenuOpen(false);
  };

  const bars = [menuOpen ? 'rotate-45 translate-y-[6px]' : '', menuOpen ? 'opacity-0' : '', menuOpen ? '-rotate-45 -translate-y-[6px]' : ''];

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 md:px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors no-underline">
          GgT Digital
        </Link>

        {/* Menú escritorio */}
        <DesktopMenu links={LINKS} t={t} i18n={i18n} changeLanguage={changeLanguage} />

        {/* Botón hamburguesa */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {bars.map((bar, i) => (
            <span key={i} className={clsx('block w-6 h-[2px] bg-white my-[5px] transition-all duration-300', bar)} />
          ))}
        </button>
      </nav>

      {/* Menú móvil */}
      {menuOpen && <MobileMenu links={LINKS} t={t} i18n={i18n} changeLanguage={changeLanguage} closeMenu={() => setMenuOpen(false)} />}
    </header>
  );
}
