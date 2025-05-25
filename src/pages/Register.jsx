const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-12 bg-gradient-to-br from-red-100 via-orange-100 to-yellow-50 rounded-2xl shadow-2xl p-8 border border-red-200">
      <div className="flex items-center mb-6">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mr-3">
          <path d="M12 2C12 2 7 7.5 7 11.5C7 15.09 9.91 18 13.5 18C16.09 18 18 16.09 18 13.5C18 10.5 12 2 12 2Z" fill="#F87171"/>
          <circle cx="12" cy="13" r="3" fill="#FBBF24"/>
        </svg>
        <h2 className="text-3xl font-extrabold text-red-700 tracking-tight">Fire Eyes Registration</h2>
      </div>
      <p className="mb-6 text-gray-600 text-center">
        Register your device to receive instant fire notifications and alerts.
      </p>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-red-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered w-full bg-white border-red-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-red-700 mb-1">Phone</label>
          <input
            type="text"
            placeholder="+8801XXXXXXXXX"
            className="input input-bordered w-full bg-white border-red-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-red-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="input input-bordered w-full bg-white border-red-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-red-700 mb-1">Address</label>
          <input
            type="text"
            placeholder="Full address"
            className="input input-bordered w-full bg-white border-red-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-red-700 mb-1">Device ID</label>
          <input
            type="text"
            placeholder="Unique device ID"
            className="input input-bordered w-full bg-white border-red-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 transition"
          />
        </div>
        <button
          className="btn btn-primary w-full bg-gradient-to-r from-red-500 to-yellow-400 border-0 text-white font-bold text-lg shadow-lg hover:from-red-600 hover:to-yellow-500 transition"
        >
          Register Device
        </button>
      </form>
    </div>
  );
};

export default Register;
