import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getQueryJSON } from "../utils";

interface KakaoAuthQueries {
    code?: string;
}

export default function SocialAuthPage() {
    const location = useLocation();
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        const query: KakaoAuthQueries = getQueryJSON(location);
        window.SocialLogin?.postMessage(query.code);

        setMessage(JSON.stringify(getQueryJSON(location)));
    }, []);

    return (
        <div>{'Kakao Talk Authenticating...'}</div>
    )
}