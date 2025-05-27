import { useEffect, useState } from "react";
import axios from "axios";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { API_BASE } from "../api";
import { useNavigate } from "react-router-dom";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "", email: "", address: "", deviceId: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "FireEyes - Registered";
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/users`)
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`${API_BASE}/api/users/${id}`);
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setEditForm({ ...user });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    await axios.put(`${API_BASE}/api/users/${editId}`, editForm);
    setEditId(null);
    fetchUsers();
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const isAdmin = localStorage.getItem("adminkey") === "FireEyes";

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl shadow-2xl p-8 border border-orange-200">
      <h2 className="text-4xl font-extrabold text-red-600 tracking-wide mb-10 text-center drop-shadow">
        Registered Users
      </h2>
      {loading ? (
        <div className="text-center text-orange-500 font-bold text-2xl">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full rounded-2xl overflow-hidden shadow border border-orange-200 text-lg">
            <thead>
              <tr className="bg-gradient-to-r from-orange-200 via-yellow-100 to-red-100 text-orange-900 text-xl">
                <th className="py-4 px-3 text-left font-bold">Name</th>
                <th className="py-4 px-3 text-left font-bold">Phone</th>
                <th className="py-4 px-3 text-left font-bold">Email</th>
                <th className="py-4 px-3 text-left font-bold">Address</th>
                <th className="py-4 px-3 text-left font-bold">Device ID</th>
                <th className="py-4 px-3 text-left font-bold">Actions</th>
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
                      ? "bg-white/90 hover:bg-orange-100"
                      : "bg-orange-50/80 hover:bg-yellow-100"
                  }
                >
                  {editId === u._id ? (
                    <>
                      <td>
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="input input-md input-bordered w-full text-lg"
                        />
                      </td>
                      <td>
                        <input
                          name="phone"
                          value={editForm.phone}
                          onChange={handleEditChange}
                          className="input input-md input-bordered w-full text-lg"
                        />
                      </td>
                      <td>
                        <input
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="input input-md input-bordered w-full text-lg"
                        />
                      </td>
                      <td>
                        <input
                          name="address"
                          value={editForm.address}
                          onChange={handleEditChange}
                          className="input input-md input-bordered w-full text-lg break-words max-w-xs"
                        />
                      </td>
                      <td>
                        <input
                          name="deviceId"
                          value={editForm.deviceId}
                          onChange={handleEditChange}
                          className="input input-md input-bordered w-full text-lg"
                        />
                      </td>
                      <td>
                        <button className="btn btn-success btn-md mr-2 mb-2" onClick={handleEditSave}>Save</button>
                        <button className="btn btn-ghost btn-md mb-2" onClick={handleEditCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-3 text-gray-800 font-semibold text-lg">{u.name}</td>
                      <td className="py-3 px-3 text-gray-700 text-lg">{u.phone}</td>
                      <td className="py-3 px-3 text-gray-700 text-lg">{u.email}</td>
                      <td className="py-3 px-3 text-gray-700 text-lg break-words max-w-xs">{u.address}</td>
                      <td className="py-3 px-3 font-mono text-base text-orange-700">{u.deviceId}</td>
                      <td>
                        {isAdmin && (
                          <>
                            <button className="btn btn-warning btn-md mr-2 mb-2" onClick={() => handleEdit(u)}>Edit</button>
                            <button className="btn btn-error btn-md mb-2" onClick={() => handleDelete(u._id)}>Delete</button>
                          </>
                        )}
                        <button
                          className="btn btn-info btn-md mb-2"
                          onClick={() => navigate("/login", { state: { deviceId: u.deviceId } })}
                        >
                          History
                        </button>
                      </td>
                    </>
                  )}
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