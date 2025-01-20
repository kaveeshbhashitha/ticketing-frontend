import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../service/AuthService";
import Chatbot from "../../chatbot/Chatbot";

interface Message {
  text: string;
  class: string;
}

const Register: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [message, setMessage] = useState<Message | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (firstName && lastName && userEmail && password) {
      try {
        const response = await register(
          firstName,
          lastName,
          userEmail,
          password
        ) as { data: string };

        if (response.data === "User already registered as a user") {
          setMessage({ text: response.data, class: "alert alert-danger" });
        } else if (response.data === "User registered successfully") {
          setMessage({ text: response.data, class: "alert alert-success" });
          navigate("/login");
        } else {
          setMessage({
            text: "Unexpected response from the server.",
            class: "alert alert-warning",
          });
        }
      } catch (error) {
        // Handle error
        setMessage({
          text: "Error occurred, registration failed.",
          class: "alert alert-danger",
        });
        console.error("Registration error:", error);
      }
    } else {
      setMessage({
        text: "All fields are required, please fill them out.",
        class: "alert alert-warning",
      });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-dark"
      style={{
        backgroundImage: "url('/img/poster.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div
          className="card-header text-center text-white"
          style={{ backgroundColor: "#f82249" }}
        >
          <h3 className="text-white">Ticketing Login!</h3>
          <p className="mb-0">Login to access your account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleRegister}>
            {/* Username Field */}
            <div className="my-3">
              <label htmlFor="username" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="userEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3 form-password-toggle">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to
                ="#"
                className="text-decoration-none small"
                style={{ color: "#f82249" }}
              >
                Forgot Password?
              </Link>
            </div>

            {message && <div className={message.class}>{message.text}</div>}

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-lg"
                style={{ backgroundColor: "#f82249", color: "white" }}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <Link to="/" className="text-center text-secondary"><span>Back to Home</span></Link>
        <div className="card-footer text-center">
          <p className="mb-0">
            Already have an account?{" "}
            <Link to
              ="/login"
              className="text-decoration-none"
              style={{ color: "#f82249" }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};
export default Register;
