import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import { mockProducts } from "@/pages/Products/components/products.mock";
import { History } from "lucide-react";

export const RecentlyViewed = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Take the first 4 products for mockup purposes
	const recentProducts = mockProducts.slice(0, 4);

	if (!recentProducts.length) return null;

	return (
		<section className="py-16 bg-surface-2/30 border-t border-border/50">
			<Container>
				<div className="flex items-center gap-3 mb-8">
					<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
						<History className="w-5 h-5" />
					</div>
					<h2 className="text-2xl font-extrabold text-text">
						{isRtl ? "شاهدتها مؤخراً" : "Recently Viewed"}
					</h2>
				</div>
				
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{recentProducts.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</Container>
		</section>
	);
};

export default RecentlyViewed;
