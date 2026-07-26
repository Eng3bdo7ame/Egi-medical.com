export const navigationLinks = [
	{
		id: "home",
		name: { en: "Home", ar: "الرئيسية" },
		path: "/"
	},
	{ 
		id: "flash-deals",
		name: { en: "Flash Deals", ar: "عروض خاطفة" }, 
		path: "/products?filter=flash-deals",
		badge: { en: "HOT", ar: "🔥 عروض" },
		badgeVariant: "danger"
	},
	{ 
		id: "offers",
		name: { en: "Offers & Sales", ar: "التخفيضات" }, 
		path: "/products?filter=offers",
		isOffer: true
	},
	{ 
		id: "about",
		name: { en: "About Us", ar: "من نحن" }, 
		path: "/about" 
	},
	{ 
		id: "contact",
		name: { en: "Contact Us", ar: "تواصل معنا" }, 
		path: "/contact" 
	},
	{ 
		id: "best-sellers",
		name: { en: "Best Sellers", ar: "الأكثر مبيعاً" }, 
		path: "/best-sellers",
		badge: { en: "Top", ar: "مميز" },
		badgeVariant: "success"
	}
];

export default navigationLinks;
