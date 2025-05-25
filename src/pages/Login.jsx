import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3, duration: 0.6, type: "spring" },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, boxShadow: "0px 4px 24px rgba(255, 94, 0, 0.15)" },
};

const Login = () => {
  const [deviceId, setDeviceId] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    setAlerts([]);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/alerts/user/${deviceId}`
      );
      setAlerts(res.data);
      if (res.data.length === 0)
        setMsg("No alert history found for this device.");
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-yellow-100 to-orange-200">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-red-500"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.img
            src="/fire-eyes-logo.png"
            alt="Fire Eyes Logo"
            className="w-16 h-16 mb-2"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          />
          <h1 className="text-3xl font-extrabold text-red-600 tracking-wide mb-1">
            Fire Eyes
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Fire Notifier App
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Login to your device
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-5">
            <label className="label text-gray-700 font-medium mb-1">
              Device ID
            </label>
            <input
              type="text"
              placeholder="Enter your device ID"
              className="input input-bordered w-full bg-gray-50 text-gray-900 focus:bg-white focus:border-red-500 transition"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              required
            />
          </div>
          <motion.button
            className="btn btn-primary w-full bg-gradient-to-r from-red-500 to-orange-400 border-none text-white font-bold text-lg py-2 rounded-lg shadow hover:from-red-600 hover:to-orange-500 transition"
            type="submit"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login & Show History"}
          </motion.button>
        </form>
        {msg && (
          <div className="mt-4 text-center text-red-600 font-semibold">{msg}</div>
        )}
        {alerts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-orange-700 mb-3 text-center">
              Your Alert History
            </h3>
            <div className="overflow-x-auto">
              <table className="table w-full rounded-xl overflow-hidden shadow border border-orange-200">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-200 via-yellow-100 to-red-100 text-orange-900">
                    <th className="py-2 px-2 text-left font-bold">Type</th>
                    <th className="py-2 px-2 text-left font-bold">Status</th>
                    <th className="py-2 px-2 text-left font-bold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert, idx) => (
                    <tr
                      key={alert._id}
                      className={idx % 2 === 0 ? "bg-white/90" : "bg-orange-50/80"}
                    >
                      <td className="py-2 px-2 text-gray-800 font-semibold">
                        {alert.type}
                      </td>
                      <td className="py-2 px-2 text-gray-700">
                        {alert.status}
                      </td>
                      <td className="py-2 px-2 text-gray-700">
                        {new Date(alert.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
