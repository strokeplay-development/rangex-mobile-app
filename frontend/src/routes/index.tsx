import React from 'react';
import { useRoutes } from 'react-router-dom';
import LinkShop from '../pages/link/LinkShop';

const Home = React.lazy(() => import('../pages/home/HomePage'));
const Swings = React.lazy(() => import('../pages/swings/SwingsPage'));

// More
const More = React.lazy(() => import('../pages/more/MorePage'));
const Clubs = React.lazy(() => import('../pages/club/ClubPage'));

export default function PageRoutes() {
    const routes = useRoutes([
        {
            path: '/home',
            element: <Home/>
        },
        {
            path: '/swings',
            element: <Swings/>
        },
        {
            path: '/more',
            element: <More/>,
        },
        {
            path: '/clubs',
            element: <Clubs/>
        },
        {
            path: '/link',
            element: <LinkShop/>
        }
    ]);

    return routes;
}