import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Stack from "@/components/ui/Stack";

export const AnnouncementBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="w-full bg-secondary text-background py-2 text-xs font-semibold select-none transition-colors duration-normal">
			<Container>
				<Stack direction="row" align="center" justify="between" gap={4}>
					{/* Left: Official Distributor Message */}
					<div className="text-center sm:text-start flex-1 sm:flex-none">
						{isRtl 
							? "🚚 الموزع الرسمي للماركات الطبية العالمية في مصر" 
							: "🚚 Official Distributor of Global Medical Brands in Egypt"}
					</div>

					{/* Right: Location, Hotline, Language */}
					<Stack direction="row" align="center" gap={4} className="hidden md:flex">
						{/* Location */}
						<div className="flex items-center gap-1">
							<span>📍</span>
							<span>{isRtl ? "القاهرة" : "Cairo"}</span>
						</div>

						<span className="opacity-40">|</span>

						{/* Hotline */}
						<a href="tel:19999" className="hover:opacity-90 transition-opacity">
							{isRtl ? "📞 الخط الساخن: 19999" : "📞 Hotline: 19999"}
						</a>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
};

export default AnnouncementBar;
