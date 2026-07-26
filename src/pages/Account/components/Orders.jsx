import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Package, Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export const Orders = ({ onViewOrder }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const orders = [
		{
			id: "ORD-8891",
			date: { en: "Oct 12, 2026", ar: "١٢ أكتوبر ٢٠٢٦" },
			total: "432.50",
			items: 3,
			status: "delivered", // delivered, processing, cancelled
		},
		{
			id: "ORD-8842",
			date: { en: "Sep 28, 2026", ar: "٢٨ سبتمبر ٢٠٢٦" },
			total: "1,250.00",
			items: 1,
			status: "processing",
		},
		{
			id: "ORD-8710",
			date: { en: "Aug 05, 2026", ar: "٠٥ أغسطس ٢٠٢٦" },
			total: "85.00",
			items: 2,
			status: "cancelled",
		}
	];

	const getStatusConfig = (status) => {
		switch (status) {
			case "delivered": return { label: { en: "Delivered", ar: "تم التوصيل" }, color: "bg-success/10 text-success border-success/20" };
			case "processing": return { label: { en: "Processing", ar: "قيد التنفيذ" }, color: "bg-warning/10 text-warning border-warning/20" };
			case "cancelled": return { label: { en: "Cancelled", ar: "ملغي" }, color: "bg-danger/10 text-danger border-danger/20" };
			default: return { label: { en: status, ar: status }, color: "bg-surface-2 text-text-secondary border-border/50" };
		}
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-extrabold text-text">
					{isRtl ? "طلباتي" : "My Orders"}
				</h2>
			</div>

			<div className="flex flex-col gap-4">
				{orders.map(order => {
					const statusConfig = getStatusConfig(order.status);
					return (
						<div key={order.id} className="bg-surface rounded-2xl border border-border/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary/50 transition-colors">
							
							{/* Order Info */}
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center text-text-secondary shrink-0">
									<Package className="w-6 h-6" />
								</div>
								<div className="flex flex-col">
									<span className="font-bold text-text text-lg">#{order.id}</span>
									<span className="text-sm text-text-muted">{order.date[language]} • {order.items} {isRtl ? "منتجات" : "items"}</span>
								</div>
							</div>

							{/* Status & Total */}
							<div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
								<div className={cn("px-3 py-1.5 rounded-lg border font-bold text-sm", statusConfig.color)}>
									{statusConfig.label[language]}
								</div>
								<div className="flex flex-col items-end">
									<span className="text-sm text-text-secondary">{isRtl ? "الإجمالي" : "Total"}</span>
									<span className="font-extrabold text-primary">{order.total} {isRtl ? "ج.م" : "EGP"}</span>
								</div>
							</div>

							{/* Actions */}
							<div className="flex items-center gap-2 pt-4 sm:pt-0 border-t sm:border-0 border-border/50 w-full sm:w-auto shrink-0 justify-end">
								<button 
									onClick={() => onViewOrder && onViewOrder(order.id)}
									className="flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-primary hover:text-white text-text font-bold rounded-xl transition-colors text-sm"
								>
									<Eye className="w-4 h-4" />
									{isRtl ? "التفاصيل" : "View"}
								</button>
								{order.status === "delivered" && (
									<button className="flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-surface-3 text-text font-bold rounded-xl transition-colors text-sm">
										<Download className="w-4 h-4" />
										{isRtl ? "الفاتورة" : "Invoice"}
									</button>
								)}
							</div>

						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Orders;
