import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import EN_TRANSLATION from './i18n/en.json';
import FR_TRANSLATION from './i18n/fr.json';
import PT_TRANSLATION from './i18n/pt.json';

export const SUPPORTED_LANGUAGES = ['en', 'pt', 'fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {translation: EN_TRANSLATION},
            pt: {translation: PT_TRANSLATION},
            fr: {translation: FR_TRANSLATION},
        },
        supportedLngs: SUPPORTED_LANGUAGES,
        fallbackLng: 'en',
        detection: {
            // The saved choice wins, then the browser language (so "pt-BR" becomes "pt").
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'mm-language',
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

// Keeps <html lang> in step with the page language, for screen readers and search engines.
i18n.on('languageChanged', (language) => {
    document.documentElement.lang = language;
});
document.documentElement.lang = i18n.resolvedLanguage ?? 'en';

export default i18n;
