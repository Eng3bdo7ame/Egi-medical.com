import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * HeroButtons Component
 * Handles the Primary and Secondary CTAs.
 */
export const HeroButtons = ({ primary, secondary }) => {
	if (!primary && !secondary) return null;

	return (
		<div className="flex flex-wrap items-center gap-4 pt-4">
			{primary && (
				<Button
					asChild
					className="min-w-[160px] h-12 !rounded-[8px] shadow-none hover:shadow-md transition-shadow font-semibold text-[15px]"
				>
					<Link to={primary.link}>{primary.label}</Link>
				</Button>
			)}

			{secondary && (
				<Button
					asChild
					variant="secondary"
					className="min-w-[160px] h-12 !rounded-[8px] font-semibold text-[15px] bg-white hover:bg-primary/5"
				>
					<Link to={secondary.link}>{secondary.label}</Link>
				</Button>
			)}
		</div>
	);
};

export default HeroButtons;
