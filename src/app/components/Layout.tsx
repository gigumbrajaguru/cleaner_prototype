import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Sparkles } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(
    null,
  );

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    if (!pendingScrollTarget) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const target = document.getElementById(pendingScrollTarget);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setPendingScrollTarget(null);
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location.pathname, pendingScrollTarget]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <span className="text-xl text-gray-900 sm:text-2xl">
                SparkleClean & Build
              </span>
            </Link>

            <div className="flex flex-wrap gap-4 sm:gap-8">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`transition-colors ${
                  isActive("/services")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${
                  isActive("/contact")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
              <Link
                to="/"
                onClick={() => setPendingScrollTarget("submit-review")}
                className="text-gray-600 transition-colors hover:text-blue-600"
              >
                Reviews
              </Link>
              <Link
                to="/admin/reviews"
                className={`transition-colors ${
                  isActive("/admin/reviews")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="text-xl">SparkleClean & Build</span>
              </div>
              <p className="text-gray-400">
                Professional cleaning and construction support for homes, offices, and project handovers.
              </p>
            </div>

            <div>
              <h3 className="text-lg mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link
                  to="/"
                  onClick={() => setPendingScrollTarget("submit-review")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Client Reviews
                </Link>
                <Link to="/admin/reviews" className="text-gray-400 hover:text-white transition-colors">
                  Reviews Admin
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-4">Contact Info</h3>
              <div className="text-gray-400 space-y-2">
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@sparkleclean.com</p>
                <p>Hours: Mon-Sat, 8AM-6PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2026 SparkleClean & Build. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
