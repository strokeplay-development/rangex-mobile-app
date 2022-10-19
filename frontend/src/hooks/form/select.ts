import { webviewPrint } from './../../utils/webview';
import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export const useSelect = <T>(initialValue?: T | string | unknown) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: SelectChangeEvent<T>) => {
        setValue(e.target.value);

        webviewPrint(value);
    }

    return { value, onChange, setValue };
}