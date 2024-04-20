import axios from "axios";
import { LoginCredentials, RegisterCredentials } from "./auth.dto";
import { API } from "../../shared/api";

export async function loginRequest(credentials: LoginCredentials) {
    const response = await axios.post(`${API}/auth/login`, credentials, {
        withCredentials: true
    });
    return response.data;
}

export async function registerRequest(credentials: RegisterCredentials) {
    const response = await axios.post(`${API}/auth/register`, credentials, {
        withCredentials: true
    });
    return response.data;
}

export async function refreshRequest() {
    const response = await axios.post(`${API}/auth/refresh`, {}, {
        withCredentials: true
    });
    return response.data;
}

export async function logoutRequest() {
    const response = await axios.post(`${API}/auth/logout`, {}, {
        withCredentials: true
    });
    return response.data;
}