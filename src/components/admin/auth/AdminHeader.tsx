import React, { useEffect, useState } from "react";
import Logo from "./../../layout/Logo";
import { Link,useNavigate } from "react-router-dom";
import { logout } from "../../../service/AuthService";

const AdminHeader: React.FC = () => {
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
        sessionStorage.removeItem('token');
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
                  <li><Link to="/dashboard">Dashboard</Link></li>
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
export default AdminHeader;