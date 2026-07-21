import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Stack from "@/components/ui/Stack";

export const Footer = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<footer className="w-full border-t border-border/10 bg-surface/20 py-8 transition-colors duration-normal mt-auto">
			<Container>
				<Stack direction="col" gap={4} align="center" justify="between" className="sm:flex-row text-center sm:text-start">
					<p className="text-sm text-text-muted">
						&copy; {new Date().getFullYear()} {isRtl ? "إيجى ميديكال. جميع الحقوق محفوظة." : "EG-Medical. All rights reserved."}
					</p>
					<Stack direction="row" gap={4} className="text-xs text-text-muted justify-center">
						<a href="#terms" className="hover:text-primary transition-colors">{isRtl ? "الشروط والأحكام" : "Terms"}</a>
						<a href="#privacy" className="hover:text-primary transition-colors">{isRtl ? "سياسة الخصوصية" : "Privacy"}</a>
					</Stack>
				</Stack>
			</Container>
		</footer>
	);
};

export default Footer;
