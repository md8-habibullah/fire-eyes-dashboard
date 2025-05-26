import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";
import { useLocation } from "react-router-dom";
import FireIcon from "../components/FireIcon";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.06, boxShadow: "0px 8px 32px rgba(255, 94, 0, 0.15)" },
};

const Login = () => {
  const location = useLocation();
  const [deviceId, setDeviceId] = useState(location.state?.deviceId || "");
  const [alerts, setAlerts] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const isAdmin = localStorage.getItem("adminkey") === "FireEyes";

  useEffect(() => {
    document.title = "FireEyes - Login";
  }, []);

  useEffect(() => {
    if (!deviceId) {
      setUser(null);
      return;
    }
    axios.get(`${API_BASE}/api/users`).then((res) => {
      const found = res.data.find(
        (u) => u.deviceId.toLowerCase() === deviceId.toLowerCase()
      );
      setUser(found || null);
    });
  }, [deviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    setAlerts([]);
    try {
      const res = await axios.get(`${API_BASE}/api/alerts/user/${deviceId}`);
      setAlerts(res.data);
      if (res.data.length === 0)
        setMsg("No alert history found for this device.");
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  const simulateFireAlert = async () => {
    setMsg("");
    setLoading(true);
    try {
      const userRes = await axios.get(`${API_BASE}/api/users`);
      const user = userRes.data.find(
        (u) => u.deviceId.toLowerCase() === deviceId.toLowerCase()
      );
      if (!user) {
        setMsg("User not found for this Device ID.");
        setLoading(false);
        return;
      }
      await axios.post(`${API_BASE}/api/alerts`, {
        userId: user._id,
        type: "FIRE",
        location: { lat: 0, lng: 0 },
      });
      setMsg("🔥 Fire alert simulated!");
      const res = await axios.get(`${API_BASE}/api/alerts/user/${deviceId}`);
      setAlerts(res.data);
    } catch {
      setMsg("Failed to simulate alert.");
    }
    setLoading(false);
  };

  const simulateGasAlert = async () => {
    setMsg("");
    setLoading(true);
    try {
      const userRes = await axios.get(`${API_BASE}/api/users`);
      const user = userRes.data.find(
        (u) => u.deviceId.toLowerCase() === deviceId.toLowerCase()
      );
      if (!user) {
        setMsg("User not found for this Device ID.");
        setLoading(false);
        return;
      }
      await axios.post(`${API_BASE}/api/alerts`, {
        userId: user._id,
        type: "GAS_LEAK",
        location: { lat: 0, lng: 0 },
      });
      setMsg("🛢️ Gas leak alert simulated!");
      const res = await axios.get(`${API_BASE}/api/alerts/user/${deviceId}`);
      setAlerts(res.data);
    } catch {
      setMsg("Failed to simulate gas alert.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-yellow-100 to-orange-200 p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12 border-t-8 border-red-500"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
            {/* Glowing background */}
            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 blur-2xl opacity-70"></div> */}
            {/* Gradient border */}
            {/* <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 animate-pulse"></div> */}
            {/* Animated Fire Icon */}
            <FireIcon size={150} className="relative rounded-full" />
          </div>
          <h1 className="text-5xl font-extrabold text-red-600 tracking-wide mb-2 drop-shadow text-center">
            Fire Eyes
          </h1>
          <p className="text-lg text-gray-500 font-medium mb-2 text-center">
            Fire Notifier App
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Login to your device
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-8">
            <label className="label text-gray-700 font-medium mb-2 text-lg">
              Device ID
            </label>
            <input
              type="text"
              placeholder="Enter your device ID"
              className="input input-bordered w-full bg-gray-50 text-gray-900 focus:bg-white focus:border-red-500 transition text-2xl py-4"
              value={deviceId}
              onChange={(e) => {
                const val = e.target.value;
                setDeviceId(val);
                if (val.trim().toLowerCase() === "md8-in") {
                  localStorage.setItem("adminkey", "FireEyes");
                } else if (val.trim().toLowerCase() === "md8-out") {
                  localStorage.removeItem("adminkey");
                }
              }}
              required
            />
          </div>
          <motion.button
            className="btn btn-primary w-full bg-gradient-to-r from-red-500 to-orange-400 border-none text-white font-bold text-2xl py-4 rounded-xl shadow hover:from-red-600 hover:to-orange-500 transition"
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
        {isAdmin && (
          <motion.button
            type="button"
            className="btn btn-warning w-full mt-4 text-xl"
            onClick={simulateFireAlert}
            disabled={loading || !deviceId}
          >
            Simulate Fire Alert
          </motion.button>
        )}
        {isAdmin && (
          <motion.button
            type="button"
            className="btn btn-info w-full mt-4 text-xl"
            onClick={simulateGasAlert}
            disabled={loading || !deviceId}
          >
            Simulate Gas Alert
          </motion.button>
        )}
        {msg && (
          <div className="mt-6 text-center text-red-600 font-semibold text-xl">
            {msg}
          </div>
        )}
        {alerts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-orange-700 mb-4 text-center">
              Your Alert History
            </h3>
            <div className="overflow-x-auto">
              <table className="table w-full rounded-xl overflow-hidden shadow border border-orange-200 text-xl">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-200 via-yellow-100 to-red-100 text-orange-900 text-xl">
                    <th className="py-3 px-3 text-left font-bold">Type</th>
                    <th className="py-3 px-3 text-left font-bold">Status</th>
                    <th className="py-3 px-3 text-left font-bold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert, idx) => (
                    <tr
                      key={alert._id}
                      className={
                        idx % 2 === 0 ? "bg-white/90" : "bg-orange-50/80"
                      }
                    >
                      <td className="py-3 px-3 text-gray-800 font-semibold">
                        {alert.type}
                      </td>
                      <td className="py-3 px-3 text-gray-700">
                        {alert.status}
                      </td>
                      <td className="py-3 px-3 text-gray-700">
                        {new Date(alert.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {user && (
          <div className="bg-white rounded-xl p-6 shadow mt-8 border border-orange-200">
            <h3 className="text-2xl font-bold mb-4 text-orange-700">User Details</h3>
            <div className="space-y-2 text-lg">
              <div><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{user.name}</span></div>
              <div><span className="font-semibold text-gray-700">Phone:</span> <span className="text-gray-900">{user.phone}</span></div>
              <div><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-900">{user.email}</span></div>
              <div><span className="font-semibold text-gray-700">Address:</span> <span className="text-gray-900">{user.address}</span></div>
              <div><span className="font-semibold text-gray-700">Device ID:</span> <span className="text-gray-900">{user.deviceId}</span></div>
            </div>
            <div className="flex gap-3 mt-6">
              {isAdmin && (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      const name = prompt("Edit Name", user.name);
                      if (name !== null) {
                        axios.put(`${API_BASE}/api/users/${user._id}`, { ...user, name })
                          .then(() => window.location.reload());
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      if (window.confirm("Delete this user?")) {
                        axios.delete(`${API_BASE}/api/users/${user._id}`)
                          .then(() => window.location.reload());
                      }
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
