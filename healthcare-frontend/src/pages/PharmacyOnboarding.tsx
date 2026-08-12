import {
    ArrowRight,
    BadgeCheck,
    Building2,
    Check,
    FileCheck2,
    HeartPulse,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../components/LocationSelector";

export default function PharmacyOnboarding() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        pharmacy_name: "",
        pharmacy_type: "",
        registration_number: "",
        pharmacist_name: "",
        pharmacist_license_number: "",
        email: "",
        phone: "",
        website: "",

        country: "Nigeria",
        state: "",
        city: "",

        address: "",

        years_in_operation: "",
        services: [] as string[],

        opening_hours: "",
        delivery_available: "",

        description: "",
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
            "healthopz_pharmacy_onboarding",
            JSON.stringify(form)
        );

        navigate("/pharmacy-onboarding/review");
    }

    const steps = [
        "Pharmacy",
        "Location",
        "Services",
        "Verification",
        "Review",
        "Payment",
    ];

    const services = [
        "Prescription Dispensing",
        "Over-the-Counter Medicines",
        "Medication Counselling",
        "Chronic Disease Support",
        "Health Screening",
        "Vaccination Services",
        "Home Delivery",
        "Health Products",
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* HEADER */}
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
                                    Pharmacy Onboarding
                                </p>
                            </div>
                        </div>

                        <div className="hidden items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 sm:flex">
                            <ShieldCheck size={17} />
                            Secure Registration
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
                                                ? "border-teal-600 bg-teal-600 text-white"
                                                : "border-slate-200 bg-white text-slate-400"
                                                }`}
                                        >
                                            {index + 1}
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

            {/* MAIN */}
            <main className="mx-auto max-w-5xl px-6 py-12">
                {/* HERO */}
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-100">
                        <Building2
                            size={40}
                            className="text-teal-700"
                        />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
                        Become a HealthOpz Pharmacy
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Register Your Pharmacy
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Create your pharmacy profile, provide your
                        professional details and connect your pharmacy
                        with the HealthOpz healthcare ecosystem.
                    </p>
                </div>

                {/* PHARMACY NOTICE */}
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
                                Verified Pharmacy Profile
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-teal-800">
                                Pharmacy registration requires professional
                                and business information. Your pharmacy and
                                responsible pharmacist credentials may be
                                reviewed before your profile receives a
                                verified HealthOpz status.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    <div className="overflow-visible rounded-3xl border border-slate-200 bg-white shadow-xl">
                        {/* CARD HEADER */}
                        <div className="rounded-t-3xl border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                                    <Building2
                                        size={22}
                                        className="text-teal-700"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Pharmacy Information
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide the basic information about
                                        your pharmacy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* BODY */}
                        <div className="space-y-10 p-6 sm:p-8">
                            {/* PHARMACY DETAILS */}
                            <section>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Pharmacy Details
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tell us about the pharmacy you are
                                        registering.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="pharmacy_name"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Pharmacy Name
                                        </label>

                                        <input
                                            id="pharmacy_name"
                                            name="pharmacy_name"
                                            value={form.pharmacy_name}
                                            onChange={updateField}
                                            required
                                            placeholder="e.g. HealthPlus Pharmacy"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="pharmacy_type"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Pharmacy Type
                                        </label>

                                        <select
                                            id="pharmacy_type"
                                            name="pharmacy_type"
                                            value={form.pharmacy_type}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >
                                            <option value="">
                                                Select Pharmacy Type
                                            </option>

                                            <option value="Community Pharmacy">
                                                Community Pharmacy
                                            </option>

                                            <option value="Hospital Pharmacy">
                                                Hospital Pharmacy
                                            </option>

                                            <option value="Retail Pharmacy">
                                                Retail Pharmacy
                                            </option>

                                            <option value="Wholesale Pharmacy">
                                                Wholesale Pharmacy
                                            </option>

                                            <option value="Specialty Pharmacy">
                                                Specialty Pharmacy
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="registration_number"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Pharmacy Registration Number
                                        </label>

                                        <input
                                            id="registration_number"
                                            name="registration_number"
                                            value={form.registration_number}
                                            onChange={updateField}
                                            required
                                            placeholder="Enter registration number"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="years_in_operation"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Years in Operation
                                        </label>

                                        <select
                                            id="years_in_operation"
                                            name="years_in_operation"
                                            value={form.years_in_operation}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >
                                            <option value="">
                                                Select Years
                                            </option>

                                            <option value="Less than 1 year">
                                                Less than 1 year
                                            </option>

                                            <option value="1-3 years">
                                                1–3 years
                                            </option>

                                            <option value="4-6 years">
                                                4–6 years
                                            </option>

                                            <option value="7-10 years">
                                                7–10 years
                                            </option>

                                            <option value="10+ years">
                                                More than 10 years
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="website"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Website
                                        </label>

                                        <input
                                            id="website"
                                            name="website"
                                            type="url"
                                            value={form.website}
                                            onChange={updateField}
                                            placeholder="https://example.com"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* RESPONSIBLE PHARMACIST */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Responsible Pharmacist
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide the details of the pharmacist
                                        responsible for the pharmacy.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="pharmacist_name"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Pharmacist Name
                                        </label>

                                        <div className="relative">
                                            <UserRound
                                                size={18}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                id="pharmacist_name"
                                                name="pharmacist_name"
                                                value={form.pharmacist_name}
                                                onChange={updateField}
                                                required
                                                placeholder="Full name"
                                                className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="pharmacist_license_number"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Pharmacist License Number
                                        </label>

                                        <input
                                            id="pharmacist_license_number"
                                            name="pharmacist_license_number"
                                            value={
                                                form.pharmacist_license_number
                                            }
                                            onChange={updateField}
                                            required
                                            placeholder="Enter license number"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* CONTACT */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Contact Information
                                    </h3>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Business Email
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={updateField}
                                            required
                                            placeholder="pharmacy@example.com"
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
                                </div>
                            </section>

                            {/* LOCATION */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Pharmacy Location
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Select the country, state and local
                                        government area where your pharmacy
                                        operates.
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

                                <div className="mt-6">
                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-sm font-semibold text-slate-800"
                                    >
                                        Street Address
                                    </label>

                                    <input
                                        id="address"
                                        name="address"
                                        value={form.address}
                                        onChange={updateField}
                                        required
                                        placeholder="Enter pharmacy street address"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                    />
                                </div>
                            </section>

                            {/* SERVICES */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Pharmacy Services
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Select the services your pharmacy
                                        currently provides.
                                    </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    {services.map((service) => {
                                        const selected =
                                            form.services.includes(service);

                                        return (
                                            <button
                                                key={service}
                                                type="button"
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
                            </section>

                            {/* OPERATIONS */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Pharmacy Operations
                                    </h3>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="opening_hours"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Opening Hours
                                        </label>

                                        <input
                                            id="opening_hours"
                                            name="opening_hours"
                                            value={form.opening_hours}
                                            onChange={updateField}
                                            required
                                            placeholder="e.g. Mon–Sat, 8:00 AM–8:00 PM"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="delivery_available"
                                            className="mb-2 block text-sm font-semibold text-slate-800"
                                        >
                                            Home Delivery
                                        </label>

                                        <select
                                            id="delivery_available"
                                            name="delivery_available"
                                            value={form.delivery_available}
                                            onChange={updateField}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        >
                                            <option value="">
                                                Select Option
                                            </option>

                                            <option value="Yes">
                                                Yes
                                            </option>

                                            <option value="No">
                                                No
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* DESCRIPTION */}
                            <section className="border-t border-slate-100 pt-10">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        About Your Pharmacy
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Give patients a short introduction
                                        to your pharmacy.
                                    </p>
                                </div>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={updateField}
                                    rows={5}
                                    maxLength={1000}
                                    placeholder="Tell patients about your pharmacy, areas of expertise and services..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
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
                                            className="text-teal-700"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-slate-900">
                                            Pharmacy Verification
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            Pharmacy registration and
                                            responsible pharmacist details
                                            may be reviewed before your
                                            pharmacy receives verified
                                            status on HealthOpz.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="rounded-b-3xl border-t border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">
                            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-slate-500">
                                    You can review your information before
                                    completing registration.
                                </p>

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

                {/* TRUST FOOTER */}
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
                        Pharmacy Verification
                    </div>

                    <div className="flex items-center gap-2">
                        <HeartPulse
                            size={17}
                            className="text-teal-600"
                        />
                        HealthOpz Healthcare Network
                    </div>
                </div>
            </main>
        </div>
    );
}