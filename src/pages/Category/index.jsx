import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/app/providers/I18nProvider";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

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
	const params = useParams();
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [categoryName, setCategoryName] = useState({ en: "", ar: "" });

	// Extract slug from route params (handles :slug and wildcard *)
	const rawSlug = params["*"]
		? params["*"].split('/').filter(Boolean).pop()
		: params.slug || "all-categories";

	// Custom Hook for URL State Sync
	const { state, updateParams, toggleArrayItem, clearAllFilters } = useProductFilters();
	const { viewMode, sortOption, currentPage, availability, brands, rating, price } = state;

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await api.get(API_ENDPOINTS.PRODUCTS, {
					params: {
						category_id: rawSlug !== "all-categories" ? rawSlug : undefined,
						page: currentPage,
						sort: sortOption,
						// Add other filters if needed
					}
				});
				if (response && response.success) {
					const apiProducts = response.data?.data || [];
					const mappedProducts = apiProducts.map(apiProd => {
						const priceVal = apiProd.price || 0;
						const currentPrice = apiProd.final_price || apiProd.special_price || apiProd.sale_price || priceVal;
						const originalPrice = priceVal > currentPrice ? priceVal : null;
						const badges = [];
						if (apiProd.has_flash_sale) {
							badges.push({ type: "sale", label: { en: "Flash Sale", ar: "عرض فلاش" } });
						} else if (apiProd.discount_percentage > 0) {
							badges.push({ type: "sale", label: { en: `${apiProd.discount_percentage}% OFF`, ar: `خصم ${apiProd.discount_percentage}%` } });
						}
						return {
							id: `prod-${apiProd.id}`,
							title: { ar: apiProd.title || apiProd.name || "", en: apiProd.title || apiProd.name || "" },
							category: { ar: apiProd.category || "", en: apiProd.category || "", id: String(apiProd.category_id || "") },
							brand: apiProd.brand || "",
							image: apiProd.primary_image || apiProd.image || "",
							price: { current: currentPrice, original: originalPrice },
							reviews: { rating: apiProd.rating || 0, count: apiProd.rate_count || 0 },
							stock: { quantity: apiProd.quantity || 0 },
							badges,
							link: apiProd.product_link || `/product/${apiProd.id}`,
							_apiOriginal: apiProd
						};
					});
					setProducts(mappedProducts);
					setTotalPages(response.data?.last_page || 1);
					setTotalItems(response.data?.total || mappedProducts.length);
					
					// Set real category name from the first product
					if (mappedProducts.length > 0) {
						setCategoryName(mappedProducts[0].category);
					}
				} else {
					setError(isRtl ? "حدث خطأ أثناء جلب المنتجات." : "Failed to load products.");
				}
			} catch (err) {
				setError(err?.message || (isRtl ? "حدث خطأ أثناء جلب المنتجات." : "Failed to load products."));
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, [state, rawSlug, isRtl]);

	const itemsPerPage = 12;

	const displayCategoryName = categoryName[language] || (isRtl ? "منتجات القسم" : "Category Products");

	// Breadcrumb mapping
	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Categories", ar: "الأقسام" }, link: "/categories" },
		{ label: { en: displayCategoryName, ar: displayCategoryName } }
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
				title={{ en: displayCategoryName, ar: displayCategoryName }}
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
				{products.length === 0 ? (
					<EmptyState onClearFilters={clearAllFilters} />
				) : (
					<ProductsGrid products={products} viewMode={viewMode} />
				)}

				{/* Pagination */}
				{products.length > 0 && (
					<ProductsPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) => updateParams({ page })}
					/>
				)}
			</ProductsLayout>
		</div>
	);
};

export default Category;
