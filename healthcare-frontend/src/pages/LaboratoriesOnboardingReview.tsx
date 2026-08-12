import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Check,
    FileCheck2,
    FlaskConical,
    MapPin,
    ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface LaboratoryForm {
    laboratory_name: string;
    laboratory_type: string;
    registration_number: string;
    laboratory_scientist_name: string;
    scientist_license_number: string;
    email: string;
    phone: string;
    website: string;

    country: string;
    state: string;
    city: string;
    address: string;

    years_in_operation: string;
    services: string[];

    opening_hours: string;
    home_sample_collection: string;

    description: string;
}

export default function LaboratoriesOnboardingReview() {
    const navigate = useNavigate();

    const [form, setForm] = useState<LaboratoryForm | null>(null);

    useEffect(() => {
        const saved = sessionStorage.getItem(
            "healthopz_laboratory_onboarding"
        );

        if (!saved) {
            navigate("/laboratories-onboarding");
            return;
        }

        try {
            setForm(JSON.parse(saved));
        } catch {
            navigate("/laboratories-onboarding");
        }
    }, [navigate]);

    if (!form) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />

                    <p className="text-sm text-slate-500">
                        Loading your laboratory information...
                    </p>
                </div>
            </div>
        );
    }

    const steps = [
        "Laboratory",
        "Location",
        "Services",
        "Verification",
        "Review",
        "Payment",
    ];

    function goBack() {
        navigate("/laboratories-onboarding");
    }

    function editProfile() {
        navigate("/laboratories-onboarding");
    }

    function continueRegistration() {
        navigate("/laboratories-onboarding/payment");
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* HEADER */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <FlaskConical
                                    size={24}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    HealthOpz
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Laboratory Onboarding
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

            {/* PROGRESS */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 py-6">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const completed = index < 4;
                            const active = index === 4;

                            return (
                                <div
                                    key={step}
                                    className="flex flex-1 items-center"
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${completed
                                                ? "border-teal-600 bg-teal-50 text-teal-700"
                                                : active
                                                    ? "border-teal-600 bg-teal-600 text-white"
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
                                            className={`mt-2 hidden text-xs font-medium sm:block ${active || completed
                                                ? "text-teal-700"
                                                : "text-slate-400"
                                                }`}
                                        >
                                            {step}
                                        </span>
                                    </div>

                                    {index < steps.length - 1 && (
                                        <div
                                            className={`mx-2 h-px flex-1 ${index < 4
                                                ? "bg-teal-200"
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

            {/* MAIN */}
            <main className="mx-auto max-w-5xl px-6 py-12">
                {/* TITLE */}
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-100">
                        <BadgeCheck
                            size={40}
                            className="text-teal-700"
                        />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
                        Step 5 of 6
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Review Your Laboratory Registration
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Please review the information below before
                        continuing to the registration payment step.
                    </p>
                </div>

                {/* REVIEW CARD */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    {/* CARD HEADER */}
                    <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                                <FlaskConical
                                    size={22}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Laboratory Information
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Verify that your laboratory information
                                    is correct.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="space-y-10 p-6 sm:p-8">
                        {/* LABORATORY DETAILS */}
                        <section>
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Laboratory Details
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Basic information about your
                                        laboratory.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={editProfile}
                                    className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                                >
                                    Edit
                                </button>
                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:grid-cols-2">
                                <ReviewItem
                                    label="Laboratory Name"
                                    value={form.laboratory_name}
                                />

                                <ReviewItem
                                    label="Laboratory Type"
                                    value={form.laboratory_type}
                                />

                                <ReviewItem
                                    label="Registration Number"
                                    value={form.registration_number}
                                />

                                <ReviewItem
                                    label="Years in Operation"
                                    value={form.years_in_operation}
                                />

                                <ReviewItem
                                    label="Website"
                                    value={form.website}
                                />
                            </div>
                        </section>

                        {/* LOCATION */}
                        <section className="border-t border-slate-100 pt-10">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
                                    <MapPin
                                        size={20}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Laboratory Location
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Registered laboratory location.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:grid-cols-2">
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

                                <ReviewItem
                                    label="Street Address"
                                    value={form.address}
                                />
                            </div>
                        </section>

                        {/* RESPONSIBLE PROFESSIONAL */}
                        <section className="border-t border-slate-100 pt-10">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
                                    <FileCheck2
                                        size={20}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Responsible Laboratory Professional
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Professional responsible for the
                                        laboratory.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:grid-cols-2">
                                <ReviewItem
                                    label="Professional Name"
                                    value={
                                        form.laboratory_scientist_name
                                    }
                                />

                                <ReviewItem
                                    label="Professional License Number"
                                    value={
                                        form.scientist_license_number
                                    }
                                />
                            </div>
                        </section>

                        {/* CONTACT */}
                        <section className="border-t border-slate-100 pt-10">
                            <div className="mb-5">
                                <h3 className="text-lg font-bold text-slate-900">
                                    Contact Information
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Contact information for your
                                    laboratory.
                                </p>
                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:grid-cols-2">
                                <ReviewItem
                                    label="Business Email"
                                    value={form.email}
                                />

                                <ReviewItem
                                    label="Phone Number"
                                    value={form.phone}
                                />
                            </div>
                        </section>

                        {/* SERVICES */}
                        <section className="border-t border-slate-100 pt-10">
                            <div className="mb-5">
                                <h3 className="text-lg font-bold text-slate-900">
                                    Laboratory Services
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Services selected for your laboratory
                                    profile.
                                </p>
                            </div>

                            {form.services &&
                                form.services.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {form.services.map((service) => (
                                        <div
                                            key={service}
                                            className="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800"
                                        >
                                            <Check size={16} />
                                            {service}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                    No services selected.
                                </p>
                            )}
                        </section>

                        {/* OPERATIONS */}
                        <section className="border-t border-slate-100 pt-10">
                            <div className="mb-5">
                                <h3 className="text-lg font-bold text-slate-900">
                                    Laboratory Operations
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Operating and sample collection
                                    information.
                                </p>
                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:grid-cols-2">
                                <ReviewItem
                                    label="Opening Hours"
                                    value={form.opening_hours}
                                />

                                <ReviewItem
                                    label="Home Sample Collection"
                                    value={
                                        form.home_sample_collection
                                    }
                                />
                            </div>
                        </section>

                        {/* DESCRIPTION */}
                        {form.description && (
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-5">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        About Your Laboratory
                                    </h3>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                                    <p className="text-sm leading-7 text-slate-600">
                                        {form.description}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* VERIFICATION NOTICE */}
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
                                        Laboratory Verification
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-teal-800">
                                        Your laboratory registration and
                                        responsible professional
                                        credentials may be reviewed by
                                        HealthOpz as part of the
                                        verification process.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={goBack}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <ArrowLeft size={18} />
                                Back to Edit
                            </button>

                            <button
                                type="button"
                                onClick={continueRegistration}
                                className="flex items-center justify-center gap-3 rounded-xl bg-teal-700 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                            >
                                Continue to Payment
                                <ArrowRight size={19} />
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
                        Laboratory Verification
                    </div>

                    <div className="flex items-center gap-2">
                        <FileCheck2
                            size={17}
                            className="text-teal-600"
                        />
                        Professional Review
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
    value?: string;
}) {
    return (
        <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
            </p>

            <p className="text-sm font-semibold text-slate-900">
                {value || "Not provided"}
            </p>
        </div>
    );
}