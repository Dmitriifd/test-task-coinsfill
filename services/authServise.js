import axios from 'axios';

const API_URL = 'https://test-task.test211.workers.dev';

export const baseApi = axios.create({ baseURL: API_URL });

const register = async (userData) => {
  try {
    const response = await baseApi.post(`${API_URL}/user`, userData);

    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

const login = async (userData) => {
  try {
    const response = await baseApi.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

const authService = {
  register,
  login,
};

export default authService;
