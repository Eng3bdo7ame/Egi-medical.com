import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProductTabs = ({ description, specifications, reviews }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [activeTab, setActiveTab] = useState("description");

	const tabs = [
		{ id: "description", label: { en: "Description", ar: "الوصف" } },
		{ id: "specifications", label: { en: "Specifications", ar: "المواصفات" } },
		{ id: "reviews", label: { en: `Reviews (${reviews?.length || 0})`, ar: `التقييمات (${reviews?.length || 0})` } }
	];

	return (
		<div className="w-full mt-12 bg-surface rounded-2xl border border-border overflow-hidden">
			
			{/* Tab Headers */}
			<div className="flex border-b border-border/60 overflow-x-auto no-scrollbar">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={cn(
							"px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors",
							activeTab === tab.id 
								? "border-primary text-primary" 
								: "border-transparent text-text-secondary hover:text-text hover:bg-surface-2/50"
						)}
					>
						{tab.label[language]}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="p-6 md:p-8">
				
				{/* Description Tab */}
				<div className={cn(activeTab === "description" ? "block" : "hidden")}>
					<div 
						className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:text-text-secondary prose-headings:text-text prose-li:text-text-secondary prose-strong:text-text"
						dangerouslySetInnerHTML={{ __html: description?.[language] || "" }}
					/>
				</div>

				{/* Specifications Tab */}
				<div className={cn(activeTab === "specifications" ? "block" : "hidden")}>
					<div className="flex flex-col rounded-xl overflow-hidden border border-border/60">
						{specifications?.map((spec, index) => (
							<div 
								key={index}
								className={cn(
									"flex flex-col sm:flex-row sm:items-center py-3 px-4 gap-2 sm:gap-6",
									index % 2 === 0 ? "bg-surface-2/50" : "bg-surface"
								)}
							>
								<span className="w-1/3 text-sm font-bold text-text shrink-0">
									{spec.label[language]}
								</span>
								<span className="text-sm text-text-secondary">
									{spec.value[language]}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Reviews Tab */}
				<div className={cn(activeTab === "reviews" ? "block" : "hidden")}>
					{reviews?.length > 0 ? (
						<div className="flex flex-col gap-6">
							{reviews.map((review) => (
								<div key={review.id} className="flex flex-col gap-3 pb-6 border-b border-border/60 last:border-0 last:pb-0">
									
									<div className="flex items-start justify-between gap-4">
										<div className="flex flex-col gap-1">
											<span className="font-bold text-text">{review.user}</span>
											{review.verified && (
												<span className="flex items-center gap-1 text-[10px] text-success font-bold uppercase tracking-wider">
													<CheckCircle className="w-3 h-3" />
													{isRtl ? "مشتري مؤكد" : "Verified Buyer"}
												</span>
											)}
										</div>
										<span className="text-xs text-text-muted">{review.date}</span>
									</div>

									<div className="flex flex-col gap-1.5">
										<div className="flex items-center gap-1">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star 
													key={i} 
													className={cn(
														"w-3.5 h-3.5",
														i < review.rating ? "fill-warning text-warning" : "fill-border text-border"
													)} 
												/>
											))}
										</div>
										<h4 className="font-bold text-text text-sm">
											{review.title[language]}
										</h4>
										<p className="text-sm text-text-secondary">
											{review.comment[language]}
										</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-text-muted">
							{isRtl ? "لا توجد تقييمات بعد." : "No reviews yet."}
						</div>
					)}
				</div>

			</div>
		</div>
	);
};

export default ProductTabs;
