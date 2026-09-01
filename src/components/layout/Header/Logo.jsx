import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";

import { cn } from "@/lib/utils";

/**
 * Logo Component
 * Matches the reference design exactly: large blue text with a green '+' sign.
 * No box or extra icons.
 */
export const Logo = ({ className, imgClassName }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<LocalizedLink
			to="/"
			className={cn("flex items-center select-none group focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md outline-none shrink-0", className)}
			aria-label={isRtl ? "إيجي ميديكال - الصفحة الرئيسية" : "EGI Medical - Home"}
		>
			<img 
				src="/images/logo.jpeg" 
				alt="EGI Medical Logo" 
				className={cn("h-12 sm:h-16 w-auto object-contain rounded-md", imgClassName)}
			/>
		</LocalizedLink>
	);
};

export default Logo;
