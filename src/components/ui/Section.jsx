import React from "react";
import { cn } from "@/lib/utils";

export const Section = ({
	as: Component = "section",
	spacing = "md",
	bg = "default",
	className,
	children,
	...props
}) => {
	// Relies entirely on Tailwind's native spacing scale for extreme readability
	const spacingMap = {
		sm: "py-8 md:py-12",
		md: "py-12 md:py-20",
		lg: "py-16 md:py-28",
	};

	const bgMap = {
		default: "bg-background",
		muted: "bg-surface-2",
		surface: "bg-surface",
	};

	const paddingClass = spacingMap[spacing] || spacingMap.md;
	const bgClass = bgMap[bg] || bgMap.default;

	return (
		<Component
			className={cn(paddingClass, bgClass, "transition-colors duration-200", className)}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Section;
