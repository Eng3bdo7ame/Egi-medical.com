import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { navigationLinks } from "@/config/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import MegaMenu from "./MegaMenu";

/**
 * Navigation Component
 * Matches the reference design: Blue "All Categories" button with Hamburger icon, followed by specific category links.
 */

const AR_NAV = {
	"Medicines": "الأدوية",
	"Medical Devices": "الأجهزة الطبية",
	"Personal Care": "العناية الشخصية",
	"Baby Care": "العناية بالطفل",
	"Health Conditions": "الحالات الصحية",
	"Brands": "الماركات",
	"Offers": "العروض",
};

export const Navigation = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
	
	const closeTimeoutRef = React.useRef(null);

	const handleMouseEnter = () => {
		if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
		setIsMegaMenuOpen(true);
	};

	const handleMouseLeave = () => {
		closeTimeoutRef.current = setTimeout(() => {
			setIsMegaMenuOpen(false);
		}, 150); // slight debounce to prevent flickering when mouse slips
	};

	return (
		<div className="w-full bg-surface border-b border-border hidden lg:block relative z-50">
			<Container className="relative">
				<div 
					className="flex items-center gap-2 py-1 static"
					onMouseLeave={handleMouseLeave}
				>
					{/* All Categories Button */}
					<div 
						className="relative"
						onMouseEnter={handleMouseEnter}
					>
						<button
							className={cn(
								"inline-flex items-center justify-between min-w-[200px] h-[52px] text-white text-[15px] font-semibold px-5 rounded-t-lg transition-colors duration-200 cursor-pointer select-none shrink-0",
								isMegaMenuOpen ? "bg-primary-hover" : "bg-primary hover:bg-primary-hover"
							)}
							aria-haspopup="true"
							aria-expanded={isMegaMenuOpen}
						>
							<div className="flex items-center gap-3">
								<Icon name="Menu" size={20} strokeWidth={2.5} />
								<span>{isRtl ? "كل الأقسام" : "All Categories"}</span>
							</div>
							<Icon name="ChevronDown" size={16} className={cn("opacity-80 transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
						</button>
					</div>

					{/* Mega Menu Dropdown */}
					<div className="absolute top-full left-0 right-0 w-full" onMouseEnter={handleMouseEnter}>
						<MegaMenu 
							isOpen={isMegaMenuOpen} 
							language={language} 
							isRtl={isRtl} 
							onClose={() => setIsMegaMenuOpen(false)} 
						/>
					</div>

					{/* Navigation Links */}
					<nav className="flex items-center gap-1 ms-4 flex-1" aria-label="Main navigation">
						{navigationLinks.map((link) => {
							const isOffer = link.name === "Offers";
							const linkName = isRtl ? (AR_NAV[link.name] || link.name) : link.name;

							return (
								<Link
									key={link.path}
									to={link.path}
									className={cn(
										"relative inline-flex items-center px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 select-none",
										isOffer
											? "text-secondary font-semibold hover:bg-secondary/10"
											: "text-text-secondary hover:text-primary hover:bg-primary/5"
									)}
								>
									{linkName}
								</Link>
							);
						})}

						{/* Consultation Link with Badge */}
						<Link
							to="/consultation"
							className="relative inline-flex items-center gap-2 px-3 py-2 text-[15px] font-semibold text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200 select-none "
						>
							{isRtl ? "الاستشارات" : "Consultation"}
							<Badge variant="success" size="sm" className="h-5 px-1.5 text-[10px]">
								{isRtl ? "جديد" : "New"}
							</Badge>
						</Link>
					</nav>
				</div>
			</Container>
		</div>
	);
};

export default Navigation;
