import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * HeroButtons Component
 * Handles the Primary and Secondary CTAs.
 */
export const HeroButtons = ({ primary, secondary }) => {
	if (!primary && !secondary) return null;

	return (
		<div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
			{primary && (
				<Button
					asChild
					className="min-w-[130px] sm:min-w-[160px] h-10 sm:h-12 !rounded-[8px] shadow-none hover:shadow-md transition-shadow font-semibold text-sm sm:text-[15px]"
				>
					<LocalizedLink to={primary.link}>{primary.label}</LocalizedLink>
				</Button>
			)}

			{secondary && (
				<Button
					asChild
					variant="secondary"
					className="min-w-[130px] sm:min-w-[160px] h-10 sm:h-12 !rounded-[8px] font-semibold text-sm sm:text-[15px]"
				>
					<LocalizedLink to={secondary.link}>{secondary.label}</LocalizedLink>
				</Button>
			)}
		</div>
	);
};

export default HeroButtons;
