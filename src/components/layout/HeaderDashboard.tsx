import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const HeaderDasboard: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);  // State to track scrolling
  const navigate = useNavigate();

  useEffect(() => {

    // Event listener to handle scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);  // Change state when scrolled
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  return (
    <div>
      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav id="nav-menu-container">
            {/* Mobile-only menu */}
            <ul className="nav-menu d-block d-lg-none">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/adminProfile">Administration</Link></li>
              <li><Link to="/seeUsers">Customers</Link></li>
              <li><Link to="/notification">Notifications</Link></li>
              <li><Link to="/adminEventSchedule">Schedules</Link></li>
              <li><Link to="/addEvent">Add New Event</Link></li>
              <li><Link to="/UpdateAndDeleteEvent">Update And Delete</Link></li>
              <li><Link to="/seeEvents">See All Events</Link></li>
              <li><Link to="/userReservations">Reservations</Link></li>
              <li><Link to="/Cancellation">Cancellation</Link></li>
              <li><Link to="/reschedule">Reschedule</Link></li>
              <li><Link to="/adminPayment">Payments</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default HeaderDasboard;
