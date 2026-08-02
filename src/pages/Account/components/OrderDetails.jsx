import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowLeft, Check, Package, Download, Printer, RefreshCw, Undo2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrderDetails } from "@/hooks/queries/useOrders";

export const OrderDetails = ({ orderId, onBack }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: rawOrder, isLoading, error } = useOrderDetails(orderId);
	const order = rawOrder?.data?.[0] || rawOrder;

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
			setShowReturnForm(false);
			setIsSubmittingReturn(false);
			alert(isRtl ? "تم تقديم طلب الإرجاع بنجاح!" : "Return request submitted successfully!");
		}, 1000);
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 items-center justify-center min-h-[300px]">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				<span className="text-sm font-semibold text-text-secondary">
					{isRtl ? "جاري تحميل تفاصيل الطلب..." : "Loading order details..."}
				</span>
			</div>
		);
	}

	if (error || !order) {
		return (
			<div className="flex flex-col gap-4 p-6 bg-surface rounded-2xl border border-danger/20 items-center justify-center min-h-[300px]">
				<span className="text-sm font-semibold text-danger">
					{isRtl ? "فشل تحميل تفاصيل الطلب. الرجاء المحاولة مرة أخرى." : "Failed to load order details. Please try again."}
				</span>
				<button 
					onClick={onBack}
					className="h-10 px-4 bg-surface-2 hover:bg-surface-3 text-text font-bold rounded-xl transition-all text-xs cursor-pointer"
				>
					{isRtl ? "العودة للطلبات" : "Back to Orders"}
				</button>
			</div>
		);
	}

	// Address formatting
	const addr = order.shipping_address || {};
	const formattedAddress = addr.address 
		? `${addr.first_name || ""} ${addr.last_name || ""}, ${addr.address}, ${addr.city || ""}, ${addr.governorate || ""}`.trim()
		: (isRtl ? "العنوان غير متوفر" : "Address not provided");

	// Status description helper
	const getStatusDescription = () => {
		switch (order.status) {
			case "delivered":
			case "completed":
				return isRtl ? "تم توصيل هذا الطلب بنجاح" : "This order has been delivered successfully";
			case "processing":
			case "pending":
				return isRtl ? "الطلب قيد التجهيز الآن" : "This order is currently being processed";
			case "cancelled":
				return isRtl ? "تم إلغاء هذا الطلب" : "This order has been cancelled";
			default:
				return order.status_text?.[0] || (isRtl ? "حالة الطلب غير معروفة" : "Order status unknown");
		}
	};

	// Generate dynamic timeline based on current status
	const timeline = [
		{ label: { en: "Order Placed", ar: "تم تقديم الطلب" }, date: order.created_at, active: true },
		{ label: { en: "Processing", ar: "قيد التحضير" }, date: null, active: ["processing", "pending", "shipped", "delivered", "completed"].includes(order.status) },
		{ label: { en: "Shipped", ar: "تم الشحن" }, date: null, active: ["shipped", "delivered", "completed"].includes(order.status) },
		{ label: { en: "Delivered", ar: "تم التوصيل" }, date: null, active: ["delivered", "completed"].includes(order.status) }
	];

	const itemsList = order.items || [];

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Back Header */}
			<div className="flex items-center justify-between pb-4 border-b border-border/50">
				<button 
					onClick={onBack}
					className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-bold text-sm cursor-pointer"
				>
					<ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
					{isRtl ? "العودة للطلبات" : "Back to Orders"}
				</button>
				<div className="flex items-center gap-2">
					<span className="text-text-muted text-xs">{isRtl ? "طلب رقم:" : "Order ID:"}</span>
					<span className="font-extrabold text-text text-base">{order.order_number || `#${order.id}`}</span>
				</div>
			</div>

			{/* Status Banner */}
			<div className={cn(
				"p-4 rounded-xl border flex items-center justify-between",
				["delivered", "completed"].includes(order.status) && "bg-success/5 border-success/20 text-success",
				["processing", "pending"].includes(order.status) && "bg-warning/5 border-warning/20 text-warning",
				order.status === "cancelled" && "bg-danger/5 border-danger/20 text-danger"
			)}>
				<div className="flex items-center gap-3">
					<Package className="w-5 h-5" />
					<span className="font-extrabold text-sm sm:text-base">
						{getStatusDescription()}
					</span>
				</div>
				<span className="text-xs text-text-muted">{order.created_at || order.date}</span>
			</div>

			{/* Refund Banner Details (for Cancelled orders) */}
			{order.status === "cancelled" && (
				<div className="p-4 bg-info/5 border border-info/20 text-info rounded-xl flex gap-3 text-sm animate-in fade-in duration-300">
					<AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
					<div className="flex flex-col gap-1">
						<span className="font-extrabold">{isRtl ? "تفاصيل استرداد الأموال (Refund)" : "Refund Confirmation"}</span>
						<p className="text-xs text-text-secondary leading-relaxed">
							{isRtl 
								? `تم استرداد مبلغ ${Number(order.total).toLocaleString()} ج.م بالكامل بنجاح.` 
								: `The refund of ${Number(order.total).toLocaleString()} EGP has been successfully processed.`}
						</p>
					</div>
				</div>
			)}

			{/* Tracking Stepper */}
			<div className="bg-surface border border-border/50 rounded-2xl p-6">
				<h3 className="font-bold text-text mb-6">
					{isRtl ? "تتبع الشحنة" : "Order Tracking"}
				</h3>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative">
					
					{/* Progress line */}
					<div className="hidden sm:block absolute left-12 right-12 top-6 h-1 bg-border/60 -z-1">
						<div 
							className="h-full bg-primary transition-all duration-500" 
							style={{ 
								width: ["delivered", "completed"].includes(order.status) ? "100%" : ["shipped"].includes(order.status) ? "66%" : ["processing"].includes(order.status) ? "33%" : "0%" 
							}} 
						/>
					</div>

					{timeline.map((step, idx) => (
						<div key={idx} className="flex sm:flex-col items-center gap-4 sm:gap-2 text-center flex-1 w-full sm:w-auto relative">
							<div className={cn(
								"w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all font-bold",
								step.active 
									? "bg-primary border-primary text-white shadow-md shadow-primary/20" 
									: "bg-surface border-border text-text-muted"
							)}>
								{step.active ? <Check className="w-5 h-5" /> : idx + 1}
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
			{showReturnForm && itemsList.length > 0 && (
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
							{itemsList.map((item, idx) => {
								const title = item.product?.title?.[language] || item.product_name || item.name || "";
								const image = item.product?.image || item.image || "";
								return (
									<label key={idx} className="flex items-center gap-3 p-3 bg-surface-2/40 hover:bg-surface-2 rounded-xl cursor-pointer transition-colors border border-border/40 select-none">
										<input 
											type="checkbox"
											checked={!!selectedReturnItems[idx]}
											onChange={() => handleItemCheckboxChange(idx)}
											className="w-4.5 h-4.5 text-primary accent-primary rounded cursor-pointer"
										/>
										{image && <img src={image} alt="" className="w-10 h-10 rounded-lg object-cover border border-border/50" />}
										<div className="flex-1 flex flex-col min-w-0">
											<span className="font-bold text-text text-xs sm:text-sm truncate">{title}</span>
											<span className="text-[10px] text-text-muted mt-0.5">{isRtl ? "الكمية المتاحة:" : "Available Qty:"} {item.quantity}</span>
										</div>
									</label>
								);
							})}
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
								className="h-11 px-5 bg-surface-2 hover:bg-surface-3 text-text font-bold rounded-xl transition-all text-sm cursor-pointer"
							>
								{isRtl ? "إلغاء" : "Cancel"}
							</button>
							<button 
								type="submit"
								disabled={isSubmittingReturn}
								className="h-11 px-5 bg-warning hover:bg-warning-hover text-white font-extrabold rounded-xl transition-all text-sm flex items-center gap-2 shadow-sm cursor-pointer"
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
				{itemsList.length === 0 ? (
					<span className="text-sm text-text-muted">{isRtl ? "لا توجد منتجات مسجلة في هذا الطلب" : "No items listed in this order"}</span>
				) : (
					<div className="flex flex-col gap-4">
						{itemsList.map((item, idx) => {
							const title = item.product?.title?.[language] || item.product_name || item.name || "";
							const image = item.product?.image || item.image || "";
							const price = item.price || item.unitPrice || 0;
							return (
								<div key={idx} className="flex items-center gap-4 py-3 border-b border-border/40 last:border-0">
									{image && <img src={image} alt="" className="w-16 h-16 rounded-xl object-cover border border-border/50" />}
									<div className="flex-1 flex flex-col min-w-0">
										<span className="font-bold text-text text-sm sm:text-base line-clamp-1">{title}</span>
										<span className="text-xs text-text-muted mt-0.5">{isRtl ? "الكمية:" : "Qty:"} {item.quantity}</span>
									</div>
									<div className="flex flex-col items-end">
										<span className="font-extrabold text-primary text-sm sm:text-base">
											{Number(price).toLocaleString()} {order.currency || (isRtl ? "ج.م" : "EGP")}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			{/* Delivery & Payment Info */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				
				{/* Shipping Address */}
				<div className="bg-surface border border-border/50 rounded-2xl p-6">
					<h3 className="font-bold text-text mb-3">{isRtl ? "عنوان الشحن" : "Shipping Address"}</h3>
					<p className="text-sm text-text-secondary leading-relaxed">
						{formattedAddress}
					</p>
				</div>

				{/* Payment Details */}
				<div className="bg-surface border border-border/50 rounded-2xl p-6 flex flex-col justify-between">
					<div>
						<h3 className="font-bold text-text mb-3">{isRtl ? "طريقة الدفع" : "Payment Method"}</h3>
						<p className="text-sm text-text-secondary">
							{order.payment_method || (isRtl ? "غير محدد" : "Not specified")}
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
						{["delivered", "completed"].includes(order.status) && !showReturnForm && (
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
						<span className="font-bold">
							{Number(order.subtotal || 0).toLocaleString()} {order.currency || (isRtl ? "ج.م" : "EGP")}
						</span>
					</div>
					<div className="flex justify-between text-sm text-text-secondary">
						<span>{isRtl ? "الشحن" : "Shipping"}</span>
						<span className="font-bold">
							{Number(order.shipping_cost || 0).toLocaleString()} {order.currency || (isRtl ? "ج.م" : "EGP")}
						</span>
					</div>
					{Number(order.discount || 0) > 0 && (
						<div className="flex justify-between text-sm text-success">
							<span>{isRtl ? "الخصم" : "Discount"}</span>
							<span className="font-bold">
								-{Number(order.discount).toLocaleString()} {order.currency || (isRtl ? "ج.م" : "EGP")}
							</span>
						</div>
					)}
					<hr className="border-border/50 my-1" />
					<div className="flex justify-between text-lg text-text font-extrabold">
						<span>{isRtl ? "الإجمالي" : "Total"}</span>
						<span className="text-primary">
							{Number(order.total || 0).toLocaleString()} {order.currency || (isRtl ? "ج.م" : "EGP")}
						</span>
					</div>
				</div>
			</div>

		</div>
	);
};

export default OrderDetails;
