import axios from "axios";
import * as SecureStore from "expo-secure-store";

// ✅ LIVE BACKEND - Ab IP ka chakkar khatam
export const BASE_URL = "https://baechat-2n1h.onrender.com";

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