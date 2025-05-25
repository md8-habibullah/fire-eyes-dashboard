// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } },
};

const inputVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.4 },
  }),
};

const Register = () => {
  return (
    <motion.div
      className="max-w-md mx-auto mt-12 bg-gradient-to-br from-red-100 via-orange-100 to-yellow-50 rounded-2xl shadow-2xl p-8 border border-red-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mr-3">
          <path d="M12 2C12 2 7 7.5 7 11.5C7 15.09 9.91 18 13.5 18C16.09 18 18 16.09 18 13.5C18 10.5 12 2 12 2Z" fill="#F87171"/>
          <circle cx="12" cy="13" r="3" fill="#FBBF24"/>
        </svg>
        <h2 className="text-3xl font-extrabold text-red-700 tracking-tight">Fire Eyes Registration</h2>
      </motion.div>
      <motion.p
        className="mb-6 text-gray-600 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Register your device to receive instant fire notifications and alerts.
      </motion.p>
      <motion.form
        className="space-y-5"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: "Name", type: "text", placeholder: "Your name" },
          { label: "Phone", type: "text", placeholder: "+8801XXXXXXXXX" },
          { label: "Email", type: "email", placeholder: "example@gmail.com" },
          { label: "Address", type: "text", placeholder: "Full address" },
          { label: "Device ID", type: "text", placeholder: "Unique device ID" },
        ].map((field, i) => (
          <motion.div key={field.label} custom={i} variants={inputVariants}>
            <label className="block text-sm font-semibold text-red-700 mb-1">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="input input-bordered w-full bg-white border-red-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 transition"
            />
          </motion.div>
        ))}
        <motion.button
          type="submit"
          className="btn btn-primary w-full bg-gradient-to-r from-red-500 to-yellow-400 border-0 text-white font-bold text-lg shadow-lg hover:from-red-600 hover:to-yellow-500 transition"
          whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(251,191,36,0.18)" }}
          whileTap={{ scale: 0.98 }}
        >
          Register Device
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Register;
