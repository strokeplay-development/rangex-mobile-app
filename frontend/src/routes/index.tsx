import React from 'react';
import { useRoutes } from 'react-router-dom';
import LinkShop from '../pages/link/LinkShop';

// Sign up
const RequiredSignup = React.lazy(() => import('../pages/signup/RequiredSignupPage'));
const OptionalSignup = React.lazy(() => import('../pages/signup/OptionalSignupPage'));

// Main
const Home = React.lazy(() => import('../pages/home/HomePage'));
const Swings = React.lazy(() => import('../pages/swings/SwingsPage'));

// More
const More = React.lazy(() => import('../pages/more/MorePage'));
const Clubs = React.lazy(() => import('../pages/club/ClubPage'));
const GameOptions = React.lazy(() => import('../pages/option/GameOptionsPage'));

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

        // More
        {
            path: '/more',
            element: <More/>,
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
            element: <LinkShop/>
        }
    ]);

    return routes;
}