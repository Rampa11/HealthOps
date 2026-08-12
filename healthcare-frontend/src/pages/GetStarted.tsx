import { Link } from "react-router-dom";
import { Building2, UserRound, ArrowRight } from "lucide-react";

export default function GetStarted() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-700 via-cyan-700 to-blue-800">

            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">

                <div className="w-full max-w-5xl rounded-3xl bg-white p-12 shadow-2xl">

                    <div className="text-center">

                        <h1 className="text-5xl font-bold text-slate-900">
                            Welcome to HealthOpz
                        </h1>

                        <p className="mt-5 text-xl text-gray-600">
                            Africa's Digital Healthcare Ecosystem
                        </p>

                        <p className="mt-3 text-gray-500">
                            Choose how you'd like to get started.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-8 md:grid-cols-2">

                        {/* Patient */}

                        <div className="rounded-3xl border border-gray-200 p-10 transition hover:-translate-y-2 hover:shadow-xl">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

                                <UserRound
                                    size={40}
                                    className="text-blue-700"
                                />

                            </div>

                            <h2 className="mt-8 text-3xl font-bold">
                                I'm a Patient
                            </h2>

                            <p className="mt-4 text-gray-600 leading-7">

                                Book appointments, hire freelance nurses,
                                consult doctors online, buy medicines,
                                access laboratory services and manage
                                your health records.

                            </p>

                            <Link
                                to="/register"
                                className="mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
                            >

                                Register as Patient

                                <ArrowRight size={20} />

                            </Link>

                        </div>

                        {/* Hospital */}

                        <div className="rounded-3xl border border-gray-200 p-10 transition hover:-translate-y-2 hover:shadow-xl">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">

                                <Building2
                                    size={40}
                                    className="text-teal-700"
                                />

                            </div>

                            <h2 className="mt-8 text-3xl font-bold">
                                I'm a Hospital
                            </h2>

                            <p className="mt-4 text-gray-600 leading-7">

                                Create your own hospital website,
                                manage doctors, nurses, appointments,
                                billing, pharmacy, laboratory and
                                patient records from one platform.

                            </p>

                            <Link
                                to="/hospital-onboarding"
                                className="mt-10 inline-flex items-center gap-3 rounded-xl bg-teal-700 px-8 py-4 font-semibold text-white hover:bg-teal-800"
                            >

                                Register Hospital

                                <ArrowRight size={20} />

                            </Link>

                        </div>

                    </div>

                    <div className="mt-14 text-center">

                        <p className="text-gray-500">

                            Already have an account?

                        </p>

                        <div className="mt-5 flex justify-center gap-8">

                            <Link
                                to="/patient-login"
                                className="font-semibold text-blue-600 hover:underline"
                            >
                                Patient Login
                            </Link>

                            <Link
                                to="/hospital-login"
                                className="font-semibold text-teal-700 hover:underline"
                            >
                                Hospital Login
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}