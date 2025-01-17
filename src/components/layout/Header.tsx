import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../service/AuthService";

const Header: React.FC = () => {
  const [className, setClassName] = useState('');
  const [signed, setSigned] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
        setClassName('block buy-tickets');
        setSigned('none buy-tickets');
        //console.log(user);
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
                  <li><NavLink to="/" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>Home</NavLink></li>
                  <li><NavLink to="/AllEvents" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>Events</NavLink></li>
                  <li><NavLink to="/myTickets" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>My Tickets</NavLink></li>
                  <li><NavLink to="/userProfile" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>Profile</NavLink></li>
                  <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "NavLink menu-active" : "NavLink")}>Contact Us</NavLink></li>
                  <li className={signed}><a href="/login">Sign In</a></li>
                  <li className={className}><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
  );
};
export default Header;