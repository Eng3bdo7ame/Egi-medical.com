import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { navigationLinks } from "@/config/navigation";
import Container from "@/components/ui/Container";
import Stack from "@/components/ui/Stack";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export const MobileHeader = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<div className="w-full bg-surface border-b border-border/10 py-3 transition-colors duration-normal md:hidden relative z-sticky">
			<Container>
				<Stack direction="row" align="center" justify="between" gap={4}>
					{/* Toggle Drawer Button */}
					<Button variant="ghost" size="icon-sm" onClick={toggleMenu} aria-label="Toggle Navigation Menu">
						{menuOpen ? "✕" : "☰"}
					</Button>

					{/* Center: Logo */}
					<Logo />

					{/* Right: Cart indicator */}
					<Button variant="ghost" size="icon-sm" className="relative" aria-label="Cart">
						🛒
						<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-background text-[10px] font-bold">
							0
						</span>
					</Button>
				</Stack>
			</Container>

			{/* Mobile Drawer Overlay */}
			{menuOpen && (
				<div className="absolute top-full left-0 w-full bg-surface border-b border-border/10 shadow-lg animate-fadeIn flex flex-col p-4 space-y-4">
					{/* Switchers Row */}
					<Stack direction="row" align="center" justify="between" className="bg-surface-2 p-2 rounded-md">
						<span className="text-xs font-semibold text-text-secondary">
							{isRtl ? "الإعدادات:" : "Settings:"}
						</span>
						<Stack direction="row" align="center" gap={3}>
							<LanguageSwitcher />
							<span className="opacity-20">|</span>
							<ThemeSwitcher />
						</Stack>
					</Stack>

					{/* Navigation Links */}
					<nav className="flex flex-col space-y-3">
						{navigationLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								onClick={() => setMenuOpen(false)}
								className="text-text-secondary hover:text-primary font-medium text-sm py-2 border-b border-border/5"
							>
								{isRtl ? getArabicName(link.name) : link.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</div>
	);
};

// Simple translator helper for navigation links
const getArabicName = (name) => {
	const translations = {
		"Medical Devices": "الأجهزة الطبية",
		"Consumables": "المستلزمات الطبية",
		"Home Care": "الرعاية المنزلية",
		"Diagnostics": "أجهزة التشخيص",
		"Orthopedics": "العظام ومساعدات الحركة",
		"Brands": "الماركات التجارية",
		"Offers": "العروض والخصومات",
	};
	return translations[name] || name;
};

export default MobileHeader;
