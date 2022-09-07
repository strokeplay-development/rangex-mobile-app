import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { routeInfoList } from './../../routes/index';
import { isEmptyObject } from './../../utils/common';
import { me } from '../../store';
import { useCookies } from 'react-cookie';
import { fetchMe } from '../../api/user';
import { useLocation } from 'react-router-dom';

interface AuthorizeResult {
    isAuthorized?: boolean;
    isAuthorizing: boolean;
}

/**
 * 인가처리 확인
 */
export const useAuthorize = (): AuthorizeResult => {
    const { pathname: currentPath } = useLocation();
    const [user, setUser] = useRecoilState(me);
    const [tokens] = useCookies(['accessToken', 'refreshToken']);
    
    const  isNoUser = isEmptyObject(user);
    const { isLoading, data } = useQuery('fetchMe', fetchMe, { enabled: isNoUser });
    
    let result: AuthorizeResult = {
        isAuthorizing: false,
        isAuthorized: !isNoUser
    };

    // 프라이빗 라우트가 아니면 인가처리
    const currentRoute = routeInfoList.find(route => route.path === currentPath);
    if (!currentRoute?.isPrivate) {
        result.isAuthorized = true;
        return result;
    }

    // 토큰이 하나라도 없으면 미인가
    if (!(tokens.accessToken || tokens.refreshToken)) {
        result.isAuthorized = false;
        return result;
    }

    if (isLoading) {
        result.isAuthorizing = true;
        return result;
    }
    
    // 갱신된 유저정보가 있으면
    // 인가처리
    if (data) {
        setUser(data);
        result.isAuthorized = true;
    }

    return result;
}