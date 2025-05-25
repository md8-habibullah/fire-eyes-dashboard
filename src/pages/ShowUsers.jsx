import { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl shadow-2xl p-8 border border-orange-200">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mb-8 text-center drop-shadow">
        Registered Users
      </h2>
      {loading ? (
        <div className="text-center text-orange-500 font-semibold">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full rounded-xl overflow-hidden shadow border border-orange-200">
            <thead>
              <tr className="bg-gradient-to-r from-orange-200 via-yellow-100 to-red-100 text-orange-900">
                <th className="py-3 px-2 text-left font-bold">Name</th>
                <th className="py-3 px-2 text-left font-bold">Phone</th>
                <th className="py-3 px-2 text-left font-bold">Email</th>
                <th className="py-3 px-2 text-left font-bold">Address</th>
                <th className="py-3 px-2 text-left font-bold">Device ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <motion.tr
                  key={u._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={
                    idx % 2 === 0
                      ? "bg-white/90 hover:bg-orange-50"
                      : "bg-orange-50/80 hover:bg-yellow-100"
                  }
                >
                  <td className="py-2 px-2 text-gray-800 font-semibold">{u.name}</td>
                  <td className="py-2 px-2 text-gray-700">{u.phone}</td>
                  <td className="py-2 px-2 text-gray-700">{u.email}</td>
                  <td className="py-2 px-2 text-gray-700">{u.address}</td>
                  <td className="py-2 px-2 font-mono text-xs text-orange-700">{u.deviceId}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowUsers;