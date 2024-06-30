import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Quiz from "./Pages/Quiz";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:catagory/:selectedDiff" element={<Quiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
