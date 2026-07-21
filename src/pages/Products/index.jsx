import React, { useState, useEffect, useMemo } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/app/providers/I18nProvider";

// Layout & UI States
import ProductsLayout from "./components/ProductsLayout";
import LoadingState from "./components/States/LoadingState";
import EmptyState from "./components/States/EmptyState";
import ErrorState from "./components/States/ErrorState";

// Components
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsGrid from "./components/ProductsGrid";
import ProductsPagination from "./components/ProductsPagination";
import ActiveFilters from "./components/ActiveFilters";
import FilterSidebar from "./components/FilterSidebar";
import RecentlyViewed from "./components/RecentlyViewed";

// Hooks
import useProductFilters from "@/components/products/hooks/useProductFilters";

// Mock Data
import { mockProducts } from "./components/products.mock";

const Products = () => {
	const { language } = useLanguage();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	// Custom Hook for URL State Sync
	const { state, updateParams, toggleArrayItem, clearAllFilters } = useProductFilters();
	
	// Destructure State
	const { viewMode, sortOption, currentPage, availability, brands, categories, rating, price, search } = state;

	// Fake initial loading (Simulating API fetch dependent on URL state)
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		const timer = setTimeout(() => {
			setIsLoading(false);
			// Example to test error state: setError("Failed to fetch"); 
		}, 800);
		return () => clearTimeout(timer);
	}, [state]); // Re-run effect whenever URL state changes
	
	const itemsPerPage = 12; 
	const totalItems = 236; 
	
	// Breadcrumb mapping
	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Medical Devices", ar: "أجهزة طبية" }, link: "/products" },
		{ label: { en: "All Products", ar: "جميع المنتجات" } }
	];

	// Fake Filter Options (Would come from API)
	const filterOptions = {
		availability: { instock: 145, sale: 32 },
		brands: [
			{ id: "omron", label: { en: "OMRON", ar: "أومرون" }, count: 42 },
			{ id: "littmann", label: { en: "Littmann", ar: "ليتمان" }, count: 18 },
			{ id: "roche", label: { en: "Roche", ar: "روش" }, count: 24 }
		],
		categories: [
			{ 
				id: "monitors", 
				label: { en: "Monitors", ar: "أجهزة قياس" }, 
				count: 85,
				children: [
					{ id: "bp", label: { en: "Blood Pressure", ar: "ضغط الدم" }, count: 45 },
					{ id: "sugar", label: { en: "Blood Sugar", ar: "سكر الدم" }, count: 40 }
				]
			},
			{ 
				id: "consumables", 
				label: { en: "Consumables", ar: "مستهلكات" }, 
				count: 120 
			}
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
		categories.forEach(id => {
			// Find deep in tree for label (simplified for mock)
			let label = { en: id, ar: id };
			filterOptions.categories.forEach(cat => {
				if (cat.id === id) label = cat.label;
				cat.children?.forEach(child => {
					if (child.id === id) label = child.label;
				});
			});
			list.push({ id, type: 'categories', label });
		});
		if (rating) {
			list.push({ id: `rating-${rating}`, type: 'rating', label: { en: `${rating} Stars & Up`, ar: `${rating} نجوم فأكثر` } });
		}
		if (price[0] > 0 || price[1] < 10000) {
			list.push({ id: `price-${price[0]}-${price[1]}`, type: 'price', label: { en: `${price[0]} - ${price[1]} EGP`, ar: `${price[0]} - ${price[1]} ج.م` } });
		}
		return list;
	}, [availability, brands, categories, rating, price]);

	// Render the sidebar component
	const renderSidebarContent = () => (
		<>
			<FilterSidebar.Section title="Availability" activeCount={availability.length}>
				<FilterSidebar.Availability 
					selectedOptions={availability}
					onChange={(val) => toggleArrayItem("availability", val)}
					counts={filterOptions.availability}
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title="Price" activeCount={(price[0] > 0 || price[1] < 10000) ? 1 : 0}>
				<FilterSidebar.Price 
					min={0} max={10000} 
					value={price} 
					onChange={(range) => updateParams({ price: range })} 
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title="Brands" activeCount={brands.length}>
				<FilterSidebar.Brands 
					brands={filterOptions.brands}
					selectedBrands={brands}
					onChange={(val) => toggleArrayItem("brands", val)}
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title="Categories" activeCount={categories.length}>
				<FilterSidebar.Categories 
					categories={filterOptions.categories}
					selectedCategories={categories}
					onChange={(val) => toggleArrayItem("categories", val)}
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title="Rating" activeCount={rating ? 1 : 0}>
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

	// Full Page Loading State
	if (isLoading) {
		return <LoadingState />;
	}

	// Full Page Error State
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
				title={{ en: "All Products", ar: "جميع المنتجات" }}
				subtitle={{ en: "Browse our complete catalog of certified medical equipment.", ar: "تصفح الكتالوج الشامل للأجهزة والمعدات الطبية المعتمدة." }}
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
						totalPages={20} 
						onPageChange={(page) => updateParams({ page })}
					/>
				)}
			</ProductsLayout>
		</div>
	);
};

export default Products;
