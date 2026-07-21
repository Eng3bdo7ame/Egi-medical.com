export const mockCartItems = [
	{
		id: "cart-item-1",
		productId: "prod-1",
		title: {
			en: "Littmann Classic III Stethoscope",
			ar: "سماعة طبيب ليتمان كلاسيك 3"
		},
		image: "https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?auto=format&fit=crop&q=80&w=800&h=800",
		price: 95.00,
		originalPrice: 110.00, // Optional
		quantity: 1,
		maxQuantity: 15,
		variant: {
			en: "Color: Navy Blue",
			ar: "اللون: أزرق داكن"
		},
		stockStatus: "in_stock"
	},
	{
		id: "cart-item-2",
		productId: "prod-2",
		title: {
			en: "Omron M6 Comfort Blood Pressure Monitor",
			ar: "جهاز قياس ضغط الدم أومرون M6 كومفورت"
		},
		image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800&h=800",
		price: 150.00,
		quantity: 2,
		maxQuantity: 5,
		stockStatus: "low_stock"
	},
	{
		id: "cart-item-3",
		productId: "prod-3",
		title: {
			en: "Digital Thermometer Pro",
			ar: "مقياس حرارة رقمي برو"
		},
		image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800&h=800",
		price: 12.50,
		quantity: 1,
		maxQuantity: 0,
		stockStatus: "out_of_stock" // Used to show error in cart
	}
];

export const mockCartSummary = {
	subtotal: 407.50,
	shipping: 25.00,
	tax: 0, // Assuming VAT is included
	discount: 0,
	total: 432.50
};
