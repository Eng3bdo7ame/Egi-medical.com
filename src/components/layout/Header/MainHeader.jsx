import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import ThemeSwitcher from "./ThemeSwitcher";


export const MainHeader = () => {
	return (
		<div className="w-full bg-[#021d49] text-white border-b border-white/10 py-3 hidden xl:block relative z-50">
			<Container>
				<div className="flex items-center gap-6">
					{/* Logo */}
					<Logo imgClassName="brightness-105" />

					{/* Search Bar — fills the center */}
					<div className="flex-1">
						<SearchBar />
					</div>

					{/* Theme Switcher */}
					<ThemeSwitcher />

					{/* Action Buttons */}
					<HeaderActions />
				</div>
			</Container>
		</div>
	);
};

export default MainHeader;
