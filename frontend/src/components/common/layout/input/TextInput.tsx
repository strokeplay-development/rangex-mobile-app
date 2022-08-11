import { styled } from "@mui/material";
import { FormEvent, InputHTMLAttributes } from "react";
import { FONT_MEDIUM } from "../../../../styles/fonts";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const StyledTextField = styled('div')`
    position: relative;
    width: 100%;
    background-color: ${props => props.theme.inputColor.main.bg};
    border-radius: 4px;
    flex: 1;
    
    & label {
        ${props => props.theme.fontStyle.ellipsis}
        position: absolute;
        color: ${props => props.theme.fontColor.grey};
        font-size: ${FONT_MEDIUM}px;
        transform-origin: top left;
        transform: translate(14px, 12px);
    }

    & .input-root {
        width: 100%;
        & input {
            padding: 0 12px;
            width: 100%;
            border: none;
            font-size: ${FONT_MEDIUM}px;
            display: flex;
            align-items: center;
            height: 48px;
            background-color: transparent;

            &::placeholder {
                color: ${props => props.theme.fontColor.grey};
            }

            &:focus {
                outline-color: ${props => props.theme.inputColor.focus.border};
            }
        }
    }

`;

export default function TextInput(props: TextInputProps) {
    const isNumberOverMaxLength = (e: FormEvent<HTMLInputElement>) => {
        if (props.type !== 'number' || !props.maxLength) return;
        
        const value = e.currentTarget.value;
        if (value.length > props.maxLength) {
            e.currentTarget.value = value.slice(0, props.maxLength);
        }
    }
    
    return (
        <StyledTextField>
            <div className="input-root">
                <input 
                    type={props.type || 'text'}
                    name={props.name}
                    placeholder={props.label}
                    onInput={isNumberOverMaxLength}
                    onChange={props.onChange}
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                />
            </div>
        </StyledTextField>
    );
}