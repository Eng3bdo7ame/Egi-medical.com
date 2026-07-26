import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { toast } from "sonner";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
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
	const [quantity, setQuantity] = useState(1);
	const dispatch = useAppDispatch();
	const isWishlisted = useAppSelector(selectIsWishlisted(product.id));
	const isRtl = language === "ar";

	const handleAddToCart = () => {
		if (!product.stock?.quantity) return;
		dispatch(addToCart({ product, quantity }));
		toast.success(isRtl ? "تم إضافة المنتج للسلة بنجاح" : "Product added to cart successfully");
	};

	const handleToggleWishlist = () => {
		dispatch(toggleWishlist(product));
		if (!isWishlisted) {
			toast.success(isRtl ? "تم الإضافة إلى المفضلة" : "Added to Wishlist");
		} else {
			toast.info(isRtl ? "تم الإزالة من المفضلة" : "Removed from Wishlist");
		}
	};

	// Breadcrumb mapping
	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Products", ar: "المنتجات" }, link: "/products" },
		{ label: { en: product.categories?.[0]?.label.en || "Category", ar: product.categories?.[0]?.label.ar || "القسم" }, link: `/categories/${product.categories?.[0]?.id}` },
		{ label: { en: product.title.en, ar: product.title.ar } }
	];

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
					<div className="w-full lg:w-1/2 shrink-0 flex flex-col gap-8">
						<ProductGallery images={product.images} />

						{/* Desktop: Move Tabs inside left column so right column can stick alongside it */}
						<div className="hidden lg:block mt-2">
							<ProductTabs
								description={product.description}
								specifications={product.specifications}
								reviews={product.reviewsList}
							/>
						</div>
					</div>

					{/* Right Column: Info & Actions (Sticky Desktop Buy Box) */}
					<div className="w-full lg:w-1/2 flex flex-col lg:sticky lg:top-24 pb-8 z-10">
						<ProductInfo product={product} />

						<div className="mt-6">
							<ProductActions
								price={product.price}
								quantity={quantity}
								setQuantity={setQuantity}
								maxQuantity={product.stock?.quantity}
								onAddToCart={handleAddToCart}
								isWishlisted={isWishlisted}
								onToggleWishlist={handleToggleWishlist}
							/>
						</div>

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
