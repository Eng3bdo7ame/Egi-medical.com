import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * HeroImage Component
 * Handles the display and animation of the main product composition image
 * with the soft blue oval background shape positioned strictly behind the products.
 * Hidden on mobile (< lg) to prevent content overlap.
 */
export const HeroImage = ({ src, alt, imageVariants }) => {
	return (
		<div className="relative w-full h-full hidden lg:flex items-center justify-center pointer-events-none select-none">
			{/* Oval backdrop - z-0 (Strictly behind products) */}
			<div className="absolute w-[85%] h-[85%] max-w-[460px] max-h-[460px] rounded-[170px] bg-[#E3EFFF] z-0 border border-blue-100/60 transform rotate-[-8deg] transition-all duration-500" />
			
			{/* Products Image - z-10 (Strictly in front of the oval) */}
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={imageVariants}
				className="relative z-10 w-full h-full flex items-center justify-center"
			>
				{src ? (
					<img
						src={src}
						alt={alt}
						className="w-full h-full max-h-[420px] object-contain drop-shadow-xl transition-all duration-300"
						loading="eager"
					/>
				) : (
					<div className="w-full aspect-square bg-white/50 border border-white/60 rounded-[24px] shadow-overlay flex flex-col items-center justify-center backdrop-blur-md">
						<div className="text-primary/30 font-extrabold text-4xl -rotate-12 px-6 text-center leading-tight">
							{alt}
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default HeroImage;
