import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const AlertDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-red-200 flex items-center justify-center py-10">
      <motion.div
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 border-4 border-orange-300 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        >
          <motion.span
            className="text-6xl drop-shadow-lg"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            🔥
          </motion.span>
        </motion.div>
        <motion.h2
          className="text-3xl font-extrabold text-orange-700 mb-6 text-center tracking-wide"
          variants={itemVariants}
        >
          Fire Eyes Alert
        </motion.h2>
        <motion.div className="space-y-4 text-lg">
          <motion.p variants={itemVariants}>
            <span className="font-semibold text-orange-600">Alert ID:</span>{" "}
            <span className="text-gray-700">{id}</span>
          </motion.p>
          <motion.p variants={itemVariants}>
            <span className="font-semibold text-orange-600">📍 Location:</span>{" "}
            <span className="italic text-gray-500">Loading...</span>
          </motion.p>
          <motion.p variants={itemVariants}>
            <span className="font-semibold text-orange-600">👤 User:</span>{" "}
            <span className="italic text-gray-500">Loading...</span>
          </motion.p>
          <motion.p variants={itemVariants}>
            <span className="font-semibold text-orange-600">🚨 Type:</span>{" "}
            <span className="text-red-600 font-bold">fire/gas</span>
          </motion.p>
          <motion.p variants={itemVariants}>
            <span className="font-semibold text-orange-600">📅 Time:</span>{" "}
            <span className="italic text-gray-500">Loading...</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AlertDetails;
