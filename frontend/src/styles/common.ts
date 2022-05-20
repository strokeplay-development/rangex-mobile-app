import { styled } from "@mui/material";

export const Section = styled('section')`
    padding: 0 20px;
`;

export const BoxList = styled('ul')`
    & li {
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;