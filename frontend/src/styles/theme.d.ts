import '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Theme {
        recordColor: {
            practice: string;
            newRecord: string;
        },
        fontColor: {
            black: string,
            grey: string,
            blue: string,
            skyblue: string,
            error: string,
        },
        fontStyle: {
            ellipsis: string;
            subhead: string;
            label: string;
            information: string;
        },
        inputColor: {
            main: {
                bg: string;
                border: string;
                placeholder: string;
            }
            focus: {
                bg: string;
                border: string;
                placeholder: string;
            };
            active: {
                bg: string;
                border: string;
                placeholder: string;
            };
        },
        bgColor?: {
            default?: string;
            deep?: string;
        }
    }

    interface ThemeOptions {
        recordColor?: {
            practice?: string;
            newRecord?: string;
        },
        fontColor?: {
            black?: string,
            grey?: string,
            blue?: string,
            skyblue?: string,
            error?: string,
        },
        fontStyle?: {
            ellipsis?: string;
            subhead?: string;
            label?: string;
            information?: string;
        },
        inputColor?: {
            main?: {
                bg?: string;
                border?: string;
                placeholder?: string;
            }
            focus?: {
                bg?: string;
                border?: string;
                placeholder?: string;
            };
            active?: {
                bg?: string;
                border?: string;
                placeholder?: string;
            };
        },
        bgColor?: {
            default?: string;
            deep?: string;
        }
    }
}