import { Button, ButtonProps, Paper, styled } from "@mui/material";
import { BG_BLACK, BG_NAVY, BOX_BLUE } from "./colors";

export const InputLabel = styled('span')`
    display: block;
    margin-bottom: 8px;
    color: ${props => props.theme.fontColor.grey};
    font-size: 14px;
`;

export const PageWithHeader = styled('div')`
    padding: 56px 20px 72px 20px;
    min-height: 100%;
    overflow: auto;

    &.no_horizon_padding {
        padding-left: 0;
        padding-right: 0;
    }
`;

export const PageWithBlockSection = styled('div')`
    padding: 56px 0 72px 0;
    min-height: 100vh;
    overflow: auto;
    background-color: ${BG_BLACK};
    
    & section {
        padding: 24px 20px;
        background-color: ${BG_NAVY};
        margin-bottom: 16px;
    }
`

export const Section = styled('section')`
    padding: 0 20px;
    margin-top: 24px;
`;

export const PaperBox = styled(Paper)`
    box-shadow: none;
    padding: 16px;

    &.modal {
        padding: 24px 20px;

        & h2 {
            margin-bottom: 16px;
        }
        & p {
            ${props => props.theme.fontStyle.information};
            line-height: 160%;
        }
    }

    &.bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: calc(100%);
    }
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
    background-color: ${BOX_BLUE};
    z-index: 9999;

    &:hover {
        background-color: ${BOX_BLUE};
    }
`;

export const FlexForm = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;
