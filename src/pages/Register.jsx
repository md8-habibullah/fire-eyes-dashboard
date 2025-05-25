/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } },
};

const inputVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.4 },
  }),
};

const Register = () => {
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
      await axios.post("http://localhost:5000/api/users/register", form);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-yellow-50 to-orange-100 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, -40, 40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        style={{ zIndex: 0 }}
      />

      <motion.div
        className="relative z-10 max-w-md w-full mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-orange-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center mb-7"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 rounded-full p-2 shadow-lg mr-3"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 7 7.5 7 11.5C7 15.09 9.91 18 13.5 18C16.09 18 18 16.09 18 13.5C18 10.5 12 2 12 2Z" fill="#F87171"/>
              <circle cx="12" cy="13" r="3" fill="#FBBF24"/>
            </svg>
          </motion.div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 tracking-tight drop-shadow">
            Fire Eyes Registration
          </h2>
        </motion.div>
        <motion.p
          className="mb-7 text-gray-700 text-center font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Register your device to receive instant fire notifications and alerts.
        </motion.p>
        <motion.form
          className="space-y-6"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          {fields.map((field, i) => (
            <motion.div key={field.label} custom={i} variants={inputVariants}>
              <label className="block text-sm font-semibold text-orange-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-gray-900 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition text-base shadow-sm"
                required
                autoComplete="off"
              />
            </motion.div>
          ))}
          <motion.button
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 border-0 text-white font-bold text-lg shadow-xl hover:from-red-600 hover:to-yellow-500 transition-all duration-200"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(251,191,36,0.18)" }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm mr-2"></span>
            ) : null}
            {loading ? "Registering..." : "Register Device"}
          </motion.button>
          {msg && (
            <motion.div
              className={`mt-4 text-center font-semibold px-4 py-2 rounded-xl shadow-sm ${
                msg.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
