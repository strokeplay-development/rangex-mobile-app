import { ClubOptions, UserConfig } from './../types/config/index';
import instance from "."
import { User } from "../types";

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
 * 나의 클럽설정 가져오기
 */
export const fetchClubOptions = async (configName: string): Promise<ClubOptions> => {
    const res = await instance.get('/users/me/configs', {
        params: {
            fieldName: configName
        }
    });
    return JSON.parse(res.data[configName]);
};

/**
 * 나의 연습설정 가져오기
 */
export const fetchPracticeOptions = async (): Promise<UserConfig> => {
    const res = await instance.get<UserConfig>('/users/me/configs', {
        params: { fieldName: 'options' }
    });

    res.data.options = res.data.options ? JSON.parse(res.data.options as string) : undefined;
    return res.data;
}

/**
 * 나의 설정 수정하기
 */
export const modifyConfigs = async (userConfig?: UserConfig): Promise<UserConfig> => {
    const res = await instance.put('/users/me/configs', userConfig);

    return {
        ...res.data,
        options: res.data.options ? JSON.parse(res.data.options) : undefined,
        clbus: res.data.clubs ? JSON.parse(res.data.clubs) : undefined,
    }
}