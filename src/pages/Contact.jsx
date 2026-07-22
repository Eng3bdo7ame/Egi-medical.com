import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Phone, Mail, MapPin, Check, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Contact = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Contact Us", ar: "اتصل بنا" } }
	];

	// Form States
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [subject, setSubject] = useState("general");
	const [message, setMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		// In a real app, send data to server
		setIsSubmitted(true);
		setName("");
		setEmail("");
		setPhone("");
		setMessage("");
		setTimeout(() => setIsSubmitted(false), 5000);
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Hero Banner */}
			<div className="bg-surface border-b border-border/60 py-10 mb-12">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<h1 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
						{isRtl ? "اتصل بنا" : "Contact Us"}
					</h1>
					<p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
						{isRtl
							? "هل لديك أي استفسار أو اقتراح؟ نحن هنا لمساعدتك والإجابة على أسئلتك على مدار الساعة."
							: "Have any questions or business inquiries? Our dedicated medical sales and support team is here to assist you 24/7."}
					</p>
				</Container>
			</div>

			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					
					{/* Left: Contact Form */}
					<div className="lg:col-span-7 bg-surface border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm">
						
						{isSubmitted ? (
							<div className="p-6 bg-success/5 border border-success/20 rounded-2xl flex flex-col items-center text-center gap-4 py-12 animate-in fade-in duration-300">
								<div className="w-16 h-16 rounded-full bg-success text-white flex items-center justify-center shadow-lg shadow-success/20">
									<Check className="w-8 h-8" />
								</div>
								<h3 className="text-2xl font-black text-text">
									{isRtl ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
								</h3>
								<p className="text-text-secondary max-w-sm leading-relaxed text-sm">
									{isRtl
										? "شكراً لتواصلك معنا. سيقوم أحد ممثلي الدعم الطبي لدينا بالرد عليك عبر البريد الإلكتروني في غضون 24 ساعة."
										: "Thank you for contacting us. One of our biomedical specialists will reach back to you within 24 hours."}
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="flex flex-col gap-6">
								<h2 className="text-xl font-bold text-text mb-2">
									{isRtl ? "أرسل لنا رسالة مباشرة" : "Send Us a Message"}
								</h2>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-bold text-text-secondary">{isRtl ? "الاسم الكامل" : "Full Name"}</label>
										<input 
											type="text" 
											value={name}
											onChange={e => setName(e.target.value)}
											placeholder={isRtl ? "أحمد محمد" : "e.g. John Doe"}
											className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold"
											required
										/>
									</div>
									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-bold text-text-secondary">{isRtl ? "البريد الإلكتروني" : "Email Address"}</label>
										<input 
											type="email" 
											value={email}
											onChange={e => setEmail(e.target.value)}
											placeholder="john@example.com"
											className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold text-left"
											dir="ltr"
											required
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-bold text-text-secondary">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
										<input 
											type="tel" 
											value={phone}
											onChange={e => setPhone(e.target.value)}
											placeholder="+20 100 123 4567"
											className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold text-left"
											dir="ltr"
											required
										/>
									</div>
									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-bold text-text-secondary">{isRtl ? "موضوع الاستفسار" : "Inquiry Subject"}</label>
										<select 
											value={subject}
											onChange={e => setSubject(e.target.value)}
											className="h-12 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold cursor-pointer"
										>
											<option value="general">{isRtl ? "استفسار عام" : "General Inquiry"}</option>
											<option value="sales">{isRtl ? "المبيعات والأجهزة" : "Sales & Medical Devices"}</option>
											<option value="support">{isRtl ? "الدعم الفني والصيانة" : "Technical Maintenance"}</option>
										</select>
									</div>
								</div>

								<div className="flex flex-col gap-1.5">
									<label className="text-xs font-bold text-text-secondary">{isRtl ? "رسالتك" : "Message"}</label>
									<textarea 
										rows="5"
										value={message}
										onChange={e => setMessage(e.target.value)}
										placeholder={isRtl ? "اكتب تفاصيل استفسارك هنا بوضوح..." : "Describe your request in detail..."}
										className="p-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold resize-none"
										required
									/>
								</div>

								<button 
									type="submit"
									className="h-14 px-8 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98]"
								>
									<Send className="w-5 h-5" />
									{isRtl ? "إرسال الرسالة" : "Send Message"}
								</button>
							</form>
						)}

					</div>

					{/* Right: Contact details */}
					<div className="lg:col-span-5 flex flex-col gap-6">
						
						{/* Info Card */}
						<div className="bg-surface border border-border/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
							<h2 className="text-xl font-bold text-text border-b border-border/50 pb-3">
								{isRtl ? "معلومات التواصل" : "Direct Contact"}
							</h2>

							<div className="flex flex-col gap-5">
								
								{/* Phone */}
								<div className="flex items-start gap-4">
									<div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
										<Phone className="w-5 h-5" />
									</div>
									<div className="flex flex-col">
										<span className="text-xs text-text-muted font-bold">{isRtl ? "الخط الساخن" : "Hotline / Support"}</span>
										<a href="tel:01001234567" className="font-extrabold text-text hover:text-primary transition-colors mt-0.5">0100 123 4567</a>
									</div>
								</div>

								{/* WhatsApp */}
								<div className="flex items-start gap-4">
									<div className="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center shrink-0">
										<MessageCircle className="w-5 h-5" />
									</div>
									<div className="flex flex-col">
										<span className="text-xs text-text-muted font-bold">{isRtl ? "واتساب المبيعات" : "Sales WhatsApp"}</span>
										<a href="https://wa.me/201001234567" className="font-extrabold text-text hover:text-success transition-colors mt-0.5" dir="ltr">+20 100 123 4567</a>
									</div>
								</div>

								{/* Email */}
								<div className="flex items-start gap-4">
									<div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
										<Mail className="w-5 h-5" />
									</div>
									<div className="flex flex-col">
										<span className="text-xs text-text-muted font-bold">{isRtl ? "البريد الإلكتروني" : "Email Address"}</span>
										<a href="mailto:support@mootahcare.com" className="font-extrabold text-text hover:text-primary transition-colors mt-0.5">support@mootahcare.com</a>
									</div>
								</div>

								{/* Address */}
								<div className="flex items-start gap-4">
									<div className="w-10 h-10 bg-warning/10 text-warning rounded-xl flex items-center justify-center shrink-0">
										<MapPin className="w-5 h-5" />
									</div>
									<div className="flex flex-col">
										<span className="text-xs text-text-muted font-bold">{isRtl ? "المقر الرئيسي" : "Headquarters"}</span>
										<p className="text-sm text-text-secondary leading-relaxed mt-0.5">
											{isRtl 
												? "١٢٣ شارع الثورة، مصر الجديدة، القاهرة، مصر"
												: "123 El Thawra St, Heliopolis, Cairo, Egypt"}
										</p>
									</div>
								</div>

							</div>
						</div>

						{/* Map Placeholder */}
						<div className="bg-surface border border-border/50 rounded-3xl overflow-hidden h-60 relative shadow-sm">
							<div className="absolute inset-0 bg-surface-2 flex flex-col items-center justify-center p-6 text-center gap-2">
								<MapPin className="w-8 h-8 text-primary animate-bounce" />
								<span className="font-extrabold text-sm text-text">{isRtl ? "موقعنا في القاهرة" : "Our Cairo Location"}</span>
								<span className="text-xs text-text-muted max-w-xs">{isRtl ? "مصر الجديدة - بالقرب من مترو الأهرام" : "Heliopolis - Near Al-Ahram Metro Station"}</span>
							</div>
						</div>

					</div>

				</div>
			</Container>

		</div>
	);
};

export default Contact;
