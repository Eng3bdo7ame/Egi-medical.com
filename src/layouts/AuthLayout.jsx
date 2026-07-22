import React from "react";
import { Outlet } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LanguageSwitcher from "@/components/layout/Header/LanguageSwitcher";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { HeartPulse } from "lucide-react";

export const AuthLayout = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="min-h-screen flex flex-col lg:flex-row bg-background text-text transition-all duration-300 relative overflow-hidden select-none">
			
			{/* Decorative background blur objects */}
			<div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

			{/* Left Column: Premium Branding & Illustration (Hidden on mobile) */}
			<div className="hidden lg:flex lg:w-[45%] bg-primary/5 border-e border-border/40 flex-col justify-between p-12 relative z-10">
				
				{/* Top Branding */}
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
						<HeartPulse className="w-6 h-6 animate-pulse" />
					</div>
					<span className="text-xl font-black tracking-tight text-text">EG Medical</span>
				</div>

				{/* Middle Illustration / Slogan */}
				<div className="flex flex-col gap-6 max-w-md">
					<h1 className="text-4xl lg:text-5xl font-black text-text leading-tight tracking-tight">
						{isRtl 
							? "الرعاية الصحية الرقمية الأقرب إليك." 
							: "Digital Healthcare Closer to You."}
					</h1>
					<p className="text-text-secondary leading-relaxed text-base">
						{isRtl
							? "قم بتسجيل الدخول للوصول إلى أدواتك الطبية، طلباتك السابقة، وسلة المشتريات الخاصة بك، وإدارة فواتيرك الطبية بسهولة وأمان."
							: "Access your biomedical equipment, past order history, saved addresses, and manage your billing securely and efficiently."}
					</p>
				</div>

				{/* Footer branding */}
				<span className="text-xs text-text-muted font-bold">
					© 2026 EG Medical. All rights reserved.
				</span>

			</div>

			{/* Right Column: Auth Forms Wrapper */}
			<div className="flex-1 flex flex-col justify-between p-6 sm:p-12 relative z-10 w-full min-h-screen lg:min-h-0">
				
				{/* Top Actions: Language selection */}
				<div className="flex justify-between w-full items-center gap-4">
					<LanguageSwitcher />
					<LocalizedLink to="/" className="inline-flex items-center gap-2 lg:hidden">
						<span className="text-xl font-black tracking-tight text-text">EG Medical</span>
					</LocalizedLink>
				</div>

				{/* Forms Card */}
				<div className="w-full max-w-md mx-auto my-auto py-8">
					<div className="bg-surface/80 backdrop-blur-md border border-border/60 rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 animate-in fade-in slide-in-from-bottom-6 duration-500">
						
						{/* Logo on mobile only */}
						<div className="flex lg:hidden items-center justify-center gap-2 mb-8">
							<div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
								<HeartPulse className="w-5 h-5 animate-pulse" />
							</div>
							<span className="text-lg font-black tracking-tight text-text">EG Medical</span>
						</div>

						<Outlet />
					</div>
				</div>

				{/* Bottom Space / Mobile copyright */}
				<div className="text-center lg:hidden text-[10px] text-text-muted font-bold select-none py-4">
					© 2026 EG Medical. All rights reserved.
				</div>

			</div>

		</div>
	);
};

export default AuthLayout;
