import { atom } from 'recoil';
export interface User {
    userAccount?: string;
    name?: string;
    userPW?: string;

    id?: number;
    level?: number;
    nickName?: string;
    email?: string;
    dialingCode?: string;
    phoneNumber?: string;
    birthday?: string;
    gender?: number;
    address1?: string;
    address2?: string;
    zipCode?: string;
    lastLoginDate?: string;
}

export const me = atom<User>({
    key: 'me',
    default: {}
});