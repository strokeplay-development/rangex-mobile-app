import instance from "."
import { User } from "../types";
import { webViewLog } from "../utils";

export const fetchMe = async (): Promise<User> => {
    const res = await instance.get('/users/me');
    return res.data;
}

export const modifyMe = async (userInfo: User): Promise<User> => {
    window.ResponseReceived?.postMessage(webViewLog('유저정보 수정하기'));
    const res = await instance.post('/users/me', userInfo);
    return res.data;
}