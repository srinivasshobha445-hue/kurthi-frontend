import { useContext, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: cleanEmail,
        password,
      });

      login(res.data.user);
      toast.success("Login success ✅");
      navigate("/", { replace: true });
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
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="border p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full pr-20 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-pink-600 px-2 py-1"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;