import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="navbar bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 shadow-lg px-6 py-3"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 12 }}
    >
      <div className="flex-1">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white tracking-wide hover:scale-105 transition-transform"
          >
            <motion.span
              className="text-3xl animate-pulse"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              🔥
            </motion.span>
            <span className="drop-shadow-lg">Fire Eyes</span>
          </Link>
        </motion.div>
      </div>
      <div className="flex-none flex gap-3">
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/"
            className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-red-600 transition-colors"
          >
            Home
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/users"
            className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-red-600 transition-colors"
          >
            Show Users
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/login"
            className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-red-600 transition-colors"
          >
            Login
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/register"
            className="btn btn-primary btn-sm bg-white text-red-600 border-none hover:bg-yellow-200 hover:text-orange-700 transition-colors"
          >
            Register
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
