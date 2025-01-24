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

  // Function to reload the page
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      {/* Refresh Button for Mobile View */}
      <button
        className="btn btn-dark position-fixed top-0 start-0 m-3 d-block d-sm"
        style={{
          zIndex: 999,
          backgroundColor: 'transparent',  // Invisible background
          border: 'none',  // No border
          width: '40px',  // You can adjust the size if needed
          height: '40px',  // You can adjust the size if needed
          cursor: 'pointer',  // Make it clickable
        }}
        onClick={handleRefresh}
      >
       The Event
      </button>

      <button
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

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
