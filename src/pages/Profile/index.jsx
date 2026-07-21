import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";
import { User, Package, MapPin, Heart, Settings as SettingsIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

// Components
import ProfileOverview from "./components/ProfileOverview";
import Orders from "./components/Orders";
import Addresses from "./components/Addresses";
import Settings from "./components/Settings";

const Profile = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	
	const activeTab = searchParams.get("tab") || "overview";

	const tabs = [
		{ id: "overview", label: { en: "Overview", ar: "لوحة التحكم" }, icon: User },
		{ id: "orders", label: { en: "My Orders", ar: "طلباتي" }, icon: Package },
		{ id: "addresses", label: { en: "Addresses", ar: "عناويني" }, icon: MapPin },
		{ id: "settings", label: { en: "Settings", ar: "إعدادات الحساب" }, icon: SettingsIcon },
		// Wishlist is a separate page but we link to it
		{ id: "wishlist", label: { en: "Wishlist", ar: "المفضلة" }, icon: Heart, isLink: true, path: "/wishlist" },
	];

	const handleTabChange = (tab) => {
		if (tab.isLink) {
			navigate(tab.path);
		} else {
			setSearchParams({ tab: tab.id });
		}
	};

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Profile", ar: "حسابي" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Header / Title Area */}
			<div className="bg-surface border-b border-border/60 py-8 mb-8 relative z-10">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
						{isRtl ? "حسابي" : "My Account"}
					</h1>
				</Container>
			</div>

			<Container>
				<div className="flex flex-col md:flex-row gap-8 items-start">
					
					{/* Sidebar */}
					<div className="w-full md:w-64 lg:w-72 shrink-0 bg-surface rounded-2xl border border-border/50 p-4 sticky top-24 shadow-sm">
						
						{/* User Mini Profile */}
						<div className="flex items-center gap-4 mb-6 p-2">
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl shrink-0">
								A
							</div>
							<div className="flex flex-col overflow-hidden">
								<span className="font-bold text-text truncate">Ahmed Mohamed</span>
								<span className="text-xs text-text-muted truncate">ahmed@example.com</span>
							</div>
						</div>

						<hr className="border-border/50 mb-4" />

						<nav className="flex flex-col gap-1">
							{tabs.map(tab => {
								const Icon = tab.icon;
								const isActive = activeTab === tab.id;
								return (
									<button
										key={tab.id}
										onClick={() => handleTabChange(tab)}
										className={cn(
											"flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-start",
											isActive 
												? "bg-primary text-white shadow-md shadow-primary/20" 
												: "text-text-secondary hover:bg-surface-2 hover:text-primary"
										)}
									>
										<Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-text-muted")} />
										{tab.label[language]}
									</button>
								);
							})}
						</nav>

						<hr className="border-border/50 my-4" />

						<button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-danger hover:bg-danger/10 w-full text-start">
							<LogOut className="w-5 h-5" />
							{isRtl ? "تسجيل الخروج" : "Logout"}
						</button>
					</div>

					{/* Main Content Area */}
					<div className="flex-1 w-full min-w-0">
						{activeTab === "overview" && <ProfileOverview />}
						{activeTab === "orders" && <Orders />}
						{activeTab === "addresses" && <Addresses />}
						{activeTab === "settings" && <Settings />}
					</div>

				</div>
			</Container>
		</div>
	);
};

export default Profile;
