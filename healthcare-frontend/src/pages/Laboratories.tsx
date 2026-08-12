import {
    ArrowRight,
    BadgeCheck,
    FlaskConical,
    MapPin,
    Microscope,
    Search,
    ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Laboratory {
    id: string;
    name: string;
    laboratory_type: string;
    city: string;
    state: string;
    services: string[];
    verified: boolean;
}

const demoLaboratories: Laboratory[] = [
    {
        id: "1",
        name: "HealthPlus Diagnostics",
        laboratory_type: "Medical Diagnostic Laboratory",
        city: "Warri",
        state: "Delta",
        services: [
            "Blood Testing",
            "Medical Screening",
            "Pathology",
        ],
        verified: true,
    },
    {
        id: "2",
        name: "PrimeCare Laboratory",
        laboratory_type: "Clinical Laboratory",
        city: "Lagos",
        state: "Lagos",
        services: [
            "Haematology",
            "Clinical Chemistry",
            "Microbiology",
        ],
        verified: true,
    },
];

export default function Laboratories() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const filteredLaboratories = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) {
            return demoLaboratories;
        }

        return demoLaboratories.filter((laboratory) => {
            return (
                laboratory.name.toLowerCase().includes(keyword) ||
                laboratory.laboratory_type
                    .toLowerCase()
                    .includes(keyword) ||
                laboratory.city.toLowerCase().includes(keyword) ||
                laboratory.state.toLowerCase().includes(keyword) ||
                laboratory.services.some((service) =>
                    service.toLowerCase().includes(keyword)
                )
            );
        });
    }, [search]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* HERO */}
            <section className="relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.10),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-300">
                            <FlaskConical size={17} />
                            HealthOpz Laboratory Network
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Find Trusted{" "}
                            <span className="text-teal-400">
                                Medical Laboratories
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                            Discover laboratories and diagnostic centres
                            offering reliable testing, screening and
                            laboratory services across Nigeria and Africa.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/laboratories-onboarding")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-4 font-bold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-400"
                            >
                                Register Your Laboratory
                                <ArrowRight size={19} />
                            </button>

                            <a
                                href="#laboratories"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                            >
                                Browse Laboratories
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* DIRECTORY */}
            <section
                id="laboratories"
                className="mx-auto max-w-7xl px-6 py-20"
            >
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
                            Laboratory Directory
                        </p>

                        <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Explore Laboratories
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-500">
                            Search for laboratories by name, location,
                            diagnostic service or laboratory type.
                        </p>
                    </div>

                    <div className="rounded-full bg-teal-50 px-5 py-2 text-sm font-semibold text-teal-700">
                        {filteredLaboratories.length} Laboratories
                    </div>
                </div>

                {/* SEARCH */}
                <div className="mb-10 max-w-3xl">
                    <div className="flex items-center rounded-2xl border border-slate-200 bg-white shadow-sm transition focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-500/10">
                        <Search
                            size={21}
                            className="ml-5 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search laboratory, city, state or service..."
                            className="w-full rounded-2xl px-5 py-5 text-slate-700 outline-none"
                        />
                    </div>
                </div>

                {/* CARDS */}
                {filteredLaboratories.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
                        <Microscope
                            size={42}
                            className="mx-auto text-slate-300"
                        />

                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            No laboratories found
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Try searching for another laboratory,
                            location or service.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredLaboratories.map((laboratory) => (
                            <article
                                key={laboratory.id}
                                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                                        <FlaskConical
                                            size={24}
                                            className="text-teal-700"
                                        />
                                    </div>

                                    {laboratory.verified && (
                                        <span className="flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                                            <BadgeCheck size={14} />
                                            Verified
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-900">
                                    {laboratory.name}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {laboratory.laboratory_type}
                                </p>

                                <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                                    <MapPin
                                        size={16}
                                        className="text-teal-600"
                                    />
                                    {laboratory.city},{" "}
                                    {laboratory.state}
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {laboratory.services.map(
                                        (service) => (
                                            <span
                                                key={service}
                                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                                            >
                                                {service}
                                            </span>
                                        )
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="rounded-3xl bg-slate-950 p-8 text-center shadow-xl sm:p-12">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10">
                            <ShieldCheck
                                size={28}
                                className="text-teal-400"
                            />
                        </div>

                        <h2 className="mt-6 text-3xl font-extrabold text-white">
                            Is your laboratory ready to join HealthOpz?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
                            Register your laboratory, provide your
                            professional and business information, and
                            submit your credentials for verification.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/laboratories-onboarding")
                            }
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-7 py-4 font-bold text-white transition hover:bg-teal-400"
                        >
                            Register Your Laboratory
                            <ArrowRight size={19} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}