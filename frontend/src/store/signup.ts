import { atom } from 'recoil';
import { User } from '../types';

export const signupState = atom<User>({
    key: 'signup',
    default: {}
});