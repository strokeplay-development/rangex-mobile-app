import { MenuItem, Select, SelectProps, styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { ICON_GREY } from "../../../../styles/colors";

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
    return (
        <StyledSelect
            size="small" 
            displayEmpty
            defaultValue="45"
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