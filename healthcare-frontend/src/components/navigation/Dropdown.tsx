import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Item {
    label: string;
    to: string;
}

interface Props {
    title: string;
    items: Item[];
}

export default function Dropdown({
    title,
    items,
}: Props) {

    const [open, setOpen] = useState(false);

    return (

        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >

            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-teal-700">

                {title}

                <ChevronDown size={18} />

            </button>

            {open && (

                <div className="absolute left-0 mt-3 w-64 rounded-2xl bg-white shadow-xl border z-50">

                    {items.map((item) => (

                        <Link
                            key={item.to}
                            to={item.to}
                            className="block px-5 py-4 hover:bg-gray-50"
                        >
                            {item.label}
                        </Link>

                    ))}

                </div>

            )}

        </div>

    );

}