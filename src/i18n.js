import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEs from './locales/es/translation.json';
import translationRUS from './locales/translationRUS.json';
import translationTR from './locales/translationTR.json';
//translations
const resources = {
    es: {
        translation: translationEs,
    },
    ru: {
        translation: translationRUS
    },
    en: {
        translation: {
            "Calendar": "Calendar",
            "Marketing": "Marketing",
            "Visit Mix": "Visit Mix",
            "P. Priority and Allocation": "P. Priority and Allocation",
            "Country": "Country"
        }
    },
    tr: {
        translation: translationTR
    }
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem("i18nextLng") || "en",
        fallbackLng: 'en', // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;

/*
import translationEs from './locales/es/translation.json';
//translations
const resources = {
    es: {
        translation: translationEs,
    },
    rus: {
        "Calendar": "Календарь"
    }
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en', // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
*/