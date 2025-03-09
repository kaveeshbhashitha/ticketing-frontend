import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../layout/Logo";
import { logout } from "../../../service/AuthService";

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("role");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault(); // Prevent default navigation behavior
    const confirmAction = window.confirm(
      "Are you sure you want to leave this page?"
    );
    if (confirmAction) {
      navigate(path); // Navigate if the user confirms
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
          <NavLink to="/AdminHome" className="app-brand-link">
            <span className="app-brand-logo demo"></span>
            <Logo height="45px" width="190px" />
          </NavLink>

          <a
            href=""
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
              to="/AdminHome"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
              onClick={(e) => handleNavigation(e, "/AdminHome")}
            >
              <i className="menu-icon tf-icons bx bx-home"></i>
              Home Page
            </NavLink>
          </li>

          <li className="menu-item">
            <NavLink
              to="/adminProfile"
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
              to="/adminEventSchedule"
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
              to="/UpdateAndDeleteEvent"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-edit-alt"></i>
              <div data-i18n="Analytics">Update And Delete</div>
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
              to="/userReservations"
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
              to="/Cancellation"
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
              to="/reschedule"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-redo"></i>
              <div data-i18n="Analytics">Reschedule</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/OldEvents"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <i className="menu-icon tf-icons bx bx-time"></i>
              <div data-i18n="Analytics">OldEvents</div>
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
