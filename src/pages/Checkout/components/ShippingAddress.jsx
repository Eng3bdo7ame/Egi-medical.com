import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const ShippingAddress = ({ onNext }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50">
			<h2 className="text-xl font-extrabold text-text">
				{isRtl ? "عنوان الشحن" : "Shipping Address"}
			</h2>

			<form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
				{/* Name & Phone */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-bold text-text-secondary">{isRtl ? "الاسم بالكامل" : "Full Name"}</label>
						<input required type="text" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-sm font-bold text-text-secondary">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
						<input required type="tel" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left" dir="ltr" />
					</div>
				</div>

				{/* City & Area */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-bold text-text-secondary">{isRtl ? "المحافظة" : "Governorate"}</label>
						<select required className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
							<option value="">{isRtl ? "اختر المحافظة" : "Select Governorate"}</option>
							<option value="cairo">{isRtl ? "القاهرة" : "Cairo"}</option>
							<option value="giza">{isRtl ? "الجيزة" : "Giza"}</option>
							<option value="alex">{isRtl ? "الإسكندرية" : "Alexandria"}</option>
						</select>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-sm font-bold text-text-secondary">{isRtl ? "المنطقة / الحي" : "Area / District"}</label>
						<input required type="text" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
					</div>
				</div>

				{/* Street & Details */}
				<div className="flex flex-col gap-2">
					<label className="text-sm font-bold text-text-secondary">{isRtl ? "عنوان الشارع بالتفصيل" : "Street Address"}</label>
					<input required type="text" placeholder={isRtl ? "اسم الشارع، رقم العمارة، رقم الشقة" : "Street name, building number, apartment"} className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
				</div>

				<button type="submit" className="mt-4 h-14 bg-primary text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all">
					{isRtl ? "المتابعة لطريقة التوصيل" : "Continue to Delivery"}
				</button>
			</form>
		</div>
	);
};

export default ShippingAddress;
