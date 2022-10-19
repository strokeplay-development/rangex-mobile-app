import { webviewError, webviewPrint } from './../../utils/webview';
import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";

/**
 * Use Input
 */
type UseInputSetterOrUpdater<T> = SetterOrUpdater<T> | Dispatch<SetStateAction<T>>

export const useInput = <T>(input: T, setInput:  UseInputSetterOrUpdater<T>) => {
    const [valueState, setValueState] = useState()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(`${name}: ${value}`, input);
        
        setInput({
            ...input,
            [name]: value
        });
    }

    return {
        inputValues: input,
        setInputValues: setInput,
        onChange
    }
}


export const useInputs = (initialValue = {}) => {
    const [valueState, setValueState] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        webviewPrint(valueState);
        
        setValueState({
            ...valueState,
            [name]: value
        });
    }

    return {
        value: valueState,
        onChange,
        setValue: setValueState
    }
};

interface InputValidateResult {
    isValid?: boolean;
    message?: string;
}

export type InputValidator = (val?: string) => InputValidateResult;

/**
 * Use TextInput
 */
export const useTextInput = (initialValue?: string, validator?: InputValidator) => {
    const [value, setValue] = useState(initialValue);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.currentTarget.value);
    }

    let validResult: InputValidateResult = {
        isValid: true
    }

    if (validator) {
        validResult = validator(value);
    }

    return {value, setValue, onChange, ...validResult};
}

/**
 * Use Modal
 */
type UseModalResult = [
    boolean, () => void, () => void
];

export const useModal = (): UseModalResult => {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        // 모달 상태가 변경사항을 앱으로 전달함.
        window.ModalStateChanged?.postMessage(JSON.stringify(isOpen));
    }, [isOpen]);

    return [
        isOpen,
        () => setOpen(true),
        () => setOpen(false)
    ];
}