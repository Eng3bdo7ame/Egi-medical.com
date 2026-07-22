import React from "react";
import { getPasswordStrength } from "../validation/authSchemas";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";

export const PasswordStrength = ({ password }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const strength = getPasswordStrength(password);

	const getStrengthText = () => {
		switch (strength) {
			case 1: return { en: "Weak", ar: "ضعيفة" };
			case 2: return { en: "Fair", ar: "متوسطة" };
			case 3: return { en: "Good", ar: "جيدة" };
			case 4: return { en: "Strong", ar: "قوية جداً" };
			default: return { en: "", ar: "" };
		}
	};

	const getStrengthColor = () => {
		switch (strength) {
			case 1: return "bg-danger";
			case 2: return "bg-warning";
			case 3: return "bg-info";
			case 4: return "bg-success";
			default: return "bg-border";
		}
	};

	if (!password) return null;

	return (
		<div className="flex flex-col gap-1 w-full">
			<div className="flex justify-between items-center text-[10px] font-bold text-text-muted">
				<span>{isRtl ? "قوة كلمة المرور:" : "Password Strength:"}</span>
				<span className={cn(
					strength === 1 && "text-danger",
					strength === 2 && "text-warning",
					strength === 3 && "text-info",
					strength === 4 && "text-success"
				)}>
					{getStrengthText()[language]}
				</span>
			</div>
			
			<div className="flex gap-1 h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
				{Array.from({ length: 4 }).map((_, idx) => (
					<div 
						key={idx}
						className={cn(
							"flex-1 h-full transition-all duration-300",
							idx < strength ? getStrengthColor() : "bg-border/40"
						)}
					/>
				))}
			</div>
		</div>
	);
};

export default PasswordStrength;
