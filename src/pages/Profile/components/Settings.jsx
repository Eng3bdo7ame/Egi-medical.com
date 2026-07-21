import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const Settings = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-extrabold text-text">
					{isRtl ? "إعدادات الحساب" : "Account Settings"}
				</h2>
			</div>

			<div className="bg-surface rounded-2xl border border-border/50 p-6 md:p-8">
				<form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
					
					{/* Personal Info */}
					<div>
						<h3 className="text-lg font-bold text-text mb-4 border-b border-border/50 pb-2">
							{isRtl ? "المعلومات الشخصية" : "Personal Information"}
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "الاسم الأول" : "First Name"}</label>
								<input type="text" defaultValue={isRtl ? "أحمد" : "Ahmed"} className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "اسم العائلة" : "Last Name"}</label>
								<input type="text" defaultValue={isRtl ? "محمد" : "Mohamed"} className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "البريد الإلكتروني" : "Email Address"}</label>
								<input type="email" defaultValue="ahmed@example.com" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left" dir="ltr" />
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
								<input type="tel" defaultValue="+201001234567" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left" dir="ltr" />
							</div>
						</div>
					</div>

					{/* Password */}
					<div className="mt-4">
						<h3 className="text-lg font-bold text-text mb-4 border-b border-border/50 pb-2">
							{isRtl ? "تغيير كلمة المرور" : "Change Password"}
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "كلمة المرور الحالية" : "Current Password"}</label>
								<input type="password" placeholder="••••••••" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left" dir="ltr" />
							</div>
							<div className="flex flex-col gap-2 md:col-start-1">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "كلمة المرور الجديدة" : "New Password"}</label>
								<input type="password" placeholder="••••••••" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left" dir="ltr" />
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "تأكيد كلمة المرور" : "Confirm Password"}</label>
								<input type="password" placeholder="••••••••" className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left" dir="ltr" />
							</div>
						</div>
					</div>

					<div className="flex justify-end mt-4">
						<button type="submit" className="h-14 px-8 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
							{isRtl ? "حفظ التغييرات" : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Settings;
