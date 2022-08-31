import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { routeInfoList } from './../../routes/index';
import { isEmptyObject } from './../../utils/common';
import { me } from '../../store';
import { useCookies } from 'react-cookie';
import { fetchMe } from '../../api/user';

interface AuthorizeResult {
    isAuthorized: boolean;
    isAuthorizing: boolean;
}

export const useAuthorize = (currentPath?: string): AuthorizeResult => {
    let result: AuthorizeResult = {
        isAuthorized: true,
        isAuthorizing: false
    };

    const [user, setUser] = useRecoilState(me);
    const  isNoUser = isEmptyObject(user);
    const [tokens] = useCookies(['accessToken', 'refreshToken']);
    const { isLoading, data, isError, error } = useQuery('fetchMe', fetchMe, { enabled: isNoUser });

    // 갱신된 유저정보가 있으면
    // 인가처리
    if (isError) {
        window.WebviewMounted?.postMessage('<Error>' + JSON.stringify(error));
    }
    
    if (data) {
        window.WebviewMounted?.postMessage('<Fetched Me>');
        setUser(data);
        return result;
    }

    if (isLoading) {
        result.isAuthorizing = true;
        return result;
    }

    // 프라이빗 라우트가 아니면 인가처리
    const currentRoute = routeInfoList.find(route => route.path === currentPath);
    if (!currentRoute?.isPrivate) {
        window.WebviewMounted?.postMessage('<Route>' + JSON.stringify(currentRoute));
        return result;
    }

    // 토큰이 하나라도 없으면 미인가
    if (!(tokens.accessToken || tokens.refreshToken)) {
        result.isAuthorized = false;
        return result;
    }

    // 유저정보가 있는지 체크
    // 없으면 미인가
    result.isAuthorized = !isNoUser;

    return result;
}