import { useEffect, useState, useRef } from "react";
/* eslint-disable no-unused-vars */
import { motion, MotionConfig, motion as Motion } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../api";
import io from "socket.io-client"; // <-- Add this

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15 } },
  whileHover: { scale: 1.05, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }
};

const statusColors = {
  ACTIVE: "bg-red-500 text-white",
  ACKNOWLEDGED: "bg-yellow-400 text-gray-900",
  RESOLVED: "bg-green-500 text-white",
};

const Dashboard = () => {
  const [fireAlerts, setFireAlerts] = useState([]);
  const [gasAlerts, setGasAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const isAdmin = localStorage.getItem("adminkey") === "FireEyes";

  // Helper to compare arrays (by alert _id and status)
  const isSameAlerts = (a, b) =>
    a.length === b.length &&
    a.every((alert, i) =>
      alert._id === b[i]._id && alert.status === b[i].status
    );

  // Fetch all alerts once on mount
  const fetchAlerts = () => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/alerts/active`)
      .then(res => {
        const newFireAlerts = res.data
          .filter(a => a.type === "FIRE" && (a.status === "ACTIVE" || a.status === "ACKNOWLEDGED"))
          .sort((a, b) => {
            if (a.status !== b.status) {
              return a.status === "ACTIVE" ? -1 : 1;
            }
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
        const newGasAlerts = res.data
          .filter(a => a.type === "GAS_LEAK" && (a.status === "ACTIVE" || a.status === "ACKNOWLEDGED"))
          .sort((a, b) => {
            if (a.status !== b.status) {
              return a.status === "ACTIVE" ? -1 : 1;
            }
            return new Date(b.timestamp) - new Date(a.timestamp);
          });

        setFireAlerts(newFireAlerts);
        setGasAlerts(newGasAlerts);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlerts();

    // Setup socket connection
    socketRef.current = io(API_BASE);

    // Listen for new alerts
    socketRef.current.on("new_alert", ({ alert }) => {
      if (alert.status === "RESOLVED") return;
      if (alert.type === "FIRE") {
        setFireAlerts(prev => {
          const exists = prev.some(a => a._id === alert._id);
          if (exists) return prev;
          return [alert, ...prev];
        });
      } else if (alert.type === "GAS_LEAK") {
        setGasAlerts(prev => {
          const exists = prev.some(a => a._id === alert._id);
          if (exists) return prev;
          return [alert, ...prev];
        });
      }
    });

    // Listen for alert status updates
    socketRef.current.on("alert_updated", (alert) => {
      if (alert.type === "FIRE") {
        setFireAlerts(prev => {
          // Remove if resolved, else update in list
          if (alert.status === "RESOLVED") return prev.filter(a => a._id !== alert._id);
          return prev.map(a => (a._id === alert._id ? alert : a));
        });
      } else if (alert.type === "GAS_LEAK") {
        setGasAlerts(prev => {
          if (alert.status === "RESOLVED") return prev.filter(a => a._id !== alert._id);
          return prev.map(a => (a._id === alert._id ? alert : a));
        });
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Change alert status
  const handleStatusChange = async (alertId, newStatus) => {
    await axios.patch(`${API_BASE}/api/alerts/${alertId}`, { status: newStatus });
    // No need to fetchAlerts(); socket will update UI
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <Motion.h1
        className="text-5xl font-extrabold mb-12 flex items-center gap-4 text-red-600 drop-shadow-lg text-center justify-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <span role="img" aria-label="fire">🔥</span>
        Fire Eyes Dashboard
      </Motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Fire Alerts Card */}
        <motion.div
          className="bg-gradient-to-br from-red-100 to-yellow-50 rounded-3xl shadow-2xl p-10 border-l-8 border-red-500 relative overflow-hidden"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
        >
          <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none select-none">🔥</div>
          <h2 className="text-3xl font-bold text-red-700 flex items-center gap-2 mb-4">
            <span role="img" aria-label="fire">🔥</span>
            Latest Fire Alerts
          </h2>
          {loading ? (
            <Motion.p className="text-xl mt-3 text-gray-700">Loading...</Motion.p>
          ) : fireAlerts.length === 0 ? (
            <Motion.p className="text-xl mt-3 text-gray-700">No active fire alerts.</Motion.p>
          ) : (
            <ul className="space-y-6">
              {fireAlerts.map(alert => (
                <li key={alert._id} className="bg-white/90 rounded-xl p-6 shadow border-l-4 border-red-400 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-4 items-center mb-2">
                    <span className={`px-3 py-1 rounded-full font-bold text-lg ${statusColors[alert.status]}`}>
                      {alert.status}
                    </span>
                    <span className="font-bold text-orange-700 text-lg">{alert.type}</span>
                    <span className="text-gray-700 text-base">
                      <b>Time:</b> {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-700 text-lg">
                    {alert.userId && (
                      <>
                        <b>User:</b> {alert.userId.name} <br />
                        <b>Phone:</b> {alert.userId.phone} <br />
                        <b>Email:</b> {alert.userId.email} <br />
                        <b>Address:</b> {alert.userId.address} <br />
                        <b>Device ID:</b> {alert.userId.deviceId}
                      </>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4">
                    {isAdmin && alert.status !== "ACKNOWLEDGED" && (
                      <button
                        className="btn btn-warning btn-md"
                        onClick={() => handleStatusChange(alert._id, "ACKNOWLEDGED")}
                      >
                        Mark as Acknowledged
                      </button>
                    )}
                    {isAdmin && (
                      <button
                        className="btn btn-success btn-md"
                        onClick={() => handleStatusChange(alert._id, "RESOLVED")}
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
        {/* Gas Leak Alerts Card */}
        <motion.div
          className="bg-gradient-to-br from-blue-100 to-green-50 rounded-3xl shadow-2xl p-10 border-l-8 border-blue-500 relative overflow-hidden"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
        >
          <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none select-none">🛢️</div>
          <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 mb-4">
            <span role="img" aria-label="gas">🛢️</span>
            Latest Gas Leak Alerts
          </h2>
          {loading ? (
            <Motion.p className="text-xl mt-3 text-gray-700">Loading...</Motion.p>
          ) : gasAlerts.length === 0 ? (
            <Motion.p className="text-xl mt-3 text-gray-700">No active gas leak alerts.</Motion.p>
          ) : (
            <ul className="space-y-6">
              {gasAlerts.map(alert => (
                <li key={alert._id} className="bg-white/90 rounded-xl p-6 shadow border-l-4 border-blue-400 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-4 items-center mb-2">
                    <span className={`px-3 py-1 rounded-full font-bold text-lg ${statusColors[alert.status]}`}>
                      {alert.status}
                    </span>
                    <span className="font-bold text-blue-700 text-lg">{alert.type}</span>
                    <span className="text-gray-700 text-base">
                      <b>Time:</b> {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-700 text-lg">
                    {alert.userId && (
                      <>
                        <b>User:</b> {alert.userId.name} <br />
                        <b>Phone:</b> {alert.userId.phone} <br />
                        <b>Email:</b> {alert.userId.email} <br />
                        <b>Address:</b> {alert.userId.address} <br />
                        <b>Device ID:</b> {alert.userId.deviceId}
                      </>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4">
                    {isAdmin && alert.status !== "ACKNOWLEDGED" && (
                      <button
                        className="btn btn-warning btn-md"
                        onClick={() => handleStatusChange(alert._id, "ACKNOWLEDGED")}
                      >
                        Mark as Acknowledged
                      </button>
                    )}
                    {isAdmin && (
                      <button
                        className="btn btn-success btn-md"
                        onClick={() => handleStatusChange(alert._id, "RESOLVED")}
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
