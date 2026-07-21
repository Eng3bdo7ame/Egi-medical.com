import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";

import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductVariants from "./components/ProductVariants";
import ProductActions from "./components/ProductActions";
import ProductMeta from "./components/ProductMeta";
import ProductTabs from "./components/ProductTabs";
import MobileBottomBar from "./components/MobileBottomBar";
import RelatedProducts from "./components/RelatedProducts";
import RecentlyViewed from "@/components/products/RecentlyViewed";

// Mocks
import { mockProductDetails } from "./product-details.mock";
import { mockProducts } from "../Products/components/products.mock";

const ProductDetails = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const { language } = useLanguage();

	// Look up product dynamically by slug for realistic mockup experience
	const matchedProduct = mockProducts.find(p => p.slug === slug);
	const product = matchedProduct ? {
		...mockProductDetails,
		id: matchedProduct.id,
		title: matchedProduct.title,
		price: {
			...mockProductDetails.price,
			current: matchedProduct.price.current,
			original: matchedProduct.price.original
		},
		images: [matchedProduct.image, ...mockProductDetails.images.slice(1)]
	} : mockProductDetails;

	const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 8);

	// Product State
	const [selectedVariants, setSelectedVariants] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [isWishlisted, setIsWishlisted] = useState(false);

	const handleVariantChange = (variantId, optionId) => {
		setSelectedVariants(prev => ({ ...prev, [variantId]: optionId }));
	};

	const handleAddToCart = () => {
		console.log("Added to cart:", { product, quantity, selectedVariants });
		// Usually dispatch to Redux here
	};

	// Breadcrumb mapping
	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Products", ar: "المنتجات" }, link: "/products" },
		{ label: { en: product.categories?.[0]?.label.en || "Category", ar: product.categories?.[0]?.label.ar || "القسم" }, link: `/categories/${product.categories?.[0]?.id}` },
		{ label: { en: product.title.en, ar: product.title.ar } }
	];

	// Compute images based on variant selection (e.g., color selection swaps main image)
	const getActiveImages = () => {
		const colorVariant = product.variants?.find(v => v.id === "color");
		if (colorVariant) {
			const selectedColorOption = colorVariant.options.find(o => o.id === selectedVariants["color"]);
			if (selectedColorOption?.image) {
				// Put the variant image first, then the rest
				return [selectedColorOption.image, ...product.images.filter(img => img !== selectedColorOption.image)];
			}
		}
		return product.images;
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-10">
			
			<div className="bg-surface border-b border-border/60 py-4 mb-6 relative z-20">
				<Container>
					<Breadcrumb items={breadcrumbItems} />
				</Container>
			</div>

			<Container>
				{/* Top Section: Gallery & Info */}
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
					
					{/* Left Column: Gallery & Tabs (Scrolls normally) */}
					<div className="w-full lg:w-[50%] xl:w-[55%] shrink-0 flex flex-col gap-8">
						<ProductGallery images={getActiveImages()} />
						
						{/* Desktop: Move Tabs inside left column so right column can stick alongside it */}
						<div className="hidden lg:block">
							<ProductTabs 
								description={product.description} 
								specifications={product.specifications} 
								reviews={product.reviewsList} 
							/>
						</div>
					</div>

					{/* Right Column: Info & Actions (Sticky Desktop Buy Box) */}
					<div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col lg:sticky lg:top-24 pb-8 z-10">
						<ProductInfo product={product} />

						<div className="mt-2">
							<ProductVariants 
								variants={product.variants} 
								selectedVariants={selectedVariants} 
								onVariantChange={handleVariantChange} 
							/>
						</div>

						<ProductActions 
							quantity={quantity}
							setQuantity={setQuantity}
							maxQuantity={product.stock?.quantity}
							onAddToCart={handleAddToCart}
							isWishlisted={isWishlisted}
							onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
						/>

						<div className="mt-6">
							<ProductMeta sku={product.stock?.sku} categories={product.categories} />
						</div>
					</div>
				</div>

				{/* Mobile: Tabs below everything else */}
				<div className="lg:hidden mt-8">
					<ProductTabs 
						description={product.description} 
						specifications={product.specifications} 
						reviews={product.reviewsList} 
					/>
				</div>

				{/* Bottom Section: Related Products */}
				<div className="mt-16">
					<RelatedProducts products={relatedProducts} />
				</div>
			</Container>

			{/* Recently Viewed Section (Full width background) */}
			<div className="mt-16">
				<RecentlyViewed />
			</div>

			{/* Mobile Bottom Buy Bar */}
			<MobileBottomBar 
				price={product.price}
				onAddToCart={handleAddToCart}
				disabled={!product.stock?.quantity}
				showThreshold={600}
			/>
		</div>
	);
};

export default ProductDetails;
