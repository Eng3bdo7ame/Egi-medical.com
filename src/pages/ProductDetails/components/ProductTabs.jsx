import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Info, Settings2, MessageSquare, ChevronDown, HelpCircle, Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import SpecificationTable from "./SpecificationTable";
import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import QnASubtab from "./QnASubtab";
import TrustBadges from "./TrustBadges";
import MedicalDisclaimer from "./MedicalDisclaimer";

export const ProductTabs = ({ description, specifications, reviews }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [activeTab, setActiveTab] = useState("description");

	// Local reviews state for dynamic additions
	const [localReviews, setLocalReviews] = useState(reviews || []);
	const [selectedRating, setSelectedRating] = useState(null);

	// Sync local state when prop changes
	useEffect(() => {
		setLocalReviews(reviews || []);
		setSelectedRating(null);
	}, [reviews]);

	// Review form states
	const [formRating, setFormRating] = useState(5);
	const [formName, setFormName] = useState("");
	const [formTitle, setFormTitle] = useState("");
	const [formComment, setFormComment] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		if (!formComment.trim()) return;

		const newReview = {
			id: Date.now(),
			user: formName.trim() || (isRtl ? "مستخدم" : "Anonymous"),
			verified: true,
			date: isRtl ? "الآن" : "Just now",
			rating: formRating,
			title: formTitle,
			comment: formComment
		};

		setLocalReviews([newReview, ...localReviews]);
		setFormName("");
		setFormTitle("");
		setFormComment("");
		setFormRating(5);
		setIsSubmitted(true);
		setTimeout(() => setIsSubmitted(false), 4000);
	};

	const filteredReviews = selectedRating 
		? localReviews.filter(r => Math.floor(r.rating) === selectedRating)
		: localReviews;

	const tabs = [
		{ id: "description", label: { en: "Description", ar: "الوصف" }, icon: Info },
		{ id: "specifications", label: { en: "Specifications", ar: "المواصفات" }, icon: Settings2 },
		{ id: "reviews", label: { en: `Reviews (${localReviews?.length || 0})`, ar: `التقييمات (${localReviews?.length || 0})` }, icon: MessageSquare },
		{ id: "qna", label: { en: "Q&A", ar: "الأسئلة والأجوبة" }, icon: HelpCircle }
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
					<div className="w-full overflow-x-auto">
						<div 
							className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:text-text-secondary prose-headings:text-text prose-table:w-full prose-table:border-collapse prose-th:bg-surface-2 prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border mb-8 min-w-full"
							dangerouslySetInnerHTML={{ __html: description?.[language] || "" }} 
						/>
					</div>
					
					<div className="flex flex-col gap-6 pt-6 border-t border-border">
						<h3 className="text-lg font-bold text-text">
							{isRtl ? "ميزات إضافية وضمانات" : "Additional Features & Guarantees"}
						</h3>
						<TrustBadges />
						<MedicalDisclaimer />
					</div>
				</div>

				{/* Specifications Tab */}
				<div className={cn(activeTab === "specifications" ? "block" : "hidden")}>
					<SpecificationTable specifications={specifications} />
				</div>

				{/* Reviews Tab */}
				<div className={cn(activeTab === "reviews" ? "block" : "hidden")}>
					<RatingSummary 
						reviews={localReviews} 
						selectedRating={selectedRating} 
						onRatingSelect={setSelectedRating} 
					/>

					{selectedRating && (
						<div className="mb-4 flex items-center justify-between bg-primary/5 border border-primary/20 p-3 rounded-xl">
							<span className="text-sm text-text-secondary font-medium">
								{isRtl 
									? `عرض التقييمات ذات الـ ${selectedRating} نجوم فقط` 
									: `Showing only ${selectedRating} star reviews`}
							</span>
							<button 
								onClick={() => setSelectedRating(null)}
								className="text-xs text-primary font-bold hover:underline"
							>
								{isRtl ? "عرض الكل" : "Show All"}
							</button>
						</div>
					)}
					
					<div className="flex flex-col gap-4">
						{filteredReviews && filteredReviews.length > 0 ? (
							filteredReviews.map(review => (
								<ReviewCard key={review.id} review={review} />
							))
						) : (
							<div className="text-center py-10">
								<MessageSquare className="w-12 h-12 text-border mx-auto mb-3" />
								<p className="text-text-secondary font-medium">
									{isRtl ? "لا توجد تقييمات مطابقة." : "No matching reviews found."}
								</p>
							</div>
						)}
					</div>
					
					{filteredReviews && filteredReviews.length > 3 && (
						<button className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-primary font-bold bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors">
							{isRtl ? "عرض المزيد" : "Load More"}
							<ChevronDown className="w-4 h-4" />
						</button>
					)}

					{/* Write a Review Section */}
					<div className="mt-12 pt-8 border-t border-border bg-surface-2/10 p-6 sm:p-8 rounded-2xl border border-border/50">
						<h3 className="text-xl font-bold text-text mb-4">
							{isRtl ? "اكتب تقييمك للمنتج" : "Write a Customer Review"}
						</h3>

						{isSubmitted ? (
							<div className="p-4 bg-success/10 text-success border border-success/20 rounded-xl flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center shrink-0">
									<Check className="w-4 h-4" />
								</div>
								<div className="flex flex-col">
									<span className="font-bold text-sm">{isRtl ? "تم نشر تقييمك بنجاح!" : "Review submitted successfully!"}</span>
									<span className="text-xs text-success/80">{isRtl ? "شكراً لمشاركتك رأيك القيمة معنا." : "Thank you for sharing your valuable feedback."}</span>
								</div>
							</div>
						) : (
							<form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
								<div className="flex items-center gap-2 mb-2">
									<span className="text-sm font-bold text-text-secondary">{isRtl ? "تقييمك بالنجوم:" : "Your Rating:"}</span>
									<div className="flex items-center gap-1">
										{[1, 2, 3, 4, 5].map((star) => (
											<button 
												type="button"
												key={star}
												onClick={() => setFormRating(star)}
												className="text-warning p-0.5 hover:scale-110 transition-transform"
											>
												<Star className={cn("w-6 h-6", star <= formRating ? "fill-warning" : "text-border")} />
											</button>
										))}
									</div>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-bold text-text-secondary">{isRtl ? "الاسم" : "Name"}</label>
										<input 
											type="text" 
											value={formName}
											onChange={e => setFormName(e.target.value)}
											placeholder={isRtl ? "مثال: أحمد محمد" : "e.g. John Doe"}
											className="h-11 px-4 bg-surface border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
										/>
									</div>
									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-bold text-text-secondary">{isRtl ? "عنوان التقييم" : "Review Title"}</label>
										<input 
											type="text" 
											value={formTitle}
											onChange={e => setFormTitle(e.target.value)}
											placeholder={isRtl ? "مثال: جودة ممتازة وسهل الاستخدام" : "e.g. Excellent build quality"}
											className="h-11 px-4 bg-surface border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
										/>
									</div>
								</div>

								<div className="flex flex-col gap-1.5">
									<label className="text-xs font-bold text-text-secondary">{isRtl ? "تعليقك" : "Review Details"}</label>
									<textarea 
										rows="4"
										value={formComment}
										onChange={e => setFormComment(e.target.value)}
										placeholder={isRtl ? "اكتب رأيك بالتفصيل هنا حول تجربتك للمنتج..." : "Write your detailed feedback about the product here..."}
										className="p-4 bg-surface border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
										required
									/>
								</div>

								<div className="flex justify-end">
									<button 
										type="submit"
										className="h-12 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-sm active:scale-[0.98] text-sm"
									>
										{isRtl ? "نشر التقييم" : "Submit Review"}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>

				{/* Q&A Tab */}
				<div className={cn(activeTab === "qna" ? "block" : "hidden")}>
					<QnASubtab />
				</div>

			</div>
		</div>
	);
};

export default ProductTabs;
