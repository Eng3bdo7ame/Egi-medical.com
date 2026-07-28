export const homepageConfig = [
	{ id: "hero", type: "hero" },
	{ id: "category-pills", type: "categoryPills" },

	{
		id: "flash-deals",
		type: "productSection",
		variant: "offer",
		bg: "surface",
		title: { en: "Flash Deals", ar: "عروض فلاش ⚡" },
		viewAllLink: "/flash-deals"
	},
	{ id: "promo", type: "promo" },
	{
		id: "featured-products",
		type: "productSection",
		variant: "default",
		bg: "background",
		title: { en: "Featured Products", ar: "منتجات مميزة" },
		subtitle: { en: "Our top curated recommendations", ar: "أبرز المنتجات الموصى بها" },
		viewAllLink: "/products"
	},
	{ id: "shop-by-category", type: "shopByCategory" }, // Acts as "Featured Categories" Slider

	{
		id: "best-sellers",
		type: "productSection",
		variant: "default",
		bg: "background",
		title: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
		viewAllLink: "/best-sellers"
	},
	{ id: "brands", type: "brands" },
	{ id: "why-mootah", type: "whyMootah" },
	{ id: "blog-section", type: "blogSection" },
	{
		id: "b2b-catalog",
		type: "cta",
		title: { en: "Download the Complete Medical Catalog", ar: "حمّل كتالوج المنتجات الطبية الكامل" },
		description: { en: "Browse over 10,000 medical products. Perfect for hospitals, clinics, and wholesale orders.", ar: "استعرض أكثر من 10,000 منتج طبي. مثالي للمستشفيات، العيادات، وطلبات الجملة." },
		buttonText: { en: "Download PDF Catalog", ar: "تحميل الكتالوج بصيغة PDF" },
		buttonLink: "/catalog",
		icon: "DownloadCloud"
	}
];
