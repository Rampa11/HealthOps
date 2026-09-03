import { Link } from "react-router-dom";
import {
    Building2,
    Stethoscope,
    HeartPulse,
    Pill,
    Leaf,
    FlaskConical,
    Check,
    ArrowRight,
} from "lucide-react";

const plans = [
    {
        name: "Hospitals",
        description:
            "Complete digital healthcare operations for hospitals, clinics and diagnostic centres.",
        price: "₦100,000",
        icon: Building2,
        color: "teal",
        features: [
            "Digital hospital presence",
            "Patient management",
            "Doctor and nurse management",
            "Appointment management",
            "Billing and payments",
            "Reports and analytics",
        ],
        path: "/hospital-onboarding",
    },
    {
        name: "Doctors",
        description:
            "Build your professional presence and connect with patients through HealthOpz.",
        price: "₦50,000",
        icon: Stethoscope,
        color: "blue",
        features: [
            "Professional doctor profile",
            "Patient discovery",
            "Appointment management",
            "Online consultation requests",
            "Patient communication",
            "Healthcare marketplace visibility",
        ],
        path: "/doctor-onboarding",
    },
    {
        name: "Nurses",
        description:
            "Connect with patients and grow your professional nursing practice.",
        price: "₦20,000",
        icon: HeartPulse,
        color: "rose",
        features: [
            "Professional nurse profile",
            "Patient discovery",
            "Home-care opportunities",
            "Appointment management",
            "Professional visibility",
            "Healthcare marketplace access",
        ],
        path: "/nurse-onboarding",
    },
    {
        name: "Pharmacy",
        description:
            "Bring your pharmacy online and make your services easier for patients to access.",
        price: "₦20,000",
        icon: Pill,
        color: "purple",
        features: [
            "Digital pharmacy profile",
            "Product visibility",
            "Patient discovery",
            "Order management",
            "Professional presence",
            "Healthcare marketplace access",
        ],
        path: "/pharmacy-onboarding",
    },
    {
        name: "Traditional Medicine",
        description:
            "Create a trusted digital presence for your traditional healthcare practice.",
        price: "₦10,000",
        icon: Leaf,
        color: "green",
        features: [
            "Professional practice profile",
            "Patient discovery",
            "Service visibility",
            "Appointment requests",
            "Digital presence",
            "Healthcare marketplace access",
        ],
        path: "/traditional-medicine-onboarding",
    },
    {
        name: "Laboratories",
        description:
            "Help patients discover your laboratory and access your diagnostic services.",
        price: "₦10,000",
        icon: FlaskConical,
        color: "cyan",
        features: [
            "Digital laboratory profile",
            "Test visibility",
            "Patient discovery",
            "Booking requests",
            "Professional presence",
            "Healthcare marketplace access",
        ],
        path: "/laboratories-onboarding",
    },
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* HERO */}

            <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 px-6 py-20 text-white">

                <div className="mx-auto max-w-5xl text-center">

                    <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-teal-200">
                        Simple & Transparent Pricing
                    </p>

                    <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                        Healthcare technology
                        <br />
                        without complicated pricing.
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-teal-50 md:text-xl">
                        Choose the HealthOpz plan that fits your healthcare
                        business. One simple annual subscription gives your
                        organisation a professional digital presence and access
                        to the HealthOpz healthcare platform.
                    </p>

                </div>

            </section>


            {/* PRICING CARDS */}

            <section className="px-6 py-20">

                <div className="mx-auto max-w-7xl">

                    <div className="mb-10 rounded-2xl border border-teal-100 bg-teal-50 p-5 text-center text-sm text-teal-900">
                        <strong>Flexible payment:</strong> HealthOpz supports both Paystack and Stripe so subscribers can choose the payment provider that is most convenient for them. Payment credentials are configured securely on the server.
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                        {plans.map((plan) => {

                            const Icon = plan.icon;

                            return (
                                <div
                                    key={plan.name}
                                    className="group flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    {/* ICON */}

                                    <div className="mb-6 flex items-center justify-between">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                                            <Icon size={28} />
                                        </div>

                                        <span className="rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-teal-700">
                                            Annual
                                        </span>

                                    </div>


                                    {/* TITLE */}

                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {plan.name}
                                    </h2>

                                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                                        {plan.description}
                                    </p>


                                    {/* PRICE */}

                                    <div className="mt-6 border-y border-gray-100 py-6">

                                        <div className="flex items-end gap-2">

                                            <span className="text-4xl font-extrabold text-gray-900">
                                                {plan.price}
                                            </span>

                                            <span className="mb-1 text-sm text-gray-500">
                                                / year
                                            </span>

                                        </div>

                                        <p className="mt-2 text-xs text-gray-400">
                                            Nigerian Naira
                                        </p>

                                    </div>


                                    {/* FEATURES */}

                                    <div className="mt-6 flex-1">

                                        <p className="mb-4 font-semibold text-gray-900">
                                            What's included
                                        </p>

                                        <ul className="space-y-3">

                                            {plan.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-start gap-3 text-sm text-gray-600"
                                                >
                                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                                                        <Check size={13} />
                                                    </span>

                                                    <span>{feature}</span>
                                                </li>
                                            ))}

                                        </ul>

                                    </div>


                                    {/* CTA */}

                                    <Link
                                        to={plan.path}
                                        className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-800"
                                    >
                                        Get Started

                                        <ArrowRight size={18} />
                                    </Link>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="px-6 pb-20">

                <div className="mx-auto max-w-5xl rounded-3xl bg-gray-900 px-8 py-14 text-center text-white md:px-16">

                    <h2 className="text-3xl font-bold md:text-4xl">
                        Ready to bring your healthcare business online?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
                        Join HealthOpz and give your patients a simpler way
                        to discover, connect and access your healthcare
                        services.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                        <Link
                            to="/get-started"
                            className="rounded-xl bg-teal-600 px-7 py-3.5 font-semibold transition hover:bg-teal-500"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/contact"
                            className="rounded-xl border border-gray-600 px-7 py-3.5 font-semibold transition hover:bg-gray-800"
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}