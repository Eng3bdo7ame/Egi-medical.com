import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon-sm"
			onClick={toggleTheme}
			className="hover:bg-surface-2 transition-colors duration-fast text-base"
			aria-label={`Toggle theme. Current theme is ${theme}`}
		>
			{theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🖥️"}
		</Button>
	);
};

export default ThemeSwitcher;
