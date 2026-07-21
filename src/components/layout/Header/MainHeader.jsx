import React from "react";
import Container from "@/components/ui/Container";
import Stack from "@/components/ui/Stack";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";

export const MainHeader = () => {
	return (
		<div className="w-full bg-surface border-b border-border/10 py-4 transition-colors duration-normal hidden md:block">
			<Container>
				<Stack direction="row" align="center" justify="between" gap={6}>
					{/* Logo */}
					<Logo />

					{/* Search */}
					<SearchBar />

					{/* Actions */}
					<HeaderActions />
				</Stack>
			</Container>
		</div>
	);
};

export default MainHeader;
