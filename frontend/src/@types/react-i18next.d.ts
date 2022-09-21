import 'react-i18next';
import ko from '../locales/ko';
import en from '../locales/en';

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'main';
        resources: {
            more: typeof ko.more,
        };
    }
}