import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar"; // Remove this line
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AlertDetails from "./pages/AlertDetails";
import ShowUsers from "./pages/ShowUsers";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Router>
      {/* <Navbar /> Remove this line */}
      <Sidebar />
      <div className="p-4 md:ml-56">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/alert/:id" element={<AlertDetails />} />
          <Route path="/users" element={<ShowUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
