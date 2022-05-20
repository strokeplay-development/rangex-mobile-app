import { atom } from "recoil";

export type ThemeMode = 'dark' | 'light';

export const themeModeState = atom<ThemeMode>({
    key: 'themeMode',
    default: 'dark'
});