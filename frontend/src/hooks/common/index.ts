import { Dispatch, FormEvent, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

type UseInputSetterOrUpdater<T> = SetterOrUpdater<T> | Dispatch<SetStateAction<T>>

export const useInput = <T>(input: T, setInput:  UseInputSetterOrUpdater<T>) => {
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        
        setInput({
            ...input,
            [name]: value
        });
    }

    return {
        inputValues: input,
        setInputValue: setInput,
        onChange
    }
}