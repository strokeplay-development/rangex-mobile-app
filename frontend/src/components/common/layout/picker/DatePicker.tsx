import { createTheme, styled, TextField, TextFieldProps, ThemeProvider } from "@mui/material"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { BG_NAVY, BG_WHITE, BOX_GREYBLUE, BOX_NAVY, ERR_RED, POINT_YELLOW } from "../../../../styles/colors";
import { FONT_MEDIUM } from "../../../../styles/fonts";
import dayjs, { Dayjs } from "dayjs";

export type TDateValue = Dayjs | null;

interface DatePickerProps {
    onChange: (value: TDateValue) => void;
    defaultValue?: TDateValue
}

export default function DatePicker(props: DatePickerProps) {
    const [value, setValue] = useState<TDateValue>();

    const onDateChange = (newValue?: TDateValue) => {
        setValue(newValue);
        
        if (value !== null) {
            props.onChange(dayjs(newValue));
        }
    };

    const onRenderInput = (props: TextFieldProps) => {
        return <TextField {...props}/>;
    }

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

    useEffect(() => {
        onDateChange(props.defaultValue);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker 
                    value={value} 
                    onChange={onDateChange} 
                    renderInput={onRenderInput}
                />
            </LocalizationProvider>
        </ThemeProvider>
    )
}