import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../shared/api';
import { UserInfo } from './profile.dto';


export const profileAPI = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['profile'],
    endpoints: (builder) => ({

        getProfileInfo: builder.query<UserInfo, unknown>({
            query: () => ({
                url: 'user/profile'
            })
        }),

        getUserInfo: builder.query<UserInfo, string>({
            query: (id: string) => ({
                url: `user/${id}`
            })
        })
    })
});

export const useGetProfileInfo = profileAPI.endpoints.getProfileInfo.useQuery;
export const useGetUserInfo = profileAPI.endpoints.getUserInfo.useQuery;