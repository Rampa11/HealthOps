import api from "../api";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface Hospital {

    id: string;

    name: string;

    slug: string;

    logo?: string;

    website?: string;

    hospital_type?: string;

    city?: string;

    state?: string;

    country?: string;

    phone?: string;

    email?: string;

    about?: string;

    primary_color?: string;

    secondary_color?: string;

    hero_image?: string;

    is_verified?: boolean;

}

/*
|--------------------------------------------------------------------------
| Get all hospitals
|--------------------------------------------------------------------------
*/

export async function getHospitals(): Promise<Hospital[]> {

    const response = await api.get("/api/public/hospitals");

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get hospital by slug
|--------------------------------------------------------------------------
*/

export async function getHospitalBySlug(
    slug: string
): Promise<Hospital> {

    const response = await api.get(
        `/api/public/tenant/${slug}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Search hospitals
|--------------------------------------------------------------------------
*/

export async function searchHospitals(
    keyword: string
): Promise<Hospital[]> {

    const response = await api.get(
        "/api/public/hospitals",
        {
            params: {
                search: keyword,
            },
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Featured hospitals
|--------------------------------------------------------------------------
*/

export async function getFeaturedHospitals(): Promise<Hospital[]> {

    const response = await api.get(
        "/api/public/hospitals",
        {
            params: {
                featured: true,
            },
        }
    );

    return response.data;

}