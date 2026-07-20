import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../paths";

export const AuthGuard = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return <Outlet />;
};

export default AuthGuard;
