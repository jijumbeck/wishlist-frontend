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
                url: `wishlists?ownerId=${userId}`
            }),
            providesTags: (result, error, userId) => [{ type: 'WishlistForUser', id: userId }]
        }),

        getPublicWishlists: builder.query<Wishlist[], string>({
            query: (search: string) => `wishlists/public?search=${search}`
        }),

        createWishlist: builder.mutation<Wishlist, void>({
            query: () => ({
                method: 'POST',
                url: 'wishlist'
            }),
            invalidatesTags: (result) => {
                return [{ type: 'WishlistForUser', id: result?.creatorId }]
            }
        }),

        getWishlistInfo: builder.query<Wishlist, string>({
            query: (wishlistId: string) => `wishlist/${wishlistId}`,
            providesTags: (result, error, wishlistId) => {
                return [{ type: 'Wishlist', id: wishlistId }]
            }
        }),

        updateWishlistInfo: builder.mutation<void, Wishlist>({
            query: (wishlist: Wishlist) => ({
                url: `wishlist/${wishlist.id}`,
                method: 'PATCH',
                body: wishlist
            }),
            invalidatesTags: (result, error, wishlist) => [{ type: 'Wishlist', id: wishlist.id }, 'WishlistForUser']
        }),

        deleteWishlist: builder.mutation<void, string>({
            query: (wishlistId: string) => ({
                url: `wishlist/${wishlistId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Wishlist', id: id }, 'WishlistForUser']
        }),

        getWishlistGifts: builder.query<Gift[], string>({
            query: (wishlistId: string) => `wishlist-gifts?wishlistId=${wishlistId}`,
            providesTags: (result, error, id) => {
                return [{ type: 'GiftsInWishlist', id: id }]
            }
        }),

        addGift: builder.mutation<Gift, string>({
            query: (wishlistId: string) => ({
                url: `wishlist-gifts`,
                method: 'POST',
                body: { wishlistId: wishlistId }
            }),
            invalidatesTags: (result) => {
                if (!result) {
                    return ['GiftsInWishlist'];
                }

                return [{ type: 'GiftsInWishlist', id: result.wishlistId }];
            }
        }),

        addOtherGift: builder.mutation<Gift, { wishlistId: string, giftId: string }>({
            query: (param) => ({
                url: 'wishlist-gifts',
                method: 'POST',
                body: param
            }),
            invalidatesTags: (result, error, param) => [{ type: 'GiftsInWishlist', id: param.wishlistId }]
        })
    })
})

export const useGetWishlists = wishlistAPI.endpoints.getUserWishlists.useQuery;
export const useGetWishlistInfo = wishlistAPI.endpoints.getWishlistInfo.useQuery;
export const useGetWishlistsGifts = wishlistAPI.endpoints.getWishlistGifts.useQuery;
export const useGetPublicWishlists = wishlistAPI.endpoints.getPublicWishlists.useQuery;

export const useCreateWishlist = wishlistAPI.endpoints.createWishlist.useMutation;
export const useAddGift = wishlistAPI.endpoints.addGift.useMutation;
export const useUpdateWishlist = wishlistAPI.endpoints.updateWishlistInfo.useMutation;
export const useDeleteWishlist = wishlistAPI.endpoints.deleteWishlist.useMutation;
export const useAddOtherGift = wishlistAPI.endpoints.addOtherGift.useMutation;