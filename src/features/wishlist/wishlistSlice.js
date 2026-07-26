import { createSlice } from "@reduxjs/toolkit";
import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";

const persistedWishlist = storage.get(STORAGE_KEYS.WISHLIST, {
	items: [], // Array of products
	count: 0
});

const initialState = persistedWishlist;

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		addToWishlist: (state, action) => {
			const product = action.payload;
			if (!state.items.find(item => item.id === product.id)) {
				state.items.push(product);
				state.count = state.items.length;
				storage.set(STORAGE_KEYS.WISHLIST, state);
			}
		},
		removeFromWishlist: (state, action) => {
			const productId = action.payload;
			state.items = state.items.filter(item => item.id !== productId);
			state.count = state.items.length;
			storage.set(STORAGE_KEYS.WISHLIST, state);
		},
		toggleWishlist: (state, action) => {
			const product = action.payload;
			const existingIndex = state.items.findIndex(item => item.id === product.id);
			if (existingIndex >= 0) {
				state.items.splice(existingIndex, 1);
			} else {
				state.items.push(product);
			}
			state.count = state.items.length;
			storage.set(STORAGE_KEYS.WISHLIST, state);
		},
		clearWishlist: (state) => {
			state.items = [];
			state.count = 0;
			storage.remove(STORAGE_KEYS.WISHLIST);
		},
	},
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.count;
export const selectIsWishlisted = (productId) => (state) => state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;
