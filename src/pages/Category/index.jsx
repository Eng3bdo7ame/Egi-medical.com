import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Toolbar from "../Products/components/Toolbar";
import ProductGrid from "../Products/components/ProductGrid";
import Pagination from "../Products/components/Pagination";
import ActiveFilters from "../Products/components/ActiveFilters";
import FilterSidebar from "../Products/components/FilterSidebar";
import RecentlyViewed from "../Products/components/RecentlyViewed";
import LoadingState from "../Products/components/States/LoadingState";
import EmptyState from "../Products/components/States/EmptyState";
import { mockProducts } from "../Products/components/products.mock";
import { useLanguage } from "@/app/providers/I18nProvider";

const Category = () => {
	const { slug } = useParams();
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	// PLP State
	const [viewMode, setViewMode] = useState("grid-3");
	const [sortOption, setSortOption] = useState("featured");
	const [currentPage, setCurrentPage] = useState(1);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	
	// Filter State
	const [filters, setFilters] = useState({
		availability: [],
		price: [0, 10000],
		brands: [],
		rating: null,
	});

	// Fake initial loading
	React.useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1200);
		return () => clearTimeout(timer);
	}, []);
	
	const itemsPerPage = 12;

	// In a real app, you'd fetch the category object by slug here
	const fakeCategoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

	// Breadcrumb mapping
	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Categories", ar: "الأقسام" }, link: "/categories" },
		{ label: fakeCategoryName } 
	];

	// Fake Filter Options
	const filterOptions = {
		availability: [
			{ id: "instock", label: { en: "In Stock", ar: "متوفر" }, count: 145 },
			{ id: "sale", label: { en: "On Sale", ar: "تخفيضات" }, count: 32 }
		],
		brands: [
			{ id: "omron", label: { en: "OMRON", ar: "أومرون" }, count: 42 },
			{ id: "littmann", label: { en: "Littmann", ar: "ليتمان" }, count: 18 },
			{ id: "roche", label: { en: "Roche", ar: "روش" }, count: 24 }
		]
	};

	// Handlers for Filters
	const handleCheckboxChange = (group, value, checked) => {
		setFilters(prev => ({
			...prev,
			[group]: checked 
				? [...prev[group], value] 
				: prev[group].filter(item => item !== value)
		}));
	};

	const handleRangeChange = (group, range) => {
		setFilters(prev => ({ ...prev, [group]: range }));
	};

	const handleRatingChange = (rating) => {
		setFilters(prev => ({ ...prev, rating }));
	};

	const handleClearAll = () => {
		setFilters({
			availability: [],
			price: [0, 10000],
			brands: [],
			rating: null,
		});
	};

	const handleRemoveActiveFilter = (filterId, type) => {
		if (type === 'rating') {
			handleRatingChange(null);
		} else if (type === 'price') {
			handleRangeChange('price', [0, 10000]);
		} else {
			handleCheckboxChange(type, filterId, false);
		}
	};

	// Compute Active Filters Array for the ActiveFilters component
	const activeFiltersList = [
		...filters.availability.map(id => ({
			id, type: 'availability', label: filterOptions.availability.find(o => o.id === id)?.label || { en: id, ar: id }
		})),
		...filters.brands.map(id => ({
			id, type: 'brands', label: filterOptions.brands.find(o => o.id === id)?.label || { en: id, ar: id }
		})),
		...(filters.rating ? [{
			id: `rating-${filters.rating}`, type: 'rating', label: { en: `${filters.rating} Stars & Up`, ar: `${filters.rating} نجوم فأكثر` }
		}] : []),
		...((filters.price[0] > 0 || filters.price[1] < 10000) ? [{
			id: `price-${filters.price[0]}-${filters.price[1]}`, type: 'price', label: { en: `${filters.price[0]} - ${filters.price[1]} EGP`, ar: `${filters.price[0]} - ${filters.price[1]} ج.م` }
		}] : [])
	];

	const activeCount = activeFiltersList.length;
	const paginatedProducts = mockProducts; 
	const totalItems = 45; 

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-10">
			{/* 1. Internal Hero */}
			<PageHero 
				title={fakeCategoryName}
				subtitle={{ en: "Explore our curated selection of high-quality products in this category.", ar: "استكشف تشكيلتنا المختارة من المنتجات عالية الجودة في هذا القسم." }}
				count={totalItems}
			/>

			<Container>
				{/* 2. Breadcrumb */}
				<Breadcrumb items={breadcrumbItems} />

				{/* 3. Toolbar */}
				<Toolbar 
					totalItems={totalItems}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					viewMode={viewMode}
					onViewModeChange={setViewMode}
					sortOption={sortOption}
					onSortChange={setSortOption}
					onOpenFilter={() => setIsMobileFilterOpen(true)}
				/>

				{/* Active Filters Row */}
				<ActiveFilters 
					activeFilters={activeFiltersList}
					onRemoveFilter={handleRemoveActiveFilter}
					onClearAll={handleClearAll}
				/>

				{/* 4. Layout (Sidebar + Grid) */}
				<div className="flex gap-8 items-start w-full relative">
					
					{/* Filter Sidebar (Phase 3) */}
					<div className="lg:sticky lg:top-24 lg:self-start lg:block z-10">
						<FilterSidebar 
							isOpen={isMobileFilterOpen} 
							onClose={() => setIsMobileFilterOpen(false)}
						>
						{/* Notice no 'Categories' filter here because we are ALREADY in a specific category */}
						<FilterSidebar.Group title={isRtl ? "التوفر" : "Availability"} activeCount={filters.availability.length}>
							{filterOptions.availability.map(opt => (
								<FilterSidebar.Checkbox 
									key={opt.id} 
									label={opt.label[language]} 
									value={opt.id} 
									count={opt.count}
									checked={filters.availability.includes(opt.id)}
									onChange={(val, checked) => handleCheckboxChange('availability', val, checked)}
								/>
							))}
						</FilterSidebar.Group>

						<FilterSidebar.Group title={isRtl ? "السعر" : "Price"} activeCount={(filters.price[0] > 0 || filters.price[1] < 10000) ? 1 : 0}>
							<FilterSidebar.Range 
								min={0} max={10000} 
								value={filters.price} 
								onChange={(range) => handleRangeChange('price', range)} 
							/>
						</FilterSidebar.Group>

						<FilterSidebar.Group title={isRtl ? "العلامات التجارية" : "Brands"} activeCount={filters.brands.length}>
							{filterOptions.brands.map(opt => (
								<FilterSidebar.Checkbox 
									key={opt.id} 
									label={opt.label[language]} 
									value={opt.id} 
									count={opt.count}
									checked={filters.brands.includes(opt.id)}
									onChange={(val, checked) => handleCheckboxChange('brands', val, checked)}
								/>
							))}
						</FilterSidebar.Group>

						<FilterSidebar.Group title={isRtl ? "التقييم" : "Rating"} activeCount={filters.rating ? 1 : 0}>
							{[5, 4, 3].map(stars => (
								<FilterSidebar.Rating 
									key={stars} 
									stars={stars} 
									selectedRating={filters.rating}
									onChange={handleRatingChange} 
								/>
							))}
						</FilterSidebar.Group>

						<FilterSidebar.Footer 
							activeCount={activeCount} 
							onClear={handleClearAll}
							onApply={() => setIsMobileFilterOpen(false)} 
						/>
					</FilterSidebar>
					</div>

					{/* 5. Product Grid */}
					<div className="w-full flex-grow min-w-0">
						{isLoading ? (
							<LoadingState viewMode={viewMode} count={itemsPerPage} />
						) : paginatedProducts.length === 0 ? (
							<EmptyState onClearFilters={handleClearAll} />
						) : (
							<ProductGrid products={paginatedProducts} viewMode={viewMode} />
						)}
						
						{/* 6. Pagination */}
						{!isLoading && paginatedProducts.length > 0 && (
							<Pagination 
								currentPage={currentPage}
								totalPages={4} 
								onPageChange={setCurrentPage}
							/>
						)}
					</div>

				</div>

				{/* 7. Recently Viewed */}
				{!isLoading && (
					<RecentlyViewed products={mockProducts.slice(0, 6)} />
				)}
			</Container>
		</div>
	);
};

export default Category;
