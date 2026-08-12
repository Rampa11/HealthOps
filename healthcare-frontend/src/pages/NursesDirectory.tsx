import { Search, MapPin, BriefcaseMedical, Star } from "lucide-react";
import { useState } from "react";
import BecomeNurseButton from "../components/BecomeNurseButton";

const nurses = [
    {
        id: 1,
        name: "Nurse Emily Roberts",
        specialty: "ICU Nurse",
        hospital: "CarePlus Texas",
        location: "Houston, Texas",
        rating: 4.9,
        image: "https://placehold.co/400x400"
    },
    {
        id: 2,
        name: "Nurse Sophia Williams",
        specialty: "Pediatric Nurse",
        hospital: "LifeCare Medical",
        location: "Dallas, Texas",
        rating: 4.8,
        image: "https://placehold.co/400x400"
    },
    {
        id: 3,
        name: "Nurse Michael Johnson",
        specialty: "Home Care Nurse",
        hospital: "Independent",
        location: "Atlanta, Georgia",
        rating: 5.0,
        image: "https://placehold.co/400x400"
    },
    {
        id: 4,
        name: "Nurse Grace Brown",
        specialty: "Emergency Nurse",
        hospital: "Prime Hospital",
        location: "Chicago, Illinois",
        rating: 4.7,
        image: "https://placehold.co/400x400"
    }
];

export default function NursesDirectory() {

    const [search, setSearch] = useState("");

    const filteredNurses = nurses.filter((nurse) => {

        const keyword = search.toLowerCase();

        return (
            nurse.name.toLowerCase().includes(keyword) ||
            nurse.specialty.toLowerCase().includes(keyword) ||
            nurse.hospital.toLowerCase().includes(keyword) ||
            nurse.location.toLowerCase().includes(keyword)
        );

    });

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section className="bg-gradient-to-r from-teal-700 to-cyan-700 py-20 text-white">

                <div className="mx-auto max-w-7xl px-6">

                    <h1 className="text-5xl font-extrabold">
                        Find Nurses
                    </h1>

                    <p className="mt-5 max-w-3xl text-xl text-teal-100">
                        Hire freelance nurses or discover hospital nurses across HealthOpz.
                    </p>

                    <div className="mt-8">
                        <BecomeNurseButton variant="large">
                            Become a Nurse
                        </BecomeNurseButton>
                    </div>

                    <div className="mt-10">

                        <div className="flex items-center rounded-2xl bg-white shadow-lg">

                            <Search
                                className="ml-5 text-gray-400"
                                size={22}
                            />

                            <input
                                type="text"
                                placeholder="Search nurse, specialty or location..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-2xl px-5 py-5 text-lg text-gray-700 outline-none"
                            />

                        </div>

                    </div>

                </div>

            </section>

            {/* Nurses */}

            <section className="mx-auto max-w-7xl px-6 py-16">

                <div className="mb-10 flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold">
                            Available Nurses
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Browse qualified nurses for hospitals and home healthcare.
                        </p>

                    </div>

                    <span className="rounded-full bg-teal-100 px-5 py-2 font-semibold text-teal-700">
                        {filteredNurses.length} Nurses
                    </span>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {filteredNurses.map((nurse) => (

                        <div
                            key={nurse.id}
                            className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
                        >

                            <img
                                src={nurse.image}
                                alt={nurse.name}
                                className="h-72 w-full object-cover"
                            />

                            <div className="p-6">

                                <h3 className="text-2xl font-bold">
                                    {nurse.name}
                                </h3>

                                <div className="mt-3 flex items-center gap-2 text-teal-700">

                                    <BriefcaseMedical size={18} />

                                    {nurse.specialty}

                                </div>

                                <div className="mt-3 flex items-center gap-2 text-gray-600">

                                    <MapPin size={18} />

                                    {nurse.location}

                                </div>

                                <div className="mt-3 text-gray-600">
                                    {nurse.hospital}
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-yellow-500">

                                    <Star
                                        size={18}
                                        fill="currentColor"
                                    />

                                    {nurse.rating}

                                </div>

                                <button className="mt-8 w-full rounded-xl bg-teal-700 py-3 font-semibold text-white hover:bg-teal-800">
                                    Hire Nurse
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </div>

    );
}