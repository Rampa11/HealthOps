import {
    ArrowLeft,
    BadgeCheck,
    Check,
    FileCheck2,
    HeartPulse,
    MapPin,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type TraditionalMedicineForm = {
    full_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: string;
    country: string;
    state: string;
    city: string;
    practitioner_type: string;
    practice_name: string;
    years_of_experience: string;
    registration_number: string;
    qualification: string;
    training_institution: string;
    specialization: string;
    other_specialization: string;
    services: string[];
    consultation_type: string;
    availability: string;
    bio: string;
};

export default function TraditionalMedicineOnboardingReview() {
    const navigate = useNavigate();

    const [form, setForm] = useState<TraditionalMedicineForm | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(
            "healthopz_traditional_medicine_onboarding"
        );

        if (!saved) {
            navigate("/traditional-medicine-onboarding");
            return;
        }

        try {
            setForm(JSON.parse(saved));
        } catch (error) {
            console.error(
                "Failed to load traditional medicine onboarding data",
                error
            );

            navigate("/traditional-medicine-onboarding");
        }
    }, [navigate]);

    if (!form) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <HeartPulse
                        size={40}
                        className="mx-auto mb-4 text-teal-700"
                    />

                    <p className="text-slate-600">
                        Loading your registration...
                    </p>
                </div>
            </div>
        );
    }

    function formatValue(value: string | undefined) {
        if (!value) return "Not provided";

        return value;
    }

    function handleBack() {
        navigate("/traditional-medicine-onboarding");
    }

    function handleSubmit() {
        setSubmitting(true);

        /*
         * Final submission placeholder.
         *
         * When the backend endpoint is ready, this is where we will
         * submit the traditional medicine practitioner application.
         */

        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);

            sessionStorage.setItem(
                "healthopz_traditional_medicine_onboarding_status",
                "submitted"
            );
        }, 800);
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <HeartPulse
                                    size={24}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    HealthOpz
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Traditional Medicine Practitioner
                                    Registration
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="mx-auto flex max-w-3xl px-6 py-20">
                    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                            <Check
                                size={42}
                                className="text-teal-700"
                            />
                        </div>

                        <h2 className="mt-8 text-3xl font-extrabold text-slate-900">
                            Application Submitted
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-slate-600">
                            Thank you for submitting your Traditional Medicine
                            Practitioner application to HealthOpz.
                        </p>

                        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-teal-100 bg-teal-50 p-5 text-left">
                            <div className="flex gap-4">
                                <BadgeCheck
                                    size={24}
                                    className="mt-1 shrink-0 text-teal-700"
                                />

                                <div>
                                    <h3 className="font-bold text-teal-900">
                                        Verification Required
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-teal-800">
                                        Your professional information and
                                        supporting credentials will be
                                        reviewed before your practitioner
                                        profile is published.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mt-8 rounded-xl bg-teal-700 px-7 py-4 font-bold text-white transition hover:bg-teal-800"
                        >
                            Return to HealthOpz
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* ================= HEADER ================= */}

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <HeartPulse
                                    size={24}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    HealthOpz
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Traditional Medicine Practitioner
                                    Registration
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
                    <div className="flex items-center justify-center">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-600 bg-teal-50 text-sm font-bold text-teal-700">
                                <Check size={18} />
                            </div>

                            <div className="mx-3 h-px w-16 bg-teal-500 sm:w-32" />

                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-600 bg-teal-600 text-sm font-bold text-white">
                                2
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex justify-center gap-20 text-xs font-medium sm:gap-36">
                        <span className="text-teal-700">
                            Registration
                        </span>

                        <span className="text-teal-700">
                            Review
                        </span>
                    </div>
                </div>
            </section>

            {/* ================= MAIN ================= */}

            <main className="mx-auto max-w-5xl px-6 py-12">
                {/* ================= HERO ================= */}

                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-100">
                        <FileCheck2
                            size={40}
                            className="text-teal-700"
                        />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
                        Final Review
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Review Your Registration
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Carefully review the information below before
                        submitting your Traditional Medicine Practitioner
                        application.
                    </p>
                </div>

                {/* ================= REVIEW CARD ================= */}

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    {/* PROFILE */}

                    <section className="border-b border-slate-200 p-6 sm:p-8">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <UserRound
                                    size={22}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Personal Information
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Your personal registration details
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <ReviewItem
                                label="Full Name"
                                value={form.full_name}
                            />

                            <ReviewItem
                                label="Email Address"
                                value={form.email}
                            />

                            <ReviewItem
                                label="Phone Number"
                                value={form.phone}
                            />

                            <ReviewItem
                                label="Date of Birth"
                                value={form.date_of_birth}
                            />

                            <ReviewItem
                                label="Gender"
                                value={form.gender}
                            />
                        </div>
                    </section>

                    {/* LOCATION */}

                    <section className="border-b border-slate-200 p-6 sm:p-8">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <MapPin
                                    size={22}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Practice Location
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Where you provide traditional medicine
                                    services
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <ReviewItem
                                label="Country"
                                value={form.country}
                            />

                            <ReviewItem
                                label="State"
                                value={form.state}
                            />

                            <ReviewItem
                                label="City"
                                value={form.city}
                            />
                        </div>
                    </section>

                    {/* PROFESSIONAL DETAILS */}

                    <section className="border-b border-slate-200 p-6 sm:p-8">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <BadgeCheck
                                    size={22}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Professional Information
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Your traditional medicine practice
                                    credentials
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <ReviewItem
                                label="Practitioner Type"
                                value={form.practitioner_type}
                            />

                            <ReviewItem
                                label="Practice Name"
                                value={form.practice_name}
                            />

                            <ReviewItem
                                label="Years of Experience"
                                value={form.years_of_experience}
                            />

                            <ReviewItem
                                label="Registration Number"
                                value={form.registration_number}
                            />

                            <ReviewItem
                                label="Qualification"
                                value={form.qualification}
                            />

                            <ReviewItem
                                label="Training Institution"
                                value={form.training_institution}
                            />

                            <ReviewItem
                                label="Specialization"
                                value={form.specialization}
                            />

                            <ReviewItem
                                label="Other Specialization"
                                value={form.other_specialization}
                            />
                        </div>
                    </section>

                    {/* SERVICES */}

                    <section className="border-b border-slate-200 p-6 sm:p-8">
                        <h3 className="text-lg font-bold text-slate-900">
                            Services Provided
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Services selected during registration
                        </p>

                        {form.services?.length > 0 ? (
                            <div className="mt-5 flex flex-wrap gap-3">
                                {form.services.map((service) => (
                                    <span
                                        key={service}
                                        className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-5 text-sm text-slate-500">
                                No services selected.
                            </p>
                        )}
                    </section>

                    {/* BIO */}

                    <section className="border-b border-slate-200 p-6 sm:p-8">
                        <h3 className="text-lg font-bold text-slate-900">
                            Professional Bio
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Your public professional introduction
                        </p>

                        <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                {formatValue(form.bio)}
                            </p>
                        </div>
                    </section>

                    {/* AVAILABILITY */}

                    <section className="border-b border-slate-200 p-6 sm:p-8">
                        <h3 className="text-lg font-bold text-slate-900">
                            Availability
                        </h3>

                        <div className="mt-5 grid gap-6 md:grid-cols-2">
                            <ReviewItem
                                label="Consultation Type"
                                value={form.consultation_type}
                            />

                            <ReviewItem
                                label="Availability"
                                value={form.availability}
                            />
                        </div>
                    </section>

                    {/* VERIFICATION NOTICE */}

                    <section className="p-6 sm:p-8">
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
                                        Professional Verification
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-teal-800">
                                        Your submitted information and
                                        professional credentials will be
                                        reviewed before your practitioner
                                        profile receives verified status.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FOOTER */}

                    <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={handleBack}
                                disabled={submitting}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ArrowLeft size={18} />
                                Back to Registration
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="flex items-center justify-center gap-3 rounded-xl bg-teal-700 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitting ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        Submit Application
                                        <Check size={19} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* TRUST */}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <ShieldCheck
                            size={17}
                            className="text-teal-600"
                        />
                        Secure Registration
                    </div>

                    <div className="flex items-center gap-2">
                        <BadgeCheck
                            size={17}
                            className="text-teal-600"
                        />
                        Professional Verification
                    </div>

                    <div className="flex items-center gap-2">
                        <HeartPulse
                            size={17}
                            className="text-teal-600"
                        />
                        HealthOpz
                    </div>
                </div>
            </main>
        </div>
    );
}

function ReviewItem({
    label,
    value,
}: {
    label: string;
    value: string | undefined;
}) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-base font-medium text-slate-900">
                {value || "Not provided"}
            </p>
        </div>
    );
}