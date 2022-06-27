import { styled } from "@mui/material";
import { StyledDataBoxProps } from ".";
import { POINT_YELLOW } from "../../../styles/colors";
import { FONT_LARGE } from "../../../styles/fonts";

export const StyledDataBox = styled('dl', { shouldForwardProp: (props => props !== 'highlight')})<StyledDataBoxProps>`
    flex: 1;

    & dt {
        font-size: ${FONT_LARGE + 'px'};
        font-weight: 600;
        color: ${props => props.highlight ? `${POINT_YELLOW}` : null};
        line-height: 120%;
    }
    & dd {
        ${props => props.theme.fontStyle.label}
        color: ${props => props.theme.fontColor.grey};
    }
`;