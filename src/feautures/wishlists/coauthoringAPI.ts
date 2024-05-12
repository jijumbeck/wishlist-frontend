import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { UserInfo } from "../profile/profile.dto";
import { notificationApi } from "../notifications/notificationAPI";

export const coauthoringApi = createApi({
    reducerPath: 'coauthoringApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Coauthoring', 'Wishlist', 'WishlistForUser'],
    endpoints: (builder) => ({

        getCoauthors: builder.query<UserInfo[], string>({
            query: (wishlistId: string) => ({
                url: `coauthoring/getWishlistCoauthors?wishlistId=${wishlistId}`,
            }),
            providesTags: () => ['Coauthoring']
        }),

        addCoauthor: builder.mutation<void, { coauthorId: string, wishlistId: string }>({
            query: (param) => ({
                url: 'coauthoring/add',
                method: 'POST',
                body: param
            }),
            invalidatesTags: (result, error, param) => ['Coauthoring', { type: 'WishlistForUser', id: param.coauthorId }],
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled;
                api.dispatch(notificationApi.util.invalidateTags(['Notifications']));
            }
        }),

        removeCoauthor: builder.mutation<void, { coauthorId: string, wishlistId: string }>({
            query: (param) => ({
                url: 'coauthoring/remove',
                method: 'POST',
                body: param
            }),
            invalidatesTags: () => ['Coauthoring'],
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled;
                api.dispatch(notificationApi.util.invalidateTags(['Notifications']));
            }
        }),

    })
})

export const useGetCoauthors = coauthoringApi.endpoints.getCoauthors.useQuery;

export const useAddCoauthor = coauthoringApi.endpoints.addCoauthor.useMutation;
export const useRemoveCoauthor = coauthoringApi.endpoints.removeCoauthor.useMutation;