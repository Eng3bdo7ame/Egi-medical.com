import React from "react";
import { Link } from "react-router-dom";
import { navigationLinks } from "@/config/navigation";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Stack from "@/components/ui/Stack";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="w-full bg-surface border-b border-border/10 py-3 transition-colors duration-normal hidden lg:block">
			<Container>
				<Stack direction="row" align="center" justify="between" gap={4}>
					{/* Left: Main Navigation Categories & Links */}
					<Stack direction="row" align="center" gap={6}>
						{/* All Categories Button (Placeholder) */}
						<Button variant="outline" size="sm" className="gap-2">
							☰ {isRtl ? "كل الأقسام" : "All Categories"}
						</Button>

						{/* Links */}
						<nav className="flex items-center gap-6">
							{navigationLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									className="text-text-secondary hover:text-primary font-medium text-sm transition-colors duration-fast"
								>
									{isRtl ? getArabicName(link.name) : link.name}
								</Link>
							))}
						</nav>
					</Stack>

					{/* Right: Promotion Quick Link */}
					<div className="hidden xl:block">
						<Link
							to="/products?filter=offers"
							className="text-xs font-bold text-secondary hover:opacity-90 transition-opacity"
						>
							{isRtl ? "⚡ عروض التصفية الكبرى" : "⚡ Super Clearance Offers"}
						</Link>
					</div>
				</Stack>
			</Container>
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

export default Navigation;
