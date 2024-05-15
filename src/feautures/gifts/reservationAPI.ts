import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { GuestReservation, Reservation } from "./gift.dto";



export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Reservation'],
    endpoints: (builder) => ({

        updateReservations: builder.mutation<unknown, string>({
            query: (guestId: string) => ({
                url: 'reservation/update',
                method: 'POST',
                body: { guestId }
            }),
            invalidatesTags: ['Reservation']
        }),

        reserveGift: builder.mutation<{ guestId: string }, { giftId: string, guest?: { guestId?: string, guestName: string } }>({
            query: (param) => ({
                url: 'reservation',
                method: 'POST',
                body: param
            }),
            invalidatesTags: (result, error, param) => [{ type: 'Reservation', id: param.giftId }]
        }),

        getReservations: builder.query<Array<Reservation>, unknown>({
            query: () => 'reservation/reservations',
            providesTags: () => ['Reservation']
        }),

        removeReservation: builder.mutation<void, { giftId: string, guestId?: string }>({
            query: (param) => ({
                url: `reservation`,
                method: 'DELETE',
                body: param
            }),
            invalidatesTags: (result, error, param) => [{ type: 'Reservation', id: param.giftId }]
        }),

        getGiftReservations: builder.query<Array<Reservation | GuestReservation>, string>({
            query: (giftId: string) => `reservation/${giftId}`,
            providesTags: (result, error, id) => [{ type: 'Reservation', id }]
        })

    })
})

export const useGetReservations = reservationApi.endpoints.getReservations.useQuery;
export const useGetGiftReservations = reservationApi.endpoints.getGiftReservations.useQuery;

export const useReserveGift = reservationApi.endpoints.reserveGift.useMutation;
export const useRemoveReservation = reservationApi.endpoints.removeReservation.useMutation;
export const useUpdateReservations = reservationApi.endpoints.updateReservations.useMutation;