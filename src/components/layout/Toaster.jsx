import React from "react";

export const Toaster = () => {
	// Placeholder container for global toast notifications
	return <div id="global-toaster" aria-live="polite" className="fixed bottom-4 right-4 z-toast pointer-events-none" />;
};

export default Toaster;
