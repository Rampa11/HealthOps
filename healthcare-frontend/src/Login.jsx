import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email,
          password,
        }
      );

      const token = res.data.access_token;

      localStorage.setItem("token", token);
      setToken(token);

      alert("Login successful 🚀");
    } catch (err) {
      console.log(err.response?.data);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default Login;