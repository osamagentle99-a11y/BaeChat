import axios from "axios";
import * as SecureStore from "expo-secure-store";

// ⚠️ YAHAN APNA LAPTOP IP DAALO - ipconfig se milega
export const BASE_URL = "http://192.168.100.140:5000";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;