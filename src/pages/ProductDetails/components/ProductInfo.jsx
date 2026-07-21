import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductPrice } from "@/components/ui/ProductCard/ProductPrice";

export const ProductInfo = ({ product }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!product) return null;

	return (
		<div className="flex flex-col gap-4">
			{/* Brand & Badges */}
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2 px-3 py-1 bg-surface-2 rounded-full border border-border">
					<ShieldCheck className="w-4 h-4 text-primary" />
					<span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
						{product.brand?.name}
					</span>
				</div>

				{product.badges && product.badges.length > 0 && (
					<div className="flex gap-2">
						{product.badges.map((badge, idx) => (
							<span 
								key={idx} 
								className={cn(
									"px-2.5 py-1 rounded-[6px] text-[10px] font-extrabold uppercase tracking-wider",
									badge.type === "sale" ? "bg-danger text-white" :
									badge.type === "bestseller" ? "bg-warning text-white" :
									badge.type === "new" ? "bg-success text-white" :
									"bg-surface-2 text-text"
								)}
							>
								{badge.label[language]}
							</span>
						))}
					</div>
				)}
			</div>

			{/* Title */}
			<h1 className="text-2xl md:text-3xl font-extrabold text-text leading-tight">
				{product.title[language]}
			</h1>

			{/* Ratings */}
			{product.reviews && (
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star 
								key={i} 
								className={cn(
									"w-4 h-4", 
									i < Math.floor(product.reviews.rating) 
										? "fill-warning text-warning" 
										: "fill-border text-border"
								)} 
							/>
						))}
					</div>
					<div className="flex items-center gap-2 text-sm">
						<span className="font-bold text-text">{product.reviews.rating}</span>
						<span className="text-text-muted">
							({product.reviews.count} {isRtl ? "تقييم" : "reviews"})
						</span>
					</div>
				</div>
			)}

			{/* Price */}
			<div className="my-2 p-4 bg-surface rounded-xl border border-border/50">
				<ProductPrice price={product.price} language={language} className="text-3xl" />
				<span className="text-xs text-text-muted mt-2 block">
					{isRtl ? "السعر شامل ضريبة القيمة المضافة" : "Price includes VAT"}
				</span>
			</div>

			{/* Short Description */}
			<p className="text-text-secondary text-sm leading-relaxed">
				{product.shortDescription?.[language]}
			</p>
		</div>
	);
};

export default ProductInfo;
