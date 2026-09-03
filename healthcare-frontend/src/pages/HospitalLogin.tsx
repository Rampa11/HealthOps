import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHospital } from "../services/authService";
import { Link } from "react-router-dom";
import { Building2, Lock, Mail } from "lucide-react";

export default function HospitalLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await loginHospital({

                email,

                password,

            });

            localStorage.setItem(
                "token",
                response.access_token
            );

            localStorage.setItem(
                "role",
                response.role
            );

            navigate("/hospital/admin");

        } catch (err: any) {

            setError(

                err.response?.data?.detail ||

                "Login failed."

            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-700 via-cyan-700 to-blue-900 flex items-center justify-center px-6">

            <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

                {/* LEFT */}

                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-teal-700 to-cyan-800 p-16 text-white">

                    <Building2 size={70} />

                    <h1 className="mt-8 text-5xl font-bold">
                        HealthOpz
                    </h1>

                    <h2 className="mt-6 text-3xl font-semibold">
                        Hospital Portal
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-teal-100">
                        Manage appointments, doctors, nurses,
                        pharmacy, laboratory, patient records,
                        billing and your hospital website from
                        one secure platform.
                    </p>

                    <div className="mt-12 space-y-4 text-teal-100">

                        <p>✔ Hospital Website Builder</p>

                        <p>✔ Patient Management</p>

                        <p>✔ Doctor & Nurse Scheduling</p>

                        <p>✔ Billing & Payments</p>

                        <p>✔ Telemedicine</p>

                        <p>✔ Analytics Dashboard</p>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="p-10 lg:p-16">

                    <div className="mx-auto max-w-md">

                        <div className="flex justify-center lg:hidden">

                            <Building2
                                size={55}
                                className="text-teal-700"
                            />

                        </div>

                        <h2 className="mt-6 text-center text-4xl font-bold text-slate-900">
                            Hospital Login
                        </h2>

                        <p className="mt-3 text-center text-gray-500">
                            Sign in to your hospital dashboard.
                        </p>

                        <form
                            onSubmit={handleLogin}
                            className="mt-10 space-y-6"
                        >

                            <div>

                                <label className="mb-2 block font-medium">
                                    Hospital Email
                                </label>

                                <div className="flex items-center rounded-xl border">

                                    <Mail
                                        className="ml-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="hospital@email.com"
                                        className="w-full rounded-xl px-4 py-4 outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">
                                    Password
                                </label>

                                <div className="flex items-center rounded-xl border">

                                    <Lock
                                        className="ml-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Password"
                                        className="w-full rounded-xl px-4 py-4 outline-none"
                                    />

                                </div>

                            </div>

                            <div className="flex items-center justify-between">

                                <label className="flex items-center gap-2 text-sm">

                                    <input type="checkbox" />

                                    Remember me

                                </label>

                                <Link
                                    to="#"
                                    className="text-sm font-medium text-teal-700 hover:underline"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            {
                                error && (

                                    <div className="rounded-lg bg-red-100 p-3 text-red-700">

                                        {error}

                                    </div>

                                )
                            }

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full rounded-xl bg-teal-700 py-4 text-lg font-semibold text-white transition hover:bg-teal-800"
                            >
                                {loading ? "Signing In..." : "Login"}
                            </button>

                        </form>

                        <div className="mt-10 rounded-2xl bg-slate-100 p-6">

                            <h3 className="text-lg font-semibold">
                                New Hospital?
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Join HealthOpz and launch your
                                hospital website in minutes.
                            </p>

                            <Link
                                to="/hospital-onboarding"
                                className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Register Hospital
                            </Link>

                        </div>

                        <div className="mt-8 text-center">

                            <Link
                                to="/"
                                className="text-sm text-gray-500 hover:text-teal-700"
                            >
                                ← Back to Home
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}