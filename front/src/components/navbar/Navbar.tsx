// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { LINKS } from '../../constants/links';
import { MoonIcon, SunIcon, X } from 'lucide-react';
import { useTheme } from '../../themes/ThemeProvider';
import LanguageMenu from './LangMenu';

// 🔹 Menú escritorio
function DesktopMenu({ links, t, builder }: any) {
  return (
    <div className="hidden md:flex items-center gap-6">
      {links.map((item: any) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={{ color: builder.textColor, textDecoration: 'none' }}
          className={({ isActive }) => clsx('font-medium hover:text-blue-500 transition-colors', isActive && 'text-blue-500 font-semibold')}
        >
          {t(item.key)}
        </NavLink>
      ))}

      {/* Selector de idioma chulo */}
      <LanguageMenu />
    </div>
  );
}

// 🔹 Menú móvil
function MobileMenu({ links, t, closeMenu, builder }: any) {
  const [closing, setClosing] = useState(false);

  const handleCloseMenu = () => {
    setClosing(true);
    setTimeout(() => closeMenu(), 300);
  };

  return (
    <div
      style={{ backgroundColor: builder.cardBg, color: builder.textColor }}
      className={clsx(
        'md:hidden fixed inset-0 flex flex-col items-center justify-start gap-6 py-10 transition-all duration-300 z-[60] overflow-y-auto',
        closing ? 'animate-slideUp' : 'animate-slideDown'
      )}
    >
      <button onClick={handleCloseMenu} style={{ color: builder.textColor }} className="absolute top-5 right-6 hover:text-blue-500 transition" aria-label="Cerrar menú">
        <X size={30} />
      </button>

      {links.map((item: any) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={handleCloseMenu}
          style={{ color: builder.textColor, textDecoration: 'none' }}
          className={({ isActive }) =>
            clsx(
              'hover:text-blue-500 text-lg font-medium transition-colors border-b w-full text-center py-3',
              isActive && 'text-blue-500 font-semibold',
              `border-gray-300 dark:border-gray-700`
            )
          }
        >
          {t(item.key)}
        </NavLink>
      ))}

      {/* Selector idioma móvil */}
      <div className="w-full px-4 mt-8">
        <LanguageMenu mobile />
      </div>
    </div>
  );
}

// 🔹 Navbar principal
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode, builder } = useTheme();

  const bars = [menuOpen ? 'rotate-45 translate-y-[6px]' : '', menuOpen ? 'opacity-0' : '', menuOpen ? '-rotate-45 -translate-y-[6px]' : ''];

  return (
    <header style={{ backgroundColor: builder.cardBg, color: builder.textColor }} className="sticky top-0 z-50 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-3 px-5 md:px-4">
        {/* Logo */}
        <Link to="/" style={{ color: builder.heading }} className="text-2xl font-extrabold tracking-tight hover:text-blue-500 transition-colors no-underline">
          {t('brand')}
        </Link>

        <div className="flex items-center gap-4">
          {/* Menú escritorio */}
          <DesktopMenu links={LINKS} t={t} builder={builder} />

          {/* Botón dark/light */}
          <button
            onClick={toggleDarkMode}
            style={{ backgroundColor: builder.inputBg, color: builder.textColor }}
            className="p-2 rounded-md hover:opacity-90 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-900 dark:text-gray-100" />}
          </button>

          {/* Botón hamburguesa */}
          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md transition" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {bars.map((bar, i) => (
              <span key={i} className={clsx('block w-6 h-[2px] my-[4px] transition-all duration-300', bar, darkMode ? 'bg-white' : 'bg-gray-800')} />
            ))}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuOpen && <MobileMenu links={LINKS} t={t} closeMenu={() => setMenuOpen(false)} builder={builder} />}
    </header>
  );
}
