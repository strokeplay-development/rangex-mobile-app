import { ClubOptions } from './../types/config/index';
import { AxiosResponse } from 'axios';
import instance from "."
import { User } from "../types";
import { webViewLog } from "../utils";

/**
 * 내 정보 가져오기
 */
export const fetchMe = async (): Promise<User> => {
    const res = await instance.get('/users/me');
    return res.data;
}

/**
 * 내 정보 수정하기
 */
export const modifyMe = async (userInfo: User): Promise<User> => {
    const res = await instance.post('/users/me', userInfo);
    return res.data;
}


/**
 * 나의 설정 가져오기
 */
export const fetchConfigs = async (config: string): Promise<ClubOptions> => {
    const res = await instance.get('/users/me/configs', {
        params: {
            fieldName: config
        }
    });
    return JSON.parse(res.data.clubs);
}