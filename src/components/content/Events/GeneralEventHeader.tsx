import React, { useEffect, useState } from "react";
import Logo from "../../layout/Logo";
import { useNavigate } from "react-router-dom";
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
                  <li className="menu-active"><a href="/">Home</a></li>
                  <li><a href="/AllEvents">All Events</a></li>
                  <li><a href="#speakers">General Events</a></li>
                  <li className={signed}><a href="/login">Sign In</a></li>
                  <li className={className}><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
  );
};
export default EventHeader;