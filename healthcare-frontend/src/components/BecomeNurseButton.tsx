import { ArrowRight, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BecomeNurseButtonProps {
    variant?: "primary" | "outline" | "large";
    children?: React.ReactNode;
}

export default function BecomeNurseButton({
    variant = "primary",
    children = "Become a Nurse",
}: BecomeNurseButtonProps) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/nurse-onboarding");
    }

    const base =
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus:ring-4 focus:ring-teal-500/20";

    const styles = {
        primary:
            "bg-teal-700 px-5 py-3 text-white hover:bg-teal-800",
        outline:
            "border border-teal-600 bg-white px-5 py-3 text-teal-700 hover:bg-teal-50",
        large:
            "bg-teal-700 px-7 py-4 text-base font-bold text-white shadow-lg hover:bg-teal-800 hover:shadow-xl",
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`${base} ${styles[variant]}`}
        >
            <HeartPulse size={18} />

            {children}

            <ArrowRight size={18} />
        </button>
    );
}