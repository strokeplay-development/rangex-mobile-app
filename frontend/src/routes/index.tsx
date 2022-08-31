import React, { useEffect, useState } from 'react';
import { RouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { PATHS } from '../constants';
import { useAuthorize } from '../hooks';
import { UserOptinalInfoPageMode } from '../pages/signup/OptionalSignupPage';
import { LogoutRedirected, SocialAuthPage } from './auth';

interface RouteInfo extends RouteObject {
    isPrivate?: boolean
};

export type RouteInfoList = RouteInfo[];

// Sign up
const RequiredSignup = React.lazy(() => import('../pages/signup/RequiredSignupPage'));
const OptionalSignup = React.lazy(() => import('../pages/signup/OptionalSignupPage'));

// Main
const Home = React.lazy(() => import('../pages/home/HomePage'));
const Swings = React.lazy(() => import('../pages/swings/SwingsPage'));
const ShotData = React.lazy(() => import('../pages/shot/ShotDataPage'));

// More
const More = React.lazy(() => import('../pages/more/MorePage'));
const EditProfile = React.lazy(() => import('../pages/profile/EditProfilePage'));
const EditNickname = React.lazy(() => import('../pages/profile/EditNicknamePage'));
const Clubs = React.lazy(() => import('../pages/club/ClubPage'));
const GameOptions = React.lazy(() => import('../pages/option/GameOptionsPage'));
const JoinShop = React.lazy(() => import('../pages/link/LinkShop'));

export const routeInfoList: RouteInfoList = [
    // Signup
    {
        path: PATHS.SIGNUP.REQUIRED,
        element: <RequiredSignup/>,
    },
    {
        path: PATHS.SIGNUP.OPTIONAL,
        element: <OptionalSignup/>
    },

    // Main
    {
        path: PATHS.MAIN.HOME,
        element: <Home/>,
        isPrivate: true
    },
    {
        path: PATHS.MAIN.SWINGS.LIST,
        element: <Swings/>,
        isPrivate: true
    },
    {
        path: PATHS.MAIN.SWINGS.DATA,
        element: <ShotData/>,
        isPrivate: true
    },

    // More
    {
        path: PATHS.MORE,
        element: <More/>,
        isPrivate: true
    },
    {
        path: PATHS.PROFILE.ROOT,
        element: <EditProfile/>,
        isPrivate: true
    },
    {
        path: PATHS.PROFILE.NICKNAME,
        element: <EditNickname/>,
        isPrivate: true
    },
    {
        path: PATHS.PROFILE.OPTIONAL,
        element: <OptionalSignup mode={UserOptinalInfoPageMode.modify}/>,
        isPrivate: true
    },
    {
        path: PATHS.CLUBS,
        element: <Clubs/>,
        isPrivate: true
    },
    {
        path: PATHS.OPTIONS,
        element: <GameOptions/>,
        isPrivate: true
    },
    {
        path: PATHS.JOIN,
        element: <JoinShop/>,
        isPrivate: true
    },
    {
        path: PATHS.REDIRECT.KAKAO,
        element: <SocialAuthPage/>,
    },
    {
        path: PATHS.REDIRECT.LOGOUT,
        element: <LogoutRedirected/>
    },
]

export default function PageRoutes() {
    const routes = useRoutes(routeInfoList);
    const { pathname } = useLocation();
    const nav = useNavigate();
    
    const { isAuthorized, isAuthorizing } = useAuthorize(pathname);
    
    useEffect(() => {
        window.LocationChanged?.postMessage(pathname);
    }, []);

    if (isAuthorizing) {
        window.WebviewMounted?.postMessage('<대기중!!!>');
        return <div>Authenticating...</div>
    }
    
    if (isAuthorized) {
        window.WebviewMounted?.postMessage('<201>');
    } else {
        window.WebviewMounted?.postMessage('<401>');
        nav(PATHS.REDIRECT.LOGOUT);
    }

    return routes;
}