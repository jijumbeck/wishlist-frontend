import {
    createBrowserRouter,
} from "react-router-dom";
import { Layout } from "../feautures/layout/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <div>Search</div>,
            },
            {
                path: "/about",
                element: <div>Landpage about service</div>
            },
            {
                path: '/login',
                element: <div>Auth</div>
            },
            {
                path: "/settings",
                element: <div>Settings</div>
            },
            {
                path: '/:userId',
                element: <div>Профиль</div>,
                children: [
                    {
                        path: '/:userId/:wishlistId',
                        element: <div>Wishlist</div>
                    }
                ]
            }
        ]
    },
]);
