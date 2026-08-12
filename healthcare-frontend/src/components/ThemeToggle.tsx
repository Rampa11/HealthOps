import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (

        <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow transition hover:bg-gray-100"
        >

            {theme === "light" ? (

                <Moon
                    size={18}
                    className="text-gray-700"
                />

            ) : (

                <Sun
                    size={18}
                    className="text-yellow-500"
                />

            )}

        </button>

    );
}