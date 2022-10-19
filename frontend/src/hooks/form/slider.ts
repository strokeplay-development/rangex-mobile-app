import { useState } from 'react';

export const useSliders = (initialValue = {}) => {
    const [sliders, setSliders] = useState(initialValue);

    const onChangSliders = (propName: string, value: number | number[]) => {
        setSliders({
            ...sliders,
            [propName]: value
        });
    };

    return {sliders, onChangSliders, setSliders};
}