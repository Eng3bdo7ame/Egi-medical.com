import api from "@/services/api/client";

export const reviewApi = {
	getProductReviews: (productId) => api.get(`/products/${productId}/reviews`),
	addReview: (productId, data) => api.post(`/products/${productId}/reviews`, data),
};

export default reviewApi;
