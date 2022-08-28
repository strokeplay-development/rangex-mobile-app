import { Cookies } from 'react-cookie';
import axios from "axios";

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
    }
);

instance.interceptors.response.use(res => {
    window.WebviewMounted?.postMessage(res);
    return res;
}, (err) => {
    window.WebviewMounted?.postMessage(err);
});

export default instance;