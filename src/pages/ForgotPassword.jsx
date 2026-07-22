import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { authValidators } from "@/features/auth/validation/authSchemas";
import authApi from "@/features/auth/api/authApi";
import { AuthFooter } from "@/features/auth";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const ForgotPassword = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

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
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
			{/* Page Header */}
			<div className="flex flex-col gap-1.5 text-center sm:text-start">
				<h2 className="text-2xl sm:text-3xl font-black text-text">
					{isRtl ? "نسيت كلمة المرور؟" : "Forgot Password?"}
				</h2>
				<p className="text-sm font-bold text-text-muted">
					{isRtl ? "أدخل بريدك الإلكتروني لإرسال رمز تأكيد الـ OTP" : "Enter your email to receive a verification code"}
				</p>
			</div>

			{/* Status Alerts */}
			{success && (
				<div className="p-4 bg-success/5 border border-success/20 rounded-xl flex items-center gap-3 text-success">
					<CheckCircle2 className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{success}</span>
				</div>
			)}

			{error && (
				<div className="p-4 bg-danger/5 border border-danger/20 rounded-xl flex items-center gap-3 text-danger">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{error[language] || error}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
				</div>

				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-4 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
				>
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>{isRtl ? "جاري الإرسال..." : "Sending..."}</span>
						</>
					) : (
						<span>{isRtl ? "إرسال رمز التحقق" : "Send Reset Code"}</span>
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
