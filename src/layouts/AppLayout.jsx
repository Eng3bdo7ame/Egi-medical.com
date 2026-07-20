import { Link, Outlet } from "react-router-dom";
import { navigationLinks } from "@/config/navigation";
import { useTheme } from "@/app/providers/ThemeProvider";

const AppLayout = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen flex flex-col bg-background text-text">
			{/* Navbar */}
			<header className="border-b border-muted/20 bg-surface/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<img
							className="h-10 w-auto"
							src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
							alt="Logo"
						/>
						<span className="font-bold text-xl tracking-wider text-primary">EG-Medical</span>
					</div>
					<nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base">
						{navigationLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className="text-muted hover:text-primary transition-colors font-medium"
							>
								{link.name}
							</Link>
						))}
					</nav>
					<button
						onClick={toggleTheme}
						className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-background hover:opacity-90 transition-all cursor-pointer"
					>
						{theme === "system" && "🖥️ System"}
						{theme === "dark" && "🌙 Dark"}
						{theme === "light" && "☀️ Light"}
					</button>
				</div>
			</header>

			{/* Main Content (Outlet) */}
			<main className="flex-1 container mx-auto px-4 py-8">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="border-t border-muted/20 py-6 text-center text-sm text-muted bg-surface/20">
				&copy; {new Date().getFullYear()} EG-Medical. All rights reserved.
			</footer>
		</div>
	);
};

export default AppLayout;

