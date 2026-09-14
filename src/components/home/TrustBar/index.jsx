import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Award, ShieldCheck, Tag, Headphones, Truck } from "lucide-react";

export const TrustBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const features = [
		{
			id: "experience",
			icon: Award,
			title: { en: "Long Experience", ar: "خبرة طويلة" },
			desc: { en: "More than 15 years", ar: "أكثر من 15 سنة" }
		},
		{
			id: "quality",
			icon: ShieldCheck,
			title: { en: "Guaranteed Quality", ar: "جودة مضمونة" },
			desc: { en: "International standards", ar: "معايير عالمية" }
		},
		{
			id: "prices",
			icon: Tag,
			title: { en: "Competitive Prices", ar: "أسعار تنافسية" },
			desc: { en: "Best value", ar: "أفضل قيمة" }
		},
		{
			id: "support",
			icon: Headphones,
			title: { en: "Technical Support", ar: "دعم فني" },
			desc: { en: "After-sales service", ar: "خدمة ما بعد البيع" }
		},
		{
			id: "delivery",
			icon: Truck,
			title: { en: "Fast Delivery", ar: "توصيل سريع" },
			desc: { en: "To all governorates", ar: "لكل المحافظات" }
		}
	];

	return (
		<Section spacing="none" className="py-4 sm:py-6 lg:py-4">
			<Container>
				<div className="bg-[#021d49] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-8 shadow-xl">
					<div className="flex lg:grid lg:grid-cols-5 overflow-x-auto lg:overflow-visible gap-4 sm:gap-5 lg:gap-4 items-center pb-2 lg:pb-0 scroll-smooth snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_rgba(255,255,255,0.1)]">
						{features.map((feat) => {
							const Icon = feat.icon;
							return (
								<div
									key={feat.id}
									className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 min-w-max lg:min-w-0 snap-start"
									dir={isRtl ? "rtl" : "ltr"}
								>
									{/* Icon on the right for RTL, left for LTR */}
									<div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
										<Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
									</div>
									<div className="flex flex-col text-start">
										<span className="text-xs sm:text-sm lg:text-base font-bold leading-tight transition-colors duration-300 group-hover:text-blue-100 whitespace-nowrap lg:whitespace-normal">
											{feat.title[language]}
										</span>
										<span className="text-[10px] sm:text-xs lg:text-sm text-white/70 font-medium mt-0.5 sm:mt-1 whitespace-nowrap lg:whitespace-normal">
											{feat.desc[language]}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default TrustBar;
