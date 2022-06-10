import { FONT_BASIC, FONT_MEDIUM } from './../../styles/fonts';
import { styled } from "@mui/material";

export const StyledProfile = styled('div')`
    display: flex;
    align-items: center;
    gap: 12px;

    & dl {
        & dt {
            ${props => props.theme.fontStyle.subhead}
        }
        & dd {
            font-size: ${FONT_BASIC}px;
            color: ${props => props.theme.fontColor.grey};
        }
    }
`;