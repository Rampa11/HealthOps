import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import MegaMenu from "./MegaMenu";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [megaOpen, setMegaOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* ================= LOGO ================= */}

                <Link
                    to="/"
                    className="flex items-center"
                >
                    <img
                        src="/logo.png"
                        alt="HealthOpz"
                        className="h-20 w-auto"
                    />
                </Link>

                {/* ================= DESKTOP NAV ================= */}

                <nav className="hidden items-center gap-8 lg:flex">

                    <button
                        onClick={() => setMegaOpen(!megaOpen)}
                        className="font-semibold text-gray-700 transition hover:text-teal-700"
                    >
                        Services
                    </button>

                    <Link
                        to="/pricing"
                        className="font-semibold text-gray-700 hover:text-teal-700"
                    >
                        Pricing
                    </Link>

                    <Link
                        to="/about"
                        className="font-semibold text-gray-700 hover:text-teal-700"
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className="font-semibold text-gray-700 hover:text-teal-700"
                    >
                        Contact
                    </Link>

                </nav>

                {/* ================= RIGHT ================= */}

                <div className="flex items-center gap-4">

                    <ThemeToggle />

                    <Link
                        to="/hospital-login"
                        className="hidden rounded-xl border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100 lg:block"
                    >
                        Login
                    </Link>

                    <Link
                        to="/get-started"
                        className="rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
                    >
                        Get Started
                    </Link>

                    {/* Mobile Menu Button */}

                    <button
                        className="lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>

            </div>

            {/* ================= MEGA MENU ================= */}

            <MegaMenu
                open={megaOpen}
                onClose={() => setMegaOpen(false)}
            />

            {/* ================= MOBILE MENU ================= */}

            {mobileOpen && (

                <div className="border-t bg-white lg:hidden">

                    <div className="space-y-2 p-6">

                        <Link
                            to="/hospitals"
                            className="block rounded-lg p-3 hover:bg-gray-100"
                        >
                            Hospitals
                        </Link>

                        <Link
                            to="/doctors"
                            className="block rounded-lg p-3 hover:bg-gray-100"
                        >
                            Doctors
                        </Link>

                        <Link
                            to="/nurses"
                            className="block rounded-lg p-3 hover:bg-gray-100"
                        >
                            Nurses
                        </Link>

                        <Link
                            to="/traditional-medicine"
                            className="block rounded-lg p-3 hover:bg-gray-100"
                        >
                            Traditional Medicine
                        </Link>

                        <Link
                            to="/pharmacy"
                            className="block rounded-lg p-3 hover:bg-gray-100"
                        >
                            Pharmacy
                        </Link>

                        <Link
                            to="/labs"
                            className="block rounded-lg p-3 hover:bg-gray-100"
                        >
                            Laboratory
                        </Link>

                        <Link
                            to="/patient-login"
                            className="block rounded-lg p-3 hover:bg-gray-100"
                        >
                            Patients
                        </Link>

                    </div>

                </div>

            )}

        </header>
    );
}