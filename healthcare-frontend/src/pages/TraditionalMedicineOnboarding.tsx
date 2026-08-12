import {
    ArrowRight,
    BadgeCheck,
    Check,
    Clock3,
    FileCheck2,
    HeartPulse,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationSelector from "../components/LocationSelector";

export default function TraditionalMedicineOnboarding() {
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
        practitioner_type: "",
        practice_name: "",
        years_of_experience: "",
        qualification: "",
        certification_number: "",
        training_institution: "",
        specialization: "",
        other_specialization: "",
        services: [] as string[],
        practice_location: "",
        consultation_type: "",
        availability: "",
        bio: "",
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
            "healthopz_traditional_medicine_onboarding",
            JSON.stringify(form)
        );

        navigate("/traditional-medicine-onboarding/review");
    }

    const steps = [
        "Profile",
        "Practice",
        "Credentials",
        "Specialization",
        "Services",
        "Review",
    ];

    const services = [
        "Herbal Medicine",
        "Traditional Healing",
        "Natural Remedies",
        "Bone Setting",
        "Traditional Birth Support",
        "Holistic Wellness",
        "Massage Therapy",
        "Nutrition & Herbal Consultation",
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* HEADER */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                                <HeartPulse
                                    size={24}
                                    className="text-emerald-700"
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    HealthOpz
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Traditional Medicine Practitioner Registration
                                </p>
                            </div>
                        </div>

                        <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:flex">
                            <ShieldCheck size={17} />
                            Secure Professional Registration
                        </div>
                    </div>
                </div>
            </header>

            {/* PROGRESS */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 py-6">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const active = index === 0;

                            return (
                                <div
                                    key={step}
                                    className="flex flex-1 items-center"
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${active
                                                ? "border-emerald-600 bg-emerald-600 text-white"
                                                : "border-slate-200 bg-white text-slate-400"
                                                }`}
                                        >
                                            {index + 1}
                                        </div>

                                        <span
                                            className={`mt-2 hidden text-xs font-medium sm:block ${active
                                                ? "text-emerald-700"
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

            {/* MAIN */}
            <main className="mx-auto max-w-5xl px-6 py-12">
                {/* HERO */}
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">
                        <HeartPulse
                            size={40}
                            className="text-emerald-700"
                        />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
                        Join HealthOpz
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Become a Traditional Medicine Practitioner
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Create your professional profile and make your
                        traditional medicine practice discoverable to people
                        looking for trusted practitioners.
                    </p>
                </div>

                {/* IMPORTANT NOTICE */}
                <div className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                    <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                            <BadgeCheck
                                size={22}
                                className="text-emerald-700"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold text-emerald-900">
                                Independent Practitioner Registration
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-emerald-800">
                                This registration is for independent
                                traditional medicine practitioners who want
                                to be listed on HealthOpz. HealthOpz may
                                review submitted professional information and
                                supporting documents for verification.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                        {/* CARD HEADER */}
                        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                                    <UserRound
                                        size={22}
                                        className="text-emerald-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Practitioner Profile
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide your personal and professional
                                        information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* BODY */}
                        <div className="space-y-10 p-6 sm:p-8">
                            {/* PERSONAL INFORMATION */}
                            <section>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Personal Information
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Your basic information for your
                                        practitioner profile.
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
                                            placeholder="Enter your full name"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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

                            {/* LOCATION */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Practice Location
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tell us where you currently practice
                                        or intend to provide your services.
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

                            {/* PRACTICE INFORMATION */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Practice Information
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tell us about your traditional medicine
                                        practice.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="practitioner_type"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Practitioner Type
                                        </label>

                                        <select
                                            id="practitioner_type"
                                            name="practitioner_type"
                                            value={form.practitioner_type}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        >
                                            <option value="">
                                                Select Practitioner Type
                                            </option>
                                            <option value="Traditional Medicine Practitioner">
                                                Traditional Medicine Practitioner
                                            </option>
                                            <option value="Herbal Medicine Practitioner">
                                                Herbal Medicine Practitioner
                                            </option>
                                            <option value="Traditional Healer">
                                                Traditional Healer
                                            </option>
                                            <option value="Bone Setter">
                                                Bone Setter
                                            </option>
                                            <option value="Traditional Birth Attendant">
                                                Traditional Birth Attendant
                                            </option>
                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="practice_name"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Practice Name
                                        </label>

                                        <input
                                            id="practice_name"
                                            name="practice_name"
                                            value={form.practice_name}
                                            onChange={updateField}
                                            required
                                            placeholder="e.g. Green Leaf Herbal Centre"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="years_of_experience"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Years of Experience
                                        </label>

                                        <select
                                            id="years_of_experience"
                                            name="years_of_experience"
                                            value={form.years_of_experience}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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

                                    <div>
                                        <label
                                            htmlFor="practice_location"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Practice Address
                                        </label>

                                        <input
                                            id="practice_location"
                                            name="practice_location"
                                            value={form.practice_location}
                                            onChange={updateField}
                                            required
                                            placeholder="Practice address or area"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* CREDENTIALS */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Professional Credentials
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide available training,
                                        certification and registration
                                        information.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="qualification"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Highest Qualification
                                        </label>

                                        <input
                                            id="qualification"
                                            name="qualification"
                                            value={form.qualification}
                                            onChange={updateField}
                                            required
                                            placeholder="Enter qualification"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="certification_number"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Certification / Registration Number
                                        </label>

                                        <input
                                            id="certification_number"
                                            name="certification_number"
                                            value={form.certification_number}
                                            onChange={updateField}
                                            placeholder="If applicable"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="training_institution"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Training Institution / Organization
                                        </label>

                                        <input
                                            id="training_institution"
                                            name="training_institution"
                                            value={form.training_institution}
                                            onChange={updateField}
                                            placeholder="Training institution, association or organization"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* SPECIALIZATION */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Area of Practice
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Help people understand your primary
                                        area of traditional medicine practice.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="specialization"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Primary Area
                                        </label>

                                        <select
                                            id="specialization"
                                            name="specialization"
                                            value={form.specialization}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        >
                                            <option value="">
                                                Select Area
                                            </option>
                                            <option value="Herbal Medicine">
                                                Herbal Medicine
                                            </option>
                                            <option value="Traditional Healing">
                                                Traditional Healing
                                            </option>
                                            <option value="Bone Setting">
                                                Bone Setting
                                            </option>
                                            <option value="Traditional Birth Support">
                                                Traditional Birth Support
                                            </option>
                                            <option value="Holistic Wellness">
                                                Holistic Wellness
                                            </option>
                                            <option value="Natural Remedies">
                                                Natural Remedies
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
                                            Other Area
                                        </label>

                                        <input
                                            id="other_specialization"
                                            name="other_specialization"
                                            value={form.other_specialization}
                                            onChange={updateField}
                                            placeholder="If applicable"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* SERVICES */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Services You Provide
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Select the services you currently
                                        provide.
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
                                                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                                                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <span className="font-medium">
                                                    {service}
                                                </span>

                                                {selected && (
                                                    <Check
                                                        size={19}
                                                        className="text-emerald-700"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* ARRANGEMENT */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Service Arrangement
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tell people how you normally provide
                                        your services.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="consultation_type"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Service Arrangement
                                        </label>

                                        <select
                                            id="consultation_type"
                                            name="consultation_type"
                                            value={form.consultation_type}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        >
                                            <option value="">
                                                Select Arrangement
                                            </option>
                                            <option value="Practice Location">
                                                At Practice Location
                                            </option>
                                            <option value="Home Visit">
                                                Home Visits
                                            </option>
                                            <option value="Both">
                                                Practice Location & Home Visits
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
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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

                            {/* BIO */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Professional Bio
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Introduce yourself and describe your
                                        experience and approach to practice.
                                    </p>
                                </div>

                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={form.bio}
                                    onChange={updateField}
                                    rows={5}
                                    maxLength={1000}
                                    placeholder="Tell people about your experience, practice and the services you provide..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    Maximum 1,000 characters.
                                </p>
                            </section>

                            {/* VERIFICATION NOTICE */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                        <FileCheck2
                                            size={21}
                                            className="text-emerald-700"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-slate-900">
                                            Professional Information Review
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            Information and supporting
                                            documents submitted during
                                            onboarding may be reviewed before
                                            your practitioner profile receives
                                            a verified status.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock3 size={16} />
                                    You can review your information before
                                    submission.
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                                >
                                    Continue to Review
                                    <ArrowRight size={19} />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* TRUST FOOTER */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <ShieldCheck
                            size={17}
                            className="text-emerald-600"
                        />
                        Secure Registration
                    </div>

                    <div className="flex items-center gap-2">
                        <BadgeCheck
                            size={17}
                            className="text-emerald-600"
                        />
                        Information Verification
                    </div>

                    <div className="flex items-center gap-2">
                        <HeartPulse
                            size={17}
                            className="text-emerald-600"
                        />
                        HealthOpz Professional Network
                    </div>
                </div>
            </main>
        </div>
    );
}