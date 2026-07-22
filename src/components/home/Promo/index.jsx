import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { promoCards } from "./promo.data";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export const PromoSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Duplicate cards to ensure loop works smoothly even with only 3 items
	const displayCards = [...promoCards, ...promoCards];

	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			align: "center",
			direction: isRtl ? "rtl" : "ltr",
			dragFree: true,
		},
		[Autoplay({ delay: 5000, stopOnInteraction: true })]
	);

	return (
		<Section bg="surface" className="overflow-hidden">
			<Container>
				<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
							{displayCards.map((promo, index) => (
								<div
									key={promo.id + index}
									className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_32%] lg:flex-[0_0_30%] xl:flex-[0_0_28%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0 py-4"
								>
									<motion.div
										initial={{ opacity: 0, y: 15 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-50px" }}
										transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
										className="h-full"
									>
										<LocalizedLink
											to={promo.link}
											className={cn(
												"group relative flex flex-col justify-center p-6 lg:p-8 rounded-3xl overflow-hidden min-h-[250px] sm:min-h-[280px] h-full transition-all duration-500 hover:shadow-floating hover:-translate-y-1",
												promo.bgClass
											)}
										>
											{/* Full Background Image */}
											<div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
												<img
													src={promo.image}
													alt=""
													className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
												/>
												{/* Soft gradient from the text side to make text readable without hiding the image */}
												<div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent rtl:bg-gradient-to-l" />
											</div>

											{/* Content directly on image */}
											<div className="relative z-10 flex flex-col items-start max-w-[75%] sm:max-w-[65%]">
												{promo.badge && (
													<span className={cn(
														"px-2 py-1 text-[10px] font-bold rounded-[4px] mb-3 inline-block tracking-wider",
														promo.badgeClass
													)}>
														{promo.badge[language]}
													</span>
												)}
												<h3 className={cn("text-xl lg:text-3xl font-extrabold leading-tight mb-2 drop-shadow-sm", promo.textClass)}>
													{promo.title[language]}
												</h3>
												{promo.subtitle?.[language] && (
													<p className={cn("text-sm font-semibold mb-6 opacity-90 leading-snug line-clamp-2 drop-shadow-sm", promo.textClass)}>
														{promo.subtitle[language]}
													</p>
												)}

												<span className={cn(
													"px-6 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md",
													promo.btnClass,
													!promo.subtitle?.[language] && "mt-5"
												)}>
													{promo.buttonText[language]}
												</span>
											</div>
										</LocalizedLink>
									</motion.div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default PromoSection;
