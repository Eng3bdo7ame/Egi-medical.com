import api from "@/services/api/client";

export const orderApi = {
	getOrders: () => api.get("/orders"),
	getOrderById: (id) => api.get(`/orders/${id}`),
	createOrder: (data) => api.post("/orders", data),
};

export default orderApi;
