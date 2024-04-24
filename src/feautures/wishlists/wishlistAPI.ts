import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Wishlist } from "./wishlist.dto";
import { Gift } from "../gifts/gift.dto";

export const wishlistAPI = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Wishlist', 'Gift', 'WishlistForUser', 'GiftsInWishlist'],
    endpoints: (builder) => ({

        getUserWishlists: builder.query<Wishlist[], string>({
            query: (userId: string) => ({
                url: `wishlist/getWishlists?ownerId=${userId}`
            }),
            providesTags: (result) => {
                console.log(result);
                return result && result.length > 0
                    ? [{ type: 'WishlistForUser', id: result[0].creatorId }]
                    : ['WishlistForUser']
            }
        }),

        createWishlist: builder.mutation<Wishlist, void>({
            query: () => ({
                method: 'POST',
                url: 'wishlist/create'
            }),
            invalidatesTags: (result) => {
                console.log(result);
                return [{ type: 'WishlistForUser', id: result?.creatorId }]
            }
        }),

        getWishlistInfo: builder.query<Wishlist, string>({
            query: (wishlistId: string) => `wishlist/${wishlistId}`,
            providesTags: (result) => {
                return [{ type: 'Wishlist', id: result?.id }]
            }
        }),

        updateWishlistInfo: builder.mutation<void, Wishlist>({
            query: (wishlist: Wishlist) => ({
                url: `wishlist/${wishlist.id}`,
                method: 'PATCH',
                body: wishlist
            }),
            invalidatesTags: () => ['Wishlist', 'WishlistForUser']
        }),

        deleteWishlist: builder.mutation<void, string>({
            query: (wishlistId: string) => ({
                url: `wishlist/${wishlistId}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => ['Wishlist']
        }),

        getWishlistGifts: builder.query<Gift[], string>({
            query: (wishlistId: string) => `wishlist/getGifts?wishlistId=${wishlistId}`,
            providesTags: (result, error, id) => {
                console.log('gwtWishlistGifts', id);
                return [{ type: 'GiftsInWishlist', id }]
            }
        }),

        addGift: builder.mutation<Gift, string>({
            query: (wishlistId: string) => ({
                url: `wishlist/addGift`,
                method: 'POST',
                body: { wishlistId: wishlistId }
            }),
            invalidatesTags: (result) => {
                if (!result) {
                    return ['GiftsInWishlist'];
                }

                return ['GiftsInWishlist']

                // TO DO:
                //return [{ type: 'GiftsInWishlist', id: result.wishlistId }];
            }
        })
    })
})

export const useGetWishlists = wishlistAPI.endpoints.getUserWishlists.useQuery;
export const useGetWishlistInfo = wishlistAPI.endpoints.getWishlistInfo.useQuery;
export const useGetWishlistsGifts = wishlistAPI.endpoints.getWishlistGifts.useQuery;

export const useCreateWishlist = wishlistAPI.endpoints.createWishlist.useMutation;
export const useAddGift = wishlistAPI.endpoints.addGift.useMutation;
export const useUpdateWishlist = wishlistAPI.endpoints.updateWishlistInfo.useMutation;