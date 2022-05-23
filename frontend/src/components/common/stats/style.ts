import { styled } from "@mui/material";

export const StyledGridRow = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const StyledDataBox = styled('dl')`
    & dt {
        
    }
    & dd {
        ${props => props.theme.fontStyle.label}
        color: ${props => props.theme.fontColor.grey};
    }
`;