import { useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { setCredentials } from "../authSlice";
import authService from "../services/authService";
import { AUTH_ERRORS } from "../constants/authConstants";

export const useLogin = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const login = async (email, password, rememberMe = true) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.login({ email, password }, rememberMe);
			dispatch(setCredentials({ user: data.user, accessToken: data.token }));
			setLoading(false);
			return data;
		} catch (err) {
			const errorMsg = AUTH_ERRORS[err.message] || { en: err.message || "Failed to log in", ar: err.message || "فشل تسجيل الدخول" };
			setError(errorMsg);
			setLoading(false);
			throw err;
		}
	};

	return {
		login,
		loading,
		error
	};
};

export default useLogin;
