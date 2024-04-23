import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../shared/api";
import { UserInfo } from "../profile/profile.dto";

export const accessApi = createApi({
    reducerPath: 'accessApi',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({

        giveAccessToUsers: builder.mutation<string, { users: UserInfo[], wishlistId: string }>({
            query: (param) => ({
                url: 'wishlist/access',
                method: 'POST',
                body: { users: param.users, wishlistId: param.wishlistId }
            })
        }),

        forbidAccessToUsers: builder.mutation<string, { users: UserInfo[], wishlistId: string }>({
            query: (param) => ({
                url: 'wishlist/access',
                method: 'DELETE',
                body: { users: param.users, wishlistId: param.wishlistId }
            })
        }),

    })

});

export const useGiveAccess = accessApi.endpoints.giveAccessToUsers.useMutation;
export const useForbidAccess = accessApi.endpoints.forbidAccessToUsers.useMutation;