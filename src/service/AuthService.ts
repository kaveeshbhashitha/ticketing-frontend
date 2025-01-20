import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

export function login(userEmail:string, password:string) {
  return axios
    .post(`${API_URL}/login`, { userEmail, password })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify({ email: userEmail, token: response.data.token }));
        console.log("Login successful:", response.data);
      }
      return response.data;
    });
}

// export async function login(email: string, password: string) {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     const token = response.data.token;
//     const userEmail = response.data.email;

//     localStorage.setItem("user", JSON.stringify(userEmail));
//     localStorage.setItem("token", token);

//     console.log("Login successful:", userEmail);
//     return { token, email: userEmail };

//   } catch (error) {
//     console.error("Login failed:", error);
//     throw error;
//   }
// }

export function register(firstName: string, lastName: string, userEmail: string, password: string) {
    return axios.post(`${API_URL}/register`, { firstName, lastName, userEmail, password });
}

export const logout = async () => {
  return await axios.post(`${API_URL}/logout`);
};

export function passwordRecovery(userEmail: string) {
  return axios.post(`${API_URL}/send-code`, { userEmail, });
}

export function updatePassword(userEmail: string, newPassword: string) {
  return axios.post(`${API_URL}/update-password`, null, {
    params: {
      userEmail,
      newPassword,
    },
  });
}


