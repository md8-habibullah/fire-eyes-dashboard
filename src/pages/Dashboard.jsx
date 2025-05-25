// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15 } },
  whileHover: { scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }
};

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <motion.h1
        className="text-4xl font-extrabold mb-8 flex items-center gap-3 text-red-600 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <span role="img" aria-label="fire">🔥</span>
        Fire Eyes Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fire Alerts Card */}
        <motion.div
          className="bg-gradient-to-br from-red-100 to-yellow-50 rounded-2xl shadow-2xl p-7 border-l-8 border-red-500 relative overflow-hidden"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
        >
          <div className="absolute right-4 top-4 text-5xl opacity-20 pointer-events-none select-none">🔥</div>
          <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2">
            <span role="img" aria-label="fire">🔥</span>
            Latest Fire Alerts
          </h2>
          <motion.p
            className="text-base mt-3 text-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            No active fire alerts.
          </motion.p>
        </motion.div>
        {/* Gas Leak Alerts Card */}
        <motion.div
          className="bg-gradient-to-br from-blue-100 to-green-50 rounded-2xl shadow-2xl p-7 border-l-8 border-blue-500 relative overflow-hidden"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
        >
          <div className="absolute right-4 top-4 text-5xl opacity-20 pointer-events-none select-none">🛢️</div>
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="gas">🛢️</span>
            Latest Gas Leak Alerts
          </h2>
          <motion.p
            className="text-base mt-3 text-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            No active gas leak alerts.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
