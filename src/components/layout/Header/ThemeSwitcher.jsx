import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { THEMES } from "@/constants/theme";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ThemeSwitcher Component
 * Cycles between Light → Dark → System.
 * Persists choice in localStorage via ThemeProvider.
 * Supports RTL/LTR and Light/Dark.
 */
export const ThemeSwitcher = ({ variant = "default", className }) => {
	const { theme, toggleTheme } = useTheme();

	const themeConfig = {
		[THEMES.LIGHT]: { icon: Sun, label: "Light", color: "text-amber-400" },
		[THEMES.DARK]: { icon: Moon, label: "Dark", color: "text-blue-300" },
		[THEMES.SYSTEM]: { icon: Monitor, label: "System", color: "text-white" },
	};

	const current = themeConfig[theme] || themeConfig[THEMES.SYSTEM];
	const Icon = current.icon;

	return (
		<button
			onClick={toggleTheme}
			className={cn(
				"inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 cursor-pointer select-none",
				"bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-white shadow-sm",
				className
			)}
			aria-label={`Toggle theme. Current: ${current.label}`}
			title={`Theme: ${current.label}`}
		>
			<Icon className={cn("w-5 h-5 transition-transform duration-200 hover:rotate-12", current.color)} />
		</button>
	);
};

export default ThemeSwitcher;
