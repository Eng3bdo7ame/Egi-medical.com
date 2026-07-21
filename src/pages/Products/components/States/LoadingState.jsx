import React from "react";
import ProductCardSkeleton from "@/components/ui/ProductCard/ProductCardSkeleton";
import { cn } from "@/lib/utils";

export const LoadingState = ({ count = 8, viewMode = "grid-3" }) => {
	const gridClasses = {
		"grid-2": "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
		"grid-3": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
		"grid-4": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
		"list": "flex flex-col gap-4"
	};

	const layout = viewMode === "list" ? "horizontal" : "vertical";

	return (
		<div className={cn("w-full transition-all duration-300", gridClasses[viewMode] || gridClasses["grid-3"])}>
			{Array.from({ length: count }).map((_, index) => (
				<ProductCardSkeleton key={index} layout={layout} />
			))}
		</div>
	);
};

export default LoadingState;
