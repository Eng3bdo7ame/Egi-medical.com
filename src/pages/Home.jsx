import React, { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useLanguage } from "@/app/providers/I18nProvider";

// Layout Primitives
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import Grid from "@/components/ui/Grid";
import Divider from "@/components/ui/Divider";

// Core UI Components
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

const Home = () => {
	const { theme, toggleTheme } = useTheme();
	const { language, toggleLanguage } = useLanguage();
	const [isLoading, setIsLoading] = useState(false);

	const isRtl = language === "ar";

	const simulateLoading = () => {
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 2000);
	};

	return (
		<Container className="space-y-12 py-6">
			{/* Header / Intro */}
			<Section size="sm" bg="surface" className="rounded-lg shadow-sm border border-border">
				<Stack gap={4} align="center" className="text-center max-w-3xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary transition-colors">
						{isRtl ? "نظام هوية التصميم والمظهر" : "Design System & Theme Playground"}
					</h1>
					<p className="text-text-secondary text-lg">
						{isRtl
							? "هنا يمكنك اختبار الألوان، الهوامش، الحواف، والظلال في كلا المظهرين والاتجاهين."
							: "A visual sandbox to verify color tokens, spacing, radius, shadows, and localization states."}
					</p>
					<Stack direction="row" gap={4} justify="center" className="pt-2">
						<button
							onClick={toggleTheme}
							className="px-6 py-2.5 bg-primary text-background font-semibold rounded-md shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
						>
							{isRtl ? "تغيير المظهر" : "Toggle Theme"} ({theme})
						</button>
						<button
							onClick={toggleLanguage}
							className="px-6 py-2.5 bg-secondary text-background font-semibold rounded-md shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
						>
							{isRtl ? "English (LTR)" : "العربية (RTL)"}
						</button>
					</Stack>
				</Stack>
			</Section>

			{/* Buttons & Badges Sandbox */}
			<Grid cols={1} md={2} gap={6}>
				{/* Buttons Section */}
				<Card>
					<CardHeader>
						<CardTitle>{isRtl ? "🔘 الأزرار (Buttons)" : "🔘 Buttons"}</CardTitle>
						<CardDescription>{isRtl ? "اختبار أحجام وحالات الأزرار المختلفة" : "Testing button variants, sizes, and states"}</CardDescription>
					</CardHeader>
					<CardContent>
						<Stack gap={4}>
							{/* Variants */}
							<h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">{isRtl ? "الأشكال" : "Variants"}</h4>
							<div className="flex flex-wrap gap-2">
								<Button variant="default">Default</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="destructive">Destructive</Button>
							</div>

							{/* Sizes */}
							<h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">{isRtl ? "الأحجام" : "Sizes"}</h4>
							<div className="flex flex-wrap items-center gap-2">
								<Button size="xs">XS</Button>
								<Button size="sm">SM</Button>
								<Button size="default">Default</Button>
								<Button size="lg">LG</Button>
								<Button size="xl">XL</Button>
							</div>

							{/* States */}
							<h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">{isRtl ? "الحالات والتفاعل" : "States & Interaction"}</h4>
							<div className="flex flex-wrap gap-2">
								<Button loading={isLoading} onClick={simulateLoading}>
									{isRtl ? "محاكاة التحميل" : "Simulate Loading"}
								</Button>
								<Button disabled>{isRtl ? "معطل" : "Disabled"}</Button>
							</div>
						</Stack>
					</CardContent>
				</Card>

				{/* Badges Section */}
				<Card>
					<CardHeader>
						<CardTitle>{isRtl ? "🏷️ الشارات (Badges)" : "🏷️ Badges"}</CardTitle>
						<CardDescription>{isRtl ? "عرض الشارات لتوضيح الحالات والقيم" : "Badges for statuses and custom parameters"}</CardDescription>
					</CardHeader>
					<CardContent>
						<Stack gap={6}>
							{/* Variants */}
							<div className="space-y-2">
								<h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">{isRtl ? "الأشكال" : "Variants"}</h4>
								<div className="flex flex-wrap gap-2">
									<Badge variant="default">Default</Badge>
									<Badge variant="secondary">Secondary</Badge>
									<Badge variant="outline">Outline</Badge>
									<Badge variant="success">Success</Badge>
									<Badge variant="warning">Warning</Badge>
									<Badge variant="destructive">Destructive</Badge>
								</div>
							</div>

							{/* Sizes */}
							<div className="space-y-2">
								<h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">{isRtl ? "الأحجام" : "Sizes"}</h4>
								<div className="flex flex-wrap items-center gap-2">
									<Badge size="sm">Small</Badge>
									<Badge size="md">Medium</Badge>
									<Badge size="lg">Large</Badge>
								</div>
							</div>
						</Stack>
					</CardContent>
				</Card>
			</Grid>

			{/* Inputs & Forms Sandbox */}
			<Card>
				<CardHeader>
					<CardTitle>{isRtl ? "📝 الحقول والنصوص (Inputs & Textfields)" : "📝 Inputs & Textfields"}</CardTitle>
					<CardDescription>{isRtl ? "مدخلات النصوص وحالات الخطأ والتعطيل" : "Input elements, errors, validation, and decorative state representations"}</CardDescription>
				</CardHeader>
				<CardContent>
					<Grid cols={1} md={2} gap={6}>
						<Input
							label={isRtl ? "الاسم الكامل" : "Full Name"}
							placeholder="John Doe"
						/>
						<Input
							label={isRtl ? "البريد الإلكتروني (حالة خطأ)" : "Email Address (Error State)"}
							placeholder="name@example.com"
							error={isRtl ? "البريد الإلكتروني غير صالح" : "Please enter a valid email address"}
							defaultValue="invalid-email"
						/>
						<Input
							label={isRtl ? "حقل معطل" : "Disabled Input"}
							placeholder={isRtl ? "لا يمكن تعديل هذا الحقل" : "You cannot edit this field"}
							disabled
						/>
						<Input
							label={isRtl ? "حقل مع أيقونة بحث" : "Input with Search Icon"}
							placeholder={isRtl ? "ابحث عن الأدوية..." : "Search medicines..."}
							leftIcon={
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							}
						/>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Home;
