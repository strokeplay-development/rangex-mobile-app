import { PropsWithChildren } from "react"
import { InputLabel, StyledField } from "../../../../styles";

interface InputCoverProps {
    label?: string;
}

export default function InputCover(props: PropsWithChildren<InputCoverProps>) {
    return (
        <StyledField>
            { props.label ? <InputLabel>{props.label}</InputLabel> : null }
            {props.children}
        </StyledField>
    );
}