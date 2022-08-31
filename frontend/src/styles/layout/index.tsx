import { styled } from "@mui/material";

export const PageWithBox = styled('div')`
    min-height: 100vh;
    padding-bottom: 72px;
    background-color: ${props => props.theme.bgColor?.deep};

    & ul, section {
        margin-bottom: 16px;
    }
`;

export const SectionBox = styled('section')`
    padding: 20px;
    background-color: ${props => props.theme.bgColor?.default};
`