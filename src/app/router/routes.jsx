import { Navigate } from "react-router-dom";
import { lazy } from "react";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import LanguageGuard from "./LanguageGuard";
import RootRedirect from "./RootRedirect";

// App Pages
const Home = lazy(() => import("@/pages/Home"));
const ProductCardDemo = lazy(() => import("@/pages/ProductCardDemo"));
import About from "@/pages/About";
import Products from "@/pages/Products/index";
import ProductDetails from "@/pages/ProductDetails/index";
import Category from "@/pages/Category/index";
import Brands from "@/pages/Brands";
import Cart from "@/pages/Cart/index";
import Checkout from "@/pages/Checkout/index";
import Wishlist from "@/pages/Wishlist/index";
import Profile from "@/pages/Profile/index";
import Contact from "@/pages/Contact";

// Auth Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";

// Status / Empty Pages
import NotFound from "@/pages/NotFound";
import Maintenance from "@/pages/Maintenance";

import { ROUTES } from "./paths";

export const routes = [
	{
		path: "/",
		element: <RootRedirect />,
	},
	{
		path: "/:lang",
		element: <LanguageGuard />,
		children: [
			// App Layout Routes
			{
				element: <AppLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: ROUTES.PRODUCTS.substring(1),
						element: <Products />,
					},
					{
						path: ROUTES.PRODUCT_DETAILS.substring(1),
						element: <ProductDetails />,
					},
					{
						path: ROUTES.CATEGORY.substring(1),
						element: <Category />,
					},
					{
						path: ROUTES.BRANDS.substring(1),
						element: <Brands />,
					},
					{
						path: ROUTES.CART.substring(1),
						element: <Cart />,
					},
					{
						path: ROUTES.WISHLIST.substring(1),
						element: <Wishlist />,
					},
					{
						path: ROUTES.ABOUT.substring(1),
						element: <About />,
					},
					{
						path: ROUTES.CONTACT.substring(1),
						element: <Contact />,
					},
					// Protected Routes directly accessible (Guards removed temporarily)
					{
						path: ROUTES.CHECKOUT.substring(1),
						element: <Checkout />,
					},
					{
						path: ROUTES.PROFILE.substring(1),
						element: <Profile />,
					},
				],
			},
			// Auth Layout Routes (Direct access, GuestGuard removed temporarily)
			{
				path: "auth",
				element: <AuthLayout />,
				children: [
					{
						path: ROUTES.LOGIN.replace("/auth/", ""),
						element: <Login />,
					},
					{
						path: ROUTES.REGISTER.replace("/auth/", ""),
						element: <Register />,
					},
					{
						path: ROUTES.FORGOT_PASSWORD.replace("/auth/", ""),
						element: <ForgotPassword />,
					},
				],
			},
			// Demo Routes
			{
				path: "product-card-demo",
				element: <ProductCardDemo />,
			},
			// Empty Layout Routes
			{
				element: <EmptyLayout />,
				children: [
					{
						path: ROUTES.NOT_FOUND.substring(1),
						element: <NotFound />,
					},
					{
						path: ROUTES.MAINTENANCE.substring(1),
						element: <Maintenance />,
					},
					{
						path: "*",
						element: <Navigate to={ROUTES.NOT_FOUND} replace />,
					},
				],
			},
		]
	},
	{
		path: "*",
		element: <RootRedirect /> // Catch all non-prefixed routes and redirect
	}
];

export default routes;
