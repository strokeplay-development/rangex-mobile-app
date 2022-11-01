import { PracticeOptions } from './../../types/config/index';
import { myUnits } from './../../store/user';
import { useSetRecoilState } from 'recoil';
import { webviewError, webviewPrint } from './../../utils/webview';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { routeInfoList } from './../../routes/index';
import { isEmptyObject, webViewLog } from './../../utils';
import { me } from '../../store';
import { Cookies, useCookies } from 'react-cookie';
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
    const setMeasureUnits = useSetRecoilState(myUnits);
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
    if (!(tokens.accessToken && tokens.refreshToken)) {
        // 유저정보 삭제
        setUser({});
        
        result.isAuthorized = false;
        return result;
    }
    
    // 인가할 회원정보가 없는 경우 회원정보를 가져옴
    if (isNoUser) {
        // 유저 정보를 가져오는 중
        if (isLoading) {
            result.isAuthorizing = true;
            return result;
        }
        
        // 유저정보를 가져오는데 성공하면 인가
        if (data) {
            // 측정단위 셋팅
            if (data.UserConfig?.options) {
                const options = JSON.parse(data.UserConfig.options as string) as PracticeOptions;
                setMeasureUnits({
                    SpeedType: options.SpeedType,
                    DistanceType: options.DistanceType
                });
            }

            // 유저데이터 갱신
            setUser(data);

            result.isAuthorized = true;
            return result;
        }

    }

    result.isAuthorized = true;

    return result;

    // return {
    //     isAuthorizing: false,
    //     isAuthorized: true
    // }
}