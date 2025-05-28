import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_BASE } from "../api";

const AuthorityDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const socket = io(API_BASE, { transports: ["websocket"] });

  useEffect(() => {
    const fetchInitialAlerts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/alerts/active`);
        const data = await res.json();
        setAlerts(data.filter(a => a.status !== "RESOLVED"));
      } catch (err) {
        console.error("Failed to fetch initial alerts:", err);
      }
    };

    fetchInitialAlerts();

    // Listen for real-time alerts
    socket.on('new_alert', ({ alert }) => {
      if (alert.status !== "RESOLVED") {
        setAlerts(prev => {
          if (prev.some(a => a._id === alert._id)) return prev;
          return [alert, ...prev];
        });
      }
    });

    // Listen for alert updates
    socket.on('alert_updated', (alert) => {
      setAlerts(prev => {
        const index = prev.findIndex(a => a._id === alert._id);
        if (index !== -1) {
          if (alert.status === "RESOLVED") {
            return prev.filter(a => a._id !== alert._id);
          }
          const newAlerts = [...prev];
          newAlerts[index] = alert;
          return newAlerts;
        } else if (alert.status !== "RESOLVED") {
          return [alert, ...prev];
        }
        return prev;
      });
    });

    // Handle reconnection
    socket.on('connect', () => {
      console.log('AuthorityDashboard socket connected');
      fetchInitialAlerts(); // Refresh alerts on reconnect
    });

    socket.on('connect_error', (err) => {
      console.error('AuthorityDashboard socket error:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="p-4 grid gap-4">
      {alerts.length === 0 ? (
        <p className="text-center text-gray-500">No active alerts.</p>
      ) : (
        alerts.map((alert) => (
          <div key={alert._id} className="card bg-red-100 p-4 shadow rounded-xl">
            <h2 className="text-xl font-bold">{alert.type}</h2>
            <p><b>User:</b> {alert.userId?.name || 'Unknown'}</p>
            <p><b>Phone:</b> {alert.userId?.phone || 'N/A'}</p>
            <p><b>Address:</b> {alert.userId?.address || 'N/A'}</p>
            <p><b>Status:</b> {alert.status}</p>
            <p><b>Time:</b> {new Date(alert.timestamp).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AuthorityDashboard;