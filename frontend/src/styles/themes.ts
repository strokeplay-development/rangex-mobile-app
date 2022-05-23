import { PaletteOptions, ThemeOptions } from "@mui/material";
import { BG_NAVY, BG_WHITE, BOX_NAVY, ERR_RED, POINT_YELLOW, REC_NEW_RECOTD, REC_PRACTICE, TXT_BLACK, TXT_BLUE, TXT_GREY } from "./colors";
import { FONT_BASIC, FONT_MEDIUM, FONT_SMALL } from "./fonts";

// 기본 CSS값 리셋
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

// BASE
// - 공통 기본값 새로 설정 
// - 커스텀 CSS 스타일 설정
export const base: ThemeOptions = {
    fontStyle: {
        subhead: `font-size: ${FONT_MEDIUM}px; font-weight: 600;`,
        label: `font-size: ${FONT_SMALL}px; font-weight: 500;`
    }
}

/**
 * Dark Themes
 */

// 색상 값들 (MUI 컴포넌트에도 적용됨)
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

// 커스텀 색상 값들
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