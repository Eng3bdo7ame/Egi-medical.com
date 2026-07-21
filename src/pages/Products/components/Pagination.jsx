import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	if (totalPages <= 1) return null;

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleLoadMore = () => {
		if (currentPage < totalPages) {
			setIsLoadingMore(true);
			// Simulate network request for loading more
			setTimeout(() => {
				onPageChange(currentPage + 1);
				setIsLoadingMore(false);
			}, 600);
		}
	};

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5; // e.g. 1 2 3 ... 10

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "ellipsis", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
			}
		}
		return pages;
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4 mt-12 mb-8">
			{/* Desktop Pagination */}
			<div className="hidden sm:flex items-center gap-2">
				{/* Prev Button */}
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/60 text-text-secondary hover:bg-surface-2 hover:text-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					aria-label="Previous Page"
				>
					{isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
				</button>

				{/* Page Numbers */}
				<div className="flex items-center gap-1">
					{getPageNumbers().map((page, index) => {
						if (page === "ellipsis") {
							return (
								<div key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-text-secondary">
									<MoreHorizontal className="w-4 h-4" />
								</div>
							);
						}

						return (
							<button
								key={`page-${page}`}
								onClick={() => handlePageChange(page)}
								className={cn(
									"w-10 h-10 flex items-center justify-center rounded-lg font-semibold text-sm transition-all",
									currentPage === page 
										? "bg-primary text-white shadow-sm" 
										: "text-text-secondary hover:bg-surface-2 hover:text-text"
								)}
							>
								{page}
							</button>
						);
					})}
				</div>

				{/* Next Button */}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/60 text-text-secondary hover:bg-surface-2 hover:text-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					aria-label="Next Page"
				>
					{isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
				</button>
			</div>

			{/* Mobile Load More */}
			<div className="flex sm:hidden w-full px-4 flex-col gap-2">
				<button 
					onClick={handleLoadMore}
					disabled={currentPage === totalPages || isLoadingMore}
					className="w-full py-3.5 bg-surface border border-border rounded-xl text-sm font-bold text-text hover:bg-surface-2 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{isLoadingMore ? (
						<>
							<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							{isRtl ? "جاري التحميل..." : "Loading..."}
						</>
					) : currentPage === totalPages ? (
						isRtl ? "نهاية القائمة" : "End of List"
					) : (
						isRtl ? "عرض المزيد" : "Load More"
					)}
				</button>
				<span className="text-xs text-text-muted text-center font-medium mt-1">
					{isRtl 
						? `تم عرض ${currentPage} من أصل ${totalPages} صفحات` 
						: `Showing page ${currentPage} of ${totalPages}`}
				</span>
			</div>
		</div>
	);
};

export default Pagination;
