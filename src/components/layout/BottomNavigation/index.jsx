import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { Home, LayoutGrid, Search, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mobile Bottom Navigation Bar
 * Fixed at the bottom of the viewport on mobile devices (< xl screens)
 */
export const BottomNavigation = ({ className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const location = useLocation();
	const pathname = location.pathname;

	// Normalize pathname without language prefix (e.g. /ar/categories -> /categories, /ar -> /)
	const cleanPath = pathname.replace(new RegExp(`^/${language}(/|$)`), "$1") || "/";

	const navItems = [
		{
			id: "home",
			label: { ar: "الرئيسية", en: "Home" },
			icon: Home,
			to: "/",
			isActive: cleanPath === "/" || cleanPath === "",
		},
		{
			id: "categories",
			label: { ar: "الأقسام", en: "Categories" },
			icon: LayoutGrid,
			to: "/categories",
			isActive: cleanPath.startsWith("/categories") || cleanPath.startsWith("/category"),
		},
		{
			id: "search",
			label: { ar: "البحث", en: "Search" },
			icon: Search,
			to: "/products",
			isActive: cleanPath.startsWith("/products"),
		},
		{
			id: "contact",
			label: { ar: "تواصل معنا", en: "Contact Us" },
			icon: PhoneCall,
			to: "/contact",
			isActive: cleanPath.startsWith("/contact"),
		},
	];

	return (
		<nav
			aria-label={isRtl ? "التنقل السفلي للموبايل" : "Mobile bottom navigation"}
			className={cn(
				"fixed bottom-0 left-0 right-0 z-50 xl:hidden",
				"bg-surface/95 dark:bg-slate-900/95 backdrop-blur-md",
				"border-t border-border/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]",
				"pb-[env(safe-area-inset-bottom,0px)]",
				className
			)}
		>
			<div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1" dir={isRtl ? "rtl" : "ltr"}>
				{navItems.map((item, index) => {
					const Icon = item.icon;
					const isItemActive = item.isActive;
					const showDivider = index === 0 || index === 2;

					return (
						<React.Fragment key={item.id}>
							<LocalizedLink
								to={item.to}
								className={cn(
									"flex flex-col items-center justify-center flex-1 h-full py-1 px-1 transition-all duration-200 group relative select-none",
									isItemActive
										? "text-orange-500 font-extrabold"
										: "text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium"
								)}
							>
								<div className="relative flex items-center justify-center">
									<Icon
										className={cn(
											"w-5 h-5 transition-transform duration-200 group-hover:scale-110",
											isItemActive ? "stroke-[2.5px] scale-105" : "stroke-[1.8px]"
										)}
									/>
								</div>
								<span className="text-[11px] mt-1 tracking-tight leading-none whitespace-nowrap">
									{item.label[language] || item.label.en}
								</span>
							</LocalizedLink>

							{showDivider && (
								<div
									className="h-6 w-[1px] bg-border/60 self-center shrink-0 mx-0.5"
									aria-hidden="true"
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</nav>
	);
};

export default BottomNavigation;
