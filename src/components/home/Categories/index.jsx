import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowRight, ArrowLeft, Heart, Pill, Stethoscope, Baby } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

// Mock Rich Categories Data
const richCategories = [
	{ id: 1, name: { en: "Medicines", ar: "الأدوية" }, icon: Pill, color: "bg-blue-500", count: "1,200+" },
	{ id: 2, name: { en: "Medical Devices", ar: "الأجهزة الطبية" }, icon: Stethoscope, color: "bg-teal-500", count: "850+" },
	{ id: 3, name: { en: "Personal Care", ar: "العناية الشخصية" }, icon: Heart, color: "bg-rose-500", count: "3,400+" },
	{ id: 4, name: { en: "Baby Care", ar: "العناية بالطفل" }, icon: Baby, color: "bg-purple-500", count: "600+" },
];

export const CategoriesShowcase = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const title = {
		en: "Shop by Top Categories",
		ar: "تسوق حسب أهم الأقسام",
	};

	return (
		<Section bg="surface" spacing="md">
			<Container>
				<SectionHeader title={title} viewAllLink="/categories" />
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{richCategories.map((cat) => {
						const IconComp = cat.icon;
						return (
							<LocalizedLink key={cat.id} to={`/category/${cat.id}`} className="group relative aspect-square w-full rounded-[24px] overflow-hidden bg-surface-2 border border-border flex flex-col justify-end p-6 hover:shadow-floating transition-all duration-300 cursor-pointer">
								
								{/* Placeholder Background (would be an image in real app) */}
								<div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-surface flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
									<IconComp className="w-32 h-32 text-primary/5 -rotate-12" />
								</div>
								
								{/* Gradient Overlay for text readability */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
								
								{/* Card Content */}
								<div className="relative z-10 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
									<div className="flex items-center justify-between mb-2">
										<div className={cn("flex items-center justify-center w-10 h-10 rounded-[12px] text-white shadow-sm", cat.color)}>
											<IconComp className="w-5 h-5" />
										</div>
										<span className="text-white/80 text-xs font-medium bg-black/20 px-2 py-1 rounded-full backdrop-blur-md">
											{cat.count} {isRtl ? "منتج" : "Products"}
										</span>
									</div>
									<h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{cat.name[language]}</h3>
									<div className="flex items-center gap-2 text-primary-light text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										{isRtl ? "تصفح القسم" : "Explore Category"}
										{isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
									</div>
								</div>
							</LocalizedLink>
						);
					})}
				</div>
			</Container>
		</Section>
	);
};

export default CategoriesShowcase;


