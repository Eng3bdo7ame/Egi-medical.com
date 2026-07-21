export const homepageConfig = [
	{ id: "hero", type: "hero" },
	{ id: "category-pills", type: "categoryPills" },
	{ id: "promo", type: "promo" },
	{ id: "featured-categories", type: "featuredCategories" },
	{ 
		id: "featured-products", 
		type: "productSection", 
		variant: "default", 
		bg: "background",
		title: { en: "Featured Products", ar: "منتجات مميزة" },
		subtitle: { en: "Explore our handpicked selection.", ar: "استكشف تشكيلتنا المختارة بعناية." },
		viewAllLink: "/products"
	},
	{ 
		id: "flash-deals", 
		type: "productSection", 
		variant: "offer", 
		bg: "surface",
		title: { en: "Flash Deals", ar: "عروض فلاش" },
		viewAllLink: "/flash-deals"
	},
	{ id: "brands", type: "brands" },
	{ id: "trust", type: "trust" },
	{ id: "categories", type: "categories" },
	{ 
		id: "best-sellers", 
		type: "productSection", 
		variant: "default", 
		bg: "background",
		title: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
		viewAllLink: "/best-sellers"
	},
	{ 
		id: "recently-added", 
		type: "productSection", 
		variant: "default", 
		bg: "surface",
		title: { en: "Recently Added", ar: "أُضيف حديثاً" },
		viewAllLink: "/new-arrivals"
	},
	{ id: "services", type: "services" },
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
