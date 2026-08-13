import { useState } from "react";
import axios from "axios";
import { Lock, Mail } from "lucide-react";

interface LoginProps {
    setToken: (token: string) => void;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    user: {
        id: string;
        full_name: string;
        email: string;
        role: string;
        tenant_id: string;
    };
}

export default function Login({ setToken }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await axios.post<LoginResponse>(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setToken(response.data.access_token);
        } catch (err: any) {
            setError(
                err?.response?.data?.detail ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-blue-700">
                        HealthOpz
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Hospital Staff Login
                    </p>

                </div>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-3 mb-5">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <div className="flex items-center border rounded-lg px-3">

                            <Mail
                                className="text-gray-400"
                                size={18}
                            />

                            <input
                                type="email"
                                className="w-full p-3 outline-none"
                                placeholder="Enter email"

                                value={email}

                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <div className="flex items-center border rounded-lg px-3">

                            <Lock
                                className="text-gray-400"
                                size={18}
                            />

                            <input
                                type="password"
                                className="w-full p-3 outline-none"
                                placeholder="Enter password"

                                value={password}

                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}