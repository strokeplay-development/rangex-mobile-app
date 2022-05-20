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
        },
        fontStyle: {
            label: string;
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
        },
        fontStyle?: {
            label?: string;
        }
    }
}