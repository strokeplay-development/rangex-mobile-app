import { atom } from 'recoil';
import { User } from '../types';

export const me = atom<User>({
    key: 'me',
    default: {}
});