// src/pages/Contact.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías integrar un servicio de envío de correo
    setSubmitted(true);
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-screen md:h-[80vh] flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="videos/contact-bg.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 fade-in">{t('contact.title')}</h1>
          <p className="text-lg md:text-xl slide-up">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Contacto con mapa y formulario */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Izquierda: mapa + info */}
          <div className="space-y-6">
            {/* Mapa */}
            <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.123456789!2d-3.654321!3d36.432198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f8f123456789%3A0xabcdef123456789!2sUrbanizaci%C3%B3n%20Riviera%20del%20Sol!5e0!3m2!1ses!2ses!4v1699999999999!5m2!1ses!2ses"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Company Location"
              ></iframe>
            </div>

            {/* Información de contacto */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
              <h3 className="text-2xl font-bold mt-4 mb-2">{t('contact.contact.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300">{t('contact.contact.email')}: ggtdigitals@gmail.com</p>
              <p className="text-gray-700 dark:text-gray-300">{t('contact.contact.phone')}: +34 676 786 232</p>

              <h3 className="text-2xl font-bold mt-4 mb-2">{t('contact.hours.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300">{t('contact.hours.week')}: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-700 dark:text-gray-300">{t('contact.hours.weekendSaturday')}: 10:00 AM - 1:00 PM</p>
              <p className="text-gray-700 dark:text-gray-300">{t('contact.hours.weekendSunday')}</p>
            </div>
          </div>

          {/* Derecha: formulario */}
          <div>
            {submitted ? (
              <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-6 rounded-xl text-center shadow-md">
                <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
                <p>We received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <textarea
                  name="message"
                  placeholder={t('contact.form.message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={25}
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all">
                  {t('contact.form.button')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
