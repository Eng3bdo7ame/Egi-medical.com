import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { OTPInput, AuthFooter } from "@/features/auth";
import authApi from "@/features/auth/api/authApi";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export const VerifyOtp = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email") || "ahmed@example.com";

	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(60);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	// Count down timer
	useEffect(() => {
		let interval = null;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer(prev => prev - 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [timer]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (otp.length !== 4) {
			setError(isRtl ? "يرجى إدخال الرمز المكون من 4 أرقام كاملاً." : "Please enter the complete 4-digit code.");
			return;
		}

		setLoading(true);
		try {
			const res = await authApi.verifyOtp(email, otp);
			setSuccess(isRtl ? "تم التحقق من الرمز بنجاح!" : "Code verified successfully!");
			
			// Redirect to Reset Password page with mock token after 1.5s
			setTimeout(() => {
				navigate(`/${language}/auth/reset-password?token=${res.token}`);
			}, 1500);
		} catch (err) {
			setError(isRtl 
				? "الرمز غير صحيح. جرب 1234 للمحاكاة." 
				: "Invalid verification code. Try '1234' for mockup purposes.");
		} finally {
			setLoading(false);
		}
	};

	const handleResend = () => {
		setTimer(60);
		setOtp("");
		setError(null);
		setSuccess(isRtl ? "تم إعادة إرسال الرمز!" : "Verification code resent!");
		setTimeout(() => setSuccess(null), 3000);
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
			{/* Page Header */}
			<div className="flex flex-col gap-1.5 text-center sm:text-start">
				<h2 className="text-2xl sm:text-3xl font-black text-text">
					{isRtl ? "رمز التحقق OTP" : "Verify Code"}
				</h2>
				<p className="text-sm font-bold text-text-muted leading-relaxed">
					{isRtl 
						? `أدخل رمز الـ OTP المرسل إلى بريدك: ${email}` 
						: `Enter the verification code sent to: ${email}`}
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
					<span className="text-sm font-bold">{error}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
				
				<OTPInput length={4} value={otp} onChange={setOtp} />

				{/* Timer & Resend */}
				<div className="flex justify-center items-center text-xs font-bold mt-2">
					{timer > 0 ? (
						<span className="text-text-muted">
							{isRtl 
								? `إعادة إرسال الرمز خلال ${timer} ثانية` 
								: `Resend code in ${timer}s`}
						</span>
					) : (
						<button 
							type="button"
							onClick={handleResend}
							className="text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
						>
							<RotateCw className="w-3.5 h-3.5" />
							{isRtl ? "إعادة إرسال الرمز" : "Resend Code"}
						</button>
					)}
				</div>

				<button
					type="submit"
					disabled={loading}
					className="h-12 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
				>
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>{isRtl ? "جاري التحقق..." : "Verifying..."}</span>
						</>
					) : (
						<span>{isRtl ? "تأكيد الرمز" : "Verify Code"}</span>
					)}
				</button>
			</form>

			{/* Back Link */}
			<LocalizedLink 
				to="/auth/forgot-password" 
				className="flex items-center justify-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors mt-2"
			>
				<ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
				<span>{isRtl ? "العودة للخطوة السابقة" : "Go Back"}</span>
			</LocalizedLink>

			<AuthFooter />
		</div>
	);
};

export default VerifyOtp;
