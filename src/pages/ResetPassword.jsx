import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { PasswordField, PasswordStrength, AuthFooter } from "@/features/auth";
import { authValidators } from "@/features/auth/validation/authSchemas";
import authApi from "@/features/auth/api/authApi";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const ResetPassword = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") || "mock-token";

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	
	const [errors, setErrors] = useState({});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setError(null);
		setSuccess(null);

		const passErr = authValidators.password(password);
		let confirmPassErr = null;
		if (password !== confirmPassword) {
			confirmPassErr = { en: "Passwords do not match.", ar: "كلمتا المرور غير متطابقتين." };
		}

		if (passErr || confirmPassErr) {
			setErrors({
				password: passErr,
				confirmPassword: confirmPassErr
			});
			return;
		}

		setLoading(true);
		try {
			await authApi.resetPassword(token, password);
			setSuccess(isRtl ? "تم تغيير كلمة المرور بنجاح!" : "Password reset successfully!");
			
			// Redirect to Login page after 1.5s
			setTimeout(() => {
				navigate(`/${language}/auth/login`);
			}, 1500);
		} catch (err) {
			setError(isRtl ? "فشل تعديل كلمة المرور. حاول مرة أخرى." : "Failed to reset password.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
			{/* Page Header */}
			<div className="flex flex-col gap-1.5 text-center sm:text-start">
				<h2 className="text-2xl sm:text-3xl font-black text-text">
					{isRtl ? "إنشاء كلمة مرور جديدة" : "Reset Password"}
				</h2>
				<p className="text-sm font-bold text-text-muted">
					{isRtl ? "أدخل كلمة المرور الجديدة لحسابك" : "Create a new strong password for your account"}
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
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
				
				{/* New Password */}
				<PasswordField 
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="••••••••"
					label={isRtl ? "كلمة المرور الجديدة" : "New Password"}
					error={errors.password}
				/>

				{/* Password Strength Indicator */}
				<PasswordStrength password={password} />

				{/* Confirm New Password */}
				<PasswordField 
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					placeholder="••••••••"
					label={isRtl ? "تأكيد كلمة المرور" : "Confirm New Password"}
					error={errors.confirmPassword}
					required={true}
				/>

				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-4 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
				>
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>{isRtl ? "جاري التغيير..." : "Resetting..."}</span>
						</>
					) : (
						<span>{isRtl ? "حفظ كلمة المرور" : "Reset Password"}</span>
					)}
				</button>
			</form>

			<AuthFooter />
		</div>
	);
};

export default ResetPassword;
