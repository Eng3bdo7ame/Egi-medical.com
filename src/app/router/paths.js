export const ROUTES = {
	HOME: "/",
	PRODUCTS: "/products",
	PRODUCT_DETAILS: "/products/:slug",
	CATEGORY: "/category/:slug",
	BRANDS: "/brands",
	CART: "/cart",
	CHECKOUT: "/checkout",
	WISHLIST: "/wishlist",
	PROFILE: "/profile",
	ABOUT: "/about",
	CONTACT: "/contact",
	FAQ: "/faq",
	PRIVACY: "/privacy",
	TERMS: "/terms",
	// Auth
	LOGIN: "/auth/login",
	REGISTER: "/auth/register",
	FORGOT_PASSWORD: "/auth/forgot-password",
	VERIFY_OTP: "/auth/verify-otp",
	RESET_PASSWORD: "/auth/reset-password",
	// Empty
	NOT_FOUND: "/404",
	MAINTENANCE: "/maintenance",
};

export default ROUTES;
