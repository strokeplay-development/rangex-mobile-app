import React from 'react';
import { useRoutes } from 'react-router-dom';
import LinkShop from '../pages/link/LinkShop';

const Home = React.lazy(() => import('../pages/home/HomePage'));
const Swings = React.lazy(() => import('../pages/swings/SwingsPage'));
const More = React.lazy(() => import('../pages/more/MorePage'));
// More

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
            element: <More/>
        },
        {
            path: '/link',
            element: <LinkShop/>
        }
    ]);

    return routes;
}