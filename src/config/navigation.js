export const navigationLinks = [
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
		id: "brands",
		name: { en: "Official Brands", ar: "الماركات المعتمدة" }, 
		path: "/brands" 
	},
	{ 
		id: "products",
		name: { en: "All Products", ar: "جميع المنتجات" }, 
		path: "/products" 
	},
	{ 
		id: "about",
		name: { en: "About Us", ar: "عن الشركة" }, 
		path: "/about" 
	},
	{ 
		id: "contact",
		name: { en: "Contact Us", ar: "تواصل معنا" }, 
		path: "/contact" 
	},
	{ 
		id: "consultation",
		name: { en: "Consultation", ar: "الاستشارات" }, 
		path: "/contact",
		badge: { en: "New", ar: "جديد" },
		badgeVariant: "success"
	}
];

export default navigationLinks;
