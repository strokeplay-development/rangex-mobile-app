import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom"

export default function SocialAuthPage() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log(params.entries());
    
      }, [location]);

    return (
        <div>??</div>
    )
}