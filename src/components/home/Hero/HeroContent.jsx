import React from "react";
import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";

/**
 * HeroContent Component
 * Assembles the Title, Subtitle, CTA buttons, and trust indicators.
 */
export const HeroContent = ({ slide, language, textVariants }) => {
	return (
		<div className="flex flex-col items-start justify-center z-10 w-full h-full pt-10 pb-16 lg:py-0">
			<motion.div
				className="space-y-6 max-w-xl"
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{/* Title */}
				<motion.h1
					custom={0}
					variants={textVariants}
					className="text-display text-text leading-[1.15]"
					dangerouslySetInnerHTML={{ __html: slide.title[language] }}
				/>

				{/* Subtitle */}
				<motion.p
					custom={1}
					variants={textVariants}
					className="text-body-large text-text-secondary leading-relaxed max-w-[90%]"
				>
					{slide.subtitle[language]}
				</motion.p>

				{/* Buttons */}
				<motion.div custom={2} variants={textVariants}>
					<HeroButtons
						primary={{
							label: slide.buttons?.primary?.[language],
							link: slide.buttons?.primary?.link,
						}}
						secondary={{
							label: slide.buttons?.secondary?.[language],
							link: slide.buttons?.secondary?.link,
						}}
					/>
				</motion.div>

				{/* Features / Trust Indicators */}
				{slide.features && (
					<motion.div custom={3} variants={textVariants}>
						<HeroFeatures features={slide.features} language={language} />
					</motion.div>
				)}
			</motion.div>
		</div>
	);
};

export default HeroContent;
