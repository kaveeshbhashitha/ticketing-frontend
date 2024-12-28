import axios from "axios";

const API_URL = "http://localhost:8080/user";

export function login(userEmail:string, password:string) {
  return axios
    .post(`${API_URL}/login`, { userEmail, password })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

export function register(firstName: string, lastName: string, userEmail: string, password: string) {
    return axios.post(`${API_URL}/register`, { firstName, lastName, userEmail, password });
}
  


