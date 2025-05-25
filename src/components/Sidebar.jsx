import { Link } from "react-router-dom";
const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-56 bg-gradient-to-b from-red-600 via-orange-500 to-yellow-400 shadow-xl flex flex-col p-6 z-40">
    <div className="mb-8">
      <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
        <span role="img" aria-label="fire">🔥</span> Fire Eyes
      </Link>
    </div>
    <nav className="flex flex-col gap-4">
      <Link to="/" className="btn btn-ghost text-white">Dashboard</Link>
      <Link to="/users" className="btn btn-ghost text-white">Users</Link>
      <Link to="/login" className="btn btn-ghost text-white">Login</Link>
      <Link to="/register" className="btn btn-ghost text-white">Register</Link>
    </nav>
  </aside>
);
export default Sidebar;