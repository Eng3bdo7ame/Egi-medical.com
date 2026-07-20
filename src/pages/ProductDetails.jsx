import { useParams } from "react-router-dom";

const ProductDetails = () => {
	const { slug } = useParams();

	return (
		<div className="space-y-4">
			<h1 className="text-3xl font-bold text-teal-400">Product Details</h1>
			<p className="text-slate-400">Showing details for product: <span className="text-white font-semibold">{slug}</span></p>
		</div>
	);
};

export default ProductDetails;
