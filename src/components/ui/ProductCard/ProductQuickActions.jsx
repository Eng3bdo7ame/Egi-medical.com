import React from "react";
import { Heart, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProductQuickActions = ({ 
	isWishlisted, 
	onToggleWishlist, 
	isCompared,
	onToggleCompare,
	isRtl 
}) => {
	return (
		<div className={cn(
			"absolute top-3 z-10 flex flex-col gap-2",
			isRtl ? "left-3" : "right-3"
		)}>
			<button 
				onClick={onToggleWishlist}
				className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-2/80 backdrop-blur-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
			>
				<Heart 
					className={cn("w-4 h-4 transition-transform", isWishlisted && "fill-danger text-danger scale-110")} 
				/>
			</button>

			<button 
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if(onToggleCompare) onToggleCompare();
				}}
				className={cn(
					"group flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md transition-all duration-300 overflow-hidden",
					isCompared ? "bg-primary text-white" : "bg-surface-2/80 text-text-muted hover:bg-primary/10 hover:text-primary md:opacity-0 md:group-hover:opacity-100"
				)}
				title={isRtl ? "مقارنة" : "Compare"}
			>
				<Scale className={cn("w-4 h-4 transition-transform shrink-0", isCompared && "scale-110")} />
			</button>
		</div>
	);
};
