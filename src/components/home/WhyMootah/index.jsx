import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Section } from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { ShieldCheck, Award, Stethoscope, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const valueProps = [
	{
		id: "original",
		icon: ShieldCheck,
		title: { en: "100% Original", ar: "منتجات أصلية 100%" },
		desc: { en: "Directly imported from certified global manufacturers.", ar: "مستوردة مباشرة من المصنعين العالميين المعتمدين." }
	},
	{
		id: "distributor",
		icon: Award,
		title: { en: "Official Distributor", ar: "موزع رسمي معتمد" },
		desc: { en: "Authorized agent for top medical equipment brands in Egypt.", ar: "الوكيل والموزع المعتمد لأكبر ماركات الأجهزة الطبية." }
	},
	{
		id: "experts",
		icon: Stethoscope,
		title: { en: "Medical Experts", ar: "استشارات طبية متخصصة" },
		desc: { en: "Biomedical engineers ready to assist with setup & specs.", ar: "مهندسون متخصصون لمساعدتك في اختيار الجهاز المناسب." }
	},
	{
		id: "warranty",
		icon: Wrench,
		title: { en: "Official Warranty & Maintenance", ar: "ضمان وصيانة معتمدة" },
		desc: { en: "Full manufacturer warranty and local spare parts availability.", ar: "ضمان الوكيل الشامل وتوافر قطع الغيار الأصلية والصيانة." }
	}
];

export const WhyMootah = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Section spacing="lg" className="bg-slate-900 text-white relative overflow-hidden">
			{/* Decorative background glows */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

			<Container className="relative z-10">
				<div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
						{isRtl ? "لماذا تختار Mootah؟" : "Why Choose Mootah?"}
					</h2>
					<p className="text-slate-400 text-sm sm:text-base lg:text-lg">
						{isRtl ? "نحن نضع معايير جديدة للثوقية والأمان في توفير المستلزمات والأجهزة الطبية" : "Setting new standards for trust, quality, and safety in medical device distribution"}
					</p>
				</div>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					{valueProps.map((prop) => {
						const IconComp = prop.icon;
						return (
							<div
								key={prop.id}
								className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-6 flex flex-col items-start hover:border-primary/50 hover:bg-slate-800 transition-all duration-300 group"
							>
								<div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center mb-4 sm:mb-6 transition-colors duration-300">
									<IconComp className="w-5 h-5 sm:w-7 sm:h-7" />
								</div>
								<h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">
									{prop.title[language]}
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed">
									{prop.desc[language]}
								</p>
							</div>
						);
					})}
				</div>
			</Container>
		</Section>
	);
};

export default WhyMootah;

