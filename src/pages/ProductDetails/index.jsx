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
import StickyAddToCart from "./components/StickyAddToCart";
import RelatedProducts from "./components/RelatedProducts";

// Mocks
import { mockProductDetails } from "./product-details.mock";
import { mockProducts } from "../Products/components/products.mock";

const ProductDetails = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const { language } = useLanguage();

	// In a real app, you'd fetch the product based on the slug.
	const product = mockProductDetails;
	const relatedProducts = mockProducts.slice(0, 8);

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
			
			<div className="bg-surface border-b border-border/60 py-4 mb-6">
				<Container>
					<Breadcrumb items={breadcrumbItems} />
				</Container>
			</div>

			<Container>
				{/* Top Section: Gallery & Info */}
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
					
					{/* Left: Gallery */}
					<div className="w-full lg:w-[45%] shrink-0">
						<ProductGallery images={getActiveImages()} />
					</div>

					{/* Right: Info & Actions */}
					<div className="w-full lg:w-[55%] flex flex-col">
						<ProductInfo product={product} />

						<ProductVariants 
							variants={product.variants} 
							selectedVariants={selectedVariants} 
							onVariantChange={handleVariantChange} 
						/>

						<div className="mt-4">
							<ProductActions 
								quantity={quantity}
								setQuantity={setQuantity}
								maxQuantity={product.stock?.quantity}
								onAddToCart={handleAddToCart}
								isWishlisted={isWishlisted}
								onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
							/>
						</div>

						<ProductMeta sku={product.stock?.sku} categories={product.categories} />
					</div>
				</div>

				{/* Middle Section: Tabs */}
				<ProductTabs 
					description={product.description} 
					specifications={product.specifications} 
					reviews={product.reviewsList} 
				/>

				{/* Bottom Section: Related Products */}
				<RelatedProducts products={relatedProducts} />
			</Container>

			{/* Sticky Add To Cart (Scroll Aware) */}
			<StickyAddToCart 
				product={product} 
				onAddToCart={handleAddToCart} 
				showThreshold={600} 
			/>
		</div>
	);
};

export default ProductDetails;
