import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Lock, MapPin, Truck, CreditCard, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import ShippingAddress from "./components/ShippingAddress";
import DeliveryMethod from "./components/DeliveryMethod";
import PaymentMethod from "./components/PaymentMethod";
import OrderSummary from "./components/OrderSummary";
import OrderSuccess from "./components/OrderSuccess";

const Checkout = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const [currentStep, setCurrentStep] = useState(1);
	const [isSuccess, setIsSuccess] = useState(false);

	if (isSuccess) {
		return (
			<div className="min-h-screen bg-background">
				<OrderSuccess />
			</div>
		);
	}

	const steps = [
		{ id: 1, title: { en: "Shipping Address", ar: "عنوان الشحن" }, icon: MapPin },
		{ id: 2, title: { en: "Delivery Method", ar: "طريقة التوصيل" }, icon: Truck },
		{ id: 3, title: { en: "Payment", ar: "الدفع" }, icon: CreditCard }
	];

	const handleNext = () => {
		if (currentStep < 3) {
			setCurrentStep(prev => prev + 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			setIsSuccess(true);
			window.scrollTo({ top: 0 });
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(prev => prev - 1);
		}
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Simple Header for Checkout (Distraction Free) */}
			<div className="bg-surface border-b border-border/60 py-4 mb-8">
				<Container className="flex items-center justify-between">
					<h1 className="text-2xl font-extrabold text-text">
						{isRtl ? "إتمام الشراء" : "Checkout"}
					</h1>
					<div className="flex items-center gap-2 text-text-muted">
						<Lock className="w-4 h-4" />
						<span className="text-sm font-bold">{isRtl ? "آمن 100%" : "100% Secure"}</span>
					</div>
				</Container>
			</div>

			<Container>
				<div className="flex flex-col lg:flex-row gap-8 items-start relative">
					
					{/* Left Column: Steps */}
					<div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col gap-6 shrink-0">
						
						{steps.map((step) => {
							const Icon = step.icon;
							const isActive = currentStep === step.id;
							const isCompleted = currentStep > step.id;

							return (
								<div 
									key={step.id} 
									className={cn(
										"bg-surface rounded-2xl border transition-all duration-300 overflow-hidden",
										isActive ? "border-primary shadow-sm" : "border-border/50 opacity-70"
									)}
								>
									{/* Step Header */}
									<button 
										onClick={() => isCompleted && setCurrentStep(step.id)}
										disabled={!isCompleted && !isActive}
										className={cn(
											"w-full flex items-center justify-between p-6",
											isCompleted && "cursor-pointer hover:bg-surface-2",
											!isCompleted && !isActive && "cursor-not-allowed"
										)}
									>
										<div className="flex items-center gap-4">
											<div className={cn(
												"w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors",
												isActive ? "bg-primary text-white" : 
												isCompleted ? "bg-success text-white" : "bg-surface-2 text-text-muted"
											)}>
												{isCompleted ? <Icon className="w-5 h-5" /> : step.id}
											</div>
											<h3 className={cn(
												"text-lg font-bold",
												isActive ? "text-text" : "text-text-secondary"
											)}>
												{step.title[language]}
											</h3>
										</div>
										
										{isCompleted && (
											<span className="text-sm font-bold text-primary px-4 py-1.5 bg-primary/10 rounded-lg">
												{isRtl ? "تعديل" : "Edit"}
											</span>
										)}
									</button>

									{/* Step Content */}
									<div className={cn(
										"grid transition-all duration-500 ease-in-out",
										isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
									)}>
										<div className="overflow-hidden">
											<div className="border-t border-border/50">
												{step.id === 1 && <ShippingAddress onNext={handleNext} />}
												{step.id === 2 && <DeliveryMethod onNext={handleNext} onBack={handleBack} />}
												{step.id === 3 && <PaymentMethod onNext={handleNext} onBack={handleBack} />}
											</div>
										</div>
									</div>
								</div>
							);
						})}

					</div>

					{/* Right Column: Order Summary */}
					<div className="w-full lg:w-[40%] xl:w-[35%] z-10">
						<OrderSummary />
					</div>

				</div>
			</Container>
		</div>
	);
};

export default Checkout;
