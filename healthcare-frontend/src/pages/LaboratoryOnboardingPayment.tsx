import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle2,
    CreditCard,
    FileCheck2,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LaboratoryForm {
    laboratory_name?: string;
    laboratory_type?: string;
    registration_number?: string;
    license_number?: string;
    laboratory_director?: string;
    director_license_number?: string;
    email?: string;
    phone?: string;
    website?: string;

    country?: string;
    state?: string;
    city?: string;
    address?: string;

    years_in_operation?: string;
    services?: string[];
    opening_hours?: string;
    home_service?: string;
    description?: string;
}

const REGISTRATION_FEE = 10000;

export default function LaboratoryOnboardingPayment() {
    const navigate = useNavigate();

    const [form, setForm] = useState<LaboratoryForm | null>(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(
            "healthopz_laboratory_onboarding"
        );

        if (!saved) {
            navigate("/laboratories-onboarding");
            return;
        }

        try {
            const parsed = JSON.parse(saved);
            setForm(parsed);
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
        navigate("/laboratories-onboarding/review");
    }

    async function handlePayment() {
        if (processing) {
            return;
        }

        setProcessing(true);

        /*
         * ---------------------------------------------------------
         * STRIPE INTEGRATION
         * ---------------------------------------------------------
         *
         * Replace this section later with your actual API call:
         *
         * const response = await createLaboratoryCheckoutSession({
         *     ...form,
         * });
         *
         * window.location.href = response.checkout_url;
         *
         * Do NOT mark the registration as paid until Stripe
         * confirms the payment through your backend/webhook.
         * ---------------------------------------------------------
         */

        try {
            /*
             * Temporary development behavior.
             *
             * This allows us to test the complete frontend flow
             * before connecting Stripe.
             */

            await new Promise((resolve) => {
                setTimeout(resolve, 1200);
            });

            sessionStorage.setItem(
                "healthopz_laboratory_registration_status",
                JSON.stringify({
                    status: "pending_verification",
                    payment_status: "pending_integration",
                    submitted_at: new Date().toISOString(),
                })
            );

            navigate("/laboratories");
        } catch (error) {
            console.error(
                "Laboratory registration payment failed",
                error
            );

            setProcessing(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* HEADER */}
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
                            const completed = index < 5;
                            const active = index === 5;

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
                                                <CheckCircle2 size={18} />
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
                                            className={`mx-2 h-px flex-1 ${index < 5
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
                        <CreditCard
                            size={40}
                            className="text-teal-700"
                        />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
                        Step 6 of 6
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Complete Your Registration
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Review your registration fee and complete the final
                        step to submit your laboratory profile.
                    </p>
                </div>

                {/* PAYMENT CARD */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    {/* CARD HEADER */}
                    <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                                <CreditCard
                                    size={22}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Registration Payment
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Complete the registration process for your
                                    laboratory.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="space-y-8 p-6 sm:p-8">
                        {/* LABORATORY SUMMARY */}
                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-bold text-slate-900">
                                    Registration Summary
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Confirm the laboratory you are registering.
                                </p>
                            </div>

                            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 md:grid-cols-2">
                                <SummaryItem
                                    label="Laboratory Name"
                                    value={form.laboratory_name}
                                />

                                <SummaryItem
                                    label="Laboratory Type"
                                    value={form.laboratory_type}
                                />

                                <SummaryItem
                                    label="Registration Number"
                                    value={
                                        form.registration_number ||
                                        form.license_number
                                    }
                                />

                                <SummaryItem
                                    label="Director"
                                    value={form.laboratory_director}
                                />

                                <SummaryItem
                                    label="Location"
                                    value={[
                                        form.city,
                                        form.state,
                                        form.country,
                                    ]
                                        .filter(Boolean)
                                        .join(", ")}
                                />

                                <SummaryItem
                                    label="Email"
                                    value={form.email}
                                />
                            </div>
                        </section>

                        {/* PRICE */}
                        <section className="border-t border-slate-100 pt-8">
                            <div className="rounded-3xl border border-teal-100 bg-teal-50 p-6 sm:p-8">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                                            Laboratory Registration
                                        </p>

                                        <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
                                            ₦
                                            {REGISTRATION_FEE.toLocaleString()}
                                        </h3>

                                        <p className="mt-2 text-sm text-teal-800">
                                            One-time registration fee
                                        </p>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                                        <CreditCard
                                            size={30}
                                            className="text-teal-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* WHAT HAPPENS NEXT */}
                        <section className="border-t border-slate-100 pt-8">
                            <div className="mb-5">
                                <h3 className="text-lg font-bold text-slate-900">
                                    What Happens Next?
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your registration will follow these steps.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <NextStep
                                    number="1"
                                    title="Complete Registration"
                                    description="Submit your laboratory registration and payment."
                                />

                                <NextStep
                                    number="2"
                                    title="Professional Verification"
                                    description="HealthOpz reviews your laboratory and professional credentials."
                                />

                                <NextStep
                                    number="3"
                                    title="Profile Activation"
                                    description="Once approved, your laboratory profile can become visible to users on HealthOpz."
                                />
                            </div>
                        </section>

                        {/* SECURITY NOTICE */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                    <LockKeyhole
                                        size={20}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-900">
                                        Secure Payment
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Payment processing will be handled
                                        securely through the HealthOpz payment
                                        system. Your card information is not
                                        stored in this application.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* VERIFICATION NOTICE */}
                        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                    <FileCheck2
                                        size={21}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>
                                    <h4 className="font-bold text-teal-900">
                                        Payment Does Not Guarantee Approval
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-teal-800">
                                        Completing registration and payment
                                        does not automatically make a
                                        laboratory verified. Your submitted
                                        information and professional
                                        credentials may still be reviewed
                                        before your profile is approved.
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
                                disabled={processing}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ArrowLeft size={18} />
                                Back to Review
                            </button>

                            <button
                                type="button"
                                onClick={handlePayment}
                                disabled={processing}
                                className="flex items-center justify-center gap-3 rounded-xl bg-teal-700 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? (
                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay ₦
                                        {REGISTRATION_FEE.toLocaleString()}
                                        & Submit
                                        <ArrowRight size={19} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* TRUST FOOTER */}
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
                        <FileCheck2
                            size={17}
                            className="text-teal-600"
                        />
                        Laboratory Review
                    </div>
                </div>
            </main>
        </div>
    );
}

function SummaryItem({
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

function NextStep({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                {number}
            </div>

            <div>
                <h4 className="font-bold text-slate-900">
                    {title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );
}