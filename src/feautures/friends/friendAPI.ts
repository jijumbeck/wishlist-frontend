import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../shared/api';
import { FriendshipRequest } from './friend.dto';
import { UserInfo } from '../profile/profile.dto';
import { notificationApi } from '../notifications/notificationAPI';


export const friendApi = createApi({
    reducerPath: 'friendApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Friend'],
    endpoints: (builder) => ({

        getFriends: builder.query<UserInfo[], string>({
            query: (userId: string) => ({
                url: `friendship/getFriends?userId=${userId}`
            })
        }),

        getSubscribers: builder.query<FriendshipRequest[], string>({
            query: (userId: string) => ({
                url: `friendship/getSubscribers?userId=${userId}`
            })
        }),

        getSubscripiants: builder.query<FriendshipRequest[], string>({
            query: (userId: string) => ({
                url: `friendship/getSubscripiants?userId=${userId}`
            })
        }),

        getRequest: builder.query<FriendshipRequest, string>({
            query: (userId: string) => ({
                url: `friendship/getFriendshipStatus?userId=${userId}`
            }),
            providesTags: (result, error, id) => [{ type: 'Friend', id }]
        }),

        addFriend: builder.mutation<string, string>({
            query: (userId: string) => ({
                method: 'POST',
                url: 'friendship/addFriend',
                body: { requestRecieverId: userId }
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Friend', id }],
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled;
                api.dispatch(notificationApi.util.invalidateTags(['Notifications']));
            }
        }),

        deleteFriend: builder.mutation<string, string>({
            query: (userId: string) => ({
                method: 'POST',
                url: 'friendship/deleteFriend',
                body: { friendToDeleteId: userId }
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Friend', id }],
            onQueryStarted: async (arg, api) => {
                await api.queryFulfilled;
                api.dispatch(notificationApi.util.invalidateTags(['Notifications']));
            }
        })
    })
});

export const useGetFriends = friendApi.endpoints.getFriends.useQuery;
export const useGetSubscribers = friendApi.endpoints.getSubscribers.useQuery;
export const useGetSubscripiants = friendApi.endpoints.getSubscripiants.useQuery;
export const useGetFriendshipRequest = friendApi.endpoints.getRequest.useQuery;

export const useAddFriend = friendApi.endpoints.addFriend.useMutation;
export const useDeleteFriend = friendApi.endpoints.deleteFriend.useMutation;