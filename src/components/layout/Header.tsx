import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/AllEvents">Events</Link></li>
                  <li><Link to="/myTickets">My Tickets</Link></li>
                  <li><Link to="/userProfile">Profile</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li className={signed}><Link to="/login">Sign In</Link></li>
                  <li className={className}><Link to="#" onClick={handleLogout}>Logout</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
  );
};
export default Header;