import React from "react";
import QuantitySelector from "./QuantitySelector";
import AddToCartBar from "./AddToCartBar";

export const ProductActions = ({ 
	quantity, 
	setQuantity, 
	maxQuantity, 
	onAddToCart, 
	isWishlisted, 
	onToggleWishlist 
}) => {
	const outOfStock = !maxQuantity || maxQuantity < 1;

	return (
		<div className="flex flex-col gap-6 mt-4 p-4 bg-surface-2/30 rounded-2xl border border-border/50">
			{/* Quantity Selection */}
			{!outOfStock && (
				<QuantitySelector 
					quantity={quantity} 
					setQuantity={setQuantity} 
					maxQuantity={maxQuantity} 
				/>
			)}

			{/* Add to Cart, Wishlist, Share */}
			<AddToCartBar 
				onAddToCart={onAddToCart}
				isWishlisted={isWishlisted}
				onToggleWishlist={onToggleWishlist}
				disabled={outOfStock}
			/>
		</div>
	);
};

export default ProductActions;
