import { useState } from "react";
import LocationSelector from "../components/LocationSelector";
import { useNavigate } from "react-router-dom";
import {
    Stethoscope,
    ArrowRight,
    ArrowLeft,
    UserRound,
    MapPin,
    BriefcaseMedical,
    FileText,
    ShieldCheck,
} from "lucide-react";

export default function DoctorOnboarding() {
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
        specialization: "",
        other_specialization: "",
        years_of_experience: "",
        license_number: "",
        qualification: "",
        institution: "",
        bio: "",
        consultation_fee: "",
        consultation_type: "",
    });

    function updateField(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function nextStep(e: React.FormEvent) {
        e.preventDefault();

        sessionStorage.setItem(
            "doctor_onboarding",
            JSON.stringify(form)
        );

        navigate("/doctor-onboarding/profile");
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 text-white">

                <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8">

                    <div className="flex items-center gap-5">

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

                            <Stethoscope size={34} />

                        </div>

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-wider text-teal-100">
                                HealthOpz Doctor Network
                            </p>

                            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
                                Join HealthOpz as a Doctor
                            </h1>

                            <p className="mt-2 text-teal-50">
                                Create your professional profile and connect
                                with patients.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                PROGRESS
            ===================================================== */}

            <div className="border-b bg-white">

                <div className="mx-auto max-w-5xl px-6 py-5 lg:px-8">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                            1
                        </div>

                        <div className="h-1 flex-1 rounded-full bg-teal-600" />

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-500">
                            2
                        </div>

                        <div className="h-1 flex-1 rounded-full bg-gray-200" />

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-500">
                            3
                        </div>

                        <div className="h-1 flex-1 rounded-full bg-gray-200" />

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-500">
                            4
                        </div>

                    </div>

                    <div className="mt-3 flex justify-between text-xs text-gray-500">

                        <span>Professional Details</span>
                        <span>Profile</span>
                        <span>Subscription</span>
                        <span>Complete</span>

                    </div>

                </div>

            </div>


            {/* =====================================================
                FORM
            ===================================================== */}

            <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

                <form
                    onSubmit={nextStep}
                    className="space-y-8"
                >

                    {/* =================================================
                        PERSONAL INFORMATION
                    ================================================= */}

                    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="mb-8 flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">

                                <UserRound
                                    size={24}
                                    className="text-teal-700"
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Personal Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Tell us about yourself.
                                </p>

                            </div>

                        </div>


                        <div className="grid gap-6 md:grid-cols-2">

                            {/* FULL NAME */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    name="full_name"
                                    value={form.full_name}
                                    onChange={updateField}
                                    required
                                    placeholder="Dr. John Doe"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>


                            {/* EMAIL */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={updateField}
                                    required
                                    placeholder="doctor@example.com"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>


                            {/* PHONE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={updateField}
                                    required
                                    placeholder="+234 800 000 0000"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>


                            {/* DATE OF BIRTH */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={form.date_of_birth}
                                    onChange={updateField}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>


                            {/* GENDER */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={updateField}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="male">
                                        Male
                                    </option>

                                    <option value="female">
                                        Female
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="mb-8 flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">

                                <MapPin
                                    size={24}
                                    className="text-teal-700"
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Location
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Where are you based?
                                </p>

                            </div>

                        </div>


                        <div className="grid gap-6 md:grid-cols-3">

                            {/* LOCATION */}

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

                        </div>

                    </section>


                    {/* =================================================
                        PROFESSIONAL INFORMATION
                    ================================================= */}

                    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="mb-8 flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">

                                <BriefcaseMedical
                                    size={24}
                                    className="text-teal-700"
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Professional Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Your medical qualifications and experience.
                                </p>

                            </div>

                        </div>


                        <div className="grid gap-6 md:grid-cols-2">

                            {/* SPECIALIZATION */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Medical Specialization
                                </label>

                                <select
                                    name="specialization"
                                    value={form.specialization}
                                    onChange={updateField}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                >

                                    <option value="">
                                        Select Specialization
                                    </option>

                                    <option value="General Practitioner">
                                        General Practitioner
                                    </option>

                                    <option value="Cardiologist">
                                        Cardiologist
                                    </option>

                                    <option value="Dermatologist">
                                        Dermatologist
                                    </option>

                                    <option value="Pediatrician">
                                        Pediatrician
                                    </option>

                                    <option value="Gynecologist">
                                        Gynecologist
                                    </option>

                                    <option value="Obstetrician">
                                        Obstetrician
                                    </option>

                                    <option value="Psychiatrist">
                                        Psychiatrist
                                    </option>

                                    <option value="Neurologist">
                                        Neurologist
                                    </option>

                                    <option value="Orthopedic Surgeon">
                                        Orthopedic Surgeon
                                    </option>

                                    <option value="Ophthalmologist">
                                        Ophthalmologist
                                    </option>

                                    <option value="Dentist">
                                        Dentist
                                    </option>

                                    <option value="Urologist">
                                        Urologist
                                    </option>

                                    <option value="Endocrinologist">
                                        Endocrinologist
                                    </option>

                                    <option value="Oncologist">
                                        Oncologist
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* OTHER SPECIALIZATION */}

                            {form.specialization === "Other" && (

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Specify Specialization
                                    </label>

                                    <input
                                        name="other_specialization"
                                        value={form.other_specialization}
                                        onChange={updateField}
                                        required
                                        placeholder="Enter specialization"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                    />

                                </div>

                            )}


                            {/* EXPERIENCE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Years of Experience
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="years_of_experience"
                                    value={form.years_of_experience}
                                    onChange={updateField}
                                    required
                                    placeholder="8"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>


                            {/* LICENSE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Medical License Number
                                </label>

                                <input
                                    name="license_number"
                                    value={form.license_number}
                                    onChange={updateField}
                                    required
                                    placeholder="Enter professional license number"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>


                            {/* QUALIFICATION */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Highest Qualification
                                </label>

                                <input
                                    name="qualification"
                                    value={form.qualification}
                                    onChange={updateField}
                                    required
                                    placeholder="MBBS"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>


                            {/* INSTITUTION */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Institution
                                </label>

                                <input
                                    name="institution"
                                    value={form.institution}
                                    onChange={updateField}
                                    required
                                    placeholder="University / Medical School"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        CONSULTATION
                    ================================================= */}

                    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="mb-8 flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">

                                <FileText
                                    size={24}
                                    className="text-teal-700"
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Consultation Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Configure how patients can consult you.
                                </p>

                            </div>

                        </div>


                        <div className="grid gap-6 md:grid-cols-2">

                            {/* CONSULTATION TYPE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Consultation Type
                                </label>

                                <select
                                    name="consultation_type"
                                    value={form.consultation_type}
                                    onChange={updateField}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                >

                                    <option value="">
                                        Select Consultation Type
                                    </option>

                                    <option value="video">
                                        Video Consultation
                                    </option>

                                    <option value="audio">
                                        Audio Consultation
                                    </option>

                                    <option value="chat">
                                        Chat Consultation
                                    </option>

                                    <option value="video_audio_chat">
                                        Video, Audio & Chat
                                    </option>

                                </select>

                            </div>


                            {/* FEE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Consultation Fee (₦)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="consultation_fee"
                                    value={form.consultation_fee}
                                    onChange={updateField}
                                    required
                                    placeholder="10000"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                                />

                            </div>

                        </div>


                        {/* BIO */}

                        <div className="mt-6">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Professional Bio
                            </label>

                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={updateField}
                                required
                                rows={5}
                                placeholder="Tell patients about your professional experience, areas of expertise and approach to patient care..."
                                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                            />

                        </div>

                    </section>


                    {/* =================================================
                        SUBSCRIPTION NOTICE
                    ================================================= */}

                    <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">

                        <div className="flex gap-4">

                            <div className="mt-1">

                                <ShieldCheck
                                    size={24}
                                    className="text-teal-700"
                                />

                            </div>

                            <div>

                                <h3 className="font-bold text-teal-900">
                                    HealthOpz Doctor Subscription
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-teal-800">

                                    Freelance doctors pay a yearly
                                    subscription of{" "}
                                    <strong>₦50,000</strong> to maintain
                                    an active HealthOpz professional profile.

                                </p>

                                <p className="mt-2 text-sm text-teal-700">

                                    You will review your information and
                                    complete your subscription in the next
                                    steps.

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">

                        <button
                            type="button"
                            onClick={() => navigate("/doctors")}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                        >

                            <ArrowLeft size={18} />

                            Back to Doctors

                        </button>


                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-8 py-3.5 font-semibold text-white shadow-sm transition hover:bg-teal-800"
                        >

                            Continue

                            <ArrowRight size={18} />

                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}