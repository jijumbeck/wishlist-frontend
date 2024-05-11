import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Gift } from "../gifts/gift.dto";
import { wishlistAPI } from "../wishlists/wishlistAPI";


export const giftApi = createApi({
    reducerPath: 'giftApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Gift', 'GiftsInWishlist'],
    endpoints: (builder) => ({

        getGift: builder.query<Gift, string>({
            query: (giftId: string) => `gift/${giftId}`,
            providesTags: (result) => {
                return [{ type: 'Gift', id: result?.id }]
            }
        }),

        deleteGift: builder.mutation<unknown, Gift>({
            query: (gift: Gift) => ({
                method: 'DELETE',
                url: `gift/${gift.id}`
            }),
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled;
                api.dispatch(wishlistAPI.util.invalidateTags([{ type: 'GiftsInWishlist', id: arg.wishlistId }]))
            },
        }),

        changeGiftInfo: builder.mutation<unknown, Partial<Gift>>({
            query: (gift: Gift) => ({
                url: `gift/${gift.id}`,
                method: 'PATCH',
                body: gift
            }),
            invalidatesTags: (result, error, gift) => {
                return [{ type: 'Gift', id: gift.id }, { type: 'GiftsInWishlist', id: gift.wishlistId }]
            },
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled;
                api.dispatch(wishlistAPI.util.invalidateTags([{ type: 'GiftsInWishlist', id: arg.wishlistId }]))
            }
        }),

        uploadGiftImage: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: 'gift/uploadImage',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: (result, error, formData) => {
                return [{ type: 'Gift', id: formData.get('giftId')?.toString() ?? '' }]
            }
        }),

        getUrlGift: builder.mutation<Partial<Gift>, string>({
            query: (url) => ({
                url: `product?url=${encodeURIComponent(url)}`
            }),
        })
    })
})

export const useGetGift = giftApi.endpoints.getGift.useQuery;
export const useGetUrlGift = giftApi.endpoints.getUrlGift.useMutation;
export const useDeleteGift = giftApi.endpoints.deleteGift.useMutation;
export const useChangeGift = giftApi.endpoints.changeGiftInfo.useMutation;
export const useUploadGiftImage = giftApi.endpoints.uploadGiftImage.useMutation;