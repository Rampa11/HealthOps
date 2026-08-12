import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import api from "./api";

interface LoginProps {
  setToken: (token: string) => void;
}

export default function Login({ setToken }: LoginProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {

    setLoading(true);
    setError("");

    try {

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setToken(token);

    } catch (err: any) {

      console.log(err);

      setError(
        err.response?.data?.detail ??
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-700">
            HealthOpz
          </h1>

          <p className="text-gray-500 mt-2">
            Hospital Staff Login
          </p>

        </div>

        {error && (

          <div className="mb-4 rounded-lg bg-red-100 border border-red-300 p-3 text-red-700">

            {error}

          </div>

        )}

        <div className="space-y-5">

          <div>

            <label className="font-medium">
              Email
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-2">

              <Mail
                size={18}
                className="text-gray-400"
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

            <label className="font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-2">

              <Lock
                size={18}
                className="text-gray-400"
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </div>

      </div>

    </div>

  );

}