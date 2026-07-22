import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useRegister, PasswordField, PasswordStrength, AuthFooter } from "@/features/auth";
import { authValidators } from "@/features/auth/validation/authSchemas";
import { AlertCircle, CheckCircle2, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Register = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const { register, loading } = useRegister();

	// Form Inputs
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("user"); // user, doctor, distributor
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Errors & messages
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setErrorMessage(null);
		setSuccessMessage(null);

		// Client side validation
		const nameErr = authValidators.name(name);
		const emailErr = authValidators.email(email);
		const phoneErr = authValidators.phone(phone);
		const passErr = authValidators.password(password);
		
		let confirmPassErr = null;
		if (password !== confirmPassword) {
			confirmPassErr = { en: "Passwords do not match.", ar: "كلمتا المرور غير متطابقتين." };
		}

		if (nameErr || emailErr || phoneErr || passErr || confirmPassErr) {
			setErrors({
				name: nameErr,
				email: emailErr,
				phone: phoneErr,
				password: passErr,
				confirmPassword: confirmPassErr
			});
			return;
		}

		try {
			await register({ name, email, phone, role, password });
			setSuccessMessage(isRtl ? "تم إنشاء حسابك وتأكيده بنجاح!" : "Account created successfully!");
			
			setTimeout(() => {
				navigate(`/${language}`, { replace: true });
			}, 1500);
		} catch (err) {
			setErrorMessage(isRtl ? "فشل إنشاء الحساب. حاول مرة أخرى." : "Registration failed.");
		}
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
			{/* Page Header */}
			<div className="flex flex-col gap-1.5 text-center sm:text-start">
				<h2 className="text-2xl sm:text-3xl font-black text-text">
					{isRtl ? "إنشاء حساب جديد" : "Create Account"}
				</h2>
				<p className="text-sm font-bold text-text-muted">
					{isRtl ? "انضم لعائلة MootahCare+ الطبية الآن" : "Join Egypt's leading healthcare platform"}
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
				
				{/* Full Name */}
				<div className="flex flex-col gap-1.5">
					<label className="text-xs font-bold text-text-secondary select-none">
						{isRtl ? "الاسم الكامل" : "Full Name"}
					</label>
					<input 
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder={isRtl ? "أحمد محمد" : "e.g. John Doe"}
						className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold"
						required
					/>
					{errors.name && (
						<span className="text-xs text-danger font-semibold">{errors.name[language]}</span>
					)}
				</div>

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

				{/* Phone */}
				<div className="flex flex-col gap-1.5">
					<label className="text-xs font-bold text-text-secondary select-none">
						{isRtl ? "رقم الهاتف" : "Phone Number"}
					</label>
					<input 
						type="tel"
						value={phone}
						onChange={e => setPhone(e.target.value)}
						placeholder="0100 123 4567"
						className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold text-left"
						dir="ltr"
						required
					/>
					{errors.phone && (
						<span className="text-xs text-danger font-semibold">{errors.phone[language]}</span>
					)}
				</div>

				{/* Role / Account Type */}
				<div className="flex flex-col gap-1.5">
					<label className="text-xs font-bold text-text-secondary select-none">
						{isRtl ? "نوع الحساب" : "Account Type"}
					</label>
					<select 
						value={role}
						onChange={e => setRole(e.target.value)}
						className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold cursor-pointer"
					>
						<option value="user">{isRtl ? "مريض / مشتري عادي" : "Patient / Customer"}</option>
						<option value="doctor">{isRtl ? "طبيب ممارس" : "Doctor / Practitioner"}</option>
						<option value="distributor">{isRtl ? "مستودع / مستشفى" : "Distributor / Hospital"}</option>
					</select>
				</div>

				{/* Password */}
				<PasswordField 
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="••••••••"
					label={isRtl ? "كلمة المرور" : "Password"}
					error={errors.password}
				/>

				{/* Password Strength Indicator */}
				<PasswordStrength password={password} />

				{/* Confirm Password */}
				<PasswordField 
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					placeholder="••••••••"
					label={isRtl ? "تأكيد كلمة المرور" : "Confirm Password"}
					error={errors.confirmPassword}
					required={true}
				/>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-4 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
				>
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>{isRtl ? "جاري الإنشاء..." : "Creating Account..."}</span>
						</>
					) : (
						<span>{isRtl ? "إنشاء الحساب" : "Sign Up"}</span>
					)}
				</button>
			</form>

			{/* Link to Login */}
			<p className="text-center text-sm font-bold text-text-secondary mt-2">
				{isRtl ? "لديك حساب بالفعل؟ " : "Already have an account? "}
				<LocalizedLink to="/auth/login" className="text-primary hover:underline font-extrabold">
					{isRtl ? "سجل الدخول" : "Sign In"}
				</LocalizedLink>
			</p>

			<AuthFooter />
		</div>
	);
};

export default Register;
