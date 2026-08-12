import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

export default function HospitalOnboardingSubscription() {
    const navigate = useNavigate();

    const [selectedPlan, setSelectedPlan] = useState("premium");

    function continueToReview(e: React.FormEvent) {
        e.preventDefault();

        const previousData = sessionStorage.getItem(
            "hospital_onboarding"
        );

        const hospitalData = previousData
            ? JSON.parse(previousData)
            : {};

        sessionStorage.setItem(
            "hospital_onboarding",
            JSON.stringify({
                ...hospitalData,
                subscription: {
                    plan: selectedPlan,
                    amount: 100000,
                    billing_cycle: "annual",
                },
            })
        );

        navigate("/hospital-onboarding/review");
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-4xl">

                <div className="rounded-3xl bg-white p-10 shadow-xl">

                    {/* HEADER */}

                    <div className="mb-10 text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                            <CreditCard
                                size={40}
                                className="text-teal-700"
                            />
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-700">
                            Hospital Onboarding
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-gray-900">
                            Choose Your Plan
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Step 4 of 6
                        </p>

                    </div>

                    <form onSubmit={continueToReview}>

                        {/* PREMIUM PLAN */}

                        <button
                            type="button"
                            onClick={() =>
                                setSelectedPlan("premium")
                            }
                            className={`w-full rounded-3xl border-2 p-8 text-left transition ${selectedPlan === "premium"
                                ? "border-teal-600 bg-teal-50 shadow-lg"
                                : "border-gray-200 bg-white hover:border-teal-300"
                                }`}
                        >

                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h2 className="text-2xl font-bold text-gray-900">
                                            HealthOpz Hospital Premium
                                        </h2>

                                        {selectedPlan === "premium" && (
                                            <span className="rounded-full bg-teal-700 px-3 py-1 text-xs font-bold text-white">
                                                SELECTED
                                            </span>
                                        )}

                                    </div>

                                    <p className="mt-2 text-gray-600">
                                        Everything your hospital needs to
                                        operate and grow on HealthOpz.
                                    </p>

                                </div>

                                <div className="md:text-right">

                                    <div className="text-4xl font-extrabold text-teal-700">
                                        ₦100,000
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        per year
                                    </p>

                                </div>

                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">

                                {[
                                    "Custom hospital website",
                                    "Hospital branding and colors",
                                    "Hospital staff management",
                                    "Doctors and nurses management",
                                    "Patient management",
                                    "Appointment management",
                                    "Billing and payments",
                                    "Reports and analytics",
                                    "Hospital dashboard",
                                    "Audit logs",
                                ].map((feature) => (

                                    <div
                                        key={feature}
                                        className="flex items-center gap-3 text-gray-700"
                                    >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
                                            <Check size={15} />
                                        </span>

                                        {feature}

                                    </div>

                                ))}

                            </div>

                        </button>

                        {/* SECURITY */}

                        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">

                            <div className="flex gap-4">

                                <ShieldCheck
                                    size={28}
                                    className="shrink-0 text-teal-700"
                                />

                                <div>

                                    <h3 className="font-bold text-gray-900">
                                        Secure Subscription
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Your hospital subscription will be
                                        processed securely. Payment will be
                                        handled through our secure payment
                                        gateway.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* PRICE SUMMARY */}

                        <div className="mt-8 rounded-2xl bg-gray-900 p-6 text-white">

                            <div className="flex items-center justify-between">

                                <span className="text-gray-300">
                                    Hospital Premium
                                </span>

                                <span className="font-semibold">
                                    ₦100,000 / year
                                </span>

                            </div>

                            <div className="my-4 border-t border-gray-700" />

                            <div className="flex items-center justify-between">

                                <span className="text-lg font-semibold">
                                    Total
                                </span>

                                <span className="text-2xl font-bold">
                                    ₦100,000
                                </span>

                            </div>

                        </div>

                        {/* NAVIGATION */}

                        <div className="flex flex-col gap-4 pt-8 sm:flex-row">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/hospital-onboarding/branding"
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                <ArrowLeft size={20} />

                                Back

                            </button>

                            <button
                                type="submit"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-4 font-semibold text-white transition hover:bg-teal-800"
                            >
                                Continue

                                <ArrowRight size={20} />

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}