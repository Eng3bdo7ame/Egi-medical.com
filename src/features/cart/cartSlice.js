import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [], // Array of { productId, quantity, price }
	totalItems: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { productId, price, quantity = 1 } = action.payload;
			const existingItem = state.items.find(item => item.productId === productId);

			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				state.items.push({ productId, price, quantity });
			}

			state.totalItems += quantity;
			state.totalPrice += price * quantity;
		},
		removeFromCart: (state, action) => {
			const { productId } = action.payload;
			const existingItem = state.items.find(item => item.productId === productId);

			if (existingItem) {
				state.totalItems -= existingItem.quantity;
				state.totalPrice -= existingItem.price * existingItem.quantity;
				state.items = state.items.filter(item => item.productId !== productId);
			}
		},
		updateQuantity: (state, action) => {
			const { productId, quantity } = action.payload;
			const existingItem = state.items.find(item => item.productId === productId);

			if (existingItem && quantity > 0) {
				const diff = quantity - existingItem.quantity;
				existingItem.quantity = quantity;
				state.totalItems += diff;
				state.totalPrice += existingItem.price * diff;
			}
		},
		clearCart: (state) => {
			state.items = [];
			state.totalItems = 0;
			state.totalPrice = 0;
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
