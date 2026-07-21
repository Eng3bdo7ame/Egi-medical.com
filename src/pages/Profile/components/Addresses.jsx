import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react";

export const Addresses = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const addresses = [
		{
			id: 1,
			title: { en: "Home", ar: "المنزل" },
			details: { en: "123 El Thawra St, Heliopolis, Cairo", ar: "١٢٣ شارع الثورة، مصر الجديدة، القاهرة" },
			phone: "+20 100 123 4567",
			isDefault: true
		},
		{
			id: 2,
			title: { en: "Office", ar: "العمل" },
			details: { en: "45 Maadi Ring Road, Maadi, Cairo", ar: "٤٥ الطريق الدائري المعادي، المعادي، القاهرة" },
			phone: "+20 111 987 6543",
			isDefault: false
		}
	];

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-extrabold text-text">
					{isRtl ? "عناويني" : "My Addresses"}
				</h2>
				<button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors text-sm shadow-sm shadow-primary/20">
					<Plus className="w-4 h-4" />
					<span className="hidden sm:inline">{isRtl ? "إضافة عنوان جديد" : "Add New Address"}</span>
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{addresses.map(address => (
					<div key={address.id} className={`bg-surface rounded-2xl border p-6 flex flex-col gap-4 relative transition-colors ${address.isDefault ? 'border-primary' : 'border-border/50 hover:border-primary/50'}`}>
						
						{address.isDefault && (
							<span className="absolute top-4 right-4 (ltr) left-4 (rtl) px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">
								{isRtl ? "الافتراضي" : "Default"}
							</span>
						)}

						<div className="flex items-start gap-4 pr-16 (ltr) pl-16 (rtl)">
							<div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center text-text-secondary shrink-0">
								<MapPin className="w-5 h-5" />
							</div>
							<div className="flex flex-col gap-1">
								<span className="font-bold text-text text-lg">{address.title[language]}</span>
								<p className="text-sm text-text-secondary leading-relaxed">
									{address.details[language]}
								</p>
								<span className="text-sm font-medium text-text-muted mt-1" dir="ltr">
									{address.phone}
								</span>
							</div>
						</div>

						<div className="flex items-center gap-2 mt-2 pt-4 border-t border-border/50">
							<button className="flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm font-bold">
								<Edit2 className="w-4 h-4" />
								{isRtl ? "تعديل" : "Edit"}
							</button>
							<button className="flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors text-sm font-bold">
								<Trash2 className="w-4 h-4" />
								{isRtl ? "حذف" : "Delete"}
							</button>
						</div>

					</div>
				))}
			</div>
		</div>
	);
};

export default Addresses;
