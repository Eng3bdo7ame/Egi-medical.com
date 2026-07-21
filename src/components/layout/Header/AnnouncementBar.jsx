import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icon } from "@/components/ui/Icon";

/**
 * AnnouncementBar Component
 * Matches reference design exactly: Light background, Truck icon, Location, Hotline, Language, and Login.
 */
export const AnnouncementBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="w-full bg-surface-2 border-b border-divider text-text-secondary text-xs select-none">
			<Container>
				<div className="flex items-center justify-between py-2.5 gap-4">
					{/* Left: Shipping */}
					<div className="flex items-center gap-2 font-medium">
						<Icon name="Truck" size="sm" className="text-primary" />
						<span>
							{isRtl
								? "شحن مجاني للطلبات فوق 50 دولار"
								: "Free Shipping on orders over $50"}
						</span>
					</div>

					{/* Right: Location + Hotline + Language + Auth */}
					<div className="flex items-center gap-4 lg:gap-6">
						{/* Deliver To */}
						<div className="hidden lg:flex items-center gap-2 text-text-secondary">
							<Icon name="MapPin" size="sm" className="text-primary shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-text-muted font-normal">
									{isRtl ? "التوصيل إلى" : "Deliver to"}
								</span>
								<span className="font-semibold text-text">
									{isRtl ? "القاهرة، مصر" : "Cairo, Egypt"}
								</span>
							</div>
						</div>

						<span className="hidden lg:block w-px h-5 bg-divider" />

						{/* Hotline */}
						<a
							href="tel:01001234567"
							className="hidden lg:flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
						>
							<Icon name="Phone" size="sm" className="text-primary shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-text-muted font-normal">
									{isRtl ? "تحتاج مساعدة؟" : "Need Help?"}
								</span>
								<span className="font-semibold text-text">0100 123 4567</span>
							</div>
						</a>

						<span className="hidden lg:block w-px h-5 bg-divider" />

						{/* Language Switcher */}
						<LanguageSwitcher />

						<span className="hidden sm:block w-px h-5 bg-divider" />

						{/* Login / Register */}
						<LocalizedLink
							to="/auth/login"
							className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
						>
							<Icon name="User" size="sm" className="text-primary shrink-0" />
							<span className="hidden sm:inline">
								{isRtl ? "الدخول / التسجيل" : "Login / Register"}
							</span>
						</LocalizedLink>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default AnnouncementBar;
