import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/web/Home";
import Dashboard from "./components/admin/Dashboard";
import AdminLogin from "./components/admin/AdminLogin";
import Test from "./components/web/Test";
import GetEvent from "./components/web/GetEvent";
import AddEvent from "./components/admin/actions/AddEvent";
import SeeEvents from "./components/admin/actions/SeeEvents";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/test" element={<Test />} />
          <Route path="/get" element={<GetEvent />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/seeEvents" element={<SeeEvents />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
