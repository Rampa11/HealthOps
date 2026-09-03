import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import MegaMenu from "./MegaMenu";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [megaOpen, setMegaOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMegaOpen(false);
        setMobileOpen(false);
        setMobileServicesOpen(false);
    }, [location.pathname]);

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
                <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t bg-white lg:hidden">
                    <div className="space-y-2 p-5">
                        <button onClick={() => setMobileServicesOpen(v => !v)} className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 text-left font-bold text-slate-800">
                            Services <span className="text-xl text-teal-700">{mobileServicesOpen ? "−" : "+"}</span>
                        </button>
                        {mobileServicesOpen && <div className="rounded-2xl border border-slate-100 p-3">
                            <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-teal-700">Healthcare Providers</p>
                            {[['Hospitals','/hospitals'],['Doctors','/doctors'],['Nurses','/nurses'],['Traditional Medicine','/traditional-medicine'],['Pharmacy','/pharmacy'],['Laboratories','/laboratories']].map(([label,path]) => <Link key={label} to={path} className="block rounded-lg px-3 py-2.5 hover:bg-teal-50">{label}</Link>)}
                            <p className="mt-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">Public Patients</p>
                            {[['Find Hospital','/hospitals'],['Find Doctor','/doctors'],['Book Appointment','/appointments'],['Patient Portal','/patient-dashboard'],['Patient Login','/patient-login']].map(([label,path]) => <Link key={label} to={path} className="block rounded-lg px-3 py-2.5 hover:bg-blue-50">{label}</Link>)}
                            <p className="mt-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Business</p>
                            <Link to="/pricing" className="block rounded-lg px-3 py-2.5 hover:bg-slate-50">Pricing</Link>
                        </div>}
                        <Link to="/pricing" className="block rounded-xl p-4 font-semibold hover:bg-slate-50">Pricing</Link>
                        <Link to="/about" className="block rounded-xl p-4 font-semibold hover:bg-slate-50">About</Link>
                        <Link to="/contact" className="block rounded-xl p-4 font-semibold hover:bg-slate-50">Contact</Link>
                        <Link to="/hospital-login" className="block rounded-xl border border-slate-200 p-4 text-center font-semibold">Hospital Login</Link>
                    </div>
                </div>
            )}

        </header>
    );
}