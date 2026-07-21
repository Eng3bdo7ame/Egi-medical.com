import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "./hero.data";
import HeroSlider from "./HeroSlider";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import Container from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const Hero = () => {
	const { language } = useLanguage();
	const [activeIndex, setActiveIndex] = useState(0);

	// Calm motion variants for text
	const textVariants = {
		hidden: { opacity: 0, y: 15 },
		visible: (custom) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.35,
				ease: "easeOut",
				delay: custom * 0.1,
			},
		}),
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	// Calm motion variants for images
	const imageVariants = {
		hidden: { opacity: 0, x: 20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
				delay: 0.2,
			},
		},
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	return (
		<Section spacing="none">
			<HeroSlider onSlideChange={setActiveIndex}>
				{heroSlides.map((slide, index) => {
					const isActive = index === activeIndex;

					return (
						<div
							key={slide.id}
							className="relative flex-[0_0_100%] min-w-0 h-auto min-h-[520px] sm:min-h-[460px] md:min-h-[480px] lg:h-[520px] select-none"
						>
							{/* Background Component (Full width) */}
							<HeroBackground bgClass={slide.background} />

							<div className="absolute inset-0 z-10 w-full h-full">
								<Container className="h-full">
									<div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-4">

										{/* Content Side */}
										<AnimatePresence mode="wait">
											{isActive && (
												<HeroContent
													slide={slide}
													language={language}
													textVariants={textVariants}
												/>
											)}
										</AnimatePresence>

										{/* Image Side - Hidden on mobile to prevent overlap */}
										<AnimatePresence mode="wait">
											{isActive && (
												<HeroImage
													src={slide.image}
													alt={`${slide.brand} product`}
													imageVariants={imageVariants}
												/>
											)}
										</AnimatePresence>

									</div>
								</Container>
							</div>
						</div>
					);
				})}
			</HeroSlider>
		</Section>
	);
};

export default Hero;
