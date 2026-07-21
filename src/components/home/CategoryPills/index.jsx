import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import { dealButtons } from "./categories.data";
import { DealButton } from "./DealButton";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const CategoriesSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			direction: isRtl ? "rtl" : "ltr",
			align: "start",
			skipSnaps: false,
		},
		[Autoplay({ delay: 3000, stopOnInteraction: false })]
	);

	return (
		<Section bg="surface" spacing="xs" className="border-b border-border/40 overflow-hidden">
			<Container>
				{/* 6-Items Per Screen Slider */}
				<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden py-2" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-3 rtl:-mr-3 rtl:ml-0 items-center">
							{dealButtons.map((deal) => (
								<div
									key={deal.id}
									className="flex-[0_0_33.333%] sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_16.666%] min-w-0 pl-3 rtl:pr-3 rtl:pl-0 flex justify-center"
								>
									<DealButton deal={deal} language={language} />
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default CategoriesSection;


