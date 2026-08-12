import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, ArrowLeft, ArrowRight } from "lucide-react";

export default function HospitalOnboardingBranding() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        website: "",
        about: "",
        primary_color: "#0F766E",
        secondary_color: "#14B8A6",
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [heroPreview, setHeroPreview] = useState<string | null>(null);

    function updateField(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleImage(
        e: React.ChangeEvent<HTMLInputElement>,
        type: "logo" | "hero"
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);

        if (type === "logo") {
            setLogoPreview(preview);
        } else {
            setHeroPreview(preview);
        }
    }

    function nextStep(e: React.FormEvent) {
        e.preventDefault();

        const previousData = sessionStorage.getItem(
            "hospital_onboarding"
        );

        const hospitalData = previousData
            ? JSON.parse(previousData)
            : {};

        sessionStorage.setItem(
            "hospital_onboarding",
            JSON.stringify({
                ...hospitalData,
                branding: {
                    website: form.website,
                    about: form.about,
                    primary_color: form.primary_color,
                    secondary_color: form.secondary_color,
                },
            })
        );

        navigate("/hospital-onboarding/subscription");
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-4xl">

                <div className="rounded-3xl bg-white p-10 shadow-xl">

                    {/* HEADER */}

                    <div className="mb-10 text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                            <Palette
                                size={40}
                                className="text-teal-700"
                            />
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-700">
                            Hospital Onboarding
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-gray-900">
                            Customize Your Hospital
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Step 3 of 6
                        </p>

                    </div>

                    <form
                        onSubmit={nextStep}
                        className="space-y-8"
                    >

                        {/* LOGO + HERO */}

                        <div className="grid gap-8 md:grid-cols-2">

                            {/* LOGO */}

                            <div>

                                <label className="mb-3 block font-semibold text-gray-800">
                                    Hospital Logo
                                </label>

                                <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-teal-500 hover:bg-teal-50">

                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Hospital logo preview"
                                            className="h-32 w-32 rounded-xl object-contain"
                                        />
                                    ) : (
                                        <>
                                            <div className="text-4xl">
                                                🏥
                                            </div>

                                            <p className="mt-3 font-semibold text-gray-700">
                                                Upload Logo
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                PNG, JPG or WEBP
                                            </p>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={(e) =>
                                            handleImage(e, "logo")
                                        }
                                        className="hidden"
                                    />

                                </label>

                            </div>

                            {/* HERO */}

                            <div>

                                <label className="mb-3 block font-semibold text-gray-800">
                                    Hospital Hero Image
                                </label>

                                <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-teal-500 hover:bg-teal-50">

                                    {heroPreview ? (
                                        <img
                                            src={heroPreview}
                                            alt="Hospital hero preview"
                                            className="h-40 w-full rounded-xl object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div className="text-4xl">
                                                🏥
                                            </div>

                                            <p className="mt-3 font-semibold text-gray-700">
                                                Upload Hero Image
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Recommended: 1600 × 600
                                            </p>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={(e) =>
                                            handleImage(e, "hero")
                                        }
                                        className="hidden"
                                    />

                                </label>

                            </div>

                        </div>

                        {/* WEBSITE */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-800">
                                Hospital Website
                            </label>

                            <input
                                type="url"
                                name="website"
                                value={form.website}
                                onChange={updateField}
                                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="https://www.yourhospital.com"
                            />

                        </div>

                        {/* ABOUT */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-800">
                                About Your Hospital
                            </label>

                            <textarea
                                name="about"
                                value={form.about}
                                onChange={updateField}
                                rows={6}
                                className="w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                placeholder="Tell patients about your hospital, services, mission and specialties..."
                            />

                        </div>

                        {/* COLORS */}

                        <div>

                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Brand Colors
                            </h2>

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>

                                    <label className="mb-2 block font-semibold text-gray-800">
                                        Primary Color
                                    </label>

                                    <div className="flex gap-3">

                                        <input
                                            type="color"
                                            name="primary_color"
                                            value={form.primary_color}
                                            onChange={updateField}
                                            className="h-14 w-20 cursor-pointer rounded-lg border"
                                        />

                                        <input
                                            type="text"
                                            name="primary_color"
                                            value={form.primary_color}
                                            onChange={updateField}
                                            className="flex-1 rounded-xl border border-gray-300 p-4 text-gray-900"
                                        />

                                    </div>

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold text-gray-800">
                                        Secondary Color
                                    </label>

                                    <div className="flex gap-3">

                                        <input
                                            type="color"
                                            name="secondary_color"
                                            value={form.secondary_color}
                                            onChange={updateField}
                                            className="h-14 w-20 cursor-pointer rounded-lg border"
                                        />

                                        <input
                                            type="text"
                                            name="secondary_color"
                                            value={form.secondary_color}
                                            onChange={updateField}
                                            className="flex-1 rounded-xl border border-gray-300 p-4 text-gray-900"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* PREVIEW */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200">

                            <div
                                className="p-8 text-white"
                                style={{
                                    backgroundColor:
                                        form.primary_color,
                                }}
                            >

                                <p className="text-sm font-medium opacity-80">
                                    Hospital Website Preview
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    Your Hospital
                                </h2>

                                <p className="mt-2 max-w-xl opacity-90">
                                    Your customized HealthOpz hospital
                                    platform will use your selected
                                    branding.
                                </p>

                            </div>

                            <div
                                className="h-3"
                                style={{
                                    backgroundColor:
                                        form.secondary_color,
                                }}
                            />

                        </div>

                        {/* NAVIGATION */}

                        <div className="flex flex-col gap-4 pt-6 sm:flex-row">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/hospital-onboarding/admin"
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                <ArrowLeft size={20} />

                                Back

                            </button>

                            <button
                                type="submit"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-4 font-semibold text-white transition hover:bg-teal-800"
                            >
                                Continue

                                <ArrowRight size={20} />

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}