import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    ShieldCheck,
    Stethoscope,
    UserRound,
    ArrowRight,
    AlertCircle,
    ChevronDown,
} from "lucide-react";

interface Doctor {
    id: string;
    user_id?: string;
    name: string;
    email?: string;
    specialization?: string;
    experience_years?: number;
    consultation_fee?: number;
    tenant_id?: string;
    profile_image?: string;
    city?: string;
    state?: string;
    bio?: string;
    verified?: boolean;
}

interface BookingForm {
    specialization: string;
    doctor_id: string;
    preferred_date: string;
    preferred_time: string;
    notes: string;
}

const API = "";

function getAuthToken(): string | null {
    const possibleKeys = [
        "token",
        "access_token",
        "accessToken",
        "authToken",
        "patient_token",
    ];

    for (const key of possibleKeys) {
        const value = localStorage.getItem(key);

        if (value) {
            return value;
        }
    }

    return null;
}

function formatFee(fee?: number) {
    if (fee === undefined || fee === null) {
        return "Fee not specified";
    }

    return `₦${fee.toLocaleString()} `;
}

export default function Appointments() {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState<BookingForm>({
        specialization: "all",
        doctor_id: "",
        preferred_date: "",
        preferred_time: "",
        notes: "",
    });

    /*
     * ------------------------------------------------------------
     * AUTHENTICATION
     * ------------------------------------------------------------
     */
    useEffect(() => {
        const token = getAuthToken();

        if (!token) {
            navigate("/patient-login", {
                state: {
                    from: "/appointments",
                },
            });
        }
    }, [navigate]);

    /*
     * ------------------------------------------------------------
     * LOAD DOCTORS
     * ------------------------------------------------------------
     */
    useEffect(() => {
        async function loadDoctors() {
            try {
                setLoadingDoctors(true);
                setError("");

                const response = await axios.get<Doctor[]>(
                    `${API} /api/public/doctors`
                );

                setDoctors(response.data);
            } catch (err) {
                console.error("Failed to load doctors:", err);

                setError(
                    "We couldn't load the available doctors right now. Please try again."
                );
            } finally {
                setLoadingDoctors(false);
            }
        }

        loadDoctors();
    }, []);

    /*
     * ------------------------------------------------------------
     * SPECIALIZATIONS
     * ------------------------------------------------------------
     */
    const specializations = useMemo(() => {
        const values = doctors
            .map((doctor) => doctor.specialization)
            .filter(
                (value): value is string =>
                    Boolean(value && value.trim())
            );

        return Array.from(new Set(values)).sort();
    }, [doctors]);

    /*
     * ------------------------------------------------------------
     * FILTER DOCTORS
     * ------------------------------------------------------------
     */
    const filteredDoctors = useMemo(() => {
        if (form.specialization === "all") {
            return doctors;
        }

        return doctors.filter(
            (doctor) =>
                doctor.specialization === form.specialization
        );
    }, [doctors, form.specialization]);

    /*
     * ------------------------------------------------------------
     * SELECTED DOCTOR
     * ------------------------------------------------------------
     */
    const selectedDoctor = useMemo(() => {
        return doctors.find(
            (doctor) => doctor.id === form.doctor_id
        );
    }, [doctors, form.doctor_id]);

    /*
     * ------------------------------------------------------------
     * FORM HANDLERS
     * ------------------------------------------------------------
     */
    function updateForm(
        field: keyof BookingForm,
        value: string
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setError("");
        setSuccess("");
    }

    function handleSpecializationChange(value: string) {
        setForm((current) => ({
            ...current,
            specialization: value,
            doctor_id: "",
        }));

        setError("");
        setSuccess("");
    }

    /*
     * ------------------------------------------------------------
     * SUBMIT CONSULTATION REQUEST
     * ------------------------------------------------------------
     */
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setSuccess("");

        const token = getAuthToken();

        if (!token) {
            navigate("/patient-login", {
                state: {
                    from: "/appointments",
                },
            });

            return;
        }

        if (!form.doctor_id) {
            setError("Please select a doctor.");
            return;
        }

        if (!form.preferred_date) {
            setError("Please select your preferred date.");
            return;
        }

        if (!form.preferred_time) {
            setError("Please select your preferred time.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await axios.post(
                `${API} /api/patient/consultation - request`,
                {
                    doctor_id: form.doctor_id,
                    specialization:
                        selectedDoctor?.specialization ||
                        form.specialization,
                    notes: form.notes || null,
                    scheduled_date: form.preferred_date,
                    schedule_time: form.preferred_time,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token} `,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(
                "Consultation request submitted:",
                response.data
            );

            setSuccess(
                "Your appointment request has been submitted successfully. The healthcare provider will review your request and confirm the consultation."
            );

            setForm({
                specialization: "all",
                doctor_id: "",
                preferred_date: "",
                preferred_time: "",
                notes: "",
            });
        } catch (err: any) {
            console.error(
                "Failed to submit appointment:",
                err
            );

            if (err?.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("access_token");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("authToken");
                localStorage.removeItem("patient_token");

                navigate("/patient-login", {
                    state: {
                        from: "/appointments",
                    },
                });

                return;
            }

            setError(
                err?.response?.data?.detail ||
                "We couldn't submit your appointment request. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    /*
     * ------------------------------------------------------------
     * TODAY — USED TO PREVENT PAST DATES
     * ------------------------------------------------------------
     */
    const today = new Date().toISOString().split("T")[0];

    /*
     * ------------------------------------------------------------
     * PAGE
     * ------------------------------------------------------------
     */
    return (
        <div className="min-h-screen bg-slate-50">
            {/* =====================================================
                HERO
            ===================================================== */}
            <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 text-white">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                            <CalendarDays size={18} />

                            Patient Services
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Book an appointment
                        </h1>

                        <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-50">
                            Find a qualified healthcare professional,
                            choose a convenient time and request your
                            consultation through HealthOpz.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-4">
                            <Link
                                to="/doctors"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-teal-800 shadow-lg transition hover:bg-teal-50"
                            >
                                Browse Doctors

                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                to="/patient-dashboard"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                            >
                                Patient Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                MAIN
            ===================================================== */}
            <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                {/* ERROR */}
                {error && (
                    <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
                        <AlertCircle
                            size={21}
                            className="mt-0.5 shrink-0"
                        />

                        <div>
                            <p className="font-semibold">
                                Unable to continue
                            </p>

                            <p className="mt-1 text-sm">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* SUCCESS */}
                {success && (
                    <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle2
                                size={24}
                                className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            <div>
                                <h2 className="font-bold text-emerald-900">
                                    Appointment request submitted
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-emerald-800">
                                    {success}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Link
                                        to="/patient-dashboard"
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        Go to Patient Dashboard

                                        <ArrowRight size={16} />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSuccess("")
                                        }
                                        className="rounded-xl border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                                    >
                                        Book Another
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    {/* =================================================
                        BOOKING FORM
                    ================================================= */}
                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="border-b border-gray-100 pb-6">
                            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                                Appointment Request
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                                Tell us how we can help
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Select a doctor and your preferred
                                consultation time.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-7"
                        >
                            {/* SPECIALIZATION */}
                            <div>
                                <label
                                    htmlFor="specialization"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Medical specialization
                                </label>

                                <div className="relative">
                                    <Stethoscope
                                        size={19}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <select
                                        id="specialization"
                                        value={
                                            form.specialization
                                        }
                                        onChange={(event) =>
                                            handleSpecializationChange(
                                                event.target.value
                                            )
                                        }
                                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                    >
                                        <option value="all">
                                            All Specializations
                                        </option>

                                        {specializations.map(
                                            (specialization) => (
                                                <option
                                                    key={
                                                        specialization
                                                    }
                                                    value={
                                                        specialization
                                                    }
                                                >
                                                    {specialization}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <ChevronDown
                                        size={18}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* DOCTOR */}
                            <div>
                                <label
                                    htmlFor="doctor"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Choose a doctor
                                </label>

                                {loadingDoctors ? (
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                                        Loading available doctors...
                                    </div>
                                ) : filteredDoctors.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-600">
                                        No doctors are currently
                                        available for this
                                        specialization.
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <UserRound
                                            size={19}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <select
                                            id="doctor"
                                            value={
                                                form.doctor_id
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    "doctor_id",
                                                    event.target.value
                                                )
                                            }
                                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                        >
                                            <option value="">
                                                Select a doctor
                                            </option>

                                            {filteredDoctors.map(
                                                (doctor) => (
                                                    <option
                                                        key={
                                                            doctor.id
                                                        }
                                                        value={
                                                            doctor.id
                                                        }
                                                    >
                                                        {doctor.name}
                                                        {" — "}
                                                        {doctor.specialization ||
                                                            "Medical Professional"}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        <ChevronDown
                                            size={18}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* SELECTED DOCTOR */}
                            {selectedDoctor && (
                                <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
                                    <div className="flex gap-4">
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-sm">
                                            {selectedDoctor.profile_image ? (
                                                <img
                                                    src={
                                                        selectedDoctor.profile_image
                                                    }
                                                    alt={
                                                        selectedDoctor.name
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <UserRound
                                                    size={28}
                                                    className="text-gray-400"
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-bold text-gray-900">
                                                    {
                                                        selectedDoctor.name
                                                    }
                                                </h3>

                                                {selectedDoctor.verified && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-teal-700">
                                                        <ShieldCheck
                                                            size={
                                                                13
                                                            }
                                                        />

                                                        Verified
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 text-sm font-medium text-teal-700">
                                                {selectedDoctor.specialization ||
                                                    "Medical Professional"}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                                                {selectedDoctor.experience_years !==
                                                    undefined && (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Clock3
                                                                size={
                                                                    15
                                                                }
                                                                className="text-teal-600"
                                                            />

                                                            {
                                                                selectedDoctor.experience_years
                                                            }{" "}
                                                            years
                                                            experience
                                                        </span>
                                                    )}

                                                {(selectedDoctor.city ||
                                                    selectedDoctor.state) && (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <MapPin
                                                                size={
                                                                    15
                                                                }
                                                                className="text-teal-600"
                                                            />

                                                            {
                                                                selectedDoctor.city
                                                            }

                                                            {selectedDoctor.city &&
                                                                selectedDoctor.state
                                                                ? ", "
                                                                : ""}

                                                            {
                                                                selectedDoctor.state
                                                            }
                                                        </span>
                                                    )}
                                            </div>

                                            <div className="mt-3 text-sm">
                                                <span className="text-gray-500">
                                                    Consultation fee
                                                </span>

                                                <span className="ml-2 font-bold text-gray-900">
                                                    {formatFee(
                                                        selectedDoctor.consultation_fee
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* DATE + TIME */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="preferred-date"
                                        className="mb-2 block text-sm font-semibold text-gray-900"
                                    >
                                        Preferred date
                                    </label>

                                    <div className="relative">
                                        <CalendarDays
                                            size={19}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            id="preferred-date"
                                            type="date"
                                            min={today}
                                            value={
                                                form.preferred_date
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    "preferred_date",
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="preferred-time"
                                        className="mb-2 block text-sm font-semibold text-gray-900"
                                    >
                                        Preferred time
                                    </label>

                                    <div className="relative">
                                        <Clock3
                                            size={19}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            id="preferred-time"
                                            type="time"
                                            value={
                                                form.preferred_time
                                            }
                                            onChange={(event) =>
                                                updateForm(
                                                    "preferred_time",
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* NOTES */}
                            <div>
                                <label
                                    htmlFor="notes"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Reason for consultation
                                    <span className="ml-1 font-normal text-gray-400">
                                        (optional)
                                    </span>
                                </label>

                                <textarea
                                    id="notes"
                                    value={form.notes}
                                    onChange={(event) =>
                                        updateForm(
                                            "notes",
                                            event.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Briefly describe what you would like to discuss with the doctor..."
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                />
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={
                                    submitting ||
                                    loadingDoctors
                                }
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitting ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                        Submitting request...
                                    </>
                                ) : (
                                    <>
                                        <CalendarDays
                                            size={19}
                                        />

                                        Request Appointment
                                    </>
                                )}
                            </button>
                        </form>
                    </section>

                    {/* =================================================
                        SIDEBAR
                    ================================================= */}
                    <aside className="space-y-6">
                        {/* SELECTED DOCTOR SUMMARY */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                                <Stethoscope
                                    size={24}
                                    className="text-teal-700"
                                />
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-gray-900">
                                Why book through HealthOpz?
                            </h2>

                            <div className="mt-6 space-y-5">
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50">
                                        <ShieldCheck
                                            size={18}
                                            className="text-teal-700"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Verified professionals
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Connect with healthcare
                                            professionals listed on
                                            the HealthOpz network.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50">
                                        <CalendarDays
                                            size={18}
                                            className="text-teal-700"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Convenient scheduling
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Choose a preferred date
                                            and time that works for
                                            you.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50">
                                        <UserRound
                                            size={18}
                                            className="text-teal-700"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Patient-focused care
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Keep your healthcare
                                            requests connected to
                                            your patient account.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HELP CARD */}
                        <div className="rounded-3xl bg-slate-900 p-6 text-white">
                            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">
                                Need help?
                            </p>

                            <h2 className="mt-3 text-xl font-bold">
                                Not sure which doctor to choose?
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                Browse the HealthOpz doctor directory
                                to compare specializations,
                                experience and consultation fees.
                            </p>

                            <Link
                                to="/doctors"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
                            >
                                Browse Doctors

                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}