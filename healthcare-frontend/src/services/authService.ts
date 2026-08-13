import axios from "axios";

const API = "";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    role: string;
    is_active: boolean;
}

export async function loginHospital(
    data: LoginPayload
): Promise<LoginResponse> {

    const response = await axios.post(
        `${API}/auth/login`,
        data
    );

    return response.data;
}