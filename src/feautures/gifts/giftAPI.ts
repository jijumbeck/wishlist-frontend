import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Gift } from "../gifts/gift.dto";

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

        deleteGift: builder.mutation<unknown, string>({
            query: (giftId: string) => ({
                method: 'DELETE',
                url: `gift/${giftId}`
            }),
            invalidatesTags: (result, error, id) => {
                console.log(result, error, id);
                return ['GiftsInWishlist', { type: 'Gift', id }]
            }
        }),

        changeGiftInfo: builder.mutation<string, Gift>({
            query: (gift: Gift) => ({
                url: `gift/${gift.id}`,
                method: 'PATCH',
                body: gift
            }),
            invalidatesTags: (result, error, gift) => [{ type: 'Gift', id: gift.id }, { type: 'GiftsInWishlist', id: gift.wishlistId }]
        }),

        uploadGiftImage: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: 'gift/uploadImage',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: (result, error, formData) => [{ type: 'Gift', id: formData.get('giftId')?.toString() ?? '' }]
        })
    })
})

export const useGetGift = giftApi.endpoints.getGift.useQuery;
export const useDeleteGift = giftApi.endpoints.deleteGift.useMutation;
export const useChangeGift = giftApi.endpoints.changeGiftInfo.useMutation;
export const useUploadGiftImage = giftApi.endpoints.uploadGiftImage.useMutation;