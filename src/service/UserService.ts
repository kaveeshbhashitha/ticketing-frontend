import axios from "axios";

const API_URL = "http://localhost:8080";

interface LoginRequest {
  userEmail: string;
  password: string;
}

interface LoginResponse {
  status: string;
  data: string;
}

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/user/login`, credentials);
  return response.data;
};
