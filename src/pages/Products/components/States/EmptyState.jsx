import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { FileQuestion, XCircle } from "lucide-react";

export const EmptyState = ({ onClearFilters }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col items-center justify-center py-20 px-4 text-center">
			<div className="w-24 h-24 bg-surface-2 rounded-full flex items-center justify-center mb-6 relative">
				<FileQuestion className="w-12 h-12 text-text-secondary opacity-50" strokeWidth={1.5} />
				<div className="absolute -bottom-2 -right-2 w-8 h-8 bg-background rounded-full flex items-center justify-center">
					<div className="w-6 h-6 bg-surface-2 rounded-full flex items-center justify-center">
						<span className="text-lg">😕</span>
					</div>
				</div>
			</div>
			
			<h3 className="text-2xl font-extrabold text-text mb-3">
				{isRtl ? "لم يتم العثور على منتجات" : "No Products Found"}
			</h3>
			
			<p className="text-text-secondary max-w-sm mb-8">
				{isRtl 
					? "عذراً، لا توجد منتجات تطابق خيارات التصفية الحالية. جرب إزالة بعض الفلاتر للبحث مرة أخرى." 
					: "Sorry, no products match your current filters. Try removing some filters to search again."}
			</p>

			{onClearFilters && (
				<button 
					onClick={onClearFilters}
					className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
				>
					<XCircle className="w-5 h-5" />
					{isRtl ? "مسح الفلاتر" : "Clear Filters"}
				</button>
			)}
		</div>
	);
};

export default EmptyState;
