import {
    createBrowserRouter,
} from "react-router-dom";
import { Layout } from "../feautures/layout/Layout";
import { AuthWidget } from "../feautures/auth/ui/AuthWidget";
import { LoginForm } from "../feautures/auth/ui/LoginForm";
import { RegisterForm } from "../feautures/auth/ui/RegisterForm";
import { ProfileWidget, userIdLoader } from "../feautures/profile/ui/ProfileWidget";
import { WishlistListWidget } from "../feautures/wishlists/ui/WishlistList";

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
                element: <AuthWidget>
                    <LoginForm />
                </AuthWidget>
            },
            {
                path: '/register',
                element: <AuthWidget>
                    <RegisterForm />
                </AuthWidget>
            },
            {
                path: "/settings",
                element: <div>Settings</div>
            },
            {
                path: '/:userId',
                element: <ProfileWidget />,
                loader: userIdLoader,
                children: [
                    {
                        index: true,
                        element: <WishlistListWidget />
                    },
                    {
                        path: '/:userId/:wishlistId',
                        element: <div>Wishlist</div>
                    }
                ]
            }
        ]
    },
]);
