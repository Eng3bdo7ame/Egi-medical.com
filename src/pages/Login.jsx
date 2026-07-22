import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useLogin, PasswordField, RememberMe, SocialLoginButton, AuthFooter } from "@/features/auth";
import { authValidators } from "@/features/auth/validation/authSchemas";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Login = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const location = useLocation();
	const { login, loading } = useLogin();

	// Inputs
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(true);

	// Errors & UI states
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setErrorMessage(null);
		setSuccessMessage(null);

		// Validate email
		const emailErr = authValidators.email(email);
		const passErr = authValidators.password(password);
		if (emailErr || passErr) {
			setErrors({
				email: emailErr,
				password: passErr
			});
			return;
		}

		try {
			await login(email, password, rememberMe);
			setSuccessMessage(isRtl ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
			
			// Redirect back to original route or home page after 1.5s
			setTimeout(() => {
				const from = location.state?.from?.pathname || `/${language}`;
				navigate(from, { replace: true });
			}, 1500);
		} catch (err) {
			// Extract mapped error
			if (err.message === "INVALID_CREDENTIALS") {
				setErrorMessage(isRtl 
					? "البريد الإلكتروني أو كلمة المرور غير صحيحة." 
					: "Invalid email or password. Please try again.");
			} else {
				setErrorMessage(isRtl ? "حدث خطأ غير متوقع. حاول مرة أخرى." : "An unexpected error occurred.");
			}
		}
	};

	const handleSocialLogin = () => {
		setSuccessMessage(isRtl ? "تسجيل الدخول عبر Google..." : "Signing in with Google...");
		setTimeout(() => {
			navigate(`/${language}`, { replace: true });
		}, 1500);
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
			{/* Page Header */}
			<div className="flex flex-col gap-1.5 text-center sm:text-start">
				<h2 className="text-2xl sm:text-3xl font-black text-text">
					{isRtl ? "تسجيل الدخول" : "Welcome Back"}
				</h2>
				<p className="text-sm font-bold text-text-muted">
					{isRtl ? "أهلاً بك مجدداً في منصة EG Medical" : "Sign in to access your medical account"}
				</p>
			</div>

			{/* Status Alerts */}
			{successMessage && (
				<div className="p-4 bg-success/5 border border-success/20 rounded-xl flex items-center gap-3 text-success">
					<CheckCircle2 className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{successMessage}</span>
				</div>
			)}

			{errorMessage && (
				<div className="p-4 bg-danger/5 border border-danger/20 rounded-xl flex items-center gap-3 text-danger">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{errorMessage}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
				{/* Email */}
				<div className="flex flex-col gap-1.5">
					<label className="text-xs font-bold text-text-secondary select-none">
						{isRtl ? "البريد الإلكتروني" : "Email Address"}
					</label>
					<input 
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="name@example.com"
						className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold text-left"
						dir="ltr"
						required
					/>
					{errors.email && (
						<span className="text-xs text-danger font-semibold">{errors.email[language]}</span>
					)}
				</div>

				{/* Password */}
				<PasswordField 
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="••••••••"
					label={isRtl ? "كلمة المرور" : "Password"}
					error={errors.password}
				/>

				{/* Remember Me & Forgot Password Link */}
				<div className="flex items-center justify-between gap-4 mt-2">
					<RememberMe checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
					<LocalizedLink 
						to="/auth/forgot-password" 
						className="text-xs font-bold text-primary hover:underline hover:text-primary-hover transition-colors"
					>
						{isRtl ? "نسيت كلمة المرور؟" : "Forgot Password?"}
					</LocalizedLink>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-4 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
				>
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>{isRtl ? "جاري التحميل..." : "Loading..."}</span>
						</>
					) : (
						<span>{isRtl ? "تسجيل الدخول" : "Sign In"}</span>
					)}
				</button>
			</form>

			{/* Divider */}
			<div className="flex items-center gap-4 text-xs font-bold text-text-muted my-2">
				<span className="flex-1 h-px bg-border/40" />
				<span>{isRtl ? "أو" : "OR"}</span>
				<span className="flex-1 h-px bg-border/40" />
			</div>

			{/* Social login */}
			<SocialLoginButton onClick={handleSocialLogin} />

			{/* Link to Register */}
			<p className="text-center text-sm font-bold text-text-secondary mt-2">
				{isRtl ? "ليس لديك حساب؟ " : "Don't have an account? "}
				<LocalizedLink to="/auth/register" className="text-primary hover:underline font-extrabold">
					{isRtl ? "سجل الآن" : "Sign Up"}
				</LocalizedLink>
			</p>

			<AuthFooter />
		</div>
	);
};

export default Login;
