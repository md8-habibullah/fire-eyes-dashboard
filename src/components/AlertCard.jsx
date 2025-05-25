export default function AlertCard({ alert }) {
  return (
    <div className="card bg-gradient-to-br from-red-100 to-yellow-50 border-l-4 border-red-500 shadow-lg rounded-xl p-5 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{alert.type === "fire" ? "🔥" : "🛢️"}</span>
        <span className="font-bold text-orange-700">{alert.type.toUpperCase()}</span>
      </div>
      <div className="text-gray-700 text-sm">
        <div><b>Status:</b> {alert.status}</div>
        <div><b>Time:</b> {new Date(alert.timestamp).toLocaleString()}</div>
        {alert.user && <div><b>User:</b> {alert.user.name}</div>}
        {alert.location && <div><b>Location:</b> {alert.location}</div>}
      </div>
    </div>
  );
}