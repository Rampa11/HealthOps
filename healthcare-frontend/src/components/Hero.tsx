import { Link } from "react-router-dom";
import {
    Building2,
    Stethoscope,
    Users,
    ShieldCheck,
} from "lucide-react";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">

            <div className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* LEFT */}

                    <div>

                        <span className="inline-flex items-center bg-blue-500/40 px-4 py-2 rounded-full text-sm mb-6">

                            Africa's Modern Hospital Operating System

                        </span>

                        <h1 className="text-5xl font-extrabold leading-tight">

                            One Platform

                            <br />

                            For Every Hospital,

                            <br />

                            Doctor,

                            Nurse & Patient.

                        </h1>

                        <p className="mt-8 text-lg text-blue-100 leading-8">

                            HealthOpz powers hospitals across Africa with
                            patient management, scheduling, billing,
                            workforce management, analytics, telemedicine,
                            freelance healthcare professionals,
                            and multi-tenant hospital websites.

                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to="/get-started"
                                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/login"
                                className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
                            >
                                Hospital Login
                            </Link>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="grid grid-cols-2 gap-6">

                        <div className="bg-white text-slate-700 rounded-2xl shadow-xl p-6">

                            <Building2
                                className="text-blue-600"
                                size={42}
                            />

                            <h3 className="font-bold mt-4 text-xl">
                                Hospitals
                            </h3>

                            <p className="text-sm mt-2 text-gray-600">

                                Digital hospital management,
                                branding,
                                patient care,
                                finance,
                                pharmacy
                                and HR.

                            </p>

                        </div>

                        <div className="bg-white text-slate-700 rounded-2xl shadow-xl p-6">

                            <Stethoscope
                                className="text-green-600"
                                size={42}
                            />

                            <h3 className="font-bold mt-4 text-xl">

                                Doctors

                            </h3>

                            <p className="text-sm mt-2 text-gray-600">

                                Hospital doctors,
                                freelance physicians
                                and specialists.

                            </p>

                        </div>

                        <div className="bg-white text-slate-700 rounded-2xl shadow-xl p-6">

                            <Users
                                className="text-purple-600"
                                size={42}
                            />

                            <h3 className="font-bold mt-4 text-xl">

                                Nurses

                            </h3>

                            <p className="text-sm mt-2 text-gray-600">

                                Shift scheduling,
                                freelance nursing
                                and workforce management.

                            </p>

                        </div>

                        <div className="bg-white text-slate-700 rounded-2xl shadow-xl p-6">

                            <ShieldCheck
                                className="text-red-600"
                                size={42}
                            />

                            <h3 className="font-bold mt-4 text-xl">

                                Patients

                            </h3>

                            <p className="text-sm mt-2 text-gray-600">

                                Register once,
                                access multiple hospitals,
                                book doctors,
                                manage appointments.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}