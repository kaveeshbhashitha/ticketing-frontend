import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../service/AuthService";
import Chatbot from "../../chatbot/Chatbot";

const Login: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  // State for draggable box position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Adjust starting position based on screen size
  useEffect(() => {
    if (window.innerWidth <= 768) {
      // Mobile view start position
      setPosition({ x: 0, y: 160 });
    } else {
      // Desktop view start position
      setPosition({ x: 40, y: 130 });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(userEmail, password) as { token: string; email: string; role: string };
      if (response.token && response.email) {
        sessionStorage.setItem('user', userEmail);
        sessionStorage.setItem('role', response.role);
        sessionStorage.setItem('token', response.token);
        
        console.log(userEmail, response.role, response.token);

        if (response.role === "Admin") {
          console.log(response.role)
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setMessage("Invalid credentials");
        console.log("Missing token or email", response);
      }
    } catch (error) {
      setMessage("Login Failed. Try Again!");
      console.error("Error logging in:", error);
    }
  };

  // Drag event handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Drag event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - startPos.x,
        y: touch.clientY - startPos.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
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
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="container"
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="row justify-content-center">
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6"
            style={{
              maxWidth: "400px", // Maintain the desktop view size
              width: "100%", // Adjust for mobile responsiveness
            }}
          >
            <div className="card shadow-lg">
              <div className="card-header text-center text-white" style={{ backgroundColor: "#f82249" }}>
                <h3 className="text-white">Ticketing Login!</h3>
                <p className="mb-0">Login to access your account</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  {/* Username Field */}
                  <div className="my-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="email"
                      id="username"
                      className="form-control"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {/* Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <a href="/forgotPassword" className="text-decoration-none small" style={{ color: "#f82249" }}>
                      Forgot Password?
                    </a>
                  </div>

                  {/* Error Message */}
                  {message && <div className="alert alert-danger text-center">{message}</div>}

                  {/* Login Button */}
                  <div className="d-grid mb-2">
                    <button
                      type="submit"
                      className="btn btn-lg btn-block"
                      style={{ backgroundColor: "#f82249", color: "white" }}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <a href="/" className="text-center text-secondary">
                <span>Back to Home</span>
              </a>
              <div className="card-footer text-center">
                <p className="mb-0">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-decoration-none" style={{ color: "#f82249" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Login;
