export const heroSlides = [
	{
		id: 1,
		brand: "Medical Store", // For the generic first slide
		title: {
			en: "Everything You Need for Better <span class='text-primary'>Healthcare</span>",
			ar: "كل ما تحتاجه لرعاية صحية <span class='text-primary'>أفضل</span>",
		},
		subtitle: {
			en: "Your trusted online pharmacy for medicines, medical devices & healthcare essentials.",
			ar: "صيدليتك الإلكترونية الموثوقة للأدوية، الأجهزة الطبية والمستلزمات الصحية الأساسية.",
		},
		buttons: {
			primary: { en: "Shop Now", ar: "تسوق الآن", link: "/shop" },
			secondary: { en: "Browse Categories", ar: "تصفح الأقسام", link: "/categories" },
		},
		features: [
			{ icon: "ShieldCheck", title: { en: "100% Original", ar: "أصلي 100%" }, subtitle: { en: "Genuine Products", ar: "منتجات أصلية" } },
			{ icon: "Lock", title: { en: "Secure Payment", ar: "دفع آمن" }, subtitle: { en: "100% Secure", ar: "آمن 100%" } },
			{ icon: "Truck", title: { en: "Fast Delivery", ar: "توصيل سريع" }, subtitle: { en: "On Time Delivery", ar: "توصيل في الموعد" } },
		],
		image: "/images/hero/composite-medical.png", // Will be placeholder in code
		background: "bg-[#F4F7FC]", // Extracted from image background color
	},
	{
		id: 2,
		brand: "Omron",
		title: {
			en: "Advanced Blood Pressure <span class='text-primary'>Monitors</span>",
			ar: "أجهزة قياس ضغط الدم <span class='text-primary'>المتقدمة</span>",
		},
		subtitle: {
			en: "Clinically validated accuracy for your home. Stay on top of your cardiovascular health with Omron's latest technology.",
			ar: "دقة معتمدة طبياً في منزلك. حافظ على صحة قلبك مع أحدث تقنيات أومرون.",
		},
		buttons: {
			primary: { en: "Shop Omron", ar: "تسوق أومرون", link: "/brands/omron" },
			secondary: { en: "View Details", ar: "عرض التفاصيل", link: "/brands/omron/details" },
		},
		features: [
			{ icon: "Activity", title: { en: "Clinically Validated", ar: "معتمد طبياً" }, subtitle: { en: "High Accuracy", ar: "دقة عالية" } },
			{ icon: "Heart", title: { en: "Heart Tracking", ar: "تتبع القلب" }, subtitle: { en: "Smart Sync", ar: "مزامنة ذكية" } },
		],
		image: "/images/hero/omron-monitor.png",
		background: "bg-[#F4F7FC]",
	},
];
