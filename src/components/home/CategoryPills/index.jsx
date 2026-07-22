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
				<div className="bg-[#f8f9fc] rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
					{/* Text Side */}
					<div className="w-full md:w-[25%] flex flex-col items-start gap-4">
						<h2 className="text-2xl md:text-3xl font-extrabold text-text leading-tight">
							{isRtl ? "تسوق حسب الاحتياجات الصحية" : "Shop by Health Needs"}
						</h2>
						<LocalizedLink
							to="/categories"
							className="group inline-flex items-center gap-2 text-primary font-bold text-sm transition-colors hover:text-primary-hover"
						>
							{isRtl ? "عرض كل الأقسام" : "View all categories"}
							{isRtl ? (
								<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
							) : (
								<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
							)}
						</LocalizedLink>
					</div>

					{/* Slider Side */}
					<div className="w-full md:w-[75%] relative" dir={isRtl ? "rtl" : "ltr"}>
						<div className="overflow-hidden" ref={emblaRef}>
							<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
								{healthNeeds.map((need, index) => (
									<div
										key={need.id + index}
										className="flex-[0_0_40%] sm:flex-[0_0_30%] md:flex-[0_0_22%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
									>
										<LocalizedLink
											to={need.link}
											className="group relative flex flex-col overflow-hidden rounded-[24px] aspect-[4/5] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-floating"
										>
											<img
												src={need.image}
												alt={need.title[language]}
												className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>
											{/* Bottom Fade for Text */}
											<div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/75 to-transparent pointer-events-none" />

											{/* Text */}
											<div className="absolute inset-x-0 bottom-0 p-4 pt-8 flex items-end justify-start">
												<span className="text-text font-bold text-sm sm:text-base leading-tight">
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
								className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary pointer-events-auto cursor-pointer hover:bg-surface transition-colors transform translate-x-1/3 rtl:-translate-x-1/3"
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


