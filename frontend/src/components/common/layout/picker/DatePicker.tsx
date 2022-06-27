import { createTheme, styled, TextField, ThemeProvider } from "@mui/material"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { useTheme } from "@emotion/react";
import { BG_NAVY, BG_WHITE, BOX_BLUE, BOX_GREYBLUE, BOX_NAVY, ERR_RED, POINT_YELLOW } from "../../../../styles/colors";
import { FONT_MEDIUM } from "../../../../styles/fonts";
import { height } from "@mui/system";

export default function DatePicker() {
    const [value, setValue] = useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const theme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: POINT_YELLOW,
                contrastText: BG_WHITE
            },
            error: {
                main: ERR_RED,
                contrastText: BG_WHITE
            },
            background: {
                default: BG_NAVY,
                paper: BOX_NAVY
            }
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        input: {
                            backgroundColor: `${BOX_GREYBLUE}`,
                            color: '#ffffff',
                            fontSize: `${FONT_MEDIUM}`,
                            padding: '0 12px',
                            height: '48px'
                        },
                        fieldset: {
                            border: 'none',
                        }
                    },
                }
            },
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker 
                    value={value} 
                    onChange={handleChange} 
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    )
}