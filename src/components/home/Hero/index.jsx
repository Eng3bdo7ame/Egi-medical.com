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

export const Hero = ({ sliders = [], isLoading }) => {
	const { language } = useLanguage();
	const [activeIndex, setActiveIndex] = useState(0);

	// Bind API data to the slider layout exactly as it is
	const slidesToDisplay = (sliders && sliders.length > 0 ? sliders : heroSlides).map((apiSlide, index) => {
		const staticFallback = heroSlides[index] || heroSlides[0];
		
		// Build dynamic link from API fields
		let actionLink = "/shop";
		if (apiSlide.link) {
			actionLink = apiSlide.link;
		} else if (apiSlide.category_id) {
			actionLink = `/category/${apiSlide.category_id}`;
		} else if (apiSlide.link_id && apiSlide.link_type === "category") {
			actionLink = `/category/${apiSlide.link_id}`;
		} else if (apiSlide.link_id && apiSlide.link_type === "product") {
			actionLink = `/product/${apiSlide.link_id}`;
		} else if (staticFallback.buttons?.primary?.link) {
			actionLink = staticFallback.buttons.primary.link;
		}

		return {
			...staticFallback,
			id: apiSlide.id || index,
			title: apiSlide.title || "",
			subtitle: apiSlide.description || "",
			image: apiSlide.image || staticFallback.image,
			buttons: {
				primary: {
					en: "Shop Now",
					ar: "تسوق الآن",
					link: actionLink,
				},
				secondary: {
					en: "Browse Categories",
					ar: "تصفح الأقسام",
					link: "/categories",
				}
			}
		};
	});

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

	if (isLoading && (!sliders || sliders.length === 0)) {
		return <Section spacing="none"><div className="min-h-[420px] bg-slate-100 animate-pulse w-full"></div></Section>;
	}

	return (
		<Section spacing="none">
			<HeroSlider onSlideChange={setActiveIndex}>
				{slidesToDisplay.map((slide, index) => {
					const isActive = index === activeIndex;

					return (
						<div
							key={slide.id || index}
							className="relative flex-[0_0_100%] min-w-0 h-auto min-h-[420px] sm:min-h-[460px] md:min-h-[480px] lg:h-[520px] select-none"
						>
							{/* Background Component (Full width) */}
							<HeroBackground bgClass={slide.background || "bg-[#F4F7FC]"} />

							<div className="relative lg:absolute lg:inset-0 z-10 w-full h-full py-4 lg:py-0 flex items-center">
								<Container className="h-full flex items-center">
									<div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-2 lg:gap-4 h-full">

										{/* Image Side - Order 1 on mobile, Order 2 on desktop */}
										<div className="order-1 lg:order-2 w-full flex justify-center">
											<AnimatePresence mode="wait">
												{isActive && (
													<HeroImage
														src={slide.image}
														alt={slide.brand ? `${slide.brand} product` : `Slider image`}
														imageVariants={imageVariants}
													/>
												)}
											</AnimatePresence>
										</div>

										{/* Content Side - Order 2 on mobile, Order 1 on desktop */}
										<div className="order-2 lg:order-1 w-full flex flex-col justify-center">
											<AnimatePresence mode="wait">
												{isActive && (
													<HeroContent
														slide={slide}
														language={language}
														textVariants={textVariants}
													/>
												)}
											</AnimatePresence>
										</div>

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
