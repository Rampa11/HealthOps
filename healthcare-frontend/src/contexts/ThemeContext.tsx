import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export function ThemeProvider({ children }: Props) {

    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme");

        if (saved === "dark" || saved === "light") {
            return saved;
        }

        return "light";
    });

    useEffect(() => {

        document.documentElement.classList.remove("light", "dark");

        document.documentElement.classList.add(theme);

        localStorage.setItem("theme", theme);

    }, [theme]);

    function toggleTheme() {
        setThemeState((prev) =>
            prev === "light" ? "dark" : "light"
        );
    }

    function setTheme(theme: Theme) {
        setThemeState(theme);
    }

    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>

    );
}

export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );
    }

    return context;
}