import axios from "axios";

// Two API URLs
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/api/user";
const API_URL_2 = "http://localhost:8080/api/user"; 

// Helper function to attempt requests on both APIs
const requestWithFallback = async (requestFunc: { (apiUrl: unknown): Promise<unknown> }) => {
  try {
    return await requestFunc(API_URL_1);  // Try the first API URL
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API 1 failed, trying API 2: ${error.message}`);
    } else {
      console.error('API 1 failed, trying API 2: Unknown error');
    }
    return await requestFunc(API_URL_2);  // Fallback to the second API URL
  }
};

export function login(userEmail: string, password: string) {
  return requestWithFallback((apiUrl) =>
    axios
      .post(`${apiUrl}/login`, { userEmail, password })
      .then((response) => {
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
