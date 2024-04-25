import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from '../feautures/auth/auth.slice';
import { profileAPI } from '../feautures/profile/profileAPI';
import { wishlistAPI } from '../feautures/wishlists/wishlistAPI';
import { friendApi } from '../feautures/friends/friendAPI';
import { giftApi } from '../feautures/gifts/giftAPI';
import { accessApi } from '../feautures/wishlists/accessAPI';
import { coauthoringApi } from '../feautures/wishlists/coauthoringAPI';
import { notificationApi } from '../feautures/notifications/notificationAPI';
import { reservationApi } from '../feautures/gifts/reservationAPI';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        [profileAPI.reducerPath]: profileAPI.reducer,
        [wishlistAPI.reducerPath]: wishlistAPI.reducer,
        [friendApi.reducerPath]: friendApi.reducer,
        [giftApi.reducerPath]: giftApi.reducer,
        [accessApi.reducerPath]: accessApi.reducer,
        [coauthoringApi.reducerPath]: coauthoringApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(profileAPI.middleware)
            .concat(wishlistAPI.middleware)
            .concat(friendApi.middleware)
            .concat(giftApi.middleware)
            .concat(accessApi.middleware)
            .concat(coauthoringApi.middleware)
            .concat(notificationApi.middleware)
            .concat(reservationApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;