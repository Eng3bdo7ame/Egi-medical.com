import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [], // Array of product ids or objects (usually capped at 3 or 4 for comparison)
};

const compareSlice = createSlice({
	name: "compare",
	initialState,
	reducers: {
		addToCompare: (state, action) => {
			const productId = action.payload;
			if (!state.items.includes(productId) && state.items.length < 4) {
				state.items.push(productId);
			}
		},
		removeFromCompare: (state, action) => {
			state.items = state.items.filter(id => id !== action.payload);
		},
		clearCompare: (state) => {
			state.items = [];
		},
	},
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
