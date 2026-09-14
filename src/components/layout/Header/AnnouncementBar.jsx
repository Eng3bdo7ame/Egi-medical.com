import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icon } from "@/components/ui/Icon";
import { useSelector } from "react-redux";
import { useLogout } from "@/features/auth";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/queries/useSettings";

/**
 * AnnouncementBar Component
 * Matches reference design exactly: Light background, Truck icon, Location, Hotline, Language, and Login.
 */
export const AnnouncementBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { logout } = useLogout();
	const { data: settings } = useSettings();

	const phone = settings?.phone || "01203036736";
	// Formatted phone: replace spaces/special characters or format for display if needed
	const formattedPhone = phone;

	return (
		<div className="w-full bg-[#021d49] border-b border-white/10 text-white/90 text-xs select-none relative z-[110]">
			<Container>
				<div className="flex items-center justify-between py-2 gap-4">
					{/* Left: Why Choose Us Announcement */}
					<div className="flex items-center gap-2 font-medium text-white/80">
						<Icon name="ShieldCheck" size="sm" className="text-orange-400 shrink-0" />
						<span className="line-clamp-1">
							{settings?.why_choose_us?.subtitle || settings?.why_choose_us?.title || (isRtl
								? "نحن نضع معايير جديدة للموثوقية والأمان في توفير المستلزمات والأجهزة الطبية"
								: "We set new standards of reliability and safety in providing medical supplies")}
						</span>
					</div>

					{/* Right: Location + Hotline + Language + Auth */}
					<div className="flex items-center gap-3 lg:gap-5">
						{/* Deliver To */}
						<div className="hidden lg:flex items-center gap-2 text-white/80">
							<Icon name="MapPin" size="sm" className="text-orange-400 shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-white/60 font-normal">
									{isRtl ? "التوصيل إلى" : "Deliver to"}
								</span>
								<span className="font-semibold text-white">
									{isRtl ? "القاهرة، مصر" : "Cairo, Egypt"}
								</span>
							</div>
						</div>

						<span className="hidden lg:block w-px h-4 bg-white/20" />

						{/* Hotline */}
						<a
							href={`tel:${phone}`}
							className="hidden lg:flex items-center gap-2 text-white/80 hover:text-orange-300 transition-colors"
						>
							<Icon name="Phone" size="sm" className="text-orange-400 shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-white/60 font-normal">
									{isRtl ? "تحتاج مساعدة؟" : "Need Help?"}
								</span>
								<span className="font-semibold text-white">{formattedPhone}</span>
							</div>
						</a>

						<span className="hidden lg:block w-px h-4 bg-white/20" />

						{/* Language Switcher */}
						<LanguageSwitcher variant="announcement" />

						<span className="hidden sm:block w-px h-4 bg-white/20" />

						{/* Login / Register or Profile */}
						{isAuthenticated ? (
							<div className="relative group z-50">
								<LocalizedLink
									to="/account"
									className="flex items-center gap-2 font-bold text-white hover:text-orange-300 transition-colors py-1"
								>
									<Icon name="User" size="sm" className="text-orange-400 shrink-0" />
									<span className="hidden sm:inline">
										{user?.name || (isRtl ? "حسابي" : "My Account")}
									</span>
								</LocalizedLink>

								{/* Dropdown Menu */}
								<div className={cn(
									"absolute top-full opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 w-48 bg-surface border border-border rounded-xl shadow-lg shadow-black/10 overflow-hidden flex flex-col z-[100]",
									isRtl ? "left-0" : "right-0"
								)}>
									<div className="p-3 border-b border-border/50">
										<p className="text-xs font-bold text-text truncate">{user?.name}</p>
										<p className="text-[10px] text-text-muted truncate">{user?.email || user?.phone}</p>
									</div>
									<div className="flex flex-col p-1">
										<LocalizedLink to="/account?tab=overview" className="flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-xs font-semibold">
											<Icon name="User" size="sm" />
											{isRtl ? "الملف الشخصي" : "Profile"}
										</LocalizedLink>
										<LocalizedLink to="/account?tab=orders" className="flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-xs font-semibold">
											<Icon name="Package" size="sm" />
											{isRtl ? "الطلبات" : "Orders"}
										</LocalizedLink>
										<LocalizedLink to="/account?tab=wishlist" className="flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-xs font-semibold">
											<Icon name="Heart" size="sm" />
											{isRtl ? "المفضلة" : "Wishlist"}
										</LocalizedLink>
									</div>
									<div className="p-1 border-t border-border/50">
										<button 
											onClick={() => logout()} 
											className="flex w-full items-center gap-2 p-2 hover:bg-danger/10 text-danger rounded-lg transition-colors text-xs font-bold cursor-pointer"
										>
											<Icon name="LogOut" size="sm" />
											{isRtl ? "تسجيل الخروج" : "Logout"}
										</button>
									</div>
								</div>
							</div>
						) : (
							<LocalizedLink
								to="/auth/login"
								className="flex items-center gap-2 font-medium text-white/90 hover:text-orange-300 transition-colors"
							>
								<Icon name="User" size="sm" className="text-orange-400 shrink-0" />
								<span className="hidden sm:inline">
									{isRtl ? "الدخول / التسجيل" : "Login / Register"}
								</span>
							</LocalizedLink>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default AnnouncementBar;
