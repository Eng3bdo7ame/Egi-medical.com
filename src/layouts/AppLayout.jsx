import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalDrawers from "@/components/layout/GlobalDrawers";
import GlobalModals from "@/components/layout/GlobalModals";
import Toaster from "@/components/layout/Toaster";

export const AppLayout = () => {
	return (
		<div className="min-h-screen flex flex-col bg-background text-text transition-colors duration-normal">
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
			<GlobalDrawers />
			<GlobalModals />
			<Toaster />
		</div>
	);
};

export default AppLayout;
