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

	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	// Fallback to first category if activeCategoryId is not selected yet
	const activeCategoryId = selectedCategoryId || categories[0]?.id;
	const activeCategory = categories.find((cat) => cat.id === activeCategoryId) || categories[0];

	const getSubcategories = (category) => {
		if (!category) return [];
		const subCats = category.sub_categories || [];
		if (subCats.length > 0) {
			return subCats.map(sub => {
				const subTitle = getLocalizedValue(sub.title || sub.name);
				return {
					title: subTitle,
					links: [
						{
							name: { en: `All ${subTitle.en}`, ar: `عرض الكل في ${subTitle.ar}` },
							path: `/products?category=${sub.id}`
						}
					]
				};
			});
		}

		// Fallback explore links for parent categories without subcategories
		const catTitle = getLocalizedValue(category.title);
		return [
			{
				title: catTitle,
				links: [
					{
						name: { en: "Browse All Products", ar: "تصفح جميع المنتجات" },
						path: `/products?category=${category.id}`
					},
					{
						name: { en: "New Arrivals", ar: "أحدث المنتجات المضافة" },
						path: `/products?category=${category.id}&sort=newest`
					}
				]
			}
		];
	};

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
						className="relative w-full h-[500px] bg-surface rounded-b-xl shadow-2xl z-50 border border-border overflow-hidden flex"
						onMouseLeave={onClose}
					>
						{/* Sidebar - Main Categories */}
						<div className="w-[28%] h-full bg-surface-2 border-e border-border flex flex-col py-3 overflow-y-auto custom-scrollbar">
							{categories.map((category) => {
								const isActive = category.id === activeCategoryId;
								const categoryTitle = getLocalizedValue(category.title);
								return (
									<LocalizedLink
										key={category.id}
										to={`/category/${category.id}`}
										onClick={onClose}
										onMouseEnter={() => setSelectedCategoryId(category.id)}
										className={cn(
											"w-full flex items-center justify-between px-6 py-3.5 text-start transition-all duration-200 group relative",
											isActive ? "bg-surface shadow-sm border-y border-transparent" : "hover:bg-surface-2/80 border-y border-transparent"
										)}
									>
										{/* Active Indicator Line */}
										{isActive && (
											<div className={cn("absolute top-0 bottom-0 w-1 bg-primary", isRtl ? "right-0" : "left-0")} />
										)}

										<div className="flex items-center gap-3">
											<div className={cn(
												"w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center transition-colors bg-white border border-border/40 p-1 shrink-0",
												isActive ? "border-primary/30 bg-primary/5 text-primary" : "text-text-muted group-hover:text-primary group-hover:bg-primary/5"
											)}>
												{category.image ? (
													<img src={category.image} alt="" className="w-full h-full object-contain" />
												) : (
													<span className="w-2 h-2 rounded-full bg-primary" />
												)}
											</div>
											<span className={cn(
												"font-bold text-[14px]",
												isActive ? "text-primary" : "text-text-secondary group-hover:text-primary"
											)}>
												{categoryTitle[language]}
											</span>
										</div>
										{isRtl ? (
											<ChevronLeft className={cn("w-4 h-4 transition-all", isActive ? "text-primary opacity-100" : "text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
										) : (
											<ChevronRight className={cn("w-4 h-4 transition-all", isActive ? "text-primary opacity-100" : "text-text-muted opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
										)}
									</LocalizedLink>
								);
							})}
						</div>

						{/* Content Area - Subcategories */}
						<div className="flex-1 h-full p-8 bg-surface overflow-y-auto custom-scrollbar">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
								{getSubcategories(activeCategory).map((subcat, index) => (
									<div key={index} className="flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group/card">
										{/* Card Header */}
										<div className="bg-surface-2/80 border-b border-border/60 px-5 py-3.5 flex items-center gap-3 group-hover/card:bg-primary/5 transition-colors duration-300">
											<div className="w-7 h-7 shrink-0 rounded-md bg-surface-2 shadow-sm border border-border flex items-center justify-center">
												<span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-primary to-primary/60" />
											</div>
											<h3 className="font-extrabold text-[15px] text-text tracking-tight">
												{subcat.title[language]}
											</h3>
										</div>

										{/* Card Body (Links) */}
										<div className="p-3">
											<ul className="flex flex-col gap-1">
												{subcat.links.map((link, i) => (
													<li key={i}>
														<LocalizedLink
															to={link.path}
															onClick={onClose}
															className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-2 hover:text-primary transition-all duration-200 group"
														>
															<div className="w-5 h-5 shrink-0 rounded bg-surface-2 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white group-hover:shadow-sm transition-all duration-200">
																{isRtl ? (
																	<ChevronLeft className="w-3 h-3" />
																) : (
																	<ChevronRight className="w-3 h-3" />
																)}
															</div>
															<span className="text-[13px] font-semibold text-text-secondary group-hover:text-primary transition-colors line-clamp-1">
																{link.name[language]}
															</span>
														</LocalizedLink>
													</li>
												))}
											</ul>
										</div>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default MegaMenu;
