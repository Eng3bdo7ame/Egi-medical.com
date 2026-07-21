import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { LayoutGrid, Grip, AlignJustify, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
	{ id: "featured", label: { en: "Featured", ar: "مميز" } },
	{ id: "newest", label: { en: "Newest Arrivals", ar: "وصل حديثاً" } },
	{ id: "bestselling", label: { en: "Best Selling", ar: "الأكثر مبيعاً" } },
	{ id: "price-asc", label: { en: "Price: Low to High", ar: "السعر: من الأقل للأعلى" } },
	{ id: "price-desc", label: { en: "Price: High to Low", ar: "السعر: من الأعلى للأقل" } },
	{ id: "rating", label: { en: "Top Rated", ar: "الأعلى تقييماً" } },
	{ id: "discount", label: { en: "Biggest Discount", ar: "أكبر خصم" } },
];

export const Toolbar = ({ 
	totalItems, 
	itemsPerPage, 
	currentPage, 
	viewMode, 
	onViewModeChange,
	sortOption,
	onSortChange,
	onOpenFilter
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [isSortOpen, setIsSortOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown on click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsSortOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Calculate shown items range
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const activeSortLabel = SORT_OPTIONS.find(opt => opt.id === sortOption)?.label[language] || SORT_OPTIONS[0].label[language];

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 mb-6 border-b border-border/60">
			{/* Result Count */}
			<div className="text-sm font-medium text-text-secondary w-full sm:w-auto text-center sm:text-start">
				{isRtl ? (
					<span>عرض <strong className="text-text">{startItem}–{endItem}</strong> من أصل <strong className="text-text">{totalItems}</strong> منتج</span>
				) : (
					<span>Showing <strong className="text-text">{startItem}–{endItem}</strong> of <strong className="text-text">{totalItems}</strong> Products</span>
				)}
			</div>

			<div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
				
				{/* Custom Sort Dropdown */}
				<div className="relative flex items-center gap-2 flex-1 sm:flex-none" ref={dropdownRef}>
					<span className="text-sm text-text-secondary hidden md:inline-block shrink-0">
						{isRtl ? "ترتيب حسب:" : "Sort by:"}
					</span>
					
					{/* Mobile Filter Button (shows only on lg and below) */}
					<button
						onClick={onOpenFilter}
						className="lg:hidden flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-surface border border-border/60 text-sm font-semibold hover:border-primary/50 hover:bg-surface-2 transition-all flex-1 sm:flex-none"
					>
						<svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
						</svg>
						<span>{isRtl ? "الفلاتر" : "Filters"}</span>
					</button>

					<button
						onClick={() => setIsSortOpen(!isSortOpen)}
						className="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface border border-border/60 text-sm font-semibold hover:border-primary/50 hover:bg-surface-2 transition-all min-w-[140px] sm:min-w-[160px] justify-between flex-1 sm:flex-none"
					>
						<span className="truncate">{activeSortLabel}</span>
						<ChevronDown className={cn("w-4 h-4 text-text-secondary transition-transform duration-200", isSortOpen && "rotate-180")} />
					</button>

					{/* Dropdown Menu */}
					{isSortOpen && (
						<div className={cn(
							"absolute top-full mt-2 w-[220px] bg-surface rounded-xl shadow-lg border border-border/60 py-2 z-50 overflow-hidden",
							isRtl ? "left-0" : "right-0"
						)}>
							{SORT_OPTIONS.map((option) => (
								<button
									key={option.id}
									onClick={() => {
										onSortChange(option.id);
										setIsSortOpen(false);
									}}
									className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-start hover:bg-primary/5 transition-colors group"
								>
									<span className={cn(
										"transition-colors",
										sortOption === option.id ? "font-bold text-primary" : "text-text group-hover:text-primary"
									)}>
										{option.label[language]}
									</span>
									{sortOption === option.id && (
										<Check className="w-4 h-4 text-primary" />
									)}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Divider */}
				<div className="hidden sm:block w-px h-6 bg-border/60" />

				{/* View Toggle */}
				<div className="flex items-center bg-surface border border-border/60 rounded-lg p-1 shrink-0">
					{/* Grid 2 / Mobile Grid */}
					<button
						onClick={() => onViewModeChange("grid-2")}
						className={cn(
							"w-8 h-8 rounded-md flex items-center justify-center transition-all md:hidden",
							viewMode === "grid-2" ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:text-text hover:bg-surface-2"
						)}
						title="Grid View"
					>
						<LayoutGrid className="w-4 h-4" />
					</button>

					{/* Grid 3 (Tablet/Desktop) */}
					<button
						onClick={() => onViewModeChange("grid-3")}
						className={cn(
							"hidden md:flex w-8 h-8 rounded-md items-center justify-center transition-all lg:hidden",
							viewMode === "grid-3" ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:text-text hover:bg-surface-2"
						)}
						title="Grid View"
					>
						<Grip className="w-5 h-5" />
					</button>

					{/* Grid 4 (Large Desktop) */}
					<button
						onClick={() => onViewModeChange("grid-4")}
						className={cn(
							"hidden lg:flex w-8 h-8 rounded-md items-center justify-center transition-all",
							viewMode === "grid-4" ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:text-text hover:bg-surface-2"
						)}
						title="Large Grid View"
					>
						<Grip className="w-5 h-5" />
					</button>

					{/* List View */}
					<button
						onClick={() => onViewModeChange("list")}
						className={cn(
							"w-8 h-8 rounded-md flex items-center justify-center transition-all",
							viewMode === "list" ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:text-text hover:bg-surface-2"
						)}
						title="List View"
					>
						<AlignJustify className="w-5 h-5" />
					</button>
				</div>
				
			</div>
		</div>
	);
};

export default Toolbar;
