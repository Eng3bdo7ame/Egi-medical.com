import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../authSlice";
import authService from "../services/authService";
import { AUTH_ERRORS } from "../constants/authConstants";

export const useLogin = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
	const [localError, setLocalError] = useState(null);

	const login = async (email, password, rememberMe = true) => {
		dispatch(loginStart());
		setLocalError(null);
		try {
			const data = await authService.login({ email, password }, rememberMe);
			dispatch(loginSuccess(data));
			return data;
		} catch (err) {
			const errorMsg = AUTH_ERRORS[err.message] || { en: err.message || "Failed to log in", ar: err.message || "فشل تسجيل الدخول" };
			dispatch(loginFailure(errorMsg));
			setLocalError(errorMsg);
			throw err;
		}
	};

	return {
		login,
		loading,
		error: localError || error
	};
};

export default useLogin;
