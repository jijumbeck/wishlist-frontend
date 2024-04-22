import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Gift } from "../gifts/gift.dto";

export const giftApi = createApi({
    reducerPath: 'giftApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Gift'],
    endpoints: (builder) => ({

        getGift: builder.query<Gift, string>({
            query: (giftId: string) => `gift/${giftId}`
        }),

        deleteGift: builder.mutation<unknown, string>({
            query: (giftId: string) => ({
                method: 'DELETE',
                url: `gift/${giftId}`
            })
        }),

        changeGiftInfo: builder.mutation<string, Gift>({
            query: (gift: Gift) => ({
                url: `gift/${gift.id}`,
                method: 'PATCH',
                body: gift
            })
        })
    })
})

export const useGetGift = giftApi.endpoints.getGift.useQuery;
export const useDeleteGift = giftApi.endpoints.deleteGift.useMutation;
export const useChangeGift = giftApi.endpoints.changeGiftInfo.useMutation;