import { MenuItem, Select, SelectProps, styled } from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { ICON_GREY } from "../../../../styles/colors";
import { webviewPrint } from "../../../../utils";

type OptionSelectProps = SelectProps & { menus: number[] }

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-outlined': {
        backgroundColor: theme.inputColor.main.bg,
        outline: 'none'
    },

    'fieldset': {
        border: 'none'
    }
}));

export default function OptionSelect(props: PropsWithChildren<OptionSelectProps>) {
    useEffect(() => {
        webviewPrint(props.defaultValue);
    }, [props.defaultValue]);
    return (
        <StyledSelect
            size="small" 
            displayEmpty
            value={props.defaultValue || 25}
            onChange={props.onChange}
        >
            {
                props.menus.map((menu, idx) => (
                    <MenuItem 
                        key={idx} 
                        value={menu}
                        sx={{
                            '&.Mui-selected:hover': {
                                backgroundColor: `${ICON_GREY}`
                            }
                        }}
                    >
                        {menu}
                    </MenuItem>
                ))
            }
        </StyledSelect>
    )
}