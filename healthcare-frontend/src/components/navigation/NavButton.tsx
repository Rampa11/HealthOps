import { Link } from "react-router-dom";

interface Props {
    to: string;
    children: React.ReactNode;
    filled?: boolean;
}

export default function NavButton({
    to,
    children,
    filled,
}: Props) {

    return (

        <Link
            to={to}
            className={
                filled
                    ? "rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
                    : "font-semibold text-gray-700 hover:text-teal-700"
            }
        >

            {children}

        </Link>

    );

}