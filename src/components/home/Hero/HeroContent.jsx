import React from "react";
import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";

/**
 * HeroContent Component
 * Assembles the Title, Subtitle, CTA buttons, and trust indicators.
 */
export const HeroContent = ({ slide, language, textVariants }) => {
	const getLocalizedText = (textObj) => {
		if (!textObj) return "";
		if (typeof textObj === "string") return textObj;
		return textObj[language] || textObj.en || textObj.ar || "";
	};

	const titleHtml = getLocalizedText(slide.title);
	const subtitleText = getLocalizedText(slide.subtitle);

	return (
		<div className="flex flex-col items-center lg:items-start justify-center z-10 w-full h-full pt-4 pb-4 sm:pt-6 sm:pb-6 lg:py-0 text-center lg:text-start">
			<motion.div
				className="space-y-4 sm:space-y-6 max-w-xl flex flex-col items-center lg:items-start"
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{/* Title */}
				{titleHtml && (
					<motion.h1
						custom={0}
						variants={textVariants}
						className="text-xl sm:text-2xl md:text-3xl lg:text-display font-extrabold text-text leading-[1.25] lg:leading-[1.15]"
						dangerouslySetInnerHTML={{ __html: titleHtml }}
					/>
				)}

				{/* Subtitle */}
				{subtitleText && (
					<motion.p
						custom={1}
						variants={textVariants}
						className="text-sm sm:text-base lg:text-body-large text-text-secondary leading-relaxed max-w-[95%] sm:max-w-[90%]"
					>
						{subtitleText}
					</motion.p>
				)}

				{/* Buttons */}
				{slide.buttons && (
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
				)}

				{/* Features / Trust Indicators - Hide on very small screens */}
				{slide.features && (
					<motion.div custom={3} variants={textVariants} className="hidden sm:block">
						<HeroFeatures features={slide.features} language={language} />
					</motion.div>
				)}
			</motion.div>
		</div>
	);
};

export default HeroContent;
