import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { mapBackendProduct } from "./useProducts";

export const useLatestProducts = () => {
	return useQuery({
		queryKey: ["latestProducts"],
		queryFn: async () => {
			try {
				const res = await api.get(API_ENDPOINTS.LATEST_PRODUCTS);
				const data = res?.data?.data || res?.data || [];
				if (Array.isArray(data)) {
					return data.map(mapBackendProduct);
				}
				return [];
			} catch (error) {
				console.error("Failed to fetch latest products:", error);
				return [];
			}
		},
	});
};

export default useLatestProducts;
