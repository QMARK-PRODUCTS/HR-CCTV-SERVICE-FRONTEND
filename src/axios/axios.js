import axios from "axios";
import { baseUrl } from "../utils/Endpoint";

const BASE_URL = baseUrl;

// Public Axios instance
export default axios.create({
  baseURL: BASE_URL,
});

// Private Axios instance with Authorization and Refresh Token Handling
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request Interceptor to attach Access Token
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor to handle Token Expiration & Refresh
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${BASE_URL}/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
        return axiosPrivate(originalRequest);
      } catch (err) {
        console.error("Refresh token expired, logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);
