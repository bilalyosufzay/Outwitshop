
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import tr from './locales/tr.json';
import fa from './locales/fa.json';
import af from './locales/af.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  tr: { translation: tr },
  fa: { translation: fa },
  af: { translation: af },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('preferred-language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
