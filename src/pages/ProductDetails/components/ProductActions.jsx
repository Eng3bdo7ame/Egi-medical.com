import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProductActions = ({ 
	quantity, 
	setQuantity, 
	maxQuantity, 
	onAddToCart, 
	isWishlisted, 
	onToggleWishlist
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
	const handleIncrease = () => setQuantity(prev => Math.min(maxQuantity || 99, prev + 1));

	return (
		<div className="flex flex-col gap-4">
			
			<div className="flex items-center gap-3">
				{/* Quantity Selector */}
				<div className="flex items-center bg-surface border border-border/80 rounded-xl h-12 overflow-hidden">
					<button 
						onClick={handleDecrease}
						disabled={quantity <= 1}
						className="w-12 h-full flex items-center justify-center text-text-secondary hover:bg-surface-2 hover:text-text disabled:opacity-50 transition-colors"
					>
						<Minus className="w-4 h-4" />
					</button>
					<span className="w-10 text-center font-bold text-text text-lg select-none">
						{quantity}
					</span>
					<button 
						onClick={handleIncrease}
						disabled={maxQuantity && quantity >= maxQuantity}
						className="w-12 h-full flex items-center justify-center text-text-secondary hover:bg-surface-2 hover:text-text disabled:opacity-50 transition-colors"
					>
						<Plus className="w-4 h-4" />
					</button>
				</div>

				{/* Primary Add to Cart */}
				<button 
					onClick={onAddToCart}
					className="flex-grow h-12 bg-primary text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-[0.98] transition-all shadow-md shadow-primary/20"
				>
					<ShoppingCart className="w-5 h-5" />
					<span>{isRtl ? "أضف للسلة" : "Add to Cart"}</span>
				</button>
			</div>

			{/* Secondary Actions */}
			<div className="flex items-center gap-4 mt-2">
				<button 
					onClick={onToggleWishlist}
					className={cn(
						"flex items-center gap-2 text-sm font-semibold transition-colors",
						isWishlisted ? "text-danger" : "text-text-secondary hover:text-text"
					)}
				>
					<Heart className={cn("w-5 h-5 transition-transform", isWishlisted && "fill-danger scale-110")} />
					<span>{isRtl ? "أضف للمفضلة" : "Add to Wishlist"}</span>
				</button>
			</div>

		</div>
	);
};

export default ProductActions;
