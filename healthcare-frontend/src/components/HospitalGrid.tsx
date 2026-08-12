import HospitalCard from "./HospitalCard";
import type { Tenant } from "../types/tenant";

type Props = {
    hospitals: Tenant[];
};

export default function HospitalGrid({ hospitals }: Props) {
    if (!hospitals || hospitals.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <div className="text-5xl">🏥</div>

                <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                    No Hospitals Found
                </h2>

                <p className="mt-2 text-gray-500">
                    There are currently no active hospitals available.
                </p>
            </div>
        );
    }

    return (
        <div
            className="
        grid
        gap-6
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
        >
            {hospitals.map((hospital) => (
                <HospitalCard
                    key={hospital.slug}
                    hospital={hospital}
                />
            ))}
        </div>
    );
}