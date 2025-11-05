import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LINKS } from '../../constants/links';

// Redes sociales
const socialLinks = [
  {
    href: 'https://www.google.com/search?sca_esv=c5d665130b0b830b&hl=es&authuser=1&sxsrf=AE3TifOKsDeUucLbqmZnbv2C8jCxLzTJJw:1761829485628&kgmid=/g/11ylr6zsl3&q=GgT+Digital&shndl=30&shem=dafa,lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=a575e082fed4e60e&utm_source=dafa,lcuae,uaasie,shrtsdl,sh/x/loc/uni/m1/1',
    label: 'Google',
    icon: 'fa-google',
    color: 'hover:text-gray-500',
  },
  { href: 'https://www.instagram.com/ggt_digital/', label: 'Instagram', icon: 'fa-instagram', color: 'hover:text-pink-500' },
  { href: 'https://www.linkedin.com/company/109755566', label: 'LinkedIn', icon: 'fa-linkedin-in', color: 'hover:text-blue-400' },
  { href: 'https://ggtdigitals.com/', label: 'Google', icon: 'fa-wordpress', color: 'hover:text-gray-500' },
];

// Componente para cada columna del footer
function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  const services = t('footer.services', { returnObjects: true }) as string[];

  return (
    <footer className="border-t border-gray-700 w-full bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Columna 1 - Marca */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">GgT Digital</h2>
          <p className="text-gray-400 mb-6">{t('footer.brand.description')}</p>
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} aria-label={link.label} className={`transition-colors ${link.color}`} target="_blank" rel="noopener noreferrer">
                <i className={`text-white fa-brands ${link.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Columna 2 - Enlaces rápidos */}
        <FooterColumn title={t('footer.fastLinks.title')}>
          <div className="space-y-1">
            {LINKS.map(link => (
              <div key={link.to}>
                <Link to={link.to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="no-underline text-gray-300 hover:text-white transition-colors">
                  {t(link.key)}
                </Link>
              </div>
            ))}
          </div>
        </FooterColumn>

        {/* Columna 3 - Servicios */}
        <FooterColumn title="Servicios">
          <ul className="space-y-2">
            {services.map(service => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </FooterColumn>

        {/* Columna 4 - Contacto */}
        <FooterColumn title={t('footer.contact.title')}>
          <p className="text-gray-400 mb-2">📍 Málaga, {t('footer.contact.country')}</p>
          <p className="text-gray-400 mb-2">📞 +34 676 786 232</p>
          <p className="text-gray-400">📧 ggtdigitals@gmail.com</p>
        </FooterColumn>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GgT Digital – {t('footer.copyrigth.description')}
      </div>
    </footer>
  );
}
