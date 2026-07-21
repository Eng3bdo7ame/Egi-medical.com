import LocalizedLink from "@/components/ui/LocalizedLink";
import React, { useEffect, useState } from "react";
import { } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowRight, ArrowLeft, Timer } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

const StaticTimer = () => {
	return (
		<div className="flex items-center gap-2 ltr:ml-4 rtl:mr-4">
			<div className="flex items-center justify-center w-8 h-8 rounded-md bg-danger/10 text-danger font-bold text-sm">12</div>
			<span className="text-danger font-bold">:</span>
			<div className="flex items-center justify-center w-8 h-8 rounded-md bg-danger/10 text-danger font-bold text-sm">45</div>
			<span className="text-danger font-bold">:</span>
			<div className="flex items-center justify-center w-8 h-8 rounded-md bg-danger/10 text-danger font-bold text-sm">30</div>
		</div>
	);
};

/**
 * Universal ProductSection
 * Handles all product grids across the site (Featured, Offers, Best Sellers).
 */
export const ProductSection = ({ title, subtitle, viewAllLink, variant = "default", bg = "background" }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const isOffer = variant === "offer";

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "center",
			direction: isRtl ? "rtl" : "ltr",
			dragFree: true,
		},
		[Autoplay({ delay: 4000, stopOnInteraction: true })]
	);

	return (
		<Section bg={bg} className="py-12 md:py-16 overflow-hidden">
			<Container>
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
					<div className="flex items-center gap-3">
						{isOffer && (
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-danger/10 text-danger">
								<Timer className="w-5 h-5" />
							</div>
						)}
						<div className="flex flex-col gap-2">
							<div className="flex items-center">
								<h2 className="text-h2 font-bold text-text leading-tight">
									{title[language]}
								</h2>
								{isOffer && <StaticTimer />}
							</div>
							{subtitle && (
								<p className="text-body text-text-secondary">
									{subtitle[language]}
								</p>
							)}
						</div>
					</div>

					{viewAllLink && (
						<LocalizedLink
							to={viewAllLink}
							className={cn(
								"group inline-flex items-center gap-2 text-sm font-semibold transition-colors",
								isOffer ? "text-danger hover:text-danger/80" : "text-primary hover:text-primary-hover"
							)}
						>
							{isRtl ? "عرض الكل" : "View All"}
							{isRtl ? (
								<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
							) : (
								<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
							)}
						</LocalizedLink>
					)}
				</div>
				{/* Products Layout: Continuous Slider */}
				<div className="w-full relative mt-8" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
							{/* Render Real Product Cards */}
							{Array.from({ length: 8 }).map((_, i) => {
								const mockProduct = {
									id: `prod-${i}`,
									title: { en: "OMRON M2 Basic Blood Pressure Monitor", ar: "جهاز قياس ضغط الدم أومرون M2 الأساسي" },
									category: { en: "Medical Devices", ar: "أجهزة طبية", id: "cat-1" },
									brand: "OMRON",
									image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 35.00, original: 45.00 },
									reviews: { rating: 4.8, count: 236 },
									stock: { quantity: 15 },
									badges: i % 3 === 0 ? [{ type: "new", label: { en: "New", ar: "جديد" } }] : []
								};

								return (
									<div 
										key={i} 
										className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] xl:flex-[0_0_18%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
									>
										<ProductCard product={mockProduct} />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default ProductSection;
