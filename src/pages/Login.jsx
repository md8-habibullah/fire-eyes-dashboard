const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-yellow-100 to-orange-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-red-500">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/fire-eyes-logo.png"
            alt="Fire Eyes Logo"
            className="w-16 h-16 mb-2"
          />
          <h1 className="text-3xl font-extrabold text-red-600 tracking-wide mb-1">
            Fire Eyes
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Fire Notifier App
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Login to your device
        </h2>
        <form>
          <div className="form-control mb-5">
            <label className="label text-gray-700 font-medium mb-1">
              Device ID
            </label>
            <input
              type="text"
              placeholder="Enter your device ID"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-red-500 transition"
            />
          </div>
          <button
            className="btn btn-primary w-full bg-gradient-to-r from-red-500 to-orange-400 border-none text-white font-bold text-lg py-2 rounded-lg shadow hover:from-red-600 hover:to-orange-500 transition"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
