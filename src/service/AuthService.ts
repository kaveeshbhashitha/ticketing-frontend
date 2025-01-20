import axios from "axios";

// Two API URLs
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/user";
const API_URL_2 = "http://localhost:8080/user";  // Replace with the second API URL

// Helper function to attempt requests on both APIs
const requestWithFallback = async (requestFunc: { (apiUrl: any): Promise<any> }) => {
  try {
    return await requestFunc(API_URL_1);  // Try the first API URL
  } catch (error) {
    console.error(`API 1 failed, trying API 2: ${(error as any).message}`);
    return await requestFunc(API_URL_2);  // Fallback to the second API URL
  }
};

export function login(userEmail: string, password: string) {
  return requestWithFallback((apiUrl) =>
    axios
      .post(`${apiUrl}/login`, { userEmail, password })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(userEmail));
        }
        return response.data;
      })
  );
}

export function register(firstName: string, lastName: string, userEmail: string, password: string) {
  return requestWithFallback((apiUrl) =>
    axios.post(`${apiUrl}/register`, { firstName, lastName, userEmail, password })
  );
}

export const logout = async () => {
  return await requestWithFallback((apiUrl) => axios.post(`${apiUrl}/logout`));
};

export function passwordRecovery(userEmail: string) {
  return requestWithFallback((apiUrl) =>
    axios.post(`${apiUrl}/send-code`, { userEmail })
  );
}

export function updatePassword(userEmail: string, newPassword: string) {
  return requestWithFallback((apiUrl) =>
    axios.post(`${apiUrl}/update-password`, null, {
      params: {
        userEmail,
        newPassword,
      },
    })
  );
}
