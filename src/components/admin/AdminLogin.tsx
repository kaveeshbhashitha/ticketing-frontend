import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkin, setCheckIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      if (checkin) {
        setError("");
        navigate("/admin/dashboard");
      } else {
        setError("Click check box");
      }
    } else {
      setPassword('');
      setUsername('');
      setCheckIn(false);
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{
        backgroundImage: "url('/img/intro-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header text-center bg-danger text-white">
          <h3 className="text-white">Admin Login!</h3>
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
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            {/* Remember Me and Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="remember"
                  className="form-check-input"
                  onChange={() => setCheckIn(!checkin)}
                />
                <label htmlFor="remember" className="form-check-label">
                  Check me in
                </label>
              </div>
              <a href="#" className="text-danger text-decoration-none small">
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {/* Submit Button */}
            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-danger btn-lg">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer text-center">
          <p className="mb-0">
            Don’t have an account?{" "}
            <a href="#" className="text-danger text-decoration-none">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
