import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-red-600 via-orange-500 to-yellow-400 shadow-2xl flex flex-col p-8 z-40">
    <div className="mb-12">
      <Link to="/" className="text-3xl font-extrabold text-white flex items-center gap-3">
        <span role="img" aria-label="fire" className="text-4xl">🔥</span> Fire Eyes
      </Link>
    </div>
    <nav className="flex flex-col gap-6">
      <Link to="/" className="btn btn-ghost text-white text-xl py-4 rounded-xl">Dashboard</Link>
      <Link to="/users" className="btn btn-ghost text-white text-xl py-4 rounded-xl">Users</Link>
      <Link to="/login" className="btn btn-ghost text-white text-xl py-4 rounded-xl">Login</Link>
      <Link to="/register" className="btn btn-ghost text-white text-xl py-4 rounded-xl">Register</Link>
    </nav>
  </aside>
);

export default Sidebar;