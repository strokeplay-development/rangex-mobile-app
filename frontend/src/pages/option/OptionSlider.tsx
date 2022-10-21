import { Slider, SliderProps, styled } from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { ICON_BLUE } from "../../styles/colors";
import { webviewPrint } from "../../utils";

const StyledSlider = styled(Slider)(({ theme }) => ({
    marginTop: 12,
    color: `${ICON_BLUE}`,

    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        backgroundColor: '#fff',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {

            },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: 0,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
}));

export default function OptionSlider(props: PropsWithChildren<SliderProps>) {
    return (
        <div style={{padding: '0 4px'}}>
            <StyledSlider 
                valueLabelDisplay="on" 
                name={props.name} 
                onChange={props.onChange}
                value={props.defaultValue || 0}
            />
        </div>
    );
};