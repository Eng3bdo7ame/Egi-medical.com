import React from "react";
import { cn } from "@/lib/utils";

export const ProductBadges = ({ badges = [], isRtl, language }) => {
	if (!badges.length) return null;

	return (
		<div className="flex items-center flex-wrap gap-1.5 justify-end">
			{badges.map((badge, idx) => (
				<span 
					key={idx} 
					className={cn(
						"text-[10px] font-bold px-2 py-0.5 rounded-[6px]",
						badge.type === "new" && "bg-success text-white",
						badge.type === "bestseller" && "bg-warning text-white"
					)}
				>
					{badge.label?.[language] || badge.label?.en}
				</span>
			))}
		</div>
	);
};
