import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_TRANSLATION from './i18n/en.json';
import FR_TRANSLATION from './i18n/fr.json';
import PT_TRANSLATION from './i18n/pt.json';

const resources = {
  en: {
    translation: EN_TRANSLATION
  },
  fr: {
    translation: FR_TRANSLATION
  },
  pt: {
    translation: PT_TRANSLATION
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    lng: localStorage.getItem('mm-language'),

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;