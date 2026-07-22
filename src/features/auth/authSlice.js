import { createSlice } from "@reduxjs/toolkit";
import authStorage from "./storage/authStorage";

const initialState = {
	user: authStorage.getUser(),
	token: authStorage.getAccessToken(),
	isAuthenticated: !!authStorage.getAccessToken(),
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
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			state.error = null;
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
