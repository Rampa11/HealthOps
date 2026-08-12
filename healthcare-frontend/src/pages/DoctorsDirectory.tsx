import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Search,
    Stethoscope,
    MapPin,
    Clock3,
    ShieldCheck,
    UserRound,
    ArrowRight,
    SlidersHorizontal,
} from "lucide-react";

interface Doctor {
    id: string;
    user_id?: string;
    name: string;
    email?: string;
    specialization?: string;
    experience_years?: number;
    consultation_fee?: number;
    tenant_id?: string;
    profile_image?: string;
    city?: string;
    state?: string;
    bio?: string;
    verified?: boolean;
}

const API = "http://127.0.0.1:8000";

export default function DoctorsDirectory() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("all");

    useEffect(() => {
        async function loadDoctors() {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get<Doctor[]>(
                    `${API}/api/public/doctors`
                );

                setDoctors(response.data);
            } catch (err) {
                console.error("Failed to load doctors:", err);

                setError(
                    "We couldn't load the doctor directory right now. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        loadDoctors();
    }, []);

    const specializations = useMemo(() => {
        const values = doctors
            .map((doctor) => doctor.specialization)
            .filter(
                (value): value is string =>
                    Boolean(value && value.trim())
            );

        return Array.from(new Set(values)).sort();
    }, [doctors]);

    const filteredDoctors = useMemo(() => {
        const searchTerm = search.trim().toLowerCase();

        return doctors.filter((doctor) => {
            const matchesSearch =
                !searchTerm ||
                doctor.name.toLowerCase().includes(searchTerm) ||
                doctor.specialization
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                doctor.city
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                doctor.state
                    ?.toLowerCase()
                    .includes(searchTerm);

            const matchesSpecialization =
                specialization === "all" ||
                doctor.specialization === specialization;

            return matchesSearch && matchesSpecialization;
        });
    }, [doctors, search, specialization]);

    function formatFee(fee?: number) {
        if (fee === undefined || fee === null) {
            return "Fee not specified";
        }

        return `₦${fee.toLocaleString()}`;
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 text-white">

                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">

                            <Stethoscope size={18} />

                            HealthOpz Doctor Network

                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">

                            Find the right doctor for you.

                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-teal-50">

                            Connect with qualified doctors on HealthOpz
                            for consultations, medical guidance and
                            professional healthcare services.

                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/doctor-onboarding"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-teal-800 shadow-lg transition hover:bg-teal-50"
                            >
                                Register as a Doctor

                                <ArrowRight size={18} />

                            </Link>

                            <Link
                                to="/patient-login"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                            >
                                Patient Login
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                SEARCH / FILTER
            ===================================================== */}

            <section className="border-b bg-white">

                <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">

                    <div className="grid gap-4 md:grid-cols-[1fr_280px]">

                        {/* SEARCH */}

                        <div className="relative">

                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search doctors, specialties, cities..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                            />

                        </div>


                        {/* SPECIALIZATION */}

                        <div className="relative">

                            <SlidersHorizontal
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                value={specialization}
                                onChange={(e) =>
                                    setSpecialization(e.target.value)
                                }
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-4 pl-11 pr-4 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                            >

                                <option value="all">
                                    All Specializations
                                </option>

                                {specializations.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                DIRECTORY
            ===================================================== */}

            <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* ERROR */}

                {error && (

                    <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

                        {error}

                    </div>

                )}


                {/* HEADER */}

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                            Doctors Directory
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            Healthcare professionals
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Browse doctors available through HealthOpz.
                        </p>

                    </div>

                    {!loading && (

                        <div className="text-sm text-gray-500">

                            {filteredDoctors.length}{" "}
                            {filteredDoctors.length === 1
                                ? "doctor"
                                : "doctors"}

                        </div>

                    )}

                </div>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {[1, 2, 3, 4, 5, 6].map((item) => (

                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="h-16 w-16 rounded-full bg-gray-200" />

                                    <div className="flex-1">

                                        <div className="h-5 w-32 rounded bg-gray-200" />

                                        <div className="mt-2 h-4 w-24 rounded bg-gray-200" />

                                    </div>

                                </div>

                                <div className="mt-6 h-4 w-full rounded bg-gray-200" />

                                <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />

                            </div>

                        ))}

                    </div>

                )}


                {/* =================================================
                    EMPTY DIRECTORY
                ================================================= */}

                {!loading &&
                    doctors.length === 0 && (

                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">

                                <Stethoscope
                                    size={38}
                                    className="text-teal-700"
                                />

                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-gray-900">

                                Our doctor network is growing

                            </h3>

                            <p className="mx-auto mt-3 max-w-xl text-gray-600">

                                No freelance doctors are currently
                                available in the HealthOpz directory.
                                Doctors can register and create their
                                professional profile to join the network.

                            </p>

                            <Link
                                to="/doctor-onboarding"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
                            >

                                Become a HealthOpz Doctor

                                <ArrowRight size={18} />

                            </Link>

                        </div>
                    )}


                {/* =================================================
                    NO SEARCH RESULTS
                ================================================= */}

                {!loading &&
                    doctors.length > 0 &&
                    filteredDoctors.length === 0 && (

                        <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">

                                <Search
                                    size={30}
                                    className="text-gray-500"
                                />

                            </div>

                            <h3 className="mt-5 text-xl font-bold text-gray-900">

                                No doctors found

                            </h3>

                            <p className="mt-2 text-gray-600">

                                Try changing your search or
                                specialization filter.

                            </p>

                            <button
                                onClick={() => {
                                    setSearch("");
                                    setSpecialization("all");
                                }}
                                className="mt-5 font-semibold text-teal-700 hover:text-teal-800"
                            >
                                Clear filters
                            </button>

                        </div>
                    )}


                {/* =================================================
                    DOCTOR CARDS
                ================================================= */}

                {!loading &&
                    filteredDoctors.length > 0 && (

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {filteredDoctors.map((doctor) => (

                                <article
                                    key={doctor.id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                >

                                    {/* CARD TOP */}

                                    <div className="h-24 bg-gradient-to-r from-teal-700 to-cyan-600" />

                                    <div className="px-6 pb-6">

                                        {/* PROFILE */}

                                        <div className="-mt-12 flex items-end justify-between">

                                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">

                                                {doctor.profile_image ? (

                                                    <img
                                                        src={doctor.profile_image}
                                                        alt={doctor.name}
                                                        className="h-full w-full object-cover"
                                                    />

                                                ) : (

                                                    <UserRound
                                                        size={38}
                                                        className="text-gray-400"
                                                    />

                                                )}

                                            </div>

                                            {doctor.verified && (

                                                <div className="mb-2 flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">

                                                    <ShieldCheck size={14} />

                                                    Verified

                                                </div>

                                            )}

                                        </div>


                                        {/* NAME */}

                                        <h3 className="mt-4 text-xl font-bold text-gray-900">

                                            {doctor.name}

                                        </h3>


                                        {/* SPECIALIZATION */}

                                        <p className="mt-1 font-medium text-teal-700">

                                            {doctor.specialization ||
                                                "Medical Professional"}

                                        </p>


                                        {/* DETAILS */}

                                        <div className="mt-5 space-y-3 text-sm text-gray-600">

                                            {doctor.experience_years !==
                                                undefined && (

                                                    <div className="flex items-center gap-2">

                                                        <Clock3
                                                            size={17}
                                                            className="text-teal-600"
                                                        />

                                                        <span>
                                                            {doctor.experience_years}{" "}
                                                            years experience
                                                        </span>

                                                    </div>

                                                )}

                                            {(doctor.city ||
                                                doctor.state) && (

                                                    <div className="flex items-center gap-2">

                                                        <MapPin
                                                            size={17}
                                                            className="text-teal-600"
                                                        />

                                                        <span>
                                                            {doctor.city}
                                                            {doctor.city &&
                                                                doctor.state
                                                                ? ", "
                                                                : ""}
                                                            {doctor.state}
                                                        </span>

                                                    </div>

                                                )}

                                        </div>


                                        {/* BIO */}

                                        {doctor.bio && (

                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">

                                                {doctor.bio}

                                            </p>

                                        )}


                                        {/* FOOTER */}

                                        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

                                            <div>

                                                <p className="text-xs text-gray-500">
                                                    Consultation
                                                </p>

                                                <p className="font-bold text-gray-900">

                                                    {formatFee(
                                                        doctor.consultation_fee
                                                    )}

                                                </p>

                                            </div>

                                            <Link
                                                to={`/doctors/${doctor.id}`}
                                                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                                            >

                                                View Profile

                                                <ArrowRight size={16} />

                                            </Link>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>
                    )}

            </main>


            {/* =====================================================
                BECOME A DOCTOR CTA
            ===================================================== */}

            <section className="border-t bg-white">

                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                    <div className="rounded-3xl bg-slate-900 px-8 py-12 text-white lg:px-12">

                        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

                            <div className="max-w-2xl">

                                <p className="font-semibold text-teal-400">
                                    FOR MEDICAL PROFESSIONALS
                                </p>

                                <h2 className="mt-3 text-3xl font-bold">

                                    Build your practice with HealthOpz

                                </h2>

                                <p className="mt-3 leading-7 text-slate-300">

                                    Join the HealthOpz freelance doctor
                                    network and make your services
                                    available to patients across the
                                    platform.

                                </p>

                            </div>

                            <Link
                                to="/doctor-onboarding"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 py-3.5 font-semibold text-white transition hover:bg-teal-500"
                            >

                                Register as a Doctor

                                <ArrowRight size={18} />

                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}