import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShieldCheck } from "lucide-react";

import { mockCartItems, mockCartSummary } from "@/pages/Cart/components/cart.mock";

export const OrderSummary = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const items = mockCartItems;
	const summary = mockCartSummary;

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 sticky top-8 shadow-sm">
			<h2 className="text-xl font-extrabold text-text">
				{isRtl ? "ملخص الطلب" : "Order Summary"}
			</h2>

			{/* Mini Item List */}
			<div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 (ltr) pl-2 (rtl) custom-scrollbar">
				{items.map(item => (
					<div key={item.id} className="flex gap-4">
						<div className="w-16 h-16 rounded-lg border border-border/50 overflow-hidden shrink-0 bg-white relative">
							<img src={item.image} alt={item.title[language]} className="w-full h-full object-cover" />
							<span className="absolute -top-1 -right-1 (ltr) -left-1 (rtl) w-5 h-5 bg-text text-surface rounded-full flex items-center justify-center text-[10px] font-bold">
								{item.quantity}
							</span>
						</div>
						<div className="flex flex-col flex-1 min-w-0 justify-center">
							<h4 className="font-bold text-sm text-text truncate-2-lines mb-1 leading-tight">{item.title[language]}</h4>
							<span className="font-extrabold text-primary text-sm">{item.price} {isRtl ? "ج.م" : "EGP"}</span>
						</div>
					</div>
				))}
			</div>

			<hr className="border-border/50" />

			{/* Totals */}
			<div className="flex flex-col gap-3 text-sm font-medium text-text-secondary">
				<div className="flex justify-between items-center">
					<span>{isRtl ? "المجموع الفرعي" : "Subtotal"}</span>
					<span className="font-bold text-text">{summary.subtotal} {isRtl ? "ج.م" : "EGP"}</span>
				</div>
				
				<div className="flex justify-between items-center">
					<span>{isRtl ? "رسوم الشحن" : "Shipping"}</span>
					<span className="font-bold text-text">{summary.shipping} {isRtl ? "ج.م" : "EGP"}</span>
				</div>

				{summary.discount > 0 && (
					<div className="flex justify-between items-center text-success">
						<span>{isRtl ? "الخصم" : "Discount"}</span>
						<span className="font-bold">-{summary.discount} {isRtl ? "ج.م" : "EGP"}</span>
					</div>
				)}
			</div>

			<hr className="border-border/50" />

			{/* Grand Total */}
			<div className="flex justify-between items-end">
				<span className="text-base font-bold text-text">
					{isRtl ? "الإجمالي" : "Total"}
				</span>
				<div className="flex flex-col items-end">
					<span className="text-2xl font-extrabold text-primary">
						{summary.total} {isRtl ? "ج.م" : "EGP"}
					</span>
					<span className="text-xs text-text-muted mt-1">
						{isRtl ? "شامل ضريبة القيمة المضافة" : "Includes VAT"}
					</span>
				</div>
			</div>

			{/* Secure Checkout Badge */}
			<div className="flex items-center justify-center gap-2 text-xs font-bold text-text-muted p-3 bg-success/10 rounded-xl mt-2">
				<ShieldCheck className="w-5 h-5 text-success" />
				{isRtl ? "معلوماتك مشفرة ومحمية بالكامل" : "Your information is fully encrypted and secure"}
			</div>
		</div>
	);
};

export default OrderSummary;
