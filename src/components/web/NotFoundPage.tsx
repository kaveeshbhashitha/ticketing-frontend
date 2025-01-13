import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import EventAbout from "../content/Events/EventAbout";
import Footer from "../layout/Footer";

const NotFoundPage: React.FC = () => {
  return (
    <div>
        <Header/>
        <EventAbout/>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <div className="text-center">
          <i
            className="fas fa-exclamation-circle text-danger"
            style={{ fontSize: "100px" }}
          ></i>
          <h1 className="mt-4" style={{ fontSize: "50px", fontWeight: "bold" }}>
            404
          </h1>
          <h3 className="mb-4">Page Not Found</h3>
          <p className="mb-4 text-muted">
            Oops! The page you're looking for doesn't exist.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn btn-primary me-2">
              <i className="fas fa-home"></i> Back to Home
            </Link>
            <Link to="/login" className="btn btn-secondary">
              <i className="fas fa-sign-in-alt"></i> Go to Login
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NotFoundPage;
