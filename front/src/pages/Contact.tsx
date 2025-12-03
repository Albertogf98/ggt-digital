// src/pages/Contact.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../themes/ThemeProvider';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { builder } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(import.meta.env.VITE_SERVICE, import.meta.env.VITE_TEMPLATE, formData, import.meta.env.VITE_KEY);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(t('contact.form.error') || 'Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-x-hidden" id="contact" style={{ backgroundColor: builder.cardBg, color: builder.textColor }}>
      {/* Hero */}
      <section className="relative h-[90vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/contact-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5
        </video>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">{t('contact.title')}</h1>
          <p className="text-white sm:text-lg md:text-xl">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Contacto con mapa y formulario */}
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Izquierda: mapa + info */}
          <div className="space-y-6">
            {/* Mapa */}
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.123456789!2d-3.654321!3d36.432198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f8f123456789%3A0xabcdef123456789!2sUrbanizaci%C3%B3n%20Riviera%20del%20Sol!5e0!3m2!1ses!2ses!4v1699999999999!5m2!1ses!2ses"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Company Location"
                style={{ borderColor: builder.border }}
              ></iframe>
            </div>

            {/* Información de contacto */}
            <div style={{ backgroundColor: builder.cardBg, color: builder.textColor }} className="p-4 sm:p-6 rounded-xl shadow-md space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">{t('contact.contact.title')}</h3>
              <p>{t('contact.contact.email')}: ggtdigitals@gmail.com</p>
              <p>{t('contact.contact.phone')}: +34 676 786 232</p>

              <h3 className={`text-xl sm:text-2xl font-bold mt-4 ${builder.heading}`}>{t('contact.hours.title')}</h3>
              <p>{t('contact.hours.week')}: 8:00 AM - 6:00 PM</p>
              <p>{t('contact.hours.weekendSaturday')}: 10:00 AM - 1:00 PM</p>
              <p>{t('contact.hours.weekendSunday')}</p>
            </div>
          </div>

          {/* Derecha: formulario */}
          <div>
            {submitted ? (
              <div style={{ backgroundColor: builder.inputBg, color: builder.textColor }} className="p-4 sm:p-6 rounded-xl text-center shadow-md space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold">{t('contact.form.message_after.title')}</h3>
                <p>{t('contact.form.message_after.message')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: builder.inputBg,
                    color: builder.textColor,
                    borderColor: builder.border,
                  }}
                  className="w-full p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: builder.inputBg,
                    color: builder.textColor,
                    borderColor: builder.border,
                  }}
                  className="w-full p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <textarea
                  name="message"
                  placeholder={t('contact.form.message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    backgroundColor: builder.inputBg,
                    color: builder.textColor,
                    borderColor: builder.border,
                  }}
                  className="w-full p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: builder.button, color: builder.textColor }}
                  className="font-semibold px-6 py-3 rounded-full shadow-md hover:brightness-110 transition-all"
                >
                  {loading ? t('contact.form.sending') || 'Enviando...' : t('contact.form.button')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
