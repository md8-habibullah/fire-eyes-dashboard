/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../api";

const Register = () => {
  useEffect(() => {
    document.title = "FireEyes - Register";
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    deviceId: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await axios.post(`${API_BASE}/api/users/register`, form);
      setMsg("🎉 Registration successful!");
      setForm({ name: "", phone: "", email: "", address: "", deviceId: "" });
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
    }
    setLoading(false);
  };

  const fields = [
    { label: "Name", name: "name", type: "text", placeholder: "Your name" },
    { label: "Phone", name: "phone", type: "text", placeholder: "+8801XXXXXXXXX" },
    { label: "Email", name: "email", type: "email", placeholder: "example@gmail.com" },
    { label: "Address", name: "address", type: "text", placeholder: "Full address" },
    { label: "Device ID", name: "deviceId", type: "text", placeholder: "Unique device ID" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-yellow-50 to-orange-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 border border-orange-200">
        <div className="flex items-center mb-10">
          <div className="bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 rounded-full p-3 shadow-lg mr-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 7 7.5 7 11.5C7 15.09 9.91 18 13.5 18C16.09 18 18 16.09 18 13.5C18 10.5 12 2 12 2Z" fill="#F87171"/>
              <circle cx="12" cy="13" r="3" fill="#FBBF24"/>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-red-600 tracking-wide mb-10 text-center drop-shadow">
            Fire Eyes Registration
          </h2>
        </div>
        <p className="mb-10 text-gray-700 text-center font-medium text-2xl">
          Register your device to receive instant fire notifications and alerts.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.label}>
              <label className="block text-xl font-semibold text-orange-700 mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-gray-900 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition text-2xl shadow-sm py-4"
                required
                autoComplete="off"
              />
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 border-0 text-white font-bold text-2xl shadow-xl hover:from-red-600 hover:to-yellow-500 transition-all duration-200 py-4 rounded-xl"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Device"}
          </button>
          {msg && (
            <div
              className={`mt-6 text-center font-semibold px-4 py-3 rounded-xl shadow-sm text-2xl ${
                msg.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
