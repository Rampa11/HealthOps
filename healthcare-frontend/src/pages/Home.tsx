import { useEffect, useState } from "react";
import {
    ArrowRight,
    BadgeCheck,
    BriefcaseMedical,
    Building2,
    HeartPulse,
    Search,
    ShieldCheck,
    Stethoscope,
    Users,
} from "lucide-react";

import HospitalGrid from "../components/HospitalGrid";
import BecomeNurseButton from "../components/BecomeNurseButton";
import BecomeTraditionalMedicineButton from "../components/BecomeTraditionalMedicineButton";
import { getHospitals } from "../api/hospital";
import type { Tenant } from "../types/tenant";

export default function Home() {
    const [hospitals, setHospitals] = useState<Tenant[]>([]);
    const [filteredHospitals, setFilteredHospitals] = useState<Tenant[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadHospitals() {
            try {
                const data = await getHospitals();

                setHospitals(data);
                setFilteredHospitals(data);
            } catch (error) {
                console.error("Failed to load hospitals", error);
            } finally {
                setLoading(false);
            }
        }

        loadHospitals();
    }, []);

    useEffect(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) {
            setFilteredHospitals(hospitals);
            return;
        }

        const results = hospitals.filter((hospital) => {
            return (
                hospital.name.toLowerCase().includes(keyword) ||
                (hospital.city ?? "").toLowerCase().includes(keyword) ||
                (hospital.state ?? "").toLowerCase().includes(keyword) ||
                (hospital.hospital_type ?? "")
                    .toLowerCase()
                    .includes(keyword)
            );
        });

        setFilteredHospitals(results);
    }, [search, hospitals]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative overflow-hidden bg-slate-950">

                {/* Decorative background */}
                <div className="absolute inset-0">
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
                    <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">

                    <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* Hero Content */}

                        <div>

                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-300">

                                <HeartPulse size={17} />

                                Healthcare Without Boundaries

                            </div>

                            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

                                Better Healthcare.
                                <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                                    Connected.
                                </span>

                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">

                                Find hospitals, doctors, nurses and other
                                healthcare professionals across Africa through
                                one trusted healthcare platform.

                            </p>

                            {/* Search */}

                            <div className="mt-10 max-w-2xl">

                                <div className="flex items-center rounded-2xl border border-white/10 bg-white p-2 shadow-2xl shadow-black/20">

                                    <Search
                                        size={22}
                                        className="ml-4 shrink-0 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search hospitals, cities or specialties..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full bg-transparent px-4 py-4 text-base text-slate-900 outline-none placeholder:text-slate-400"
                                    />

                                    <button
                                        type="button"
                                        className="hidden rounded-xl bg-teal-600 px-6 py-4 font-semibold text-white transition hover:bg-teal-700 sm:block"
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>

                            {/* Trust indicators */}

                            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">

                                <div className="flex items-center gap-2">
                                    <ShieldCheck
                                        size={17}
                                        className="text-teal-400"
                                    />
                                    Verified Professionals
                                </div>

                                <div className="flex items-center gap-2">
                                    <BadgeCheck
                                        size={17}
                                        className="text-teal-400"
                                    />
                                    Trusted Healthcare Network
                                </div>

                                <div className="flex items-center gap-2">
                                    <Users
                                        size={17}
                                        className="text-teal-400"
                                    />
                                    Growing Community
                                </div>

                            </div>

                        </div>

                        {/* Hero Visual */}

                        <div className="relative hidden lg:block">

                            <div className="relative mx-auto max-w-md">

                                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-teal-500/20 to-cyan-500/10 blur-2xl" />

                                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">

                                    <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 to-cyan-700 p-8">

                                        <HeartPulse
                                            size={52}
                                            className="text-white"
                                        />

                                        <h2 className="mt-16 text-3xl font-bold text-white">
                                            Healthcare,
                                            <br />
                                            connected to you.
                                        </h2>

                                        <p className="mt-4 leading-7 text-teal-50">
                                            Discover healthcare services,
                                            facilities and professionals
                                            from one platform.
                                        </p>

                                        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                                                <Stethoscope
                                                    size={22}
                                                    className="text-white"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    Healthcare Professionals
                                                </p>

                                                <p className="text-xs text-teal-100">
                                                    Doctors • Nurses • Specialists
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                QUICK SERVICES
            ====================================================== */}

            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">

                    <div className="flex items-center gap-4 px-0 py-7 sm:px-8">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                            <Building2
                                size={23}
                                className="text-teal-700"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold">
                                Hospitals
                            </h3>

                            <p className="text-sm text-slate-500">
                                Discover healthcare facilities
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 px-0 py-7 sm:px-8">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50">
                            <Stethoscope
                                size={23}
                                className="text-cyan-700"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold">
                                Doctors
                            </h3>

                            <p className="text-sm text-slate-500">
                                Connect with professionals
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 px-0 py-7 sm:px-8">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                            <BriefcaseMedical
                                size={23}
                                className="text-emerald-700"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold">
                                Freelance Nurses
                            </h3>

                            <p className="text-sm text-slate-500">
                                Find independent nursing care
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                FEATURED HOSPITALS
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

                <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-teal-700">
                            Healthcare Facilities
                        </p>

                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Featured Hospitals
                        </h2>

                        <p className="mt-3 max-w-2xl text-lg text-slate-500">
                            Browse healthcare facilities available on the
                            HealthOpz platform.
                        </p>

                    </div>

                    <span className="w-fit rounded-full bg-teal-50 px-5 py-2.5 text-sm font-bold text-teal-700">
                        {filteredHospitals.length} Hospitals
                    </span>

                </div>

                {loading ? (

                    <div className="rounded-3xl border border-slate-200 bg-white py-24 text-center shadow-sm">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />

                        <p className="mt-5 font-medium text-slate-500">
                            Loading hospitals...
                        </p>

                    </div>

                ) : filteredHospitals.length > 0 ? (

                    <HospitalGrid hospitals={filteredHospitals} />

                ) : (

                    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center">

                        <Building2
                            size={42}
                            className="mx-auto text-slate-300"
                        />

                        <h3 className="mt-5 text-xl font-bold">
                            No hospitals found
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Try another hospital name, city or specialty.
                        </p>

                    </div>

                )}

            </section>

            {/* =====================================================
                PROFESSIONALS
            ====================================================== */}

            <section className="bg-white py-24">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-teal-700">
                            Healthcare Professionals
                        </p>

                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Find the right professional for your care.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-500">
                            HealthOpz connects patients and healthcare
                            organizations with healthcare professionals
                            across different areas of care.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-2">

                        {/* Doctors */}

                        <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100">
                                <Stethoscope
                                    size={27}
                                    className="text-teal-700"
                                />
                            </div>

                            <h3 className="mt-7 text-2xl font-bold">
                                Doctors
                            </h3>

                            <p className="mt-3 leading-7 text-slate-500">
                                Connect with licensed doctors and healthcare
                                professionals based on your healthcare needs.
                            </p>

                            <div className="mt-7 flex items-center gap-2 font-semibold text-teal-700">
                                Explore Doctors
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </div>

                        </div>

                        {/* Nurses */}

                        <div className="group rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-8 transition hover:-translate-y-1 hover:shadow-xl">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                                <BriefcaseMedical
                                    size={27}
                                    className="text-teal-700"
                                />
                            </div>

                            <h3 className="mt-7 text-2xl font-bold">
                                Freelance Nurses
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Find independent nurses offering home care,
                                private nursing services, recovery support
                                and other professional care services.
                            </p>

                            <div className="mt-7 flex items-center gap-2 font-semibold text-teal-700">
                                Explore Freelance Nurses
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                BECOME A NURSE
            ====================================================== */}

            <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-900 py-24">

                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

                <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                        <HeartPulse
                            size={31}
                            className="text-white"
                        />
                    </div>

                    <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-teal-200">
                        For Qualified Nurses
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Become a Freelance Nurse
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-teal-50">
                        Are you a qualified nurse looking for independent
                        nursing opportunities? Register with HealthOpz,
                        submit your professional credentials for verification
                        and make your services discoverable to potential
                        clients.
                    </p>

                    <div className="mt-9">
                        <BecomeNurseButton variant="large">
                            Become a Nurse
                        </BecomeNurseButton>
                    </div>

                    <p className="mt-5 text-sm text-teal-200">
                        Your professional credentials are reviewed before
                        your profile can be verified.
                    </p>

                </div>

            </section>

            {/* ================= TRADITIONAL MEDICINE ================= */}

            <section className="bg-white py-20">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-8 shadow-sm sm:p-12">

                        <div className="max-w-3xl">

                            <span className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
                                Traditional Medicine
                            </span>

                            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900">
                                Discover Trusted Traditional Medicine Practitioners
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-slate-600">
                                Discover traditional medicine practitioners and
                                healthcare practices across Africa. Practitioners can
                                create professional profiles and submit their
                                credentials for HealthOpz verification.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <BecomeTraditionalMedicineButton variant="large">
                                    Become a Traditional Medicine Practitioner
                                </BecomeTraditionalMedicineButton>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer className="bg-slate-950 py-14">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600">
                                    <HeartPulse
                                        size={23}
                                        className="text-white"
                                    />
                                </div>

                                <h2 className="text-2xl font-extrabold text-white">
                                    HealthOpz
                                </h2>

                            </div>

                            <p className="mt-4 text-slate-400">
                                Healthcare Without Boundaries.
                            </p>

                        </div>

                        <div className="text-sm text-slate-500 sm:text-right">

                            <p>
                                © {new Date().getFullYear()} HealthOpz.
                            </p>

                            <p className="mt-1">
                                All Rights Reserved.
                            </p>

                        </div>

                    </div>

                </div>

            </footer>

        </div>
    );
}