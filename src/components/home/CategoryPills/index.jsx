import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import { healthNeeds } from "./categories.data";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
export const CategoriesSection = () => {
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

	return (
		<Section bg="background" spacing="xs" className="overflow-hidden">
			<Container>
				<div className="relative rounded-[32px] p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-center overflow-hidden border border-border/60 shadow-sm">
					{/* Background Image with Light Overlay */}
					<div
						className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-15"
						style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1600')" }}
					/>
					<div className="absolute inset-0 bg-white/50 dark:bg-slate-900/60 backdrop-blur-[1px]" />

					{/* Text Side */}
					<div className="relative z-10 w-full md:w-[20%] lg:w-[13%] flex flex-col items-start gap-3">
						<h2 className="text-xl md:text-2xl font-extrabold text-text-heading leading-tight drop-shadow-sm">
							{isRtl ? "تسوق حسب الاحتياجات الصحية" : "Shop by Health Needs"}
						</h2>
						<LocalizedLink
							to="/categories"
							className="group inline-flex items-center gap-1.5 text-primary font-bold text-xs sm:text-sm transition-colors hover:text-primary-hover mt-1"
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
					<div className="relative z-10 w-full md:w-[80%] lg:w-[85%]" dir={isRtl ? "rtl" : "ltr"}>
						<div className="overflow-hidden" ref={emblaRef}>
							<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
								{healthNeeds.map((need, index) => (
									<div
										key={need.id + index}
										className="flex-[0_0_40%] sm:flex-[0_0_30%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
									>
										<LocalizedLink
											to={need.link}
											className="group relative flex flex-col overflow-hidden rounded-[24px] aspect-[4/5] bg-surface border border-border/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
										>
											<img
												src={need.image}
												alt={need.title[language]}
												className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											{/* Bottom Fade for Text */}
											<div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface via-surface/60 to-transparent pointer-events-none" />

											{/* Text */}
											<div className="absolute inset-x-0 bottom-0 p-4 pt-8 flex items-end justify-center text-center">
												<span className="text-text font-extrabold text-sm sm:text-base leading-tight drop-shadow-sm">
													{need.title[language]}
												</span>
											</div>
										</LocalizedLink>
									</div>
								))}
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
			</Container>
		</Section>
	);
};

export default CategoriesSection;


