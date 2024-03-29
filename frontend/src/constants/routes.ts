export const PATHS = {
    SIGNUP: {
        PHONE: '/signup/phone',
        REQUIRED: '/signup/required',
        OPTIONAL: '/signup/optional'
    },

    MAIN: {
        HOME: '/home',
        SWINGS: {
            LIST: '/swings',
            DATA: '/swings/:shotID',
            VIDEO: '/swings/:shotID/video'
        },
    },

    MORE: '/more',

    PROFILE: {
        ROOT: '/profile',
        NICKNAME: '/profile/nickname',
        OPTIONAL: '/profile/optional',
        PASSWORD: '/profile/password'
    },

    CLUBS: '/clubs',
    OPTIONS: '/options',
    JOIN: '/join',
    LANG: '/language',
    REDIRECT: {
        KAKAO: '/kakao/redirect',
        LOGOUT: '/logout/redirect'
    },
} as const;