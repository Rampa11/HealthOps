import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle,
    CreditCard,
    Lock,
    ShieldCheck,
} from "lucide-react";

interface OnboardingData {
    hospital_name?: string;
    hospital_type?: string;
    country?: string;
    state?: string;
    city?: string;

    admin?: {
        full_name?: string;
        email?: string;
    };

    branding?: {
        website?: string;
        about?: string;
        primary_color?: string;
        secondary_color?: string;
    };

    subscription?: {
        plan?: string;
        amount?: number;
        billing_cycle?: string;
    };

    status?: string;
}

export default function HospitalOnboardingPayment() {
    const navigate = useNavigate();

    const [data, setData] = useState<OnboardingData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(
            "hospital_onboarding"
        );

        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch {
                setData(null);
            }
        }
    }, []);

    if (!data) {
        return (
            <div className="min-h-screen bg-slate-100 px-6 py-20">
                <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Registration Information Not Found
                    </h1>

                    <p className="mt-3 text-gray-600">
                        We could not find your hospital registration
                        information.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/hospital-onboarding")
                        }
                        className="mt-8 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
                    >
                        Start Registration Again
                    </button>

                </div>
            </div>
        );
    }

    const amount = data.subscription?.amount || 100000;

    const primaryColor =
        data.branding?.primary_color || "#0F766E";

    async function handlePayment() {
        setLoading(true);

        /*
         * PAYMENT INTEGRATION WILL GO HERE.
         *
         * The frontend will eventually call something like:
         *
         * POST /api/hospital-onboarding/create-payment
         *
         * The FastAPI backend will:
         *
         * 1. Validate the onboarding information
         * 2. Create the hospital/tenant
         * 3. Create the administrator
         * 4. Create the subscription
         * 5. Generate the payment checkout
         * 6. Return the payment URL
         *
         * We will connect this to the actual payment gateway next.
         */

        try {
            sessionStorage.setItem(
                "hospital_onboarding",
                JSON.stringify({
                    ...data,
                    status: "payment_pending",
                })
            );

            /*
             * TEMPORARY:
             * We are not processing real payment yet.
             *
             * Remove this temporary behavior once the
             * FastAPI payment endpoint is connected.
             */

            alert(
                "Payment gateway integration is the next step. Your hospital registration information has been saved."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-4xl">

                {/* HEADER */}

                <div className="mb-10 text-center">

                    <div
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
                        style={{
                            backgroundColor: `${primaryColor}20`,
                        }}
                    >
                        <CreditCard
                            size={42}
                            style={{
                                color: primaryColor,
                            }}
                        />
                    </div>

                    <p
                        className="mt-6 text-sm font-semibold uppercase tracking-wider"
                        style={{
                            color: primaryColor,
                        }}
                    >
                        Hospital Onboarding
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-gray-900">
                        Complete Your Subscription
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Step 6 of 6 — Secure payment
                    </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* PAYMENT AREA */}

                    <div className="lg:col-span-2">

                        <div className="rounded-3xl bg-white p-8 shadow-xl">

                            <div className="flex items-center gap-3">

                                <ShieldCheck
                                    size={28}
                                    className="text-teal-700"
                                />

                                <div>

                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Secure Payment
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Your payment is securely processed.
                                    </p>

                                </div>

                            </div>

                            {/* PAYMENT NOTICE */}

                            <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-6">

                                <div className="flex gap-4">

                                    <Lock
                                        size={24}
                                        className="shrink-0 text-teal-700"
                                    />

                                    <div>

                                        <h3 className="font-bold text-gray-900">
                                            Secure Checkout
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            You will be redirected to our
                                            secure payment gateway to
                                            complete your annual hospital
                                            subscription.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* HOSPITAL */}

                            <div className="mt-8">

                                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Hospital
                                </h3>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {data.hospital_name}
                                </p>

                                <p className="mt-1 text-gray-600">
                                    {data.city}
                                    {data.city && data.state
                                        ? ", "
                                        : ""}
                                    {data.state}
                                </p>

                            </div>

                            {/* EMAIL */}

                            <div className="mt-6">

                                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Administrator
                                </h3>

                                <p className="mt-2 text-gray-900">
                                    {data.admin?.full_name ||
                                        "Hospital Administrator"}
                                </p>

                                <p className="text-gray-600">
                                    {data.admin?.email}
                                </p>

                            </div>

                            {/* PAYMENT BUTTON */}

                            <button
                                type="button"
                                onClick={handlePayment}
                                disabled={loading}
                                className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl py-4 text-lg font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                                style={{
                                    backgroundColor: primaryColor,
                                }}
                            >
                                {loading ? (
                                    <>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={22} />

                                        Pay ₦
                                        {amount.toLocaleString()}
                                    </>
                                )}
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-500">
                                By continuing, you agree to the HealthOpz
                                hospital subscription terms.
                            </p>

                        </div>

                    </div>

                    {/* ORDER SUMMARY */}

                    <div>

                        <div className="rounded-3xl bg-white p-7 shadow-xl">

                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-5">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Plan
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        Hospital Premium
                                    </p>

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Billing
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        Annual
                                    </p>

                                </div>

                                <div className="border-t pt-5">

                                    <div className="flex items-center justify-between">

                                        <span className="font-semibold text-gray-700">
                                            Total
                                        </span>

                                        <span
                                            className="text-2xl font-extrabold"
                                            style={{
                                                color: primaryColor,
                                            }}
                                        >
                                            ₦
                                            {amount.toLocaleString()}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* FEATURES */}

                            <div className="mt-7 border-t pt-6">

                                <p className="font-semibold text-gray-900">
                                    Included
                                </p>

                                <div className="mt-4 space-y-3">

                                    {[
                                        "Hospital website",
                                        "Custom branding",
                                        "Hospital dashboard",
                                        "Staff management",
                                        "Patient management",
                                        "Appointments",
                                        "Reports & analytics",
                                    ].map((item) => (

                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <CheckCircle
                                                size={17}
                                                className="text-teal-600"
                                            />

                                            {item}

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* BACK */}

                <div className="mt-8">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/hospital-onboarding/review"
                            )
                        }
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        <ArrowLeft size={20} />

                        Back to Review

                    </button>

                </div>

            </div>

        </div>
    );
}