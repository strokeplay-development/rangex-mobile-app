import { AxiosResponse } from 'axios';
import instance from "."

interface VerifyPasswordPayload {
    password?: string;
    userID?: number;
}

interface ChangePasswordPayload extends VerifyPasswordPayload {
    userPW?: string;
}

interface RequestAuthCodePayload {
    dialingCode?: string;
    phoneNumber?: string;
}

interface VerifyAuthCodePayload extends RequestAuthCodePayload {
    authCode?: string;
}

interface RequestAuthCodeResponse {
    requestId: string;
    requestTime: string;
    statusCode: string;
    statusName: string;
}

export const verifyPassword = async (payload: VerifyPasswordPayload): Promise<boolean> => {
    const res = await instance.post('/users/password', payload);
    return res.data;
}

export const changePassword = async (payload: ChangePasswordPayload): Promise<AxiosResponse<void>> => {
    const res = await instance.put('/users/password', payload);
    return res.data;
}

export const requestAuthCode = async (payload: RequestAuthCodePayload): Promise<RequestAuthCodeResponse> => {
    const res = await instance.post('/users/phone/code', payload);
    return res.data;
}

export const verifyAuthCode = async (payload: VerifyAuthCodePayload): Promise<void> => {
    const res = await instance.post('/users/phone/', payload);
    return res.data;
}
