import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil"
import { textState } from "./CharacterCount";
import styled from '@emotion/styled'
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { Cookies, CookiesProvider, useCookies } from "react-cookie";

const WidthSet = styled.div`
    display: flex;
    width: 100%;
`

const http = axios.create({ baseURL: 'http://localhost:4000/api' });

http.interceptors.request.use(
    req => {
        const tokens = new Cookies();

        console.log("토큰검사", tokens.get('accessToken'), tokens.get('refreshToken'));
        req.headers!['access-token'] = tokens.get('accessToken');
        req.headers!['refresh-token'] = tokens.get('refreshToken');
        return req;
    },
    err => {
        console.error(err);
        
    }
)

export default function TextInput() {
    const [text, setText] = useRecoilState(textState);
    const [user, setUser] = useState('');
    const [cookies] = useCookies(['accessToken', 'refreshToken']);

    const { isLoading, error, data } = useQuery<any, AxiosError, any>('getMe', async () => await http.get('/users/me'));

    const tokens = new Cookies();

    if (isLoading) {
        // return <h3>로딩중 token: {tokens.get('accessToken')}<br/>refresh: {tokens.get('refreshToken')} <br/><br /><p>cookies: {document.cookie}</p></h3>
        return <p>{document.cookie}</p>
    }

    if (error) {
        return <p>{document.cookie}</p>
    }
    
    return <WidthSet>성공 {JSON.stringify(data.data)}
        <br />
        width: {window.innerWidth}
    </WidthSet>
}