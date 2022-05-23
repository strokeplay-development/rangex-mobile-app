import { styled } from "@mui/material";

export const StyledProfile = styled('div')`
    display: flex;
    align-items: center;
    gap: 12px;

    & dl {
        & dt {

        }
        & dd {
            ${props => props.theme.fontStyle.label}
            color: ${props => props.theme.fontColor.grey};
        }
    }
`;