import { createSlice } from "@reduxjs/toolkit";
import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";

/**
 * @typedef {import('@/lib/models').CartItem} CartItem
 */

// Load initial state from storage if it exists (Guest checkout pattern)
const persistedCart = storage.get(STORAGE_KEYS.CART, {
	items: [],
	totalItems: 0,
	subtotal: 0,
	discount: 0,
	shipping: 0, // Could be dynamic later
	total: 0,
});

const initialState = persistedCart;

// Helper to recalculate totals
const calculateTotals = (state) => {
	let totalItems = 0;
	let subtotal = 0;
	
	state.items.forEach(item => {
		totalItems += item.quantity;
		// Ensure subtotal per item is correct
		item.subtotal = item.quantity * item.unitPrice;
		subtotal += item.subtotal;
	});

	state.totalItems = totalItems;
	state.subtotal = subtotal;
	// total = subtotal - discount + shipping
	state.total = Math.max(0, state.subtotal - state.discount + state.shipping);
	
	// Persist changes
	storage.set(STORAGE_KEYS.CART, state);
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { product, quantity = 1, selectedVariant = null } = action.payload;
			const unitPrice = product.price.current;
			const productId = product.id;

			const existingItemIndex = state.items.findIndex(
				item => item.productId === productId && 
						JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
			);

			if (existingItemIndex >= 0) {
				state.items[existingItemIndex].quantity += quantity;
			} else {
				state.items.push({
					productId,
					product,
					quantity,
					unitPrice,
					subtotal: quantity * unitPrice,
					selectedVariant
				});
			}

			calculateTotals(state);
		},
		removeFromCart: (state, action) => {
			const { productId, selectedVariant = null } = action.payload;
			state.items = state.items.filter(
				item => !(item.productId === productId && JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant))
			);
			
			calculateTotals(state);
		},
		updateQuantity: (state, action) => {
			const { productId, quantity, selectedVariant = null } = action.payload;
			const existingItem = state.items.find(
				item => item.productId === productId && JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
			);

			if (existingItem && quantity > 0) {
				existingItem.quantity = quantity;
			} else if (existingItem && quantity === 0) {
				// Remove if quantity reaches 0
				state.items = state.items.filter(item => item !== existingItem);
			}

			calculateTotals(state);
		},
		clearCart: (state) => {
			state.items = [];
			state.totalItems = 0;
			state.subtotal = 0;
			state.discount = 0;
			state.shipping = 0;
			state.total = 0;
			storage.remove(STORAGE_KEYS.CART);
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.totalItems;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemById = (productId, variant = null) => (state) => 
	state.cart.items.find(item => item.productId === productId && JSON.stringify(item.selectedVariant) === JSON.stringify(variant));

export default cartSlice.reducer;
