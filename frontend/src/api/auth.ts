import instance from "."

interface VerifyPasswordProps {
    password?: string;
    userID?: number;
}

export const verifyPassword = async (payload: VerifyPasswordProps): Promise<boolean> => {
    const res = await instance.post('/users/password', payload);
    return res.data;
}