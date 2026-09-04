import axios from "axios";

// Create an Axios instance with the backend API base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor that runs before every request
api.interceptors.request.use((config) => {
    
    // Get the authentication token stored in the browser's localStorage
    const token = localStorage.getItem("token");

    // If a token exists, add it to the Authorization header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;