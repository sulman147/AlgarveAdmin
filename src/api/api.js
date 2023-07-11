import axios from "axios";

// Create a new Axios instance with a custom configuration

const token = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: 'http://2algarve.site:5000/', // Replace with your base URL
  timeout: 5000, // Request timeout in milliseconds (optional)
  headers: {
    'Content-Type': 'application/json', // Example of setting a default header
    // Add any other default headers you need
    Authorization: `Bearer ${token}`,
  },
});

export default api;