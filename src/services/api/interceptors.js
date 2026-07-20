import { STORAGE_KEYS } from "@/constants/storage";

export const setupInterceptors = (axiosInstance) => {
	// Request interceptor to attach authentication token
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Response interceptor to handle global errors (e.g. 401 Unauthorized)
	axiosInstance.interceptors.response.use(
		(response) => response.data,
		(error) => {
			if (error.response && error.response.status === 401) {
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
				localStorage.removeItem(STORAGE_KEYS.USER);
				window.location.href = "/auth/login";
			}
			return Promise.reject(error.response?.data || error.message);
		}
	);
};
