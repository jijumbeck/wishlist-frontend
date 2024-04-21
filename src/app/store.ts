import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from '../feautures/auth/auth.slice';
import { profileAPI } from '../feautures/profile/profileAPI';
import { wishlistAPI } from '../feautures/wishlists/wishlistAPI';
import { friendApi } from '../feautures/friends/friendAPI';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        [profileAPI.reducerPath]: profileAPI.reducer,
        [wishlistAPI.reducerPath]: wishlistAPI.reducer,
        [friendApi.reducerPath]: friendApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(profileAPI.middleware)
            .concat(wishlistAPI.middleware)
            .concat(friendApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;