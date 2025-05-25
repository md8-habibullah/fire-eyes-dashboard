const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 text-red-600 drop-shadow-lg">
        <span role="img" aria-label="fire">🔥</span>
        Fire Eyes Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fire Alerts Card */}
        <div className="bg-gradient-to-br from-red-100 to-yellow-50 rounded-2xl shadow-2xl p-7 border-l-8 border-red-500 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-5xl opacity-20 pointer-events-none select-none">🔥</div>
          <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2">
            <span role="img" aria-label="fire">🔥</span>
            Latest Fire Alerts
          </h2>
          <p className="text-base mt-3 text-gray-700">No active fire alerts.</p>
        </div>
        {/* Gas Leak Alerts Card */}
        <div className="bg-gradient-to-br from-blue-100 to-green-50 rounded-2xl shadow-2xl p-7 border-l-8 border-blue-500 relative overflow-hidden">
          <div className="absolute right-4 top-4 text-5xl opacity-20 pointer-events-none select-none">🛢️</div>
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="gas">🛢️</span>
            Latest Gas Leak Alerts
          </h2>
          <p className="text-base mt-3 text-gray-700">No active gas leak alerts.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
