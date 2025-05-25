import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // adjust to your backend URL

export default function AuthorityDashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchInitialAlerts = async () => {
      const res = await fetch('/api/alerts/active');
      const data = await res.json();
      setAlerts(data);
    };

    fetchInitialAlerts();

    // Listen for real-time alerts
    socket.on('new_alert', ({ alert, user }) => {
      const enrichedAlert = { ...alert, userId: user };
      setAlerts(prev => [enrichedAlert, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-4 grid gap-4">
      {alerts.map((alert) => (
        <div key={alert._id} className="card bg-red-100 p-4 shadow rounded-xl">
          <h2 className="text-xl font-bold">{alert.type}</h2>
          <p><b>User:</b> {alert.userId.name}</p>
          <p><b>Phone:</b> {alert.userId.phone}</p>
          <p><b>Address:</b> {alert.userId.address}</p>
          <p><b>Status:</b> {alert.status}</p>
          <p><b>Time:</b> {new Date(alert.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
