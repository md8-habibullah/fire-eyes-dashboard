import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AlertDetails from "./pages/AlertDetails";
import ShowUsers from "./pages/ShowUsers";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/alert/:id" element={<AlertDetails />} />
          <Route path="/users" element={<ShowUsers />} /> {/* <-- Add this */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
