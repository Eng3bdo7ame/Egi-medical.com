import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddToCartBar = ({ 
	onAddToCart, 
	isWishlisted, 
	onToggleWishlist,
	disabled = false,
	className
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className={cn("flex flex-col sm:flex-row items-center gap-3 w-full", className)}>
			{/* Main CTA */}
			<button
				onClick={onAddToCart}
				disabled={disabled}
				className="flex-1 flex items-center justify-center gap-3 w-full h-14 bg-primary text-white font-extrabold text-lg rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
			>
				<ShoppingCart className={cn("w-6 h-6", isRtl && "scale-x-[-1]")} strokeWidth={2.5} />
				<span className="truncate">{isRtl ? "أضف إلى السلة" : "Add to Cart"}</span>
			</button>

			{/* Wishlist */}
			<button
				onClick={onToggleWishlist}
				className={cn(
					"flex-1 flex items-center justify-center gap-2 w-full h-14 rounded-xl border transition-all active:scale-95 font-bold text-sm",
					isWishlisted 
						? "border-danger bg-danger/10 text-danger" 
						: "border-border/60 bg-surface hover:bg-surface-2 text-text-secondary hover:text-danger"
				)}
			>
				<Heart className={cn("w-5 h-5 transition-transform", isWishlisted && "fill-danger scale-110")} />
				{isRtl ? "إضافة للمفضلة" : "Add to Wishlist"}
			</button>
		</div>
	);
};

export default AddToCartBar;
