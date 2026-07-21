import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion } from "framer-motion";
import { promoCards } from "./promo.data";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export const PromoSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Section bg="surface">
			<Container>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{promoCards.map((promo, index) => (
						<motion.div
							key={promo.id}
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
						>
							<LocalizedLink
								to={promo.link}
								className={cn(
									"group relative flex flex-col justify-between p-6 lg:p-8 rounded-[20px] overflow-hidden min-h-[220px] transition-all duration-300 hover:shadow-floating hover:scale-[1.02]",
									promo.bgClass
								)}
							>
								{/* Full Background Image */}
								<div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
									<img 
										src={promo.image} 
										alt="" 
										className="w-full h-full object-cover mix-blend-multiply opacity-70 transition-transform duration-500 group-hover:scale-105" 
									/>
									{/* Gradient overlay for readability */}
									<div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent rtl:bg-gradient-to-l" />
								</div>

								{/* Content */}
								<div className="relative z-10 flex flex-col items-start justify-center flex-grow max-w-[65%]">
									{promo.badge && (
										<span className={cn(
											"px-2 py-1 text-[10px] font-bold rounded-[4px] mb-3 inline-block tracking-wider", 
											promo.badgeClass
										)}>
											{promo.badge[language]}
										</span>
									)}
									<h3 className={cn("text-xl lg:text-2xl font-bold leading-tight mb-2", promo.textClass)}>
										{promo.title[language]}
									</h3>
									{promo.subtitle?.[language] && (
										<p className={cn("text-sm font-medium mb-5 opacity-80 leading-snug line-clamp-2", promo.textClass)}>
											{promo.subtitle[language]}
										</p>
									)}
									
									<span className={cn(
										"mt-auto px-5 py-2.5 text-sm font-bold rounded-lg transition-colors shadow-sm", 
										promo.btnClass,
										!promo.subtitle?.[language] && "mt-5"
									)}>
										{promo.buttonText[language]}
									</span>
								</div>
							</LocalizedLink>
						</motion.div>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default PromoSection;
