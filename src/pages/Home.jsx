import React from "react";

import Hero from "@/components/home/Hero";
import CategoryPills from "@/components/home/CategoryPills";
import PromoSection from "@/components/home/Promo";
import ProductSection from "@/components/home/ProductSection";
import BrandsShowcase from "@/components/home/Brands";
import CallToAction from "@/components/home/CTA";
import ShopByCategory from "@/components/home/ShopByCategory";
import WhyMootah from "@/components/home/WhyMootah";
import BlogSection from "@/components/home/BlogSection";
import { homepageConfig } from "@/config/home.config";
import { useHome } from "@/hooks/queries/useHome";

const Home = () => {
	const { data, isLoading, error } = useHome();
	// Extract home data from the API response (interceptor returns response.data already)
	const homeData = data?.data || {};

	return (
		<div className="flex flex-col w-full overflow-hidden">
			{homepageConfig.map((section) => {
				switch (section.type) {
					case "hero":
						return <Hero key={section.id} sliders={homeData.sliders || []} isLoading={isLoading} />;
					case "categoryPills":
						return <CategoryPills key={section.id} />;
					case "promo":
						return <PromoSection key={section.id} />;
					case "shopByCategory":
						return <ShopByCategory key={section.id} />;
					case "whyMootah":
						return <WhyMootah key={section.id} />;
					case "blogSection":
						return <BlogSection key={section.id} />;
					case "productSection":
						return (
							<ProductSection
								key={section.id}
								variant={section.variant}
								title={section.title}
								subtitle={section.subtitle}
								viewAllLink={section.viewAllLink}
								bg={section.bg}
							/>
						);
					case "brands":
						return <BrandsShowcase key={section.id} />;
					case "cta":
						return (
							<CallToAction
								key={section.id}
								title={section.title}
								description={section.description}
								buttonText={section.buttonText}
								buttonLink={section.buttonLink}
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
