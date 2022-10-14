import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { PATHS } from '../constants';
import UnknownPage from '../pages/404';
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
const EditPassword = React.lazy(() => import('../pages/profile/EditPasswordPage'));
const Clubs = React.lazy(() => import('../pages/club/ClubPage'));
const GameOptions = React.lazy(() => import('../pages/option/GameOptionsPage'));
const JoinShop = React.lazy(() => import('../pages/link/LinkShop'));
const Language = React.lazy(() => import('../pages/option/LanguagePage'));

export const routeInfoList: RouteInfoList = [
    {
        path: '/*',
        element: <UnknownPage/>,

    },

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
        path: PATHS.PROFILE.PASSWORD,
        element: <EditPassword/>,
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
        path: PATHS.LANG,
        element: <Language/>,
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
    return useRoutes(routeInfoList);
}