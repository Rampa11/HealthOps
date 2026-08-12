import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppShell() {
    return (
        <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            <Navbar />

            <main className="min-h-[80vh]">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}