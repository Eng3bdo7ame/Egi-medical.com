// Simulated API calls for Auth endpoints to enable interactive frontend behavior
import { api } from "@/services/api/client";

// Toggle true if you have a running backend server
const USE_MOCK = true;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
	login: async (credentials) => {
		if (USE_MOCK) {
			await delay(800);
			// Standard mock credentials
			if (credentials.email === "ahmed@example.com" && credentials.password === "Password123") {
				return {
					user: {
						id: "user-1",
						name: "Ahmed Mohamed",
						email: "ahmed@example.com",
						role: "user",
						permissions: ["view_profile", "place_order"]
					},
					token: "mock-jwt-access-token",
					refreshToken: "mock-jwt-refresh-token"
				};
			}
			throw new Error("INVALID_CREDENTIALS");
		}
		return api.post("/auth/login", credentials);
	},

	register: async (userData) => {
		if (USE_MOCK) {
			await delay(1000);
			return {
				user: {
					id: "user-" + Date.now(),
					name: userData.name,
					email: userData.email,
					role: userData.role || "user",
					permissions: ["view_profile", "place_order"]
				},
				token: "mock-jwt-access-token",
				refreshToken: "mock-jwt-refresh-token"
			};
		}
		return api.post("/auth/register", userData);
	},

	forgotPassword: async (email) => {
		if (USE_MOCK) {
			await delay(600);
			if (email === "ahmed@example.com") {
				return { success: true, message: "OTP sent to email." };
			}
			throw new Error("EMAIL_NOT_FOUND");
		}
		return api.post("/auth/forgot-password", { email });
	},

	verifyOtp: async (email, otp) => {
		if (USE_MOCK) {
			await delay(600);
			if (otp === "1234") {
				return { success: true, token: "mock-otp-verified-token" };
			}
			throw new Error("INVALID_OTP");
		}
		return api.post("/auth/verify-otp", { email, otp });
	},

	resetPassword: async (token, newPassword) => {
		if (USE_MOCK) {
			await delay(800);
			return { success: true, message: "Password reset successfully." };
		}
		return api.post("/auth/reset-password", { token, newPassword });
	},

	refreshToken: async (token) => {
		if (USE_MOCK) {
			await delay(300);
			return {
				token: "new-mock-jwt-access-token",
				refreshToken: "new-mock-jwt-refresh-token"
			};
		}
		return api.post("/auth/refresh-token", { refreshToken: token });
	},

	logout: async () => {
		if (USE_MOCK) {
			await delay(400);
			return { success: true };
		}
		return api.post("/auth/logout");
	}
};

export default authApi;
