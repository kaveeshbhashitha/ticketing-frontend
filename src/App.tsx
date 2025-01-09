import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/web/Home";
import Dashboard from "./components/admin/Dashboard";
import Test from "./components/web/Test";
import GetEvent from "./components/web/GetEvent";
import AddEvent from "./components/admin/actions/AddEvent";
import SeeEvents from "./components/admin/actions/SeeEvents";
import Login from "./components/web/auth/Login";
import Register from "./components/web/auth/Register";
import SeeUsers from "./components/admin/actions/SeeUsers";
import EventSchedule from "./components/admin/actions/EventSchedule";
import AllEvents from "./components/content/Events/AllEvents";
import GeneralEvents from "./components/content/Events/GeneralEvent";
import SportEvent from "./components/content/Events/SportEvent";
import TheaterEvent from "./components/content/Events/TheaterEvent";
import OtherEvent from "./components/content/Events/OtherEvent";
import UserProfile from "./components/admin/operations/UserProfile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />
          <Route path="/get" element={<GetEvent />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/seeEvents" element={<SeeEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seeUsers" element={<SeeUsers />} />
          <Route path="/adminEventSchedule" element={<EventSchedule />} />
          <Route path="/AllEvents" element={<AllEvents/>}/>
          <Route path="/GeneralEvent" element={<GeneralEvents/>}/>
          <Route path="/SportEvent" element={<SportEvent/>}/>
          <Route path="/TheaterEvent" element={<TheaterEvent/>}/>
          <Route path="/OtherEvent" element={<OtherEvent/>}/>
          <Route path="/user" element={<UserProfile userId={"weferferfer"} isAdmin={false}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
