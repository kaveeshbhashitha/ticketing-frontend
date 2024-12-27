import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../service/UserService";

const Login: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const [checkin, setCheckIn] = useState(false);
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser({ userEmail, password });
      setMessage(response.data);

      if (checkin) {
        if (response.data === 'Login successful') {
            sessionStorage.setItem('user', userEmail);
            navigate('/');
          } else {
            setMessage('Invalid Email or Password, Try again');
          }
      }else{
        setPassword('');
        setUserEmail('');
        setCheckIn(false);
        setMessage("Invalid username or password");
      }

    } catch (error) {
      setMessage('Error Login, Try again');
      console.error("Login error:", error);
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

            {message && <div className="alert alert-danger text-center">{message}</div>}

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

export default Login;