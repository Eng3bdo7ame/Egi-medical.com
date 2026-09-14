import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";

import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const CategoriesSection = ({ categories = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			direction: isRtl ? "rtl" : "ltr",
			align: "start",
			skipSnaps: false,
		},
		[Autoplay({ delay: 4000, stopOnInteraction: true })]
	);

	const scrollNext = () => {
		if (emblaApi) emblaApi.scrollNext();
	};

	const categoriesToDisplay = categories || [];

	if (isLoading && (!categories || categories.length === 0)) {
		return (
			<Section bg="background" spacing="xs" className="overflow-hidden">
				<Container>
					<div className="h-[280px] w-full bg-slate-100 animate-pulse rounded-[32px]"></div>
				</Container>
			</Section>
		);
	}

	return (
		<Section bg="background" spacing="xs" className="overflow-hidden">
			<Container>
				<div className="bg-slate-50/60 dark:bg-slate-900/20 rounded-2xl md:rounded-[32px] p-4 sm:p-5 md:p-0 flex flex-col md:flex-row gap-3 md:gap-6 border border-border/60 shadow-sm overflow-hidden">
					{/* Mobile Header Title */}
					<div className="md:hidden flex flex-col items-start px-1 pt-1">
						<div className="relative inline-block">
							<h2 className="text-base sm:text-lg font-black text-text-heading">
								{isRtl ? "تسوق حسب الاحتياجات الصحية" : "Shop by Health Needs"}
							</h2>
							<div className="h-1 w-10 bg-orange-500 rounded-full mt-1"></div>
						</div>
					</div>

					{/* Desktop Text Side */}
					<div className="hidden md:flex relative z-10 md:w-[24%] lg:w-[18%] flex-col items-start justify-center gap-3 bg-[#021d49] text-white p-6 rounded-2xl self-stretch shrink-0">
						<h2 className="text-sm sm:text-base md:text-xl font-extrabold text-white leading-tight drop-shadow-sm">
							{isRtl ? "تسوق حسب الاحتياجات الصحية" : "Shop by Health Needs"}
						</h2>
						<LocalizedLink
							to="/categories"
							className="group inline-flex items-center gap-1.5 text-orange-400 font-bold text-xs sm:text-sm transition-colors hover:text-orange-300 mt-1"
						>
							{isRtl ? "عرض كل الأقسام" : "View all categories"}
							{isRtl ? (
								<ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
							) : (
								<ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
							)}
						</LocalizedLink>
					</div>

					{/* Slider Side */}
					<div className="relative flex-1 min-w-0 p-0 md:p-4 overflow-hidden flex flex-col justify-center">
						<div className="relative z-10 w-full" dir={isRtl ? "rtl" : "ltr"}>
							<div className="overflow-hidden" ref={emblaRef}>
								<div className="flex touch-pan-y -ml-2 sm:-ml-3 md:-ml-4 rtl:-mr-2 sm:rtl:-mr-3 md:rtl:-mr-4 rtl:ml-0">
									{categoriesToDisplay.map((need, index) => {
										const getLocalized = (field) => {
											if (!field) return "";
											if (typeof field === "string") return field;
											return field[language] || field.en || field.ar || "";
										};

										const title = getLocalized(need.title) || getLocalized(need.name);
										const linkUrl = (need.link && typeof need.link === 'string' && need.link.startsWith('/'))
											? need.link
											: `/category/${need.id || need.link}`;

										return (
											<div
												key={need.id || index}
												className="flex-[0_0_50%] sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 pl-2 sm:pl-3 md:pl-4 rtl:pr-2 sm:rtl:pr-3 md:rtl:pr-4 rtl:pl-0"
											>
												<LocalizedLink
													to={linkUrl}
													className="group flex flex-col overflow-hidden rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 border border-border/70 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 h-full"
												>
													{/* Image Container (Icon-style) */}
													<div className="w-full h-20 sm:h-24 md:h-26 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-center p-2 overflow-hidden border-b border-border/40">
														<img
															src={need.image}
															alt={title}
															className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110"
														/>
													</div>

													{/* Text Container below the image */}
													<div className="p-2 sm:p-2.5 flex-grow flex items-center justify-center text-center bg-surface min-h-[42px]">
														<span className="text-text font-bold text-xs sm:text-sm leading-snug line-clamp-2">
															{title}
														</span>
													</div>
												</LocalizedLink>
											</div>
										);
									})}
								</div>
							</div>

							{/* Next Arrow inside slider container */}
							<div className="absolute top-1/2 -translate-y-1/2 right-0 rtl:right-auto rtl:left-0 z-10 hidden sm:flex pointer-events-none">
								<div
									onClick={scrollNext}
									className="w-10 h-10 rounded-full bg-surface shadow-md border border-border/65 flex items-center justify-center text-primary pointer-events-auto cursor-pointer hover:bg-surface-2 transition-colors transform translate-x-1/3 rtl:-translate-x-1/3"
								>
									{isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
								</div>
							</div>
						</div>
					</div>

					{/* Mobile Footer Link */}
					<div className="md:hidden flex justify-center pb-1">
						<LocalizedLink
							to="/categories"
							className="group inline-flex items-center gap-1.5 text-orange-500 dark:text-orange-400 font-extrabold text-xs sm:text-sm transition-colors hover:text-orange-600"
						>
							{isRtl ? "عرض الكل" : "View All"}
							{isRtl ? (
								<ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
							) : (
								<ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
							)}
						</LocalizedLink>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default CategoriesSection;
