import { atom, selector, useRecoilValue } from "recoil";

export const textState = atom({
    key: 'textState',
    default: '',
});

const charCountState = selector({
    key: 'charCountState',
    get: ({ get }) => {
        const text = get(textState);

        return text.length;
    }
});

export default function CharacterCount() {
    const count = useRecoilValue(charCountState);
    return (
        <>Character Count: {count}</>
    )
}