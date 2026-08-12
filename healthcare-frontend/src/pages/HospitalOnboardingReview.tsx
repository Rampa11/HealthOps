import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Building2,
    User,
    Palette,
    CreditCard,
    Rocket,
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
}

export default function HospitalOnboardingReview() {
    const navigate = useNavigate();

    const [data, setData] = useState<OnboardingData | null>(null);

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
                        Onboarding Information Not Found
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Your hospital onboarding information could not be
                        found. Please start the registration process again.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/hospital-onboarding")
                        }
                        className="mt-8 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
                    >
                        Start Again
                    </button>

                </div>
            </div>
        );
    }

    const primaryColor =
        data.branding?.primary_color || "#0F766E";

    const secondaryColor =
        data.branding?.secondary_color || "#14B8A6";

    const amount =
        data.subscription?.amount || 100000;

    function proceedToPayment() {
        /*
         * For now we store the final review state.
         *
         * We will replace this with the FastAPI + payment
         * checkout request once the onboarding API is ready.
         */

        sessionStorage.setItem(
            "hospital_onboarding",
            JSON.stringify({
                ...data,
                status: "ready_for_payment",
            })
        );

        navigate("/hospital-onboarding/payment");
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-5xl">

                {/* HEADER */}

                <div className="mb-10 text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                        <CheckCircle
                            size={42}
                            className="text-teal-700"
                        />
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-700">
                        Hospital Onboarding
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-gray-900">
                        Review Your Registration
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Step 5 of 6 — Review everything before payment
                    </p>

                </div>

                <div className="space-y-6">

                    {/* HOSPITAL INFORMATION */}

                    <section className="rounded-3xl bg-white p-8 shadow-lg">

                        <div className="flex items-center gap-3">

                            <Building2
                                className="text-teal-700"
                                size={28}
                            />

                            <h2 className="text-2xl font-bold text-gray-900">
                                Hospital Information
                            </h2>

                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">

                            <Info
                                label="Hospital Name"
                                value={data.hospital_name}
                            />

                            <Info
                                label="Hospital Type"
                                value={data.hospital_type}
                            />

                            <Info
                                label="Country"
                                value={data.country}
                            />

                            <Info
                                label="State"
                                value={data.state}
                            />

                            <Info
                                label="City"
                                value={data.city}
                            />

                        </div>

                    </section>

                    {/* ADMIN */}

                    <section className="rounded-3xl bg-white p-8 shadow-lg">

                        <div className="flex items-center gap-3">

                            <User
                                className="text-teal-700"
                                size={28}
                            />

                            <h2 className="text-2xl font-bold text-gray-900">
                                Administrator
                            </h2>

                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">

                            <Info
                                label="Full Name"
                                value={data.admin?.full_name}
                            />

                            <Info
                                label="Email"
                                value={data.admin?.email}
                            />

                        </div>

                    </section>

                    {/* BRANDING */}

                    <section className="rounded-3xl bg-white p-8 shadow-lg">

                        <div className="flex items-center gap-3">

                            <Palette
                                className="text-teal-700"
                                size={28}
                            />

                            <h2 className="text-2xl font-bold text-gray-900">
                                Branding
                            </h2>

                        </div>

                        <div className="mt-6 space-y-5">

                            <Info
                                label="Website"
                                value={
                                    data.branding?.website ||
                                    "Not provided"
                                }
                            />

                            <Info
                                label="About"
                                value={
                                    data.branding?.about ||
                                    "Not provided"
                                }
                            />

                            <div>

                                <p className="text-sm font-semibold text-gray-500">
                                    Brand Colors
                                </p>

                                <div className="mt-3 flex gap-4">

                                    <div className="flex items-center gap-2">

                                        <div
                                            className="h-10 w-10 rounded-lg border"
                                            style={{
                                                backgroundColor:
                                                    primaryColor,
                                            }}
                                        />

                                        <span className="text-sm text-gray-600">
                                            {primaryColor}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <div
                                            className="h-10 w-10 rounded-lg border"
                                            style={{
                                                backgroundColor:
                                                    secondaryColor,
                                            }}
                                        />

                                        <span className="text-sm text-gray-600">
                                            {secondaryColor}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* SUBSCRIPTION */}

                    <section className="overflow-hidden rounded-3xl bg-white shadow-lg">

                        <div
                            className="p-8 text-white"
                            style={{
                                backgroundColor:
                                    primaryColor,
                            }}
                        >

                            <div className="flex items-center gap-3">

                                <CreditCard size={28} />

                                <h2 className="text-2xl font-bold">
                                    Subscription
                                </h2>

                            </div>

                            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                                <div>

                                    <p className="text-sm opacity-80">
                                        Selected Plan
                                    </p>

                                    <p className="mt-1 text-2xl font-bold">
                                        HealthOpz Hospital Premium
                                    </p>

                                </div>

                                <div className="sm:text-right">

                                    <p className="text-4xl font-extrabold">
                                        ₦{amount.toLocaleString()}
                                    </p>

                                    <p className="opacity-80">
                                        per year
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="p-8">

                            <div className="flex items-center gap-3 text-gray-700">

                                <CheckCircle
                                    size={20}
                                    className="text-teal-600"
                                />

                                Annual hospital subscription

                            </div>

                            <div className="mt-3 flex items-center gap-3 text-gray-700">

                                <CheckCircle
                                    size={20}
                                    className="text-teal-600"
                                />

                                Custom hospital platform

                            </div>

                            <div className="mt-3 flex items-center gap-3 text-gray-700">

                                <CheckCircle
                                    size={20}
                                    className="text-teal-600"
                                />

                                Hospital management dashboard

                            </div>

                        </div>

                    </section>

                    {/* FINAL ACTION */}

                    <section className="rounded-3xl border border-teal-200 bg-teal-50 p-8">

                        <div className="flex gap-4">

                            <Rocket
                                size={32}
                                className="shrink-0 text-teal-700"
                            />

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Ready to launch your hospital?
                                </h2>

                                <p className="mt-2 leading-7 text-gray-600">
                                    Everything looks good. Continue to secure
                                    payment and activate your HealthOpz
                                    hospital platform.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* BUTTONS */}

                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/hospital-onboarding/subscription"
                                )
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            <ArrowLeft size={20} />

                            Back

                        </button>

                        <button
                            type="button"
                            onClick={proceedToPayment}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-4 font-semibold text-white transition hover:bg-teal-800"
                        >
                            Continue to Payment

                            <ArrowRight size={20} />

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}


function Info({
    label,
    value,
}: {
    label: string;
    value?: string;
}) {
    return (
        <div>

            <p className="text-sm font-semibold text-gray-500">
                {label}
            </p>

            <p className="mt-1 text-base font-medium text-gray-900">
                {value || "Not provided"}
            </p>

        </div>
    );
}