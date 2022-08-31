export const PATHS = {
    SIGNUP: {
        REQUIRED: '/signup/required',
        OPTIONAL: '/signup/optional'
    },

    MAIN: {
        HOME: '/home',
        SWINGS: {
            LIST: '/swings',
            DATA: '/swings/:shotID'
        },
    },

    MORE: '/more',

    PROFILE: {
        ROOT: '/profile',
        NICKNAME: '/profile/nickname',
        OPTIONAL: '/profile/optional',
    },

    CLUBS: '/clubs',
    OPTIONS: '/options',
    JOIN: '/join',
    REDIRECT: {
        KAKAO: '/kakao/redirect',
        LOGOUT: '/logout/redirect'
    },
} as const;