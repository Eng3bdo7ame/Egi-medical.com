import { useState, useCallback } from "react";
import { getStockState } from "../utils/product-card.helpers";
import { PRODUCT_STATES } from "../product-card.constants";

/**
 * Hook to manage the internal state of a Product Card
 * Handles hover states, wishlist toggling, and quick actions
 */
export const useProductCard = (productData) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [isCompared, setIsCompared] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);

	const stockState = productData?.stock?.quantity !== undefined 
		? getStockState(productData.stock.quantity) 
		: "in-stock";
		
	const isOutOfStock = stockState === "out-of-stock";

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);

	const toggleWishlist = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		// TODO: Call API context here
		setIsWishlisted(prev => !prev);
	}, []);

	const toggleCompare = useCallback(() => {
		setIsCompared(prev => !prev);
	}, []);

	const handleAddToCart = useCallback(async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (isOutOfStock) return;
		
		setIsAddingToCart(true);
		// Mock API call
		await new Promise(resolve => setTimeout(resolve, 600));
		setIsAddingToCart(false);
		// TODO: Trigger global cart update & toast
	}, [isOutOfStock]);

	return {
		isHovered,
		isWishlisted,
		isCompared,
		isAddingToCart,
		isOutOfStock,
		stockState,
		handleMouseEnter,
		handleMouseLeave,
		toggleWishlist,
		toggleCompare,
		handleAddToCart
	};
};
