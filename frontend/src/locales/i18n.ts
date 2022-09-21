import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation Resources
import ko from './ko';
import en from './en';

export default i18n
.use(initReactI18next)
.init({
    resources: {
        ko, en
    },
    lng: 'ko',
    interpolation: {
        escapeValue: false
    }
});