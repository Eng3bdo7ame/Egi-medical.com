import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShoppingCart } from "lucide-react";

import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import EmptyCartState from "./components/EmptyCartState";

import { mockCartItems, mockCartSummary } from "./components/cart.mock";

const Cart = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [items, setItems] = useState(mockCartItems);
	const [summary, setSummary] = useState(mockCartSummary);
	const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Shopping Cart", ar: "سلة المشتريات" } }
	];

	const handleUpdateQuantity = (id, newQuantity) => {
		setItems(prev => prev.map(item => 
			item.id === id ? { ...item, quantity: newQuantity } : item
		));
		// In a real app, you would recalculate summary here or via backend
	};

	const handleRemoveItem = (id) => {
		setItems(prev => prev.filter(item => item.id !== id));
		// Recalculate summary in real app
	};

	const handleSaveForLater = (id) => {
		console.log("Saved for later:", id);
		handleRemoveItem(id);
	};

	const handleApplyCoupon = (code) => {
		setIsValidatingCoupon(true);
		setTimeout(() => {
			setIsValidatingCoupon(false);
			// Fake success: add discount
			setSummary(prev => ({
				...prev,
				discount: 50.00,
				total: prev.total - 50.00
			}));
		}, 800);
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			{/* Header / Title Area */}
			<div className="bg-surface border-b border-border/60 py-8 mb-8 relative z-10">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
							<ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
						</div>
						<h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
							{isRtl ? "سلة المشتريات" : "Shopping Cart"}
						</h1>
						{items.length > 0 && (
							<span className="px-3 py-1 bg-surface-2 rounded-full text-sm font-bold text-text-secondary mt-1">
								{items.length} {isRtl ? "عناصر" : "items"}
							</span>
						)}
					</div>
				</Container>
			</div>

			<Container>
				{items.length === 0 ? (
					<EmptyCartState />
				) : (
					<div className="flex flex-col lg:flex-row gap-8 items-start relative">
						
						{/* Left Column: Cart Items */}
						<div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col gap-4 shrink-0">
							{/* Header Row (Desktop only) */}
							<div className="hidden sm:flex items-center justify-between px-4 pb-2 border-b border-border/60">
								<span className="text-sm font-bold text-text-secondary w-full">
									{isRtl ? "المنتج" : "Product"}
								</span>
								<span className="text-sm font-bold text-text-secondary w-[120px] text-end">
									{isRtl ? "الإجمالي" : "Total"}
								</span>
							</div>

							<div className="flex flex-col gap-4">
								{items.map(item => (
									<CartItem 
										key={item.id}
										item={item}
										onUpdateQuantity={handleUpdateQuantity}
										onRemove={handleRemoveItem}
										onSaveForLater={handleSaveForLater}
									/>
								))}
							</div>
						</div>

						{/* Right Column: Order Summary */}
						<div className="w-full lg:w-[40%] xl:w-[35%] lg:sticky lg:top-24 z-10">
							<CartSummary 
								summary={summary}
								onApplyCoupon={handleApplyCoupon}
								isValidatingCoupon={isValidatingCoupon}
							/>
						</div>

					</div>
				)}
			</Container>
		</div>
	);
};

export default Cart;
