import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";

export const Logo = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Link to="/" className="flex items-center gap-2 select-none group focus-visible:ring-2 focus-visible:ring-primary/20 rounded-md outline-none">
			<img
				className="h-10 w-auto transition-transform group-hover:scale-105 duration-fast"
				src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
				alt="Mootah Care Logo"
			/>
			<span className="font-bold text-xl tracking-wider text-primary transition-colors">
				{isRtl ? "مؤتة كير" : "Mootah Care"}
			</span>
		</Link>
	);
};

export default Logo;
