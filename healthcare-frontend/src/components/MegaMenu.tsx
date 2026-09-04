import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
    Building2,
    Stethoscope,
    HeartPulse,
    Pill,
    FlaskConical,
    Leaf,
    User,
    Briefcase,
    ArrowRight,
} from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
};

const providers = [
    { icon: <Building2 size={22} />, title: "Hospitals", desc: "Hospitals, Clinics & Diagnostic Centres", path: "/hospitals" },
    { icon: <Stethoscope size={22} />, title: "Doctors", desc: "Consult verified doctors", path: "/doctors" },
    { icon: <HeartPulse size={22} />, title: "Nurses", desc: "Find home-care nurses", path: "/nurses" },
    { icon: <Leaf size={22} />, title: "Traditional Medicine", desc: "Licensed practitioners", path: "/traditional-medicine" },
    { icon: <Pill size={22} />, title: "Pharmacy", desc: "Order medicines", path: "/pharmacy" },
    { icon: <FlaskConical size={22} />, title: "Laboratories", desc: "Book medical tests", path: "/laboratories" },
];

const patients = [
    { icon: <User size={22} />, title: "Find Hospital", path: "/hospitals" },
    { icon: <User size={22} />, title: "Find Doctor", path: "/doctors" },
    { icon: <User size={22} />, title: "Book Appointment", path: "/appointments" },
    { icon: <User size={22} />, title: "Patient Portal", path: "/patient-dashboard" },
    { icon: <User size={22} />, title: "Patient Login", path: "/patient-login" },
];

const business = [
    { icon: <Briefcase size={22} />, title: "Pricing", path: "/pricing" },
    { icon: <Briefcase size={22} />, title: "About HealthOpz", path: "/about" },
    { icon: <Briefcase size={22} />, title: "Contact our team", path: "/contact" },
];

export default function MegaMenu({ open, onClose }: Props) {
    const location = useLocation();

    // Close menu whenever the route changes
    useEffect(() => {
        if (open) {
            onClose();
        }
    }, [location]);

    if (!open) return null;

    return (
        <div className="absolute left-0 top-full w-full border-t bg-white shadow-2xl">
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-10 py-10">

                {/* PROVIDERS */}
                <div className="col-span-5">
                    <h2 className="mb-6 text-xl font-bold text-teal-700">Healthcare Providers</h2>
                    <div className="space-y-3">
                        {providers.map((item) => (
                            <Link
                                key={item.title}
                                to={item.path}
                                onClick={onClose}
                                className="flex items-start gap-4 rounded-xl p-4 transition hover:bg-gray-100"
                            >
                                <div className="rounded-lg bg-teal-100 p-3 text-teal-700">{item.icon}</div>
                                <div>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* PATIENTS */}
                <div className="col-span-3">
                    <h2 className="mb-6 text-xl font-bold text-blue-700">Public Patients</h2>
                    <div className="space-y-2">
                        {patients.map((item) => (
                            <Link
                                key={item.title}
                                to={item.path}
                                onClick={onClose}
                                className="block rounded-lg p-3 hover:bg-blue-50"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* BUSINESS */}
                <div className="col-span-4">
                    <div className="rounded-3xl bg-gradient-to-br from-teal-700 to-cyan-700 p-8 text-white">
                        <h2 className="text-2xl font-bold">Build Your Healthcare Business</h2>
                        <p className="mt-4 text-teal-100">
                            Launch your digital hospital, clinic, pharmacy or laboratory on HealthOpz.
                        </p>
                        <Link
                            to="/hospital-onboarding"
                            onClick={onClose}
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-teal-700"
                        >
                            Get Started
                            <ArrowRight size={18} />
                        </Link>
                        <hr className="my-8 border-teal-500" />
                        <div className="space-y-3">
                            {business.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.path}
                                    className="block hover:text-teal-100"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
