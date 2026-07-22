import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Award, ShieldCheck, HeartHandshake, Eye, Target, Users } from "lucide-react";

export const About = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "About Us", ar: "من نحن" } }
	];

	const stats = [
		{ value: "15,000+", label: { en: "Happy Customers", ar: "عميل سعيد" } },
		{ value: "250+", label: { en: "Medical Devices", ar: "جهاز طبي معتمد" } },
		{ value: "80+", label: { en: "Partner Clinics & Hospitals", ar: "عيادة ومستشفى شريكة" } },
		{ value: "12+", label: { en: "Years of Trust", ar: "عاماً من الثقة" } }
	];

	const values = [
		{
			icon: ShieldCheck,
			title: { en: "Certified Quality", ar: "جودة معتمدة" },
			description: {
				en: "All products undergo rigorous testing and are fully approved by the Ministry of Health.",
				ar: "تخضع جميع منتجاتنا لفحوصات جودة صارمة وهي معتمدة بالكامل من وزارة الصحة المصرية."
			}
		},
		{
			icon: HeartHandshake,
			title: { en: "Customer Centric", ar: "العميل أولاً" },
			description: {
				en: "We believe in long-term health partnerships, providing full technical support and post-sale services.",
				ar: "نؤمن بالشراكة الصحية طويلة الأمد، ونوفر الدعم الفني الكامل وخدمات ما بعد البيع لعملائنا."
			}
		},
		{
			icon: Users,
			title: { en: "Expert Team", ar: "فريق من الخبراء" },
			description: {
				en: "Guided by professional biomedical engineers and healthcare experts to source the best devices.",
				ar: "نعمل تحت إشراف مهندسين طبيين وخبراء رعاية صحية لضمان اختيار أفضل الأجهزة الطبية."
			}
		}
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			{/* Hero Section */}
			<div className="bg-surface border-b border-border/60 py-10 mb-12">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<h1 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
						{isRtl ? "من نحن" : "About MootahCare+"}
					</h1>
					<p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
						{isRtl 
							? "المنصة الرائدة في مصر لتوفير الأجهزة والمستلزمات الطبية الموثوقة للمستشفيات، العيادات، والأفراد بجودة معتمدة وخدمة عملاء استثنائية."
							: "Egypt's leading platform sourcing certified medical devices and healthcare consumables to hospitals, clinics, and individuals with guaranteed trust and exceptional care."}
					</p>
				</Container>
			</div>

			<Container>
				{/* Mission & Vision */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
					
					{/* Mission */}
					<div className="bg-surface border border-border/60 p-8 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<Target className="w-6 h-6" />
						</div>
						<h2 className="text-2xl font-extrabold text-text">
							{isRtl ? "رسالتنا" : "Our Mission"}
						</h2>
						<p className="text-text-secondary leading-relaxed">
							{isRtl
								? "تمكين كل فرد ومؤسسة طبية في مصر من الوصول إلى أحدث وأدق الأجهزة الطبية والرعاية الصحية بأفضل الأسعار وبأعلى معايير الجودة العالمية لحياة صحية أفضل."
								: "To empower every individual and medical facility in Egypt by providing access to the latest, most accurate medical hardware and healthcare supplies at fair prices, under strict quality guidelines."}
						</p>
					</div>

					{/* Vision */}
					<div className="bg-surface border border-border/60 p-8 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
							<Eye className="w-6 h-6" />
						</div>
						<h2 className="text-2xl font-extrabold text-text">
							{isRtl ? "رؤيتنا" : "Our Vision"}
						</h2>
						<p className="text-text-secondary leading-relaxed">
							{isRtl
								? "أن نكون الشريك التكنولوجي الطبي الأول والأكثر موثوقية في الشرق الأوسط، والمساهمة الفعالة في التحول الرقمي لمنظومة الرعاية الصحية لتصبح أسهل وأكثر أماناً."
								: "To become the premier and most trusted medical technology partner in the Middle East, leading the digital transformation of healthcare distribution to make it safer, faster, and more accessible."}
						</p>
					</div>

				</div>

				{/* Company Stats */}
				<div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 mb-16">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
						{stats.map((stat, idx) => (
							<div key={idx} className="flex flex-col gap-2">
								<span className="text-3xl md:text-5xl font-black text-primary">{stat.value}</span>
								<span className="text-sm font-bold text-text-secondary">{stat.label[language]}</span>
							</div>
						))}
					</div>
				</div>

				{/* Our Values */}
				<div className="mb-16">
					<h2 className="text-3xl font-extrabold text-text text-center mb-10">
						{isRtl ? "القيم الأساسية التي نؤمن بها" : "Our Core Values"}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{values.map((val, idx) => {
							const Icon = val.icon;
							return (
								<div key={idx} className="bg-surface border border-border/50 p-6 rounded-2xl flex flex-col gap-4">
									<div className="w-10 h-10 rounded-lg bg-surface-2 text-primary flex items-center justify-center shrink-0">
										<Icon className="w-5 h-5" />
									</div>
									<h3 className="text-lg font-bold text-text">{val.title[language]}</h3>
									<p className="text-sm text-text-secondary leading-relaxed">{val.description[language]}</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Certifications Banner */}
				<div className="bg-surface border border-border/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex flex-col gap-2">
						<h3 className="text-xl font-extrabold text-text flex items-center gap-2">
							<Award className="text-warning w-6 h-6" />
							{isRtl ? "مؤسسة طبية مرخصة بالكامل" : "Fully Licensed Medical Distributor"}
						</h3>
						<p className="text-sm text-text-secondary leading-relaxed">
							{isRtl
								? "نحن موزعون معتمدون ومرخصون من قبل هيئة الدواء المصرية ووزارة الصحة، ونخضع لكافة الشروط والمواصفات الصحية العالمية."
								: "We are authorized distributors registered under the Egyptian Drug Authority and Ministry of Health, meeting international ISO and sanitary guidelines."}
						</p>
					</div>
					<div className="flex items-center gap-4 shrink-0">
						<div className="px-4 py-3 bg-surface-2 border border-border rounded-xl font-black text-xs text-text-secondary tracking-widest uppercase">
							ISO 9001:2015
						</div>
						<div className="px-4 py-3 bg-surface-2 border border-border rounded-xl font-black text-xs text-text-secondary tracking-widest uppercase">
							EDA APPROVED
						</div>
					</div>
				</div>

			</Container>
		</div>
	);
};

export default About;
