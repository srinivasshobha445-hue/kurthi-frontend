import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("OTP sent to your email ✅");
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-bold">Register</h2>

      <input
        type="text"
        placeholder="Name"
        className="border p-2"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white py-2"
      >
        Register
      </button>
    </div>
  );
};

export default Register;