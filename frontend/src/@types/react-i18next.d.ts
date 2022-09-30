import 'react-i18next';
import ko from '../locales/ko';
import en from '../locales/en';

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'main';
        resources: {
            common: typeof ko.common,
            more: typeof ko.more,
            main: typeof ko.main
        };
    }
}