import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { authValidators } from "@/features/auth/validation/authSchemas";
import authApi from "@/features/auth/api/authApi";
import { AuthFooter } from "@/features/auth";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const ForgotPassword = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const [emailFocused, setEmailFocused] = useState(false);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const emailErr = authValidators.email(email);
		if (emailErr) {
			setError(emailErr);
			return;
		}

		setLoading(true);
		try {
			await authApi.forgotPassword(email);
			setSuccess(isRtl ? "تم إرسال رمز التحقق بنجاح!" : "Verification code sent successfully!");
			
			// Redirect to Verify OTP page after 1.5s
			setTimeout(() => {
				navigate(`/${language}/auth/verify-otp?email=${encodeURIComponent(email)}`);
			}, 1500);
		} catch (err) {
			setError(isRtl 
				? { ar: "البريد الإلكتروني غير مسجل لدينا." } 
				: { en: "Email not found in our database." });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
			{/* Page Header */}
			<div className="flex flex-col gap-2 text-center sm:text-start">
				<h2 className="text-3xl sm:text-4xl font-black text-text tracking-tight">
					{isRtl ? "نسيت كلمة المرور؟" : "Forgot Password?"}
				</h2>
				<p className="text-sm font-semibold text-text-muted">
					{isRtl ? "أدخل بريدك الإلكتروني لإرسال رمز تأكيد الـ OTP" : "Enter your email to receive a verification code"}
				</p>
			</div>

			{/* Status Alerts */}
			{success && (
				<div className="p-4 bg-success/10 border border-success/30 rounded-2xl flex items-center gap-3 text-success animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-success/10">
					<CheckCircle2 className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{success}</span>
				</div>
			)}

			{error && (
				<div className="p-4 bg-danger/10 border border-danger/30 rounded-2xl flex items-center gap-3 text-danger animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-danger/10">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{error[language] || error}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
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
				</div>

				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-4 px-6 bg-gradient-to-r from-primary to-primary-hover hover:to-primary text-white font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/40 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 cursor-pointer overflow-hidden relative group"
				>
					<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl pointer-events-none" />
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin relative z-10" />
							<span className="relative z-10">{isRtl ? "جاري الإرسال..." : "Sending..."}</span>
						</>
					) : (
						<span className="relative z-10 tracking-wide">{isRtl ? "إرسال رمز التحقق" : "Send Reset Code"}</span>
					)}
				</button>
			</form>

			{/* Back Link */}
			<LocalizedLink 
				to="/auth/login" 
				className="flex items-center justify-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors mt-2"
			>
				<ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
				<span>{isRtl ? "العودة لتسجيل الدخول" : "Back to Sign In"}</span>
			</LocalizedLink>

			<AuthFooter />
		</div>
	);
};

export default ForgotPassword;
