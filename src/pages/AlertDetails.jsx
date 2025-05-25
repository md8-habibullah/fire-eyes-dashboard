import { useParams } from "react-router-dom";

const AlertDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-red-200 flex items-center justify-center py-10">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 border-4 border-orange-300 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <span className="text-6xl drop-shadow-lg animate-bounce">🔥</span>
        </div>
        <h2 className="text-3xl font-extrabold text-orange-700 mb-6 text-center tracking-wide">
          Fire Eyes Alert
        </h2>
        <div className="space-y-4 text-lg">
          <p>
            <span className="font-semibold text-orange-600">Alert ID:</span>{" "}
            <span className="text-gray-700">{id}</span>
          </p>
          <p>
            <span className="font-semibold text-orange-600">📍 Location:</span>{" "}
            <span className="italic text-gray-500">Loading...</span>
          </p>
          <p>
            <span className="font-semibold text-orange-600">👤 User:</span>{" "}
            <span className="italic text-gray-500">Loading...</span>
          </p>
          <p>
            <span className="font-semibold text-orange-600">🚨 Type:</span>{" "}
            <span className="text-red-600 font-bold">fire/gas</span>
          </p>
          <p>
            <span className="font-semibold text-orange-600">📅 Time:</span>{" "}
            <span className="italic text-gray-500">Loading...</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
