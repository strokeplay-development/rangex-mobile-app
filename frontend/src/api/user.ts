import instance from "."
import { User } from "../recoil/user";

export const fetchMe = async (): Promise<User> => {
    const res = await instance.get('/users/me');
    return res.data;
}