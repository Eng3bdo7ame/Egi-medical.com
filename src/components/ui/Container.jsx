import React from "react";

export const Container = ({
	as: Component = "div",
	clean = false,
	className = "",
	children,
	...props
}) => {
	const baseClass = "w-full max-w-[1440px] mx-auto";
	const paddingClass = clean ? "" : "px-4 md:px-6";

	return (
		<Component
			className={`${baseClass} ${paddingClass} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Container;
