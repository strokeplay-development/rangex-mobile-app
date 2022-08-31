import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { getQueryJSON } from "../utils";

interface KakaoAuthQueries {
    code?: string;
}

export const SocialAuthPage: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const query: KakaoAuthQueries = getQueryJSON(location);
        window.SocialLogin?.postMessage(query.code);
    }, []);

    return (
        <div>{'Kakao Talk Authenticating...'}</div>
    )
}

export const LogoutRedirected: React.FC = () => {
    const logout = () => {
        window.LogoutRequested?.postMessage('logout');
    }

    return (
        <div>
            <button onClick={logout}>로그인 화면으로 돌아가기</button>
        </div>
    )
}