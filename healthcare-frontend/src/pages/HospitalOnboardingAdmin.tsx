import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";

export default function HospitalOnboardingAdmin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    });

    const [error, setError] = useState("");

    function updateField(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setError("");
    }

    function nextStep(e: React.FormEvent) {
        e.preventDefault();

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

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
                admin: {
                    full_name: form.full_name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                },
            })
        );

        navigate("/hospital-onboarding/branding");
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-3xl">

                <div className="rounded-3xl bg-white p-10 shadow-xl">

                    {/* HEADER */}

                    <div className="mb-10 text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">

                            <ShieldCheck
                                size={40}
                                className="text-teal-700"
                            />

                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-700">
                            Hospital Onboarding
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-gray-900">
                            Create Hospital Administrator
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Step 2 of 6
                        </p>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={nextStep}
                        className="space-y-6"
                    >

                        <div>

                            <label className="mb-2 block font-semibold text-gray-800">
                                Full Name
                            </label>

                            <input
                                name="full_name"
                                value={form.full_name}
                                onChange={updateField}
                                required
                                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="John Doe"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold text-gray-800">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={updateField}
                                required
                                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="admin@hospital.com"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold text-gray-800">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={updateField}
                                required
                                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="+234 800 000 0000"
                            />

                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block font-semibold text-gray-800">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={updateField}
                                    required
                                    className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    placeholder="Minimum 8 characters"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-gray-800">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirm_password"
                                    value={form.confirm_password}
                                    onChange={updateField}
                                    required
                                    className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    placeholder="Repeat password"
                                />

                            </div>

                        </div>

                        {/* ERROR */}

                        {error && (
                            <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                                {error}
                            </div>
                        )}

                        {/* BUTTONS */}

                        <div className="flex flex-col gap-4 pt-6 sm:flex-row">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/hospital-onboarding")
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