import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";

export const ProductTitle = ({ title }) => {
	return (
		<h3 className="text-sm font-bold text-text leading-tight line-clamp-2 h-10 group-hover:text-primary transition-colors">
			{title}
		</h3>
	);
};
