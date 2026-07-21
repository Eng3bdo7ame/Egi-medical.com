import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * Logo Component
 * Matches the reference design exactly: large blue text with a green '+' sign.
 * No box or extra icons.
 */
export const Logo = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Link
			to="/"
			className="flex items-center select-none group focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md outline-none shrink-0"
			aria-label={isRtl ? "مؤتة كير - الصفحة الرئيسية" : "Mootah Care - Home"}
		>
			<span className="text-[28px] font-bold tracking-tight text-primary">
				MootahCare
				<span className="text-accent text-[32px] font-black relative leading-none -top-0.5 ms-0.5">+</span>
			</span>
		</Link>
	);
};

export default Logo;
