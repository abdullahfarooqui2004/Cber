import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
    timeout: 100000,
});

