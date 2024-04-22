import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Wishlist } from "./wishlist.dto";
import { Gift } from "../gifts/gift.dto";

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
                return result && result.length > 0
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
        }),

        getWishlistInfo: builder.query<Wishlist, string>({
            query: (wishlistId: string) => `wishlist/${wishlistId}`
        }),

        getWishlistGifts: builder.query<Gift[], string>({
            query: (wishlistId: string) => `wishlist/getGifts?wishlistId=${wishlistId}`
        })
    })
})

export const useGetWishlists = wishlistAPI.endpoints.getUserWishlists.useQuery;
export const useGetWishlistInfo = wishlistAPI.endpoints.getWishlistInfo.useQuery;
export const useGetWishlistsGifts = wishlistAPI.endpoints.getWishlistGifts.useQuery;

export const useCreateWishlist = wishlistAPI.endpoints.createWishlist.useMutation;