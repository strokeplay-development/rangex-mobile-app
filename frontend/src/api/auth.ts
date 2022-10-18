import { AxiosResponse } from 'axios';
import instance from "."

interface VerifyPasswordPayload {
    password?: string;
    userID?: number;
}

interface ChangePasswordPayload extends VerifyPasswordPayload {
    userPW?: string;
}

export const verifyPassword = async (payload: VerifyPasswordPayload): Promise<boolean> => {
    const res = await instance.post('/users/password', payload);
    return res.data;
}

export const changePassword = async (payload: ChangePasswordPayload): Promise<AxiosResponse<void>> => {
    const res = await instance.put('/users/password', payload);
    return res.data;
}

