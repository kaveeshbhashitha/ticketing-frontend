import React, { useEffect, useState } from "react";
import Logo from "../../layout/Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../service/AuthService";

const EventHeader: React.FC = () => {
  const [className, setClassName] = useState('');
  const [signed, setSigned] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
        setClassName('block buy-tickets');
        setSigned('none buy-tickets');
        console.log(user);
    } else {
        setSigned('blcok buy-tickets');
        setClassName('none buy-tickets');
    }
}, [navigate]);

const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
};

  return(
    <div>
        <header id="header">
            <div className="container">

            <Logo/>

            <nav id="nav-menu-container">
                <ul className="nav-menu">
                  <li><a href="/">Home</a></li>
                  <li><NavLink to="/AllEvents" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>All Events</NavLink></li>
                  <li><NavLink to="/GeneralEvent" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>General Events</NavLink></li>
                  <li><NavLink to="/SportEvent" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>Sport Events</NavLink></li>
                  <li><NavLink to="/TheaterEvent" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>Theater Events</NavLink></li>
                  <li><NavLink to="/OtherEvent" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>Other Events</NavLink></li>

                  <li className={signed}><Link to={"/login"}>Sign In</Link></li>
                  <li className={className}><Link to="#" onClick={handleLogout}>Logout</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
  );
};
export default EventHeader;