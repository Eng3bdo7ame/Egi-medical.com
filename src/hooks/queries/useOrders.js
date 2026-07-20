import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "@/services/orderService";

export const useOrders = () => {
	return useQuery({
		queryKey: ["orders"],
		queryFn: orderService.getOrders,
	});
};

export const useOrderDetails = (id) => {
	return useQuery({
		queryKey: ["order", id],
		queryFn: () => orderService.getOrderById(id),
		enabled: !!id,
	});
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: orderService.createOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};
