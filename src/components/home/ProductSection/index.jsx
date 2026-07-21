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
		<Section bg={bg} spacing="md" className="overflow-hidden">
			<Container>
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
					<div className="flex items-center gap-3">
						{isOffer && (
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-danger/10 text-danger">
								<Timer className="w-5 h-5" />
							</div>
						)}
						<div className="flex flex-col gap-2">
							<div className="flex items-center">
								<h2 className="text-xl sm:text-h2 font-bold text-text leading-tight">
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
				<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
							{/* Render Diverse Mock Products */}
							{[
								{
									id: `prod-0`,
									title: { en: "OMRON M2 Basic Blood Pressure Monitor", ar: "جهاز قياس ضغط الدم أومرون M2 الأساسي" },
									category: { en: "Medical Devices", ar: "أجهزة طبية", id: "cat-1" },
									brand: "OMRON",
									image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 35.00, original: 45.00 },
									reviews: { rating: 4.8, count: 236 },
									stock: { quantity: 15 },
									badges: [{ type: "new", label: { en: "New", ar: "جديد" } }]
								},
								{
									id: `prod-1`,
									title: { en: "Littmann Classic III Stethoscope", ar: "سماعة طبيب ليتمان كلاسيك 3" },
									category: { en: "Diagnostics", ar: "أجهزة تشخيص", id: "cat-2" },
									brand: "Littmann",
									image: "https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 95.00, original: 110.00 },
									reviews: { rating: 4.9, count: 512 },
									stock: { quantity: 8 },
									badges: [{ type: "bestseller", label: { en: "Best Seller", ar: "الأكثر مبيعاً" } }]
								},
								{
									id: `prod-2`,
									title: { en: "Surgical Face Masks (Box of 50)", ar: "كمامات جراحية طبية (علبة 50 قطعة)" },
									category: { en: "Consumables", ar: "مستهلكات", id: "cat-3" },
									brand: "SafeMed",
									image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 5.50, original: null },
									reviews: { rating: 4.5, count: 890 },
									stock: { quantity: 200 },
									badges: []
								},
								{
									id: `prod-3`,
									title: { en: "Digital Infrared Thermometer", ar: "ترمومتر ديجيتال عن بعد للأطفال" },
									category: { en: "Medical Devices", ar: "أجهزة طبية", id: "cat-1" },
									brand: "Berrcom",
									image: "https://images.unsplash.com/photo-1632053000676-4d04829379de?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 22.00, original: 30.00 },
									reviews: { rating: 4.6, count: 124 },
									stock: { quantity: 0 },
									badges: [{ type: "sale", label: { en: "Sale", ar: "تخفيض" } }]
								},
								{
									id: `prod-4`,
									title: { en: "Standard Folding Wheelchair", ar: "كرسي متحرك طبي قابل للطي" },
									category: { en: "Mobility", ar: "أجهزة حركة", id: "cat-4" },
									brand: "Drive Medical",
									image: "https://images.unsplash.com/photo-1586776978438-cb0a76a54050?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 150.00, original: 180.00 },
									reviews: { rating: 4.7, count: 68 },
									stock: { quantity: 5 },
									badges: []
								},
								{
									id: `prod-5`,
									title: { en: "Accu-Chek Instant Glucometer", ar: "جهاز قياس سكر الدم أكيو تشيك إنستانت" },
									category: { en: "Diagnostics", ar: "أجهزة تشخيص", id: "cat-2" },
									brand: "Roche",
									image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 40.00, original: null },
									reviews: { rating: 4.8, count: 320 },
									stock: { quantity: 25 },
									badges: [{ type: "new", label: { en: "New", ar: "جديد" } }]
								},
								{
									id: `prod-6`,
									title: { en: "First Aid Kit - Premium", ar: "حقيبة إسعافات أولية متكاملة" },
									category: { en: "Emergency", ar: "طوارئ", id: "cat-5" },
									brand: "CarePlus",
									image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 28.00, original: 35.00 },
									reviews: { rating: 4.9, count: 156 },
									stock: { quantity: 12 },
									badges: []
								},
								{
									id: `prod-7`,
									title: { en: "Medical Oxygen Cylinder 5L", ar: "أسطوانة أكسجين طبي 5 لتر" },
									category: { en: "Home Care", ar: "رعاية منزلية", id: "cat-6" },
									brand: "OxyLife",
									image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=400&h=400",
									price: { current: 85.00, original: null },
									reviews: { rating: 4.4, count: 42 },
									stock: { quantity: 3 },
									badges: [{ type: "bestseller", label: { en: "Best Seller", ar: "الأكثر مبيعاً" } }]
								}
							].map((mockProduct, i) => (
								<div 
									key={i} 
									className="flex-[0_0_65%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] xl:flex-[0_0_18%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
								>
									<ProductCard product={mockProduct} />
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default ProductSection;


