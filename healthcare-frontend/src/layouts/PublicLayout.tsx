import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* ================= HEADER ================= */}

            <header className="sticky top-0 z-50 bg-white shadow">

                <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="text-3xl font-bold text-blue-700"
                    >
                        HealthOpz
                    </Link>

                    {/* Navigation */}

                    <nav className="hidden md:flex items-center gap-8 text-gray-700">

                        <Link
                            to="/"
                            className="hover:text-blue-700"
                        >
                            Home
                        </Link>

                        <Link
                            to="/hospitals"
                            className="hover:text-blue-700"
                        >
                            Hospitals
                        </Link>

                        <Link
                            to="/doctors"
                            className="hover:text-blue-700"
                        >
                            Doctors
                        </Link>

                        <Link
                            to="/nurses"
                            className="hover:text-blue-700"
                        >
                            Nurses
                        </Link>

                        <Link
                            to="/traditional-medicine"
                            className="hover:text-blue-700"
                        >
                            Traditional Medicine
                        </Link>

                        <Link
                            to="/login"
                            className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
                        >
                            Login
                        </Link>

                    </nav>

                </div>

            </header>

            {/* ================= MAIN CONTENT ================= */}

            <main className="flex-1">

                <Outlet />

            </main>

            {/* ================= FOOTER ================= */}

            <Footer />

        </div>
    );
}