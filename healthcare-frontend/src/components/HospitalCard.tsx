import { Link } from "react-router-dom";
import type { Tenant } from "../types/tenant";

type Props = {
    hospital: Tenant;
};

export default function HospitalCard({ hospital }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Hospital Banner */}
            <div
                className="h-40 w-full"
                style={{
                    backgroundColor: hospital.primary_color || "#0F766E",
                }}
            >
                {hospital.logo ? (
                    <img
                        src={hospital.logo}
                        alt={hospital.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-5xl font-bold text-white">
                        🏥
                    </div>
                )}
            </div>

            {/* Hospital Details */}
            <div className="p-5">

                <h2 className="text-xl font-bold text-gray-900">
                    {hospital.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {hospital.hospital_type || "Healthcare Facility"}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    📍
                    <span>
                        {hospital.city}
                        {hospital.city && hospital.state ? ", " : ""}
                        {hospital.state}
                    </span>
                </div>

                {hospital.about && (
                    <p className="mt-4 line-clamp-3 text-sm text-gray-600">
                        {hospital.about}
                    </p>
                )}

                <Link
                    to={`/hospital/${hospital.slug}`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white hover:bg-teal-800"
                >
                    Visit Hospital
                </Link>

            </div>

        </div>
    );
}