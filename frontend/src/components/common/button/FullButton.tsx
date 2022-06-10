import { Button, ButtonProps, styled } from "@mui/material";
import { BOX_BLUE } from "../../../styles/colors";

const getButton = (props: ButtonProps) => (
    <Button variant="contained" {...props}>{props.children}</Button>
);

export const StyledFullBtn = styled(getButton)`
    width: 100%;
    height: 48px;
    border: none;
    ${props => props.theme.fontStyle.subhead};
    background-color: ${BOX_BLUE};
    box-shadow: none;

    &:hover {
        background-color: ${BOX_BLUE};
    }
`;

export default function FullButton(props: ButtonProps) {
    return <StyledFullBtn {...props}/>
}