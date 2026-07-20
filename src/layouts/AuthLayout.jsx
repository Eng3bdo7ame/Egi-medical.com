import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
	return (
		<div className="min-h-screen flex flex-col bg-background text-text transition-colors">
			<div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-2xl shadow-lg border border-muted/10">
					{/* Logo & Header */}
					<div className="text-center">
						<img
							className="mx-auto h-12 w-auto"
							src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
							alt="EG-Medical Logo"
						/>
						<h2 className="mt-6 text-3xl font-extrabold text-primary">
							EG-Medical
						</h2>
					</div>

					{/* Children Content */}
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
