import axios from "axios";
import type { Tenant } from "../types/tenant";

const API = "";

export async function getHospitals(): Promise<Tenant[]> {
    const response = await axios.get(
        `${API}/api/public/hospitals`
    );

    return response.data;
}

export async function getHospital(
    slug: string
): Promise<Tenant> {
    const response = await axios.get(
        `${API}/api/public/tenant/${slug}`
    );

    return response.data;
}