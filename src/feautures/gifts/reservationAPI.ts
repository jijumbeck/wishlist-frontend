import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { Reservation } from "./gift.dto";


export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Reservation'],
    endpoints: (builder) => ({

        reserveGift: builder.mutation<string, string>({
            query: (giftId: string) => ({
                url: 'reservation',
                method: 'POST',
                body: { giftId }
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Reservation', id }]
        }),

        getReservations: builder.query<Reservation[], unknown>({
            query: () => 'reservation/reservations',
            providesTags: () => ['Reservation']
        }),

        removeReservation: builder.mutation<void, string>({
            query: (giftId: string) => ({
                url: `reservation`,
                method: 'DELETE',
                body: { giftId }
            })
        }),

        getGiftReservations: builder.query<Reservation[], string>({
            query: (giftId: string) => `reservation/${giftId}`,
            providesTags: () => ['Reservation']
        })

    })
})

export const useGetReservations = reservationApi.endpoints.getReservations.useQuery;
export const useGetGiftReservations = reservationApi.endpoints.getGiftReservations.useQuery;

export const useReserveGift = reservationApi.endpoints.reserveGift.useMutation;
export const useRemoveReservation = reservationApi.endpoints.removeReservation.useMutation;