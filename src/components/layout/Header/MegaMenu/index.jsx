import LocalizedLink from "@/components/ui/LocalizedLink";
import React, { useState } from "react";
import { } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { megaMenuData } from "./megamenu.data";
import { cn } from "@/lib/utils";

export const MegaMenu = ({ isOpen, language, isRtl, onClose }) => {
	const [activeCategoryId, setActiveCategoryId] = useState(megaMenuData[0].id);

	const activeCategory = megaMenuData.find((cat) => cat.id === activeCategoryId) || megaMenuData[0];

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
							{megaMenuData.map((category) => {
								const IconComp = category.icon;
								const isActive = category.id === activeCategoryId;
								return (
									<LocalizedLink
										key={category.id}
										to={`/category/${category.id}`}
										onClick={onClose}
										onMouseEnter={() => setActiveCategoryId(category.id)}
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
												"p-1.5 rounded-lg transition-colors",
												isActive ? "bg-primary/10 text-primary" : "bg-surface shadow-sm text-text-muted group-hover:text-primary group-hover:bg-primary/5"
											)}>
												<IconComp className="w-5 h-5" />
											</div>
											<span className={cn(
												"font-bold text-[14px]",
												isActive ? "text-primary" : "text-text-secondary group-hover:text-primary"
											)}>
												{category.title[language]}
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
								{activeCategory.subcategories.map((subcat, index) => (
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

							{/* Optional Banner per Category */}
							{activeCategory.banner && (
								<div className="mt-12 rounded-xl overflow-hidden relative group cursor-pointer border border-border">
									<img 
										src={activeCategory.banner.image} 
										alt={activeCategory.banner.title[language]} 
										className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent flex items-center p-8 rtl:bg-gradient-to-l">
										<h4 className="text-white text-2xl md:text-3xl font-extrabold max-w-[60%] leading-tight drop-shadow-md">
											{activeCategory.banner.title[language]}
										</h4>
									</div>
								</div>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default MegaMenu;
