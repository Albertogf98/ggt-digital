import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LINKS } from '../../constants/links';

// Redes sociales
const socialLinks = [
  {
    href: 'https://www.google.com/search?sca_esv=c5d665130b0b830b&hl=es&authuser=1&sxsrf=AE3TifOKsDeUucLbqmZnbv2C8jCxLzTJJw:1761829485628&kgmid=/g/11ylr6zsl3&q=GgT+Digital&shndl=30&shem=dafa,lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=a575e082fed4e60e&utm_source=dafa,lcuae,uaasie,shrtsdl,sh/x/loc/uni/m1/1',
    label: 'Google',
    icon: 'fa-google',
    color: 'hover:text-gray-400 text-gray-400',
  },
  { href: 'https://www.instagram.com/ggt_digital/', label: 'Instagram', icon: 'fa-instagram', color: 'hover:text-gray-400 text-gray-400' },
  { href: 'https://www.linkedin.com/company/109755566', label: 'LinkedIn', icon: 'fa-linkedin-in', color: 'hover:text-gray-400 text-gray-400' },
  { href: 'https://ggtdigitals.com/', label: 'WordPress', icon: 'fa-wordpress', color: 'hover:text-gray-400 text-gray-400' },
];

// Columna genérica
function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="text-center sm:text-left">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const services = t('footer.services.ourServices', { returnObjects: true }) as string[];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Columna 1 - Marca */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-3">GgT Digital</h2>
          <p className="text-gray-400 mb-5">{t('footer.brand.description')}</p>
          <div className="flex justify-center sm:justify-start gap-4">
            {socialLinks.map((link, i) => (
              <a key={i} href={link.href} aria-label={link.label} className={`transition-colors ${link.color}`} target="_blank" rel="noopener noreferrer">
                <i className={`text-lg fa-brands ${link.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Columna 2 - Enlaces rápidos */}
        <FooterColumn title={t('footer.fastLinks.title')}>
          <ul className="space-y-1">
            {LINKS.map(link => (
              <li key={link.to}>
                <Link to={link.to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors no-underline">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Columna 3 - Servicios */}
        <FooterColumn title={t('footer.services.title')}>
          <ul className="space-y-1 text-gray-400">
            {services.map(service => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </FooterColumn>

        {/* Columna 4 - Contacto */}
        <FooterColumn title={t('footer.contact.title')}>
          <ul className="space-y-1 text-gray-400">
            <li>📍 Málaga, {t('footer.contact.country')}</li>
            <li>📞 +34 676 786 232</li>
            <li>📧 ggtdigitals@gmail.com</li>
          </ul>
        </FooterColumn>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} GgT Digital — {t('footer.copyrigth.description')}
      </div>
    </footer>
  );
}
