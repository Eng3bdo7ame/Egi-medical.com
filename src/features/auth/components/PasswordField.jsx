import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const PasswordField = ({ value, onChange, placeholder, label, error, required = true }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex flex-col gap-1.5 w-full">
			{label && (
				<label className="text-xs font-bold text-text-secondary select-none">
					{label}
				</label>
			)}
			<div className="relative w-full">
				<input
					type={showPassword ? "text" : "password"}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					className="w-full h-12 ps-4 pe-12 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold text-left"
					dir="ltr"
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors p-1"
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
				</button>
			</div>
			{error && (
				<span className="text-xs text-danger font-semibold">
					{error[language] || error}
				</span>
			)}
		</div>
	);
};

export default PasswordField;
