import React from "react";

import Hero from "@/components/home/Hero";
import CategoryPills from "@/components/home/CategoryPills";
import PromoSection from "@/components/home/Promo";
import ProductSection from "@/components/home/ProductSection";
import CallToAction from "@/components/home/CTA";
import WhyMootah from "@/components/home/WhyMootah";
import BlogSection from "@/components/home/BlogSection";
import { homepageConfig } from "@/config/home.config";
import { useHome } from "@/hooks/queries/useHome";
import { useLatestProducts } from "@/hooks/queries/useLatestProducts";

const Home = () => {
	const { data, isLoading, error } = useHome();
	// Extract home data from the API response (interceptor returns response.data already)
	const homeData = data?.data || {};

	const { data: latestProducts, isLoading: latestLoading } = useLatestProducts();

	return (
		<div className="flex flex-col w-full overflow-hidden">
			{homepageConfig.map((section) => {
				switch (section.type) {
					case "hero":
						return <Hero key={section.id} sliders={homeData.sliders || []} isLoading={isLoading} />;
					case "categoryPills":
						return <CategoryPills key={section.id} categories={homeData.categories || []} isLoading={isLoading} />;
					case "promo":
						return <PromoSection key={section.id} offers={homeData.offers} />;
					case "whyMootah":
						return <WhyMootah key={section.id} data={homeData.why_choose_us} />;
					case "blogSection":
						return <BlogSection key={section.id} />;
					case "productSection":
						let products = [];
						let sectionLoading = isLoading;
						if (section.id === "flash-deals") products = homeData.flash_sales || [];
						if (section.id === "featured-products") products = homeData.featured_products || [];
						if (section.id === "latest-products") {
							products = latestProducts?.length ? latestProducts : homeData.latest_products || [];
							sectionLoading = isLoading || latestLoading;
						}
						if (section.id === "best-sellers") products = homeData.top_sellers || [];

						return (
							<ProductSection
								key={section.id}
								variant={section.variant}
								title={section.title}
								subtitle={section.subtitle}
								viewAllLink={section.viewAllLink}
								bg={section.bg}
								products={products}
								isLoading={sectionLoading}
							/>
						);
					case "cta":
						const catalog = homeData.catalog_download;
						return (
							<CallToAction
								key={section.id}
								title={catalog?.title || section.title}
								description={catalog?.description || section.description}
								buttonText={catalog?.button_text || section.buttonText}
								buttonLink={catalog?.pdf_url || section.buttonLink}
								iconName={section.icon}
							/>
						);
					default:
						return null;
				}
			})}
		</div>
	);
};

export default Home;
