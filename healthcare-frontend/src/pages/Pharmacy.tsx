import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle2,
    MapPin,
    Search,
    ShieldCheck,
    Store,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProviderStory from "../components/ProviderStory";

type Pharmacy = {
    id: number;
    name: string;
    location: string;
    city: string;
    state: string;
    services: string[];
    verified: boolean;
};

const pharmacies: Pharmacy[] = [
    {
        id: 1,
        name: "HealthPlus Pharmacy",
        location: "Warri, Delta State",
        city: "Warri",
        state: "Delta",
        services: [
            "Prescription Medicines",
            "OTC Medicines",
            "Health Consultation",
        ],
        verified: true,
    },
    {
        id: 2,
        name: "MediCare Pharmacy",
        location: "Lagos, Lagos State",
        city: "Lagos",
        state: "Lagos",
        services: [
            "Prescription Medicines",
            "Family Healthcare",
            "Health Products",
        ],
        verified: true,
    },
    {
        id: 3,
        name: "WellLife Pharmacy",
        location: "Abuja, FCT",
        city: "Abuja",
        state: "FCT",
        services: [
            "Prescription Medicines",
            "Wellness Products",
            "Health Consultation",
        ],
        verified: true,
    },
];

export default function Pharmacy() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filteredPharmacies = pharmacies.filter((pharmacy) => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) {
            return true;
        }

        return (
            pharmacy.name.toLowerCase().includes(keyword) ||
            pharmacy.location.toLowerCase().includes(keyword) ||
            pharmacy.city.toLowerCase().includes(keyword) ||
            pharmacy.state.toLowerCase().includes(keyword) ||
            pharmacy.services.some((service) =>
                service.toLowerCase().includes(keyword)
            )
        );
    });

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 text-white">

                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

                <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">

                    <div className="max-w-4xl">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                            <Store size={17} />
                            HealthOpz Pharmacy Network
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Find Trusted Pharmacies
                            <span className="block text-teal-200">
                                Near You
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-teal-50 sm:text-xl">
                            Discover pharmacies and pharmaceutical services
                            across the HealthOpz network. Find healthcare
                            products, prescription medicines and professional
                            pharmacy services from verified providers.
                        </p>

                        {/* Search */}

                        <div className="mt-10 max-w-3xl">

                            <div className="flex items-center overflow-hidden rounded-2xl bg-white shadow-2xl">

                                <Search
                                    size={23}
                                    className="ml-5 shrink-0 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search pharmacy, city, state or service..."
                                    className="w-full px-5 py-5 text-base text-slate-800 outline-none placeholder:text-slate-400 sm:text-lg"
                                />

                                <button
                                    type="button"
                                    className="mr-2 hidden rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 sm:block"
                                >
                                    Search
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <ProviderStory kind="pharmacy" />

            {/* =========================================================
                TRUST STRIP
            ========================================================= */}

            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-3">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                            <ShieldCheck
                                size={23}
                                className="text-teal-700"
                            />
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Verified Providers
                            </p>

                            <p className="text-sm text-slate-500">
                                Professional verification
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50">
                            <BadgeCheck
                                size={23}
                                className="text-cyan-700"
                            />
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Trusted Information
                            </p>

                            <p className="text-sm text-slate-500">
                                Reliable pharmacy profiles
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                            <MapPin
                                size={23}
                                className="text-teal-700"
                            />
                        </div>

                        <div>
                            <p className="font-bold text-slate-900">
                                Find Nearby
                            </p>

                            <p className="text-sm text-slate-500">
                                Discover pharmacies by location
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                PHARMACY DIRECTORY
            ========================================================= */}

            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <span className="text-sm font-bold uppercase tracking-wider text-teal-700">
                            Pharmacy Directory
                        </span>

                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Pharmacies on HealthOpz
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-600">
                            Explore pharmacies offering pharmaceutical and
                            healthcare services within the HealthOpz network.
                        </p>

                    </div>

                    <div className="rounded-full bg-teal-100 px-5 py-2 text-sm font-bold text-teal-700">
                        {filteredPharmacies.length} Pharmacies
                    </div>

                </div>

                {filteredPharmacies.length === 0 ? (

                    <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                            <Search
                                size={28}
                                className="text-slate-400"
                            />
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-slate-900">
                            No pharmacies found
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Try searching for a different pharmacy, location
                            or service.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                        {filteredPharmacies.map((pharmacy) => (

                            <div
                                key={pharmacy.id}
                                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >

                                {/* Card Header */}

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6">

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                                            <Building2
                                                size={27}
                                                className="text-teal-700"
                                            />
                                        </div>

                                        {pharmacy.verified && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-700 shadow-sm">
                                                <BadgeCheck size={14} />
                                                Verified
                                            </span>
                                        )}

                                    </div>

                                    <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                                        {pharmacy.name}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin size={16} />
                                        {pharmacy.location}
                                    </div>

                                </div>

                                {/* Card Body */}

                                <div className="p-6">

                                    <p className="text-sm font-semibold text-slate-700">
                                        Services
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">

                                        {pharmacy.services.map((service) => (

                                            <span
                                                key={service}
                                                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                                            >
                                                {service}
                                            </span>

                                        ))}

                                    </div>

                                    <button
                                        type="button"
                                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 py-3 font-bold text-teal-700 transition hover:bg-teal-100"
                                    >
                                        View Pharmacy
                                        <ArrowRight size={17} />
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

            {/* =========================================================
                PHARMACY PARTNER CTA
            ========================================================= */}

            <section className="bg-slate-900 py-20 text-white">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 to-cyan-800 p-8 sm:p-12 lg:p-14">

                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative max-w-3xl">

                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-teal-100">
                                <Store size={17} />
                                Pharmacy Professionals
                            </span>

                            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Bring Your Pharmacy to HealthOpz
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-teal-50">
                                Register your pharmacy with HealthOpz, create
                                your professional profile and make your
                                pharmaceutical services discoverable to
                                patients and healthcare users.
                            </p>

                            <div className="mt-8">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/pharmacy-onboarding"
                                        )
                                    }
                                    className="inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-teal-800 shadow-lg transition hover:bg-teal-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
                                >
                                    Register Your Pharmacy
                                    <ArrowRight size={19} />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                WHY HEALTHOPZ
            ========================================================= */}

            <section className="bg-white py-20">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="text-sm font-bold uppercase tracking-wider text-teal-700">
                            Why HealthOpz
                        </span>

                        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Connecting People With Better Healthcare
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            HealthOpz brings healthcare providers and
                            healthcare users together through one connected
                            digital platform.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-7 md:grid-cols-3">

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                                <ShieldCheck
                                    size={23}
                                    className="text-teal-700"
                                />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Professional Verification
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Provider information and submitted professional
                                credentials can be reviewed as part of the
                                HealthOpz verification process.
                            </p>

                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100">
                                <MapPin
                                    size={23}
                                    className="text-cyan-700"
                                />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Easier Discovery
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Help healthcare users discover pharmacies and
                                services based on location and healthcare
                                needs.
                            </p>

                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                                <CheckCircle2
                                    size={23}
                                    className="text-teal-700"
                                />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Connected Healthcare
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Connect pharmacies with the wider HealthOpz
                                healthcare ecosystem.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                FOOTER
            ========================================================= */}

            <footer className="bg-slate-950 py-10 text-center text-slate-400">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-2xl font-extrabold text-white">
                        HealthOpz
                    </h2>

                    <p className="mt-2">
                        Healthcare Without Boundaries
                    </p>

                    <p className="mt-6 text-sm text-slate-600">
                        © {new Date().getFullYear()} HealthOpz. All Rights
                        Reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}
