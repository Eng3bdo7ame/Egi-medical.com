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

export const PromoSection = ({ offers }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	let mappedOffers = [];
	if (offers && offers.length > 0) {
		mappedOffers = offers.map((offer, index) => {
			const bgClasses = ["bg-primary/5", "bg-blue-50", "bg-slate-100"];
			const textClasses = ["text-primary", "text-blue-900", "text-slate-900"];
			const btnClasses = ["bg-primary text-white hover:bg-primary-hover", "bg-blue-600 text-white hover:bg-blue-700", "bg-slate-900 text-white hover:bg-slate-800"];
			
			const colorIdx = index % 3;

			return {
				id: offer.id || `offer-${index}`,
				title: { ar: offer.title || offer.name || "", en: offer.title || offer.name || "" },
				subtitle: { ar: offer.description || "", en: offer.description || "" },
				buttonText: { ar: "تسوق الآن", en: "Shop Now" },
				link: offer.link_type === 'category' ? `/category/${offer.category_id}` : (offer.link || "/"),
				image: offer.image || offer.category?.image || "https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?auto=format&fit=crop&q=80&w=600",
				badge: offer.filters?.flash_sale ? { ar: "عرض خاص", en: "Special Offer" } : null,
				bgClass: bgClasses[colorIdx],
				textClass: textClasses[colorIdx],
				btnClass: btnClasses[colorIdx],
				badgeClass: "bg-danger text-white"
			};
		});
	}

	const sourceCards = mappedOffers.length > 0 ? mappedOffers : promoCards;
	const displayCards = [...sourceCards];
	
	const isSingle = displayCards.length === 1;

	const [emblaRef] = useEmblaCarousel(
		{
			loop: displayCards.length > 3,
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
						<div className={cn("flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0", isSingle && "justify-center")}>
							{displayCards.map((promo, index) => (
								<div
									key={promo.id + index}
									className={cn(
										"min-w-0 pl-4 rtl:pr-4 rtl:pl-0 py-4",
										isSingle 
											? "flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_50%]" 
											: "flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_32%] lg:flex-[0_0_30%] xl:flex-[0_0_28%]"
									)}
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
												<div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-slate-900/95 dark:via-slate-900/70 rtl:bg-gradient-to-l pointer-events-none" />
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
												<h3 className={cn("text-xl lg:text-3xl font-extrabold leading-tight mb-2 drop-shadow-sm", promo.textClass, "dark:text-white")}>
													{promo.title[language]}
												</h3>
												{promo.subtitle?.[language] && (
													<p className={cn("text-sm font-semibold mb-6 opacity-90 leading-snug line-clamp-2 drop-shadow-sm", promo.textClass, "dark:text-slate-200")}>
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
