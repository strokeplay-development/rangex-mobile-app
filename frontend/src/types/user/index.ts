import { UserConfig } from './../config/index';
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
    city?: string;
    state?: string;
    zipCode?: string;
    lastLoginDate?: string;
    inChannel?: string;
    profileImg?: string;

    // Associations
    UserConfig?: UserConfig;
}