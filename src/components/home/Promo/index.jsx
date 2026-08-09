import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { promoCards } from "./promo.data";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Tag } from "lucide-react";

export const PromoSection = ({ offers }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

	let mappedOffers = [];
	if (offers && offers.length > 0) {
		mappedOffers = offers.map((offer, index) => {
			const bgClasses = ["bg-primary/5", "bg-blue-50", "bg-slate-100"];
			const textClasses = ["text-primary", "text-blue-950", "text-slate-900"];
			const btnClasses = [
				"bg-primary text-white hover:bg-primary-hover hover:shadow-primary/30",
				"bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/30",
				"bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/30"
			];
			const badgeClasses = [
				"bg-primary/10 text-primary border-primary/20",
				"bg-blue-600/10 text-blue-600 border-blue-600/20",
				"bg-slate-900/10 text-slate-900 border-slate-900/20"
			];
			
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
				badgeClass: badgeClasses[colorIdx],
				isFlashSale: !!offer.filters?.flash_sale
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
		[Autoplay({ delay: 6000, stopOnInteraction: true })]
	);

	return (
		<Section bg="surface" className="overflow-hidden py-10 lg:py-16">
			<Container>
				<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden -mx-4 px-4 pb-8" ref={emblaRef}>
						<div className={cn("flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0", isSingle && "justify-center")}>
							{displayCards.map((promo, index) => (
								<div
									key={promo.id + index}
									className={cn(
										"min-w-0 pl-4 rtl:pr-4 rtl:pl-0",
										isSingle 
											? "flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_70%] lg:flex-[0_0_60%]" 
											: "flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_40%] xl:flex-[0_0_35%]"
									)}
								>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-50px" }}
										transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
										className="h-full"
									>
										<LocalizedLink
											to={promo.link}
											className={cn(
												"group relative flex flex-col justify-center p-8 lg:p-10 rounded-[2rem] overflow-hidden min-h-[300px] sm:min-h-[340px] h-full transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 border border-black/5 dark:border-white/5",
												promo.bgClass
											)}
										>
											{/* Full Background Image */}
											<div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900">
												<img
													src={promo.image}
													alt={promo.title[language]}
													className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 dark:opacity-70"
												/>
												{/* Sophisticated gradient overlay for readability */}
												<div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/80 rtl:bg-gradient-to-l pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
												
												{/* Subtle glass effect edge */}
												<div className="absolute inset-0 border border-white/40 dark:border-white/10 rounded-[2rem] pointer-events-none" />
											</div>

											{/* Content */}
											<div className="relative z-10 flex flex-col items-start max-w-[80%] sm:max-w-[70%]">
												{promo.badge && (
													<span className={cn(
														"px-3 py-1.5 text-xs font-bold rounded-full mb-5 inline-flex items-center gap-1.5 border backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5",
														promo.isFlashSale ? "bg-danger/10 text-danger border-danger/20" : promo.badgeClass
													)}>
														{promo.isFlashSale && <Tag className="w-3.5 h-3.5" />}
														{promo.badge[language]}
													</span>
												)}
												
												<h3 className={cn(
													"text-2xl lg:text-4xl font-black leading-tight mb-3 drop-shadow-sm transition-colors duration-300", 
													promo.textClass, 
													"dark:text-white"
												)}>
													{promo.title[language]}
												</h3>
												
												{promo.subtitle?.[language] && (
													<p className={cn(
														"text-sm sm:text-base font-medium mb-8 opacity-75 leading-relaxed line-clamp-2 drop-shadow-sm max-w-[90%]", 
														promo.textClass, 
														"dark:text-slate-300"
													)}>
														{promo.subtitle[language]}
													</p>
												)}

												<span className={cn(
													"inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg",
													promo.btnClass,
													!promo.subtitle?.[language] && "mt-6"
												)}>
													{promo.buttonText[language]}
													<ArrowIcon className={cn(
														"w-4 h-4 transition-transform duration-300",
														isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
													)} />
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
