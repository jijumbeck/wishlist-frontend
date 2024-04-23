import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { UserInfo } from "../profile/profile.dto";

export const coauthoringApi = createApi({
    reducerPath: 'coauthoringApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Coauthoring', 'Wishlist'],
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
            invalidatesTags: () => ['Coauthoring']
        }),

        removeCoauthor: builder.mutation<void, { coauthorId: string, wishlistId: string }>({
            query: (param) => ({
                url: 'coauthoring/remove',
                method: 'POST',
                body: param
            }),
            invalidatesTags: () => ['Coauthoring']
        }),

    })
})

export const useGetCoauthors = coauthoringApi.endpoints.getCoauthors.useQuery;

export const useAddCoauthor = coauthoringApi.endpoints.addCoauthor.useMutation;
export const useRemoveCoauthor = coauthoringApi.endpoints.removeCoauthor.useMutation;