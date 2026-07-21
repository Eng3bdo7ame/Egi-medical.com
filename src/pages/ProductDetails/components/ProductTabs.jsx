import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Info, Settings2, MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import SpecificationTable from "./SpecificationTable";
import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";

export const ProductTabs = ({ description, specifications, reviews }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [activeTab, setActiveTab] = useState("description");

	const tabs = [
		{ id: "description", label: { en: "Description", ar: "الوصف" }, icon: Info },
		{ id: "specifications", label: { en: "Specifications", ar: "المواصفات" }, icon: Settings2 },
		{ id: "reviews", label: { en: `Reviews (${reviews?.length || 0})`, ar: `التقييمات (${reviews?.length || 0})` }, icon: MessageSquare }
	];

	return (
		<div className="mt-12 bg-surface rounded-2xl border border-border overflow-hidden">
			
			{/* Tabs Header */}
			<div className="flex border-b border-border overflow-x-auto hide-scrollbar">
				{tabs.map(tab => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								"flex items-center gap-2 px-6 py-5 min-w-max font-bold text-sm transition-colors border-b-2",
								isActive 
									? "border-primary text-primary bg-primary/5" 
									: "border-transparent text-text-secondary hover:text-text hover:bg-surface-2"
							)}
						>
							<Icon className="w-4 h-4" />
							{tab.label[language]}
						</button>
					);
				})}
			</div>

			{/* Tabs Content */}
			<div className="p-6 md:p-8">
				
				{/* Description Tab */}
				<div className={cn(activeTab === "description" ? "block" : "hidden")}>
					<div 
						className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:text-text-secondary prose-headings:text-text"
						dangerouslySetInnerHTML={{ __html: description?.[language] || "" }} 
					/>
				</div>

				{/* Specifications Tab */}
				<div className={cn(activeTab === "specifications" ? "block" : "hidden")}>
					<SpecificationTable specifications={specifications} />
				</div>

				{/* Reviews Tab */}
				<div className={cn(activeTab === "reviews" ? "block" : "hidden")}>
					<RatingSummary reviews={reviews} />
					
					<div className="flex flex-col gap-4">
						{reviews && reviews.length > 0 ? (
							reviews.map(review => (
								<ReviewCard key={review.id} review={review} />
							))
						) : (
							<div className="text-center py-10">
								<MessageSquare className="w-12 h-12 text-border mx-auto mb-3" />
								<p className="text-text-secondary font-medium">
									{isRtl ? "لا توجد تقييمات بعد." : "No reviews yet."}
								</p>
							</div>
						)}
					</div>
					
					{reviews && reviews.length > 3 && (
						<button className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-primary font-bold bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors">
							{isRtl ? "عرض المزيد" : "Load More"}
							<ChevronDown className="w-4 h-4" />
						</button>
					)}
				</div>

			</div>
		</div>
	);
};

export default ProductTabs;
