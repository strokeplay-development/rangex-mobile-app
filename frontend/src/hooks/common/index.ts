import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";

/**
 * Use Input
 */
type UseInputSetterOrUpdater<T> = SetterOrUpdater<T> | Dispatch<SetStateAction<T>>

export const useInput = <T>(input: T, setInput:  UseInputSetterOrUpdater<T>) => {
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