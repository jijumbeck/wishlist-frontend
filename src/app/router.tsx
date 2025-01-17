import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";
import { Layout } from "../feautures/layout/Layout";
import { AuthWidget } from "../feautures/auth/ui/AuthWidget";
import { LoginForm } from "../feautures/auth/ui/LoginForm";
import { RegisterForm } from "../feautures/auth/ui/RegisterForm";
import { ProfileWidget, userIdLoader } from "../feautures/profile/ui/ProfileWidget";
import { WishlistListWidget } from "../feautures/wishlists/ui/WishlistList";
import { WishlistWidget, wishlstIdLoader } from "../feautures/wishlists/ui/WishlistWidget";
import { GiftWidget, giftIdLoader } from "../feautures/gifts/ui/GiftWidget";
import { SearchWidget } from "../feautures/search/SearchWidget";
import { SettingsWidget } from "../feautures/profile/ui/SettingsWidget";
import { ReservationWidget } from "../feautures/gifts/ui/Reservation";
import { UsersWidget } from "../feautures/friends/ui/UsersWidget";
import { MainWrapper, WishlistByLink } from "../feautures/wishlists/ui/WishlistByLink";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <SearchWidget />,
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
                element: <SettingsWidget />
            },
            {
                path: '/reservations',
                element: <ReservationWidget />
            },
            {
                path: '/users',
                element: <UsersWidget />
            },
            {
                path: 'wishlist-by-link/:wishlistId',
                element: <MainWrapper><Outlet /></MainWrapper>,
                children: [
                    {
                        index: true,
                        element: <WishlistByLink />,
                        loader: wishlstIdLoader,
                    },
                    {
                        path: ':giftId',
                        element: <GiftWidget />,
                        loader: giftIdLoader
                    }
                ]
            },
            {
                path: '/:userId',
                element: <ProfileWidget />,
                loader: userIdLoader,
                children: [
                    {
                        index: true,
                        element: <WishlistListWidget />,
                        loader: userIdLoader
                    },
                    {
                        path: ':wishlistId',
                        element: <WishlistWidget />,
                        loader: wishlstIdLoader
                    },
                    {
                        path: ':wishlistId/:giftId',
                        element: <GiftWidget />,
                        loader: giftIdLoader
                    }
                ]
            }
        ]
    },
]);
