import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Wishlist } from "./wishlist.dto";
import { Gift } from "../gifts/gift.dto";

export const wishlistAPI = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Wishlist', 'Gift'],
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
            query: (wishlistId: string) => `wishlist/${wishlistId}`,
            providesTags: () => {
                return ['Wishlist']
            }
        }),

        updateWishlistInfo: builder.mutation<void, Wishlist>({
            query: (wishlist: Wishlist) => ({
                url: `wishlist/${wishlist.id}`,
                method: 'PATCH',
                body: wishlist
            }),
            invalidatesTags: () => ['Wishlist']
        }),

        deleteWishlist: builder.mutation<void, string>({
            query: (wishlistId: string) => ({
                url: `wishlist/${wishlistId}`,
                method: 'DELETE',
            })
        }),

        getWishlistGifts: builder.query<Gift[], string>({
            query: (wishlistId: string) => `wishlist/getGifts?wishlistId=${wishlistId}`,
            providesTags: (result) => {
                if (result && result.length > 0) {
                    return [{ type: 'Gift', id: result?.[0].wishlistId }]
                }
                return ['Gift'];
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
                    return ['Gift'];
                }
                return [{ type: 'Gift', id: result.wishlistId }];
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