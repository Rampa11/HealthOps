import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    Clock3,
    FileCheck2,
    HeartPulse,
    MapPin,
    ShieldCheck,
    Stethoscope,
    UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type NurseForm = {
    full_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: string;
    country: string;
    state: string;
    city: string;
    nursing_type: string;
    specialization: string;
    other_specialization: string;
    years_of_experience: string;
    license_number: string;
    qualification: string;
    institution: string;
    bio: string;
    services: string[];
    consultation_type: string;
    availability: string;
};

export default function NurseOnboardingReview() {
    const navigate = useNavigate();

    const [form, setForm] = useState<NurseForm | null>(null);

    useEffect(() => {
        const saved = sessionStorage.getItem(
            "healthopz_nurse_onboarding"
        );

        if (!saved) {
            navigate("/nurse-onboarding");
            return;
        }

        try {
            setForm(JSON.parse(saved));
        } catch {
            navigate("/nurse-onboarding");
        }
    }, [navigate]);

    function editProfile() {
        navigate("/nurse-onboarding");
    }

    function continueToSubmission() {
        if (!form) return;

        sessionStorage.setItem(
            "healthopz_nurse_onboarding",
            JSON.stringify(form)
        );

        navigate("/nurse-onboarding/payment");
    }

    if (!form) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <HeartPulse
                        size={40}
                        className="mx-auto mb-4 animate-pulse text-teal-700"
                    />

                    <p className="text-sm font-medium text-slate-500">
                        Loading your application...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ================= HEADER ================= */}

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">

                    <div className="flex items-center justify-between">

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
                                    Professional Nurse Onboarding
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

                        {[
                            "Profile",
                            "Credentials",
                            "Specialization",
                            "Services",
                            "Availability",
                            "Review",
                        ].map((step, index) => {

                            const active = index === 5;
                            const completed = index < 5;

                            return (
                                <div
                                    key={step}
                                    className="flex flex-1 items-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${active
                                                ? "border-teal-600 bg-teal-600 text-white"
                                                : completed
                                                    ? "border-teal-600 bg-teal-50 text-teal-700"
                                                    : "border-slate-200 bg-white text-slate-400"
                                                }`}
                                        >
                                            {completed ? (
                                                <CheckCircle2 size={18} />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        <span
                                            className={`mt-2 hidden text-xs font-medium sm:block ${active
                                                ? "text-teal-700"
                                                : completed
                                                    ? "text-teal-700"
                                                    : "text-slate-400"
                                                }`}
                                        >
                                            {step}
                                        </span>

                                    </div>

                                    {index < 5 && (
                                        <div
                                            className={`mx-2 h-px flex-1 ${completed
                                                ? "bg-teal-300"
                                                : "bg-slate-200"
                                                }`}
                                        />
                                    )}

                                </div>
                            );
                        })}

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
                        Step 6 of 6
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Review Your Nurse Profile
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Review the information you provided before
                        submitting your application to become a
                        HealthOpz Nurse.
                    </p>

                </div>

                {/* ================= INDEPENDENT NURSE NOTICE ================= */}

                <div className="mb-8 rounded-2xl border border-teal-100 bg-teal-50 p-5">

                    <div className="flex gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                            <BadgeCheck
                                size={22}
                                className="text-teal-700"
                            />
                        </div>

                        <div>

                            <h3 className="font-bold text-teal-900">
                                Independent HealthOpz Nurse
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-teal-800">
                                You are registering as an independent
                                HealthOpz Nurse. Hospital-employed nurses
                                are managed by their hospital administrator
                                and do not use this professional onboarding
                                process.
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= REVIEW CARD ================= */}

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

                    {/* CARD HEADER */}

                    <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">

                        <div className="flex items-start gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                                <UserRound
                                    size={22}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>

                                <h3 className="text-lg font-bold text-slate-900">
                                    Application Summary
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Confirm that your professional
                                    information is correct.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-8 p-6 sm:p-8">

                        {/* ================= PERSONAL INFORMATION ================= */}

                        <section>

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                                    <UserRound
                                        size={18}
                                        className="text-teal-700"
                                    />
                                </div>

                                <h3 className="font-bold text-slate-900">
                                    Personal Information
                                </h3>

                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">

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

                        {/* ================= LOCATION ================= */}

                        <section className="border-t border-slate-100 pt-8">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                                    <MapPin
                                        size={18}
                                        className="text-teal-700"
                                    />
                                </div>

                                <h3 className="font-bold text-slate-900">
                                    Professional Location
                                </h3>

                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-3">

                                <ReviewItem
                                    label="Country"
                                    value={form.country}
                                />

                                <ReviewItem
                                    label="State"
                                    value={form.state}
                                />

                                <ReviewItem
                                    label="City / LGA"
                                    value={form.city}
                                />

                            </div>

                        </section>

                        {/* ================= CREDENTIALS ================= */}

                        <section className="border-t border-slate-100 pt-8">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                                    <BadgeCheck
                                        size={18}
                                        className="text-teal-700"
                                    />
                                </div>

                                <h3 className="font-bold text-slate-900">
                                    Nursing Credentials
                                </h3>

                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">

                                <ReviewItem
                                    label="Professional Category"
                                    value={form.nursing_type}
                                />

                                <ReviewItem
                                    label="License / Registration Number"
                                    value={form.license_number}
                                />

                                <ReviewItem
                                    label="Highest Qualification"
                                    value={form.qualification}
                                />

                                <ReviewItem
                                    label="Training Institution"
                                    value={form.institution}
                                />

                                <ReviewItem
                                    label="Years of Experience"
                                    value={form.years_of_experience}
                                />

                            </div>

                        </section>

                        {/* ================= SPECIALIZATION ================= */}

                        <section className="border-t border-slate-100 pt-8">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                                    <Stethoscope
                                        size={18}
                                        className="text-teal-700"
                                    />
                                </div>

                                <h3 className="font-bold text-slate-900">
                                    Specialization
                                </h3>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <div className="grid gap-5 sm:grid-cols-2">

                                    <ReviewItem
                                        label="Primary Specialization"
                                        value={form.specialization}
                                    />

                                    <ReviewItem
                                        label="Other Specialization"
                                        value={
                                            form.other_specialization ||
                                            "Not provided"
                                        }
                                    />

                                </div>

                            </div>

                        </section>

                        {/* ================= SERVICES ================= */}

                        <section className="border-t border-slate-100 pt-8">

                            <div className="mb-5">

                                <h3 className="font-bold text-slate-900">
                                    Nursing Services
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Services you have selected to provide.
                                </p>

                            </div>

                            <div className="flex flex-wrap gap-3">

                                {form.services.length > 0 ? (
                                    form.services.map((service) => (
                                        <div
                                            key={service}
                                            className="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800"
                                        >
                                            <Check size={15} />
                                            {service}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        No services selected.
                                    </p>
                                )}

                            </div>

                        </section>

                        {/* ================= BIO ================= */}

                        <section className="border-t border-slate-100 pt-8">

                            <h3 className="mb-5 font-bold text-slate-900">
                                Professional Bio
                            </h3>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                    {form.bio || "No professional bio provided."}
                                </p>

                            </div>

                        </section>

                        {/* ================= AVAILABILITY ================= */}

                        <section className="border-t border-slate-100 pt-8">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                                    <Clock3
                                        size={18}
                                        className="text-teal-700"
                                    />
                                </div>

                                <h3 className="font-bold text-slate-900">
                                    Availability
                                </h3>

                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">

                                <ReviewItem
                                    label="Service Arrangement"
                                    value={form.consultation_type}
                                />

                                <ReviewItem
                                    label="Availability"
                                    value={form.availability}
                                />

                            </div>

                        </section>

                        {/* ================= VERIFICATION ================= */}

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                            <div className="flex gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                    <FileCheck2
                                        size={21}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>

                                    <h4 className="font-bold text-slate-900">
                                        Professional Verification
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Your nursing license and professional
                                        credentials will be reviewed by
                                        HealthOpz before your profile receives
                                        verified status.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ================= CONFIRMATION ================= */}

                        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">

                            <div className="flex gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                    <CheckCircle2
                                        size={21}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>

                                    <h4 className="font-bold text-teal-900">
                                        Ready to Continue
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-teal-800">
                                        Please make sure the information
                                        above is accurate before continuing.
                                        You will have an opportunity to review
                                        the next stage before completing your
                                        HealthOpz Nurse registration.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ================= FOOTER ================= */}

                    <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">

                        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <button
                                type="button"
                                onClick={editProfile}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <ArrowLeft size={18} />
                                Edit Information
                            </button>

                            <button
                                type="button"
                                onClick={continueToSubmission}
                                className="flex items-center justify-center gap-3 rounded-xl bg-teal-700 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                            >
                                Continue
                                <ArrowRight size={19} />
                            </button>

                        </div>

                    </div>

                </div>

                {/* ================= BOTTOM TRUST ================= */}

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
                        HealthOpz Professional Network
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
    value: string;
}) {
    return (
        <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="break-words text-sm font-semibold text-slate-800">
                {value || "Not provided"}
            </p>
        </div>
    );
}