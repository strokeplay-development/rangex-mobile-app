import React from 'react';
import { useRoutes } from 'react-router-dom';
import { UserOptinalInfoPageMode } from '../pages/signup/OptionalSignupPage';
import SocialAuthPage from './auth';

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
const Clubs = React.lazy(() => import('../pages/club/ClubPage'));
const GameOptions = React.lazy(() => import('../pages/option/GameOptionsPage'));
const LinkToShops = React.lazy(() => import('../pages/link/LinkShop'));

export default function PageRoutes() {
    const routes = useRoutes([
        // Signup
        {
            path: '/signup/required',
            element: <RequiredSignup/>
        },
        {
            path: '/signup/optional',
            element: <OptionalSignup/>
        },

        // Main
        {
            path: '/home',
            element: <Home/>
        },
        {
            path: '/swings',
            element: <Swings/>
        },
        {
            path: '/swings/:shotID',
            element: <ShotData/>
        },

        // More
        {
            path: '/more',
            element: <More/>,
        },
        {
            path: '/profile',
            element: <EditProfile/>
        },
        {
            path: '/profile/optional',
            element: <OptionalSignup mode={UserOptinalInfoPageMode.modify}/>
        },
        {
            path: '/clubs',
            element: <Clubs/>
        },
        {
            path: '/options',
            element: <GameOptions/>
        },
        {
            path: '/link',
            element: <LinkToShops/>
        },
        {
            path: '/kakao/redirect',
            element: <SocialAuthPage/>
        }
    ]);

    return routes;
}