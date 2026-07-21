export const mockProductDetails = {
	id: "prod-1",
	title: { 
		en: "Littmann Classic III Stethoscope", 
		ar: "سماعة طبيب ليتمان كلاسيك 3" 
	},
	brand: {
		name: "Littmann",
		logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/3M_wordmark.svg/1200px-3M_wordmark.svg.png"
	},
	price: { 
		current: 95.00, 
		original: 110.00,
		currency: { en: "EGP", ar: "ج.م" }
	},
	reviews: { 
		rating: 4.8, 
		count: 512,
		breakdown: {
			5: 420,
			4: 60,
			3: 20,
			2: 7,
			1: 5
		}
	},
	stock: { 
		quantity: 15,
		sku: "LIT-C3-5803"
	},
	badges: [
		{ type: "bestseller", label: { en: "Best Seller", ar: "الأكثر مبيعاً" } },
		{ type: "sale", label: { en: "-13%", ar: "-13%" } }
	],
	shortDescription: {
		en: "The 3M Littmann Classic III Stethoscope offers high acoustic sensitivity for exceptional performance when doing general physical assessments. It features dual tunable diaphragms and an updated design that is easier to clean and maintain.",
		ar: "توفر سماعة الطبيب ليتمان كلاسيك 3 حساسية صوتية عالية لأداء استثنائي عند إجراء التقييمات البدنية العامة. وتتميز بغشاء مزدوج قابل للضبط وتصميم محدث أسهل في التنظيف والصيانة."
	},
	categories: [
		{ id: "cat-2", label: { en: "Diagnostics", ar: "أجهزة تشخيص" } },
		{ id: "cat-steth", label: { en: "Stethoscopes", ar: "سماعات طبية" } }
	],
	images: [
		"https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?auto=format&fit=crop&q=80&w=800&h=800",
		"https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800&h=800",
		"https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&q=80&w=800&h=800",
		"https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=800&h=800"
	],
	variants: [
		{
			id: "color",
			name: { en: "Tube Color", ar: "لون الأنبوب" },
			options: [
				{ id: "black", value: "#000000", label: { en: "Black", ar: "أسود" }, image: "https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?auto=format&fit=crop&q=80&w=800&h=800" },
				{ id: "navy", value: "#000080", label: { en: "Navy Blue", ar: "أزرق داكن" }, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800&h=800" },
				{ id: "burgundy", value: "#800020", label: { en: "Burgundy", ar: "عنابي" } },
				{ id: "plum", value: "#dda0dd", label: { en: "Plum", ar: "برقوقي" } },
			]
		},
		{
			id: "finish",
			name: { en: "Chestpiece Finish", ar: "تشطيب قطعة الصدر" },
			options: [
				{ id: "stainless", label: { en: "Stainless Steel", ar: "ستانلس ستيل" } },
				{ id: "copper", label: { en: "Copper", ar: "نحاسي" } },
				{ id: "smoke", label: { en: "Smoke", ar: "دخان" }, priceModifier: 5.00 } // +5 EGP
			]
		}
	],
	specifications: [
		{ label: { en: "Acoustic Performance", ar: "الأداء الصوتي" }, value: { en: "7", ar: "7" } },
		{ label: { en: "Chestpiece Technology", ar: "تكنولوجيا قطعة الصدر" }, value: { en: "Double Sided", ar: "مزدوجة الوجه" } },
		{ label: { en: "Diaphragm Material", ar: "مادة الغشاء" }, value: { en: "Epoxy/Fiberglass", ar: "إيبوكسي / ألياف زجاجية" } },
		{ label: { en: "Eartip Type", ar: "نوع سدادة الأذن" }, value: { en: "Soft Sealing", ar: "إغلاق ناعم" } },
		{ label: { en: "Length", ar: "الطول" }, value: { en: "69 cm", ar: "69 سم" } },
		{ label: { en: "Weight", ar: "الوزن" }, value: { en: "150 g", ar: "150 جرام" } },
		{ label: { en: "Warranty", ar: "الضمان" }, value: { en: "5 Years", ar: "5 سنوات" } }
	],
	description: {
		en: `
			<h4>Overview</h4>
			<p>The 3M™ Littmann® Classic III™ Stethoscope is the latest version of the stethoscope that helps millions of medical professionals achieve their best. The Classic III stethoscope offers high acoustic sensitivity for exceptional performance, plus a versatile two-sided chestpiece with tunable diaphragms.</p>
			
			<h4>Features</h4>
			<ul>
				<li>Tunable diaphragms on both the adult and pediatric sides of the chestpiece.</li>
				<li>Single-piece tunable diaphragm is easy to attach, and easier to clean because its surface is smooth without crevices.</li>
				<li>Pediatric side converts to a traditional open bell by replacing the single-piece diaphragm with a non-chill rim.</li>
				<li>Next-generation tubing provides longer life due to improved resistance to skin oils and alcohol; less likely to pick up stains.</li>
			</ul>
		`,
		ar: `
			<h4>نظرة عامة</h4>
			<p>سماعة الطبيب 3M™ Littmann® Classic III™ هي أحدث إصدار من السماعة التي تساعد الملايين من المتخصصين في المجال الطبي على تحقيق أفضل ما لديهم. توفر سماعة كلاسيك 3 حساسية صوتية عالية لأداء استثنائي، بالإضافة إلى قطعة صدر متعددة الاستخدامات ذات وجهين مع أغشية قابلة للضبط.</p>
			
			<h4>المميزات</h4>
			<ul>
				<li>أغشية قابلة للضبط على كل من جانبي البالغين والأطفال لقطعة الصدر.</li>
				<li>غشاء قطعة واحدة قابل للضبط سهل التركيب، وأسهل في التنظيف لأن سطحه أملس بدون شقوق.</li>
				<li>يتحول الجانب الخاص بالأطفال إلى جرس مفتوح تقليدي عن طريق استبدال الغشاء المكون من قطعة واحدة بإطار غير مبرد.</li>
				<li>توفر الأنابيب من الجيل التالي عمراً أطول بسبب المقاومة المحسنة لزيوت البشرة والكحول؛ وأقل عرضة لالتقاط البقع.</li>
			</ul>
		`
	},
	reviewsList: [
		{
			id: "rev-1",
			user: "Dr. Ahmed H.",
			rating: 5,
			date: "2023-10-15",
			title: { en: "Excellent Quality", ar: "جودة ممتازة" },
			comment: { 
				en: "Been using Littmann for 10 years. This Classic III is an excellent upgrade. The acoustics are perfect for general examination.", 
				ar: "أستخدم ليتمان منذ 10 سنوات. كلاسيك 3 هذه ترقية ممتازة. الصوتيات مثالية للفحص العام." 
			},
			verified: true
		},
		{
			id: "rev-2",
			user: "Sarah M. (Nursing Student)",
			rating: 5,
			date: "2023-09-22",
			title: { en: "Great for students", ar: "رائعة للطلاب" },
			comment: { 
				en: "Bought this for my clinical rotations. Love the navy blue color. Very comfortable earpieces.", 
				ar: "اشتريتها للتدريب العملي. أحببت اللون الأزرق الداكن. قطع الأذن مريحة جداً." 
			},
			verified: true
		},
		{
			id: "rev-3",
			user: "Mahmoud S.",
			rating: 4,
			date: "2023-08-05",
			title: { en: "Good but expensive", ar: "جيدة ولكن غالية" },
			comment: { 
				en: "The quality is unquestionable, but it is a bit on the pricier side compared to other brands. Still, a solid investment.", 
				ar: "الجودة لا جدال فيها، ولكنها غالية الثمن قليلاً مقارنة بالعلامات التجارية الأخرى. مع ذلك، استثمار قوي." 
			},
			verified: false
		}
	]
};
