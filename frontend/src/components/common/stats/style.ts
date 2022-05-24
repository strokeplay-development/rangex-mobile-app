import { styled } from "@mui/material";
import { StyledDataBoxProps } from ".";
import { FONT_LARGE } from "../../../styles/fonts";

export const StyledDataBox = styled('dl', { shouldForwardProp: (props => props !== 'highlight')})<StyledDataBoxProps>`
    flex: 1;

    & dt {
        font-size: ${FONT_LARGE + 'px'};
        font-weight: 600;
        color: ${props => props.highlight ? props.theme.palette.primary.main : null};
        line-height: 120%;
    }
    & dd {
        ${props => props.theme.fontStyle.label}
        color: ${props => props.theme.fontColor.grey};
    }
`;