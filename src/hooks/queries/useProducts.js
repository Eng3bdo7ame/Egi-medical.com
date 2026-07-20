import { useQuery } from "@tanstack/react-query";
import productApi from "@/features/products/api/productApi";

export const useProducts = (params) => {
	return useQuery({
		queryKey: ["products", params],
		queryFn: () => productApi.getProducts(params),
	});
};

export const useProductDetails = (slug) => {
	return useQuery({
		queryKey: ["product", slug],
		queryFn: () => productApi.getProductBySlug(slug),
		enabled: !!slug,
	});
};


