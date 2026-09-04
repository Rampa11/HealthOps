import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Filter,
    HeartPulse,
    MapPin,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    X,
} from "lucide-react";
import axios from "axios";
import ProviderStory from "../components/ProviderStory";

interface Hospital {
    id: string;
    name: string;
    slug: string;
    logo?: string | null;
    hero_image?: string | null;
    hospital_type?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    primary_color?: string | null;
    verified?: boolean | null;
    about?: string | null;
}

const API = "";

/*
 * Nigeria states.
 *
 * We keep these available even when the backend does not yet
 * contain hospitals from every state.
 */
const NIGERIAN_STATES = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Federal Capital Territory",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
];

/*
 * Broad healthcare facility categories.
 *
 * These are deliberately broader than the values currently
 * stored in the database so the filter remains useful as
 * HealthOpz grows.
 */
const FACILITY_TYPES = [
    "Hospital",
    "General Hospital",
    "Teaching Hospital",
    "Specialist Hospital",
    "Private Hospital",
    "Public Hospital",
    "Clinic",
    "Medical Centre",
    "Primary Healthcare Centre",
    "Diagnostic Centre",
    "Laboratory",
    "Maternity Hospital",
    "Children's Hospital",
    "Orthopaedic Hospital",
    "Cardiac Hospital",
    "Psychiatric Hospital",
    "Eye Hospital",
    "Dental Clinic",
    "Cancer Centre",
    "Rehabilitation Centre",
    "Specialty Clinic",
];

export default function Hospitals() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [stateFilter, setStateFilter] = useState("all");
    const [facilityFilter, setFacilityFilter] = useState("all");

    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        async function loadHospitals() {
            try {
                const response = await axios.get(
                    `${API}/api/public/hospitals`
                );

                setHospitals(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );
            } catch (error) {
                console.error(
                    "Failed to load hospitals:",
                    error
                );

                setHospitals([]);
            } finally {
                setLoading(false);
            }
        }

        loadHospitals();
    }, []);

    /*
     * Combine our complete Nigerian state list with states
     * actually returned by the backend.
     *
     * This guarantees the dropdown is populated.
     */
    const states = useMemo(() => {
        const backendStates = hospitals
            .map((hospital) => hospital.state?.trim())
            .filter(Boolean) as string[];

        return Array.from(
            new Set([
                ...NIGERIAN_STATES,
                ...backendStates,
            ])
        ).sort();
    }, [hospitals]);

    /*
     * Combine broad facility types with values actually
     * returned by the backend.
     */
    const facilityTypes = useMemo(() => {
        const backendTypes = hospitals
            .map((hospital) =>
                hospital.hospital_type?.trim()
            )
            .filter(Boolean) as string[];

        return Array.from(
            new Set([
                ...FACILITY_TYPES,
                ...backendTypes,
            ])
        ).sort();
    }, [hospitals]);

    const filteredHospitals = useMemo(() => {
        const query = search.trim().toLowerCase();

        return hospitals.filter((hospital) => {
            const searchableText = [
                hospital.name,
                hospital.city,
                hospital.state,
                hospital.country,
                hospital.hospital_type,
                hospital.about,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                query === "" ||
                searchableText.includes(query);

            const matchesState =
                stateFilter === "all" ||
                hospital.state?.trim().toLowerCase() ===
                stateFilter.toLowerCase();

            const matchesFacility =
                facilityFilter === "all" ||
                hospital.hospital_type?.trim().toLowerCase() ===
                facilityFilter.toLowerCase();

            return (
                matchesSearch &&
                matchesState &&
                matchesFacility
            );
        });
    }, [
        hospitals,
        search,
        stateFilter,
        facilityFilter,
    ]);

    const hasFilters =
        search.trim() !== "" ||
        stateFilter !== "all" ||
        facilityFilter !== "all";

    function clearFilters() {
        setSearch("");
        setStateFilter("all");
        setFacilityFilter("all");
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =====================================================
                PREMIUM HERO
            ====================================================== */}

            <section className="relative overflow-hidden bg-slate-950">

                {/* Background decoration */}

                <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-500/20 blur-3xl" />

                <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.16),transparent_40%)]" />

                <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20 lg:px-8 lg:pb-40 lg:pt-28">

                    <div className="max-w-4xl">

                        {/* Eyebrow */}

                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-teal-300 backdrop-blur">

                            <HeartPulse size={17} />

                            HealthOpz Healthcare Network

                        </div>

                        {/* Heading */}

                        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">

                            Find the right healthcare facility{" "}
                            <span className="text-teal-400">
                                for your care.
                            </span>

                        </h1>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">

                            Discover hospitals, clinics, diagnostic
                            centres and specialist healthcare facilities
                            across Nigeria — all from one trusted
                            healthcare platform.

                        </p>

                        {/* Trust indicators */}

                        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">

                            <div className="flex items-center gap-2">

                                <ShieldCheck
                                    size={17}
                                    className="text-teal-400"
                                />

                                Verified facilities

                            </div>

                            <div className="flex items-center gap-2">

                                <MapPin
                                    size={17}
                                    className="text-teal-400"
                                />

                                Nationwide coverage

                            </div>

                            <div className="flex items-center gap-2">

                                <BadgeCheck
                                    size={17}
                                    className="text-teal-400"
                                />

                                Trusted healthcare network

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* =====================================================
                SEARCH PANEL
            ====================================================== */}

            <section className="relative z-20 -mt-20 px-6 lg:px-8">

                <div className="mx-auto max-w-7xl">

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7">

                        {/* Search */}

                        <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr_1fr_auto]">

                            {/* SEARCH */}

                            <div className="relative">

                                <Search
                                    size={20}
                                    className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search hospitals, clinics, cities..."
                                    className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-12 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSearch("")
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                                        aria-label="Clear search"
                                    >
                                        <X size={17} />
                                    </button>
                                )}

                            </div>


                            {/* STATE */}

                            <div className="relative">

                                <MapPin
                                    size={19}
                                    className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                />

                                <select
                                    value={stateFilter}
                                    onChange={(e) =>
                                        setStateFilter(
                                            e.target.value
                                        )
                                    }
                                    className="h-16 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-11 text-base font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                >

                                    <option value="all">
                                        All States
                                    </option>

                                    {states.map((state) => (
                                        <option
                                            key={state}
                                            value={state}
                                        >
                                            {state}
                                        </option>
                                    ))}

                                </select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                            </div>


                            {/* FACILITY */}

                            <div className="relative">

                                <Building2
                                    size={19}
                                    className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                />

                                <select
                                    value={facilityFilter}
                                    onChange={(e) =>
                                        setFacilityFilter(
                                            e.target.value
                                        )
                                    }
                                    className="h-16 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-11 text-base font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                >

                                    <option value="all">
                                        All Facility Types
                                    </option>

                                    {facilityTypes.map(
                                        (type) => (
                                            <option
                                                key={type}
                                                value={type}
                                            >
                                                {type}
                                            </option>
                                        )
                                    )}

                                </select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                            </div>


                            {/* FILTER BUTTON */}

                            <button
                                type="button"
                                onClick={() =>
                                    setShowFilters(
                                        !showFilters
                                    )
                                }
                                className={`flex h-16 items-center justify-center gap-2 rounded-2xl px-6 font-bold transition ${showFilters
                                    ? "bg-teal-700 text-white"
                                    : "border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700"
                                    }`}
                            >

                                <SlidersHorizontal size={19} />

                                <span className="hidden xl:inline">
                                    Filters
                                </span>

                            </button>

                        </div>


                        {/* FILTER SUMMARY */}

                        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <p className="text-sm text-slate-500">

                                    Showing{" "}

                                    <span className="font-bold text-slate-900">
                                        {filteredHospitals.length}
                                    </span>{" "}

                                    {filteredHospitals.length === 1
                                        ? "healthcare facility"
                                        : "healthcare facilities"}

                                </p>

                            </div>

                            <div className="flex items-center gap-4">

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="text-sm font-semibold text-teal-700 transition hover:text-teal-900"
                                    >
                                        Clear all filters
                                    </button>
                                )}

                                <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">

                                    <Filter size={14} />

                                    Refine your search

                                </div>

                            </div>

                        </div>


                        {/* OPTIONAL FILTER PANEL */}

                        {showFilters && (
                            <div className="mt-5 rounded-2xl bg-slate-50 p-5">

                                <div className="grid gap-5 md:grid-cols-2">

                                    <div>

                                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Location
                                        </p>

                                        <p className="text-sm text-slate-600">
                                            Select a state above to
                                            narrow your healthcare
                                            search.
                                        </p>

                                    </div>

                                    <div>

                                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Facility
                                        </p>

                                        <p className="text-sm text-slate-600">
                                            Choose from hospitals,
                                            clinics, laboratories,
                                            specialist centres and
                                            other healthcare facilities.
                                        </p>

                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </section>


            {/* =====================================================
                RESULTS
            ====================================================== */}

            <ProviderStory kind="hospitals" />

            <section className="px-6 py-20 lg:px-8 lg:py-24">

                <div className="mx-auto max-w-7xl">

                    {/* Section heading */}

                    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                                Healthcare Directory
                            </p>

                            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                Healthcare facilities
                            </h2>

                            <p className="mt-3 max-w-2xl text-slate-500">
                                Explore trusted healthcare providers
                                available through the HealthOpz network.
                            </p>

                        </div>

                        {!loading && hospitals.length > 0 && (
                            <div className="hidden items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 sm:flex">

                                <Building2 size={16} />

                                {hospitals.length} facilities
                            </div>
                        )}

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {[1, 2, 3, 4, 5, 6].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white"
                                    >

                                        <div className="h-56 animate-pulse bg-slate-200" />

                                        <div className="space-y-4 p-6">

                                            <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

                                            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

                                            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

                                            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

                                        </div>

                                    </div>
                                )
                            )}

                        </div>

                    ) : filteredHospitals.length === 0 ? (

                        /* EMPTY STATE */

                        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-24 text-center shadow-sm">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">

                                <Search
                                    size={34}
                                    className="text-slate-400"
                                />

                            </div>

                            <h3 className="mt-6 text-2xl font-black text-slate-900">
                                No facilities found
                            </h3>

                            <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-500">
                                We couldn't find a healthcare facility
                                matching your current search criteria.
                                Try a different hospital name, state or
                                facility type.
                            </p>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 font-bold text-white transition hover:bg-teal-800"
                            >
                                Reset Search
                                <ArrowRight size={18} />
                            </button>

                        </div>

                    ) : (

                        /* HOSPITAL GRID */

                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                            {filteredHospitals.map(
                                (hospital) => (

                                    <Link
                                        key={
                                            hospital.id ||
                                            hospital.slug
                                        }
                                        to={`/hospital/${hospital.slug}`}
                                        className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-2xl hover:shadow-slate-900/10"
                                    >

                                        {/* CARD IMAGE */}

                                        <div
                                            className="relative h-56 overflow-hidden"
                                            style={{
                                                background:
                                                    hospital.primary_color ||
                                                    "#0f766e",
                                            }}
                                        >

                                            {hospital.hero_image ? (

                                                <img
                                                    src={
                                                        hospital.hero_image
                                                    }
                                                    alt={
                                                        hospital.name
                                                    }
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                />

                                            ) : hospital.logo ? (

                                                <div className="flex h-full w-full items-center justify-center bg-white">

                                                    <img
                                                        src={
                                                            hospital.logo
                                                        }
                                                        alt={
                                                            hospital.name
                                                        }
                                                        className="max-h-32 max-w-[65%] object-contain transition duration-500 group-hover:scale-105"
                                                    />

                                                </div>

                                            ) : (

                                                <div className="flex h-full w-full items-center justify-center">

                                                    <Building2
                                                        size={72}
                                                        className="text-white/70"
                                                    />

                                                </div>

                                            )}


                                            {/* Image overlay */}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />


                                            {/* VERIFIED */}

                                            {hospital.verified && (

                                                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-teal-700 shadow-lg">

                                                    <CheckCircle2
                                                        size={15}
                                                    />

                                                    Verified

                                                </div>

                                            )}

                                        </div>


                                        {/* CONTENT */}

                                        <div className="p-7">

                                            <div className="flex items-start justify-between gap-5">

                                                <div className="min-w-0">

                                                    <h3 className="truncate text-xl font-black text-slate-900 transition group-hover:text-teal-700">
                                                        {hospital.name}
                                                    </h3>

                                                    {hospital.hospital_type && (

                                                        <p className="mt-1.5 text-sm font-semibold text-teal-700">
                                                            {
                                                                hospital.hospital_type
                                                            }
                                                        </p>

                                                    )}

                                                </div>

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-teal-50 group-hover:text-teal-700">

                                                    <ArrowRight
                                                        size={19}
                                                        className="transition group-hover:translate-x-0.5"
                                                    />

                                                </div>

                                            </div>


                                            {/* LOCATION */}

                                            {(hospital.city ||
                                                hospital.state) && (

                                                    <div className="mt-6 flex items-start gap-3">

                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50">

                                                            <MapPin
                                                                size={17}
                                                                className="text-teal-700"
                                                            />

                                                        </div>

                                                        <div>

                                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                                Location
                                                            </p>

                                                            <p className="mt-0.5 text-sm font-semibold text-slate-700">
                                                                {[
                                                                    hospital.city,
                                                                    hospital.state,
                                                                ]
                                                                    .filter(
                                                                        Boolean
                                                                    )
                                                                    .join(
                                                                        ", "
                                                                    )}
                                                            </p>

                                                        </div>

                                                    </div>

                                                )}


                                            {/* ABOUT */}

                                            {hospital.about && (

                                                <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
                                                    {
                                                        hospital.about
                                                    }
                                                </p>

                                            )}


                                            {/* FOOTER */}

                                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">

                                                    <Clock3
                                                        size={15}
                                                    />

                                                    Healthcare Provider

                                                </div>

                                                <span className="text-sm font-bold text-teal-700">
                                                    View Facility
                                                </span>

                                            </div>

                                        </div>

                                    </Link>

                                )
                            )}

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================================
                PREMIUM PROVIDER CTA
            ====================================================== */}

            <section className="px-6 pb-24 lg:px-8">

                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950">

                    <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />

                    <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-10 px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-16">

                        <div className="max-w-2xl">

                            <div className="flex items-center gap-2 text-sm font-bold text-teal-400">

                                <Building2 size={17} />

                                Healthcare Providers

                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Is your facility ready for
                                HealthOpz?
                            </h2>

                            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                                Create a professional digital presence,
                                reach more patients and become part of
                                the HealthOpz healthcare network.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-300">

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-teal-400"
                                    />
                                    Professional profile
                                </span>

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-teal-400"
                                    />
                                    Patient discovery
                                </span>

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-teal-400"
                                    />
                                    Verified presence
                                </span>

                            </div>

                        </div>


                        <Link
                            to="/hospital-onboarding"
                            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-teal-500 px-7 py-4 font-black text-white shadow-xl shadow-teal-950/30 transition hover:bg-teal-400 hover:shadow-teal-500/20"
                        >
                            Register Your Facility
                            <ArrowRight size={19} />
                        </Link>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FOOTER NOTE
            ====================================================== */}

            <div className="border-t border-slate-200 bg-white px-6 py-8">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-400 sm:flex-row">

                    <p>
                        HealthOpz Healthcare Network
                    </p>

                    <div className="flex items-center gap-2">

                        <ShieldCheck
                            size={15}
                            className="text-teal-600"
                        />

                        Healthcare information you can trust.

                    </div>

                </div>

            </div>

        </div>
    );
}
