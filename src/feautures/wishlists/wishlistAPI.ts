import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Wishlist } from "./wishlist.dto";

export const wishlistAPI = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Wishlist'],
    endpoints: (builder) => ({

        getUserWishlists: builder.query<Wishlist[], string>({
            query: (userId: string) => ({
                url: `wishlist/getWishlists?ownerId=${userId}`
            }),
            providesTags: (result) => {
                console.log(result);
                return result
                    ? [{ type: 'Wishlist', id: result[0].creatorId }]
                    : ['Wishlist']
            }
        }),

        createWishlist: builder.mutation<Wishlist, void>({
            query: () => ({
                method: 'POST',
                url: 'wishlist/create'
            }),
            invalidatesTags: (result) => {
                console.log(result);
                return [{ type: 'Wishlist', id: result?.creatorId }]
            }
        })
    })
})

export const useGetWishlists = wishlistAPI.endpoints.getUserWishlists.useQuery;
export const useCreateWishlist = wishlistAPI.endpoints.createWishlist.useMutation;