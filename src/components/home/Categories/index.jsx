import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion } from "framer-motion";
import { categoryPills } from "./categories.data";
import { Icon } from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const CategoriesSection = () => {
	const { language } = useLanguage();

	return (
		<Section bg="background" className="py-8 md:py-12 border-b border-border">
			<Container>
				<div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
					{categoryPills.map((category, index) => (
						<motion.div
							key={category.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.05 }}
						>
							<Link
								to={category.link}
								className="group flex flex-col items-center gap-3 w-20 md:w-24 outline-none"
							>
								<motion.div
									whileHover={{ y: -4, scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-2 border border-border-light shadow-sm group-hover:shadow-raised group-hover:border-primary/20 transition-all duration-200"
								>
									<Icon
										name={category.icon}
										size={28}
										strokeWidth={1.5}
										className="text-primary/70 group-hover:text-primary transition-colors duration-200"
									/>
								</motion.div>
								<span className="text-xs md:text-sm font-medium text-text-secondary text-center leading-tight group-hover:text-primary transition-colors">
									{category.name[language]}
								</span>
							</Link>
						</motion.div>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default CategoriesSection;
