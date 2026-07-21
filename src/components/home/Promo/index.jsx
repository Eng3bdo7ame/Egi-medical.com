import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion } from "framer-motion";
import { promoCards } from "./promo.data";
import { Icon } from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export const PromoSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Section bg="surface">
			<Container>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{promoCards.map((promo, index) => (
						<motion.div
							key={promo.id}
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
						>
							<Link
								to={promo.link}
								className={cn(
									"group relative flex items-center p-6 lg:p-8 rounded-[20px] overflow-hidden transition-shadow duration-300 hover:shadow-floating border border-transparent hover:border-border-normal",
									promo.bgClass
								)}
							>
								{/* Decorative subtle background icon */}
								<Icon
									name={promo.icon}
									size={120}
									strokeWidth={1}
									className="absolute -end-6 -bottom-6 opacity-5 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
								/>

								<div className="relative z-10 flex flex-col justify-center gap-2 max-w-[200px]">
									<div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center mb-2 shadow-sm backdrop-blur-sm">
										<Icon name={promo.icon} size={20} strokeWidth={2.5} />
									</div>
									<h3 className="text-xl lg:text-2xl font-bold leading-tight">
										{promo.title[language]}
									</h3>
									<p className="text-sm font-medium opacity-80 leading-snug">
										{promo.subtitle[language]}
									</p>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default PromoSection;
