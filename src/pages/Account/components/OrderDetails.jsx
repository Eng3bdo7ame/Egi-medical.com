import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowLeft, Check, Package, FileText, Download, Printer, RefreshCw, Undo2, AlertCircle, HelpCircle } from "lucide-react";
import { mockProducts } from "@/pages/Products/components/products.mock";
import { cn } from "@/lib/utils";

export const OrderDetails = ({ orderId, onBack }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// In a real app, this would be fetched from API
	const orderDetailsMap = {
		"ORD-8891": {
			id: "ORD-8891",
			date: { en: "Oct 12, 2026", ar: "١٢ أكتوبر ٢٠٢٦" },
			status: "delivered",
			paymentMethod: { en: "Credit Card (ending in 4242)", ar: "بطاقة ائتمان (تنتهي بـ 4242)" },
			shippingAddress: {
				en: "Ahmed Mohamed, 123 El Thawra St, Heliopolis, Cairo, Egypt",
				ar: "أحمد محمد، ١٢٣ شارع الثورة، مصر الجديدة، القاهرة، مصر"
			},
			items: [
				{ product: mockProducts[0], quantity: 1, price: 35.00 },
				{ product: mockProducts[2], quantity: 2, price: 5.50 },
				{ product: mockProducts[9], quantity: 1, price: 12.00 }
			],
			summary: {
				subtotal: 58.00,
				shipping: 10.00,
				discount: 5.80,
				total: 62.20
			},
			timeline: [
				{ label: { en: "Order Placed", ar: "تم تقديم الطلب" }, date: "Oct 12, 10:30 AM", active: true },
				{ label: { en: "Processing", ar: "قيد التحضير" }, date: "Oct 12, 11:15 AM", active: true },
				{ label: { en: "Shipped", ar: "تم الشحن" }, date: "Oct 13, 09:00 AM", active: true },
				{ label: { en: "Delivered", ar: "تم التوصيل" }, date: "Oct 14, 02:45 PM", active: true }
			]
		},
		"ORD-8842": {
			id: "ORD-8842",
			date: { en: "Sep 28, 2026", ar: "٢٨ سبتمبر ٢٠٢٦" },
			status: "processing",
			paymentMethod: { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
			shippingAddress: {
				en: "Ahmed Mohamed, 123 El Thawra St, Heliopolis, Cairo, Egypt",
				ar: "أحمد محمد، ١٢٣ شارع الثورة، مصر الجديدة، القاهرة، مصر"
			},
			items: [
				{ product: mockProducts[1], quantity: 1, price: 95.00 }
			],
			summary: {
				subtotal: 95.00,
				shipping: 15.00,
				discount: 0,
				total: 110.00
			},
			timeline: [
				{ label: { en: "Order Placed", ar: "تم تقديم الطلب" }, date: "Sep 28, 04:20 PM", active: true },
				{ label: { en: "Processing", ar: "قيد التحضير" }, date: "Sep 28, 05:00 PM", active: true },
				{ label: { en: "Shipped", ar: "تم الشحن" }, date: null, active: false },
				{ label: { en: "Delivered", ar: "تم التوصيل" }, date: null, active: false }
			]
		},
		"ORD-8710": {
			id: "ORD-8710",
			date: { en: "Aug 05, 2026", ar: "٠٥ أغسطس ٢٠٢٦" },
			status: "cancelled",
			paymentMethod: { en: "Credit Card (ending in 4242)", ar: "بطاقة ائتمان (تنتهي بـ 4242)" },
			shippingAddress: {
				en: "Ahmed Mohamed, 123 El Thawra St, Heliopolis, Cairo, Egypt",
				ar: "أحمد محمد، ١٢٣ شارع الثورة، مصر الجديدة، القاهرة، مصر"
			},
			items: [
				{ product: mockProducts[3], quantity: 1, price: 22.00 },
				{ product: mockProducts[6], quantity: 1, price: 28.00 }
			],
			summary: {
				subtotal: 50.00,
				shipping: 10.00,
				discount: 0,
				total: 60.00
			},
			timeline: [
				{ label: { en: "Order Placed", ar: "تم تقديم الطلب" }, date: "Aug 05, 01:10 PM", active: true },
				{ label: { en: "Cancelled", ar: "ملغي" }, date: "Aug 05, 02:30 PM", active: true, isError: true }
			]
		}
	};

	const [order, setOrder] = useState(orderDetailsMap[orderId] || orderDetailsMap["ORD-8891"]);
	const [showReturnForm, setShowReturnForm] = useState(false);
	const [selectedReturnItems, setSelectedReturnItems] = useState({});
	const [returnReason, setReturnReason] = useState("");
	const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

	const handleReorder = () => {
		alert(isRtl ? "تمت إعادة إضافة جميع المنتجات إلى سلة المشتريات بنجاح!" : "All products from this order have been successfully added to your cart!");
	};

	const handleDownloadPDF = () => {
		alert(isRtl ? "جاري تحميل الفاتورة بصيغة PDF..." : "Downloading invoice PDF...");
	};

	const handlePrint = () => {
		window.print();
	};

	const handleItemCheckboxChange = (idx) => {
		setSelectedReturnItems(prev => ({
			...prev,
			[idx]: !prev[idx]
		}));
	};

	const handleReturnSubmit = (e) => {
		e.preventDefault();
		const hasSelectedItems = Object.values(selectedReturnItems).some(val => val === true);
		if (!hasSelectedItems) {
			alert(isRtl ? "يرجى تحديد منتج واحد على الأقل لإرجاعه." : "Please select at least one item to return.");
			return;
		}

		setIsSubmittingReturn(true);
		
		setTimeout(() => {
			setOrder(prev => ({
				...prev,
				status: "return_processing",
				timeline: [
					{ label: { en: "Return Requested", ar: "تم طلب الإرجاع" }, date: "Just now", active: true },
					{ label: { en: "Return Approved", ar: "تمت الموافقة" }, date: null, active: false },
					{ label: { en: "Item Picked Up", ar: "تم استلام الشحنة" }, date: null, active: false },
					{ label: { en: "Refund Completed", ar: "اكتمل رد المبلغ" }, date: null, active: false }
				]
			}));
			setShowReturnForm(false);
			setIsSubmittingReturn(false);
			alert(isRtl ? "تم تقديم طلب الإرجاع بنجاح!" : "Return request submitted successfully!");
		}, 1000);
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Back Header */}
			<div className="flex items-center justify-between pb-4 border-b border-border/50">
				<button 
					onClick={onBack}
					className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-bold text-sm"
				>
					<ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
					{isRtl ? "العودة للطلبات" : "Back to Orders"}
				</button>
				<div className="flex items-center gap-2">
					<span className="text-text-muted text-xs">{isRtl ? "طلب رقم:" : "Order ID:"}</span>
					<span className="font-extrabold text-text text-base">#{order.id}</span>
				</div>
			</div>

			{/* Status Banner */}
			<div className={cn(
				"p-4 rounded-xl border flex items-center justify-between",
				order.status === "delivered" && "bg-success/5 border-success/20 text-success",
				order.status === "processing" && "bg-warning/5 border-warning/20 text-warning",
				order.status === "cancelled" && "bg-danger/5 border-danger/20 text-danger",
				order.status === "return_processing" && "bg-primary/5 border-primary/20 text-primary"
			)}>
				<div className="flex items-center gap-3">
					<Package className="w-5 h-5" />
					<span className="font-extrabold text-sm sm:text-base">
						{order.status === "delivered" && (isRtl ? "تم توصيل هذا الطلب بنجاح" : "This order has been delivered successfully")}
						{order.status === "processing" && (isRtl ? "الطلب قيد التجهيز الآن" : "This order is currently being processed")}
						{order.status === "cancelled" && (isRtl ? "تم إلغاء هذا الطلب" : "This order has been cancelled")}
						{order.status === "return_processing" && (isRtl ? "جاري معالجة طلب الإرجاع" : "Return request is currently processing")}
					</span>
				</div>
				<span className="text-xs text-text-muted">{order.date[language]}</span>
			</div>

			{/* Refund Banner Details (for Cancelled or Refunded orders) */}
			{order.status === "cancelled" && (
				<div className="p-4 bg-info/5 border border-info/20 text-info rounded-xl flex gap-3 text-sm animate-in fade-in duration-300">
					<AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
					<div className="flex flex-col gap-1">
						<span className="font-extrabold">{isRtl ? "تفاصيل استرداد الأموال (Refund)" : "Refund Confirmation"}</span>
						<p className="text-xs text-text-secondary leading-relaxed">
							{isRtl 
								? `تم استرداد مبلغ ${order.summary.total.toFixed(2)} ج.م بالكامل إلى بطاقتك الائتمانية المستخدمة (تنتهي بـ 4242) بنجاح في تاريخ ٠٦ أغسطس ٢٠٢٦.` 
								: `The refund of ${order.summary.total.toFixed(2)} EGP has been successfully credited back to your original payment method (Credit Card ending in 4242) on Aug 06, 2026.`}
						</p>
					</div>
				</div>
			)}

			{order.status === "return_processing" && (
				<div className="p-4 bg-info/5 border border-info/20 text-info rounded-xl flex gap-3 text-sm animate-in fade-in duration-300">
					<AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
					<div className="flex flex-col gap-1">
						<span className="font-extrabold">{isRtl ? "حالة استرداد الأموال المعلقة" : "Pending Refund Details"}</span>
						<p className="text-xs text-text-secondary leading-relaxed">
							{isRtl 
								? `بمجرد استلام المنتجات المرتجعة والتحقق من سلامتها، سيتم تحويل مبلغ ${order.summary.total.toFixed(2)} ج.م فوراً لحسابك الخاص.` 
								: `Once the returned products are received and verified by our medical quality team, the refund of ${order.summary.total.toFixed(2)} EGP will be credited immediately.`}
						</p>
					</div>
				</div>
			)}

			{/* Tracking Stepper */}
			<div className="bg-surface border border-border/50 rounded-2xl p-6">
				<h3 className="font-bold text-text mb-6">
					{order.status === "return_processing" 
						? (isRtl ? "متابعة حالة الإرجاع" : "Return Tracking") 
						: (isRtl ? "تتبع الشحنة" : "Order Tracking")}
				</h3>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative">
					
					{/* Progress line */}
					<div className="hidden sm:block absolute left-12 right-12 top-6 h-1 bg-border/60 -z-1">
						<div 
							className="h-full bg-primary transition-all duration-500" 
							style={{ 
								width: order.status === "delivered" ? "100%" : order.status === "return_processing" ? "12%" : "33%" 
							}} 
						/>
					</div>

					{order.timeline.map((step, idx) => (
						<div key={idx} className="flex sm:flex-col items-center gap-4 sm:gap-2 text-center flex-1 w-full sm:w-auto relative">
							<div className={cn(
								"w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all font-bold",
								step.active 
									? (step.isError ? "bg-danger border-danger text-white" : "bg-primary border-primary text-white shadow-md shadow-primary/20") 
									: "bg-surface border-border text-text-muted"
							)}>
								{step.active ? (step.isError ? "X" : <Check className="w-5 h-5" />) : idx + 1}
							</div>
							<div className="flex flex-col items-start sm:items-center">
								<span className={cn("text-sm font-extrabold", step.active ? "text-text" : "text-text-muted")}>
									{step.label[language]}
								</span>
								{step.date && (
									<span className="text-[10px] text-text-muted font-bold mt-0.5">{step.date}</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Return Items Form Block */}
			{showReturnForm && (
				<div className="bg-surface border border-warning/30 rounded-2xl p-6 animate-in slide-in-from-top-4 duration-300">
					<h3 className="font-bold text-text text-lg mb-4 flex items-center gap-2">
						<Undo2 className="w-5 h-5 text-warning animate-pulse" />
						{isRtl ? "طلب إرجاع المنتجات" : "Request Return"}
					</h3>
					
					<form onSubmit={handleReturnSubmit} className="flex flex-col gap-5">
						<span className="text-xs font-bold text-text-secondary select-none">
							{isRtl ? "حدد المنتجات التي تود إرجاعها من الطلب:" : "Select items to return from this order:"}
						</span>

						{/* Items list with checkboxes */}
						<div className="flex flex-col gap-3">
							{order.items.map((item, idx) => (
								<label key={idx} className="flex items-center gap-3 p-3 bg-surface-2/40 hover:bg-surface-2 rounded-xl cursor-pointer transition-colors border border-border/40 select-none">
									<input 
										type="checkbox"
										checked={!!selectedReturnItems[idx]}
										onChange={() => handleItemCheckboxChange(idx)}
										className="w-4.5 h-4.5 text-primary accent-primary rounded cursor-pointer"
									/>
									<img src={item.product.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-border/50" />
									<div className="flex-1 flex flex-col min-w-0">
										<span className="font-bold text-text text-xs sm:text-sm truncate">{item.product.title[language]}</span>
										<span className="text-[10px] text-text-muted mt-0.5">{isRtl ? "الكمية المتاحة:" : "Available Qty:"} {item.quantity}</span>
									</div>
								</label>
							))}
						</div>

						{/* Reason for Return */}
						<div className="flex flex-col gap-1.5">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "سبب الإرجاع" : "Reason for Return"}</label>
							<select 
								required 
								value={returnReason}
								onChange={e => setReturnReason(e.target.value)}
								className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold cursor-pointer"
							>
								<option value="">{isRtl ? "اختر سبب الإرجاع" : "Select return reason"}</option>
								<option value="defective">{isRtl ? "جهاز معيب / لا يعمل" : "Defective medical device / Not working"}</option>
								<option value="wrong_item">{isRtl ? "منتج خاطئ غير المطابق للطلب" : "Incorrect item shipped"}</option>
								<option value="damaged">{isRtl ? "المنتج تالف أو مكسور" : "Item arrived damaged"}</option>
								<option value="change_of_mind">{isRtl ? "تغيير رأيي (العبوة مغلقة)" : "Changed my mind (Sealed package)"}</option>
							</select>
						</div>

						<div className="flex justify-end gap-2 mt-2">
							<button 
								type="button"
								onClick={() => setShowReturnForm(false)}
								className="h-11 px-5 bg-surface-2 hover:bg-surface-3 text-text font-bold rounded-xl transition-all text-sm"
							>
								{isRtl ? "إلغاء" : "Cancel"}
							</button>
							<button 
								type="submit"
								disabled={isSubmittingReturn}
								className="h-11 px-5 bg-warning hover:bg-warning-hover text-white font-extrabold rounded-xl transition-all text-sm flex items-center gap-2 shadow-sm"
							>
								{isSubmittingReturn ? (
									<>
										<RefreshCw className="w-4 h-4 animate-spin" />
										<span>{isRtl ? "جاري الإرسال..." : "Submitting..."}</span>
									</>
								) : (
									<>
										<Check className="w-4 h-4" />
										<span>{isRtl ? "تأكيد طلب الإرجاع" : "Submit Request"}</span>
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Order Items */}
			<div className="bg-surface border border-border/50 rounded-2xl p-6">
				<h3 className="font-bold text-text mb-4">{isRtl ? "المنتجات" : "Items In Order"}</h3>
				<div className="flex flex-col gap-4">
					{order.items.map((item, idx) => (
						<div key={idx} className="flex items-center gap-4 py-3 border-b border-border/40 last:border-0">
							<img src={item.product.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-border/50" />
							<div className="flex-1 flex flex-col min-w-0">
								<span className="font-bold text-text text-sm sm:text-base line-clamp-1">{item.product.title[language]}</span>
								<span className="text-xs text-text-muted mt-0.5">{isRtl ? "الكمية:" : "Qty:"} {item.quantity}</span>
							</div>
							<div className="flex flex-col items-end">
								<span className="font-extrabold text-primary text-sm sm:text-base">{item.price} {isRtl ? "ج.م" : "EGP"}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Delivery & Payment Info */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				
				{/* Shipping Address */}
				<div className="bg-surface border border-border/50 rounded-2xl p-6">
					<h3 className="font-bold text-text mb-3">{isRtl ? "عنوان الشحن" : "Shipping Address"}</h3>
					<p className="text-sm text-text-secondary leading-relaxed">
						{order.shippingAddress[language]}
					</p>
				</div>

				{/* Payment Details */}
				<div className="bg-surface border border-border/50 rounded-2xl p-6 flex flex-col justify-between">
					<div>
						<h3 className="font-bold text-text mb-3">{isRtl ? "طريقة الدفع" : "Payment Method"}</h3>
						<p className="text-sm text-text-secondary">
							{order.paymentMethod[language]}
						</p>
					</div>
					
					{/* Action Buttons */}
					<div className="flex flex-wrap items-center gap-2 mt-6">
						<button 
							onClick={handleReorder}
							className="flex-1 min-w-[120px] flex items-center justify-center gap-2 h-11 px-4 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all text-sm cursor-pointer"
						>
							<RefreshCw className="w-4 h-4" />
							{isRtl ? "إعادة الطلب" : "Reorder"}
						</button>

						{/* Return items button (Visible only when order is delivered) */}
						{order.status === "delivered" && !showReturnForm && (
							<button 
								onClick={() => setShowReturnForm(true)}
								className="flex-1 min-w-[120px] flex items-center justify-center gap-2 h-11 px-4 bg-warning hover:bg-warning-hover text-white font-extrabold rounded-xl transition-all text-sm cursor-pointer"
							>
								<Undo2 className="w-4 h-4" />
								{isRtl ? "إرجاع المنتجات" : "Return Items"}
							</button>
						)}
						
						<button 
							onClick={handleDownloadPDF}
							className="flex items-center justify-center w-11 h-11 bg-surface-2 hover:bg-surface-3 text-text rounded-xl transition-all cursor-pointer"
							title={isRtl ? "تحميل الفاتورة" : "Download Invoice"}
						>
							<Download className="w-4 h-4" />
						</button>
						<button 
							onClick={handlePrint}
							className="flex items-center justify-center w-11 h-11 bg-surface-2 hover:bg-surface-3 text-text rounded-xl transition-all cursor-pointer"
							title={isRtl ? "طباعة" : "Print"}
						>
							<Printer className="w-4 h-4" />
						</button>
					</div>
				</div>

			</div>

			{/* Financial Summary */}
			<div className="bg-surface border border-border/50 rounded-2xl p-6 md:p-8">
				<h3 className="font-bold text-text mb-4">{isRtl ? "ملخص الحساب" : "Payment Summary"}</h3>
				<div className="flex flex-col gap-3">
					<div className="flex justify-between text-sm text-text-secondary">
						<span>{isRtl ? "المجموع الفرعي" : "Subtotal"}</span>
						<span className="font-bold">{order.summary.subtotal.toFixed(2)} {isRtl ? "ج.م" : "EGP"}</span>
					</div>
					<div className="flex justify-between text-sm text-text-secondary">
						<span>{isRtl ? "الشحن" : "Shipping"}</span>
						<span className="font-bold">{order.summary.shipping.toFixed(2)} {isRtl ? "ج.م" : "EGP"}</span>
					</div>
					{order.summary.discount > 0 && (
						<div className="flex justify-between text-sm text-success">
							<span>{isRtl ? "الخصم" : "Discount"}</span>
							<span className="font-bold">-{order.summary.discount.toFixed(2)} {isRtl ? "ج.م" : "EGP"}</span>
						</div>
					)}
					<hr className="border-border/50 my-1" />
					<div className="flex justify-between text-lg text-text font-extrabold">
						<span>{isRtl ? "الإجمالي" : "Total"}</span>
						<span className="text-primary">{order.summary.total.toFixed(2)} {isRtl ? "ج.م" : "EGP"}</span>
					</div>
				</div>
			</div>

		</div>
	);
};

export default OrderDetails;
