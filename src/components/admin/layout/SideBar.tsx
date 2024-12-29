import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../layout/Logo";
import axios from "axios";

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/logout');
      if (response) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
};

  return (
    <div>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
        style={{ height: "100%" }}
      >
        <div className="app-brand demo">
          <NavLink to="/" className="app-brand-link">
            <span className="app-brand-logo demo"></span>
            <Logo height="45px" width="190px" />
          </NavLink>

          <a
            href="/"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className="menu-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-detail"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </NavLink>
          </li>

          <li className="menu-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-home"></i>
              <div data-i18n="Analytics">Home Page</div>
            </NavLink>
          </li>

          <li className="menu-item">
            <NavLink
              to="/adminHome"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-user"></i>
              <div data-i18n="Analytics">Administration</div>
            </NavLink>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Pages</span>
          </li>
          <li className="menu-item">
            <NavLink
              to="/seeUsers"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon fa fa-users"></i>
              <div data-i18n="Analytics">Customers</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/notification"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-bell"></i>
              <div data-i18n="Analytics">Notifications</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-calendar"></i>
              <div data-i18n="Analytics">Schedules</div>
            </NavLink>
          </li>
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Services</span>
          </li>
          <li className="menu-item">
            <NavLink
              to="/addEvent"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-collection"></i>
              <div data-i18n="Analytics">Add New Event</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/seeEvents"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-box"></i>
              <div data-i18n="Analytics">See All Events</div>
            </NavLink>
          </li>
          
        
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Actions</span>
          </li>
          <li className="menu-item">
            <NavLink
              to="/reservation"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-detail"></i>
              <div data-i18n="Analytics">Reservations</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-file"></i>
              <div data-i18n="Analytics">Cancellation</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/adminPayment"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-table"></i>
              <div data-i18n="Analytics">Payments</div>
            </NavLink>
          </li>
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Admin Action</span>
          </li>
          <li className="menu-item">
            <a className="menu-link" onClick={handleLogout}>
              <i className="menu-icon fa-solid fa-arrow-right-from-bracket"></i>
              <div data-i18n="Documentation">Admin Logout</div>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};
export default SideBar;
