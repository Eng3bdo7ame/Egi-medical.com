import React from "react";
import { cn } from "@/lib/utils";

export const HeroPagination = ({ slidesCount, selectedIndex, scrollTo }) => {
	return (
		<div className="flex items-center gap-2">
			{Array.from({ length: slidesCount }).map((_, index) => (
				<button
					key={index}
					onClick={() => scrollTo(index)}
					className={cn(
						"transition-all duration-300 rounded-full",
						selectedIndex === index
							? "w-8 h-2.5 bg-primary"
							: "w-2.5 h-2.5 bg-primary/20 hover:bg-primary/40"
					)}
					aria-label={`Go to slide ${index + 1}`}
				/>
			))}
		</div>
	);
};

export default HeroPagination;
