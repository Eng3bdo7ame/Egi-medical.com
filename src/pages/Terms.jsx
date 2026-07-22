import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AlertTriangle, Clock, BookOpen } from "lucide-react";

export const Terms = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Terms of Service", ar: "شروط الاستخدام" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Hero Banner */}
			<div className="bg-surface border-b border-border/60 py-10 mb-12">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<h1 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
						{isRtl ? "شروط الاستخدام" : "Terms of Service"}
					</h1>
					<div className="flex items-center gap-4 text-xs font-bold text-text-muted mt-4">
						<div className="flex items-center gap-1.5">
							<Clock className="w-4 h-4" />
							<span>{isRtl ? "آخر تحديث: أكتوبر ٢٠٢٦" : "Last updated: October 2026"}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<BookOpen className="w-4 h-4" />
							<span>{isRtl ? "وقت القراءة: ٥ دقائق" : "Read time: 5 mins"}</span>
						</div>
					</div>
				</Container>
			</div>

			<Container>
				<div className="max-w-4xl mx-auto bg-surface border border-border/50 rounded-3xl p-6 sm:p-10 shadow-sm">
					
					{/* IMPORTANT Medical Disclaimer */}
					<div className="p-5 bg-danger/5 border border-danger/20 rounded-2xl flex gap-3 text-danger mb-8 text-sm">
						<AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
						<div className="flex flex-col gap-1.5">
							<span className="font-extrabold">{isRtl ? "إخلاء مسؤولية طبي هام جداً" : "CRITICAL Medical Disclaimer"}</span>
							<p className="text-xs text-text-secondary leading-relaxed">
								{isRtl
									? "المعلومات والأجهزة الطبية المعروضة في MootahCare+ لا تغني عن استشارة الطبيب المختص أو مقدم الرعاية الصحية المرخص. يجب دائماً قراءة دليل المستخدم المرفق مع الأجهزة بدقة واتباع إرشادات الطبيب المعالج قبل القياس أو التشخيص الذاتي."
									: "The information and medical products listed on MootahCare+ are not substitutes for professional medical advice, diagnosis, or treatment. Always read the user manual supplied with the devices carefully and follow your physician's guidance before self-measurement or diagnostics."}
							</p>
						</div>
					</div>

					{/* Policy Content */}
					<div className="prose prose-sm md:prose-base max-w-none text-text-secondary leading-relaxed flex flex-col gap-8">
						
						{/* Section 1 */}
						<div className="flex flex-col gap-3">
							<h2 className="text-xl font-extrabold text-text">
								{isRtl ? "١. قبول الشروط" : "1. Acceptance of Terms"}
							</h2>
							<p>
								{isRtl 
									? "باستخدامك لموقعنا الإلكتروني وشراء مستلزماتك الطبية منه، فإنك توافق بالكامل على الالتزام بشروط الاستخدام المذكورة هنا وكافة القوانين الصحية والتجارية المصرية ذات الصلة."
									: "By accessing and using this website to purchase medical supplies, you fully accept and agree to comply with these Terms of Service and all applicable health and commerce laws in Egypt."}
							</p>
						</div>

						{/* Section 2 */}
						<div className="flex flex-col gap-3">
							<h2 className="text-xl font-extrabold text-text">
								{isRtl ? "٢. أهلية شراء الأجهزة والمستلزمات الطبية" : "2. Purchase Eligibility"}
							</h2>
							<p>
								{isRtl
									? "قد تتطلب بعض الأجهزة الطبية المتخصصة وجود إشراف طبي أو تقديم رخصة مزاولة مهنة (مثل عيادات ومستشفيات). نحن نحتفظ بالحق في إلغاء أي طلب لا يستوفي الشروط أو التراخيص الطبية المطلوبة."
									: "Certain professional-grade medical devices may require medical supervision or proof of registration (such as for clinics or hospitals). We reserve the right to cancel orders that do not meet professional medical purchase criteria."}
							</p>
						</div>

						{/* Section 3 */}
						<div className="flex flex-col gap-3">
							<h2 className="text-xl font-extrabold text-text">
								{isRtl ? "٣. دقة الأسعار والبيانات الطبية للمنتجات" : "3. Product Information & Pricing"}
							</h2>
							<p>
								{isRtl
									? "نسعى لتقديم أدق التفاصيل التقنية للأجهزة والأسعار. في حال وجود خطأ مطبعي في السعر أو المواصفات، سيتم التواصل معك فوراً وتعديل الطلب أو إلغائه واسترداد المبلغ بالكامل."
									: "We strive for complete accuracy in hardware specifications and pricing. In the rare event of typographical errors, we reserve the right to contact you to adjust or cancel the order with a full refund."}
							</p>
						</div>

						{/* Section 4 */}
						<div className="flex flex-col gap-3">
							<h2 className="text-xl font-extrabold text-text">
								{isRtl ? "٤. المسؤولية القانونية" : "4. Limitation of Liability"}
							</h2>
							<p>
								{isRtl
									? "لا تتحمل MootahCare+ المسؤولية عن أي أضرار ناتجة عن الاستخدام الخاطئ للأجهزة الطبية، أو عدم اتباع تعليمات الاستخدام والأمان المرفقة من قبل المصنعين."
									: "MootahCare+ is not liable for any direct or indirect health damages resulting from the misuse of purchased medical devices, or the failure to follow the manufacturer's user manual and safety directions."}
							</p>
						</div>

					</div>

				</div>
			</Container>

		</div>
	);
};

export default Terms;
