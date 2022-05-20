import { PaletteOptions, ThemeOptions } from "@mui/material";
import { BG_NAVY, BG_WHITE, BOX_NAVY, ERR_RED, POINT_YELLOW, REC_NEW_RECOTD, REC_PRACTICE, TXT_BLACK, TXT_BLUE, TXT_GREY } from "./colors";
import { FONT_BASIC, FONT_SMALL } from "./fonts";

export const reset: ThemeOptions = {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ul: {
                    listStyleType: 'none',
                    margin: 0,
                    padding: 0
                },
                dl: {
                    margin: 0
                },
                dd: {
                    margin: 0
                },
                p: {
                    margin: 0,
                    fontSize: FONT_BASIC,
                    lineHeight: '140%'
                }
            }
        }
    }
}

export const base: ThemeOptions = {
    fontStyle: {
        label: `font-size: ${FONT_SMALL}px; font-weight: 400;`
    }
}

export const darkPalette: PaletteOptions = {
    primary: {
        main: POINT_YELLOW,
        contrastText: BG_WHITE
    },
    // secondary: {
    //     main: ''
    // },
    error: {
        main: ERR_RED,
        contrastText: BG_WHITE
    },
    // warning: {
    //     main: ''
    // },
    // info: {
    //     main: ''
    // },
    // success: {
    //     main: ''
    // },
    background: {
        default: BG_NAVY,
        paper: BOX_NAVY
    }
}

export const darkColors: ThemeOptions = {
    recordColor: {
        newRecord: REC_NEW_RECOTD,
        practice: REC_PRACTICE
    },
    fontColor: {
        black: TXT_BLACK,
        grey: TXT_GREY,
        blue: TXT_BLUE,
    },
}