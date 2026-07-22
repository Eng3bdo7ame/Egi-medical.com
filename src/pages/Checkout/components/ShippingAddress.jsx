import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { MapPin, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const PRE_ENTERED_ADDRESSES = [
	{
		id: 1,
		title: { en: "Home Address", ar: "عنوان المنزل" },
		name: "Ahmed Mohamed",
		phone: "01001234567",
		governorate: "cairo",
		district: "Heliopolis",
		street: "123 El Thawra St"
	},
	{
		id: 2,
		title: { en: "Office Address", ar: "عنوان العمل" },
		name: "Ahmed Mohamed",
		phone: "01119876543",
		governorate: "cairo",
		district: "Maadi",
		street: "45 Maadi Ring Road"
	}
];

export const ShippingAddress = ({ onNext }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Form input states (pre-populated with Home Address initially)
	const [name, setName] = useState(PRE_ENTERED_ADDRESSES[0].name);
	const [phone, setPhone] = useState(PRE_ENTERED_ADDRESSES[0].phone);
	const [governorate, setGovernorate] = useState(PRE_ENTERED_ADDRESSES[0].governorate);
	const [district, setDistrict] = useState(PRE_ENTERED_ADDRESSES[0].district);
	const [street, setStreet] = useState(PRE_ENTERED_ADDRESSES[0].street);
	
	const [selectedQuickId, setSelectedQuickId] = useState(1);

	const handleQuickSelect = (address) => {
		setSelectedQuickId(address.id);
		setName(address.name);
		setPhone(address.phone);
		setGovernorate(address.governorate);
		setDistrict(address.district);
		setStreet(address.street);
	};

	const handleClearForm = () => {
		setSelectedQuickId(null);
		setName("");
		setPhone("");
		setGovernorate("");
		setDistrict("");
		setStreet("");
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 animate-in fade-in duration-300">
			
			{/* Quick Select Title */}
			<div className="flex flex-col gap-3">
				<span className="text-xs font-extrabold text-text-secondary select-none">
					{isRtl ? "اختيار سريع من عناوينك المسجلة:" : "Quick select from saved addresses:"}
				</span>
				
				<div className="flex flex-wrap gap-2">
					{PRE_ENTERED_ADDRESSES.map((address) => (
						<button
							type="button"
							key={address.id}
							onClick={() => handleQuickSelect(address)}
							className={cn(
								"flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
								selectedQuickId === address.id 
									? "bg-primary text-white border-primary shadow-sm" 
									: "bg-surface border-border/80 text-text-secondary hover:border-primary/50"
							)}
						>
							<MapPin className="w-3.5 h-3.5" />
							<span>{address.title[language]}</span>
						</button>
					))}

					<button
						type="button"
						onClick={handleClearForm}
						className={cn(
							"flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
							selectedQuickId === null
								? "bg-primary text-white border-primary shadow-sm"
								: "bg-surface-2 border-border/80 text-text hover:border-primary/50"
						)}
					>
						<RotateCcw className="w-3.5 h-3.5" />
						<span>{isRtl ? "عنوان جديد" : "New Address"}</span>
					</button>
				</div>
			</div>

			<hr className="border-border/40" />

			{/* Form details (Always visible) */}
			<form 
				className="flex flex-col gap-4" 
				onSubmit={(e) => { 
					e.preventDefault(); 
					onNext({ name, phone, governorate, district, street }); 
				}}
			>
				<h3 className="text-sm font-extrabold text-text mb-1">
					{isRtl ? "بيانات عنوان الشحن" : "Shipping Address Details"}
				</h3>

				{/* Name & Phone */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "الاسم بالكامل" : "Full Name"}</label>
						<input 
							required 
							type="text" 
							value={name}
							onChange={e => {
								setName(e.target.value);
								setSelectedQuickId(null);
							}}
							placeholder={isRtl ? "مثال: أحمد محمد" : "e.g. John Doe"}
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold" 
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
						<input 
							required 
							type="tel" 
							value={phone}
							onChange={e => {
								setPhone(e.target.value);
								setSelectedQuickId(null);
							}}
							placeholder="0100 123 4567"
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold text-left" 
							dir="ltr" 
						/>
					</div>
				</div>

				{/* City & Area */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "المحافظة" : "Governorate"}</label>
						<select 
							required 
							value={governorate}
							onChange={e => {
								setGovernorate(e.target.value);
								setSelectedQuickId(null);
							}}
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold cursor-pointer"
						>
							<option value="">{isRtl ? "اختر المحافظة" : "Select Governorate"}</option>
							<option value="cairo">{isRtl ? "القاهرة" : "Cairo"}</option>
							<option value="giza">{isRtl ? "الجيزة" : "Giza"}</option>
							<option value="alex">{isRtl ? "الإسكندرية" : "Alexandria"}</option>
						</select>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "المنطقة / الحي" : "Area / District"}</label>
						<input 
							required 
							type="text" 
							value={district}
							onChange={e => {
								setDistrict(e.target.value);
								setSelectedQuickId(null);
							}}
							placeholder={isRtl ? "مثال: المعادي" : "e.g. Maadi"}
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold" 
						/>
					</div>
				</div>

				{/* Street & Details */}
				<div className="flex flex-col gap-2">
					<label className="text-xs font-bold text-text-secondary">{isRtl ? "عنوان الشارع بالتفصيل" : "Street Address"}</label>
					<input 
						required 
						type="text" 
						value={street}
						onChange={e => {
							setStreet(e.target.value);
							setSelectedQuickId(null);
						}}
						placeholder={isRtl ? "اسم الشارع، رقم العمارة، رقم الشقة" : "Street name, building number, apartment"} 
						className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold" 
					/>
				</div>

				<button type="submit" className="mt-4 h-14 bg-primary text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all text-sm cursor-pointer">
					{isRtl ? "المتابعة لطريقة التوصيل" : "Continue to Delivery"}
				</button>
			</form>
		</div>
	);
};

export default ShippingAddress;
