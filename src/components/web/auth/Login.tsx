import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../service/AuthService";
import Chatbot from "../../chatbot/Chatbot";

const Login: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        const response = await login(userEmail, password) as { token: string; email: string; role: string };
        if (response.token && response.email) {
          sessionStorage.setItem('user', userEmail);
          sessionStorage.setItem('role', response.role);
          //console.log("Login successful:", response.email);
          if (response.role === "Admin") {
            navigate('/dashboard');
          }else{
            navigate('/');
          }

        } else {
          setMessage("Wrong");
          console.log("Missing token or email", response);
        }
      } catch (error) {
        setMessage("Login Failed. Try Again.!");
        console.error("Error logging in:", error);
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
      <div className="card shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header text-center text-white" style={{backgroundColor:"#f82249"}}>
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

            {/* Remember Me and Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <a href="/forgotPassword" className="text-decoration-none small" style={{color:"#f82249"}}>
                Forgot Password?
              </a>
            </div>

            {message && <div className="alert alert-danger text-center">{message}</div>}

            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-lg" style={{backgroundColor:"#f82249", color:"white"}}>
                Login
              </button>
            </div>
          </form>
        </div>
        <a href="/" className="text-center text-secondary"><span>Back to Home</span></a>
        <div className="card-footer text-center">
          <p className="mb-0">
            Don’t have an account?{" "}
            <Link to="/register" className="text-decoration-none" style={{color:"#f82249"}}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Login;