import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { checkAuth, logout } from "../feautures/auth/auth.slice";

export const API = 'http://localhost:5000/api';

const baseQuery = fetchBaseQuery({
    baseUrl: API,
    credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        try {
            const refreshResult = await api.dispatch(checkAuth());
            console.log(refreshResult);

            result = await baseQuery(args, api, extraOptions);
            
        } catch (e) {
            console.log(e);
            api.dispatch(logout());
        }
    }

    return result;
}