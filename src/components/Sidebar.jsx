import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Menu */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-md shadow-lg md:hidden flex items-center justify-center"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-red-600 via-orange-500 to-yellow-400 shadow-2xl flex flex-col p-8 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="mb-12">
          <Link
            to="/"
            className="text-3xl font-extrabold text-white flex items-center gap-3"
            onClick={closeSidebar}
          >
            <span role="img" aria-label="fire" className="text-4xl">
              🔥
            </span>{" "}
            Fire Eyes
          </Link>
        </div>
        <nav className="flex flex-col gap-6">
          <Link
            to="/"
            className="btn btn-ghost text-white text-xl py-4 rounded-xl"
            onClick={closeSidebar}
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className="btn btn-ghost text-white text-xl py-4 rounded-xl"
            onClick={closeSidebar}
          >
            Users
          </Link>
          <Link
            to="/login"
            className="btn btn-ghost text-white text-xl py-4 rounded-xl"
            onClick={closeSidebar}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-ghost text-white text-xl py-4 rounded-xl"
            onClick={closeSidebar}
          >
            Register
          </Link>
        </nav>
      </aside>

      {/* Dimmed Background for Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;