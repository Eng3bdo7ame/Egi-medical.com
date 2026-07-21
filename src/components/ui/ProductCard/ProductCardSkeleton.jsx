import React from "react";
import { cn } from "@/lib/utils";

export const ProductCardSkeleton = ({ className }) => {
	return (
		<div className={cn("flex flex-col w-full bg-surface border border-border rounded-2xl overflow-hidden", className)}>
			{/* Image Skeleton */}
			<div className="w-full aspect-[4/3] bg-surface-2 animate-pulse" />
			
			{/* Content Skeleton */}
			<div className="flex flex-col flex-grow p-4 gap-3">
				{/* Brand Skeleton */}
				<div className="w-1/4 h-3 bg-surface-2 rounded-full animate-pulse" />
				
				{/* Category Skeleton */}
				<div className="w-1/3 h-3 bg-surface-2 rounded-full animate-pulse" />
				
				{/* Title Skeleton (2 lines) */}
				<div className="flex flex-col gap-1.5">
					<div className="w-full h-4 bg-surface-2 rounded-full animate-pulse" />
					<div className="w-4/5 h-4 bg-surface-2 rounded-full animate-pulse" />
				</div>
				
				{/* Rating Skeleton */}
				<div className="flex gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="w-3.5 h-3.5 bg-surface-2 rounded-full animate-pulse" />
					))}
				</div>
				
				{/* Price & Button Skeleton */}
				<div className="mt-auto pt-3 flex flex-col gap-4">
					<div className="w-1/3 h-6 bg-surface-2 rounded-full animate-pulse" />
					<div className="w-full h-10 bg-surface-2 rounded-[8px] animate-pulse" />
				</div>
			</div>
		</div>
	);
};

export default ProductCardSkeleton;
