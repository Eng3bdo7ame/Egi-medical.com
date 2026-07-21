import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { BadgeCheck } from "lucide-react";

const richBrands = [
	{ id: 1, name: "Omron", count: "120+", logo: "Omron", bgClass: "bg-[#1E3A8A]" }, // Navy
	{ id: 2, name: "Accu-Chek", count: "45+", logo: "AccuChek", bgClass: "bg-[#047857]" }, // Emerald
	{ id: 3, name: "Yuwell", count: "80+", logo: "Yuwell", bgClass: "bg-[#BE123C]" }, // Rose
	{ id: 4, name: "Ensure", count: "30+", logo: "Ensure", bgClass: "bg-[#4338CA]" }, // Indigo
	{ id: 5, name: "Johnson's", count: "200+", logo: "Johnson", bgClass: "bg-[#C2410C]" }, // Orange
	{ id: 6, name: "Littmann", count: "25+", logo: "Littmann", bgClass: "bg-[#0F172A]" }, // Slate
];

export const BrandsShowcase = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const title = {
		en: "Official Partner Brands",
		ar: "العلامات التجارية الرسمية الشريكة",
	};

	return (
		<Section bg="background" className="py-12 md:py-16">
			<Container>
				<SectionHeader title={title} viewAllLink="/brands" />
				
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
					{richBrands.map((brand) => (
						<Link key={brand.id} to={`/brand/${brand.id}`} className="group flex flex-col bg-surface border border-border rounded-[20px] overflow-hidden hover:shadow-floating transition-all duration-300">
							{/* Colored Top Banner */}
							<div className={`h-16 ${brand.bgClass} relative flex justify-center`}>
								{/* Verified Badge */}
								<div className="absolute top-2 ltr:right-2 rtl:left-2 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
									<BadgeCheck className="w-3 h-3 text-white" />
									{isRtl ? "وكيل" : "Official"}
								</div>
							</div>
							
							{/* Logo Placeholder (Overlap) */}
							<div className="mx-auto -mt-8 w-16 h-16 bg-white rounded-full border-4 border-surface flex items-center justify-center shadow-sm">
								<span className="text-primary font-bold text-xs">{brand.logo}</span>
							</div>
							
							{/* Content */}
							<div className="p-4 text-center pb-6">
								<h3 className="text-text font-bold text-sm md:text-base mb-1">{brand.name}</h3>
								<p className="text-text-muted text-xs font-medium">
									{brand.count} {isRtl ? "منتج" : "Products"}
								</p>
							</div>
						</Link>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default BrandsShowcase;
