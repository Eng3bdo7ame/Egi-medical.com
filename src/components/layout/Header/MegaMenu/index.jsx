import LocalizedLink from "@/components/ui/LocalizedLink";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/queries/useCategories";

/**
 * Localize helper to ensure titles and localized values always support { en, ar } structure.
 */
const getLocalizedValue = (value) => {
	if (!value) return { en: "", ar: "" };
	if (typeof value === "object") {
		return {
			en: value.en || value.ar || "",
			ar: value.ar || value.en || ""
		};
	}
	return { en: value, ar: value };
};

export const MegaMenu = ({ isOpen, language, isRtl, onClose }) => {
	const { data: responseData, isLoading } = useCategories();
	const categories = responseData?.data || (Array.isArray(responseData) ? responseData : []);

	if (isOpen && isLoading) {
		return (
			<AnimatePresence>
				<div className="absolute top-0 w-[100vw] h-[100vh] left-1/2 -translate-x-1/2 bg-slate-900/30 backdrop-blur-md z-40" onClick={onClose} />
				<motion.div
					initial={{ opacity: 0, y: -5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -5 }}
					className="relative w-full h-[300px] bg-surface rounded-b-xl shadow-2xl z-50 border border-border flex items-center justify-center"
					onMouseLeave={onClose}
				>
					<div className="flex flex-col items-center gap-3 text-text-secondary">
						<span className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
						<span className="font-bold text-sm">
							{language === "ar" ? "جاري تحميل الأقسام..." : "Loading categories..."}
						</span>
					</div>
				</motion.div>
			</AnimatePresence>
		);
	}

	if (isOpen && categories.length === 0) {
		return (
			<AnimatePresence>
				<div className="absolute top-0 w-[100vw] h-[100vh] left-1/2 -translate-x-1/2 bg-slate-900/30 backdrop-blur-md z-40" onClick={onClose} />
				<motion.div
					initial={{ opacity: 0, y: -5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -5 }}
					className="relative w-full h-[200px] bg-surface rounded-b-xl shadow-2xl z-50 border border-border flex items-center justify-center"
					onMouseLeave={onClose}
				>
					<span className="text-text-secondary font-bold">
						{language === "ar" ? "لا توجد أقسام متاحة حالياً" : "No categories available"}
					</span>
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="absolute top-0 w-[100vw] h-[100vh] left-1/2 -translate-x-1/2 bg-slate-900/30 backdrop-blur-md z-40"
						onClick={onClose}
					/>

					{/* Mega Menu Container */}
					<motion.div
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						transition={{ duration: 0.2 }}
						className={cn(
							"relative w-[1000px] max-w-[95vw] h-auto max-h-[420px] bg-surface rounded-b-xl shadow-2xl z-50 border border-border overflow-hidden flex",
							isRtl ? "rounded-tl-xl" : "rounded-tr-xl"
						)}
						onMouseLeave={onClose}
					>
						{/* Grid Layout for Categories */}
						<div className="w-full h-auto p-6 bg-[#fdfaf2] overflow-y-auto custom-scrollbar">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6">
								{categories.map((category) => {
									const categoryTitle = getLocalizedValue(category.title || category.name);
									
									// Build a subtitle from subcategories or use a fallback
									const subCats = category.sub_categories || [];
									let subtitle = "";
									if (subCats.length > 0) {
										subtitle = subCats.slice(0, 3).map(s => getLocalizedValue(s.title || s.name)[language]).join(', ');
										if (subCats.length > 3) subtitle += "...";
									} else {
										subtitle = language === "ar" 
											? "تصفح أحدث المنتجات في هذا القسم." 
											: "Browse the latest products in this category.";
									}

									return (
										<LocalizedLink
											key={category.id}
											to={`/category/${category.id}`}
											onClick={onClose}
											className="flex flex-col group/card p-3 -m-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300"
										>
											<h3 className="font-extrabold text-[15px] text-slate-800 tracking-tight group-hover/card:text-secondary transition-colors duration-200">
												{categoryTitle[language]}
											</h3>
											<p className="text-[13.5px] text-slate-500 mt-1.5 leading-relaxed">
												{subtitle}
											</p>
										</LocalizedLink>
									);
								})}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default MegaMenu;
