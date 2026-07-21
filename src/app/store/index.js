import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import notificationsReducer from "@/features/notifications/notificationsSlice";
import uiReducer from "@/features/ui/uiSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		wishlist: wishlistReducer,
		notifications: notificationsReducer,
		ui: uiReducer,
	},
});

export default store;
