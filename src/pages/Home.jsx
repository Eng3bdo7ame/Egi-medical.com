import React from "react";
import HeroSection from "@/components/home/Hero";
import CategoriesSection from "@/components/home/Categories";
import PromoSection from "@/components/home/Promo";
import FeaturedProductsSection from "@/components/home/FeaturedProducts";
import BrandsSection from "@/components/home/Brands";
import ServicesSection from "@/components/home/Services";
import TestimonialsSection from "@/components/home/Testimonials";

const Home = () => {
	return (
		<div className="flex flex-col w-full">
			<HeroSection />
			<CategoriesSection />
			<PromoSection />
			<FeaturedProductsSection />
			<BrandsSection />
			<ServicesSection />
			<TestimonialsSection />
		</div>
	);
};

export default Home;
