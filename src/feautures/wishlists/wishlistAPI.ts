import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Wishlist } from "./wishlist.dto";

export const wishlistAPI = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['wishlist'],
    endpoints: (builder) => ({

        getUserWishlists: builder.query<Wishlist[], string>({
            query: (userId: string) => ({
                url: `wishlist/getWishlists?userId=${userId}`
            })
        })
    })
})

export const useGetWishlists = wishlistAPI.endpoints.getUserWishlists.useQuery;