import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
	const { language, toggleLanguage } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={toggleLanguage}
			className="text-xs font-bold font-mono tracking-wider hover:bg-surface-2 transition-colors duration-fast"
			aria-label={isRtl ? "Switch to English" : "تغيير اللغة للعربية"}
		>
			{isRtl ? "EN" : "عربي"}
		</Button>
	);
};

export default LanguageSwitcher;
