import { Button, ButtonProps, Paper, styled } from "@mui/material";
import { BOX_BLUE } from "./colors";

export const PageWithHeader = styled('div')`
    padding: 56px 20px 24px 20px;
    min-height: 100%;
    overflow: auto;
`;

export const Section = styled('section')`
    padding: 0 20px;
    margin-bottom: 24px;
`;

export const PaperBox = styled(Paper)`
    box-shadow: none;
    padding: 16px;
`;

export const BoxList = styled('ul')`
    & li {
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const BasicButton = styled((props: ButtonProps) => (<Button variant="contained" {...props}>{props.children}</Button>))`
    background-color: ${BOX_BLUE};
    box-shadow: none;

    &:hover {
        background-color: ${BOX_BLUE};
    }
`;


export const BottomFullButton = styled((props: ButtonProps) => (<Button variant="contained" {...props}>{props.children}</Button>))`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    border: none;
    box-shadow: none;
    font-weight: 600;
    border-radius: 0;
`;

export const FlexForm = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;
