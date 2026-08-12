import {
    ArrowRight,
    Building2,
    Check,
    ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationSelector from "../components/LocationSelector";

export default function HospitalOnboarding() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        hospital_name: "",
        hospital_type: "",
        country: "Nigeria",
        state: "",
        city: "",
    });

    function updateField(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function nextStep(e: React.FormEvent) {
        e.preventDefault();

        sessionStorage.setItem(
            "hospital_onboarding",
            JSON.stringify(form)
        );

        navigate("/hospital-onboarding/admin");
    }

    const steps = [
        "Hospital",
        "Administrator",
        "Branding",
        "Subscription",
        "Review",
        "Payment",
    ];

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ================= HEADER ================= */}

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <Building2
                                    size={24}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    HealthOpz
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Hospital Onboarding
                                </p>
                            </div>

                        </div>

                        <div className="hidden items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 sm:flex">
                            <ShieldCheck size={17} />
                            Secure Registration
                        </div>

                    </div>
                </div>
            </header>

            {/* ================= PROGRESS ================= */}

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 py-6">

                    <div className="flex items-center justify-between">

                        {steps.map((step, index) => {
                            const active = index === 0;
                            const completed = index < 0;

                            return (
                                <div
                                    key={step}
                                    className="flex flex-1 items-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition ${active
                                                ? "border-teal-600 bg-teal-600 text-white"
                                                : completed
                                                    ? "border-teal-600 bg-teal-50 text-teal-700"
                                                    : "border-slate-200 bg-white text-slate-400"
                                                }`}
                                        >
                                            {completed ? (
                                                <Check size={18} />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        <span
                                            className={`mt-2 hidden text-xs font-medium sm:block ${active
                                                ? "text-teal-700"
                                                : "text-slate-400"
                                                }`}
                                        >
                                            {step}
                                        </span>

                                    </div>

                                    {index < steps.length - 1 && (
                                        <div className="mx-2 h-px flex-1 bg-slate-200" />
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* ================= MAIN ================= */}

            <main className="mx-auto max-w-5xl px-6 py-12">

                {/* ================= TITLE ================= */}

                <div className="mb-10 text-center">

                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-100">
                        <Building2
                            size={40}
                            className="text-teal-700"
                        />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
                        Step 1 of 6
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Register Your Hospital
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Tell us about your healthcare facility so we can
                        create your HealthOpz hospital profile.
                    </p>

                </div>

                {/* ================= FORM ================= */}

                <form onSubmit={nextStep}>

                    <div className="overflow-visible rounded-3xl border border-slate-200 bg-white shadow-xl">

                        {/* ================= CARD HEADER ================= */}

                        <div className="rounded-t-3xl border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                                    <Building2
                                        size={22}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Facility Information
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide the basic details of your
                                        hospital or healthcare facility.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* ================= FORM BODY ================= */}

                        <div className="space-y-8 p-6 sm:p-8">

                            {/* HOSPITAL NAME */}

                            <div>
                                <label
                                    htmlFor="hospital_name"
                                    className="mb-2 block text-sm font-semibold text-slate-800"
                                >
                                    Hospital Name
                                </label>

                                <div className="relative">

                                    <Building2
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="hospital_name"
                                        name="hospital_name"
                                        value={form.hospital_name}
                                        onChange={updateField}
                                        required
                                        placeholder="e.g. CarePlus Texas"
                                        className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                    />

                                </div>

                                <p className="mt-2 text-xs text-slate-500">
                                    Use the official registered name of your
                                    healthcare facility.
                                </p>
                            </div>

                            {/* FACILITY TYPE */}

                            <div>
                                <label
                                    htmlFor="hospital_type"
                                    className="mb-2 block text-sm font-semibold text-slate-800"
                                >
                                    Facility Type
                                </label>

                                <select
                                    id="hospital_type"
                                    name="hospital_type"
                                    value={form.hospital_type}
                                    onChange={updateField}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                >
                                    <option value="">
                                        Select Facility Type
                                    </option>

                                    <option value="General Hospital">
                                        General Hospital
                                    </option>

                                    <option value="Specialist Hospital">
                                        Specialist Hospital
                                    </option>

                                    <option value="Teaching Hospital">
                                        Teaching Hospital
                                    </option>

                                    <option value="Diagnostic Centre">
                                        Diagnostic Centre
                                    </option>

                                    <option value="Clinic">
                                        Clinic
                                    </option>

                                    <option value="Medical Centre">
                                        Medical Centre
                                    </option>

                                </select>
                            </div>

                            {/* ================= LOCATION ================= */}

                            <div className="border-t border-slate-100 pt-8">

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Facility Location
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Select the country, state and local
                                        government area where your healthcare
                                        facility is located.
                                    </p>

                                </div>

                                <LocationSelector
                                    country={form.country}
                                    state={form.state}
                                    city={form.city}
                                    required
                                    onChange={(location) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            ...location,
                                        }))
                                    }
                                />

                            </div>

                            {/* ================= PREMIUM NOTICE ================= */}

                            <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">

                                <div className="flex gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                        <ShieldCheck
                                            size={21}
                                            className="text-teal-700"
                                        />
                                    </div>

                                    <div>

                                        <h4 className="font-bold text-teal-900">
                                            HealthOpz Hospital Premium
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-teal-800">
                                            Hospital onboarding includes
                                            access to the HealthOpz healthcare
                                            management ecosystem. The annual
                                            premium subscription is{" "}
                                            <span className="font-bold">
                                                ₦100,000 per year.
                                            </span>
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ================= FOOTER ================= */}

                        <div className="rounded-b-3xl border-t border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">

                            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-sm text-slate-500">
                                    You can review your information before
                                    completing registration.
                                </p>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-3 rounded-xl bg-teal-700 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                                >
                                    Continue
                                    <ArrowRight size={19} />
                                </button>

                            </div>

                        </div>

                    </div>

                </form>

            </main>

        </div>
    );
}