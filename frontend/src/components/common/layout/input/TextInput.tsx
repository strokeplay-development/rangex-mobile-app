import { styled } from "@mui/material";
import { ChangeEvent, FormEvent, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FONT_MEDIUM } from "../../../../styles/fonts";
import ErrorMessage from "./ErrorMessage";
import InputCover from "./InputCover";

export interface ValidateResult {
    isValid: boolean,
    // 유효하지 않으면 메시지보여주기
    message?: string
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    key?: string | number;
    label?: string;
    required?: boolean;
    validate?: (event: FormEvent<HTMLInputElement>) => ValidateResult;
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
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(e);

        /**
         * validations
         */

        let validateResult: ValidateResult = {
            isValid: true
        };

        if (!e.currentTarget.value) {
            validateResult.isValid = false;
            validateResult.message = 'Required.';
        }

        if (props.validate) {
            validateResult = props.validate(e);
        }

        setIsValid(validateResult.isValid);
        setError(validateResult.message);
    };

    const isOverMaxLength = (e: FormEvent<HTMLInputElement>) => {
        if (props.type !== 'number' || !props.maxLength) return;
        
        const value = e.currentTarget.value;
        if (value.length > props.maxLength) {
            e.currentTarget.value = value.slice(0, props.maxLength);
        }
    }

    const checkRequired = () => {
        if (!props.required) return;
        
        setIsValid(false);
        setError('Required.');
    }

    useEffect(() => {
        checkRequired();
    }, []);
    
    return (
        <InputCover label={props.label}>
            <StyledTextField>
                <div className="input-root">
                    <input
                        type={props.type || 'text'}
                        name={props.name}
                        defaultValue={props.defaultValue}
                        placeholder={props.label}
                        onInput={isOverMaxLength}
                        onChange={onChange}
                        onBlur={props.onBlur}
                        maxLength={props.maxLength}
                        minLength={props.minLength}
                    />
                </div>
            </StyledTextField>
            {
                isValid ? null : <ErrorMessage message={error}/>
            }
        </InputCover>
    );
}