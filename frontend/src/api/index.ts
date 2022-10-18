import { webviewError, webviewLogout } from './../utils/webview';
import { Cookies } from 'react-cookie';
import axios, { AxiosResponse } from "axios";
import { HTTP_STATUS } from '../constants';

interface AxiosError {
    [key: string]: unknown;
    response?: AxiosResponse;
};

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
});

instance.interceptors.request.use(
    req => {
        const tokens = new Cookies();
        req.headers!['access-token'] = tokens.get('accessToken');
        req.headers!['refresh-token'] = tokens.get('refreshToken');
        return req;
    },
    err => {
        console.error(err);
        window.ResponseReceived.postMessage(JSON.stringify(err));
    }
);

instance.interceptors.response.use(
    res => {
        return res;
    }, 
    (err: AxiosError | undefined) => {
        if (err?.response?.status === HTTP_STATUS.UNAUTHORIZED) {            
            webviewError('<Unauthorized>' + JSON.stringify(err));
            webviewLogout('Unauthorized');
        }
    }
);

export default instance;