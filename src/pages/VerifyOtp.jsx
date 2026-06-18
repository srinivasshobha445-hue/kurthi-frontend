import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const RESEND_COOLDOWN = 30;

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = useMemo(
    () => (location.state?.email || "").trim().toLowerCase(),
    [location.state?.email]
  );

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const validate = () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (!cleanEmail) return "Email is required";
    if (!cleanEmail.includes("@")) return "Enter a valid email";
    if (!/^\d{6}$/.test(cleanOtp)) return "Enter a valid 6-digit OTP";

    return null;
  };

  const handleVerify = async () => {
    try {
      const error = validate();
      if (error) {
        toast.error(error);
        return;
      }

      setLoading(true);

      await API.post("/auth/verify-otp", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      toast.success("Email verified successfully ✅");

      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail) {
        toast.error("Email is required");
        return;
      }

      if (!cleanEmail.includes("@")) {
        toast.error("Enter a valid email");
        return;
      }

      setResending(true);

      await API.post("/auth/resend-otp", { email: cleanEmail });

      toast.success("OTP resent successfully 📩");
      setCooldown(RESEND_COOLDOWN);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-3 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="border p-3 rounded-lg w-full mt-1 tracking-[0.35em] text-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={otp}
              onChange={handleOtpChange}
              autoComplete="one-time-code"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            className={`w-full py-3 rounded-lg font-semibold transition border ${
              resending || cooldown > 0
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-pink-600 text-pink-600 hover:bg-pink-50"
            }`}
          >
            {resending
              ? "Resending..."
              : cooldown > 0
              ? `Resend OTP in ${cooldown}s`
              : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;