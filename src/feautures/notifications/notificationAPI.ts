
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";


export const enum NotificationType {
    Coauthoring = 'CoauthoringRequest',
    Friend = 'FriendRequest'
}

export interface Notification {
    type: NotificationType,
    requestSenderId?: string,
    requestReceiverId: string
}


export const notificationApi = createApi({
    reducerPath: 'notificationAPI',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        getNotifications: builder.query <Notification[], unknown>({
            query: () => 'notification'
        })

    })
});

export const useGetNotifications = notificationApi.endpoints.getNotifications.useQuery;