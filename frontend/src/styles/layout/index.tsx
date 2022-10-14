import { styled } from "@mui/material";
import { BOX_NAVY } from "../colors";

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

export const DialogBox = styled('div')`
    padding: 20px 24px;
    background-color: ${BOX_NAVY};

    & h2 {
        text-align: center;
    }

    & .content {
        margin: 24px 0;
        
        & p {
            text-align: center;
        }
    }

    & .actions {
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }

`;