import { ArrowRight, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
    variant?: "default" | "large";
    children?: React.ReactNode;
};

export default function BecomeTraditionalMedicineButton({
    variant = "default",
    children = "Become a Traditional Medicine Practitioner",
}: Props) {
    const navigate = useNavigate();

    const isLarge = variant === "large";

    return (
        <button
            type="button"
            onClick={() => navigate("/traditional-medicine-onboarding")}
            className={`inline-flex items-center justify-center gap-3 rounded-xl bg-teal-700 font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-500/20 ${isLarge
                ? "px-7 py-4 text-base"
                : "px-5 py-3 text-sm"
                }`}
        >
            <Leaf size={isLarge ? 20 : 18} />

            {children}

            <ArrowRight size={isLarge ? 19 : 17} />
        </button>
    );
}