import { useState } from 'react';

export const useSliders = <T>(initialValue: T) => {
    const [sliders, setSliders] = useState<T>(initialValue);

    const onChangeSliders = (propName: string, value: number | number[]) => {
        setSliders({
            ...sliders,
            [propName]: value
        });
    };

    return {sliders, onChangeSliders, setSliders};
}