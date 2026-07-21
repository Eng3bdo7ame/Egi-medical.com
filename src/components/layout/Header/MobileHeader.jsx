import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { navigationLinks } from "@/config/navigation";
import {
	Menu,
	X,
	Search,
	ShoppingCart,
	Heart,
	User,
	ChevronRight,
	Sun,
	Moon,
	Monitor,
	Globe,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import { useTheme } from "@/app/providers/ThemeProvider";
import { THEMES } from "@/constants/theme";
import { cn } from "@/lib/utils";

/**
 * MobileHeader Component
 * Mobile-first responsive header with:
 * - Hamburger menu toggle
 * - Centered logo
 * - Cart icon
 * - Full-screen slide-in drawer with navigation, search, switchers
 * Visible only on screens < md.
 * Supports RTL/LTR and Light/Dark.
 */

/** Arabic translations map */
const AR_NAV = {
	"Medical Devices": "الأجهزة الطبية",
	"Consumables": "المستلزمات الطبية",
	"Home Care": "الرعاية المنزلية",
	"Diagnostics": "أجهزة التشخيص",
	"Orthopedics": "العظام والحركة",
	"Brands": "الماركات",
	"Offers": "العروض",
};

export const MobileHeader = () => {
	const { language, toggleLanguage } = useLanguage();
	const { theme, toggleTheme } = useTheme();
	const isRtl = language === "ar";
	const [isOpen, setIsOpen] = useState(false);

	// Lock body scroll when drawer is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// Close on escape key
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	const close = useCallback(() => setIsOpen(false), []);

	const themeIcons = {
		[THEMES.LIGHT]: Sun,
		[THEMES.DARK]: Moon,
		[THEMES.SYSTEM]: Monitor,
	};
	const ThemeIcon = themeIcons[theme] || Monitor;

	return (
		<div className="w-full bg-surface border-b border-border md:hidden">
			<Container>
				<div className="flex items-center justify-between py-2.5 gap-3">
					{/* Menu Toggle */}
					<button
						onClick={() => setIsOpen(true)}
						className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
						aria-label={isRtl ? "فتح القائمة" : "Open menu"}
					>
						<Menu className="w-5 h-5" />
					</button>

					{/* Logo */}
					<Logo />

					{/* Right Actions */}
					<div className="flex items-center gap-0.5">
						<Link
							to="/cart"
							className="relative p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
							aria-label={isRtl ? "السلة" : "Cart"}
						>
							<ShoppingCart className="w-5 h-5" />
							<span className="absolute top-0.5 end-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-secondary text-white text-[10px] font-bold leading-none">
								2
							</span>
						</Link>
					</div>
				</div>
			</Container>

			{/* ── Drawer Overlay ── */}
			<div
				className={cn(
					"fixed inset-0 z-[var(--z-modal)] transition-opacity duration-200",
					isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				)}
			>
				{/* Backdrop */}
				<div className="absolute inset-0 bg-black/40" onClick={close} />

				{/* Drawer Panel */}
				<div
					className={cn(
						"absolute top-0 h-full w-[85%] max-w-sm bg-surface shadow-lg flex flex-col transition-transform duration-250 ease-out",
						isRtl ? "right-0" : "left-0",
						isOpen
							? "translate-x-0"
							: isRtl
								? "translate-x-full"
								: "-translate-x-full"
					)}
				>
					{/* Drawer Header */}
					<div className="flex items-center justify-between p-4 border-b border-border">
						<Logo />
						<button
							onClick={close}
							className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
							aria-label={isRtl ? "إغلاق" : "Close"}
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Drawer Search */}
					<div className="p-4 border-b border-border">
						<div className="flex items-center gap-2 bg-surface-2 rounded-lg px-3 py-2.5">
							<Search className="w-4 h-4 text-text-muted shrink-0" />
							<input
								type="search"
								placeholder={isRtl ? "ابحث عن المنتجات..." : "Search products..."}
								className="flex-1 bg-transparent text-sm outline-none text-text placeholder:text-text-muted/60"
							/>
						</div>
					</div>

					{/* Drawer Navigation */}
					<nav className="flex-1 overflow-y-auto py-2" aria-label="Mobile navigation">
						{navigationLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								onClick={close}
								className="flex items-center justify-between px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
							>
								<span>{isRtl ? (AR_NAV[link.name] || link.name) : link.name}</span>
								<ChevronRight className={cn("w-4 h-4 opacity-40", isRtl && "rotate-180")} />
							</Link>
						))}
					</nav>

					{/* Drawer Footer — Switchers & Actions */}
					<div className="p-4 border-t border-border space-y-3">
						{/* Quick Actions Row */}
						<div className="flex items-center gap-2">
							<Link
								to="/wishlist"
								onClick={close}
								className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-2 text-text-secondary hover:text-primary text-xs font-medium transition-colors"
							>
								<Heart className="w-3.5 h-3.5" />
								{isRtl ? "المفضلة" : "Wishlist"}
							</Link>
							<Link
								to="/profile"
								onClick={close}
								className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-2 text-text-secondary hover:text-primary text-xs font-medium transition-colors"
							>
								<User className="w-3.5 h-3.5" />
								{isRtl ? "حسابي" : "Account"}
							</Link>
						</div>

						{/* Language & Theme Row */}
						<div className="flex items-center gap-2">
							<button
								onClick={toggleLanguage}
								className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-2 text-text-secondary hover:text-primary text-xs font-medium transition-colors cursor-pointer"
							>
								<Globe className="w-3.5 h-3.5" />
								{isRtl ? "English" : "العربية"}
							</button>
							<button
								onClick={toggleTheme}
								className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-2 text-text-secondary hover:text-primary text-xs font-medium transition-colors cursor-pointer"
							>
								<ThemeIcon className="w-3.5 h-3.5" />
								{theme === "dark" ? (isRtl ? "داكن" : "Dark") : theme === "light" ? (isRtl ? "فاتح" : "Light") : (isRtl ? "النظام" : "System")}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileHeader;
