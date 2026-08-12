import { Search, MapPin, Leaf, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import BecomeTraditionalMedicineButton from "../components/BecomeTraditionalMedicineButton";

const practitioners = [
    {
        id: 1,
        name: "Mama Adesuwa Herbal Clinic",
        specialty: "Herbal Medicine",
        location: "Benin City, Nigeria",
        rating: 4.9,
        verified: true,
        image: "https://placehold.co/400x400"
    },
    {
        id: 2,
        name: "Dr. Kofi Natural Healing",
        specialty: "Natural Therapy",
        location: "Accra, Ghana",
        rating: 4.8,
        verified: true,
        image: "https://placehold.co/400x400"
    },
    {
        id: 3,
        name: "Ubuntu Wellness Centre",
        specialty: "Traditional Healing",
        location: "Johannesburg, South Africa",
        rating: 4.7,
        verified: true,
        image: "https://placehold.co/400x400"
    },
    {
        id: 4,
        name: "Chief Okeke Bone Clinic",
        specialty: "Bone Setting",
        location: "Onitsha, Nigeria",
        rating: 5.0,
        verified: true,
        image: "https://placehold.co/400x400"
    }
];

export default function TraditionalMedicine() {

    const [search, setSearch] = useState("");

    const filtered = practitioners.filter((item) => {

        const keyword = search.toLowerCase();

        return (
            item.name.toLowerCase().includes(keyword) ||
            item.specialty.toLowerCase().includes(keyword) ||
            item.location.toLowerCase().includes(keyword)
        );

    });

    return (

        <div className="min-h-screen bg-green-50">

            {/* HERO */}

            <section className="bg-gradient-to-r from-green-700 to-emerald-700 py-20 text-white">

                <div className="mx-auto max-w-7xl px-6">

                    <h1 className="text-5xl font-extrabold">

                        Traditional Medicine

                    </h1>

                    <p className="mt-5 max-w-3xl text-xl text-green-100">

                        Discover verified herbal practitioners, bone setters,
                        naturopaths and traditional healers across Africa.

                    </p>

                    <div className="mt-8">
                        <BecomeTraditionalMedicineButton variant="large">
                            Become a Traditional Medicine Practitioner
                        </BecomeTraditionalMedicineButton>
                    </div>

                    <div className="mt-10">

                        <div className="flex items-center rounded-2xl bg-white shadow-lg">

                            <Search
                                className="ml-5 text-gray-400"
                                size={22}
                            />

                            <input
                                type="text"
                                placeholder="Search practitioner or specialty..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-2xl px-5 py-5 text-lg text-gray-700 outline-none"
                            />

                        </div>

                    </div>

                </div>

            </section>

            {/* DIRECTORY */}

            <section className="mx-auto max-w-7xl px-6 py-16">

                <div className="mb-10 flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold">

                            Verified Practitioners

                        </h2>

                        <p className="mt-2 text-gray-600">

                            Trusted traditional healthcare providers on HealthOpz.

                        </p>

                    </div>

                    <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                        {filtered.length} Practitioners

                    </span>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {filtered.map((person) => (

                        <div
                            key={person.id}
                            className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
                        >

                            <img
                                src={person.image}
                                alt={person.name}
                                className="h-72 w-full object-cover"
                            />

                            <div className="p-6">

                                <h3 className="text-2xl font-bold">

                                    {person.name}

                                </h3>

                                <div className="mt-3 flex items-center gap-2 text-green-700">

                                    <Leaf size={18} />

                                    {person.specialty}

                                </div>

                                <div className="mt-3 flex items-center gap-2 text-gray-600">

                                    <MapPin size={18} />

                                    {person.location}

                                </div>

                                <div className="mt-4 flex items-center gap-2">

                                    <Star
                                        size={18}
                                        fill="currentColor"
                                        className="text-yellow-500"
                                    />

                                    {person.rating}

                                </div>

                                {person.verified && (

                                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                        <ShieldCheck size={16} />

                                        Verified Practitioner

                                    </div>

                                )}

                                <button className="mt-8 w-full rounded-xl bg-green-700 py-3 font-semibold text-white hover:bg-green-800">

                                    View Profile

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </div>

    );

}