import { PracticeOverview } from './../types/shot/index';
import instance from ".";

export const fetchOverview = async (): Promise<PracticeOverview> => {
    const res = await instance.get<PracticeOverview>('/users/me/overview');
    return res.data;
};