import {
    ArrowRight,
    BadgeCheck,
    Check,
    Clock3,
    FileCheck2,
    HeartPulse,
    ShieldCheck,
    Stethoscope,
    UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationSelector from "../components/LocationSelector";

export default function NurseOnboarding() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        country: "Nigeria",
        state: "",
        city: "",
        nursing_type: "",
        specialization: "",
        other_specialization: "",
        years_of_experience: "",
        license_number: "",
        qualification: "",
        institution: "",
        last_place_of_work: "",
        bio: "",
        services: [] as string[],
        service_arrangement: "",
        availability: "",
    });

    function updateField(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function toggleService(service: string) {
        setForm((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((item) => item !== service)
                : [...prev.services, service],
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        sessionStorage.setItem(
            "healthopz_nurse_onboarding",
            JSON.stringify(form)
        );

        navigate("/nurse-onboarding/review");
    }

    const steps = [
        "Profile",
        "Credentials",
        "Specialization",
        "Services",
        "Availability",
        "Review",
    ];

    const services = [
        "Home Nursing",
        "Elderly Care",
        "Post-Operative Care",
        "Maternity Support",
        "Medication Support",
        "Wound Care",
        "Chronic Care",
        "Patient Recovery",
    ];

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ================= HEADER ================= */}

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
                                <HeartPulse
                                    size={24}
                                    className="text-teal-700"
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    HealthOpz
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Freelance Nurse Registration
                                </p>
                            </div>

                        </div>

                        <div className="hidden items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 sm:flex">
                            <ShieldCheck size={17} />
                            Secure Professional Registration
                        </div>

                    </div>

                </div>
            </header>

            {/* ================= PROGRESS ================= */}

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 py-6">

                    <div className="flex items-center justify-between">

                        {steps.map((step, index) => {

                            const active = index === 0;
                            const completed = false;

                            return (
                                <div
                                    key={step}
                                    className="flex flex-1 items-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition ${active
                                                ? "border-teal-600 bg-teal-600 text-white"
                                                : completed
                                                    ? "border-teal-600 bg-teal-50 text-teal-700"
                                                    : "border-slate-200 bg-white text-slate-400"
                                                }`}
                                        >
                                            {completed ? (
                                                <Check size={18} />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        <span
                                            className={`mt-2 hidden text-xs font-medium sm:block ${active
                                                ? "text-teal-700"
                                                : "text-slate-400"
                                                }`}
                                        >
                                            {step}
                                        </span>

                                    </div>

                                    {index < steps.length - 1 && (
                                        <div className="mx-2 h-px flex-1 bg-slate-200" />
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* ================= MAIN ================= */}

            <main className="mx-auto max-w-5xl px-6 py-12">

                {/* ================= HERO ================= */}

                <div className="mb-10 text-center">

                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-100">
                        <Stethoscope
                            size={40}
                            className="text-teal-700"
                        />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
                        Become a Freelance Nurse
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Build Your Professional Nursing Profile
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Join the HealthOpz freelance nursing network.
                        Create your professional profile, submit your
                        credentials for verification, and make your nursing
                        services available to clients and healthcare
                        organizations.
                    </p>

                </div>

                {/* ================= FREELANCE NURSE NOTICE ================= */}

                <div className="mb-8 rounded-2xl border border-teal-100 bg-teal-50 p-5">

                    <div className="flex gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                            <BadgeCheck
                                size={22}
                                className="text-teal-700"
                            />
                        </div>

                        <div>

                            <h3 className="font-bold text-teal-900">
                                Freelance Nurse
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-teal-800">
                                This registration is for independent nurses
                                who wish to offer nursing services through
                                HealthOpz. HealthOpz verifies professional
                                credentials and relevant work history but
                                does not employ, supervise or control
                                freelance nurses or assume responsibility
                                for their service performance.
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= FORM ================= */}

                <form onSubmit={handleSubmit}>

                    <div className="overflow-visible rounded-3xl border border-slate-200 bg-white shadow-xl">

                        {/* ================= CARD HEADER ================= */}

                        <div className="rounded-t-3xl border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                                    <UserRound
                                        size={22}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Professional Profile
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide the information clients will
                                        use to understand your professional
                                        nursing background.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ================= BODY ================= */}

                        <div className="space-y-10 p-6 sm:p-8">

                            {/* ================= PERSONAL INFORMATION ================= */}

                            <section>

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Personal Information
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide your basic professional
                                        identification details.
                                    </p>

                                </div>

                                <div className="grid gap-6 md:grid-cols-2">

                                    <div>

                                        <label
                                            htmlFor="full_name"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            id="full_name"
                                            name="full_name"
                                            value={form.full_name}
                                            onChange={updateField}
                                            required
                                            placeholder="e.g. Nurse Amanda Johnson"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={updateField}
                                            required
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={updateField}
                                            required
                                            placeholder="+234 800 000 0000"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="date_of_birth"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Date of Birth
                                        </label>

                                        <input
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            type="date"
                                            value={form.date_of_birth}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="gender"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Gender
                                        </label>

                                        <select
                                            id="gender"
                                            name="gender"
                                            value={form.gender}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >

                                            <option value="">
                                                Select Gender
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </section>

                            {/* ================= LOCATION ================= */}

                            <section className="border-t border-slate-100 pt-10">

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Professional Location
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tell us where you currently provide
                                        or intend to provide freelance nursing
                                        services.
                                    </p>

                                </div>

                                <LocationSelector
                                    country={form.country}
                                    state={form.state}
                                    city={form.city}
                                    required
                                    onChange={(location) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            ...location,
                                        }))
                                    }
                                />

                            </section>

                            {/* ================= CREDENTIALS ================= */}

                            <section className="border-t border-slate-100 pt-10">

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Nursing Credentials
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide the professional information
                                        required for verification.
                                    </p>

                                </div>

                                <div className="grid gap-6 md:grid-cols-2">

                                    <div>

                                        <label
                                            htmlFor="nursing_type"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Professional Category
                                        </label>

                                        <select
                                            id="nursing_type"
                                            name="nursing_type"
                                            value={form.nursing_type}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >

                                            <option value="">
                                                Select Category
                                            </option>

                                            <option value="Registered Nurse">
                                                Registered Nurse
                                            </option>

                                            <option value="Registered Midwife">
                                                Registered Midwife
                                            </option>

                                            <option value="Registered Nurse and Midwife">
                                                Registered Nurse & Midwife
                                            </option>

                                        </select>

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="license_number"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Professional License /
                                            Registration Number
                                        </label>

                                        <input
                                            id="license_number"
                                            name="license_number"
                                            value={form.license_number}
                                            onChange={updateField}
                                            required
                                            placeholder="Enter your registration number"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="qualification"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Highest Nursing Qualification
                                        </label>

                                        <select
                                            id="qualification"
                                            name="qualification"
                                            value={form.qualification}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >

                                            <option value="">
                                                Select Qualification
                                            </option>

                                            <option value="RN">
                                                Registered Nurse (RN)
                                            </option>

                                            <option value="RM">
                                                Registered Midwife (RM)
                                            </option>

                                            <option value="B.NSc">
                                                Bachelor of Nursing Science
                                            </option>

                                            <option value="Postgraduate">
                                                Postgraduate Nursing Qualification
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="institution"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Training Institution
                                        </label>

                                        <input
                                            id="institution"
                                            name="institution"
                                            value={form.institution}
                                            onChange={updateField}
                                            required
                                            placeholder="Nursing school / university"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                    </div>

                                    <div className="md:col-span-2">

                                        <label
                                            htmlFor="years_of_experience"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Years of Nursing Experience
                                        </label>

                                        <select
                                            id="years_of_experience"
                                            name="years_of_experience"
                                            value={form.years_of_experience}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >

                                            <option value="">
                                                Select Experience
                                            </option>

                                            <option value="0-1">
                                                Less than 1 year
                                            </option>

                                            <option value="1-3">
                                                1–3 years
                                            </option>

                                            <option value="4-6">
                                                4–6 years
                                            </option>

                                            <option value="7-10">
                                                7–10 years
                                            </option>

                                            <option value="10+">
                                                More than 10 years
                                            </option>

                                        </select>

                                    </div>

                                    <div className="md:col-span-2">

                                        <label
                                            htmlFor="last_place_of_work"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Last Place of Work
                                        </label>

                                        <input
                                            id="last_place_of_work"
                                            name="last_place_of_work"
                                            value={form.last_place_of_work}
                                            onChange={updateField}
                                            placeholder="Hospital, clinic, care facility or organisation"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                        <p className="mt-2 text-xs text-slate-500">
                                            This may be used as part of your
                                            professional background verification.
                                        </p>

                                    </div>

                                </div>

                            </section>

                            {/* ================= SPECIALIZATION ================= */}

                            <section className="border-t border-slate-100 pt-10">

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Nursing Specialization
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tell clients about your areas of
                                        professional expertise.
                                    </p>

                                </div>

                                <div className="grid gap-6 md:grid-cols-2">

                                    <div>

                                        <label
                                            htmlFor="specialization"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Primary Specialization
                                        </label>

                                        <select
                                            id="specialization"
                                            name="specialization"
                                            value={form.specialization}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >

                                            <option value="">
                                                Select Specialization
                                            </option>

                                            <option value="General Nursing">
                                                General Nursing
                                            </option>

                                            <option value="Midwifery">
                                                Midwifery
                                            </option>

                                            <option value="ICU / Critical Care">
                                                ICU / Critical Care
                                            </option>

                                            <option value="Emergency Nursing">
                                                Emergency Nursing
                                            </option>

                                            <option value="Paediatric Nursing">
                                                Paediatric Nursing
                                            </option>

                                            <option value="Community Health">
                                                Community Health
                                            </option>

                                            <option value="Mental Health">
                                                Mental Health
                                            </option>

                                            <option value="Geriatric Nursing">
                                                Geriatric Nursing
                                            </option>

                                            <option value="Surgical Nursing">
                                                Surgical Nursing
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="other_specialization"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Other Specialization
                                        </label>

                                        <input
                                            id="other_specialization"
                                            name="other_specialization"
                                            value={form.other_specialization}
                                            onChange={updateField}
                                            placeholder="If applicable"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />

                                    </div>

                                </div>

                            </section>

                            {/* ================= SERVICES ================= */}

                            <section className="border-t border-slate-100 pt-10">

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Services You Provide
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Select the nursing services you are
                                        qualified and willing to provide.
                                    </p>

                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">

                                    {services.map((service) => {

                                        const selected =
                                            form.services.includes(service);

                                        return (
                                            <button
                                                type="button"
                                                key={service}
                                                onClick={() =>
                                                    toggleService(service)
                                                }
                                                className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${selected
                                                    ? "border-teal-500 bg-teal-50 text-teal-800"
                                                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-slate-50"
                                                    }`}
                                            >

                                                <span className="font-medium">
                                                    {service}
                                                </span>

                                                {selected && (
                                                    <Check
                                                        size={19}
                                                        className="text-teal-700"
                                                    />
                                                )}

                                            </button>
                                        );
                                    })}

                                </div>

                                <p className="mt-3 text-xs text-slate-500">
                                    Select all services that apply.
                                </p>

                            </section>

                            {/* ================= ABOUT ================= */}

                            <section className="border-t border-slate-100 pt-10">

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Professional Bio
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Introduce yourself to potential
                                        clients and healthcare organisations.
                                    </p>

                                </div>

                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={form.bio}
                                    onChange={updateField}
                                    rows={5}
                                    maxLength={1000}
                                    placeholder="Tell clients about your nursing experience, areas of expertise and the kind of care you provide..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    Maximum 1,000 characters.
                                </p>

                            </section>

                            {/* ================= AVAILABILITY ================= */}

                            <section className="border-t border-slate-100 pt-10">

                                <div className="mb-6">

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Availability
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tell clients when you are available
                                        to provide freelance nursing services.
                                    </p>

                                </div>

                                <div className="grid gap-6 md:grid-cols-2">

                                    <div>

                                        <label
                                            htmlFor="service_arrangement"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Service Arrangement
                                        </label>

                                        <select
                                            id="service_arrangement"
                                            name="service_arrangement"
                                            value={form.service_arrangement}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >

                                            <option value="">
                                                Select Arrangement
                                            </option>

                                            <option value="Home Visit">
                                                Home Visit
                                            </option>

                                            <option value="Facility Assignment">
                                                Facility Assignment
                                            </option>

                                            <option value="Both">
                                                Home Visit & Facility Assignment
                                            </option>

                                        </select>

                                    </div>

                                    <div>

                                        <label
                                            htmlFor="availability"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Availability
                                        </label>

                                        <select
                                            id="availability"
                                            name="availability"
                                            value={form.availability}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >

                                            <option value="">
                                                Select Availability
                                            </option>

                                            <option value="Full Time">
                                                Full Time
                                            </option>

                                            <option value="Part Time">
                                                Part Time
                                            </option>

                                            <option value="Weekends">
                                                Weekends
                                            </option>

                                            <option value="Flexible">
                                                Flexible
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </section>

                            {/* ================= VERIFICATION NOTICE ================= */}

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <div className="flex gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                        <FileCheck2
                                            size={21}
                                            className="text-teal-700"
                                        />
                                    </div>

                                    <div>

                                        <h4 className="font-bold text-slate-900">
                                            Professional Verification
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            HealthOpz will verify the
                                            professional information you
                                            provide, including your nursing
                                            credentials, resume and relevant
                                            work history where applicable.
                                            Verification does not constitute
                                            employment, supervision or
                                            endorsement of your performance
                                            with clients.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ================= FOOTER ================= */}

                        <div className="rounded-b-3xl border-t border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">

                            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock3 size={16} />
                                    You can review your information before submission.
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-3 rounded-xl bg-teal-700 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                                >
                                    Continue to Review
                                    <ArrowRight size={19} />
                                </button>

                            </div>

                        </div>

                    </div>

                </form>

                {/* ================= BOTTOM TRUST ================= */}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">

                    <div className="flex items-center gap-2">
                        <ShieldCheck
                            size={17}
                            className="text-teal-600"
                        />
                        Secure Registration
                    </div>

                    <div className="flex items-center gap-2">
                        <BadgeCheck
                            size={17}
                            className="text-teal-600"
                        />
                        Credential Verification
                    </div>

                    <div className="flex items-center gap-2">
                        <HeartPulse
                            size={17}
                            className="text-teal-600"
                        />
                        Freelance Nursing Network
                    </div>

                </div>

            </main>

        </div>
    );
}