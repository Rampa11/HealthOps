import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Hospital {
    id: string;
    name: string;
    slug: string;

    logo?: string;
    hero_image?: string;

    about?: string;

    address?: string;
    city?: string;
    state?: string;
    country?: string;

    website?: string;
    phone?: string;
    email?: string;

    primary_color?: string;
    secondary_color?: string;

    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
}

export default function HospitalPage() {
    const { slug } = useParams();

    const [hospital, setHospital] = useState<Hospital | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        axios
            .get(`/api/public/tenant/${slug}`)
            .then((res) => {
                setHospital(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="p-10 text-center text-xl">
                Loading Hospital...
            </div>
        );
    }

    if (!hospital) {
        return (
            <div className="p-10 text-center">
                Hospital not found.
            </div>
        );
    }

    return (
        <div
            className="min-h-screen"
            style={{
                background: "#f8fafc"
            }}
        >
            {/* HERO */}

            <div
                className="h-72 flex items-center justify-center text-white"
                style={{
                    background:
                        hospital.primary_color || "#2563eb"
                }}
            >
                <div className="text-center">

                    {hospital.logo && (
                        <img
                            src={hospital.logo}
                            alt={hospital.name}
                            className="mx-auto mb-4 h-24"
                        />
                    )}

                    <h1 className="text-5xl font-bold">
                        {hospital.name}
                    </h1>

                    <p className="mt-3 text-lg">
                        {hospital.city},
                        {" "}
                        {hospital.state}
                    </p>

                </div>
            </div>

            {/* CONTENT */}

            <div className="max-w-7xl mx-auto p-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT */}

                    <div className="lg:col-span-2">

                        <h2 className="text-3xl font-bold mb-5">
                            About Us
                        </h2>

                        <p className="text-gray-700 leading-8">
                            {hospital.about ||
                                "Hospital information coming soon."}
                        </p>

                        {hospital.hero_image && (
                            <img
                                src={hospital.hero_image}
                                alt="Hospital"
                                className="mt-8 rounded-xl shadow-lg"
                            />
                        )}

                    </div>

                    {/* RIGHT */}

                    <div className="bg-white rounded-xl shadow p-6">

                        <h3 className="font-bold text-xl mb-4">
                            Contact
                        </h3>

                        <p>{hospital.address}</p>

                        <p>{hospital.city}</p>

                        <p>{hospital.state}</p>

                        <p>{hospital.country}</p>

                        <hr className="my-5" />

                        <p>{hospital.phone}</p>

                        <p>{hospital.email}</p>

                        {hospital.website && (
                            <a
                                href={hospital.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600"
                            >
                                Visit Website
                            </a>
                        )}

                        <hr className="my-5" />

                        <Link
                            to="/get-started"
                            className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    );
}