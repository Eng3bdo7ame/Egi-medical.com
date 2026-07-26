import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useLogin, PasswordField, RememberMe, SocialLoginButton, AuthFooter } from "@/features/auth";
import { authValidators } from "@/features/auth/validation/authSchemas";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
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
	
	// Focus states for input animation
	const [emailFocused, setEmailFocused] = useState(false);

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
		<div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
			{/* Page Header */}
			<div className="flex flex-col gap-2 text-center sm:text-start">
				<h2 className="text-3xl sm:text-4xl font-black text-text tracking-tight">
					{isRtl ? "مرحباً بك مجدداً 👋" : "Welcome Back 👋"}
				</h2>
				<p className="text-sm font-semibold text-text-muted">
					{isRtl ? "قم بتسجيل الدخول للوصول إلى حسابك الطبي" : "Sign in to access your medical account"}
				</p>
			</div>

			{/* Status Alerts */}
			{successMessage && (
				<div className="p-4 bg-success/10 border border-success/30 rounded-2xl flex items-center gap-3 text-success animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-success/10">
					<CheckCircle2 className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{successMessage}</span>
				</div>
			)}

			{errorMessage && (
				<div className="p-4 bg-danger/10 border border-danger/30 rounded-2xl flex items-center gap-3 text-danger animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-danger/10">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{errorMessage}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
				{/* Email */}
				<div className="flex flex-col gap-1.5 w-full">
					<label className="text-xs font-bold text-text-secondary select-none">
						{isRtl ? "البريد الإلكتروني" : "Email Address"}
					</label>
					<div className={cn(
						"relative w-full h-12 bg-surface-2 border rounded-xl flex items-center overflow-hidden transition-all duration-300",
						emailFocused ? "border-primary ring-2 ring-primary/20 shadow-sm shadow-primary/10" : "border-border/80 hover:border-primary/50"
					)}>
						<div className="absolute left-4 text-text-muted flex items-center justify-center pointer-events-none">
							<Mail className={cn("w-5 h-5 transition-colors duration-300", emailFocused && "text-primary")} />
						</div>
						<input 
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setEmailFocused(true)}
							onBlur={() => setEmailFocused(false)}
							placeholder="name@example.com"
							className="w-full h-full bg-transparent outline-none ps-12 pe-4 text-sm font-semibold text-text placeholder:text-text-muted/50"
							dir="ltr"
							required
						/>
					</div>
					{errors.email && (
						<span className="text-xs text-danger font-semibold animate-in fade-in slide-in-from-top-1">{errors.email[language]}</span>
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
				<div className="flex items-center justify-between gap-4 mt-1">
					<RememberMe checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
					<LocalizedLink 
						to="/auth/forgot-password" 
						className="text-xs font-bold text-primary hover:text-primary-hover hover:underline transition-colors cursor-pointer"
					>
						{isRtl ? "نسيت كلمة المرور؟" : "Forgot Password?"}
					</LocalizedLink>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-2 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 cursor-pointer overflow-hidden relative group"
				>
					<div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl pointer-events-none" />
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin relative z-10" />
							<span className="relative z-10">{isRtl ? "جاري التحميل..." : "Loading..."}</span>
						</>
					) : (
						<span className="relative z-10 tracking-wide">{isRtl ? "تسجيل الدخول" : "Sign In"}</span>
					)}
				</button>
			</form>

			{/* Divider */}
			<div className="flex items-center gap-4 text-xs font-bold text-text-muted">
				<span className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
				<span className="bg-surface/50 px-2 rounded-full backdrop-blur-sm">{isRtl ? "أو" : "OR"}</span>
				<span className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-transparent opacity-50" />
			</div>

			{/* Social login */}
			<SocialLoginButton onClick={handleSocialLogin} />

			{/* Link to Register */}
			<p className="text-center text-sm font-bold text-text-secondary">
				{isRtl ? "ليس لديك حساب؟ " : "Don't have an account? "}
				<LocalizedLink to="/auth/register" className="text-primary hover:text-primary-hover hover:underline font-black transition-colors">
					{isRtl ? "سجل الآن" : "Sign Up"}
				</LocalizedLink>
			</p>

			<AuthFooter />
		</div>
	);
};

export default Login;
