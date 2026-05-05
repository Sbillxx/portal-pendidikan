import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from './locales/en/translation.json';
import idTranslation from './locales/id/translation.json';
import arTranslation from './locales/ar/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation
    },
    id: {
      translation: idTranslation
    },
    ar: {
      translation: arTranslation
    }
  },
  lng: 'id', // Bahasa default, misal Indonesia
  fallbackLng: 'id', // Jika tidak ada terjemahan, fallback ke Inggris
  interpolation: {
    escapeValue: false // React sudah menangani escaping
  }
});

export default i18n;
