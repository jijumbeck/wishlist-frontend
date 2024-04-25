import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../shared/api';
import { ChangeUserInfoDTO, UserInfo } from './profile.dto';


export const profileAPI = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['profile'],
    endpoints: (builder) => ({

        getProfileInfo: builder.query<UserInfo, unknown>({
            query: () => ({
                url: 'user/profile'
            }),
            providesTags: ['profile']
        }),

        getUserInfo: builder.query<UserInfo, string>({
            query: (id: string) => ({
                url: `user/${id}`
            })
        }),

        getUsersBySearch: builder.query<UserInfo[], string>({
            query: (input: string) => `user/getUsersBySearch?input=${input}`
        }),

        changeUserInfo: builder.mutation<unknown, ChangeUserInfoDTO>({
            query: (user) => ({
                url: `user/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['profile']
        }),

        changePassword: builder.mutation<unknown, string>({
            query: (newPassword: string) => ({
                url: 'auth/change-password',
                method: 'POST',
                body: { newPassword }
            })
        })
    })
});

export const useGetProfileInfo = profileAPI.endpoints.getProfileInfo.useQuery;
export const useGetUserInfo = profileAPI.endpoints.getUserInfo.useQuery;
export const useGetUsersBySearch = profileAPI.endpoints.getUsersBySearch.useQuery;

export const useChangeUserInfo = profileAPI.endpoints.changeUserInfo.useMutation;
export const useChangePassword = profileAPI.endpoints.changePassword.useMutation;