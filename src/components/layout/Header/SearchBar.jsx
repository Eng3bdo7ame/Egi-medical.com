import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * SearchBar Component
 * Matches the reference design: Search input on left, category dropdown on right, big blue search button.
 */

const CATEGORIES = {
	en: [
		{ value: "all", label: "All Categories" },
		{ value: "devices", label: "Medical Devices" },
		{ value: "consumables", label: "Consumables" },
		{ value: "homecare", label: "Home Care" },
		{ value: "diagnostics", label: "Diagnostics" },
		{ value: "orthopedics", label: "Orthopedics" },
	],
	ar: [
		{ value: "all", label: "كل الأقسام" },
		{ value: "devices", label: "الأجهزة الطبية" },
		{ value: "consumables", label: "المستلزمات" },
		{ value: "homecare", label: "الرعاية المنزلية" },
		{ value: "diagnostics", label: "التشخيص" },
		{ value: "orthopedics", label: "العظام" },
	],
};

export const SearchBar = ({ className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [category, setCategory] = useState("all");

	const categories = CATEGORIES[language] || CATEGORIES.en;

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className={cn(
				"flex items-stretch w-full max-w-3xl h-[52px] rounded-[14px] overflow-hidden",
				"border border-border-normal focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
				"bg-surface shadow-sm transition-all duration-200",
				className
			)}
			role="search"
			aria-label={isRtl ? "البحث عن المنتجات" : "Search products"}
		>
			{/* Search Input (Left) */}
			<input
				type="search"
				placeholder={
					isRtl
						? "ابحث عن الأدوية، الأجهزة، الماركات والمزيد..."
						: "Search for medicines, devices, brands and more..."
				}
				className="flex-1 bg-transparent text-[15px] text-text placeholder:text-text-muted px-5 outline-none min-w-0"
				aria-label={isRtl ? "حقل البحث" : "Search field"}
			/>

			{/* Category Selector (Right) */}
			<div className="relative hidden md:flex items-center border-s border-divider bg-transparent shrink-0">
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="appearance-none bg-transparent text-text-secondary text-sm font-medium ps-4 pe-9 h-full cursor-pointer outline-none hover:text-text transition-colors"
				>
					{categories.map((cat) => (
						<option key={cat.value} value={cat.value}>
							{cat.label}
						</option>
					))}
				</select>
				<Icon name="ChevronDown" size="sm" className="absolute end-3 text-text-muted pointer-events-none" />
			</div>

			{/* Search Button (Far Right) */}
			<button
				type="submit"
				className="flex items-center justify-center w-16 bg-primary hover:bg-primary-hover active:bg-primary-active text-white transition-colors duration-200 shrink-0 cursor-pointer"
				aria-label={isRtl ? "بحث" : "Search"}
			>
				<Icon name="Search" size={22} strokeWidth={2.5} />
			</button>
		</form>
	);
};

export default SearchBar;
