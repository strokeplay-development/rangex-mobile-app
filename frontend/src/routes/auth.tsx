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
    }, [location]);

    return (
        <div>{'Kakao Talk Authenticating...'}</div>
    )
}