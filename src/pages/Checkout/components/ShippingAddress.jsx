import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { MapPin, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountries, useGovernorates, useCities } from "@/hooks/queries/useLocations";

const PRE_ENTERED_ADDRESSES = [
	{
		id: 1,
		title: { en: "Home Address", ar: "عنوان المنزل" },
		name: "Ahmed Mohamed",
		phone: "01001234567",
		countryId: 1, // Egypt
		governorateId: 1, // Cairo
		cityId: 4, // Heliopolis / مصر الجديدة
		street: "123 El Thawra St"
	},
	{
		id: 2,
		title: { en: "Office Address", ar: "عنوان العمل" },
		name: "Ahmed Mohamed",
		phone: "01119876543",
		countryId: 1, // Egypt
		governorateId: 1, // Cairo
		cityId: 2, // Maadi / المعادي
		street: "45 Maadi Ring Road"
	}
];

export const ShippingAddress = ({ onNext }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Fetch countries, governorates, and cities dynamically
	const { data: countriesData } = useCountries();
	const countries = countriesData?.data || (Array.isArray(countriesData) ? countriesData : []);

	// Form input states
	const [name, setName] = useState(PRE_ENTERED_ADDRESSES[0].name);
	const [phone, setPhone] = useState(PRE_ENTERED_ADDRESSES[0].phone);
	
	const [countryId, setCountryId] = useState(PRE_ENTERED_ADDRESSES[0].countryId);
	const [governorateId, setGovernorateId] = useState(PRE_ENTERED_ADDRESSES[0].governorateId);
	const [cityId, setCityId] = useState(PRE_ENTERED_ADDRESSES[0].cityId);
	const [street, setStreet] = useState(PRE_ENTERED_ADDRESSES[0].street);
	
	const [selectedQuickId, setSelectedQuickId] = useState(1);

	// Load governorates and cities dynamically based on selected IDs
	const { data: govData } = useGovernorates(countryId);
	const governorates = govData?.data || (Array.isArray(govData) ? govData : []);

	const { data: citiesData } = useCities(governorateId);
	const cities = citiesData?.data || (Array.isArray(citiesData) ? citiesData : []);

	const handleQuickSelect = (address) => {
		setSelectedQuickId(address.id);
		setName(address.name);
		setPhone(address.phone);
		setCountryId(address.countryId);
		setGovernorateId(address.governorateId);
		setCityId(address.cityId);
		setStreet(address.street);
	};

	const handleClearForm = () => {
		setSelectedQuickId(null);
		setName("");
		setPhone("");
		setCountryId("");
		setGovernorateId("");
		setCityId("");
		setStreet("");
	};

	const handleCountryChange = (id) => {
		setCountryId(id);
		setGovernorateId("");
		setCityId("");
		setSelectedQuickId(null);
	};

	const handleGovernorateChange = (id) => {
		setGovernorateId(id);
		setCityId("");
		setSelectedQuickId(null);
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
					const selectedCountry = countries.find(c => String(c.id) === String(countryId))?.name || "";
					const selectedGov = governorates.find(g => String(g.id) === String(governorateId))?.name || "";
					const selectedCity = cities.find(c => String(c.id) === String(cityId))?.name || "";
					
					onNext({ 
						name, 
						phone, 
						country: selectedCountry,
						governorate: selectedGov, 
						district: selectedCity, 
						street,
						country_id: countryId,
						governorate_id: governorateId,
						city_id: cityId
					}); 
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

				{/* Dynamic Country, Governorate, City Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Country */}
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "البلد" : "Country"}</label>
						<select 
							required 
							value={countryId}
							onChange={e => handleCountryChange(e.target.value)}
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold cursor-pointer"
						>
							<option value="">{isRtl ? "اختر البلد" : "Select Country"}</option>
							{countries.map(c => (
								<option key={c.id} value={c.id}>{c.name}</option>
							))}
						</select>
					</div>

					{/* Governorate */}
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "المحافظة" : "Governorate"}</label>
						<select 
							required 
							value={governorateId}
							disabled={!countryId}
							onChange={e => handleGovernorateChange(e.target.value)}
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
						>
							<option value="">{isRtl ? "اختر المحافظة" : "Select Governorate"}</option>
							{governorates.map(g => (
								<option key={g.id} value={g.id}>{g.name}</option>
							))}
						</select>
					</div>

					{/* City / Area / District */}
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "المنطقة / الحي" : "Area / District"}</label>
						<select 
							required 
							value={cityId}
							disabled={!governorateId}
							onChange={e => {
								setCityId(e.target.value);
								setSelectedQuickId(null);
							}}
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
						>
							<option value="">{isRtl ? "اختر المنطقة" : "Select Area"}</option>
							{cities.map(c => (
								<option key={c.id} value={c.id}>{c.name}</option>
							))}
						</select>
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
