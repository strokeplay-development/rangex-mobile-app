import { styled } from "@mui/material";

export const StyledSectionHeader = styled('header')`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h3 {
        // Subhead style
        ${props => props.theme.fontStyle.subhead}
    }
`;