import React, { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Navigation from "./Navigation";
import MobileHeader from "./MobileHeader";

export const Header = () => {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 120) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="w-full flex flex-col z-sticky">
			{/* Announcement Bar (Top) */}
			<AnnouncementBar />

			{/* Top Bar (Secondary helpers - Desktop only) */}
			<TopBar />

			{/* Sticky Wrapper */}
			<div
				className={`w-full z-sticky transition-all duration-normal ${
					isSticky 
						? "fixed top-0 left-0 bg-surface/95 backdrop-blur-md shadow-md animate-slideDown" 
						: "relative"
				}`}
			>
				{/* Desktop Main Header */}
				<MainHeader />

				{/* Desktop Navigation Links */}
				<Navigation />

				{/* Mobile Navigation Header */}
				<MobileHeader />
			</div>
			
			{/* Spacer to prevent layout shift when sticky triggers */}
			{isSticky && <div className="h-[140px] hidden md:block" />}
		</div>
	);
};

export default Header;
