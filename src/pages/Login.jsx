import { useContext, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.user);
      toast.success("Login Success ✅");
      navigate("/");
    } catch (error) {
      const err = error.response?.data;

      if (error.response?.status === 403 && err?.isVerified === false) {
        toast.warning("Verify your email first 📩");
        navigate("/verify-otp", { state: { email: err.email } });
      } else {
        toast.error(err?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-lg w-full font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-pink-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;