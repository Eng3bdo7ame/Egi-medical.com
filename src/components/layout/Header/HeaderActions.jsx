import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Button } from "@/components/ui/button";

export const HeaderActions = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex items-center gap-1">
			{/* Compare Button */}
			<Button variant="ghost" size="icon-sm" title={isRtl ? "مقارنة المنتجات" : "Compare Products"}>
				🔄
			</Button>

			{/* Wishlist Button */}
			<Button variant="ghost" size="icon-sm" title={isRtl ? "المفضلة" : "Wishlist"}>
				❤️
			</Button>

			{/* Cart Button */}
			<Button variant="ghost" size="icon-sm" className="relative" title={isRtl ? "سلة المشتريات" : "Shopping Cart"}>
				🛒
				<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-background text-[10px] font-bold">
					0
				</span>
			</Button>

			{/* Account Button */}
			<Button variant="ghost" size="icon-sm" title={isRtl ? "حسابي" : "My Account"}>
				👤
			</Button>
		</div>
	);
};

export default HeaderActions;
