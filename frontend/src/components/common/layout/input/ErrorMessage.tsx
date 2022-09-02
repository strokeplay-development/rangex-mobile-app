import { styled } from "@mui/material";

interface ErrorMessageProps {
    message?: string;
}

const StyledError = styled('p')`
    color: ${props => props.theme.fontColor.error};
    text-align: right;
    margin-top: 2px;
`;

export default function ErrorMessage(props: ErrorMessageProps) {
    return (
        <StyledError>
            {props.message}
        </StyledError>
    );
}