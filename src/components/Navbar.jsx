import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 shadow-lg px-6 py-3">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white tracking-wide hover:scale-105 transition-transform"
        >
          <span className="text-3xl animate-pulse">🔥</span>
          <span className="drop-shadow-lg">Fire Eyes</span>
        </Link>
      </div>
      <div className="flex-none flex gap-3">
        <Link
          to="/login"
          className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-red-600 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="btn btn-primary btn-sm bg-white text-red-600 border-none hover:bg-yellow-200 hover:text-orange-700 transition-colors"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
