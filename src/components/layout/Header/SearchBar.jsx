import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<form 
			onSubmit={(e) => e.preventDefault()} 
			className="w-full max-w-2xl flex items-center bg-surface border-2 border-primary/20 hover:border-primary/40 focus-within:border-primary rounded-xl overflow-hidden shadow-sm transition-all duration-fast"
		>
			{/* Category Selector */}
			<select
				className="bg-surface-2 text-text-secondary text-xs font-semibold px-3 py-3 outline-none border-r border-border/20 cursor-pointer hidden sm:block"
				defaultValue="all"
			>
				<option value="all">{isRtl ? "كل الأقسام" : "All Categories"}</option>
				<option value="devices">{isRtl ? "الأجهزة الطبية" : "Medical Devices"}</option>
				<option value="consumables">{isRtl ? "المستلزمات الطبية" : "Consumables"}</option>
				<option value="homecare">{isRtl ? "الرعاية المنزلية" : "Home Care"}</option>
				<option value="diagnostics">{isRtl ? "أجهزة التشخيص" : "Diagnostics"}</option>
			</select>

			{/* Search Input */}
			<div className="relative flex-1 flex items-center px-3">
				<span className="text-text-muted text-sm px-1">🔍</span>
				<input
					type="search"
					placeholder={isRtl 
						? "ابحث عن المنتجات، الماركات، رقم الموديل أو SKU..." 
						: "Search products, brands, model number or SKU..."
					}
					className="w-full py-2.5 text-sm bg-transparent border-none outline-none text-text placeholder:text-text-muted/60"
				/>
			</div>

			{/* Search Submit Button */}
			<Button 
				type="submit" 
				variant="default" 
				className="rounded-none px-5 py-3 text-xs font-bold uppercase tracking-wider h-full"
			>
				{isRtl ? "بحث" : "Search"}
			</Button>
		</form>
	);
};

export default SearchBar;
