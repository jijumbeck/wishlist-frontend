import { useLoaderData } from "react-router-dom";

import { useGetWishlistInfo } from "../wishlistAPI";
import { useGetUserInfo } from "../../profile/profileAPI";
import { GiftList } from "../../gifts/ui/GiftList";
import React from "react";


export function WishlistByLink() {
    const wishlistId = useLoaderData() as string;
    const wishlist = useGetWishlistInfo(wishlistId).data;
    const user = useGetUserInfo(wishlist?.creatorId ?? '').data;

    if (!wishlist) {
        return (<p>Загрузка...</p>)
    }

    if (!user) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div>
            <h2>Пользователь {user.login} поделился с Вами вишлистом.</h2>
            <GiftList wishlist={wishlist} />
        </div>
    )
}

export function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                width: '50%',
                margin: '50px auto'
            }}
        >
            {children}
        </div>
    )
}