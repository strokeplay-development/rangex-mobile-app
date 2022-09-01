import { PropsWithChildren } from "react"
import { InputLabel, StyledField } from "../../../../styles";

interface InputCoverProps {
    label?: string;
}

export default function InputCover(props: PropsWithChildren<InputCoverProps>) {
    return (
        <StyledField>
            <InputLabel>{props.label}</InputLabel>
            {props.children}
        </StyledField>
    );
}