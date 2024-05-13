import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { UserInfo } from "../profile/profile.dto";

export const accessApi = createApi({
    reducerPath: 'accessApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['WishlistAccessUsers'],
    endpoints: builder => ({

        giveAccessToUsers: builder.mutation<string, { userId: string, wishlistId: string }>({
            query: (param) => ({
                url: 'wishlist-access',
                method: 'POST',
                body: { users: [param.userId], wishlistId: param.wishlistId }
            }),
            invalidatesTags: (result, error, param) => [{ type: 'WishlistAccessUsers', id: param.wishlistId }]
        }),

        forbidAccessToUsers: builder.mutation<string, { userId: string, wishlistId: string }>({
            query: (param) => ({
                url: 'wishlist-access',
                method: 'DELETE',
                body: { users: [param.userId], wishlistId: param.wishlistId }
            }),
            invalidatesTags: (result, error, param) => [{ type: 'WishlistAccessUsers', id: param.wishlistId }]
        }),

        getUsers: builder.query<string[], string>({
            query: (wishlistId: string) => ({
                url: `wishlist-access?wishlistId=${wishlistId}`
            }),
            providesTags: (result, error, wishlistId) => [{ type: 'WishlistAccessUsers', id: wishlistId }]
        })

    })

});

export const useGetUsersWithAccess = accessApi.endpoints.getUsers.useQuery;
export const useGiveAccess = accessApi.endpoints.giveAccessToUsers.useMutation;
export const useForbidAccess = accessApi.endpoints.forbidAccessToUsers.useMutation;