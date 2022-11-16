import { PracticeOverview } from './../types/shot/index';
import instance from ".";

export const fetchOverview = async (): Promise<PracticeOverview> => {
    const res = await instance.get<PracticeOverview>('/users/me/overview');
    return res.data;
};

export const downloadShotVideo = async (url: string) => {
    const res = await instance.get('/users/me/shot/video', {
        params: { fileUrl: url }
    });
    return res.data;
};