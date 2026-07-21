import React from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * HeroFeatures Component
 * Displays the trust indicators (e.g., 100% Original, Secure Payment) beneath the CTAs.
 */
export const HeroFeatures = ({ features, language }) => {
	if (!features || features.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center gap-6 md:gap-8 pt-8">
			{features.map((feature, idx) => (
				<div key={idx} className="flex items-center gap-3">
					<div className="flex items-center justify-center text-primary">
						<Icon name={feature.icon} size={24} strokeWidth={1.5} />
					</div>
					<div className="flex flex-col leading-tight">
						<span className="text-[13px] font-bold text-text">
							{feature.title[language]}
						</span>
						<span className="text-[12px] font-medium text-text-muted">
							{feature.subtitle[language]}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default HeroFeatures;
