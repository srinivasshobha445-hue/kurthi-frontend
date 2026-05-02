import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios"; // ✅ your axios instance

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.includes("@")) return "Valid email required";
    if (form.message.length < 10)
      return "Message must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      // 🔥 BACKEND API CALL (you can create this later)
      await API.post("/contact", form);

      toast.success("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fffaf7] min-h-screen text-gray-800">

      {/* HEADER */}
      <div className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          We'd love to hear from you. Reach out for queries, support, or feedback.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-16 grid md:grid-cols-2 gap-10">

        {/* LEFT - INFO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">

          <h2 className="text-xl font-semibold text-pink-700">
            Store Information
          </h2>

          <div>
            <p className="font-medium">📍 Address</p>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              GMR Towers, Hongasandra <br />
              Begur Main Road, Bangalore
            </p>
          </div>

          <div>
            <p className="font-medium">📞 Phone</p>
            <p className="text-gray-600 text-sm mt-1">
              +91 98765 43210
            </p>
          </div>

          <div>
            <p className="font-medium">📧 Email</p>
            <p className="text-gray-600 text-sm mt-1">
              support@kurthistore.com
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Bangalore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
          >
            View on Map
          </a>
        </div>

        {/* RIGHT - FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-xl font-semibold text-pink-700 mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Write your message..."
              />
            </div>

            {/* 🔥 BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-90"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>

      <div className="text-center pb-10 text-sm text-gray-500">
        We typically respond within 24 hours.
      </div>
    </div>
  );
};

export default Contact;