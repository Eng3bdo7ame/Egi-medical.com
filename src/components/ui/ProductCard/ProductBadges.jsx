import React from "react";
import { cn } from "@/lib/utils";

export const ProductBadges = ({ badges = [], isOutOfStock, isRtl, language }) => {
	const displayBadges = [...badges];
	
	if (isOutOfStock) {
		displayBadges.unshift({ type: "out_of_stock", label: { en: "Out of Stock", ar: "نفذت الكمية" } });
	}

	if (!displayBadges.length) return null;

	return (
		<div className="flex items-center flex-wrap gap-1.5 justify-end">
			{displayBadges.map((badge, idx) => (
				<span 
					key={idx} 
					className={cn(
						"text-[10px] font-bold px-2 py-0.5 rounded-[6px]",
						badge.type === "new" && "bg-success text-white",
						badge.type === "bestseller" && "bg-warning text-white",
						badge.type === "sale" && "bg-danger text-white",
						badge.type === "out_of_stock" && "bg-slate-800 text-white"
					)}
				>
					{badge.label?.[language] || badge.label?.en}
				</span>
			))}
		</div>
	);
};
