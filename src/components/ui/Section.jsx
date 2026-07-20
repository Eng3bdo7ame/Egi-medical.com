import React from "react";

export const Section = ({
	as: Component = "section",
	size = "md",
	bg = "default",
	className = "",
	children,
	...props
}) => {
	const paddingMap = {
		sm: "py-6 md:py-10",
		md: "py-12 md:py-20",
		lg: "py-18 md:py-28",
	};

	const bgMap = {
		default: "bg-background",
		muted: "bg-surface-2",
		surface: "bg-surface",
	};

	const paddingClass = paddingMap[size] || paddingMap.md;
	const bgClass = bgMap[bg] || bgMap.default;

	return (
		<Component
			className={`${paddingClass} ${bgClass} transition-colors ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Section;
