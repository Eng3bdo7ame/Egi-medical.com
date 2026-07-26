import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";

export const setupInterceptors = (axiosInstance) => {
	// Request interceptor to attach authentication token
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = storage.get(STORAGE_KEYS.AUTH_TOKEN, null);
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
		(response) => response.data, // Strip the axios config/headers wrapper automatically
		(error) => {
			if (error.response && error.response.status === 401) {
				storage.remove(STORAGE_KEYS.AUTH_TOKEN);
				storage.remove(STORAGE_KEYS.USER);
				
				const isLoginRequest = error.config?.url?.includes("/login");
				const isLoginPage = window.location.pathname.includes("/auth/login");
				
				if (!isLoginRequest && !isLoginPage) {
					const pathParts = window.location.pathname.split("/");
					const lang = pathParts[1] || "ar";
					window.location.href = `/${lang}/auth/login`;
				}
			}
			
			// Normalize API Error for Phase 13
			return Promise.reject(error.response?.data || { message: error.message, errors: {} });
		}
	);
};
