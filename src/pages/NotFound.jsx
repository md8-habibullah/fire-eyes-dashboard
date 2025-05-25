import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-100 to-red-200">
    <motion.div
      className="bg-white/90 rounded-3xl shadow-2xl p-12 border-4 border-orange-300 flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <motion.span
        className="text-7xl mb-4 animate-bounce"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        🔥
      </motion.span>
      <h1 className="text-4xl font-extrabold text-orange-700 mb-2 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="btn btn-primary bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 border-0 text-white font-bold text-lg shadow-xl hover:from-red-600 hover:to-yellow-500 transition-all duration-200"
      >
        Go Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;