import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Stack from "@/components/ui/Stack";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export const TopBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="w-full bg-surface-2 border-b border-border/10 text-xs py-1.5 text-text-secondary select-none transition-colors duration-normal hidden md:block">
			<Container>
				<Stack direction="row" align="center" justify="between" gap={4}>
					{/* Left: Contact and Location */}
					<Stack direction="row" align="center" gap={4}>
						<div className="flex items-center gap-1.5">
							<span>📍</span>
							<span>{isRtl ? "موقع التوصيل: مصر" : "Deliver to: Egypt"}</span>
						</div>
						<span className="opacity-30">|</span>
						<div className="flex items-center gap-1.5">
							<span>✉️</span>
							<a href="mailto:support@mootah.com" className="hover:text-primary transition-colors">
								support@mootah.com
							</a>
						</div>
					</Stack>

					{/* Right: Switchers */}
					<Stack direction="row" align="center" gap={3}>
						<LanguageSwitcher />
						<span className="opacity-30">|</span>
						<ThemeSwitcher />
					</Stack>
				</Stack>
			</Container>
		</div>
	);
};

export default TopBar;
