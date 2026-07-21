import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/app/providers/I18nProvider";

// Layout & UI States
import ProductsLayout from "../Products/components/ProductsLayout";
import LoadingState from "../Products/components/States/LoadingState";
import EmptyState from "../Products/components/States/EmptyState";
import ErrorState from "../Products/components/States/ErrorState";

// Components
import ProductsToolbar from "../Products/components/ProductsToolbar";
import ProductsGrid from "../Products/components/ProductsGrid";
import ProductsPagination from "../Products/components/ProductsPagination";
import ActiveFilters from "../Products/components/ActiveFilters";
import FilterSidebar from "../Products/components/FilterSidebar";
import RecentlyViewed from "../Products/components/RecentlyViewed";

// Hooks
import useProductFilters from "@/components/products/hooks/useProductFilters";

// Mock Data
import { mockProducts } from "../Products/components/products.mock";

const Category = () => {
	const { slug } = useParams();
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	// Custom Hook for URL State Sync
	const { state, updateParams, toggleArrayItem, clearAllFilters } = useProductFilters();
	const { viewMode, sortOption, currentPage, availability, brands, rating, price } = state;

	// In a real app, you'd fetch the category object by slug here
	const fakeCategoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

	// Fake initial loading (Simulating API fetch dependent on URL state)
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		const timer = setTimeout(() => setIsLoading(false), 800);
		return () => clearTimeout(timer);
	}, [state, slug]); 
	
	const itemsPerPage = 12; 
	const totalItems = 45; 
	
	// Breadcrumb mapping
	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Categories", ar: "الأقسام" }, link: "/categories" },
		{ label: fakeCategoryName } 
	];

	// Fake Filter Options (Would come from API)
	const filterOptions = {
		availability: { instock: 145, sale: 32 },
		brands: [
			{ id: "omron", label: { en: "OMRON", ar: "أومرون" }, count: 42 },
			{ id: "littmann", label: { en: "Littmann", ar: "ليتمان" }, count: 18 },
			{ id: "roche", label: { en: "Roche", ar: "روش" }, count: 24 }
		]
	};

	// Handlers for Filters
	const handleRemoveActiveFilter = (filterId, type) => {
		if (type === 'rating') {
			updateParams({ rating: null });
		} else if (type === 'price') {
			updateParams({ price: null });
		} else {
			toggleArrayItem(type, filterId);
		}
	};

	// Compute Active Filters Array for the ActiveFilters component
	const activeFiltersList = useMemo(() => {
		const list = [];
		availability.forEach(id => {
			list.push({ id, type: 'availability', label: { en: id === 'instock' ? 'In Stock' : 'On Sale', ar: id === 'instock' ? 'متوفر' : 'تخفيضات' } });
		});
		brands.forEach(id => {
			list.push({ id, type: 'brands', label: filterOptions.brands.find(o => o.id === id)?.label || { en: id, ar: id } });
		});
		if (rating) {
			list.push({ id: `rating-${rating}`, type: 'rating', label: { en: `${rating} Stars & Up`, ar: `${rating} نجوم فأكثر` } });
		}
		if (price[0] > 0 || price[1] < 10000) {
			list.push({ id: `price-${price[0]}-${price[1]}`, type: 'price', label: { en: `${price[0]} - ${price[1]} EGP`, ar: `${price[0]} - ${price[1]} ج.م` } });
		}
		return list;
	}, [availability, brands, rating, price]);

	// Render the sidebar component
	const renderSidebarContent = () => (
		<>
			{/* No Category filter because we are already inside a Category context */}
			<FilterSidebar.Section title={isRtl ? "التوفر" : "Availability"} activeCount={availability.length}>
				<FilterSidebar.Availability 
					selectedOptions={availability}
					onChange={(val) => toggleArrayItem("availability", val)}
					counts={filterOptions.availability}
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title={isRtl ? "السعر" : "Price"} activeCount={(price[0] > 0 || price[1] < 10000) ? 1 : 0}>
				<FilterSidebar.Price 
					min={0} max={10000} 
					value={price} 
					onChange={(range) => updateParams({ price: range })} 
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title={isRtl ? "العلامات التجارية" : "Brands"} activeCount={brands.length}>
				<FilterSidebar.Brands 
					brands={filterOptions.brands}
					selectedBrands={brands}
					onChange={(val) => toggleArrayItem("brands", val)}
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title={isRtl ? "التقييم" : "Rating"} activeCount={rating ? 1 : 0}>
				{[5, 4, 3, 2, 1].map(stars => (
					<FilterSidebar.Rating 
						key={stars} 
						stars={stars} 
						selectedRating={rating}
						onChange={(val) => updateParams({ rating: val })} 
					/>
				))}
			</FilterSidebar.Section>

			<FilterSidebar.Footer 
				activeCount={activeFiltersList.length} 
				onClear={clearAllFilters}
				onApply={() => setIsMobileFilterOpen(false)} 
			/>
		</>
	);

	if (isLoading) return <LoadingState />;

	if (error) {
		return (
			<div className="flex flex-col w-full min-h-screen bg-background pb-10 px-4">
				<ErrorState message={error} onRetry={() => updateParams({ page: currentPage })} />
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-10">
			{/* 1. Internal Hero */}
			<PageHero 
				title={fakeCategoryName}
				subtitle={{ en: "Explore our curated selection of high-quality products in this category.", ar: "استكشف تشكيلتنا المختارة من المنتجات عالية الجودة في هذا القسم." }}
				count={totalItems}
				breadcrumbs={breadcrumbItems}
			/>

			{/* 2. Main Layout Architecture */}
			<ProductsLayout
				sidebar={
					<FilterSidebar isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)}>
						{renderSidebarContent()}
					</FilterSidebar>
				}
				mobileSidebar={
					<FilterSidebar isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)}>
						{renderSidebarContent()}
					</FilterSidebar>
				}
				toolbar={
					<ProductsToolbar 
						totalItems={totalItems}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						viewMode={viewMode}
						onViewModeChange={(mode) => updateParams({ view: mode })}
						sortOption={sortOption}
						onSortChange={(sort) => updateParams({ sort })}
						onOpenFilter={() => setIsMobileFilterOpen(true)}
					/>
				}
				activeFilters={
					<ActiveFilters 
						activeFilters={activeFiltersList}
						onRemoveFilter={handleRemoveActiveFilter}
						onClearAll={clearAllFilters}
					/>
				}
				bottomContent={
					<RecentlyViewed products={mockProducts.slice(0, 6)} />
				}
			>
				{/* Main Grid Content */}
				{mockProducts.length === 0 ? (
					<EmptyState onClearFilters={clearAllFilters} />
				) : (
					<ProductsGrid products={mockProducts} viewMode={viewMode} />
				)}
				
				{/* Pagination */}
				{mockProducts.length > 0 && (
					<ProductsPagination 
						currentPage={currentPage}
						totalPages={4} 
						onPageChange={(page) => updateParams({ page })}
					/>
				)}
			</ProductsLayout>
		</div>
	);
};

export default Category;
