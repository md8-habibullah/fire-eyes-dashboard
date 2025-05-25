export default function UserCard({ user }) {
  return (
    <div className="card bg-white shadow-lg border border-orange-200 rounded-xl p-5 mb-4">
      <h3 className="text-xl font-bold text-orange-700">{user.name}</h3>
      <div className="text-gray-700 text-sm mt-2">
        <div><b>Phone:</b> {user.phone}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Address:</b> {user.address}</div>
        <div className="font-mono text-xs text-orange-700"><b>Device ID:</b> {user.deviceId}</div>
      </div>
    </div>
  );
}