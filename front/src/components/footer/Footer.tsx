// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LINKS } from '../../constants/links';
import { useTheme } from '../../themes/ThemeProvider';

// Redes sociales
const socialLinks = [
  {
    href: 'https://www.google.com/search?sca_esv=c5d665130b0b830b&hl=es&authuser=1&sxsrf=AE3TifOKsDeUucLbqmZnbv2C8jCxLzTJJw:1761829485628&kgmid=/g/11ylr6zsl3&q=GgT+Digital&shndl=30&shem=dafa,lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=a575e082fed4e60e&utm_source=dafa,lcuae,uaasie,shrtsdl,sh/x/loc/uni/m1/1',
    label: 'Google',
    icon: 'fa-google',
  },
  { href: 'https://www.instagram.com/ggt_digital/', label: 'Instagram', icon: 'fa-instagram' },
  { href: 'https://www.linkedin.com/company/109755566', label: 'LinkedIn', icon: 'fa-linkedin-in' },
  { href: 'https://ggtdigitals.com/', label: 'WordPress', icon: 'fa-wordpress' },
];

// Columna genérica
function FooterColumn({ title, children, builder }: { title: string; children: React.ReactNode; builder: any }) {
  return (
    <div className="text-center sm:text-left">
      <h3 className="text-lg font-semibold mb-3" style={{ color: builder.heading }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const { builder } = useTheme();

  const services = t('footer.services.ourServices', { returnObjects: true }) as string[];

  return (
    <footer style={{ backgroundColor: builder.cardBg, color: builder.textColor }} className="pt-10 pb-6 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Columna 1 - Marca */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold mb-3" style={{ color: builder.heading }}>
            GgT Digital
          </h2>
          <p style={{ color: builder.textColor }} className="mb-5">
            {t('footer.brand.description')}
          </p>
          <div className="flex justify-center sm:justify-start gap-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:brightness-110`}
                style={{ color: builder.textColor }}
              >
                <i className={`text-lg fa-brands ${link.icon}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Columna 2 - Enlaces rápidos */}
        <FooterColumn title={t('footer.fastLinks.title')} builder={builder}>
          <ul className="space-y-1 list-none">
            {LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{ color: builder.textColor }}
                  className="transition-colors hover:brightness-110 no-underline"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Columna 3 - Servicios */}
        <FooterColumn title={t('footer.services.title')} builder={builder}>
          <ul className="space-y-1 list-none">
            {services.map(service => (
              <li key={service} style={{ color: builder.textColor }}>
                {service}
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Columna 4 - Contacto */}
        <FooterColumn title={t('footer.contact.title')} builder={builder}>
          <ul className="space-y-1 list-none">
            <li>📍 Málaga, {t('footer.contact.country')}</li>
            <li>📞 +34 676 786 232</li>
            <li>📧 ggtdigitals@gmail.com</li>
          </ul>
        </FooterColumn>
      </div>

      {/* Línea inferior */}
      <div className="border-t mt-8 pt-4 text-center text-xs sm:text-sm" style={{ borderColor: builder.border, color: builder.textColor }}>
        © {new Date().getFullYear()} {t('brand')} — {t('footer.copyrigth.description')}
      </div>
    </footer>
  );
}
