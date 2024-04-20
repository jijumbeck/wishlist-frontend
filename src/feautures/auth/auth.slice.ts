import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest, logoutRequest, refreshRequest, registerRequest } from "./auth.service";
import { LoginCredentials, RegisterCredentials } from "./auth.dto";
import { AxiosError } from "axios";


const initialState = {
    isAuth: false
};


export const login = createAsyncThunk(
    'auth/login',
    async (param: LoginCredentials, thunkAPI) => {
        try {
            const response = await loginRequest(param);
            return response;
        } catch (e) {
            if (e instanceof AxiosError) {
                return thunkAPI.rejectWithValue(e.response?.data);
            }
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (params: RegisterCredentials, thunkAPI) => {
        try {
            const response = await registerRequest(params);
            return response;
        } catch (e) {
            if (e instanceof AxiosError) {
                return thunkAPI.rejectWithValue(e.response?.data);
            }
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/refresh',
    async (params, thunkAPI) => {
        const response = await refreshRequest();
        return response;
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (params, thunkAPI) => {
        const response = await logoutRequest();
        return response;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(login.fulfilled, (state) => {
                state.isAuth = true;
            })
            builder.addCase(login.rejected, (state) => {
                state.isAuth = false;
            })
            builder.addCase(register.fulfilled, (state) => {
                state.isAuth = true;
            })
            builder.addCase(register.rejected, (state) => {
                state.isAuth = false;
            })
            builder.addCase(checkAuth.fulfilled, (state) => {
                state.isAuth = true;
            })
            builder.addCase(checkAuth.rejected, (state) => {
                state.isAuth = false;
            })
            builder.addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
            })
        }
});

export default authSlice.reducer;