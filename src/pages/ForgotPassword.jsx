const ForgotPassword = () => {
	return (
		<div className="space-y-4">
			<h3 className="text-xl font-bold text-center text-text">Reset Password</h3>
			<p className="text-sm text-center text-muted">We will send reset link to your email</p>
			{/* Placeholder Form */}
			<div className="space-y-3 pt-4">
				<div className="space-y-1">
					<label className="text-xs font-semibold text-muted">Email Address</label>
					<input
						type="email"
						placeholder="name@example.com"
						className="w-full px-4 py-2 text-sm rounded-lg bg-background border border-muted/20 focus:border-primary outline-none text-text transition-colors"
					/>
				</div>
				<button className="w-full py-2.5 bg-primary text-background font-bold text-sm rounded-lg hover:opacity-90 transition-all cursor-pointer">
					Send Reset Link
				</button>
			</div>
		</div>
	);
};

export default ForgotPassword;
