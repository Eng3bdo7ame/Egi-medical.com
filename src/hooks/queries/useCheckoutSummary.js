import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { getOrCreateTempUserId } from "@/features/cart/cartSlice";
import { store } from "@/app/store";

export const useCheckoutSummary = (params = {}) => {
	return useQuery({
		queryKey: ["checkoutSummary", params],
		queryFn: async () => {
			const state = store.getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;

			const config = {
				params: {
					...params,
					...(tempUserId ? { temp_user_id: tempUserId } : {}),
				},
			};

			const response = await api.get(API_ENDPOINTS.CHECKOUT_SUMMARY, config);
			// Response interceptor extracts response.data, so if it contains a nested data property, return it.
			return response.data || response;
		},
	});
};

export default useCheckoutSummary;
