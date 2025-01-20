import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json", // Ensure JSON content type
  },
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser?.token;

      // Add the token to the Authorization header if it exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    console.log("Axios Request Config:", config);
    return config; // Pass the config to the request
  },
  (error) => {
    // Handle request error
    console.error("Request Error:", error);
    return Promise.reject(error); // Propagate the error
  }
);

export default AxiosInstance;
