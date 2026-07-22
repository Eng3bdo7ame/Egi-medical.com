import authApi from "../api/authApi";
import authStorage from "../storage/authStorage";

export const authService = {
	login: async (credentials, rememberMe = true) => {
		try {
			const data = await authApi.login(credentials);
			authStorage.clearAll();
			authStorage.setRememberMe(rememberMe);
			authStorage.setAccessToken(data.token, rememberMe);
			authStorage.setRefreshToken(data.refreshToken, rememberMe);
			authStorage.setUser(data.user, rememberMe);
			return data;
		} catch (error) {
			throw error;
		}
	},

	register: async (userData, rememberMe = true) => {
		try {
			const data = await authApi.register(userData);
			authStorage.clearAll();
			authStorage.setRememberMe(rememberMe);
			authStorage.setAccessToken(data.token, rememberMe);
			authStorage.setRefreshToken(data.refreshToken, rememberMe);
			authStorage.setUser(data.user, rememberMe);
			return data;
		} catch (error) {
			throw error;
		}
	},

	forgotPassword: async (email) => {
		try {
			return await authApi.forgotPassword(email);
		} catch (error) {
			throw error;
		}
	},

	verifyOtp: async (email, otp) => {
		try {
			return await authApi.verifyOtp(email, otp);
		} catch (error) {
			throw error;
		}
	},

	resetPassword: async (token, newPassword) => {
		try {
			return await authApi.resetPassword(token, newPassword);
		} catch (error) {
			throw error;
		}
	},

	refreshAccessToken: async () => {
		try {
			const rToken = authStorage.getRefreshToken();
			if (!rToken) throw new Error("No refresh token found");
			
			const data = await authApi.refreshToken(rToken);
			const rememberMe = authStorage.getRememberMe();
			authStorage.setAccessToken(data.token, rememberMe);
			authStorage.setRefreshToken(data.refreshToken, rememberMe);
			return data.token;
		} catch (error) {
			authStorage.clearAll();
			throw error;
		}
	},

	logout: async () => {
		try {
			await authApi.logout();
		} catch (e) {
			// Ignore network issues on logout
		} finally {
			authStorage.clearAll();
		}
	}
};

export default authService;
