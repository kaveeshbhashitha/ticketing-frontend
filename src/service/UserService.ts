import axios from "axios";

const API_URL = "http://localhost:8080";

interface Response {
  status: string;
  data: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  userEmail: string;
  password: string;
}

export const login = async (user: { userEmail: string; password: string; }) => { 
  const response = await axios.post(`${API_URL}/user/login`, user); 
  return response.data; 
};


export const registerUser = async (userData: RegisterRequest): Promise<Response> => {
  const response = await axios.post<Response>(`${API_URL}/user/register`, userData);
  return response.data;
};
