// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-32">
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-500 via-orange-400 to-yellow-300 shadow-lg"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
    </div>
  );
}