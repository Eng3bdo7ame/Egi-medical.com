import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [], // Array of product ids or objects
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		toggleWishlist: (state, action) => {
			const productId = action.payload;
			const index = state.items.indexOf(productId);
			if (index >= 0) {
				state.items.splice(index, 1);
			} else {
				state.items.push(productId);
			}
		},
		clearWishlist: (state) => {
			state.items = [];
		},
	},
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
