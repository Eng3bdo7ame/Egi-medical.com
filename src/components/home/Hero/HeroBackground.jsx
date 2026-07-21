import React from "react";
import { cn } from "@/lib/utils";

/**
 * HeroBackground Component
 * Renders the clean medical background with decorative shapes (Dot grid pattern).
 */
export const HeroBackground = ({ className, bgClass = "bg-[#F4F7FC]" }) => {
	return (
		<div className={cn("absolute inset-0 z-0 overflow-hidden", bgClass, className)}>
			{/* Soft Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent pointer-events-none" />

			{/* Dot Grid Pattern (Top Right/End) */}
			<div className="absolute -top-10 -end-10 w-64 h-64 opacity-20 pointer-events-none">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
							<circle cx="2" cy="2" r="2" fill="currentColor" className="text-primary" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#dotGrid)" />
				</svg>
			</div>
		</div>
	);
};

export default HeroBackground;
