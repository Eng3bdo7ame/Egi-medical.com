import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import reviewApi from "@/features/reviews/api/reviewApi";

export const useProductReviews = (productId) => {
	return useQuery({
		queryKey: ["reviews", productId],
		queryFn: () => reviewApi.getProductReviews(productId),
		enabled: !!productId,
	});
};

export const useAddReview = (productId) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) => reviewApi.addReview(productId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
		},
	});
};

