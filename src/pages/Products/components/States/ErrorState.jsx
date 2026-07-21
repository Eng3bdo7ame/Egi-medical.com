import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { AlertOctagon, RefreshCcw } from "lucide-react";

export const ErrorState = ({ onRetry, message }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col items-center justify-center py-20 px-4 text-center">
			<div className="w-24 h-24 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
				<AlertOctagon className="w-12 h-12" strokeWidth={1.5} />
			</div>
			
			<h3 className="text-2xl font-extrabold text-text mb-3">
				{isRtl ? "عذراً، حدث خطأ ما" : "Oops, Something went wrong"}
			</h3>
			
			<p className="text-text-secondary max-w-sm mb-8">
				{message || (isRtl 
					? "واجهنا مشكلة أثناء محاولة تحميل المنتجات. يرجى المحاولة مرة أخرى." 
					: "We encountered an issue while trying to load the products. Please try again.")}
			</p>

			{onRetry && (
				<button 
					onClick={onRetry}
					className="flex items-center gap-2 px-6 py-3 bg-surface border border-border/80 text-text font-bold rounded-lg hover:border-primary hover:text-primary shadow-sm transition-all"
				>
					<RefreshCcw className="w-5 h-5" />
					{isRtl ? "إعادة المحاولة" : "Retry"}
				</button>
			)}
		</div>
	);
};

export default ErrorState;
