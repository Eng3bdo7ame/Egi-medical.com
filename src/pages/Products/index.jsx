import { Navigate } from "react-router-dom";
import React from "react";

const Products = () => {
	// Redirect generic products page to home to enforce category-only browsing
	return <Navigate to="/" replace />;
};

export default Products;
