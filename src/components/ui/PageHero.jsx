import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * PageHero Component
 * A compact internal page hero banner for non-homepage pages.
 *
 * @variant API:
 * - title: { en, ar } — Main page heading
 * - subtitle: { en, ar } — Optional description
 * - count: number — Optional product/item count badge
 * - countLabel: { en, ar } — Optional label for count (defaults to "Products")
 */
export const PageHero = ({ title, subtitle, count, countLabel, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const defaultCountLabel = { en: "Products", ar: "منتج" };
	const resolvedCountLabel = countLabel || defaultCountLabel;

	return (
		<div
			className={cn(
				"relative bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-50 border-b border-border/40 overflow-hidden",
				className
			)}
		>
			{/* Decorative Dot Grid */}
			<div className="absolute top-2 end-6 w-28 h-36 opacity-20 pointer-events-none">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="pageHeroDots" width="18" height="18" patternUnits="userSpaceOnUse">
							<circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-primary" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#pageHeroDots)" />
				</svg>
			</div>

			<Container className="relative z-10 py-8 sm:py-10 md:py-12">
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
					{/* Title & Subtitle */}
					<div className="flex flex-col gap-1.5">
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text tracking-tight">
							{title?.[language] || title}
						</h1>
						{subtitle && (
							<p className="text-sm sm:text-base text-text-secondary max-w-lg">
								{subtitle?.[language] || subtitle}
							</p>
						)}
					</div>

					{/* Product Count Badge */}
					{count != null && (
						<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
							<span className="w-2 h-2 rounded-full bg-primary" />
							<span>
								{count.toLocaleString(isRtl ? "ar-EG" : "en-US")} {resolvedCountLabel[language]}
							</span>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default PageHero;
