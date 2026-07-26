import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useRegister, PasswordField, PasswordStrength, AuthFooter } from "@/features/auth";
import { authValidators } from "@/features/auth/validation/authSchemas";
import { AlertCircle, CheckCircle2, Loader2, User, Mail, Phone, Briefcase, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
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
	const [countryCode, setCountryCode] = useState("+20"); // Egypt default
	const [role, setRole] = useState(""); // Default empty
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agreeToTerms, setAgreeToTerms] = useState(true);

	// Errors & messages
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	// Focus states for input animations
	const [nameFocused, setNameFocused] = useState(false);
	const [emailFocused, setEmailFocused] = useState(false);
	const [phoneFocused, setPhoneFocused] = useState(false);
	const [roleFocused, setRoleFocused] = useState(false);
	
	// Custom Select Dropdown State
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

	const roles = [
		{ value: "user", label: { en: "Patient / Customer", ar: "مريض / مشتري عادي" } },
		{ value: "doctor", label: { en: "Doctor / Practitioner", ar: "طبيب ممارس" } },
		{ value: "distributor", label: { en: "Distributor / Hospital", ar: "مستودع / مستشفى" } }
	];

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setErrorMessage(null);
		setSuccessMessage(null);

		if (!agreeToTerms) {
			setErrorMessage(isRtl 
				? "يجب الموافقة على الشروط والأحكام للمتابعة." 
				: "You must agree to the terms and conditions to proceed.");
			return;
		}

		if (!role) {
			setErrors(prev => ({ ...prev, role: { en: "Please select an account type.", ar: "يرجى اختيار نوع الحساب." } }));
			return;
		}

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
			const fullPhoneNumber = `${countryCode}${phone}`;
			await register({ name, email, phone: fullPhoneNumber, role, password });
			setSuccessMessage(isRtl ? "تم إنشاء الحساب بنجاح! جاري تحويلك لتأكيد الحساب..." : "Account created successfully! Redirecting for confirmation...");
			
			setTimeout(() => {
				navigate(`/${language}/auth/verify-otp?email=${encodeURIComponent(email)}`);
			}, 1500);
		} catch (err) {
			setErrorMessage(isRtl ? "فشل إنشاء الحساب. حاول مرة أخرى." : "Registration failed.");
		}
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
			
			{/* Half-Merged Top Badge */}
			<div className={cn(
				"absolute -top-12 sm:-top-14 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg shadow-blue-500/20 select-none",
				isRtl ? "left-0 sm:left-4" : "right-0 sm:right-4"
			)}>
				<ShieldCheck className="w-3.5 h-3.5" />
				<span>{isRtl ? "تسجيل سريع وآمن" : "Fast & Secure Sign Up"}</span>
			</div>

			{/* Page Header */}
			<div className="flex flex-col gap-2 text-center sm:text-start mt-2">
				<h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
					{isRtl ? "إنشاء حساب جديد" : "Create New Account"}
				</h2>
				<p className="text-xs font-semibold text-slate-400">
					{isRtl ? "خطوة واحدة تفصلك عن تجربة صحية أفضل" : "One step away from a better health experience"}
				</p>
			</div>

			{/* 3-Step Progress Indicator */}
			<div className="flex items-center justify-between max-w-md mx-auto w-full py-2 select-none relative" dir={isRtl ? "rtl" : "ltr"}>
				{/* Step 1 */}
				<div className="flex flex-col items-center gap-1.5 z-10">
					<div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-lg shadow-blue-500/40 ring-4 ring-blue-500/10">
						1
					</div>
					<span className="text-[10px] font-black text-blue-400">
						{isRtl ? "بياناتك الأساسية" : "Basic Info"}
					</span>
				</div>

				{/* Connector Line 1 */}
				<div className="flex-1 h-px border-t border-dashed border-slate-700/80 mx-2 -mt-4" />

				{/* Step 2 */}
				<div className="flex flex-col items-center gap-1.5 z-10">
					<div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-extrabold text-xs flex items-center justify-center">
						2
					</div>
					<span className="text-[10px] font-black text-slate-500">
						{isRtl ? "تأكيد الحساب" : "Confirmation"}
					</span>
				</div>

				{/* Connector Line 2 */}
				<div className="flex-1 h-px border-t border-dashed border-slate-700/80 mx-2 -mt-4" />

				{/* Step 3 */}
				<div className="flex flex-col items-center gap-1.5 z-10">
					<div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-extrabold text-xs flex items-center justify-center">
						3
					</div>
					<span className="text-[10px] font-black text-slate-500">
						{isRtl ? "تم بنجاح" : "Success"}
					</span>
				</div>
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
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-5" dir={isRtl ? "rtl" : "ltr"}>
				
				{/* Row 1: Full Name & Email (Order swapped: Full Name first) */}
				<div className="flex flex-col sm:flex-row gap-5">
					
					{/* Full Name Input */}
					<div className="relative flex-1">
						<div className={cn(
							"relative w-full h-[52px] bg-[#0b1329]/40 border rounded-xl flex items-center transition-all duration-300",
							nameFocused ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10" : "border-slate-800 hover:border-slate-700",
							errors.name && "border-red-500"
						)}>
							<label className={cn(
								"absolute -top-2.5 px-2 text-[10px] font-extrabold text-slate-400 bg-[#0b1329] select-none pointer-events-none transition-colors",
								isRtl ? "right-3" : "left-3",
								nameFocused && "text-blue-400"
							)}>
								{isRtl ? "الاسم الكامل" : "Full Name"}
							</label>
							<div className={cn("absolute text-slate-400 pointer-events-none", isRtl ? "right-4" : "left-4")}>
								<User className={cn("w-4.5 h-4.5", nameFocused && "text-blue-500")} />
							</div>
							<input 
								type="text"
								value={name}
								onChange={e => setName(e.target.value)}
								onFocus={() => setNameFocused(true)}
								onBlur={() => setNameFocused(false)}
								placeholder={isRtl ? "أدخل اسمك الكامل" : "Enter your full name"}
								className={cn(
									"w-full h-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-slate-500/60",
									isRtl ? "text-right pr-12 pl-4" : "text-left pl-12 pr-4"
								)}
								required
							/>
						</div>
						{errors.name && (
							<span className="text-xs text-red-500 font-semibold mt-1 block px-1">{errors.name[language]}</span>
						)}
					</div>

					{/* Email Input (Always LTR inside) */}
					<div className="relative flex-1">
						<div className={cn(
							"relative w-full h-[52px] bg-[#0b1329]/40 border rounded-xl flex items-center transition-all duration-300",
							emailFocused ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10" : "border-slate-800 hover:border-slate-700",
							errors.email && "border-red-500"
						)}>
							<label className={cn(
								"absolute -top-2.5 px-2 text-[10px] font-extrabold text-slate-400 bg-[#0b1329] select-none pointer-events-none transition-colors",
								isRtl ? "right-3" : "left-3",
								emailFocused && "text-blue-400"
							)}>
								{isRtl ? "البريد الإلكتروني" : "Email Address"}
							</label>
							<div className="absolute left-4 text-slate-400 pointer-events-none">
								<Mail className={cn("w-4.5 h-4.5", emailFocused && "text-blue-500")} />
							</div>
							<input 
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								onFocus={() => setEmailFocused(true)}
								onBlur={() => setEmailFocused(false)}
								placeholder="name@example.com"
								className="w-full h-full bg-transparent outline-none pl-12 pr-4 text-sm font-semibold text-white placeholder:text-slate-500/60 text-left"
								dir="ltr"
								required
							/>
						</div>
						{errors.email && (
							<span className="text-xs text-red-500 font-semibold mt-1 block px-1">{errors.email[language]}</span>
						)}
					</div>

				</div>

				{/* Row 2: Phone Number & Account Type (Order swapped: Phone Number first) */}
				<div className="flex flex-col sm:flex-row gap-5">
					
					{/* Phone Number Input with code flag selector */}
					<div className="relative flex-1">
						<div className={cn(
							"relative w-full h-[52px] bg-[#0b1329]/40 border rounded-xl flex items-center transition-all duration-300",
							phoneFocused ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10" : "border-slate-800 hover:border-slate-700",
							errors.phone && "border-red-500"
						)}>
							<label className={cn(
								"absolute -top-2.5 px-2 text-[10px] font-extrabold text-slate-400 bg-[#0b1329] select-none pointer-events-none transition-colors",
								isRtl ? "right-3" : "left-3",
								phoneFocused && "text-blue-400"
							)}>
								{isRtl ? "رقم الهاتف" : "Phone Number"}
							</label>

							{/* Flag dropdown */}
							<div className="absolute left-3 flex items-center gap-1 select-none pr-2 border-e border-slate-800/80 h-1/2">
								<span className="text-base">🇪🇬</span>
								<span className="text-xs font-bold text-slate-300" dir="ltr">{countryCode}</span>
							</div>

							<div className={cn("absolute text-slate-400 pointer-events-none", isRtl ? "right-4" : "right-4")}>
								<Phone className={cn("w-4.5 h-4.5", phoneFocused && "text-blue-500")} />
							</div>
							
							<input 
								type="tel"
								value={phone}
								onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} // Only digits
								onFocus={() => phoneFocused ? null : setPhoneFocused(true)}
								onBlur={() => setPhoneFocused(false)}
								placeholder={isRtl ? "أدخل رقم هاتفك" : "Enter your phone number"}
								className={cn(
									"w-full h-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-slate-500/60 text-left",
									"pl-20 pr-12 rtl:placeholder:text-right"
								)}
								dir="ltr"
								required
							/>
						</div>
						{errors.phone && (
							<span className="text-xs text-red-500 font-semibold mt-1 block px-1">{errors.phone[language]}</span>
						)}
					</div>

					{/* Account Type (Custom Dropdown) */}
					<div className="relative flex-1">
						<div className={cn(
							"relative w-full h-[52px] bg-[#0b1329]/40 border rounded-xl flex items-center transition-all duration-300 cursor-pointer select-none",
							roleFocused ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10" : "border-slate-800 hover:border-slate-700",
							errors.role && "border-red-500"
						)}
							onClick={() => {
								setRoleDropdownOpen(!roleDropdownOpen);
								setRoleFocused(true);
							}}
							onBlur={() => {
								setTimeout(() => {
									setRoleDropdownOpen(false);
									setRoleFocused(false);
								}, 200);
							}}
							tabIndex={0}
						>
							<label className={cn(
								"absolute -top-2.5 px-2 text-[10px] font-extrabold text-slate-400 bg-[#0b1329] select-none pointer-events-none transition-colors",
								isRtl ? "right-3" : "left-3",
								roleFocused && "text-blue-400"
							)}>
								{isRtl ? "نوع الحساب" : "Account Type"}
							</label>
							<div className={cn("absolute text-slate-400 pointer-events-none", isRtl ? "right-4" : "left-4")}>
								<Briefcase className={cn("w-4.5 h-4.5", roleFocused && "text-blue-500")} />
							</div>
							
							<div className={cn(
								"text-sm font-semibold text-white px-4 flex-1",
								isRtl ? "text-right pr-12 pl-10" : "text-left pl-12 pr-10"
							)}>
								{role ? roles.find(r => r.value === role)?.label[language] : (isRtl ? "اختر نوع الحساب" : "Select account type")}
							</div>

							<div className={cn("absolute text-slate-400 transition-transform", isRtl ? "left-4" : "right-4", roleDropdownOpen && "rotate-180")}>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
							</div>
						</div>

						{/* Custom dropdown elements */}
						{roleDropdownOpen && (
							<div className="absolute top-[58px] left-0 w-full bg-[#0b1329] border border-slate-800 rounded-xl shadow-xl z-55 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
								{roles.map(r => (
									<div 
										key={r.value}
										onClick={() => {
											setRole(r.value);
											setRoleDropdownOpen(false);
										}}
										className={cn(
											"px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors",
											role === r.value && "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
										)}
									>
										{r.label[language]}
									</div>
								))}
							</div>
						)}

						{errors.role && (
							<span className="text-xs text-red-500 font-semibold mt-1 block px-1">{errors.role[language]}</span>
						)}
					</div>

				</div>

				{/* Row 3: Password Field */}
				<div className="flex flex-col gap-1 w-full">
					<PasswordField 
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder={isRtl ? "إنشاء كلمة مرور قوية" : "Create strong password"}
						label={isRtl ? "كلمة المرور" : "Password"}
						error={errors.password}
					/>
					{/* Password Strength Indicator */}
					<PasswordStrength password={password} />
				</div>

				{/* Row 4: Confirm Password Field */}
				<PasswordField 
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					placeholder={isRtl ? "أعد إدخال كلمة المرور" : "Confirm password"}
					label={isRtl ? "تأكيد كلمة المرور" : "Confirm Password"}
					error={errors.confirmPassword}
					required={true}
				/>

				{/* Agreement Checkbox */}
				<label className="flex items-start sm:items-center gap-3 mt-1 select-none cursor-pointer group">
					<div className="relative flex items-center justify-center mt-0.5 sm:mt-0 shrink-0">
						<input 
							type="checkbox"
							checked={agreeToTerms}
							onChange={(e) => setAgreeToTerms(e.target.checked)}
							className="sr-only peer"
						/>
						<div className="w-5 h-5 rounded-[6px] border border-slate-800 bg-[#0b1329]/40 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center shadow-md shadow-black/10 group-hover:border-blue-500">
							{agreeToTerms && (
								<svg className="w-3.5 h-3.5 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
								</svg>
							)}
						</div>
					</div>
					<span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
						{isRtl ? (
							<>
								أوافق على{" "}
								<LocalizedLink to="/terms" className="text-blue-400 hover:underline">الشروط والأحكام</LocalizedLink>
								{" "}و{" "}
								<LocalizedLink to="/privacy" className="text-blue-400 hover:underline">سياسة الخصوصية</LocalizedLink>
							</>
						) : (
							<>
								I agree to the{" "}
								<LocalizedLink to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</LocalizedLink>
								{" "}and{" "}
								<LocalizedLink to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</LocalizedLink>
							</>
						)}
					</span>
				</label>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-2 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-between active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 cursor-pointer overflow-hidden relative group"
				>
					{/* Arrow icon (Left in RTL, Right in LTR) */}
					{isRtl ? (
						<ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
					) : (
						<div className="w-5 h-5" /> // Spacer for alignment
					)}

					{loading ? (
						<div className="flex items-center gap-2">
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>{isRtl ? "جاري الإنشاء..." : "Creating..."}</span>
						</div>
					) : (
						<span className="tracking-wide">{isRtl ? "إنشاء حساب" : "Create Account"}</span>
					)}

					{isRtl ? (
						<div className="w-5 h-5" /> // Spacer
					) : (
						<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
					)}
				</button>
			</form>

			{/* Divider */}
			<div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 mt-2">
				<span className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
				<span>{isRtl ? "أو استمر باستخدام" : "Or continue with"}</span>
				<span className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-800 to-transparent" />
			</div>

			{/* Social login grid */}
			<div className="grid grid-cols-3 gap-3 mt-1 select-none">
				{/* Google */}
				<button 
					type="button" 
					className="h-11 bg-slate-950/40 border border-slate-800/80 hover:bg-slate-900/60 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
				>
					<svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
						<path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.42 7.5l3.86 3C6.22 7.39 8.89 5.04 12 5.04z" />
						<path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.45c-.28 1.48-1.11 2.73-2.37 3.58v2.98h3.84c2.24-2.06 3.57-5.09 3.57-8.66z" />
						<path fill="#FBBC05" d="M5.28 14.5c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.42 7.1C.51 8.92 0 10.94 0 13s.51 4.08 1.42 5.9l3.86-3.4z" />
						<path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.84-2.98c-1.07.72-2.44 1.15-4.12 1.15-3.11 0-5.78-2.35-6.72-5.46L1.42 16.2C3.37 20.35 7.35 23 12 23z" />
					</svg>
					<span className="hidden sm:inline-block text-xs font-bold text-slate-300">Google</span>
				</button>

				{/* Apple */}
				<button 
					type="button" 
					className="h-11 bg-slate-950/40 border border-slate-800/80 hover:bg-slate-900/60 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
				>
					<svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.15.67-2.87 1.51-.62.71-1.16 1.86-1.01 2.98 1.1.09 2.22-.62 2.89-1.43z"/>
					</svg>
					<span className="hidden sm:inline-block text-xs font-bold text-slate-300">Apple</span>
				</button>

				{/* Facebook */}
				<button 
					type="button" 
					className="h-11 bg-slate-950/40 border border-slate-800/80 hover:bg-slate-900/60 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
				>
					<svg className="w-4.5 h-4.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
					<span className="hidden sm:inline-block text-xs font-bold text-slate-300">Facebook</span>
				</button>
			</div>

			{/* Link to Login */}
			<p className="text-center text-sm font-bold text-slate-400 mt-2">
				{isRtl ? "لديك حساب بالفعل؟ " : "Already have an account? "}
				<LocalizedLink to="/auth/login" className="text-blue-400 hover:text-blue-300 hover:underline font-black transition-colors">
					{isRtl ? "تسجيل الدخول" : "Sign In"}
				</LocalizedLink>
			</p>
		</div>
	);
};

export default Register;
