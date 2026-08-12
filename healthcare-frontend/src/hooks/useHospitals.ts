import { useEffect, useState } from "react";
import {
    Hospital,
    getHospitals,
} from "../services/hospitalService";

export function useHospitals() {

    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const loadHospitals = async () => {

        try {

            setLoading(true);

            const data = await getHospitals();

            setHospitals(data);

            setError("");

        } catch (err: any) {

            console.error(err);

            setError(
                err.response?.data?.detail ??
                "Unable to load hospitals."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadHospitals();

    }, []);

    return {

        hospitals,

        loading,

        error,

        refresh: loadHospitals,

    };

}