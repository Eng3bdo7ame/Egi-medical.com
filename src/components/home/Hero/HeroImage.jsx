import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * HeroImage Component
 * Handles the display and animation of the main product composition image.
 */
export const HeroImage = ({ src, alt, imageVariants }) => {
	return (
		<div className="relative w-full h-full min-h-[300px] flex items-center justify-center lg:justify-end z-10 pointer-events-none select-none px-4 lg:px-0">
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={imageVariants}
				className="relative w-full max-w-[500px] xl:max-w-[600px] h-auto object-contain"
			>
				{/* The actual image or a premium placeholder */}
				{src ? (
					<img
						src={src}
						alt={alt}
						className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply"
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
