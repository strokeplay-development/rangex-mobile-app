import { renderHook, waitFor } from "@testing-library/react";
import { useAuthorize } from "../../hooks";
import cookie from 'react-cookie';
import { mockQueryResult, privateRouterWrapper, publicRouterWrapper } from "../common";
import recoil from 'recoil';
import { User } from "../../types";
import * as query from "react-query";

const setupUseAuthorize = (wrapper: React.JSXElementConstructor<{children: React.ReactElement}>) => {
    return renderHook(() => useAuthorize(), {wrapper});
}

jest.mock('react-cookie', () => ({
    ...jest.requireActual('react-cookie')
}));

jest.mock('recoil', () => ({
    ...jest.requireActual('recoil')
}));

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
}));

const mockUser: User = {
    nickName: 'test'
}

describe('Hook: useAuthorize', () => {
    test('퍼블릭페이지는 인가', () => {
        const {result} = setupUseAuthorize(publicRouterWrapper);
        const {isAuthorizing, isAuthorized} = result.current;
        expect(isAuthorizing).toBe(false);
        expect(isAuthorized).toBe(true);
    });

    test('액세스토큰이 없으면 미인가', () => {
        const tokens = {
            accessToken: null,
            refreshToken: 'erfmfmfm'
        };

        jest.spyOn(cookie, 'useCookies').mockReturnValue([tokens, () => {}, () => {}]);

        const {result} = setupUseAuthorize(privateRouterWrapper);
        const {isAuthorizing, isAuthorized} = result.current;

        expect(isAuthorizing).toBe(false);
        expect(isAuthorized).toBe(false);
    });

    test('리프레쉬토큰이 없으면 미인가', () => {
        const tokens = {
            accessToken: 'werkjj',
            refreshToken: null
        };

        jest.spyOn(cookie, 'useCookies').mockReturnValue([tokens, () => {}, () => {}]);

        const {result} = setupUseAuthorize(privateRouterWrapper);
        const {isAuthorizing, isAuthorized} = result.current;

        expect(isAuthorizing).toBe(false);
        expect(isAuthorized).toBe(false);
    });

    test('토큰이 있고, 유저정보도 있으면 인가', () => {
        const tokens = { accessToken: 'werkjj', refreshToken: 'sdjfkne' };
        jest.spyOn(cookie, 'useCookies').mockReturnValue([tokens, () => {}, () => {}]);
        jest.spyOn(recoil, 'useRecoilState').mockReturnValue([mockUser, () => {}]);

        const {result} = setupUseAuthorize(privateRouterWrapper);
        const {isAuthorizing, isAuthorized} = result.current;

        expect(isAuthorizing).toBe(false);
        expect(isAuthorized).toBe(true);
    });

    test('유저정보를 불러오는 중이면 미인가, 로딩중', () => {
        const tokens = { accessToken: 'werkjj', refreshToken: 'sdjfkne' };
        jest.spyOn(cookie, 'useCookies').mockReturnValue([tokens, () => {}, () => {}]);
        jest.spyOn(recoil, 'useRecoilState').mockReturnValue([{} as User, () => {}]);

        const {result} = setupUseAuthorize(privateRouterWrapper);
        const {isAuthorizing, isAuthorized} = result.current;

        expect(isAuthorizing).toBe(true);
        expect(isAuthorized).toBe(false);
    });

    test('유저정보를 가져오지 못하면 미인가', async () => {
        const tokens = { accessToken: 'werkjj', refreshToken: 'sdjfkne' };
        jest.spyOn(cookie, 'useCookies').mockReturnValue([tokens, () => {}, () => {}]);

        jest.spyOn(recoil, 'useRecoilState').mockReturnValue([{} as User, () => {}]);
        
        const mockResult = mockQueryResult;
        mockResult.isLoading = false;
        jest.spyOn(query, 'useQuery').mockImplementation(() => mockResult);
        
        
        const {result} = setupUseAuthorize(privateRouterWrapper);
        const {isAuthorizing, isAuthorized} = result.current;

        await waitFor(() => {
            expect(isAuthorizing).toBe(false);
            expect(isAuthorized).toBe(false);
        });
    });

    test('유저정보를 가져오면 인가', async () => {
        const tokens = { accessToken: 'werkjj', refreshToken: 'sdjfkne' };
        jest.spyOn(cookie, 'useCookies').mockReturnValue([tokens, () => {}, () => {}]);

        jest.spyOn(recoil, 'useRecoilState').mockReturnValue([{} as User, () => {}]);
        
        const mockResult = mockQueryResult;
        mockResult.data = mockUser;
        mockResult.isLoading = false;
        jest.spyOn(query, 'useQuery').mockImplementation(() => mockResult);
        
        const {result} = setupUseAuthorize(privateRouterWrapper);
        const {isAuthorizing, isAuthorized} = result.current;

        await waitFor(() => {
            expect(isAuthorizing).toBe(false);
            expect(isAuthorized).toBe(true);
        });
    });
});