import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "@/constants/storage";

const initialState = {
	user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || null,
	token: localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
	isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
			localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload.user));
			localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			localStorage.removeItem(STORAGE_KEYS.USER);
			localStorage.removeItem(STORAGE_KEYS.TOKEN);
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
