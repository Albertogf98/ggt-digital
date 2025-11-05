import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 md:px-4">
        {/* Logo */}
        <Link style={{ textDecoration: 'none' }} to="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors">
          GgT Digital
        </Link>

        {/* Menú escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(item => (
            <NavLink
              key={item.to}
              style={{ textDecoration: 'none' }}
              to={item.to}
              className={({ isActive }) => `text-white font-medium hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400 font-semibold' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Selector de idioma */}
          <div className="relative">
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className=" font-medium flex items-center gap-1 hover:text-blue-400 transition">
              🌐 {i18n.language.toUpperCase()}
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 bg-black/10  rounded-md shadow-lg overflow-hidden border border-white/10">
                <button onClick={() => changeLanguage('es')} className="px-2 py-2 hover:bg-white/10 hover:text-white">
                  Español 🇪🇸
                </button>
                <button onClick={() => changeLanguage('en')} className="px-2 py-2 hover:bg-white/10 hover:text-white">
                  English 🇬🇧
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white my-[5px] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-black/90 backdrop-blur-md animate-slideDown">
          {links.map(item => (
            <NavLink
              key={item.to}
              style={{ textDecoration: 'none', marginLeft: '5%' }}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `text-white hover:text-blue-400 text-lg transition-colors ${isActive ? 'text-blue-400 font-semibold' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Selector idioma móvil */}
          <div className="flex gap-3 mt-4 bg-blue-100 p-2 rounded-xl shadow-inner">
            <button
              onClick={() => changeLanguage('es')}
              className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition-all duration-300
      ${i18n.language === 'es' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/30 text-blue-700 hover:bg-blue-400/50 hover:text-white'}`}
            >
              🇪🇸 ES
            </button>

            <button
              onClick={() => changeLanguage('en')}
              className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition-all duration-300
      ${i18n.language === 'en' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/30 text-blue-700 hover:bg-blue-400/50 hover:text-white'}`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
