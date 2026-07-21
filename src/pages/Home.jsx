import React from "react";

import Hero from "@/components/home/Hero";
import CategoryPills from "@/components/home/CategoryPills";
import PromoSection from "@/components/home/Promo";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductSection from "@/components/home/ProductSection";
import BrandsShowcase from "@/components/home/Brands";
import TrustSection from "@/components/home/Trust";
import CategoriesShowcase from "@/components/home/Categories";
import ServicesSection from "@/components/home/Services";
import CallToAction from "@/components/home/CTA";
import { homepageConfig } from "@/config/home.config";

const Home = () => {
	return (
		<div className="flex flex-col w-full overflow-hidden">
			{homepageConfig.map((section) => {
				switch (section.type) {
					case "hero":
						return <Hero key={section.id} />;
					case "categoryPills":
						return <CategoryPills key={section.id} />;
					case "promo":
						return <PromoSection key={section.id} />;
					case "featuredCategories":
						return <FeaturedCategories key={section.id} />;
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
					case "trust":
						return <TrustSection key={section.id} />;
					case "categories":
						return <CategoriesShowcase key={section.id} />;
					case "services":
						return <ServicesSection key={section.id} />;
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
