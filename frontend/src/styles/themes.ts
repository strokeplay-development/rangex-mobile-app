import { PaletteOptions, ThemeOptions } from "@mui/material";
import { BG_NAVY, BG_WHITE, BOX_BLUE, BOX_GREYBLUE, BOX_NAVY, ERR_RED, ICON_BLUE, POINT_YELLOW, REC_NEW_RECOTD, REC_PRACTICE, TXT_BLACK, TXT_BLUE, TXT_GREY } from "./colors";
import { FONT_BASIC, FONT_LARGE, FONT_MEDIUM, FONT_SMALL } from "./fonts";

// 기본 CSS값 리셋
export const reset: ThemeOptions = {
    components: {
        MuiGrid: {
            styleOverrides: {
                container: {
                    padding: 0,
                    margin: 0
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                h2: {
                    fontSize: FONT_LARGE,
                    fontWeight: 600,
                    margin: 0
                },
                h3: {
                    fontSize: FONT_MEDIUM,
                    fontWeight: 600,
                    margin: 0
                },
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
                },
                input: {
                    margin: 0
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
        ellipsis: `
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
        `,
        subhead: `font-size: ${FONT_MEDIUM}px; font-weight: 600;`,
        label: `font-size: ${FONT_SMALL}px; font-weight: 500;`,
        information: `font-size: ${FONT_MEDIUM}px; font-weight: 500`
    }
}

/**
 * Dark Themes
 */

// 색상 값들 (MUI 컴포넌트에도 적용됨)
export const darkPalette: PaletteOptions = {
    primary: {
        main: BOX_BLUE,
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
    inputColor: {
        main: {
            bg: BOX_GREYBLUE
        },
        focus: {
            border: ICON_BLUE
        },
        active: {

        }
    }
}