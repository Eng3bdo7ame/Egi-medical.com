import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../authSlice";
import authService from "../services/authService";

export const useRegister = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
	const [localError, setLocalError] = useState(null);

	const register = async (userData, rememberMe = true) => {
		dispatch(loginStart()); // Shared loading indicator
		setLocalError(null);
		try {
			const data = await authService.register(userData, rememberMe);
			dispatch(loginSuccess(data));
			return data;
		} catch (err) {
			const errorMsg = { en: err.message || "Failed to register", ar: err.message || "فشل إنشاء الحساب" };
			dispatch(loginFailure(errorMsg));
			setLocalError(errorMsg);
			throw err;
		}
	};

	return {
		register,
		loading,
		error: localError || error
	};
};

export default useRegister;
