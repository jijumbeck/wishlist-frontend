import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../shared/api';
import { FriendshipRequest } from './friend.dto';
import { UserInfo } from '../profile/profile.dto';


export const friendApi = createApi({
    reducerPath: 'friendApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['friend'],
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
            })
        }),

        addFriend: builder.mutation<string, string>({
            query: (userId: string) => ({
                method: 'POST',
                url: 'friendship/addFriend',
                body: { requestRecieverId: userId }
            })
        }),

        deleteFriend: builder.mutation<string, string>({
            query: (userId: string) => ({
                method: 'POST',
                url: 'friendship/deleteFriend',
                body: { friendToDeleteId: userId }
            })
        })
    })
});

export const useGetFriends = friendApi.endpoints.getFriends.useQuery;
export const useGetSubscribers = friendApi.endpoints.getSubscribers.useQuery;
export const useGetSubscripiants = friendApi.endpoints.getSubscripiants.useQuery;
export const useGetFriendshipRequest = friendApi.endpoints.getRequest.useQuery;

export const useAddFriend = friendApi.endpoints.addFriend.useMutation;
export const useDeleteFriend = friendApi.endpoints.deleteFriend.useMutation;