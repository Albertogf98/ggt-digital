import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="border-t border-gray-700 w-full bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Columna 1 - Marca */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">GgT Digital</h2>
          <p className="text-gray-400 mb-6">{t('footer.brand.description')}</p>
          <div className="flex gap-4">
            <a
              href="https://www.google.com/search?sca_esv=c5d665130b0b830b&hl=es&authuser=1&sxsrf=AE3TifOKsDeUucLbqmZnbv2C8jCxLzTJJw:1761829485628&kgmid=/g/11ylr6zsl3&q=GgT+Digital&shndl=30&shem=dafa,lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=a575e082fed4e60e&utm_source=dafa,lcuae,uaasie,shrtsdl,sh/x/loc/uni/m1/1"
              aria-label="Google"
              className="hover:text-grey-500 transition-colors"
            >
              <i className="text-white fa-brands fa-google"></i>
            </a>
            <a href="https://www.instagram.com/ggt_digital/" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
              <i className="text-white fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/109755566" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
              <i className="text-white fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Columna 2 - Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{t('footer.fastLinks.title')}</h3>
          <div className="space-y-1">
            {links.map(link => (
              <div>
                <Link style={{ textDecoration: 'none', color: '#beb8b8ff' }} to={link.to} className="transition-colors">
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Columna 3 - Servicios */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Servicios</h3>
          <ul className="space-y-2">
            {(t('footer.services', { returnObjects: true }) as []).map(serv => (
              <li>{serv}</li>
            ))}
          </ul>
        </div>

        {/* Columna 4 - Contacto */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{t('footer.contact.title')}</h3>
          <p className="text-gray-400 mb-2">📍 Málaga, {t('footer.contact.country')}</p>
          <p className="text-gray-400 mb-2">📞 +34 676 786 232</p>
          <p className="text-gray-400">📧 ggtdigitals@gmail.com</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GgT Digital – {t('footer.copyrigth.description')}
      </div>
    </footer>
  );
}
